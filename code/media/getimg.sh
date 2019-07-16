#! /bin/bash
sort imglist|uniq > imglist_uniq
perl img_Aria2c.pl > imglist_out
./aria2c -d img -i imglist_out