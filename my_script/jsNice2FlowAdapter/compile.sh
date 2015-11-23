#!/bin/bash
baseDir=`dirname $0`
pushd $baseDir
javac -extdirs lib/ -d out/ src/edu/ucdavis/ecs240/Nice2FlowMain.java
popd
