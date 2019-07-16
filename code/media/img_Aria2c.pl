#!/usr/bin/perl
use 5.010;
use utf8;

my $file="imglist_uniq";
open(my $data, '<:encoding(utf8)', $file) or die "Could not open '$file' $!\n";
while(<$data>){
  print ;
  print ' out=';
  s#[!\\/*?|:"<>]#-#g;
  s/fmt=/fmt./g;
  print ;
  # if(/out=/){
  #   s#[!\\/*?|:"<>]#-#g;
  #   s/fmt=/fmt./g;
  #   print ;
  # }else{
  #   print ;
  # }
}
