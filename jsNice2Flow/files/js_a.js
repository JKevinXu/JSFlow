/** @type {string} */
var sent = "This is something";
/** @type {number} */
var slen = sent.length;
/** @type {number} */
var siz = 25;
/** @type {number} */
var a = -3;
/** @type {number} */
var b = 0;
/** @type {string} */
var subsent = "x";
/**
 * @param {number} l
 * @param {number} p
 * @return {string}
 */
function makeSub(l, p) {
    /** @type {string} */
    subsent = sent.substring(l, p);
    return subsent;
}
/**
 * @return {string}
 */
function newMake() {
    /** @type {number} */
    a = a + 3;
    /** @type {number} */
    b = a + siz;
    makeSub(a, b);
    return subsent;
}
/**
 * @return {undefined}
 */
function doIt() {
    /** @type {number} */
    var j = 1;
    for (;j <= slen;j++) {
        setTimeout("document.z.textdisplay.value = newMake()", j * 300);
        setTimeout("window.status = newMake()", j * 300);
    }
}
;