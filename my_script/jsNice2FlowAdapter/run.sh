#!/bin/bash
baseDir=`dirname $0`
java -cp ${baseDir}/out/:${baseDir}/lib/commons-lang3-3.3.jar edu.ucdavis.ecs240.Nice2FlowMain "$@"
