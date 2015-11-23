/**
*/
function chunkData( str: string, step: number ) : Array {
  var colNames : Array = [];
  var len  = str.length;
  var i : number = 0;
  for (;i < len;i += step) {
    if (i + step < len) {
      colNames.push(str.substring(i, i + step));
    } else {
      colNames.push(str.substring(i, len));
    }
  }
  return colNames;
}
;
