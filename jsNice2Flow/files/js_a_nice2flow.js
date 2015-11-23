var sent : string = "This is something";
var slen : number = sent.length;
var siz : number = 25;
var a : numberr a = -3;
var b : number = 0;
var subsent : string = "x";
/**
*/
function makeSub( l: number, p: number ) : string {
  subsent = sent.substring(l, p);
  return subsent;
}
/**
*/
function newMake( ) : string {
  a = a + 3;
  b = a + siz;
  makeSub(a, b);
  return subsent;
}
/**
*/
function doIt( ) : undefined {
  var j : number = 1;
  for (;j <= slen;j++) {
    setTimeout("document.z.textdisplay.value = newMake()", j * 300);
    setTimeout("window.status = newMake()", j * 300);
  }
}
;
