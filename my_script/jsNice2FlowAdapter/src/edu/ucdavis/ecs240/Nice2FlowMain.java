package edu.ucdavis.ecs240;

import org.apache.commons.lang3.StringUtils;

import java.io.*;
import java.util.*;

public class Nice2FlowMain {
    private static final String TAG_PARAM = "@param";
    private static final String TAG_RETURN = "@return";
    private static final String TAG_TYPE = "@type";
    private static final String TAG_FUNC = "function";
    private static final String TAG_VAR = "var";
    private static final String TAG_RET = "return";

    private static final String KEY_RET = "_RET";
    private static final String KEY_TMP = "TEMP_";
    private static final String KEY_FUNC = "FUNC_";

    private static final int P_PARAM = 0;
    private static final int P_TYPE = 1;
    private static final int P_RETURN = 2;

    private Map<String, NiceType> progMap;

    // A stack to keep the name of the function we are currently in
    private Deque<String> currFunction;
    // A stack to keep track of when a function is opened or closed
    private Deque<Integer> funcLevel;
    // A stack to keep track of the line where the function is defined to set the return type.
    private Deque<Integer> lastFunc;
    // A counter to check how many keys are opened/closed
    private int scopeBalance;
    // A signal to keep alive a type annotation
    private int tempAlive;
    // A counter of anonymus functions
    private int anonymus;
    // Array that will generate the output file. Kept this way to overwrite when needed. e.g.
    // When return type is not defined yet.
    private List<String> output;

    public static void main(String[] args) {
	String inputFilename = args[0];
	String outputFilename = args[1];
        Nice2FlowMain processor = new Nice2FlowMain();
        processor.processFile(inputFilename);
        processor.displayRegister();
        processor.outputNewFile(outputFilename);
    }

    Nice2FlowMain(){
        progMap = new HashMap<String, NiceType>();
        output = new ArrayList<String>();
        currFunction = new ArrayDeque<String>();
        currFunction.push("");
        funcLevel = new ArrayDeque<Integer>();
        funcLevel.push(Integer.valueOf(-5));
        lastFunc = new ArrayDeque<Integer>();
        scopeBalance = 0;
        anonymus = 0;
        tempAlive = -1;
    }

    public void displayRegister() {
        PrintWriter writer = null;
        try {
            writer = new PrintWriter("output.log", "UTF-8");
            for(NiceType nt : this.progMap.values()) {
                //System.out.print(nt.printContent()+"\n");
                writer.println(nt.printContent()+"\n");
            }
        } catch(FileNotFoundException fnfe) {
            System.err.println("File could not be created: " + fnfe.getMessage());
        } catch (UnsupportedEncodingException uee) {
            System.err.println("File could not encoded: " + uee.getMessage());
        } finally {
            if(writer != null) {
                writer.close();
            }
        }
    }

    public void outputNewFile(String filename) {
        PrintWriter writer = null;
        try {
            writer = new PrintWriter(filename, "UTF-8");
            for (String line : this.output) {
                System.out.println(line);
                writer.println(line);
            }
        } catch(FileNotFoundException fnfe) {
            System.err.println("File could not be created: " + fnfe.getMessage());
        } catch (UnsupportedEncodingException uee) {
            System.err.println("File could not encoded: " + uee.getMessage());
        } finally {
            if(writer != null) {
                writer.close();
            }
        }
    }

    public void processFile(String filename) {
        try {
            BufferedReader br = new BufferedReader(new FileReader(filename));
            int cnt = 0;
            String line = null;
            while ((line = br.readLine()) != null) {
                processLine(line.trim(), cnt++);
            }

            br.close();
        } catch(FileNotFoundException fnfe) {
            System.out.println(fnfe.getMessage());
        } catch (IOException ioe) {
            System.out.println(ioe.getMessage());
        }
    }

    protected void processLine(String content, int line) {
        System.out.println(content);
        String tag = "";
        if(this.tempAlive != -1) this.tempAlive++;
        // If we find an @type annotation, that is not followed by a var
        // We get rid of this information.
        // TODO: check if we can infer more info for this.
        if(this.tempAlive >= 2) {
            this.tempAlive = -1;
            this.progMap.remove(KEY_TMP);
        }
        // Handle depth of functions
        if(content.contains("{") || content.contains("}")) {
            if (content.contains("{") && content.contains("}")) {
                //do nothing
            } else if (content.contains("{")) {
                this.scopeBalance += StringUtils.countMatches(content, "{");
            } else if (content.contains("}")) {
                this.scopeBalance -= StringUtils.countMatches(content, "}");
                if (this.scopeBalance +1 == this.funcLevel.peek().intValue()) {
                    if (!this.currFunction.isEmpty())
                        this.currFunction.pop();
                    if (!this.lastFunc.isEmpty())
                        this.lastFunc.pop();
                }
            }
        }
        StringBuilder sb = new StringBuilder();
        for(int i=0; i<this.scopeBalance; i++) {
            sb.append("  ");
        }
        if (content.contains(TAG_PARAM)) {
            //System.out.println("Found parameter ");
            tag = extractAnnotatedFeatures(content, line, P_PARAM);
        } else if (content.contains(TAG_RETURN)) {
            //System.out.println("Found return type ");
            tag = extractAnnotatedFeatures(content, line, P_RETURN);
        } else if (content.contains(TAG_TYPE)) {
            //System.out.println("Found return type ");
            tag = extractAnnotatedFeatures(content, line, P_TYPE);
            this.tempAlive =0;
        } else if (content.contains(TAG_VAR)) {
            //System.out.println("Found variable ");
            tag = extract2ndParameter(content);
            //Update temp
            NiceType nty = null;
            if(this.progMap.containsKey(KEY_TMP)) {
                nty = this.progMap.remove(KEY_TMP);
                nty.setOrigLine(nty.getOrigLine() + "\n" + content);
            } else {
                nty = new NiceType();
                nty.setLineFound(line);
                nty.setOrigLine(content);
            }
            nty.setVarName(tag);
            if(this.scopeBalance == 0) {
                nty.setVarScope(NiceType.T_GLOBAL);
            }
            this.progMap.put(this.currFunction.peek().concat(tag), nty);
            // Build the new output
            String rest = content.substring(content.indexOf(tag) + tag.length());
            sb.append(TAG_VAR).append(" ");
            sb.append(tag).append(" ");
            if(!nty.getVarType().equals(NiceType.UNDEF)) {
                sb.append(": ").append(nty.getVarType());
            }
            sb.append(rest);
            nty.setNewLine(sb.toString());
            this.output.add(nty.getNewLine());
        } else if (content.contains(TAG_RET)) {
            try {
                sb.append(content);
                this.output.add(sb.toString());
                tag = this.currFunction.peek().concat(extract2ndParameter(content));
                // Update the return type.
                if (this.progMap.containsKey(KEY_RET) && this.progMap.containsKey(tag)) {
                    NiceType nty = this.progMap.remove(KEY_RET);
                    NiceType ntt = this.progMap.get(tag);
                    nty.setVarType(ntt.getVarType());
                    nty.setOrigLine(nty.getOrigLine() + "\n" + content);
                    nty.setVarName(this.currFunction.peek().concat(KEY_RET));
                    this.progMap.put(this.currFunction.peek().concat(KEY_RET), nty);
                    if(!this.lastFunc.isEmpty()) {
                        // Set the return type of the function
                        int lFuncIdx = this.lastFunc.peek().intValue();
                        StringBuilder sbf = new StringBuilder(this.output.get(lFuncIdx));
                        sbf.deleteCharAt(sbf.length() - 1);
                        sbf.append(": ").append(nty.getVarType());
                        sbf.append(" {");
                        this.output.set(lFuncIdx, sbf.toString());
                    }
                }
            } catch(NoSuchElementException nsee) {
                return;
            }
        } else if (content.startsWith(TAG_FUNC)) {
            // normal function declaration
            int space = content.indexOf(' ');
            String rest = content.substring(space).trim();
            int openPar = rest.indexOf('(');
            this.currFunction.push(rest.substring(0, openPar));
            this.funcLevel.push(Integer.valueOf(this.scopeBalance));
            sb.append(TAG_FUNC).append(" ");
            sb.append(this.currFunction.peek()).append("(");
            // build params lists
            String params = extractFuncParameters(rest.substring(rest.indexOf('(') + 1, rest.indexOf(')')),content);
            sb.append(params).append(" ) {");
            this.output.add(sb.toString().substring(2));
            this.lastFunc.push(Integer.valueOf(this.output.size()-1));
        } else if (content.contains(TAG_FUNC)) {
            boolean anonym = false;
            // check if it is an anonymus function
            int openPar = content.indexOf('(');
            int closePar = content.indexOf(')');
            int fIndex = content.indexOf(TAG_FUNC);
            String funcName = "";
            // anonymus function
            if(openPar - (fIndex + TAG_FUNC.length()) < 3) {
                funcName = KEY_FUNC + String.valueOf(this.anonymus++);
                anonym = true;
            } else {
                funcName = content.substring((fIndex + TAG_FUNC.length()), openPar).trim();
            }
            this.currFunction.push(funcName);
            this.funcLevel.push(Integer.valueOf(this.scopeBalance));
            sb.append(content.substring(0, fIndex));
            sb.append(TAG_FUNC).append(" ");
            if(!anonym) {
                sb.append(funcName);
            }
            sb.append("(");
            // build params lists
            String params = extractFuncParameters(content.substring(openPar + 1, closePar),content);
            sb.append(params).append(" ) {");
            this.output.add(sb.toString().substring(2));
            this.lastFunc.push(Integer.valueOf(this.output.size()-1));
        } else {
            sb.append(content);
            if(content.contains("{")) {
                this.output.add(sb.toString().substring(2));
            } else {
                this.output.add(sb.toString());
            }
        }
    }

    private String extractFuncParameters(String params, String content) {
        // No params
        if(params == null || params.length() < 1) return "";
        StringTokenizer st = new StringTokenizer(params, ",");
        // Build the new line
        String param;
        StringBuilder sb = new StringBuilder();
        while(st.hasMoreTokens()) {
            param = st.nextToken().trim();
            sb.append(" ").append(param);
            if(this.progMap.containsKey(param)) {
                NiceType ntt = this.progMap.remove(param);
                ntt.setOrigLine(ntt.getOrigLine() + "\n" + content);
                this.progMap.put(this.currFunction.peek() + param, ntt);
                if (!ntt.getVarType().equals(NiceType.UNDEF)) {
                    sb.append(": ").append(ntt.getVarType());
                }
            }
            sb.append(",");
        }
        sb.deleteCharAt(sb.length()-1);
        return sb.toString();
    }

    private String extract2ndParameter(String content) {
        StringTokenizer tokens = new StringTokenizer(content," ");
        tokens.nextToken();
        String tag = tokens.nextToken().trim();
        if(tag.charAt(tag.length()-1) == ';' || tag.charAt(tag.length()-1) == '=')
            tag = tag.substring(0, tag.length()-1);
        return tag.trim();
    }

    private String extractAnnotatedFeatures(String content, int line, int tagType) {
        int openBrace = content.indexOf("{");
        int closeBrace = content.indexOf("}");
        NiceType type = new NiceType();
        type.setLineFound(line);
        type.setOrigLine(content);
        type.setVarType(content.substring(openBrace+1, closeBrace).trim());
        switch(tagType) {
            case P_PARAM: type.setVarName(content.substring(closeBrace+1).trim()); type.setVarScope(NiceType.T_PARAM); break;
            case P_RETURN: type.setVarName(KEY_RET); type.setVarScope(NiceType.T_FUNCTION); break;
            case P_TYPE: type.setVarName(KEY_TMP); break;
        }
        this.progMap.put(type.getVarName(), type);
        return type.getVarName().trim();
    }

    class NiceType {
        public static final int T_LOCAL = 0;
        public static final int T_PARAM = 1;
        public static final int T_FUNCTION = 2;
        public static final int T_GLOBAL = 3;

        private static final String UNDEF = "?";
        private static final String GLOBAL = "## Global variable ##";
        private static final String PARAM = "## Function parameter variable ##";
        private static final String FUNC = "## Function variable ##";
        private static final String LOCAL = "## Local variable ##";

        private String varName;
        private String varType;
        private int lineFound;
        private String origLine;
        private String newLine;
        private int varScope;

        NiceType() {
            this.varName = null;
            this.varType = UNDEF;
            this.lineFound = -1;
            this.varScope = T_LOCAL;

            this.origLine = null;
            this.newLine = null;
        }

        public String printContent() {
            if(varName != null) {
                StringBuilder builder = new StringBuilder();
                switch(this.varScope) {
                    case T_GLOBAL : builder.append(GLOBAL + "\n"); break;
                    case T_FUNCTION : builder.append(FUNC + "\n"); break;
                    case T_PARAM : builder.append(PARAM + "\n"); break;
                    case T_LOCAL : builder.append(LOCAL + "\n"); break;
                }
                builder.append(this.varName);
                builder.append("( " + this.varType + " )");
                builder.append(": " + this.lineFound + "\n");
                if(this.origLine != null)  builder.append("Original: " + this.origLine + "\n");
                if(this.newLine != null)  builder.append("New: " + this.newLine + "\n");
                return builder.toString();
            }
            return "EMPTY_CONTENT";
        }

        public String getVarName() {
            return varName;
        }

        public void setVarName(String varName) {
            this.varName = varName;
        }

        public String getVarType() {
            return varType;
        }

        public void setVarType(String varType) {
            this.varType = varType;
        }

        public int getLineFound() {
            return lineFound;
        }

        public void setLineFound(int lineFound) {
            this.lineFound = lineFound;
        }

        public String getOrigLine() {
            return origLine;
        }

        public void setOrigLine(String origLine) {
            this.origLine = origLine;
        }

        public String getNewLine() {
            return newLine;
        }

        public void setNewLine(String newLine) {
            this.newLine = newLine;
        }

        public int getVarScope() {
            return varScope;
        }

        public void setVarScope(int varScope) {
            this.varScope = varScope;
        }
    }
}
