#! /bin/bash  
cat datelist | while read LINE
do
    mkdir dhqwx/$LINE 
done
