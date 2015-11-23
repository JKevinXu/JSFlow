var Crypto = new BenchmarkSuite("Crypto", [266181], [new Benchmark("Encrypt", true, false, 3900, encrypt), new Benchmark("Decrypt", true, false, 220, decrypt)]);
var dbits;
var BI_DB;
var BI_DM;
var BI_DV;
var BI_FP;
var BI_FV;
var BI_F1;
var BI_F2;
/** @type {number} */
var canary = 0xdeadbeefcafe;
/** @type {boolean} */
var j_lm = (canary & 16777215) == 15715070;
/**
 * @param {(number|string)} html
 * @param {number} opt_attributes
 * @param {number} attributes
 * @return {undefined}
 */
function BigInteger(html, opt_attributes, attributes) {
    /** @type {Array} */
    this.array = new Array;
    if (html != null) {
        if ("number" == typeof html) {
            this.fromNumber(html, opt_attributes, attributes);
        } else {
            if (opt_attributes == null && "string" != typeof html) {
                this.fromString(html, 256);
            } else {
                this.fromString(html, opt_attributes);
            }
        }
    }
}
/**
 * @return {?}
 */
function nbi() {
    return new BigInteger(null);
}
/**
 * @param {?} i
 * @param {?} dataAndEvents
 * @param {Object} self
 * @param {?} off
 * @param {(number|string)} lineno
 * @param {?} deepDataAndEvents
 * @return {?}
 */
function am1(i, dataAndEvents, self, off, lineno, deepDataAndEvents) {
    var classNames = this.array;
    var buf = self.array;
    for (;--deepDataAndEvents >= 0;) {
        var line = dataAndEvents * classNames[i++] + buf[off] + lineno;
        /** @type {number} */
        lineno = Math.floor(line / 67108864);
        /** @type {number} */
        buf[off++] = line & 67108863;
    }
    return lineno;
}
/**
 * @param {?} index
 * @param {number} deepDataAndEvents
 * @param {Object} self
 * @param {?} off
 * @param {number} dataAndEvents
 * @param {?} ignoreMethodDoesntExist
 * @return {?}
 */
function am2(index, deepDataAndEvents, self, off, dataAndEvents, ignoreMethodDoesntExist) {
    var array = this.array;
    var buf = self.array;
    /** @type {number} */
    var a10 = deepDataAndEvents & 32767;
    /** @type {number} */
    var x = deepDataAndEvents >> 15;
    for (;--ignoreMethodDoesntExist >= 0;) {
        /** @type {number} */
        var a00 = array[index] & 32767;
        /** @type {number} */
        var y = array[index++] >> 15;
        /** @type {number} */
        var m = x * a00 + y * a10;
        a00 = a10 * a00 + ((m & 32767) << 15) + buf[off] + (dataAndEvents & 1073741823);
        /** @type {number} */
        dataAndEvents = (a00 >>> 30) + (m >>> 15) + x * y + (dataAndEvents >>> 30);
        /** @type {number} */
        buf[off++] = a00 & 1073741823;
    }
    return dataAndEvents;
}
/**
 * @param {?} index
 * @param {number} deepDataAndEvents
 * @param {Object} self
 * @param {?} off
 * @param {(number|string)} relativeX
 * @param {?} dataAndEvents
 * @return {?}
 */
function am3(index, deepDataAndEvents, self, off, relativeX, dataAndEvents) {
    var array = this.array;
    var buf = self.array;
    /** @type {number} */
    var y = deepDataAndEvents & 16383;
    /** @type {number} */
    var a00 = deepDataAndEvents >> 14;
    for (;--dataAndEvents >= 0;) {
        /** @type {number} */
        var x = array[index] & 16383;
        /** @type {number} */
        var a10 = array[index++] >> 14;
        /** @type {number} */
        var m = a00 * x + a10 * y;
        x = y * x + ((m & 16383) << 14) + buf[off] + relativeX;
        /** @type {number} */
        relativeX = (x >> 28) + (m >> 14) + a00 * a10;
        /** @type {number} */
        buf[off++] = x & 268435455;
    }
    return relativeX;
}
/**
 * @param {?} index
 * @param {number} deepDataAndEvents
 * @param {Object} self
 * @param {?} off
 * @param {(number|string)} relativeX
 * @param {?} dataAndEvents
 * @return {?}
 */
function am4(index, deepDataAndEvents, self, off, relativeX, dataAndEvents) {
    var array = this.array;
    var buf = self.array;
    /** @type {number} */
    var y = deepDataAndEvents & 8191;
    /** @type {number} */
    var a00 = deepDataAndEvents >> 13;
    for (;--dataAndEvents >= 0;) {
        /** @type {number} */
        var x = array[index] & 8191;
        /** @type {number} */
        var a10 = array[index++] >> 13;
        /** @type {number} */
        var m = a00 * x + a10 * y;
        x = y * x + ((m & 8191) << 13) + buf[off] + relativeX;
        /** @type {number} */
        relativeX = (x >> 26) + (m >> 13) + a00 * a10;
        /** @type {number} */
        buf[off++] = x & 67108863;
    }
    return relativeX;
}
/**
 * @param {string} dataAndEvents
 * @param {number} opt_attributes
 * @return {undefined}
 */
setupEngine = function(dataAndEvents, opt_attributes) {
    /** @type {string} */
    BigInteger.prototype.am = dataAndEvents;
    /** @type {number} */
    dbits = opt_attributes;
    BI_DB = dbits;
    /** @type {number} */
    BI_DM = (1 << dbits) - 1;
    /** @type {number} */
    BI_DV = 1 << dbits;
    /** @type {number} */
    BI_FP = 52;
    /** @type {number} */
    BI_FV = Math.pow(2, BI_FP);
    /** @type {number} */
    BI_F1 = BI_FP - dbits;
    /** @type {number} */
    BI_F2 = 2 * dbits - BI_FP;
};
/** @type {string} */
var BI_RM = "0123456789abcdefghijklmnopqrstuvwxyz";
/** @type {Array} */
var BI_RC = new Array;
var rr;
var vv;
/** @type {number} */
rr = "0".charCodeAt(0);
/** @type {number} */
vv = 0;
for (;vv <= 9;++vv) {
    /** @type {number} */
    BI_RC[rr++] = vv;
}
/** @type {number} */
rr = "a".charCodeAt(0);
/** @type {number} */
vv = 10;
for (;vv < 36;++vv) {
    /** @type {number} */
    BI_RC[rr++] = vv;
}
/** @type {number} */
rr = "A".charCodeAt(0);
/** @type {number} */
vv = 10;
for (;vv < 36;++vv) {
    /** @type {number} */
    BI_RC[rr++] = vv;
}
/**
 * @param {?} o2
 * @return {?}
 */
function int2char(o2) {
    return BI_RM.charAt(o2);
}
/**
 * @param {string} str
 * @param {number} pos
 * @return {?}
 */
function intAt(str, pos) {
    var deepDataAndEvents = BI_RC[str.charCodeAt(pos)];
    return deepDataAndEvents == null ? -1 : deepDataAndEvents;
}
/**
 * @param {Object} t
 * @return {undefined}
 */
function bnpCopyTo(t) {
    var data = this.array;
    var cache = t.array;
    /** @type {number} */
    var prop = this.t - 1;
    for (;prop >= 0;--prop) {
        cache[prop] = data[prop];
    }
    t.t = this.t;
    t.s = this.s;
}
/**
 * @param {number} recurring
 * @return {undefined}
 */
function bnpFromInt(recurring) {
    var array = this.array;
    /** @type {number} */
    this.t = 1;
    /** @type {number} */
    this.s = recurring < 0 ? -1 : 0;
    if (recurring > 0) {
        /** @type {number} */
        array[0] = recurring;
    } else {
        if (recurring < -1) {
            array[0] = recurring + DV;
        } else {
            /** @type {number} */
            this.t = 0;
        }
    }
}
/**
 * @param {number} recurring
 * @return {?}
 */
function nbv(recurring) {
    var content = nbi();
    content.fromInt(recurring);
    return content;
}
/**
 * @param {string} xhtml
 * @param {number} opt_attributes
 * @return {undefined}
 */
function bnpFromString(xhtml, opt_attributes) {
    var array = this.array;
    var value;
    if (opt_attributes == 16) {
        /** @type {number} */
        value = 4;
    } else {
        if (opt_attributes == 8) {
            /** @type {number} */
            value = 3;
        } else {
            if (opt_attributes == 256) {
                /** @type {number} */
                value = 8;
            } else {
                if (opt_attributes == 2) {
                    /** @type {number} */
                    value = 1;
                } else {
                    if (opt_attributes == 32) {
                        /** @type {number} */
                        value = 5;
                    } else {
                        if (opt_attributes == 4) {
                            /** @type {number} */
                            value = 2;
                        } else {
                            this.fromRadix(xhtml, opt_attributes);
                            return;
                        }
                    }
                }
            }
        }
    }
    /** @type {number} */
    this.t = 0;
    /** @type {number} */
    this.s = 0;
    var i = xhtml.length;
    /** @type {boolean} */
    var mi = false;
    /** @type {number} */
    var sum = 0;
    for (;--i >= 0;) {
        var tmp = value == 8 ? xhtml[i] & 255 : intAt(xhtml, i);
        if (tmp < 0) {
            if (xhtml.charAt(i) == "-") {
                /** @type {boolean} */
                mi = true;
            }
            continue;
        }
        /** @type {boolean} */
        mi = false;
        if (sum == 0) {
            array[this.t++] = tmp;
        } else {
            if (sum + value > BI_DB) {
                array[this.t - 1] |= (tmp & (1 << BI_DB - sum) - 1) << sum;
                /** @type {number} */
                array[this.t++] = tmp >> BI_DB - sum;
            } else {
                array[this.t - 1] |= tmp << sum;
            }
        }
        sum += value;
        if (sum >= BI_DB) {
            sum -= BI_DB;
        }
    }
    if (value == 8 && (xhtml[0] & 128) != 0) {
        /** @type {number} */
        this.s = -1;
        if (sum > 0) {
            array[this.t - 1] |= (1 << BI_DB - sum) - 1 << sum;
        }
    }
    this.clamp();
    if (mi) {
        BigInteger.ZERO.subTo(this, this);
    }
}
/**
 * @return {undefined}
 */
function bnpClamp() {
    var a = this.array;
    /** @type {number} */
    var item = this.s & BI_DM;
    for (;this.t > 0 && a[this.t - 1] == item;) {
        --this.t;
    }
}
/**
 * @param {number} radix
 * @return {?}
 */
function bnToString(radix) {
    var a = this.array;
    if (this.s < 0) {
        return "-" + this.negate().toString(radix);
    }
    var sz;
    if (radix == 16) {
        /** @type {number} */
        sz = 4;
    } else {
        if (radix == 8) {
            /** @type {number} */
            sz = 3;
        } else {
            if (radix == 2) {
                /** @type {number} */
                sz = 1;
            } else {
                if (radix == 32) {
                    /** @type {number} */
                    sz = 5;
                } else {
                    if (radix == 4) {
                        /** @type {number} */
                        sz = 2;
                    } else {
                        return this.toRadix(radix);
                    }
                }
            }
        }
    }
    /** @type {number} */
    var km = (1 << sz) - 1;
    var o;
    /** @type {boolean} */
    var disableLoopProtection = false;
    /** @type {string} */
    var code = "";
    var i = this.t;
    /** @type {number} */
    var at = BI_DB - i * BI_DB % sz;
    if (i-- > 0) {
        if (at < BI_DB && (o = a[i] >> at) > 0) {
            /** @type {boolean} */
            disableLoopProtection = true;
            code = int2char(o);
        }
        for (;i >= 0;) {
            if (at < sz) {
                /** @type {number} */
                o = (a[i] & (1 << at) - 1) << sz - at;
                o |= a[--i] >> (at += BI_DB - sz);
            } else {
                /** @type {number} */
                o = a[i] >> (at -= sz) & km;
                if (at <= 0) {
                    at += BI_DB;
                    --i;
                }
            }
            if (o > 0) {
                /** @type {boolean} */
                disableLoopProtection = true;
            }
            if (disableLoopProtection) {
                code += int2char(o);
            }
        }
    }
    return disableLoopProtection ? code : "0";
}
/**
 * @return {?}
 */
function bnNegate() {
    var ll = nbi();
    BigInteger.ZERO.subTo(this, ll);
    return ll;
}
/**
 * @return {?}
 */
function bnAbs() {
    return this.s < 0 ? this.negate() : this;
}
/**
 * @param {?} d
 * @return {?}
 */
function bnCompareTo(d) {
    var a = this.array;
    var b = d.array;
    /** @type {number} */
    var s2 = this.s - d.s;
    if (s2 != 0) {
        return s2;
    }
    var t = this.t;
    /** @type {number} */
    s2 = t - d.t;
    if (s2 != 0) {
        return s2;
    }
    for (;--t >= 0;) {
        if ((s2 = a[t] - b[t]) != 0) {
            return s2;
        }
    }
    return 0;
}
/**
 * @param {number} dataAndEvents
 * @return {?}
 */
function nbits(dataAndEvents) {
    /** @type {number} */
    var nbits = 1;
    var t;
    if ((t = dataAndEvents >>> 16) != 0) {
        /** @type {number} */
        dataAndEvents = t;
        nbits += 16;
    }
    if ((t = dataAndEvents >> 8) != 0) {
        /** @type {number} */
        dataAndEvents = t;
        nbits += 8;
    }
    if ((t = dataAndEvents >> 4) != 0) {
        /** @type {number} */
        dataAndEvents = t;
        nbits += 4;
    }
    if ((t = dataAndEvents >> 2) != 0) {
        /** @type {number} */
        dataAndEvents = t;
        nbits += 2;
    }
    if ((t = dataAndEvents >> 1) != 0) {
        /** @type {number} */
        dataAndEvents = t;
        nbits += 1;
    }
    return nbits;
}
/**
 * @return {?}
 */
function bnBitLength() {
    var array = this.array;
    if (this.t <= 0) {
        return 0;
    }
    return BI_DB * (this.t - 1) + nbits(array[this.t - 1] ^ this.s & BI_DM);
}
/**
 * @param {number} keepData
 * @param {Object} value
 * @return {undefined}
 */
function bnpDLShiftTo(keepData, value) {
    var array = this.array;
    var o = value.array;
    var i;
    /** @type {number} */
    i = this.t - 1;
    for (;i >= 0;--i) {
        o[i + keepData] = array[i];
    }
    /** @type {number} */
    i = keepData - 1;
    for (;i >= 0;--i) {
        /** @type {number} */
        o[i] = 0;
    }
    value.t = this.t + keepData;
    value.s = this.s;
}
/**
 * @param {number} from
 * @param {Object} value
 * @return {undefined}
 */
function bnpDRShiftTo(from, value) {
    var array = this.array;
    var o = value.array;
    /** @type {number} */
    var i = from;
    for (;i < this.t;++i) {
        o[i - from] = array[i];
    }
    /** @type {number} */
    value.t = Math.max(this.t - from, 0);
    value.s = this.s;
}
/**
 * @param {number} key
 * @param {Object} x
 * @return {undefined}
 */
function bnpLShiftTo(key, x) {
    var processingFlags = this.array;
    var array = x.array;
    /** @type {number} */
    var clientTop = key % BI_DB;
    /** @type {number} */
    var top = BI_DB - clientTop;
    /** @type {number} */
    var processedMask = (1 << top) - 1;
    /** @type {number} */
    var i = Math.floor(key / BI_DB);
    /** @type {number} */
    var value = this.s << clientTop & BI_DM;
    var index;
    /** @type {number} */
    index = this.t - 1;
    for (;index >= 0;--index) {
        /** @type {number} */
        array[index + i + 1] = processingFlags[index] >> top | value;
        /** @type {number} */
        value = (processingFlags[index] & processedMask) << clientTop;
    }
    /** @type {number} */
    index = i - 1;
    for (;index >= 0;--index) {
        /** @type {number} */
        array[index] = 0;
    }
    /** @type {number} */
    array[i] = value;
    x.t = this.t + i + 1;
    x.s = this.s;
    x.clamp();
}
/**
 * @param {number} dataAndEvents
 * @param {?} x
 * @return {undefined}
 */
function bnpRShiftTo(dataAndEvents, x) {
    var points = this.array;
    var array = x.array;
    x.s = this.s;
    /** @type {number} */
    var minX = Math.floor(dataAndEvents / BI_DB);
    if (minX >= this.t) {
        /** @type {number} */
        x.t = 0;
        return;
    }
    /** @type {number} */
    var clientTop = dataAndEvents % BI_DB;
    /** @type {number} */
    var top = BI_DB - clientTop;
    /** @type {number} */
    var s = (1 << clientTop) - 1;
    /** @type {number} */
    array[0] = points[minX] >> clientTop;
    /** @type {number} */
    var maxX = minX + 1;
    for (;maxX < this.t;++maxX) {
        array[maxX - minX - 1] |= (points[maxX] & s) << top;
        /** @type {number} */
        array[maxX - minX] = points[maxX] >> clientTop;
    }
    if (clientTop > 0) {
        array[this.t - minX - 1] |= (this.s & s) << top;
    }
    /** @type {number} */
    x.t = this.t - minX;
    x.clamp();
}
/**
 * @param {?} value
 * @param {Object} x
 * @return {undefined}
 */
function bnpSubTo(value, x) {
    var a = this.array;
    var target = x.array;
    var b = value.array;
    /** @type {number} */
    var i = 0;
    /** @type {number} */
    var s = 0;
    /** @type {number} */
    var padLength = Math.min(value.t, this.t);
    for (;i < padLength;) {
        s += a[i] - b[i];
        /** @type {number} */
        target[i++] = s & BI_DM;
        s >>= BI_DB;
    }
    if (value.t < this.t) {
        s -= value.s;
        for (;i < this.t;) {
            s += a[i];
            /** @type {number} */
            target[i++] = s & BI_DM;
            s >>= BI_DB;
        }
        s += this.s;
    } else {
        s += this.s;
        for (;i < value.t;) {
            s -= b[i];
            /** @type {number} */
            target[i++] = s & BI_DM;
            s >>= BI_DB;
        }
        s -= value.s;
    }
    /** @type {number} */
    x.s = s < 0 ? -1 : 0;
    if (s < -1) {
        target[i++] = BI_DV + s;
    } else {
        if (s > 0) {
            target[i++] = s;
        }
    }
    /** @type {number} */
    x.t = i;
    x.clamp();
}
/**
 * @param {Node} clone
 * @param {Object} b
 * @return {undefined}
 */
function bnpMultiplyTo(clone, b) {
    var array = this.array;
    var sb = b.array;
    var self = this.abs();
    var options = clone.abs();
    var args = options.array;
    var i = self.t;
    b.t = i + options.t;
    for (;--i >= 0;) {
        /** @type {number} */
        sb[i] = 0;
    }
    /** @type {number} */
    i = 0;
    for (;i < options.t;++i) {
        sb[i + self.t] = self.am(0, args[i], b, i, 0, self.t);
    }
    /** @type {number} */
    b.s = 0;
    b.clamp();
    if (this.s != clone.s) {
        BigInteger.ZERO.subTo(b, b);
    }
}
/**
 * @param {Object} b
 * @return {undefined}
 */
function bnpSquareTo(b) {
    var e = this.abs();
    var a = e.array;
    var l = b.array;
    /** @type {number} */
    var h = b.t = 2 * e.t;
    for (;--h >= 0;) {
        /** @type {number} */
        l[h] = 0;
    }
    /** @type {number} */
    h = 0;
    for (;h < e.t - 1;++h) {
        var hsl = e.am(h, a[h], b, 2 * h, 0, 1);
        if ((l[h + e.t] += e.am(h + 1, 2 * a[h], b, 2 * h + 1, hsl, e.t - h - 1)) >= BI_DV) {
            l[h + e.t] -= BI_DV;
            /** @type {number} */
            l[h + e.t + 1] = 1;
        }
    }
    if (b.t > 0) {
        l[b.t - 1] += e.am(h, a[h], b, 2 * h, 0, 1);
    }
    /** @type {number} */
    b.s = 0;
    b.clamp();
}
/**
 * @param {Object} value
 * @param {?} isXML
 * @param {Object} x
 * @return {undefined}
 */
function bnpDivRemTo(value, isXML, x) {
    var c = value.abs();
    if (c.t <= 0) {
        return;
    }
    var a = this.abs();
    if (a.t < c.t) {
        if (isXML != null) {
            isXML.fromInt(0);
        }
        if (x != null) {
            this.copyTo(x);
        }
        return;
    }
    if (x == null) {
        x = nbi();
    }
    var d = nbi();
    var tmp_str = this.s;
    var s = value.s;
    var cl = c.array;
    /** @type {number} */
    var node = BI_DB - nbits(cl[c.t - 1]);
    if (node > 0) {
        c.lShiftTo(node, d);
        a.lShiftTo(node, x);
    } else {
        c.copyTo(d);
        a.copyTo(x);
    }
    var type = d.t;
    var ps = d.array;
    var key = ps[type - 1];
    if (key == 0) {
        return;
    }
    /** @type {number} */
    var noTicks = key * (1 << BI_F1) + (type > 1 ? ps[type - 2] >> BI_F2 : 0);
    /** @type {number} */
    var d1 = BI_FV / noTicks;
    /** @type {number} */
    var delta = (1 << BI_F1) / noTicks;
    /** @type {number} */
    var FUDGE_FACTOR = 1 << BI_F2;
    var i = x.t;
    /** @type {number} */
    var name = i - type;
    var b = isXML == null ? nbi() : isXML;
    d.dlShiftTo(name, b);
    var array = x.array;
    if (x.compareTo(b) >= 0) {
        /** @type {number} */
        array[x.t++] = 1;
        x.subTo(b, x);
    }
    BigInteger.ONE.dlShiftTo(type, b);
    b.subTo(d, d);
    for (;d.t < type;) {
        /** @type {number} */
        ps[d.t++] = 0;
    }
    for (;--name >= 0;) {
        var _attrId = array[--i] == key ? BI_DM : Math.floor(array[i] * d1 + (array[i - 1] + FUDGE_FACTOR) * delta);
        if ((array[i] += d.am(0, _attrId, x, name, 0, type)) < _attrId) {
            d.dlShiftTo(name, b);
            x.subTo(b, x);
            for (;array[i] < --_attrId;) {
                x.subTo(b, x);
            }
        }
    }
    if (isXML != null) {
        x.drShiftTo(type, isXML);
        if (tmp_str != s) {
            BigInteger.ZERO.subTo(isXML, isXML);
        }
    }
    x.t = type;
    x.clamp();
    if (node > 0) {
        x.rShiftTo(node, x);
    }
    if (tmp_str < 0) {
        BigInteger.ZERO.subTo(x, x);
    }
}
/**
 * @param {?} other
 * @return {?}
 */
function bnMod(other) {
    var approx = nbi();
    this.abs().divRemTo(other, null, approx);
    if (this.s < 0 && approx.compareTo(BigInteger.ZERO) > 0) {
        other.subTo(approx, approx);
    }
    return approx;
}
/**
 * @param {Object} m
 * @return {undefined}
 */
function Classic(m) {
    /** @type {Object} */
    this.m = m;
}
/**
 * @param {Node} x
 * @return {?}
 */
function cConvert(x) {
    if (x.s < 0 || x.compareTo(this.m) >= 0) {
        return x.mod(this.m);
    } else {
        return x;
    }
}
/**
 * @param {?} t
 * @return {?}
 */
function cRevert(t) {
    return t;
}
/**
 * @param {Object} b
 * @return {undefined}
 */
function cReduce(b) {
    b.divRemTo(this.m, null, b);
}
/**
 * @param {?} body
 * @param {Node} i
 * @param {Object} t
 * @return {undefined}
 */
function cMulTo(body, i, t) {
    body.multiplyTo(i, t);
    this.reduce(t);
}
/**
 * @param {?} action
 * @param {Object} t
 * @return {undefined}
 */
function cSqrTo(action, t) {
    action.squareTo(t);
    this.reduce(t);
}
/** @type {function (Node): ?} */
Classic.prototype.convert = cConvert;
/** @type {function (?): ?} */
Classic.prototype.revert = cRevert;
/** @type {function (Object): undefined} */
Classic.prototype.reduce = cReduce;
/** @type {function (?, Node, Object): undefined} */
Classic.prototype.mulTo = cMulTo;
/** @type {function (?, Object): undefined} */
Classic.prototype.sqrTo = cSqrTo;
/**
 * @return {?}
 */
function bnpInvDigit() {
    var array = this.array;
    if (this.t < 1) {
        return 0;
    }
    var c = array[0];
    if ((c & 1) == 0) {
        return 0;
    }
    /** @type {number} */
    var b = c & 3;
    /** @type {number} */
    b = b * (2 - (c & 15) * b) & 15;
    /** @type {number} */
    b = b * (2 - (c & 255) * b) & 255;
    /** @type {number} */
    b = b * (2 - ((c & 65535) * b & 65535)) & 65535;
    /** @type {number} */
    b = b * (2 - c * b % BI_DV) % BI_DV;
    return b > 0 ? BI_DV - b : -b;
}
/**
 * @param {Object} m
 * @return {undefined}
 */
function Montgomery(m) {
    /** @type {Object} */
    this.m = m;
    this.mp = m.invDigit();
    /** @type {number} */
    this.mpl = this.mp & 32767;
    /** @type {number} */
    this.mph = this.mp >> 15;
    /** @type {number} */
    this.um = (1 << BI_DB - 15) - 1;
    /** @type {number} */
    this.mt2 = 2 * m.t;
}
/**
 * @param {?} t
 * @return {?}
 */
function montConvert(t) {
    var approx = nbi();
    t.abs().dlShiftTo(this.m.t, approx);
    approx.divRemTo(this.m, null, approx);
    if (t.s < 0 && approx.compareTo(BigInteger.ZERO) > 0) {
        this.m.subTo(approx, approx);
    }
    return approx;
}
/**
 * @param {?} t
 * @return {?}
 */
function montRevert(t) {
    var oldconfig = nbi();
    t.copyTo(oldconfig);
    this.reduce(oldconfig);
    return oldconfig;
}
/**
 * @param {Object} b
 * @return {undefined}
 */
function montReduce(b) {
    var array = b.array;
    for (;b.t <= this.mt2;) {
        /** @type {number} */
        array[b.t++] = 0;
    }
    /** @type {number} */
    var offset = 0;
    for (;offset < this.m.t;++offset) {
        /** @type {number} */
        var index = array[offset] & 32767;
        /** @type {number} */
        var r20 = index * this.mpl + ((index * this.mph + (array[offset] >> 15) * this.mpl & this.um) << 15) & BI_DM;
        index = offset + this.m.t;
        array[index] += this.m.am(0, r20, b, offset, 0, this.m.t);
        for (;array[index] >= BI_DV;) {
            array[index] -= BI_DV;
            array[++index]++;
        }
    }
    b.clamp();
    b.drShiftTo(this.m.t, b);
    if (b.compareTo(this.m) >= 0) {
        b.subTo(this.m, b);
    }
}
/**
 * @param {?} action
 * @param {Object} t
 * @return {undefined}
 */
function montSqrTo(action, t) {
    action.squareTo(t);
    this.reduce(t);
}
/**
 * @param {?} body
 * @param {Node} i
 * @param {Object} t
 * @return {undefined}
 */
function montMulTo(body, i, t) {
    body.multiplyTo(i, t);
    this.reduce(t);
}
/** @type {function (?): ?} */
Montgomery.prototype.convert = montConvert;
/** @type {function (?): ?} */
Montgomery.prototype.revert = montRevert;
/** @type {function (Object): undefined} */
Montgomery.prototype.reduce = montReduce;
/** @type {function (?, Node, Object): undefined} */
Montgomery.prototype.mulTo = montMulTo;
/** @type {function (?, Object): undefined} */
Montgomery.prototype.sqrTo = montSqrTo;
/**
 * @return {?}
 */
function bnpIsEven() {
    var array = this.array;
    return(this.t > 0 ? array[0] & 1 : this.s) == 0;
}
/**
 * @param {number} dataAndEvents
 * @param {Object} element
 * @return {?}
 */
function bnpExp(dataAndEvents, element) {
    if (dataAndEvents > 4294967295 || dataAndEvents < 1) {
        return BigInteger.ONE;
    }
    var jump = nbi();
    var action = nbi();
    var classNames = element.convert(this);
    /** @type {number} */
    var i = nbits(dataAndEvents) - 1;
    classNames.copyTo(jump);
    for (;--i >= 0;) {
        element.sqrTo(jump, action);
        if ((dataAndEvents & 1 << i) > 0) {
            element.mulTo(action, classNames, jump);
        } else {
            var t = jump;
            jump = action;
            action = t;
        }
    }
    return element.revert(jump);
}
/**
 * @param {number} node
 * @param {?} dataAndEvents
 * @return {?}
 */
function bnModPowInt(node, dataAndEvents) {
    var activeClassName;
    if (node < 256 || dataAndEvents.isEven()) {
        activeClassName = new Classic(dataAndEvents);
    } else {
        activeClassName = new Montgomery(dataAndEvents);
    }
    return this.exp(node, activeClassName);
}
/** @type {function (Object): undefined} */
BigInteger.prototype.copyTo = bnpCopyTo;
/** @type {function (number): undefined} */
BigInteger.prototype.fromInt = bnpFromInt;
/** @type {function (string, number): undefined} */
BigInteger.prototype.fromString = bnpFromString;
/** @type {function (): undefined} */
BigInteger.prototype.clamp = bnpClamp;
/** @type {function (number, Object): undefined} */
BigInteger.prototype.dlShiftTo = bnpDLShiftTo;
/** @type {function (number, Object): undefined} */
BigInteger.prototype.drShiftTo = bnpDRShiftTo;
/** @type {function (number, Object): undefined} */
BigInteger.prototype.lShiftTo = bnpLShiftTo;
/** @type {function (number, ?): undefined} */
BigInteger.prototype.rShiftTo = bnpRShiftTo;
/** @type {function (?, Object): undefined} */
BigInteger.prototype.subTo = bnpSubTo;
/** @type {function (Node, Object): undefined} */
BigInteger.prototype.multiplyTo = bnpMultiplyTo;
/** @type {function (Object): undefined} */
BigInteger.prototype.squareTo = bnpSquareTo;
/** @type {function (Object, ?, Object): undefined} */
BigInteger.prototype.divRemTo = bnpDivRemTo;
/** @type {function (): ?} */
BigInteger.prototype.invDigit = bnpInvDigit;
/** @type {function (): ?} */
BigInteger.prototype.isEven = bnpIsEven;
/** @type {function (number, Object): ?} */
BigInteger.prototype.exp = bnpExp;
/** @type {function (number): ?} */
BigInteger.prototype.toString = bnToString;
/** @type {function (): ?} */
BigInteger.prototype.negate = bnNegate;
/** @type {function (): ?} */
BigInteger.prototype.abs = bnAbs;
/** @type {function (?): ?} */
BigInteger.prototype.compareTo = bnCompareTo;
/** @type {function (): ?} */
BigInteger.prototype.bitLength = bnBitLength;
/** @type {function (?): ?} */
BigInteger.prototype.mod = bnMod;
/** @type {function (number, ?): ?} */
BigInteger.prototype.modPowInt = bnModPowInt;
BigInteger.ZERO = nbv(0);
BigInteger.ONE = nbv(1);
/**
 * @return {?}
 */
function bnClone() {
    var jump = nbi();
    this.copyTo(jump);
    return jump;
}
/**
 * @return {?}
 */
function bnIntValue() {
    var array = this.array;
    if (this.s < 0) {
        if (this.t == 1) {
            return array[0] - BI_DV;
        } else {
            if (this.t == 0) {
                return-1;
            }
        }
    } else {
        if (this.t == 1) {
            return array[0];
        } else {
            if (this.t == 0) {
                return 0;
            }
        }
    }
    return(array[1] & (1 << 32 - BI_DB) - 1) << BI_DB | array[0];
}
/**
 * @return {?}
 */
function bnByteValue() {
    var array = this.array;
    return this.t == 0 ? this.s : array[0] << 24 >> 24;
}
/**
 * @return {?}
 */
function bnShortValue() {
    var array = this.array;
    return this.t == 0 ? this.s : array[0] << 16 >> 16;
}
/**
 * @param {number} a
 * @return {?}
 */
function bnpChunkSize(a) {
    return Math.floor(Math.LN2 * BI_DB / Math.log(a));
}
/**
 * @return {?}
 */
function bnSigNum() {
    var array = this.array;
    if (this.s < 0) {
        return-1;
    } else {
        if (this.t <= 0 || this.t == 1 && array[0] <= 0) {
            return 0;
        } else {
            return 1;
        }
    }
}
/**
 * @param {number} value
 * @return {?}
 */
function bnpToRadix(value) {
    if (value == null) {
        /** @type {number} */
        value = 10;
    }
    if (this.signum() == 0 || (value < 2 || value > 36)) {
        return "0";
    }
    var f = this.chunkSize(value);
    /** @type {number} */
    var key = Math.pow(value, f);
    var camelKey = nbv(key);
    var tmpSet = nbi();
    var ll = nbi();
    /** @type {string} */
    var expression = "";
    this.divRemTo(camelKey, tmpSet, ll);
    for (;tmpSet.signum() > 0;) {
        expression = (key + ll.intValue()).toString(value).substr(1) + expression;
        tmpSet.divRemTo(camelKey, tmpSet, ll);
    }
    return ll.intValue().toString(value) + expression;
}
/**
 * @param {string} xhtml
 * @param {number} p
 * @return {undefined}
 */
function bnpFromRadix(xhtml, p) {
    this.fromInt(0);
    if (p == null) {
        /** @type {number} */
        p = 10;
    }
    var n = this.chunkSize(p);
    /** @type {number} */
    var result = Math.pow(p, n);
    /** @type {boolean} */
    var mi = false;
    /** @type {number} */
    var exponent = 0;
    /** @type {number} */
    var end = 0;
    /** @type {number} */
    var i = 0;
    for (;i < xhtml.length;++i) {
        var start = intAt(xhtml, i);
        if (start < 0) {
            if (xhtml.charAt(i) == "-" && this.signum() == 0) {
                /** @type {boolean} */
                mi = true;
            }
            continue;
        }
        end = p * end + start;
        if (++exponent >= n) {
            this.dMultiply(result);
            this.dAddOffset(end, 0);
            /** @type {number} */
            exponent = 0;
            /** @type {number} */
            end = 0;
        }
    }
    if (exponent > 0) {
        this.dMultiply(Math.pow(p, exponent));
        this.dAddOffset(end, 0);
    }
    if (mi) {
        BigInteger.ZERO.subTo(this, this);
    }
}
/**
 * @param {number} deepDataAndEvents
 * @param {number} opt_attributes
 * @param {number} attributes
 * @return {undefined}
 */
function bnpFromNumber(deepDataAndEvents, opt_attributes, attributes) {
    if ("number" == typeof opt_attributes) {
        if (deepDataAndEvents < 2) {
            this.fromInt(1);
        } else {
            this.fromNumber(deepDataAndEvents, attributes);
            if (!this.testBit(deepDataAndEvents - 1)) {
                this.bitwiseTo(BigInteger.ONE.shiftLeft(deepDataAndEvents - 1), op_or, this);
            }
            if (this.isEven()) {
                this.dAddOffset(1, 0);
            }
            for (;!this.isProbablePrime(opt_attributes);) {
                this.dAddOffset(2, 0);
                if (this.bitLength() > deepDataAndEvents) {
                    this.subTo(BigInteger.ONE.shiftLeft(deepDataAndEvents - 1), this);
                }
            }
        }
    } else {
        /** @type {Array} */
        var html = new Array;
        /** @type {number} */
        var t = deepDataAndEvents & 7;
        /** @type {number} */
        html.length = (deepDataAndEvents >> 3) + 1;
        opt_attributes.nextBytes(html);
        if (t > 0) {
            html[0] &= (1 << t) - 1;
        } else {
            /** @type {number} */
            html[0] = 0;
        }
        this.fromString(html, 256);
    }
}
/**
 * @return {?}
 */
function bnToByteArray() {
    var a = this.array;
    var i = this.t;
    /** @type {Array} */
    var segments = new Array;
    segments[0] = this.s;
    /** @type {number} */
    var betashift = BI_DB - i * BI_DB % 8;
    var v;
    /** @type {number} */
    var pos = 0;
    if (i-- > 0) {
        if (betashift < BI_DB && (v = a[i] >> betashift) != (this.s & BI_DM) >> betashift) {
            /** @type {number} */
            segments[pos++] = v | this.s << BI_DB - betashift;
        }
        for (;i >= 0;) {
            if (betashift < 8) {
                /** @type {number} */
                v = (a[i] & (1 << betashift) - 1) << 8 - betashift;
                v |= a[--i] >> (betashift += BI_DB - 8);
            } else {
                /** @type {number} */
                v = a[i] >> (betashift -= 8) & 255;
                if (betashift <= 0) {
                    betashift += BI_DB;
                    --i;
                }
            }
            if ((v & 128) != 0) {
                v |= -256;
            }
            if (pos == 0 && (this.s & 128) != (v & 128)) {
                ++pos;
            }
            if (pos > 0 || v != this.s) {
                /** @type {number} */
                segments[pos++] = v;
            }
        }
    }
    return segments;
}
/**
 * @param {?} date
 * @return {?}
 */
function bnEquals(date) {
    return this.compareTo(date) == 0;
}
/**
 * @param {Object} date
 * @return {?}
 */
function bnMin(date) {
    return this.compareTo(date) < 0 ? this : date;
}
/**
 * @param {Object} date
 * @return {?}
 */
function bnMax(date) {
    return this.compareTo(date) > 0 ? this : date;
}
/**
 * @param {Object} t
 * @param {Function} callback
 * @param {?} b
 * @return {undefined}
 */
function bnpBitwiseTo(t, callback, b) {
    var array = this.array;
    var colors = t.array;
    var results = b.array;
    var i;
    var value;
    /** @type {number} */
    var lastLine = Math.min(t.t, this.t);
    /** @type {number} */
    i = 0;
    for (;i < lastLine;++i) {
        results[i] = callback(array[i], colors[i]);
    }
    if (t.t < this.t) {
        /** @type {number} */
        value = t.s & BI_DM;
        /** @type {number} */
        i = lastLine;
        for (;i < this.t;++i) {
            results[i] = callback(array[i], value);
        }
        b.t = this.t;
    } else {
        /** @type {number} */
        value = this.s & BI_DM;
        /** @type {number} */
        i = lastLine;
        for (;i < t.t;++i) {
            results[i] = callback(value, colors[i]);
        }
        b.t = t.t;
    }
    b.s = callback(this.s, t.s);
    b.clamp();
}
/**
 * @param {number} dataAndEvents
 * @param {number} deepDataAndEvents
 * @return {?}
 */
function op_and(dataAndEvents, deepDataAndEvents) {
    return dataAndEvents & deepDataAndEvents;
}
/**
 * @param {Object} sqlt
 * @return {?}
 */
function bnAnd(sqlt) {
    var oldconfig = nbi();
    this.bitwiseTo(sqlt, op_and, oldconfig);
    return oldconfig;
}
/**
 * @param {number} dataAndEvents
 * @param {number} deepDataAndEvents
 * @return {?}
 */
function op_or(dataAndEvents, deepDataAndEvents) {
    return dataAndEvents | deepDataAndEvents;
}
/**
 * @param {Object} sqlt
 * @return {?}
 */
function bnOr(sqlt) {
    var oldconfig = nbi();
    this.bitwiseTo(sqlt, op_or, oldconfig);
    return oldconfig;
}
/**
 * @param {number} dataAndEvents
 * @param {number} deepDataAndEvents
 * @return {?}
 */
function op_xor(dataAndEvents, deepDataAndEvents) {
    return dataAndEvents ^ deepDataAndEvents;
}
/**
 * @param {Object} sqlt
 * @return {?}
 */
function bnXor(sqlt) {
    var oldconfig = nbi();
    this.bitwiseTo(sqlt, op_xor, oldconfig);
    return oldconfig;
}
/**
 * @param {number} dataAndEvents
 * @param {?} deepDataAndEvents
 * @return {?}
 */
function op_andnot(dataAndEvents, deepDataAndEvents) {
    return dataAndEvents & ~deepDataAndEvents;
}
/**
 * @param {Object} sqlt
 * @return {?}
 */
function bnAndNot(sqlt) {
    var oldconfig = nbi();
    this.bitwiseTo(sqlt, op_andnot, oldconfig);
    return oldconfig;
}
/**
 * @return {?}
 */
function bnNot() {
    var array = this.array;
    var t = nbi();
    var link = t.array;
    /** @type {number} */
    var index = 0;
    for (;index < this.t;++index) {
        /** @type {number} */
        link[index] = BI_DM & ~array[index];
    }
    t.t = this.t;
    /** @type {number} */
    t.s = ~this.s;
    return t;
}
/**
 * @param {number} m1
 * @return {?}
 */
function bnShiftLeft(m1) {
    var ll = nbi();
    if (m1 < 0) {
        this.rShiftTo(-m1, ll);
    } else {
        this.lShiftTo(m1, ll);
    }
    return ll;
}
/**
 * @param {number} dataAndEvents
 * @return {?}
 */
function bnShiftRight(dataAndEvents) {
    var ll = nbi();
    if (dataAndEvents < 0) {
        this.lShiftTo(-dataAndEvents, ll);
    } else {
        this.rShiftTo(dataAndEvents, ll);
    }
    return ll;
}
/**
 * @param {number} dataAndEvents
 * @return {?}
 */
function lbit(dataAndEvents) {
    if (dataAndEvents == 0) {
        return-1;
    }
    /** @type {number} */
    var lbit = 0;
    if ((dataAndEvents & 65535) == 0) {
        dataAndEvents >>= 16;
        lbit += 16;
    }
    if ((dataAndEvents & 255) == 0) {
        dataAndEvents >>= 8;
        lbit += 8;
    }
    if ((dataAndEvents & 15) == 0) {
        dataAndEvents >>= 4;
        lbit += 4;
    }
    if ((dataAndEvents & 3) == 0) {
        dataAndEvents >>= 2;
        lbit += 2;
    }
    if ((dataAndEvents & 1) == 0) {
        ++lbit;
    }
    return lbit;
}
/**
 * @return {?}
 */
function bnGetLowestSetBit() {
    var array = this.array;
    /** @type {number} */
    var random = 0;
    for (;random < this.t;++random) {
        if (array[random] != 0) {
            return random * BI_DB + lbit(array[random]);
        }
    }
    if (this.s < 0) {
        return this.t * BI_DB;
    }
    return-1;
}
/**
 * @param {number} dataAndEvents
 * @return {?}
 */
function cbit(dataAndEvents) {
    /** @type {number} */
    var cbit = 0;
    for (;dataAndEvents != 0;) {
        dataAndEvents &= dataAndEvents - 1;
        ++cbit;
    }
    return cbit;
}
/**
 * @return {?}
 */
function bnBitCount() {
    /** @type {number} */
    var bnBitCount = 0;
    /** @type {number} */
    var xor = this.s & BI_DM;
    /** @type {number} */
    var idx = 0;
    for (;idx < this.t;++idx) {
        bnBitCount += cbit(this_array[idx] ^ xor);
    }
    return bnBitCount;
}
/**
 * @param {number} m1
 * @return {?}
 */
function bnTestBit(m1) {
    var a = this.array;
    /** @type {number} */
    var f = Math.floor(m1 / BI_DB);
    if (f >= this.t) {
        return this.s != 0;
    }
    return(a[f] & 1 << m1 % BI_DB) != 0;
}
/**
 * @param {number} m
 * @param {Function} next_callback
 * @return {?}
 */
function bnpChangeBit(m, next_callback) {
    var ast = BigInteger.ONE.shiftLeft(m);
    this.bitwiseTo(ast, next_callback, ast);
    return ast;
}
/**
 * @param {number} mom
 * @return {?}
 */
function bnSetBit(mom) {
    return this.changeBit(mom, op_or);
}
/**
 * @param {number} mom
 * @return {?}
 */
function bnClearBit(mom) {
    return this.changeBit(mom, op_andnot);
}
/**
 * @param {number} mom
 * @return {?}
 */
function bnFlipBit(mom) {
    return this.changeBit(mom, op_xor);
}
/**
 * @param {Object} d
 * @param {Object} obj
 * @return {undefined}
 */
function bnpAddTo(d, obj) {
    var a = this.array;
    var b = d.array;
    var map = obj.array;
    /** @type {number} */
    var i = 0;
    /** @type {number} */
    var index = 0;
    /** @type {number} */
    var padLength = Math.min(d.t, this.t);
    for (;i < padLength;) {
        index += a[i] + b[i];
        /** @type {number} */
        map[i++] = index & BI_DM;
        index >>= BI_DB;
    }
    if (d.t < this.t) {
        index += d.s;
        for (;i < this.t;) {
            index += a[i];
            /** @type {number} */
            map[i++] = index & BI_DM;
            index >>= BI_DB;
        }
        index += this.s;
    } else {
        index += this.s;
        for (;i < d.t;) {
            index += b[i];
            /** @type {number} */
            map[i++] = index & BI_DM;
            index >>= BI_DB;
        }
        index += d.s;
    }
    /** @type {number} */
    obj.s = index < 0 ? -1 : 0;
    if (index > 0) {
        map[i++] = index;
    } else {
        if (index < -1) {
            map[i++] = BI_DV + index;
        }
    }
    /** @type {number} */
    obj.t = i;
    obj.clamp();
}
/**
 * @param {?} date
 * @return {?}
 */
function bnAdd(date) {
    var suiteView = nbi();
    this.addTo(date, suiteView);
    return suiteView;
}
/**
 * @param {?} date
 * @return {?}
 */
function bnSubtract(date) {
    var ll = nbi();
    this.subTo(date, ll);
    return ll;
}
/**
 * @param {?} other
 * @return {?}
 */
function bnMultiply(other) {
    var oldconfig = nbi();
    this.multiplyTo(other, oldconfig);
    return oldconfig;
}
/**
 * @param {Object} isXML
 * @return {?}
 */
function bnDivide(isXML) {
    var tmpSet = nbi();
    this.divRemTo(isXML, tmpSet, null);
    return tmpSet;
}
/**
 * @param {Object} isXML
 * @return {?}
 */
function bnRemainder(isXML) {
    var ll = nbi();
    this.divRemTo(isXML, null, ll);
    return ll;
}
/**
 * @param {Object} isXML
 * @return {?}
 */
function bnDivideAndRemainder(isXML) {
    var tmpSet = nbi();
    var act = nbi();
    this.divRemTo(isXML, tmpSet, act);
    return new Array(tmpSet, act);
}
/**
 * @param {number} isError
 * @return {undefined}
 */
function bnpDMultiply(isError) {
    var array = this.array;
    array[this.t] = this.am(0, isError - 1, this, 0, 0, this.t);
    ++this.t;
    this.clamp();
}
/**
 * @param {number} expectedNumberOfNonCommentArgs
 * @param {number} mayParseLabeledStatementInstead
 * @return {undefined}
 */
function bnpDAddOffset(expectedNumberOfNonCommentArgs, mayParseLabeledStatementInstead) {
    var array = this.array;
    for (;this.t <= mayParseLabeledStatementInstead;) {
        /** @type {number} */
        array[this.t++] = 0;
    }
    array[mayParseLabeledStatementInstead] += expectedNumberOfNonCommentArgs;
    for (;array[mayParseLabeledStatementInstead] >= BI_DV;) {
        array[mayParseLabeledStatementInstead] -= BI_DV;
        if (++mayParseLabeledStatementInstead >= this.t) {
            /** @type {number} */
            array[this.t++] = 0;
        }
        ++array[mayParseLabeledStatementInstead];
    }
}
/**
 * @return {undefined}
 */
function NullExp() {
}
/**
 * @param {?} t
 * @return {?}
 */
function nNop(t) {
    return t;
}
/**
 * @param {?} body
 * @param {Node} i
 * @param {Object} t
 * @return {undefined}
 */
function nMulTo(body, i, t) {
    body.multiplyTo(i, t);
}
/**
 * @param {?} action
 * @param {?} t
 * @return {undefined}
 */
function nSqrTo(action, t) {
    action.squareTo(t);
}
/** @type {function (?): ?} */
NullExp.prototype.convert = nNop;
/** @type {function (?): ?} */
NullExp.prototype.revert = nNop;
/** @type {function (?, Node, Object): undefined} */
NullExp.prototype.mulTo = nMulTo;
/** @type {function (?, ?): undefined} */
NullExp.prototype.sqrTo = nSqrTo;
/**
 * @param {number} node
 * @return {?}
 */
function bnPow(node) {
    return this.exp(node, new NullExp);
}
/**
 * @param {Object} item
 * @param {number} timeout
 * @param {Object} data
 * @return {undefined}
 */
function bnpMultiplyLowerTo(item, timeout, data) {
    var array = data.array;
    var el = item.array;
    /** @type {number} */
    var t = Math.min(this.t + item.t, timeout);
    /** @type {number} */
    data.s = 0;
    /** @type {number} */
    data.t = t;
    for (;t > 0;) {
        /** @type {number} */
        array[--t] = 0;
    }
    var T;
    /** @type {number} */
    T = data.t - this.t;
    for (;t < T;++t) {
        array[t + this.t] = this.am(0, el[t], data, t, 0, this.t);
    }
    /** @type {number} */
    T = Math.min(item.t, timeout);
    for (;t < T;++t) {
        this.am(0, el[t], data, t, 0, timeout - t);
    }
    data.clamp();
}
/**
 * @param {Object} b
 * @param {?} t
 * @param {Object} options
 * @return {undefined}
 */
function bnpMultiplyUpperTo(b, t, options) {
    var tests = options.array;
    var deps = b.array;
    --t;
    /** @type {number} */
    var j = options.t = this.t + b.t - t;
    /** @type {number} */
    options.s = 0;
    for (;--j >= 0;) {
        /** @type {number} */
        tests[j] = 0;
    }
    /** @type {number} */
    j = Math.max(t - this.t, 0);
    for (;j < b.t;++j) {
        tests[this.t + j - t] = this.am(t - j, deps[j], options, 0, 0, this.t + j - t);
    }
    options.clamp();
    options.drShiftTo(1, options);
}
/**
 * @param {Object} isXML
 * @return {undefined}
 */
function Barrett(isXML) {
    this.r2 = nbi();
    this.q3 = nbi();
    BigInteger.ONE.dlShiftTo(2 * isXML.t, this.r2);
    this.mu = this.r2.divide(isXML);
    /** @type {Object} */
    this.m = isXML;
}
/**
 * @param {Object} x
 * @return {?}
 */
function barrettConvert(x) {
    if (x.s < 0 || x.t > 2 * this.m.t) {
        return x.mod(this.m);
    } else {
        if (x.compareTo(this.m) < 0) {
            return x;
        } else {
            var oldconfig = nbi();
            x.copyTo(oldconfig);
            this.reduce(oldconfig);
            return oldconfig;
        }
    }
}
/**
 * @param {?} t
 * @return {?}
 */
function barrettRevert(t) {
    return t;
}
/**
 * @param {Object} b
 * @return {undefined}
 */
function barrettReduce(b) {
    b.drShiftTo(this.m.t - 1, this.r2);
    if (b.t > this.m.t + 1) {
        b.t = this.m.t + 1;
        b.clamp();
    }
    this.mu.multiplyUpperTo(this.r2, this.m.t + 1, this.q3);
    this.m.multiplyLowerTo(this.q3, this.m.t + 1, this.r2);
    for (;b.compareTo(this.r2) < 0;) {
        b.dAddOffset(1, this.m.t + 1);
    }
    b.subTo(this.r2, b);
    for (;b.compareTo(this.m) >= 0;) {
        b.subTo(this.m, b);
    }
}
/**
 * @param {?} action
 * @param {Object} t
 * @return {undefined}
 */
function barrettSqrTo(action, t) {
    action.squareTo(t);
    this.reduce(t);
}
/**
 * @param {?} body
 * @param {Node} i
 * @param {Object} t
 * @return {undefined}
 */
function barrettMulTo(body, i, t) {
    body.multiplyTo(i, t);
    this.reduce(t);
}
/** @type {function (Object): ?} */
Barrett.prototype.convert = barrettConvert;
/** @type {function (?): ?} */
Barrett.prototype.revert = barrettRevert;
/** @type {function (Object): undefined} */
Barrett.prototype.reduce = barrettReduce;
/** @type {function (?, Node, Object): undefined} */
Barrett.prototype.mulTo = barrettMulTo;
/** @type {function (?, Object): undefined} */
Barrett.prototype.sqrTo = barrettSqrTo;
/**
 * @param {?} args
 * @param {?} dataAndEvents
 * @return {?}
 */
function bnModPow(args, dataAndEvents) {
    var elements = args.array;
    var a = args.bitLength();
    var d;
    var jump = nbv(1);
    var assert;
    if (a <= 0) {
        return jump;
    } else {
        if (a < 18) {
            /** @type {number} */
            d = 1;
        } else {
            if (a < 48) {
                /** @type {number} */
                d = 3;
            } else {
                if (a < 144) {
                    /** @type {number} */
                    d = 4;
                } else {
                    if (a < 768) {
                        /** @type {number} */
                        d = 5;
                    } else {
                        /** @type {number} */
                        d = 6;
                    }
                }
            }
        }
    }
    if (a < 8) {
        assert = new Classic(dataAndEvents);
    } else {
        if (dataAndEvents.isEven()) {
            assert = new Barrett(dataAndEvents);
        } else {
            assert = new Montgomery(dataAndEvents);
        }
    }
    /** @type {Array} */
    var tokens = new Array;
    /** @type {number} */
    var i = 3;
    /** @type {number} */
    var b = d - 1;
    /** @type {number} */
    var maxRange = (1 << d) - 1;
    tokens[1] = assert.convert(this);
    if (d > 1) {
        var prop = nbi();
        assert.sqrTo(tokens[1], prop);
        for (;i <= maxRange;) {
            tokens[i] = nbi();
            assert.mulTo(prop, tokens[i - 2], tokens[i]);
            i += 2;
        }
    }
    /** @type {number} */
    var liveCount = args.t - 1;
    var idx;
    /** @type {boolean} */
    var is1 = true;
    var action = nbi();
    var t;
    /** @type {number} */
    a = nbits(elements[liveCount]) - 1;
    for (;liveCount >= 0;) {
        if (a >= b) {
            /** @type {number} */
            idx = elements[liveCount] >> a - b & maxRange;
        } else {
            /** @type {number} */
            idx = (elements[liveCount] & (1 << a + 1) - 1) << b - a;
            if (liveCount > 0) {
                idx |= elements[liveCount - 1] >> BI_DB + a - b;
            }
        }
        /** @type {number} */
        i = d;
        for (;(idx & 1) == 0;) {
            idx >>= 1;
            --i;
        }
        if ((a -= i) < 0) {
            a += BI_DB;
            --liveCount;
        }
        if (is1) {
            tokens[idx].copyTo(jump);
            /** @type {boolean} */
            is1 = false;
        } else {
            for (;i > 1;) {
                assert.sqrTo(jump, action);
                assert.sqrTo(action, jump);
                i -= 2;
            }
            if (i > 0) {
                assert.sqrTo(jump, action);
            } else {
                t = jump;
                jump = action;
                action = t;
            }
            assert.mulTo(action, tokens[idx], jump);
        }
        for (;liveCount >= 0 && (elements[liveCount] & 1 << a) == 0;) {
            assert.sqrTo(jump, action);
            t = jump;
            jump = action;
            action = t;
            if (--a < 0) {
                /** @type {number} */
                a = BI_DB - 1;
                --liveCount;
            }
        }
    }
    return assert.revert(jump);
}
/**
 * @param {Date} m
 * @return {?}
 */
function bnGCD(m) {
    var a = this.s < 0 ? this.negate() : this.clone();
    var b = m.s < 0 ? m.negate() : m.clone();
    if (a.compareTo(b) < 0) {
        var temp = a;
        a = b;
        b = temp;
    }
    var node = a.getLowestSetBit();
    var parentNode = b.getLowestSetBit();
    if (parentNode < 0) {
        return a;
    }
    if (node < parentNode) {
        parentNode = node;
    }
    if (parentNode > 0) {
        a.rShiftTo(parentNode, a);
        b.rShiftTo(parentNode, b);
    }
    for (;a.signum() > 0;) {
        if ((node = a.getLowestSetBit()) > 0) {
            a.rShiftTo(node, a);
        }
        if ((node = b.getLowestSetBit()) > 0) {
            b.rShiftTo(node, b);
        }
        if (a.compareTo(b) >= 0) {
            a.subTo(b, a);
            a.rShiftTo(1, a);
        } else {
            b.subTo(a, b);
            b.rShiftTo(1, b);
        }
    }
    if (parentNode > 0) {
        b.lShiftTo(parentNode, b);
    }
    return b;
}
/**
 * @param {number} dataAndEvents
 * @return {?}
 */
function bnpModInt(dataAndEvents) {
    var array = this.array;
    if (dataAndEvents <= 0) {
        return 0;
    }
    /** @type {number} */
    var a1 = BI_DV % dataAndEvents;
    /** @type {number} */
    var b4 = this.s < 0 ? dataAndEvents - 1 : 0;
    if (this.t > 0) {
        if (a1 == 0) {
            /** @type {number} */
            b4 = array[0] % dataAndEvents;
        } else {
            /** @type {number} */
            var random = this.t - 1;
            for (;random >= 0;--random) {
                /** @type {number} */
                b4 = (a1 * b4 + array[random]) % dataAndEvents;
            }
        }
    }
    return b4;
}
/**
 * @param {?} start
 * @return {?}
 */
function bnModInverse(start) {
    var ac = start.isEven();
    if (this.isEven() && ac || start.signum() == 0) {
        return BigInteger.ZERO;
    }
    var x = start.clone();
    var a = this.clone();
    var selector = nbv(1);
    var m = nbv(0);
    var element = nbv(0);
    var b = nbv(1);
    for (;x.signum() != 0;) {
        for (;x.isEven();) {
            x.rShiftTo(1, x);
            if (ac) {
                if (!selector.isEven() || !m.isEven()) {
                    selector.addTo(this, selector);
                    m.subTo(start, m);
                }
                selector.rShiftTo(1, selector);
            } else {
                if (!m.isEven()) {
                    m.subTo(start, m);
                }
            }
            m.rShiftTo(1, m);
        }
        for (;a.isEven();) {
            a.rShiftTo(1, a);
            if (ac) {
                if (!element.isEven() || !b.isEven()) {
                    element.addTo(this, element);
                    b.subTo(start, b);
                }
                element.rShiftTo(1, element);
            } else {
                if (!b.isEven()) {
                    b.subTo(start, b);
                }
            }
            b.rShiftTo(1, b);
        }
        if (x.compareTo(a) >= 0) {
            x.subTo(a, x);
            if (ac) {
                selector.subTo(element, selector);
            }
            m.subTo(b, m);
        } else {
            a.subTo(x, a);
            if (ac) {
                element.subTo(selector, element);
            }
            b.subTo(m, b);
        }
    }
    if (a.compareTo(BigInteger.ONE) != 0) {
        return BigInteger.ZERO;
    }
    if (b.compareTo(start) >= 0) {
        return b.subtract(start);
    }
    if (b.signum() < 0) {
        b.addTo(start, b);
    } else {
        return b;
    }
    if (b.signum() < 0) {
        return b.add(start);
    } else {
        return b;
    }
}
/** @type {Array} */
var lowprimes = [2, 3, 5, 7, 11, 13, 17, 19, 23, 29, 31, 37, 41, 43, 47, 53, 59, 61, 67, 71, 73, 79, 83, 89, 97, 101, 103, 107, 109, 113, 127, 131, 137, 139, 149, 151, 157, 163, 167, 173, 179, 181, 191, 193, 197, 199, 211, 223, 227, 229, 233, 239, 241, 251, 257, 263, 269, 271, 277, 281, 283, 293, 307, 311, 313, 317, 331, 337, 347, 349, 353, 359, 367, 373, 379, 383, 389, 397, 401, 409, 419, 421, 431, 433, 439, 443, 449, 457, 461, 463, 467, 479, 487, 491, 499, 503, 509];
/** @type {number} */
var lplim = (1 << 26) / lowprimes[lowprimes.length - 1];
/**
 * @param {number} opt_attributes
 * @return {?}
 */
function bnIsProbablePrime(opt_attributes) {
    var i;
    var self = this.abs();
    var a = self.array;
    if (self.t == 1 && a[0] <= lowprimes[lowprimes.length - 1]) {
        /** @type {number} */
        i = 0;
        for (;i < lowprimes.length;++i) {
            if (a[0] == lowprimes[i]) {
                return true;
            }
        }
        return false;
    }
    if (self.isEven()) {
        return false;
    }
    /** @type {number} */
    i = 1;
    for (;i < lowprimes.length;) {
        var node = lowprimes[i];
        /** @type {number} */
        var j = i + 1;
        for (;j < lowprimes.length && node < lplim;) {
            node *= lowprimes[j++];
        }
        node = self.modInt(node);
        for (;i < j;) {
            if (node % lowprimes[i++] == 0) {
                return false;
            }
        }
    }
    return self.millerRabin(opt_attributes);
}
/**
 * @param {number} attributes
 * @return {?}
 */
function bnpMillerRabin(attributes) {
    var end = this.subtract(BigInteger.ONE);
    var node = end.getLowestSetBit();
    if (node <= 0) {
        return false;
    }
    var elem = end.shiftRight(node);
    /** @type {number} */
    attributes = attributes + 1 >> 1;
    if (attributes > lowprimes.length) {
        attributes = lowprimes.length;
    }
    var data_priv = nbi();
    /** @type {number} */
    var i = 0;
    for (;i < attributes;++i) {
        data_priv.fromInt(lowprimes[i]);
        var parent = data_priv.modPow(elem, this);
        if (parent.compareTo(BigInteger.ONE) != 0 && parent.compareTo(end) != 0) {
            /** @type {number} */
            var j = 1;
            for (;j++ < node && parent.compareTo(end) != 0;) {
                parent = parent.modPowInt(2, this);
                if (parent.compareTo(BigInteger.ONE) == 0) {
                    return false;
                }
            }
            if (parent.compareTo(end) != 0) {
                return false;
            }
        }
    }
    return true;
}
/** @type {function (number): ?} */
BigInteger.prototype.chunkSize = bnpChunkSize;
/** @type {function (number): ?} */
BigInteger.prototype.toRadix = bnpToRadix;
/** @type {function (string, number): undefined} */
BigInteger.prototype.fromRadix = bnpFromRadix;
/** @type {function (number, number, number): undefined} */
BigInteger.prototype.fromNumber = bnpFromNumber;
/** @type {function (Object, Function, ?): undefined} */
BigInteger.prototype.bitwiseTo = bnpBitwiseTo;
/** @type {function (number, Function): ?} */
BigInteger.prototype.changeBit = bnpChangeBit;
/** @type {function (Object, Object): undefined} */
BigInteger.prototype.addTo = bnpAddTo;
/** @type {function (number): undefined} */
BigInteger.prototype.dMultiply = bnpDMultiply;
/** @type {function (number, number): undefined} */
BigInteger.prototype.dAddOffset = bnpDAddOffset;
/** @type {function (Object, number, Object): undefined} */
BigInteger.prototype.multiplyLowerTo = bnpMultiplyLowerTo;
/** @type {function (Object, ?, Object): undefined} */
BigInteger.prototype.multiplyUpperTo = bnpMultiplyUpperTo;
/** @type {function (number): ?} */
BigInteger.prototype.modInt = bnpModInt;
/** @type {function (number): ?} */
BigInteger.prototype.millerRabin = bnpMillerRabin;
/** @type {function (): ?} */
BigInteger.prototype.clone = bnClone;
/** @type {function (): ?} */
BigInteger.prototype.intValue = bnIntValue;
/** @type {function (): ?} */
BigInteger.prototype.byteValue = bnByteValue;
/** @type {function (): ?} */
BigInteger.prototype.shortValue = bnShortValue;
/** @type {function (): ?} */
BigInteger.prototype.signum = bnSigNum;
/** @type {function (): ?} */
BigInteger.prototype.toByteArray = bnToByteArray;
/** @type {function (?): ?} */
BigInteger.prototype.equals = bnEquals;
/** @type {function (Object): ?} */
BigInteger.prototype.min = bnMin;
/** @type {function (Object): ?} */
BigInteger.prototype.max = bnMax;
/** @type {function (Object): ?} */
BigInteger.prototype.and = bnAnd;
/** @type {function (Object): ?} */
BigInteger.prototype.or = bnOr;
/** @type {function (Object): ?} */
BigInteger.prototype.xor = bnXor;
/** @type {function (Object): ?} */
BigInteger.prototype.andNot = bnAndNot;
/** @type {function (): ?} */
BigInteger.prototype.not = bnNot;
/** @type {function (number): ?} */
BigInteger.prototype.shiftLeft = bnShiftLeft;
/** @type {function (number): ?} */
BigInteger.prototype.shiftRight = bnShiftRight;
/** @type {function (): ?} */
BigInteger.prototype.getLowestSetBit = bnGetLowestSetBit;
/** @type {function (): ?} */
BigInteger.prototype.bitCount = bnBitCount;
/** @type {function (number): ?} */
BigInteger.prototype.testBit = bnTestBit;
/** @type {function (number): ?} */
BigInteger.prototype.setBit = bnSetBit;
/** @type {function (number): ?} */
BigInteger.prototype.clearBit = bnClearBit;
/** @type {function (number): ?} */
BigInteger.prototype.flipBit = bnFlipBit;
/** @type {function (?): ?} */
BigInteger.prototype.add = bnAdd;
/** @type {function (?): ?} */
BigInteger.prototype.subtract = bnSubtract;
/** @type {function (?): ?} */
BigInteger.prototype.multiply = bnMultiply;
/** @type {function (Object): ?} */
BigInteger.prototype.divide = bnDivide;
/** @type {function (Object): ?} */
BigInteger.prototype.remainder = bnRemainder;
/** @type {function (Object): ?} */
BigInteger.prototype.divideAndRemainder = bnDivideAndRemainder;
/** @type {function (?, ?): ?} */
BigInteger.prototype.modPow = bnModPow;
/** @type {function (?): ?} */
BigInteger.prototype.modInverse = bnModInverse;
/** @type {function (number): ?} */
BigInteger.prototype.pow = bnPow;
/** @type {function (Date): ?} */
BigInteger.prototype.gcd = bnGCD;
/** @type {function (number): ?} */
BigInteger.prototype.isProbablePrime = bnIsProbablePrime;
/**
 * @return {undefined}
 */
function Arcfour() {
    /** @type {number} */
    this.i = 0;
    /** @type {number} */
    this.j = 0;
    /** @type {Array} */
    this.S = new Array;
}
/**
 * @param {string} texts
 * @return {undefined}
 */
function ARC4init(texts) {
    var i;
    var j;
    var tempi;
    /** @type {number} */
    i = 0;
    for (;i < 256;++i) {
        /** @type {number} */
        this.S[i] = i;
    }
    /** @type {number} */
    j = 0;
    /** @type {number} */
    i = 0;
    for (;i < 256;++i) {
        /** @type {number} */
        j = j + this.S[i] + texts[i % texts.length] & 255;
        tempi = this.S[i];
        this.S[i] = this.S[j];
        this.S[j] = tempi;
    }
    /** @type {number} */
    this.i = 0;
    /** @type {number} */
    this.j = 0;
}
/**
 * @return {?}
 */
function ARC4next() {
    var opcode;
    /** @type {number} */
    this.i = this.i + 1 & 255;
    /** @type {number} */
    this.j = this.j + this.S[this.i] & 255;
    opcode = this.S[this.i];
    this.S[this.i] = this.S[this.j];
    this.S[this.j] = opcode;
    return this.S[opcode + this.S[this.i] & 255];
}
/** @type {function (string): undefined} */
Arcfour.prototype.init = ARC4init;
/** @type {function (): ?} */
Arcfour.prototype.next = ARC4next;
/**
 * @return {?}
 */
function prng_newstate() {
    return new Arcfour;
}
/** @type {number} */
var rng_psize = 256;
var rng_state;
var rng_pool;
var rng_pptr;
/**
 * @param {number} opt_attributes
 * @return {undefined}
 */
function rng_seed_int(opt_attributes) {
    rng_pool[rng_pptr++] ^= opt_attributes & 255;
    rng_pool[rng_pptr++] ^= opt_attributes >> 8 & 255;
    rng_pool[rng_pptr++] ^= opt_attributes >> 16 & 255;
    rng_pool[rng_pptr++] ^= opt_attributes >> 24 & 255;
    if (rng_pptr >= rng_psize) {
        rng_pptr -= rng_psize;
    }
}
/**
 * @return {undefined}
 */
function rng_seed_time() {
    rng_seed_int(1122926989487);
}
if (rng_pool == null) {
    /** @type {Array} */
    rng_pool = new Array;
    /** @type {number} */
    rng_pptr = 0;
    var t;
    for (;rng_pptr < rng_psize;) {
        /** @type {number} */
        t = Math.floor(65536 * Math.random());
        /** @type {number} */
        rng_pool[rng_pptr++] = t >>> 8;
        /** @type {number} */
        rng_pool[rng_pptr++] = t & 255;
    }
    /** @type {number} */
    rng_pptr = 0;
    rng_seed_time();
}
/**
 * @return {?}
 */
function rng_get_byte() {
    if (rng_state == null) {
        rng_seed_time();
        rng_state = prng_newstate();
        rng_state.init(rng_pool);
        /** @type {number} */
        rng_pptr = 0;
        for (;rng_pptr < rng_pool.length;++rng_pptr) {
            /** @type {number} */
            rng_pool[rng_pptr] = 0;
        }
        /** @type {number} */
        rng_pptr = 0;
    }
    return rng_state.next();
}
/**
 * @param {Array} b
 * @return {undefined}
 */
function rng_get_bytes(b) {
    var bi;
    /** @type {number} */
    bi = 0;
    for (;bi < b.length;++bi) {
        b[bi] = rng_get_byte();
    }
}
/**
 * @return {undefined}
 */
function SecureRandom() {
}
/** @type {function (Array): undefined} */
SecureRandom.prototype.nextBytes = rng_get_bytes;
/**
 * @param {string} millis
 * @param {number} opt_attributes
 * @return {?}
 */
function parseBigInt(millis, opt_attributes) {
    return new BigInteger(millis, opt_attributes);
}
/**
 * @param {string} text
 * @param {number} length
 * @return {?}
 */
function linebrk(text, length) {
    /** @type {string} */
    var optsData = "";
    /** @type {number} */
    var index = 0;
    for (;index + length < text.length;) {
        optsData += text.substring(index, index + length) + "\n";
        index += length;
    }
    return optsData + text.substring(index, text.length);
}
/**
 * @param {number} dstUri
 * @return {?}
 */
function byte2Hex(dstUri) {
    if (dstUri < 16) {
        return "0" + dstUri.toString(16);
    } else {
        return dstUri.toString(16);
    }
}
/**
 * @param {string} data
 * @param {number} count
 * @return {?}
 */
function pkcs1pad2(data, count) {
    if (count < data.length + 11) {
        alert("Message too long for RSA");
        return null;
    }
    /** @type {Array} */
    var tmp = new Array;
    /** @type {number} */
    var pos = data.length - 1;
    for (;pos >= 0 && count > 0;) {
        tmp[--count] = data.charCodeAt(pos--);
    }
    /** @type {number} */
    tmp[--count] = 0;
    var core_indexOf = new SecureRandom;
    /** @type {Array} */
    var arr = new Array;
    for (;count > 2;) {
        /** @type {number} */
        arr[0] = 0;
        for (;arr[0] == 0;) {
            core_indexOf.nextBytes(arr);
        }
        tmp[--count] = arr[0];
    }
    /** @type {number} */
    tmp[--count] = 2;
    /** @type {number} */
    tmp[--count] = 0;
    return new BigInteger(tmp);
}
/**
 * @return {undefined}
 */
function RSAKey() {
    /** @type {null} */
    this.n = null;
    /** @type {number} */
    this.e = 0;
    /** @type {null} */
    this.d = null;
    /** @type {null} */
    this.p = null;
    /** @type {null} */
    this.q = null;
    /** @type {null} */
    this.dmp1 = null;
    /** @type {null} */
    this.dmq1 = null;
    /** @type {null} */
    this.coeff = null;
}
/**
 * @param {string} millis
 * @param {string} m1
 * @return {undefined}
 */
function RSASetPublic(millis, m1) {
    if (millis != null && (m1 != null && (millis.length > 0 && m1.length > 0))) {
        this.n = parseBigInt(millis, 16);
        /** @type {number} */
        this.e = parseInt(m1, 16);
    } else {
        alert("Invalid RSA public key");
    }
}
/**
 * @param {?} value
 * @return {?}
 */
function RSADoPublic(value) {
    return value.modPowInt(this.e, this.n);
}
/**
 * @param {string} key
 * @return {?}
 */
function RSAEncrypt(key) {
    var camelKey = pkcs1pad2(key, this.n.bitLength() + 7 >> 3);
    if (camelKey == null) {
        return null;
    }
    var biDecryptedSig = this.doPublic(camelKey);
    if (biDecryptedSig == null) {
        return null;
    }
    var codeSegments = biDecryptedSig.toString(16);
    if ((codeSegments.length & 1) == 0) {
        return codeSegments;
    } else {
        return "0" + codeSegments;
    }
}
/** @type {function (?): ?} */
RSAKey.prototype.doPublic = RSADoPublic;
/** @type {function (string, string): undefined} */
RSAKey.prototype.setPublic = RSASetPublic;
/** @type {function (string): ?} */
RSAKey.prototype.encrypt = RSAEncrypt;
/**
 * @param {?} b
 * @param {number} dataAndEvents
 * @return {?}
 */
function pkcs1unpad2(b, dataAndEvents) {
    var arr = b.toByteArray();
    /** @type {number} */
    var i = 0;
    for (;i < arr.length && arr[i] == 0;) {
        ++i;
    }
    if (arr.length - i != dataAndEvents - 1 || arr[i] != 2) {
        return null;
    }
    ++i;
    for (;arr[i] != 0;) {
        if (++i >= arr.length) {
            return null;
        }
    }
    /** @type {string} */
    var optsData = "";
    for (;++i < arr.length;) {
        optsData += String.fromCharCode(arr[i]);
    }
    return optsData;
}
/**
 * @param {string} millis
 * @param {string} m1
 * @param {string} interval
 * @return {undefined}
 */
function RSASetPrivate(millis, m1, interval) {
    if (millis != null && (m1 != null && (millis.length > 0 && m1.length > 0))) {
        this.n = parseBigInt(millis, 16);
        /** @type {number} */
        this.e = parseInt(m1, 16);
        this.d = parseBigInt(interval, 16);
    } else {
        alert("Invalid RSA private key");
    }
}
/**
 * @param {string} millis
 * @param {string} m1
 * @param {string} interval
 * @param {string} s
 * @param {string} endTime
 * @param {string} moo
 * @param {string} hSig
 * @param {string} deepDataAndEvents
 * @return {undefined}
 */
function RSASetPrivateEx(millis, m1, interval, s, endTime, moo, hSig, deepDataAndEvents) {
    if (millis != null && (m1 != null && (millis.length > 0 && m1.length > 0))) {
        this.n = parseBigInt(millis, 16);
        /** @type {number} */
        this.e = parseInt(m1, 16);
        this.d = parseBigInt(interval, 16);
        this.p = parseBigInt(s, 16);
        this.q = parseBigInt(endTime, 16);
        this.dmp1 = parseBigInt(moo, 16);
        this.dmq1 = parseBigInt(hSig, 16);
        this.coeff = parseBigInt(deepDataAndEvents, 16);
    } else {
        alert("Invalid RSA private key");
    }
}
/**
 * @param {number} far
 * @param {string} m1
 * @return {undefined}
 */
function RSAGenerate(far, m1) {
    var p = new SecureRandom;
    /** @type {number} */
    var near = far >> 1;
    /** @type {number} */
    this.e = parseInt(m1, 16);
    var ee = new BigInteger(m1, 16);
    for (;;) {
        for (;;) {
            this.p = new BigInteger(far - near, 1, p);
            if (this.p.subtract(BigInteger.ONE).gcd(ee).compareTo(BigInteger.ONE) == 0 && this.p.isProbablePrime(10)) {
                break;
            }
        }
        for (;;) {
            this.q = new BigInteger(near, 1, p);
            if (this.q.subtract(BigInteger.ONE).gcd(ee).compareTo(BigInteger.ONE) == 0 && this.q.isProbablePrime(10)) {
                break;
            }
        }
        if (this.p.compareTo(this.q) <= 0) {
            var query = this.p;
            this.p = this.q;
            this.q = query;
        }
        var rem = this.p.subtract(BigInteger.ONE);
        var radixToPower = this.q.subtract(BigInteger.ONE);
        var phi = rem.multiply(radixToPower);
        if (phi.gcd(ee).compareTo(BigInteger.ONE) == 0) {
            this.n = this.p.multiply(this.q);
            this.d = ee.modInverse(phi);
            this.dmp1 = this.d.mod(rem);
            this.dmq1 = this.d.mod(radixToPower);
            this.coeff = this.q.modInverse(this.p);
            break;
        }
    }
}
/**
 * @param {Object} args
 * @return {?}
 */
function RSADoPrivate(args) {
    if (this.p == null || this.q == null) {
        return args.modPow(this.d, this.n);
    }
    var date = args.mod(this.p).modPow(this.dmp1, this.p);
    var min = args.mod(this.q).modPow(this.dmq1, this.q);
    for (;date.compareTo(min) < 0;) {
        date = date.add(this.p);
    }
    return date.subtract(min).multiply(this.coeff).mod(this.p).multiply(this.q).add(min);
}
/**
 * @param {string} millis
 * @return {?}
 */
function RSADecrypt(millis) {
    var typePattern = parseBigInt(millis, 16);
    var oldconfig = this.doPrivate(typePattern);
    if (oldconfig == null) {
        return null;
    }
    return pkcs1unpad2(oldconfig, this.n.bitLength() + 7 >> 3);
}
/** @type {function (Object): ?} */
RSAKey.prototype.doPrivate = RSADoPrivate;
/** @type {function (string, string, string): undefined} */
RSAKey.prototype.setPrivate = RSASetPrivate;
/** @type {function (string, string, string, string, string, string, string, string): undefined} */
RSAKey.prototype.setPrivateEx = RSASetPrivateEx;
/** @type {function (number, string): undefined} */
RSAKey.prototype.generate = RSAGenerate;
/** @type {function (string): ?} */
RSAKey.prototype.decrypt = RSADecrypt;
/** @type {string} */
nValue = "a5261939975948bb7a58dffe5ff54e65f0498f9175f5a09288810b8975871e99af3b5dd94057b0fc07535f5f97444504fa35169d461d0d30cf0192e307727c065168c788771c561a9400fb49175e9e6aa4e23fe11af69e9412dd23b0cb6684c4c2429bce139e848ab26d0829073351f4acd36074eafd036a5eb83359d2a698d3";
/** @type {string} */
eValue = "10001";
/** @type {string} */
dValue = "8e9912f6d3645894e8d38cb58c0db81ff516cf4c7e5a14c7f1eddb1459d2cded4d8d293fc97aee6aefb861859c8b6a3d1dfe710463e1f9ddc72048c09751971c4a580aa51eb523357a3cc48d31cfad1d4a165066ed92d4748fb6571211da5cb14bc11b6e2df7c1a559e6d5ac1cd5c94703a22891464fba23d0d965086277a161";
/** @type {string} */
pValue = "d090ce58a92c75233a6486cb0a9209bf3583b64f540c76f5294bb97d285eed33aec220bde14b2417951178ac152ceab6da7090905b478195498b352048f15e7d";
/** @type {string} */
qValue = "cab575dc652bb66df15a0359609d51d1db184750c00c6698b90ef3465c99655103edbf0d54c56aec0ce3c4d22592338092a126a0cc49f65a4a30d222b411e58f";
/** @type {string} */
dmp1Value = "1a24bca8e273df2f0e47c199bbf678604e7df7215480c77c8db39f49b000ce2cf7500038acfff5433b7d582a01f1826e6f4d42e1c57f5e1fef7b12aabc59fd25";
/** @type {string} */
dmq1Value = "3d06982efbbe47339e1f6d36b1216b8a741d410b0c662f54f7118b27b9a4ec9d914337eb39841d8666f3034408cf94f5b62f11c402fc994fe15a05493150d9fd";
/** @type {string} */
coeffValue = "3a3e731acd8960b7ff9eb81a7ff93bd1cfa74cbd56987db58b4594fb09c09084db1734c8143f98b602b981aaa9243ca28deb69b5b280ee8dcee0fd2625e53250";
setupEngine(am3, 28);
/** @type {string} */
var TEXT = "The quick brown fox jumped over the extremely lazy frog! " + "Now is the time for all good men to come to the party.";
var encrypted;
/**
 * @return {undefined}
 */
function encrypt() {
    var rsa = new RSAKey;
    rsa.setPublic(nValue, eValue);
    rsa.setPrivateEx(nValue, eValue, dValue, pValue, qValue, dmp1Value, dmq1Value, coeffValue);
    encrypted = rsa.encrypt(TEXT);
}
/**
 * @return {undefined}
 */
function decrypt() {
    var rsa = new RSAKey;
    rsa.setPublic(nValue, eValue);
    rsa.setPrivateEx(nValue, eValue, dValue, pValue, qValue, dmp1Value, dmq1Value, coeffValue);
    var msg = rsa.decrypt(encrypted);
    if (msg != TEXT) {
        throw new Error("Crypto operation failed");
    }
}
;