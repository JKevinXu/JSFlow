var typescript = new BenchmarkSuite("Typescript", [255011322], [new Benchmark("Typescript", false, true, 5, runTypescript, setupTypescript, tearDownTypescript, null, 1)]);
/**
 * @return {undefined}
 */
function setupTypescript() {
}
/**
 * @return {undefined}
 */
function tearDownTypescript() {
    /** @type {null} */
    compiler_input = null;
}
/** @type {Array} */
var parseErrors = [];
/**
 * @return {undefined}
 */
function runTypescript() {
    var compiler = createCompiler();
    compiler.addUnit(compiler_input, "compiler_input.ts");
    /** @type {Array} */
    parseErrors = [];
    compiler.reTypeCheck();
    compiler.emit({
        /**
         * @param {?} enc
         * @return {?}
         */
        createFile : function(enc) {
            return outfile;
        },
        /**
         * @param {?} _params
         * @return {?}
         */
        fileExists : function(_params) {
            return false;
        },
        /**
         * @param {?} dataAndEvents
         * @return {?}
         */
        directoryExists : function(dataAndEvents) {
            return false;
        },
        /**
         * @param {?} p
         * @return {?}
         */
        resolvePath : function(p) {
            return p;
        }
    });
    if (parseErrors.length != 192 && parseErrors.length != 193) {
        throw new Error("Parse errors.");
    }
    /** @type {null} */
    compiler = null;
}
var outfile = {
    checksum : -412589664,
    cumulative_checksum : 0,
    /**
     * @param {string} defs
     * @return {undefined}
     */
    Write : function(defs) {
        this.Verify(defs);
    },
    /**
     * @param {string} s
     * @return {undefined}
     */
    WriteLine : function(s) {
        this.Verify(s + "\n");
    },
    /**
     * @return {undefined}
     */
    Close : function() {
        if (this.checksum != this.cumulative_checksum) {
            throw new Error("Wrong checksum.");
        }
        /** @type {number} */
        this.cumulative_checksum = 0;
    },
    /**
     * @param {string} a
     * @return {undefined}
     */
    Verify : function(a) {
        /** @type {number} */
        var i = 0;
        for (;i < a.length;i++) {
            var bc = a.charCodeAt(i);
            /** @type {number} */
            this.cumulative_checksum = this.cumulative_checksum << 1 ^ bc;
        }
    }
};
var outerr = {
    checksum : 0,
    cumulative_checksum : 0,
    /**
     * @param {string} defs
     * @return {undefined}
     */
    Write : function(defs) {
        this.Verify(defs);
    },
    /**
     * @param {string} s
     * @return {undefined}
     */
    WriteLine : function(s) {
        this.Verify(s + "\n");
    },
    /**
     * @return {undefined}
     */
    Close : function() {
        if (this.checksum != this.cumulative_checksum) {
            throw new Error("Wrong checksum.");
        }
        /** @type {number} */
        this.cumulative_checksum = 0;
    },
    /**
     * @param {string} a
     * @return {undefined}
     */
    Verify : function(a) {
        /** @type {number} */
        var i = 0;
        for (;i < a.length;i++) {
            var bc = a.charCodeAt(i);
            /** @type {number} */
            this.cumulative_checksum = this.cumulative_checksum << 1 ^ bc;
        }
    }
};
/**
 * @return {?}
 */
function createCompiler() {
    var options = new TypeScript.CompilationSettings;
    options.codeGenTarget = TypeScript.CodeGenTarget.ES5;
    var compiler = new TypeScript.TypeScriptCompiler(outerr, new TypeScript.NullLogger, options);
    compiler.setErrorCallback(function(minIdx, len, output) {
        parseErrors.push({
            start : minIdx,
            len : len,
            message : output
        });
    });
    /** @type {boolean} */
    compiler.parser.errorRecovery = true;
    compiler.typeCheck();
    return compiler;
}
;