#!/usr/bin/perl
use 5.010;
use utf8;

my $file="voicelist_uniq";
open(my $data, '<:encoding(utf8)', $file) or die "Could not open '$file' $!\n";
while(<$data>){
  print ;
  print ' out=';
  s#https.*\?#getvoice\@#g;
  s#(.*)#$1.mp3#;
  print ;
}