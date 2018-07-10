#! /bin/bash
cat datelist | while read LINE
do
    mkdir $LINE 
done
