require "cgi"
v='%C1%D6%BF%A1%BD%DC'
open("out.txt","w"){|f|f<<(CGI.unescape v)}