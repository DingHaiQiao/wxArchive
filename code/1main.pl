#!/usr/bin/perl
use 5.010;
use utf8;
use File::Copy;
use File::Copy::Recursive;
use File::Path qw(make_path remove_tree);
use Text::CSV;

my $dir="/cygdrive/e/Program Files/Portable/green/phantomjs-2.1.1-windows/bin";
opendir DH, $dir or die "cannot open dir: $!";
chdir $dir;

my $csv = Text::CSV->new({ sep_char => '|' });
my $file="titlelist.csv";
open(my $data, '<:encoding(utf8)', $file) or die "Could not open '$file' $!\n";
while (my $line = <$data>) {
	chomp $line;
  if ($csv->parse($line)) {
     my @fields = $csv->fields();
     say $fields[0];
		 if(!$fields[1]){##纯图片
			 system qq(wget -O wx.jpeg \"$fields[2]\");
			 system qq(mv wx.jpeg dhqWX/$fields[0]);
		 }else{
			 system qq(./phantomjs.exe phantomwx.js \"$fields[2]\" >wx.html);
	     rename "wx.png","$fields[1].png";
	     rename "wx.html", "$fields[1].html";
	     system qq(mv \"$fields[1]\"* dhqWX/$fields[0]);
		 }
  } else {
     warn "Line could not be parsed: $line\n";
 }
}


closedir DH;
