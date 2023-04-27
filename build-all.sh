#!/bin/bash

distFile=adshares-banners.zip
dist=./dist

rm -rf "$dist"

for dir in `ls`; do
  test -d "$dir" || continue
  cd "$dir"
  if [ `basename $(pwd)` = "docs" ]; then
    cd ..
    continue
  fi
  npm install
  dcl pack
  item=$(find . -name "item.zip")
  mkdir -p ../"$dist"
  mv "$item" ../"$dist"/"$dir".zip
  cd ..
done

if [ -d "$dist" ]; then
  (cd "$dist" && zip -r "$distFile" .)
  echo "Build complete"
fi
