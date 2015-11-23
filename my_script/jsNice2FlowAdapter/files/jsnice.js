/**
 * @param {string} str
 * @param {number} step
 * @return {?}
 */
function chunkData(str, step) {
    /** @type {Array} */
    var colNames = [];
    var len = str.length;
    /** @type {number} */
    var i = 0;
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