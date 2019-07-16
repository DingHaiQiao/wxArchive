#! /bin/bash
sort voicelist|uniq > voicelist_uniq
perl voice_Aria2c.pl > voicelist_out
./aria2c -d voice -i voicelist_out