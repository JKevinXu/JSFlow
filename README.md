# JSFlow
This is a converter to make JS programs run in JSNice and Flow. Run the .sh will make it work. Do the steps as follows:

#!/bin/bash -v
baseDir=`dirname $0`

#1: run flowtype:
filename=$1
flow suggest ${filename} > ${filename}.patch

#2: run flow2niceAdapter:
${baseDir}/flow2niceAdapter.sh $filename ${filename}.patch flowed_${filename}

#3: run JSNice:
jsnice  flowed_${filename} > jsniced_${filename}

#4: run jsNice2FlowAdapter
${baseDir}/jsNice2FlowAdapter/run.sh jsniced_${filename} 1_${filename} >jsNice2FlowAdapter.log
