#!/bin/bash
origFilename=$1
patchFilename=$2
filenameOut=$3
patch -o suggest_${origFilename} ${origFilename} ${patchFilename}

sed -r 's/(^\s*var\s*\w+\s*)(:\s*)(\w+)/\/** @type {\3} *\/\n\1/g' suggest_${origFilename} >tmp1_vars.js
sed -r 's/function\s+\w+\(\)\s*:\s*(\w+)//g' tmp1_vars.js> tmp2_funcNoArg.js
sed -r 's/(function\s+\w+\(\))(\s*:\s*)(\w+)/\/**\n * @return {\3}\n *\/\n\1/g' tmp1_vars.js> tmp2_funcNoArg.js
sed -r 's/(function\s+\w+\(\s*)(\w+)(\s*):\s*(\w+)\s*,\s*(\w+)(\s*):\s*(\w+)\s*\)\s*:\s*(\w+)/\/**\n * @param{\4} \2\n * @param{\7} \5\n * @return {\8}\n *\/\n\1\2\3,\5\6)/g' tmp2_funcNoArg.js>tmp3_funcTwoArg.js
cp tmp3_funcTwoArg.js $filenameOut
