#!/bin/bash

BASE_DIR=$(dirname $0)
TARGET_DIR=${1:-.}

[[ -f $TARGET_DIR ]] || mkdir -p $TARGET_DIR

cp -rf $BASE_DIR/../assets/ $TARGET_DIR

cd $TARGET_DIR
