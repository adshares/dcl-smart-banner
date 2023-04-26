#!/bin/bash

projectName=dcl-smart-banner
dist=./dist

rm -rf "$dist"
rm -rf "$projectName".zip

for dir in `ls`; do
  test -d "$dir" || continue
  cd "$dir"
  dcl pack
  item=$(find . -name "item.zip")
  mkdir -p ../"$dist"
  mv "$item" ../"$dist"/"$dir".zip
  cd ..
done

if [ -d "$dist" ]; then
  (cd "$dist" && zip -r ../"$projectName".zip .)
  echo "Build complete"
fi
