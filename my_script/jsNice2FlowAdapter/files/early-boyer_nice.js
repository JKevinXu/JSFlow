var EarleyBoyer = new BenchmarkSuite("EarleyBoyer", [666463], [new Benchmark("Earley", true, false, 2500, function() {
    BgL_earleyzd2benchmarkzd2();
}), new Benchmark("Boyer", true, false, 200, function() {
    BgL_nboyerzd2benchmarkzd2();
})]);
/**
 * @return {undefined}
 */
function sc_print_debug() {
    sc_print.apply(null, arguments);
}
/** @type {global this} */
var sc_JS_GLOBALS = this;
/** @type {number} */
var __sc_LINE = -1;
/** @type {string} */
var __sc_FILE = "";
/**
 * @return {?}
 */
function sc_alert() {
    /** @type {number} */
    var argLength = arguments.length;
    /** @type {string} */
    var errMsg = "";
    var i;
    /** @type {number} */
    i = 0;
    for (;i < argLength;i++) {
        errMsg += sc_toDisplayString(arguments[i]);
    }
    return alert(errMsg);
}
/**
 * @param {?} dataAndEvents
 * @return {?}
 */
function sc_typeof(dataAndEvents) {
    return typeof dataAndEvents;
}
/**
 * @return {undefined}
 */
function sc_error() {
    /** @type {Array} */
    var m = [sc_jsstring2symbol("*error*")];
    /** @type {number} */
    var i = 0;
    for (;i < arguments.length;i++) {
        m[i + 1] = arguments[i];
    }
    throw m;
}
/**
 * @param {?} dataAndEvents
 * @return {?}
 */
function sc_raise(dataAndEvents) {
    throw dataAndEvents;
}
/**
 * @param {?} on
 * @param {?} $sanitize
 * @return {?}
 */
function sc_withHandlerLambda(on, $sanitize) {
    try {
        return $sanitize();
    } catch (failuresLink) {
        if (!failuresLink._internalException) {
            return on(failuresLink);
        } else {
            throw failuresLink;
        }
    }
}
/** @type {Object} */
var sc_properties = new Object;
/**
 * @param {?} i
 * @param {?} k
 * @param {?} v
 * @return {undefined}
 */
function sc_putpropBang(i, k, v) {
    var o = sc_properties[i];
    if (!o) {
        /** @type {Object} */
        o = new Object;
        /** @type {Object} */
        sc_properties[i] = o;
    }
    o[k] = v;
}
/**
 * @param {?} timeoutKey
 * @param {?} i
 * @return {?}
 */
function sc_getprop(timeoutKey, i) {
    var arr2 = sc_properties[timeoutKey];
    if (arr2) {
        if (i in arr2) {
            return arr2[i];
        } else {
            return false;
        }
    } else {
        return false;
    }
}
/**
 * @param {?} bits
 * @param {?} idx
 * @return {undefined}
 */
function sc_rempropBang(bits, idx) {
    var max = sc_properties[bits];
    if (max) {
        delete max[idx];
    }
}
/**
 * @param {Function} walkers
 * @return {?}
 */
function sc_any2String(walkers) {
    return jsstring2string(sc_toDisplayString(walkers));
}
/**
 * @param {?} a
 * @param {?} b
 * @return {?}
 */
function sc_isEqv(a, b) {
    return a === b;
}
/**
 * @param {?} a
 * @param {?} b
 * @return {?}
 */
function sc_isEq(a, b) {
    return a === b;
}
/**
 * @param {?} dataAndEvents
 * @return {?}
 */
function sc_isNumber(dataAndEvents) {
    return typeof dataAndEvents === "number";
}
/**
 * @param {?} dataAndEvents
 * @return {?}
 */
function sc_isComplex(dataAndEvents) {
    return sc_isNumber(dataAndEvents);
}
/**
 * @param {?} dataAndEvents
 * @return {?}
 */
function sc_isReal(dataAndEvents) {
    return sc_isNumber(dataAndEvents);
}
/**
 * @param {?} dataAndEvents
 * @return {?}
 */
function sc_isRational(dataAndEvents) {
    return sc_isReal(dataAndEvents);
}
/**
 * @param {number} val
 * @return {?}
 */
function sc_isInteger(val) {
    return parseInt(val) === val;
}
/**
 * @param {?} dataAndEvents
 * @return {?}
 */
function sc_isExact(dataAndEvents) {
    return false;
}
/**
 * @param {?} dataAndEvents
 * @return {?}
 */
function sc_isInexact(dataAndEvents) {
    return true;
}
/**
 * @param {?} el
 * @return {?}
 */
function sc_equal(el) {
    /** @type {number} */
    var i = 1;
    for (;i < arguments.length;i++) {
        if (el !== arguments[i]) {
            return false;
        }
    }
    return true;
}
/**
 * @param {Text} c
 * @return {?}
 */
function sc_less(c) {
    /** @type {number} */
    var i = 1;
    for (;i < arguments.length;i++) {
        if (c >= arguments[i]) {
            return false;
        }
        c = arguments[i];
    }
    return true;
}
/**
 * @param {Text} c
 * @param {?} dataAndEvents
 * @return {?}
 */
function sc_greater(c, dataAndEvents) {
    /** @type {number} */
    var i = 1;
    for (;i < arguments.length;i++) {
        if (c <= arguments[i]) {
            return false;
        }
        c = arguments[i];
    }
    return true;
}
/**
 * @param {Text} value
 * @param {?} dataAndEvents
 * @return {?}
 */
function sc_lessEqual(value, dataAndEvents) {
    /** @type {number} */
    var i = 1;
    for (;i < arguments.length;i++) {
        if (value > arguments[i]) {
            return false;
        }
        value = arguments[i];
    }
    return true;
}
/**
 * @param {Text} r
 * @param {?} dataAndEvents
 * @return {?}
 */
function sc_greaterEqual(r, dataAndEvents) {
    /** @type {number} */
    var i = 1;
    for (;i < arguments.length;i++) {
        if (r < arguments[i]) {
            return false;
        }
        r = arguments[i];
    }
    return true;
}
/**
 * @param {number} dataAndEvents
 * @return {?}
 */
function sc_isZero(dataAndEvents) {
    return dataAndEvents === 0;
}
/**
 * @param {number} dataAndEvents
 * @return {?}
 */
function sc_isPositive(dataAndEvents) {
    return dataAndEvents > 0;
}
/**
 * @param {(boolean|number)} dataAndEvents
 * @return {?}
 */
function sc_isNegative(dataAndEvents) {
    return dataAndEvents < 0;
}
/**
 * @param {number} dataAndEvents
 * @return {?}
 */
function sc_isOdd(dataAndEvents) {
    return dataAndEvents % 2 === 1;
}
/**
 * @param {number} dataAndEvents
 * @return {?}
 */
function sc_isEven(dataAndEvents) {
    return dataAndEvents % 2 === 0;
}
/** @type {function (...[*]): number} */
var sc_max = Math.max;
/** @type {function (...[*]): number} */
var sc_min = Math.min;
/**
 * @return {?}
 */
function sc_plus() {
    /** @type {number} */
    var result = 0;
    /** @type {number} */
    var i = 0;
    for (;i < arguments.length;i++) {
        result += arguments[i];
    }
    return result;
}
/**
 * @return {?}
 */
function sc_multi() {
    /** @type {number} */
    var value = 1;
    /** @type {number} */
    var i = 0;
    for (;i < arguments.length;i++) {
        value *= arguments[i];
    }
    return value;
}
/**
 * @param {string} defaultValue
 * @return {?}
 */
function sc_minus(defaultValue) {
    if (arguments.length === 1) {
        return-defaultValue;
    } else {
        /** @type {string} */
        var value = defaultValue;
        /** @type {number} */
        var i = 1;
        for (;i < arguments.length;i++) {
            value -= arguments[i];
        }
        return value;
    }
}
/**
 * @param {?} defaultValue
 * @return {?}
 */
function sc_div(defaultValue) {
    if (arguments.length === 1) {
        return 1 / defaultValue;
    } else {
        var value = defaultValue;
        /** @type {number} */
        var i = 1;
        for (;i < arguments.length;i++) {
            value /= arguments[i];
        }
        return value;
    }
}
/** @type {function (*): number} */
var sc_abs = Math.abs;
/**
 * @param {number} maxWidth
 * @param {number} itemWidth
 * @return {?}
 */
function sc_quotient(maxWidth, itemWidth) {
    return parseInt(maxWidth / itemWidth);
}
/**
 * @param {number} dataAndEvents
 * @param {number} deepDataAndEvents
 * @return {?}
 */
function sc_remainder(dataAndEvents, deepDataAndEvents) {
    return dataAndEvents % deepDataAndEvents;
}
/**
 * @param {number} a
 * @param {number} b
 * @return {?}
 */
function sc_modulo(a, b) {
    /** @type {number} */
    var r = a % b;
    if (r * b < 0) {
        return r + b;
    } else {
        return r;
    }
}
/**
 * @param {number} b
 * @param {number} a
 * @return {?}
 */
function sc_euclid_gcd(b, a) {
    var temp;
    if (b === 0) {
        return a;
    }
    if (a === 0) {
        return b;
    }
    if (b < 0) {
        /** @type {number} */
        b = -b;
    }
    if (a < 0) {
        /** @type {number} */
        a = -a;
    }
    if (a > b) {
        /** @type {number} */
        temp = b;
        /** @type {number} */
        b = a;
        a = temp;
    }
    for (;true;) {
        b %= a;
        if (b === 0) {
            return a;
        }
        a %= b;
        if (a === 0) {
            return b;
        }
    }
    return a;
}
/**
 * @return {?}
 */
function sc_gcd() {
    /** @type {number} */
    var related = 0;
    /** @type {number} */
    var i = 0;
    for (;i < arguments.length;i++) {
        related = sc_euclid_gcd(related, arguments[i]);
    }
    return related;
}
/**
 * @return {?}
 */
function sc_lcm() {
    /** @type {number} */
    var QUnit = 1;
    /** @type {number} */
    var i = 0;
    for (;i < arguments.length;i++) {
        /** @type {number} */
        var oDelta = Math.round(arguments[i] / sc_euclid_gcd(arguments[i], QUnit));
        QUnit *= Math.abs(oDelta);
    }
    return QUnit;
}
/** @type {function (*): number} */
var sc_floor = Math.floor;
/** @type {function (*): number} */
var sc_ceiling = Math.ceil;
/** @type {function (*, (number|undefined)): number} */
var sc_truncate = parseInt;
/** @type {function (*): number} */
var sc_round = Math.round;
/** @type {function (*): number} */
var sc_exp = Math.exp;
/** @type {function (*): number} */
var sc_log = Math.log;
/** @type {function (*): number} */
var sc_sin = Math.sin;
/** @type {function (*): number} */
var sc_cos = Math.cos;
/** @type {function (*): number} */
var sc_tan = Math.tan;
/** @type {function (*): number} */
var sc_asin = Math.asin;
/** @type {function (*): number} */
var sc_acos = Math.acos;
/** @type {function (*): number} */
var sc_atan = Math.atan;
/** @type {function (*): number} */
var sc_sqrt = Math.sqrt;
/** @type {function (*, *): number} */
var sc_expt = Math.pow;
/**
 * @param {?} dataAndEvents
 * @return {?}
 */
function sc_exact2inexact(dataAndEvents) {
    return dataAndEvents;
}
/**
 * @param {?} dataAndEvents
 * @return {?}
 */
function sc_inexact2exact(dataAndEvents) {
    return dataAndEvents;
}
/**
 * @param {?} regex
 * @param {?} deepDataAndEvents
 * @return {?}
 */
function sc_number2jsstring(regex, deepDataAndEvents) {
    if (deepDataAndEvents) {
        return regex.toString(deepDataAndEvents);
    } else {
        return regex.toString();
    }
}
/**
 * @param {string} t
 * @param {number} i
 * @return {?}
 */
function sc_jsstring2number(t, i) {
    if (t === "") {
        return false;
    }
    if (i) {
        /** @type {number} */
        var v = parseInt(t, i);
        if (!v && v !== 0) {
            return false;
        }
        /** @type {string} */
        var allowedChars = "01234567890abcdefghijklmnopqrstuvwxyz".substring(0, i + 1);
        if ((new RegExp("^[" + allowedChars + "]*$", "i")).test(t)) {
            return v;
        } else {
            return false;
        }
    } else {
        /** @type {number} */
        v = +t;
        if (!v && v !== 0) {
            return false;
        }
        var c = t.charAt(0);
        if (+c === 0 && c !== "0") {
            return false;
        }
        return v;
    }
}
/**
 * @param {(boolean|string)} dataAndEvents
 * @return {?}
 */
function sc_not(dataAndEvents) {
    return dataAndEvents === false;
}
/**
 * @param {boolean} value3
 * @return {?}
 */
function sc_isBoolean(value3) {
    return value3 === true || value3 === false;
}
/**
 * @param {?} car
 * @param {?} cdr
 * @return {undefined}
 */
function sc_Pair(car, cdr) {
    this.car = car;
    this.cdr = cdr;
}
/**
 * @return {?}
 */
sc_Pair.prototype.toString = function() {
    return sc_toDisplayString(this);
};
/**
 * @param {Function} eq
 * @return {?}
 */
sc_Pair.prototype.sc_toWriteOrDisplayString = function(eq) {
    var a = this;
    /** @type {string} */
    var sc_toWriteOrDisplayString = "(";
    for (;true;) {
        sc_toWriteOrDisplayString += eq(a.car);
        if (sc_isPair(a.cdr)) {
            sc_toWriteOrDisplayString += " ";
            a = a.cdr;
        } else {
            if (a.cdr !== null) {
                sc_toWriteOrDisplayString += " . " + eq(a.cdr);
                break;
            } else {
                break;
            }
        }
    }
    sc_toWriteOrDisplayString += ")";
    return sc_toWriteOrDisplayString;
};
/**
 * @return {?}
 */
sc_Pair.prototype.sc_toDisplayString = function() {
    return this.sc_toWriteOrDisplayString(sc_toDisplayString);
};
/**
 * @return {?}
 */
sc_Pair.prototype.sc_toWriteString = function() {
    return this.sc_toWriteOrDisplayString(sc_toWriteString);
};
/**
 * @param {?} deepDataAndEvents
 * @return {?}
 */
function sc_isPair(deepDataAndEvents) {
    return deepDataAndEvents instanceof sc_Pair;
}
/**
 * @param {?} deepDataAndEvents
 * @param {?} dataAndEvents
 * @param {Function} equal
 * @return {?}
 */
function sc_isPairEqual(deepDataAndEvents, dataAndEvents, equal) {
    return equal(deepDataAndEvents.car, dataAndEvents.car) && equal(deepDataAndEvents.cdr, dataAndEvents.cdr);
}
/**
 * @param {string} tag
 * @param {Function} recurring
 * @return {?}
 */
function sc_cons(tag, recurring) {
    return new sc_Pair(tag, recurring);
}
/**
 * @return {?}
 */
function sc_consStar() {
    var err = arguments[arguments.length - 1];
    /** @type {number} */
    var elementArgumentPos = arguments.length - 2;
    for (;elementArgumentPos >= 0;elementArgumentPos--) {
        err = new sc_Pair(arguments[elementArgumentPos], err);
    }
    return err;
}
/**
 * @param {?} b
 * @return {?}
 */
function sc_car(b) {
    return b.car;
}
/**
 * @param {?} b
 * @return {?}
 */
function sc_cdr(b) {
    return b.cdr;
}
/**
 * @param {?} $scope
 * @param {?} car
 * @return {undefined}
 */
function sc_setCarBang($scope, car) {
    $scope.car = car;
}
/**
 * @param {?} a
 * @param {?} e
 * @return {undefined}
 */
function sc_setCdrBang(a, e) {
    a.cdr = e;
}
/**
 * @param {?} pair
 * @return {?}
 */
function sc_caar(pair) {
    return pair.car.car;
}
/**
 * @param {?} pair
 * @return {?}
 */
function sc_cadr(pair) {
    return pair.cdr.car;
}
/**
 * @param {?} pair
 * @return {?}
 */
function sc_cdar(pair) {
    return pair.car.cdr;
}
/**
 * @param {?} pair
 * @return {?}
 */
function sc_cddr(pair) {
    return pair.cdr.cdr;
}
/**
 * @param {?} pair
 * @return {?}
 */
function sc_caaar(pair) {
    return pair.car.car.car;
}
/**
 * @param {?} pair
 * @return {?}
 */
function sc_cadar(pair) {
    return pair.car.cdr.car;
}
/**
 * @param {?} pair
 * @return {?}
 */
function sc_caadr(pair) {
    return pair.cdr.car.car;
}
/**
 * @param {?} pair
 * @return {?}
 */
function sc_caddr(pair) {
    return pair.cdr.cdr.car;
}
/**
 * @param {?} pair
 * @return {?}
 */
function sc_cdaar(pair) {
    return pair.car.car.cdr;
}
/**
 * @param {?} pair
 * @return {?}
 */
function sc_cdadr(pair) {
    return pair.cdr.car.cdr;
}
/**
 * @param {?} pair
 * @return {?}
 */
function sc_cddar(pair) {
    return pair.car.cdr.cdr;
}
/**
 * @param {?} pair
 * @return {?}
 */
function sc_cdddr(pair) {
    return pair.cdr.cdr.cdr;
}
/**
 * @param {?} pair
 * @return {?}
 */
function sc_caaaar(pair) {
    return pair.car.car.car.car;
}
/**
 * @param {?} pair
 * @return {?}
 */
function sc_caadar(pair) {
    return pair.car.cdr.car.car;
}
/**
 * @param {?} pair
 * @return {?}
 */
function sc_caaadr(pair) {
    return pair.cdr.car.car.car;
}
/**
 * @param {?} pair
 * @return {?}
 */
function sc_caaddr(pair) {
    return pair.cdr.cdr.car.car;
}
/**
 * @param {?} pair
 * @return {?}
 */
function sc_cdaaar(pair) {
    return pair.car.car.car.cdr;
}
/**
 * @param {?} pair
 * @return {?}
 */
function sc_cdadar(pair) {
    return pair.car.cdr.car.cdr;
}
/**
 * @param {?} pair
 * @return {?}
 */
function sc_cdaadr(pair) {
    return pair.cdr.car.car.cdr;
}
/**
 * @param {?} pair
 * @return {?}
 */
function sc_cdaddr(pair) {
    return pair.cdr.cdr.car.cdr;
}
/**
 * @param {?} pair
 * @return {?}
 */
function sc_cadaar(pair) {
    return pair.car.car.cdr.car;
}
/**
 * @param {?} pair
 * @return {?}
 */
function sc_caddar(pair) {
    return pair.car.cdr.cdr.car;
}
/**
 * @param {?} pair
 * @return {?}
 */
function sc_cadadr(pair) {
    return pair.cdr.car.cdr.car;
}
/**
 * @param {?} pair
 * @return {?}
 */
function sc_cadddr(pair) {
    return pair.cdr.cdr.cdr.car;
}
/**
 * @param {?} pair
 * @return {?}
 */
function sc_cddaar(pair) {
    return pair.car.car.cdr.cdr;
}
/**
 * @param {?} pair
 * @return {?}
 */
function sc_cdddar(pair) {
    return pair.car.cdr.cdr.cdr;
}
/**
 * @param {?} pair
 * @return {?}
 */
function sc_cddadr(pair) {
    return pair.cdr.car.cdr.cdr;
}
/**
 * @param {?} pair
 * @return {?}
 */
function sc_cddddr(pair) {
    return pair.cdr.cdr.cdr.cdr;
}
/**
 * @param {(Object|string)} deepDataAndEvents
 * @return {?}
 */
function sc_lastPair(deepDataAndEvents) {
    if (!sc_isPair(deepDataAndEvents)) {
        sc_error("sc_lastPair: pair expected");
    }
    /** @type {(Object|string)} */
    var fragment = deepDataAndEvents;
    var first = deepDataAndEvents.cdr;
    for (;sc_isPair(first);) {
        fragment = first;
        first = fragment.cdr;
    }
    return fragment;
}
/**
 * @param {?} dataAndEvents
 * @return {?}
 */
function sc_isNull(dataAndEvents) {
    return dataAndEvents === null;
}
/**
 * @param {(number|string)} temp
 * @return {?}
 */
function sc_isList(temp) {
    var a;
    var b;
    /** @type {(number|string)} */
    a = temp;
    /** @type {(number|string)} */
    b = temp;
    for (;true;) {
        if (a === null || a instanceof sc_Pair && a.cdr === null) {
            return true;
        } else {
            if (a instanceof sc_Pair && a.cdr instanceof sc_Pair) {
                a = a.cdr.cdr;
                b = b.cdr;
                if (a === b) {
                    return false;
                }
            } else {
                return false;
            }
        }
    }
}
/**
 * @return {?}
 */
function sc_list() {
    /** @type {null} */
    var p = null;
    /** @type {Arguments} */
    var funcs = arguments;
    /** @type {number} */
    var index = funcs.length - 1;
    for (;index >= 0;index--) {
        p = new sc_Pair(funcs[index], p);
    }
    return p;
}
/**
 * @param {number} l
 * @param {number} sign
 * @return {?}
 */
function sc_iota(l, sign) {
    /** @type {null} */
    var p = null;
    if (!sign) {
        /** @type {number} */
        sign = 0;
    }
    /** @type {number} */
    var e = l - 1;
    for (;e >= 0;e--) {
        p = new sc_Pair(e + sign, p);
    }
    return p;
}
/**
 * @param {number} high
 * @param {string} l
 * @return {?}
 */
function sc_makeList(high, l) {
    /** @type {null} */
    var args = null;
    /** @type {number} */
    var low = 0;
    for (;low < high;low++) {
        args = new sc_Pair(l, args);
    }
    return args;
}
/**
 * @param {Object} b
 * @return {?}
 */
function sc_length(b) {
    /** @type {number} */
    var sc_length = 0;
    for (;b !== null;) {
        sc_length++;
        b = b.cdr;
    }
    return sc_length;
}
/**
 * @param {?} n
 * @param {Object} b
 * @return {?}
 */
function sc_remq(n, b) {
    var a = {
        cdr : null
    };
    var c = a;
    for (;b !== null;) {
        if (b.car !== n) {
            c.cdr = sc_cons(b.car, null);
            c = c.cdr;
        }
        b = b.cdr;
    }
    return a.cdr;
}
/**
 * @param {?} value
 * @param {Object} pair
 * @return {?}
 */
function sc_remqBang(value, pair) {
    var obj = {
        cdr : null
    };
    var last = obj;
    /** @type {boolean} */
    var needsAssig = true;
    for (;pair !== null;) {
        if (pair.car === value) {
            /** @type {boolean} */
            needsAssig = true;
        } else {
            if (needsAssig) {
                /** @type {Object} */
                last.cdr = pair;
                /** @type {boolean} */
                needsAssig = false;
            }
            /** @type {Object} */
            last = pair;
        }
        pair = pair.cdr;
    }
    /** @type {null} */
    last.cdr = null;
    return obj.cdr;
}
/**
 * @param {?} dataAndEvents
 * @param {Object} b
 * @return {?}
 */
function sc_delete(dataAndEvents, b) {
    var a = {
        cdr : null
    };
    var c = a;
    for (;b !== null;) {
        if (!sc_isEqual(b.car, dataAndEvents)) {
            c.cdr = sc_cons(b.car, null);
            c = c.cdr;
        }
        b = b.cdr;
    }
    return a.cdr;
}
/**
 * @param {?} dataAndEvents
 * @param {Object} pair
 * @return {?}
 */
function sc_deleteBang(dataAndEvents, pair) {
    var obj = {
        cdr : null
    };
    var last = obj;
    /** @type {boolean} */
    var needsAssig = true;
    for (;pair !== null;) {
        if (sc_isEqual(pair.car, dataAndEvents)) {
            /** @type {boolean} */
            needsAssig = true;
        } else {
            if (needsAssig) {
                /** @type {Object} */
                last.cdr = pair;
                /** @type {boolean} */
                needsAssig = false;
            }
            /** @type {Object} */
            last = pair;
        }
        pair = pair.cdr;
    }
    /** @type {null} */
    last.cdr = null;
    return obj.cdr;
}
/**
 * @param {Object} recurring
 * @param {Function} mayParseLabeledStatementInstead
 * @return {?}
 */
function sc_reverseAppendBang(recurring, mayParseLabeledStatementInstead) {
    /** @type {Function} */
    var value = mayParseLabeledStatementInstead;
    for (;recurring !== null;) {
        var color = value;
        /** @type {Object} */
        value = recurring;
        recurring = recurring.cdr;
        value.cdr = color;
    }
    return value;
}
/**
 * @param {Object} isXML
 * @param {?} protoProps
 * @return {?}
 */
function sc_dualAppend(isXML, protoProps) {
    if (isXML === null) {
        return protoProps;
    }
    if (protoProps === null) {
        return isXML;
    }
    var recurring = sc_reverse(isXML);
    return sc_reverseAppendBang(recurring, protoProps);
}
/**
 * @return {?}
 */
function sc_append() {
    if (arguments.length === 0) {
        return null;
    }
    var params = arguments[arguments.length - 1];
    /** @type {number} */
    var elementArgumentPos = arguments.length - 2;
    for (;elementArgumentPos >= 0;elementArgumentPos--) {
        params = sc_dualAppend(arguments[elementArgumentPos], params);
    }
    return params;
}
/**
 * @param {?} elem
 * @param {?} e
 * @return {?}
 */
function sc_dualAppendBang(elem, e) {
    if (elem === null) {
        return e;
    }
    if (e === null) {
        return elem;
    }
    var a = elem;
    for (;a.cdr !== null;) {
        a = a.cdr;
    }
    a.cdr = e;
    return elem;
}
/**
 * @return {?}
 */
function sc_appendBang() {
    /** @type {null} */
    var ol = null;
    /** @type {number} */
    var i = 0;
    for (;i < arguments.length;i++) {
        ol = sc_dualAppendBang(ol, arguments[i]);
    }
    return ol;
}
/**
 * @param {Object} value
 * @return {?}
 */
function sc_reverse(value) {
    /** @type {null} */
    var recurring = null;
    for (;value !== null;) {
        recurring = sc_cons(value.car, recurring);
        value = value.cdr;
    }
    return recurring;
}
/**
 * @param {Object} recurring
 * @return {?}
 */
function sc_reverseBang(recurring) {
    return sc_reverseAppendBang(recurring, null);
}
/**
 * @param {?} deepDataAndEvents
 * @param {number} f
 * @return {?}
 */
function sc_listTail(deepDataAndEvents, f) {
    var cdr = deepDataAndEvents;
    /** @type {number} */
    var indexf = 0;
    for (;indexf < f;indexf++) {
        cdr = cdr.cdr;
    }
    return cdr;
}
/**
 * @param {?} deepDataAndEvents
 * @param {number} opt_obj2
 * @return {?}
 */
function sc_listRef(deepDataAndEvents, opt_obj2) {
    return sc_listTail(deepDataAndEvents, opt_obj2).car;
}
/**
 * @param {?} item
 * @param {Object} list
 * @return {?}
 */
function sc_memq(item, list) {
    for (;list !== null;) {
        if (list.car === item) {
            return list;
        }
        list = list.cdr;
    }
    return false;
}
/**
 * @param {?} item
 * @param {Object} list
 * @return {?}
 */
function sc_memv(item, list) {
    for (;list !== null;) {
        if (list.car === item) {
            return list;
        }
        list = list.cdr;
    }
    return false;
}
/**
 * @param {?} v00
 * @param {Object} value
 * @return {?}
 */
function sc_member(v00, value) {
    for (;value !== null;) {
        if (sc_isEqual(value.car, v00)) {
            return value;
        }
        value = value.cdr;
    }
    return false;
}
/**
 * @param {?} deepDataAndEvents
 * @param {Object} pair
 * @return {?}
 */
function sc_assq(deepDataAndEvents, pair) {
    for (;pair !== null;) {
        if (pair.car.car === deepDataAndEvents) {
            return pair.car;
        }
        pair = pair.cdr;
    }
    return false;
}
/**
 * @param {?} item
 * @param {Object} pair
 * @return {?}
 */
function sc_assv(item, pair) {
    for (;pair !== null;) {
        if (pair.car.car === item) {
            return pair.car;
        }
        pair = pair.cdr;
    }
    return false;
}
/**
 * @param {?} dataAndEvents
 * @param {(Object|string)} pair
 * @return {?}
 */
function sc_assoc(dataAndEvents, pair) {
    for (;pair !== null;) {
        if (sc_isEqual(pair.car.car, dataAndEvents)) {
            return pair.car;
        }
        pair = pair.cdr;
    }
    return false;
}
/**
 * @param {Text} a
 * @param {Text} b
 * @return {?}
 */
function sc_isCharStringEqual(a, b) {
    return a.val === b.val;
}
/**
 * @param {Text} val
 * @param {Text} data
 * @return {?}
 */
function sc_isCharStringLess(val, data) {
    return val.val < data.val;
}
/**
 * @param {Text} a
 * @param {Text} b
 * @return {?}
 */
function sc_isCharStringGreater(a, b) {
    return a.val > b.val;
}
/**
 * @param {Text} match
 * @param {Text} child
 * @return {?}
 */
function sc_isCharStringLessEqual(match, child) {
    return match.val <= child.val;
}
/**
 * @param {Text} pos
 * @param {Text} doc
 * @return {?}
 */
function sc_isCharStringGreaterEqual(pos, doc) {
    return pos.val >= doc.val;
}
/**
 * @param {Text} target
 * @param {Text} el
 * @return {?}
 */
function sc_isCharStringCIEqual(target, el) {
    return target.val.toLowerCase() === el.val.toLowerCase();
}
/**
 * @param {Text} target
 * @param {Text} el
 * @return {?}
 */
function sc_isCharStringCILess(target, el) {
    return target.val.toLowerCase() < el.val.toLowerCase();
}
/**
 * @param {Text} target
 * @param {Text} el
 * @return {?}
 */
function sc_isCharStringCIGreater(target, el) {
    return target.val.toLowerCase() > el.val.toLowerCase();
}
/**
 * @param {Text} target
 * @param {Text} el
 * @return {?}
 */
function sc_isCharStringCILessEqual(target, el) {
    return target.val.toLowerCase() <= el.val.toLowerCase();
}
/**
 * @param {Text} target
 * @param {Text} el
 * @return {?}
 */
function sc_isCharStringCIGreaterEqual(target, el) {
    return target.val.toLowerCase() >= el.val.toLowerCase();
}
/**
 * @param {string} line
 * @return {?}
 */
function sc_Char(line) {
    var value = sc_Char.lazy[line];
    if (value) {
        return value;
    }
    /** @type {string} */
    this.val = line;
    sc_Char.lazy[line] = this;
    return undefined;
}
/** @type {Object} */
sc_Char.lazy = new Object;
sc_Char.char2readable = {
    "\x00" : "#\\null",
    "\u0007" : "#\\bell",
    "\b" : "#\\backspace",
    "\t" : "#\\tab",
    "\n" : "#\\newline",
    "\f" : "#\\page",
    "\r" : "#\\return",
    "\u001b" : "#\\escape",
    " " : "#\\space",
    "\u007f" : "#\\delete",
    "\u0001" : "#\\soh",
    "\u0002" : "#\\stx",
    "\u0003" : "#\\etx",
    "\u0004" : "#\\eot",
    "\u0005" : "#\\enq",
    "\u0006" : "#\\ack",
    "\x0B" : "#\\vt",
    "\u000e" : "#\\so",
    "\u000f" : "#\\si",
    "\u0010" : "#\\dle",
    "\u0011" : "#\\dc1",
    "\u0012" : "#\\dc2",
    "\u0013" : "#\\dc3",
    "\u0014" : "#\\dc4",
    "\u0015" : "#\\nak",
    "\u0016" : "#\\syn",
    "\u0017" : "#\\etb",
    "\u0018" : "#\\can",
    "\u0019" : "#\\em",
    "\u001a" : "#\\sub",
    "\u001b" : "#\\esc",
    "\u001c" : "#\\fs",
    "\u001d" : "#\\gs",
    "\u001e" : "#\\rs",
    "\u001f" : "#\\us"
};
sc_Char.readable2char = {
    "null" : "\x00",
    "bell" : "\u0007",
    "backspace" : "\b",
    "tab" : "\t",
    "newline" : "\n",
    "page" : "\f",
    "return" : "\r",
    "escape" : "\u001b",
    "space" : " ",
    "delete" : "\x00",
    "soh" : "\u0001",
    "stx" : "\u0002",
    "etx" : "\u0003",
    "eot" : "\u0004",
    "enq" : "\u0005",
    "ack" : "\u0006",
    "bel" : "\u0007",
    "bs" : "\b",
    "ht" : "\t",
    "nl" : "\n",
    "vt" : "\x0B",
    "np" : "\f",
    "cr" : "\r",
    "so" : "\u000e",
    "si" : "\u000f",
    "dle" : "\u0010",
    "dc1" : "\u0011",
    "dc2" : "\u0012",
    "dc3" : "\u0013",
    "dc4" : "\u0014",
    "nak" : "\u0015",
    "syn" : "\u0016",
    "etb" : "\u0017",
    "can" : "\u0018",
    "em" : "\u0019",
    "sub" : "\u001a",
    "esc" : "\u001b",
    "fs" : "\u001c",
    "gs" : "\u001d",
    "rs" : "\u001e",
    "us" : "\u001f",
    "sp" : " ",
    "del" : "\u007f"
};
/**
 * @return {?}
 */
sc_Char.prototype.toString = function() {
    return this.val;
};
/**
 * @return {?}
 */
sc_Char.prototype.sc_toWriteString = function() {
    var val = sc_Char.char2readable[this.val];
    if (val) {
        return val;
    } else {
        return "#\\" + this.val;
    }
};
/**
 * @param {?} dataAndEvents
 * @return {?}
 */
function sc_isChar(dataAndEvents) {
    return dataAndEvents instanceof sc_Char;
}
/** @type {function (Text, Text): ?} */
var sc_isCharEqual = sc_isCharStringEqual;
/** @type {function (Text, Text): ?} */
var sc_isCharLess = sc_isCharStringLess;
/** @type {function (Text, Text): ?} */
var sc_isCharGreater = sc_isCharStringGreater;
/** @type {function (Text, Text): ?} */
var sc_isCharLessEqual = sc_isCharStringLessEqual;
/** @type {function (Text, Text): ?} */
var sc_isCharGreaterEqual = sc_isCharStringGreaterEqual;
/** @type {function (Text, Text): ?} */
var sc_isCharCIEqual = sc_isCharStringCIEqual;
/** @type {function (Text, Text): ?} */
var sc_isCharCILess = sc_isCharStringCILess;
/** @type {function (Text, Text): ?} */
var sc_isCharCIGreater = sc_isCharStringCIGreater;
/** @type {function (Text, Text): ?} */
var sc_isCharCILessEqual = sc_isCharStringCILessEqual;
/** @type {function (Text, Text): ?} */
var sc_isCharCIGreaterEqual = sc_isCharStringCIGreaterEqual;
/** @type {string} */
var SC_NUMBER_CLASS = "0123456789";
/** @type {string} */
var SC_WHITESPACE_CLASS = " \r\n\t\f";
/** @type {string} */
var SC_LOWER_CLASS = "abcdefghijklmnopqrstuvwxyz";
/** @type {string} */
var SC_UPPER_CLASS = "ABCDEFGHIJKLMNOPQRSTUVWXYZ";
/**
 * @param {?} chunk
 * @param {string} arr
 * @return {?}
 */
function sc_isCharOfClass(chunk, arr) {
    return arr.indexOf(chunk) != -1;
}
/**
 * @param {Text} snap
 * @return {?}
 */
function sc_isCharAlphabetic(snap) {
    return sc_isCharOfClass(snap.val, SC_LOWER_CLASS) || sc_isCharOfClass(snap.val, SC_UPPER_CLASS);
}
/**
 * @param {Text} snap
 * @return {?}
 */
function sc_isCharNumeric(snap) {
    return sc_isCharOfClass(snap.val, SC_NUMBER_CLASS);
}
/**
 * @param {Text} first
 * @return {?}
 */
function sc_isCharWhitespace(first) {
    var i = first.val;
    return i === " " || (i === "\r" || (i === "\n" || (i === "\t" || i === "\f")));
}
/**
 * @param {Text} snap
 * @return {?}
 */
function sc_isCharUpperCase(snap) {
    return sc_isCharOfClass(snap.val, SC_UPPER_CLASS);
}
/**
 * @param {Text} snap
 * @return {?}
 */
function sc_isCharLowerCase(snap) {
    return sc_isCharOfClass(snap.val, SC_LOWER_CLASS);
}
/**
 * @param {Text} text
 * @return {?}
 */
function sc_char2integer(text) {
    return text.val.charCodeAt(0);
}
/**
 * @param {?} lo
 * @return {?}
 */
function sc_integer2char(lo) {
    return new sc_Char(String.fromCharCode(lo));
}
/**
 * @param {Text} n
 * @return {?}
 */
function sc_charUpcase(n) {
    return new sc_Char(n.val.toUpperCase());
}
/**
 * @param {Text} target
 * @return {?}
 */
function sc_charDowncase(target) {
    return new sc_Char(target.val.toLowerCase());
}
/**
 * @param {number} deepDataAndEvents
 * @param {string} start
 * @return {?}
 */
function sc_makeJSStringOfLength(deepDataAndEvents, start) {
    var left;
    if (start === undefined) {
        /** @type {string} */
        left = " ";
    } else {
        /** @type {string} */
        left = start;
    }
    /** @type {string} */
    var l = "";
    /** @type {number} */
    var y = 1;
    for (;deepDataAndEvents >= y;) {
        if (deepDataAndEvents & y) {
            /** @type {string} */
            l = l.concat(left);
        }
        left = left.concat(left);
        y *= 2;
    }
    return l;
}
/**
 * @param {number} deepDataAndEvents
 * @param {Text} result
 * @return {?}
 */
function sc_makejsString(deepDataAndEvents, result) {
    var length;
    if (result) {
        length = result.val;
    } else {
        /** @type {string} */
        length = " ";
    }
    return sc_makeJSStringOfLength(deepDataAndEvents, length);
}
/**
 * @param {string} nv
 * @return {?}
 */
function sc_jsstring2list(nv) {
    /** @type {null} */
    var recurring = null;
    /** @type {number} */
    var v = nv.length - 1;
    for (;v >= 0;v--) {
        recurring = sc_cons(new sc_Char(nv.charAt(v)), recurring);
    }
    return recurring;
}
/**
 * @param {Object} c
 * @return {?}
 */
function sc_list2jsstring(c) {
    /** @type {Array} */
    var vals = new Array;
    for (;c !== null;) {
        vals.push(c.car.val);
        c = c.cdr;
    }
    return "".concat.apply("", vals);
}
/** @type {function (new:Array, ...[*]): Array} */
var sc_Vector = Array;
/**
 * @param {Function} fn
 * @return {?}
 */
sc_Vector.prototype.sc_toWriteOrDisplayString = function(fn) {
    if (this.length === 0) {
        return "#()";
    }
    var sc_toWriteOrDisplayString = "#(" + fn(this[0]);
    /** @type {number} */
    var i = 1;
    for (;i < this.length;i++) {
        sc_toWriteOrDisplayString += " " + fn(this[i]);
    }
    sc_toWriteOrDisplayString += ")";
    return sc_toWriteOrDisplayString;
};
/**
 * @return {?}
 */
sc_Vector.prototype.sc_toDisplayString = function() {
    return this.sc_toWriteOrDisplayString(sc_toDisplayString);
};
/**
 * @return {?}
 */
sc_Vector.prototype.sc_toWriteString = function() {
    return this.sc_toWriteOrDisplayString(sc_toWriteString);
};
/**
 * @param {?} deepDataAndEvents
 * @return {?}
 */
function sc_isVector(deepDataAndEvents) {
    return deepDataAndEvents instanceof sc_Vector;
}
/**
 * @param {Array} values
 * @param {Array} newValues
 * @param {Function} resultSelector
 * @return {?}
 */
function sc_isVectorEqual(values, newValues, resultSelector) {
    if (values.length !== newValues.length) {
        return false;
    }
    /** @type {number} */
    var i = 0;
    for (;i < values.length;i++) {
        if (!resultSelector(values[i], newValues[i])) {
            return false;
        }
    }
    return true;
}
/**
 * @param {?} dataAndEvents
 * @param {Object} recurring
 * @return {?}
 */
function sc_makeVector(dataAndEvents, recurring) {
    var oldconfig = new sc_Vector(dataAndEvents);
    if (recurring !== undefined) {
        sc_vectorFillBang(oldconfig, recurring);
    }
    return oldconfig;
}
/**
 * @return {?}
 */
function sc_vector() {
    var callbackArgs = new sc_Vector;
    /** @type {number} */
    var i = 0;
    for (;i < arguments.length;i++) {
        callbackArgs.push(arguments[i]);
    }
    return callbackArgs;
}
/**
 * @param {Array} newlines
 * @return {?}
 */
function sc_vectorLength(newlines) {
    return newlines.length;
}
/**
 * @param {Array} buf
 * @param {number} off
 * @return {?}
 */
function sc_vectorRef(buf, off) {
    return buf[off];
}
/**
 * @param {Array} qs
 * @param {number} i
 * @param {?} val
 * @return {undefined}
 */
function sc_vectorSetBang(qs, i, val) {
    qs[i] = val;
}
/**
 * @param {Array} value
 * @return {?}
 */
function sc_vector2list(value) {
    /** @type {null} */
    var recurring = null;
    /** @type {number} */
    var valIndex = value.length - 1;
    for (;valIndex >= 0;valIndex--) {
        recurring = sc_cons(value[valIndex], recurring);
    }
    return recurring;
}
/**
 * @param {Object} a
 * @return {?}
 */
function sc_list2vector(a) {
    var callers = new sc_Vector;
    for (;a !== null;) {
        callers.push(a.car);
        a = a.cdr;
    }
    return callers;
}
/**
 * @param {Array} b
 * @param {Object} recurring
 * @return {undefined}
 */
function sc_vectorFillBang(b, recurring) {
    /** @type {number} */
    var bi = 0;
    for (;bi < b.length;bi++) {
        /** @type {Object} */
        b[bi] = recurring;
    }
}
/**
 * @param {Array} array
 * @param {Array} i
 * @return {?}
 */
function sc_copyVector(array, i) {
    if (i <= array.length) {
        return array.slice(0, i);
    } else {
        var first = array.concat();
        /** @type {Array} */
        first.length = i;
        return first;
    }
}
/**
 * @param {Object} models
 * @param {?} character
 * @param {?} characters
 * @return {?}
 */
function sc_vectorCopy(models, character, characters) {
    return models.slice(character, characters);
}
/**
 * @param {Arguments} first
 * @param {number} fromIndex
 * @param {Arguments} second
 * @param {number} index
 * @param {Array} length
 * @return {?}
 */
function sc_vectorCopyBang(first, fromIndex, second, index, length) {
    if (!index) {
        /** @type {number} */
        index = 0;
    }
    if (!length) {
        length = second.length;
    }
    if (fromIndex <= index) {
        /** @type {number} */
        var i = fromIndex;
        /** @type {number} */
        var j = index;
        for (;j < length;i++, j++) {
            first[i] = second[j];
        }
    } else {
        /** @type {number} */
        var padLength = length - index;
        /** @type {number} */
        i = fromIndex + padLength - 1;
        /** @type {number} */
        j = length - 1;
        for (;j >= index;i--, j--) {
            first[i] = second[j];
        }
    }
    return first;
}
/**
 * @param {?} reviver
 * @return {?}
 */
function sc_isProcedure(reviver) {
    return typeof reviver === "function";
}
/**
 * @param {Function} wrapper
 * @return {?}
 */
function sc_apply(wrapper) {
    /** @type {Array} */
    var args = new Array;
    /** @type {number} */
    var j = 1;
    for (;j < arguments.length - 1;j++) {
        args.push(arguments[j]);
    }
    var a = arguments[arguments.length - 1];
    for (;a !== null;) {
        args.push(a.car);
        a = a.cdr;
    }
    return wrapper.apply(null, args);
}
/**
 * @param {Function} matcherFunction
 * @param {string} clobber
 * @return {?}
 */
function sc_map(matcherFunction, clobber) {
    if (clobber === undefined) {
        return null;
    }
    /** @type {number} */
    var length = arguments.length - 1;
    /** @type {Array} */
    var pairs = new Array(length);
    /** @type {null} */
    var recurring = null;
    for (;clobber !== null;) {
        /** @type {number} */
        var i = 0;
        for (;i < length;i++) {
            pairs[i] = arguments[i + 1].car;
            arguments[i + 1] = arguments[i + 1].cdr;
        }
        recurring = sc_cons(matcherFunction.apply(null, pairs), recurring);
    }
    return sc_reverseAppendBang(recurring, null);
}
/**
 * @param {Function} matcherFunction
 * @param {string} val
 * @return {?}
 */
function sc_mapBang(matcherFunction, val) {
    if (val === undefined) {
        return null;
    }
    /** @type {string} */
    var rval = val;
    /** @type {number} */
    var length = arguments.length - 1;
    /** @type {Array} */
    var pairs = new Array(length);
    for (;val !== null;) {
        /** @type {string} */
        var current = val;
        /** @type {number} */
        var i = 0;
        for (;i < length;i++) {
            pairs[i] = arguments[i + 1].car;
            arguments[i + 1] = arguments[i + 1].cdr;
        }
        current.car = matcherFunction.apply(null, pairs);
    }
    return rval;
}
/**
 * @param {Function} matcherFunction
 * @param {string} clobber
 * @return {?}
 */
function sc_forEach(matcherFunction, clobber) {
    if (clobber === undefined) {
        return undefined;
    }
    /** @type {number} */
    var length = arguments.length - 1;
    /** @type {Array} */
    var pairs = new Array(length);
    for (;clobber !== null;) {
        /** @type {number} */
        var i = 0;
        for (;i < length;i++) {
            pairs[i] = arguments[i + 1].car;
            arguments[i + 1] = arguments[i + 1].cdr;
        }
        matcherFunction.apply(null, pairs);
    }
    return undefined;
}
/**
 * @param {?} equal
 * @param {Object} b
 * @return {?}
 */
function sc_filter(equal, b) {
    var a = {
        cdr : null
    };
    var c = a;
    for (;b !== null;) {
        if (equal(b.car) !== false) {
            c.cdr = sc_cons(b.car, null);
            c = c.cdr;
        }
        b = b.cdr;
    }
    return a.cdr;
}
/**
 * @param {?} isFunction
 * @param {Function} recurring
 * @return {?}
 */
function sc_filterBang(isFunction, recurring) {
    var p = sc_cons("dummy", recurring);
    var element = p;
    /** @type {Function} */
    var value = recurring;
    for (;value !== null;) {
        if (isFunction(value.car) !== false) {
            element.cdr = value;
            element = value;
        }
        value = value.cdr;
    }
    /** @type {null} */
    element.cdr = null;
    return p.cdr;
}
/**
 * @param {Function} eq
 * @param {Object} a
 * @return {?}
 */
function sc_filterMap1(eq, a) {
    /** @type {null} */
    var recurring = null;
    for (;a !== null;) {
        var vdom = eq(a.car);
        if (vdom !== false) {
            recurring = sc_cons(vdom, recurring);
        }
        a = a.cdr;
    }
    return sc_reverseAppendBang(recurring, null);
}
/**
 * @param {Function} eq
 * @param {Object} a
 * @param {(Function|string)} b
 * @return {?}
 */
function sc_filterMap2(eq, a, b) {
    /** @type {null} */
    var recurring = null;
    for (;a !== null;) {
        var vdom = eq(a.car, b.car);
        if (vdom !== false) {
            recurring = sc_cons(vdom, recurring);
        }
        a = a.cdr;
        b = b.cdr;
    }
    return sc_reverseAppendBang(recurring, null);
}
/**
 * @param {Function} eq
 * @param {(Object|string)} defs
 * @param {Function} tag
 * @param {number} clobber
 * @return {?}
 */
function sc_filterMap(eq, defs, tag, clobber) {
    if (tag === undefined) {
        return sc_filterMap1(eq, defs);
    } else {
        if (clobber === undefined) {
            return sc_filterMap2(eq, defs, tag);
        }
    }
    /** @type {number} */
    var count = arguments.length - 1;
    /** @type {Array} */
    var args = new Array(count);
    /** @type {null} */
    var recurring = null;
    for (;defs !== null;) {
        /** @type {number} */
        var i = 0;
        for (;i < count;i++) {
            args[i] = arguments[i + 1].car;
            arguments[i + 1] = arguments[i + 1].cdr;
        }
        var match = eq.apply(null, args);
        if (match !== false) {
            recurring = sc_cons(match, recurring);
        }
    }
    return sc_reverseAppendBang(recurring, null);
}
/**
 * @param {?} eq
 * @param {Object} a
 * @return {?}
 */
function sc_any(eq, a) {
    /** @type {null} */
    var revres = null;
    for (;a !== null;) {
        var sc_any = eq(a.car);
        if (sc_any !== false) {
            return sc_any;
        }
        a = a.cdr;
    }
    return false;
}
/**
 * @param {?} eq
 * @param {Object} defs
 * @return {?}
 */
function sc_anyPred(eq, defs) {
    return sc_any(eq, defs) !== false;
}
/**
 * @param {?} eq
 * @param {Object} a
 * @return {?}
 */
function sc_every(eq, a) {
    /** @type {null} */
    var revres = null;
    /** @type {boolean} */
    var result = true;
    for (;a !== null;) {
        result = eq(a.car);
        if (result === false) {
            return false;
        }
        a = a.cdr;
    }
    return result;
}
/**
 * @param {?} eq
 * @param {Object} config
 * @return {?}
 */
function sc_everyPred(eq, config) {
    var idx = sc_every(eq, config);
    if (idx !== false) {
        return true;
    }
    return false;
}
/**
 * @param {?} $sanitize
 * @return {?}
 */
function sc_force($sanitize) {
    return $sanitize();
}
/**
 * @param {?} require
 * @return {?}
 */
function sc_makePromise(require) {
    /** @type {boolean} */
    var isResultReady = false;
    var value = undefined;
    return function() {
        if (!isResultReady) {
            var config = require();
            if (!isResultReady) {
                /** @type {boolean} */
                isResultReady = true;
                value = config;
            }
        }
        return value;
    };
}
/**
 * @param {Object} values
 * @return {undefined}
 */
function sc_Values(values) {
    /** @type {Object} */
    this.values = values;
}
/**
 * @return {?}
 */
function sc_values() {
    if (arguments.length === 1) {
        return arguments[0];
    } else {
        return new sc_Values(arguments);
    }
}
/**
 * @param {?} produce
 * @param {Function} self
 * @return {?}
 */
function sc_callWithValues(produce, self) {
    var item = produce();
    if (item instanceof sc_Values) {
        return self.apply(null, item.values);
    } else {
        return self(item);
    }
}
/**
 * @param {?} $sanitize
 * @param {?} require
 * @param {?} Application
 * @return {?}
 */
function sc_dynamicWind($sanitize, require, Application) {
    $sanitize();
    try {
        var Block = require();
        return Block;
    } finally {
        Application();
    }
}
/**
 * @param {string} tmplName
 * @return {undefined}
 */
function sc_Struct(tmplName) {
    /** @type {string} */
    this.name = tmplName;
}
/**
 * @return {?}
 */
sc_Struct.prototype.sc_toDisplayString = function() {
    return "#<struct" + sc_hash(this) + ">";
};
/** @type {function (): ?} */
sc_Struct.prototype.sc_toWriteString = sc_Struct.prototype.sc_toDisplayString;
/**
 * @param {?} dataAndEvents
 * @return {?}
 */
function sc_makeStruct(dataAndEvents) {
    return new sc_Struct(dataAndEvents);
}
/**
 * @param {?} dataAndEvents
 * @return {?}
 */
function sc_isStruct(dataAndEvents) {
    return dataAndEvents instanceof sc_Struct;
}
/**
 * @param {?} name
 * @param {(Error|string)} child
 * @return {?}
 */
function sc_isStructNamed(name, child) {
    return child instanceof sc_Struct && child.name === name;
}
/**
 * @param {Array} buf
 * @param {?} dataAndEvents
 * @param {number} off
 * @return {?}
 */
function sc_getStructField(buf, dataAndEvents, off) {
    return buf[off];
}
/**
 * @param {Array} flags
 * @param {?} dataAndEvents
 * @param {number} key
 * @param {?} value
 * @return {undefined}
 */
function sc_setStructFieldBang(flags, dataAndEvents, key, value) {
    flags[key] = value;
}
/**
 * @param {?} dataAndEvents
 * @return {?}
 */
function sc_bitNot(dataAndEvents) {
    return~dataAndEvents;
}
/**
 * @param {number} dataAndEvents
 * @param {number} deepDataAndEvents
 * @return {?}
 */
function sc_bitAnd(dataAndEvents, deepDataAndEvents) {
    return dataAndEvents & deepDataAndEvents;
}
/**
 * @param {number} dataAndEvents
 * @param {number} deepDataAndEvents
 * @return {?}
 */
function sc_bitOr(dataAndEvents, deepDataAndEvents) {
    return dataAndEvents | deepDataAndEvents;
}
/**
 * @param {number} dataAndEvents
 * @param {number} deepDataAndEvents
 * @return {?}
 */
function sc_bitXor(dataAndEvents, deepDataAndEvents) {
    return dataAndEvents ^ deepDataAndEvents;
}
/**
 * @param {number} dataAndEvents
 * @param {number} deepDataAndEvents
 * @return {?}
 */
function sc_bitLsh(dataAndEvents, deepDataAndEvents) {
    return dataAndEvents << deepDataAndEvents;
}
/**
 * @param {number} dataAndEvents
 * @param {number} deepDataAndEvents
 * @return {?}
 */
function sc_bitRsh(dataAndEvents, deepDataAndEvents) {
    return dataAndEvents >> deepDataAndEvents;
}
/**
 * @param {number} dataAndEvents
 * @param {number} deepDataAndEvents
 * @return {?}
 */
function sc_bitUrsh(dataAndEvents, deepDataAndEvents) {
    return dataAndEvents >>> deepDataAndEvents;
}
/**
 * @param {Array} buf
 * @param {number} off
 * @return {?}
 */
function sc_jsField(buf, off) {
    return buf[off];
}
/**
 * @param {Array} qs
 * @param {number} i
 * @param {?} val
 * @return {?}
 */
function sc_setJsFieldBang(qs, i, val) {
    return qs[i] = val;
}
/**
 * @param {Array} buf
 * @param {number} off
 * @return {undefined}
 */
function sc_deleteJsFieldBang(buf, off) {
    delete buf[off];
}
/**
 * @param {?} scope
 * @param {Function} fn
 * @return {?}
 */
function sc_jsCall(scope, fn) {
    /** @type {Array} */
    var newArgs = new Array;
    /** @type {number} */
    var i = 2;
    for (;i < arguments.length;i++) {
        newArgs[i - 2] = arguments[i];
    }
    return fn.apply(scope, newArgs);
}
/**
 * @param {Array} wrapped
 * @param {number} methodName
 * @return {?}
 */
function sc_jsMethodCall(wrapped, methodName) {
    /** @type {Array} */
    var newArgs = new Array;
    /** @type {number} */
    var i = 2;
    for (;i < arguments.length;i++) {
        newArgs[i - 2] = arguments[i];
    }
    return wrapped[methodName].apply(wrapped, newArgs);
}
/**
 * @param {?} dataAndEvents
 * @return {?}
 */
function sc_jsNew(dataAndEvents) {
    /** @type {string} */
    var source = "new c(";
    source += arguments.length > 1 ? "arguments[1]" : "";
    /** @type {number} */
    var x = 2;
    for (;x < arguments.length;x++) {
        source += ", arguments[" + x + "]";
    }
    source += ")";
    return eval(source);
}
/**
 * @param {number} regex
 * @return {?}
 */
function sc_pregexp(regex) {
    return new RegExp(sc_string2jsstring(regex));
}
/**
 * @param {number} path
 * @param {number} selector
 * @return {?}
 */
function sc_pregexpMatch(path, selector) {
    var rquickExpr = path instanceof RegExp ? path : sc_pregexp(path);
    var codeSegments = rquickExpr.exec(sc_string2jsstring(selector));
    if (codeSegments == null) {
        return false;
    }
    /** @type {null} */
    var recurring = null;
    /** @type {number} */
    var i = codeSegments.length - 1;
    for (;i >= 0;i--) {
        if (codeSegments[i] !== null) {
            recurring = sc_cons(sc_jsstring2string(codeSegments[i]), recurring);
        } else {
            recurring = sc_cons(false, recurring);
        }
    }
    return recurring;
}
/**
 * @param {number} regex
 * @param {number} chunk
 * @param {number} style
 * @return {?}
 */
function sc_pregexpReplace(regex, chunk, style) {
    var rreturn;
    var ret = sc_string2jsstring(chunk);
    var target = sc_string2jsstring(style);
    if (regex instanceof RegExp) {
        if (regex.global) {
            /** @type {number} */
            rreturn = regex;
        } else {
            /** @type {RegExp} */
            rreturn = new RegExp(regex.source);
        }
    } else {
        /** @type {RegExp} */
        rreturn = new RegExp(sc_string2jsstring(regex));
    }
    return ret.replace(rreturn, target);
}
/**
 * @param {number} regex
 * @param {number} text
 * @param {number} existingFn
 * @return {?}
 */
function sc_pregexpReplaceAll(regex, text, existingFn) {
    var reg;
    var code = sc_string2jsstring(text);
    var pos = sc_string2jsstring(existingFn);
    if (regex instanceof RegExp) {
        if (regex.global) {
            /** @type {number} */
            reg = regex;
        } else {
            /** @type {RegExp} */
            reg = new RegExp(regex.source, "g");
        }
    } else {
        /** @type {RegExp} */
        reg = new RegExp(sc_string2jsstring(regex), "g");
    }
    return code.replace(reg, pos);
}
/**
 * @param {number} pattern
 * @param {number} body
 * @return {?}
 */
function sc_pregexpSplit(pattern, body) {
    /** @type {RegExp} */
    var slashSplit = pattern instanceof RegExp ? pattern : new RegExp(sc_string2jsstring(pattern));
    var s = sc_string2jsstring(body);
    var udataCur = s.split(slashSplit);
    if (udataCur == null) {
        return false;
    }
    return sc_vector2list(udataCur);
}
/**
 * @param {number} limit
 * @return {?}
 */
function sc_random(limit) {
    return Math.floor(Math.random() * limit);
}
/**
 * @return {?}
 */
function sc_currentDate() {
    return new Date;
}
/**
 * @return {undefined}
 */
function sc_Hashtable() {
}
/**
 * @return {?}
 */
sc_Hashtable.prototype.toString = function() {
    return "#{%hashtable}";
};
/**
 * @param {string} key
 * @param {string} line
 * @return {undefined}
 */
function sc_HashtableElement(key, line) {
    /** @type {string} */
    this.key = key;
    /** @type {string} */
    this.val = line;
}
/**
 * @return {?}
 */
function sc_makeHashtable() {
    return new sc_Hashtable;
}
/**
 * @param {?} _cache
 * @param {string} context
 * @param {Function} ne
 * @return {undefined}
 */
function sc_hashtablePutBang(_cache, context, ne) {
    var key = sc_hash(context);
    _cache[key] = new sc_HashtableElement(context, ne);
}
/**
 * @param {?} arr2
 * @param {Function} walkers
 * @return {?}
 */
function sc_hashtableGet(arr2, walkers) {
    var i = sc_hash(walkers);
    if (i in arr2) {
        return arr2[i].val;
    } else {
        return false;
    }
}
/**
 * @param {Object} props
 * @param {?} callback
 * @return {undefined}
 */
function sc_hashtableForEach(props, callback) {
    var i;
    for (i in props) {
        if (props[i] instanceof sc_HashtableElement) {
            callback(props[i].key, props[i].val);
        }
    }
}
/**
 * @param {?} dataAndEvents
 * @param {Function} owner
 * @return {?}
 */
function sc_hashtableContains(dataAndEvents, owner) {
    var unlock = sc_hash(owner);
    if (unlock in dataAndEvents) {
        return true;
    } else {
        return false;
    }
}
/** @type {number} */
var SC_HASH_COUNTER = 0;
/**
 * @param {Function} obj
 * @return {?}
 */
function sc_hash(obj) {
    if (obj === null) {
        return "null";
    } else {
        if (obj === undefined) {
            return "undefined";
        } else {
            if (obj === true) {
                return "true";
            } else {
                if (obj === false) {
                    return "false";
                } else {
                    if (typeof obj === "number") {
                        return "num-" + obj;
                    } else {
                        if (typeof obj === "string") {
                            return "jsstr-" + obj;
                        } else {
                            if (obj.sc_getHash) {
                                return obj.sc_getHash();
                            } else {
                                return sc_counterHash.call(obj);
                            }
                        }
                    }
                }
            }
        }
    }
}
/**
 * @return {?}
 */
function sc_counterHash() {
    if (!this.sc_hash) {
        this.sc_hash = "hash-" + SC_HASH_COUNTER;
        SC_HASH_COUNTER++;
    }
    return this.sc_hash;
}
/**
 * @param {Array} args
 * @param {(boolean|number)} dataAndEvents
 * @return {undefined}
 */
function sc_Trampoline(args, dataAndEvents) {
    /** @type {boolean} */
    this["__trampoline return__"] = true;
    /** @type {Array} */
    this.args = args;
    /** @type {(boolean|number)} */
    this.MAX_TAIL_CALLs = dataAndEvents;
}
/**
 * @return {?}
 */
sc_Trampoline.prototype.restart = function() {
    var e = this;
    for (;true;) {
        /** @type {number} */
        SC_TAIL_OBJECT.calls = e.MAX_TAIL_CALLs - 1;
        var method = e.args.callee;
        var d = method.apply(SC_TAIL_OBJECT, e.args);
        if (d instanceof sc_Trampoline) {
            e = d;
        } else {
            return d;
        }
    }
};
/**
 * @param {?} callback
 * @return {?}
 */
function sc_bindExitLambda(callback) {
    var server = new sc_BindExitException;
    /**
     * @param {string} data
     * @return {undefined}
     */
    var send = function(data) {
        /** @type {string} */
        server.res = data;
        throw server;
    };
    try {
        return callback(send);
    } catch (seqValues) {
        if (seqValues === server) {
            return seqValues.res;
        }
        throw seqValues;
    }
}
/**
 * @return {undefined}
 */
function sc_BindExitException() {
    /** @type {boolean} */
    this._internalException = true;
}
/** @type {Object} */
var SC_SCM2JS_GLOBALS = new Object;
/** @type {Object} */
var SC_TAIL_OBJECT = new Object;
/** @type {Object} */
SC_SCM2JS_GLOBALS.TAIL_OBJECT = SC_TAIL_OBJECT;
/**
 * @return {undefined}
 */
function sc_EOF() {
}
var SC_EOF_OBJECT = new sc_EOF;
/**
 * @return {undefined}
 */
function sc_Port() {
}
/**
 * @return {undefined}
 */
function sc_InputPort() {
}
sc_InputPort.prototype = new sc_Port;
/**
 * @return {?}
 */
sc_InputPort.prototype.peekChar = function() {
    if (!("peeked" in this)) {
        this.peeked = this.getNextChar();
    }
    return this.peeked;
};
/**
 * @return {?}
 */
sc_InputPort.prototype.readChar = function() {
    var ch = this.peekChar();
    delete this.peeked;
    return ch;
};
/**
 * @return {?}
 */
sc_InputPort.prototype.isCharReady = function() {
    return true;
};
/**
 * @return {undefined}
 */
sc_InputPort.prototype.close = function() {
};
/**
 * @return {undefined}
 */
function sc_ErrorInputPort() {
}
sc_ErrorInputPort.prototype = new sc_InputPort;
/**
 * @return {?}
 */
sc_ErrorInputPort.prototype.getNextChar = function() {
    throw "can't read from error-port.";
};
/**
 * @return {?}
 */
sc_ErrorInputPort.prototype.isCharReady = function() {
    return false;
};
/**
 * @param {?} str
 * @return {undefined}
 */
function sc_StringInputPort(str) {
    /** @type {String} */
    this.str = new String(str);
    /** @type {number} */
    this.pos = 0;
}
sc_StringInputPort.prototype = new sc_InputPort;
/**
 * @return {?}
 */
sc_StringInputPort.prototype.getNextChar = function() {
    if (this.pos >= this.str.length) {
        return SC_EOF_OBJECT;
    }
    return this.str.charAt(this.pos++);
};
/**
 * @param {string} eventType
 * @param {string} line
 * @param {number} i
 * @return {undefined}
 */
function sc_Token(eventType, line, i) {
    /** @type {string} */
    this.type = eventType;
    /** @type {string} */
    this.val = line;
    /** @type {number} */
    this.pos = i;
}
/** @type {number} */
sc_Token.EOF = 0;
/** @type {number} */
sc_Token.OPEN_PAR = 1;
/** @type {number} */
sc_Token.CLOSE_PAR = 2;
/** @type {number} */
sc_Token.OPEN_BRACE = 3;
/** @type {number} */
sc_Token.CLOSE_BRACE = 4;
/** @type {number} */
sc_Token.OPEN_BRACKET = 5;
/** @type {number} */
sc_Token.CLOSE_BRACKET = 6;
/** @type {number} */
sc_Token.WHITESPACE = 7;
/** @type {number} */
sc_Token.QUOTE = 8;
/** @type {number} */
sc_Token.ID = 9;
/** @type {number} */
sc_Token.DOT = 10;
/** @type {number} */
sc_Token.STRING = 11;
/** @type {number} */
sc_Token.NUMBER = 12;
/** @type {number} */
sc_Token.ERROR = 13;
/** @type {number} */
sc_Token.VECTOR_BEGIN = 14;
/** @type {number} */
sc_Token.TRUE = 15;
/** @type {number} */
sc_Token.FALSE = 16;
/** @type {number} */
sc_Token.UNSPECIFIED = 17;
/** @type {number} */
sc_Token.REFERENCE = 18;
/** @type {number} */
sc_Token.STORE = 19;
/** @type {number} */
sc_Token.CHAR = 20;
/** @type {string} */
var SC_ID_CLASS = SC_LOWER_CLASS + SC_UPPER_CLASS + "!$%*+-./:<=>?@^_~";
/**
 * @param {number} port
 * @return {undefined}
 */
function sc_Tokenizer(port) {
    /** @type {number} */
    this.port = port;
}
/**
 * @return {?}
 */
sc_Tokenizer.prototype.peekToken = function() {
    if (this.peeked) {
        return this.peeked;
    }
    var tok = this.nextToken();
    this.peeked = tok;
    return tok;
};
/**
 * @return {?}
 */
sc_Tokenizer.prototype.readToken = function() {
    var tok = this.peekToken();
    delete this.peeked;
    return tok;
};
/**
 * @return {?}
 */
sc_Tokenizer.prototype.nextToken = function() {
    /**
     * @param {string} str
     * @return {?}
     */
    function isNumeric(str) {
        return str >= "0" && str <= "9";
    }
    /**
     * @param {string} responder
     * @return {?}
     */
    function register(responder) {
        return SC_ID_CLASS.indexOf(responder) != -1 || responder >= "0" && responder <= "9";
    }
    /**
     * @param {string} string
     * @return {?}
     */
    function match(string) {
        return string === " " || (string === "\r" || (string === "\n" || (string === "\t" || string === "\f")));
    }
    /**
     * @param {string} n
     * @return {?}
     */
    function test(n) {
        return match(n) || n === SC_EOF_OBJECT;
    }
    /**
     * @return {?}
     */
    function readString() {
        /** @type {string} */
        res = "";
        for (;true;) {
            var character = port.readChar();
            switch(character) {
                case '"':
                    return new sc_Token(11, res);
                case "\\":
                    var c = port.readChar();
                    switch(c) {
                        case "0":
                            res += "\x00";
                            break;
                        case "a":
                            res += "a";
                            break;
                        case "b":
                            res += "\b";
                            break;
                        case "f":
                            res += "\f";
                            break;
                        case "n":
                            res += "\n";
                            break;
                        case "r":
                            res += "\r";
                            break;
                        case "t":
                            res += "\t";
                            break;
                        case "v":
                            res += "\v";
                            break;
                        case '"':
                            res += '"';
                            break;
                        case "\\":
                            res += "\\";
                            break;
                        case "x":
                            /** @type {number} */
                            var lo = 0;
                            for (;true;) {
                                var ch = port.peekChar();
                                if (ch >= "0" && ch <= "9") {
                                    port.readChar();
                                    /** @type {number} */
                                    lo = lo * 16 + ch.charCodeAt(0) - "0".charCodeAt(0);
                                } else {
                                    if (ch >= "a" && ch <= "f") {
                                        port.readChar();
                                        /** @type {number} */
                                        lo = lo * 16 + ch.charCodeAt(0) - "a".charCodeAt(0);
                                    } else {
                                        if (ch >= "A" && ch <= "F") {
                                            port.readChar();
                                            /** @type {number} */
                                            lo = lo * 16 + ch.charCodeAt(0) - "A".charCodeAt(0);
                                        } else {
                                            res += String.fromCharCode(lo);
                                            break;
                                        }
                                    }
                                }
                            }
                            break;
                        default:
                            if (c === SC_EOF_OBJECT) {
                                return new sc_Token(13, "unclosed string-literal" + res);
                            }
                            res += c;
                    }
                    break;
                default:
                    if (character === SC_EOF_OBJECT) {
                        return new sc_Token(13, "unclosed string-literal" + res);
                    }
                    res += character;
            }
        }
    }
    /**
     * @param {string} num
     * @return {?}
     */
    function isInt(num) {
        /** @type {string} */
        var chr2 = num;
        for (;register(port.peekChar());) {
            chr2 += port.readChar();
        }
        if (isNaN(chr2)) {
            return new sc_Token(9, chr2);
        } else {
            return new sc_Token(12, chr2 - 0);
        }
    }
    /**
     * @return {undefined}
     */
    function readOperator() {
        /** @type {boolean} */
        var done = false;
        for (;!done;) {
            /** @type {boolean} */
            done = true;
            for (;match(port.peekChar());) {
                port.readChar();
            }
            if (port.peekChar() === ";") {
                port.readChar();
                /** @type {boolean} */
                done = false;
                for (;true;) {
                    la = port.readChar();
                    if (la === SC_EOF_OBJECT || la === "\n") {
                        break;
                    }
                }
            }
        }
    }
    /**
     * @return {?}
     */
    function readWord() {
        if (match(port.peekChar())) {
            return new sc_Token(10);
        } else {
            return isInt(".");
        }
    }
    /**
     * @return {?}
     */
    function word() {
        var ch = port.readChar();
        if (match(ch)) {
            return new sc_Token(13, "bad #-pattern0.");
        }
        if (isNumeric(ch)) {
            /** @type {number} */
            var tagCh = ch - 0;
            for (;isNumeric(port.peekChar());) {
                /** @type {number} */
                tagCh = tagCh * 10 + (port.readChar() - 0);
            }
            switch(port.readChar()) {
                case "#":
                    return new sc_Token(18, tagCh);
                case "=":
                    return new sc_Token(19, tagCh);
                default:
                    return new sc_Token(13, "bad #-pattern1." + tagCh);
            }
        }
        if (ch === "(") {
            return new sc_Token(14);
        }
        if (ch === "\\") {
            /** @type {string} */
            var keyWord = "";
            for (;!test(port.peekChar());) {
                keyWord += port.readChar();
            }
            switch(keyWord.length) {
                case 0:
                    if (sc_isEOFObject(port.peekChar)) {
                        return new sc_Token(13, "bad #-pattern2.");
                    } else {
                        return new sc_Token(20, port.readChar());
                    }
                    ;
                case 1:
                    return new sc_Token(20, keyWord);
                default:
                    var entry = sc_Char.readable2char[keyWord.toLowerCase()];
                    if (entry) {
                        return new sc_Token(20, entry);
                    } else {
                        return new sc_Token(13, "unknown character description: #\\" + keyWord);
                    }
                    ;
            }
        }
        var result;
        var filter;
        switch(ch) {
            case "t":
                result = new sc_Token(15, true);
                /** @type {string} */
                filter = "";
                break;
            case "f":
                result = new sc_Token(16, false);
                /** @type {string} */
                filter = "";
                break;
            case "u":
                result = new sc_Token(17, undefined);
                /** @type {string} */
                filter = "nspecified";
                break;
            default:
                return new sc_Token(13, "bad #-pattern3: " + ch);
        }
        for (;true;) {
            ch = port.peekChar();
            if ((test(ch) || ch === ")") && filter == "") {
                return result;
            } else {
                if (match(ch) || filter == "") {
                    return new sc_Token(13, "bad #-pattern4 " + ch + " " + filter);
                } else {
                    if (filter.charAt(0) == ch) {
                        port.readChar();
                        /** @type {string} */
                        filter = filter.slice(1);
                    } else {
                        return new sc_Token(13, "bad #-pattern5");
                    }
                }
            }
        }
    }
    var port = this.port;
    readOperator();
    var la = port.readChar();
    if (la === SC_EOF_OBJECT) {
        return new sc_Token(0, la);
    }
    switch(la) {
        case " ":
            ;
        case "\n":
            ;
        case "\t":
            return readWhitespace();
        case "(":
            return new sc_Token(1);
        case ")":
            return new sc_Token(2);
        case "{":
            return new sc_Token(3);
        case "}":
            return new sc_Token(4);
        case "[":
            return new sc_Token(5);
        case "]":
            return new sc_Token(6);
        case "'":
            return new sc_Token(8);
        case "#":
            return word();
        case ".":
            return readWord();
        case '"':
            return readString();
        default:
            if (register(la)) {
                return isInt(la);
            }
            throw "unexpected character: " + la;;
    }
};
/**
 * @param {?} tokenizer
 * @return {undefined}
 */
function sc_Reader(tokenizer) {
    this.tokenizer = tokenizer;
    /** @type {Array} */
    this.backref = new Array;
}
/**
 * @return {?}
 */
sc_Reader.prototype.read = function() {
    /**
     * @param {number} err
     * @return {?}
     */
    function read(err) {
        /**
         * @param {number} err
         * @param {number} value
         * @return {?}
         */
        function callback(err, value) {
            return err === 1 && value === 2 || (err === 3 && value === 4 || err === 5 && value === 6);
        }
        /** @type {null} */
        var recurring = null;
        for (;true;) {
            var object = parser.peekToken();
            switch(object.type) {
                case 2:
                    ;
                case 4:
                    ;
                case 6:
                    if (callback(err, object.type)) {
                        parser.readToken();
                        return sc_reverseBang(recurring);
                    } else {
                        throw "closing par doesn't match: " + err + " " + listEndType;
                    }
                    ;
                case 0:
                    throw "unexpected end of file";;
                case 10:
                    parser.readToken();
                    var compressed = this.read();
                    var msg = parser.readToken();
                    if (!callback(err, msg.type)) {
                        throw "closing par doesn't match: " + err + " " + msg.type;
                    } else {
                        return sc_reverseAppendBang(recurring, compressed);
                    }
                    ;
                default:
                    recurring = sc_cons(this.read(), recurring);
            }
        }
    }
    /**
     * @return {?}
     */
    function callback() {
        return sc_cons("quote", sc_cons(this.read(), null));
    }
    /**
     * @return {?}
     */
    function write() {
        /** @type {Array} */
        var rtn = new Array;
        for (;true;) {
            var startEvent = parser.peekToken();
            switch(startEvent.type) {
                case 2:
                    parser.readToken();
                    return rtn;
                default:
                    rtn.push(this.read());
            }
        }
    }
    /**
     * @param {?} name
     * @return {?}
     */
    function get(name) {
        var buf = this.read();
        this.backref[name] = buf;
        return buf;
    }
    /**
     * @param {string} type
     * @return {?}
     */
    function block(type) {
        if (type in this.backref) {
            return this.backref[type];
        } else {
            throw "bad reference: " + type;
        }
    }
    var parser = this.tokenizer;
    var context = parser.readToken();
    if (context.type === 13) {
        throw context.val;
    }
    switch(context.type) {
        case 1:
            ;
        case 3:
            ;
        case 5:
            return read.call(this, context.type);
        case 8:
            return callback.call(this);
        case 11:
            return sc_jsstring2string(context.val);
        case 20:
            return new sc_Char(context.val);
        case 14:
            return write.call(this);
        case 18:
            return block.call(this, context.val);
        case 19:
            return get.call(this, context.val);
        case 9:
            return sc_jsstring2symbol(context.val);
        case 0:
            ;
        case 12:
            ;
        case 15:
            ;
        case 16:
            ;
        case 17:
            return context.val;
        default:
            throw "unexpected token " + context.type + " " + context.val;;
    }
};
/**
 * @param {(Function|string)} clobber
 * @return {?}
 */
function sc_read(clobber) {
    if (clobber === undefined) {
        clobber = SC_DEFAULT_IN;
    }
    var x = new sc_Reader(new sc_Tokenizer(clobber));
    return x.read();
}
/**
 * @param {(Function|string)} clobber
 * @return {?}
 */
function sc_readChar(clobber) {
    if (clobber === undefined) {
        clobber = SC_DEFAULT_IN;
    }
    var d = clobber.readChar();
    return d === SC_EOF_OBJECT ? d : new sc_Char(d);
}
/**
 * @param {(Object|string)} clobber
 * @return {?}
 */
function sc_peekChar(clobber) {
    if (clobber === undefined) {
        clobber = SC_DEFAULT_IN;
    }
    var d = clobber.peekChar();
    return d === SC_EOF_OBJECT ? d : new sc_Char(d);
}
/**
 * @param {Object} clobber
 * @return {?}
 */
function sc_isCharReady(clobber) {
    if (clobber === undefined) {
        clobber = SC_DEFAULT_IN;
    }
    return clobber.isCharReady();
}
/**
 * @param {Object} gridStore
 * @return {?}
 */
function sc_closeInputPort(gridStore) {
    return gridStore.close();
}
/**
 * @param {?} dataAndEvents
 * @return {?}
 */
function sc_isInputPort(dataAndEvents) {
    return dataAndEvents instanceof sc_InputPort;
}
/**
 * @param {?} dataAndEvents
 * @return {?}
 */
function sc_isEOFObject(dataAndEvents) {
    return dataAndEvents === SC_EOF_OBJECT;
}
/**
 * @return {?}
 */
function sc_currentInputPort() {
    return SC_DEFAULT_IN;
}
/**
 * @param {string} dataAndEvents
 * @param {?} deepDataAndEvents
 * @return {?}
 */
function sc_callWithInputFile(dataAndEvents, deepDataAndEvents) {
    throw "can't open " + dataAndEvents;
}
/**
 * @param {string} dataAndEvents
 * @param {?} deepDataAndEvents
 * @return {?}
 */
function sc_callWithOutputFile(dataAndEvents, deepDataAndEvents) {
    throw "can't open " + dataAndEvents;
}
/**
 * @param {string} dataAndEvents
 * @param {?} deepDataAndEvents
 * @return {?}
 */
function sc_withInputFromFile(dataAndEvents, deepDataAndEvents) {
    throw "can't open " + dataAndEvents;
}
/**
 * @param {string} dataAndEvents
 * @param {?} deepDataAndEvents
 * @return {?}
 */
function sc_withOutputToFile(dataAndEvents, deepDataAndEvents) {
    throw "can't open " + dataAndEvents;
}
/**
 * @param {string} dataAndEvents
 * @return {?}
 */
function sc_openInputFile(dataAndEvents) {
    throw "can't open " + dataAndEvents;
}
/**
 * @param {string} dataAndEvents
 * @return {?}
 */
function sc_openOutputFile(dataAndEvents) {
    throw "can't open " + dataAndEvents;
}
/**
 * @param {string} moduleNamePlusExt
 * @return {?}
 */
function sc_basename(moduleNamePlusExt) {
    var hashIndex = moduleNamePlusExt.lastIndexOf("/");
    if (hashIndex >= 0) {
        return moduleNamePlusExt.substring(hashIndex + 1, moduleNamePlusExt.length);
    } else {
        return "";
    }
}
/**
 * @param {string} meta
 * @return {?}
 */
function sc_dirname(meta) {
    var rootSlash = meta.lastIndexOf("/");
    if (rootSlash >= 0) {
        return meta.substring(0, rootSlash);
    } else {
        return "";
    }
}
/**
 * @param {string} dataAndEvents
 * @param {?} until
 * @return {?}
 */
function sc_withInputFromPort(dataAndEvents, until) {
    try {
        var tmp = SC_DEFAULT_IN;
        /** @type {string} */
        SC_DEFAULT_IN = dataAndEvents;
        return until();
    } finally {
        SC_DEFAULT_IN = tmp;
    }
}
/**
 * @param {number} classNames
 * @param {?} until
 * @return {?}
 */
function sc_withInputFromString(classNames, until) {
    return sc_withInputFromPort(new sc_StringInputPort(sc_string2jsstring(classNames)), until);
}
/**
 * @param {string} keepData
 * @param {?} deepDataAndEvents
 * @return {?}
 */
function sc_withOutputToPort(keepData, deepDataAndEvents) {
    try {
        var tmp = SC_DEFAULT_OUT;
        /** @type {string} */
        SC_DEFAULT_OUT = keepData;
        return deepDataAndEvents();
    } finally {
        SC_DEFAULT_OUT = tmp;
    }
}
/**
 * @param {?} deepDataAndEvents
 * @return {?}
 */
function sc_withOutputToString(deepDataAndEvents) {
    var events = new sc_StringOutputPort;
    sc_withOutputToPort(events, deepDataAndEvents);
    return events.close();
}
/**
 * @param {?} forOwn
 * @param {?} deepDataAndEvents
 * @return {?}
 */
function sc_withOutputToProcedure(forOwn, deepDataAndEvents) {
    /**
     * @param {?} deepDataAndEvents
     * @return {undefined}
     */
    var clone = function(deepDataAndEvents) {
        forOwn(sc_jsstring2string(deepDataAndEvents));
    };
    return sc_withOutputToPort(new sc_GenericOutputPort(clone), deepDataAndEvents);
}
/**
 * @return {?}
 */
function sc_openOutputString() {
    return new sc_StringOutputPort;
}
/**
 * @param {number} classNames
 * @return {?}
 */
function sc_openInputString(classNames) {
    return new sc_StringInputPort(sc_string2jsstring(classNames));
}
/**
 * @return {undefined}
 */
function sc_OutputPort() {
}
sc_OutputPort.prototype = new sc_Port;
/**
 * @param {string} dataAndEvents
 * @return {undefined}
 */
sc_OutputPort.prototype.appendJSString = function(dataAndEvents) {
};
/**
 * @return {undefined}
 */
sc_OutputPort.prototype.close = function() {
};
/**
 * @return {undefined}
 */
function sc_StringOutputPort() {
    /** @type {string} */
    this.res = "";
}
sc_StringOutputPort.prototype = new sc_OutputPort;
/**
 * @param {string} dataAndEvents
 * @return {undefined}
 */
sc_StringOutputPort.prototype.appendJSString = function(dataAndEvents) {
    this.res += dataAndEvents;
};
/**
 * @return {?}
 */
sc_StringOutputPort.prototype.close = function() {
    return sc_jsstring2string(this.res);
};
/**
 * @param {Object} seqValues
 * @return {?}
 */
function sc_getOutputString(seqValues) {
    return sc_jsstring2string(seqValues.res);
}
/**
 * @return {undefined}
 */
function sc_ErrorOutputPort() {
}
sc_ErrorOutputPort.prototype = new sc_OutputPort;
/**
 * @param {string} dataAndEvents
 * @return {?}
 */
sc_ErrorOutputPort.prototype.appendJSString = function(dataAndEvents) {
    throw "don't write on ErrorPort!";
};
/**
 * @return {undefined}
 */
sc_ErrorOutputPort.prototype.close = function() {
};
/**
 * @param {(RegExp|string)} dataAndEvents
 * @param {Function} close
 * @return {undefined}
 */
function sc_GenericOutputPort(dataAndEvents, close) {
    /** @type {(RegExp|string)} */
    this.appendJSString = dataAndEvents;
    if (close) {
        /** @type {Function} */
        this.close = close;
    }
}
sc_GenericOutputPort.prototype = new sc_OutputPort;
/**
 * @param {?} dataAndEvents
 * @return {?}
 */
function sc_isOutputPort(dataAndEvents) {
    return dataAndEvents instanceof sc_OutputPort;
}
/**
 * @param {Object} gridStore
 * @return {?}
 */
function sc_closeOutputPort(gridStore) {
    return gridStore.close();
}
/**
 * @param {?} walkers
 * @param {Object} host
 * @return {undefined}
 */
function sc_write(walkers, host) {
    if (host === undefined) {
        host = SC_DEFAULT_OUT;
    }
    host.appendJSString(sc_toWriteString(walkers));
}
/**
 * @param {Function} obj
 * @return {?}
 */
function sc_toWriteString(obj) {
    if (obj === null) {
        return "()";
    } else {
        if (obj === true) {
            return "#t";
        } else {
            if (obj === false) {
                return "#f";
            } else {
                if (obj === undefined) {
                    return "#unspecified";
                } else {
                    if (typeof obj === "function") {
                        return "#<procedure " + sc_hash(obj) + ">";
                    } else {
                        if (obj.sc_toWriteString) {
                            return obj.sc_toWriteString();
                        } else {
                            return obj.toString();
                        }
                    }
                }
            }
        }
    }
}
/**
 * @param {string} template
 * @return {?}
 */
function sc_escapeWriteString(template) {
    /** @type {string} */
    var str = "";
    /** @type {number} */
    var b = 0;
    /** @type {number} */
    i = 0;
    for (;i < template.length;i++) {
        switch(template.charAt(i)) {
            case "\x00":
                str += template.substring(b, i) + "\\0";
                /** @type {number} */
                b = i + 1;
                break;
            case "\b":
                str += template.substring(b, i) + "\\b";
                /** @type {number} */
                b = i + 1;
                break;
            case "\f":
                str += template.substring(b, i) + "\\f";
                /** @type {number} */
                b = i + 1;
                break;
            case "\n":
                str += template.substring(b, i) + "\\n";
                /** @type {number} */
                b = i + 1;
                break;
            case "\r":
                str += template.substring(b, i) + "\\r";
                /** @type {number} */
                b = i + 1;
                break;
            case "\t":
                str += template.substring(b, i) + "\\t";
                /** @type {number} */
                b = i + 1;
                break;
            case "\v":
                str += template.substring(b, i) + "\\v";
                /** @type {number} */
                b = i + 1;
                break;
            case '"':
                str += template.substring(b, i) + '\\"';
                /** @type {number} */
                b = i + 1;
                break;
            case "\\":
                str += template.substring(b, i) + "\\\\";
                /** @type {number} */
                b = i + 1;
                break;
            default:
                var c = template.charAt(i);
                if ("a" !== "a" && c == "a") {
                    str += template.substring(b, i) + "\\a";
                    /** @type {number} */
                    b = i + 1;
                    continue;
                }
                if ("\v" !== "v" && c == "\v") {
                    str += template.substring(b, i) + "\\v";
                    /** @type {number} */
                    b = i + 1;
                    continue;
                }
                if (template.charAt(i) < " ") {
                    str += template.substring(b, i) + "\\x" + template.charCodeAt(i).toString(16);
                    /** @type {number} */
                    b = i + 1;
                }
                ;
        }
    }
    str += template.substring(b, i);
    return str;
}
/**
 * @param {?} obj
 * @param {(Object|string)} container
 * @return {undefined}
 */
function sc_display(obj, container) {
    if (container === undefined) {
        container = SC_DEFAULT_OUT;
    }
    container.appendJSString(sc_toDisplayString(obj));
}
/**
 * @param {Function} obj
 * @return {?}
 */
function sc_toDisplayString(obj) {
    if (obj === null) {
        return "()";
    } else {
        if (obj === true) {
            return "#t";
        } else {
            if (obj === false) {
                return "#f";
            } else {
                if (obj === undefined) {
                    return "#unspecified";
                } else {
                    if (typeof obj === "function") {
                        return "#<procedure " + sc_hash(obj) + ">";
                    } else {
                        if (obj.sc_toDisplayString) {
                            return obj.sc_toDisplayString();
                        } else {
                            return obj.toString();
                        }
                    }
                }
            }
        }
    }
}
/**
 * @param {(Function|string)} clobber
 * @return {undefined}
 */
function sc_newline(clobber) {
    if (clobber === undefined) {
        clobber = SC_DEFAULT_OUT;
    }
    clobber.appendJSString("\n");
}
/**
 * @param {Text} change
 * @param {(Object|string)} t
 * @return {undefined}
 */
function sc_writeChar(change, t) {
    if (t === undefined) {
        t = SC_DEFAULT_OUT;
    }
    t.appendJSString(change.val);
}
/**
 * @param {?} deepDataAndEvents
 * @param {Object} clobber
 * @return {undefined}
 */
function sc_writeCircle(deepDataAndEvents, clobber) {
    if (clobber === undefined) {
        clobber = SC_DEFAULT_OUT;
    }
    clobber.appendJSString(sc_toWriteCircleString(deepDataAndEvents));
}
/**
 * @param {?} deepDataAndEvents
 * @return {?}
 */
function sc_toWriteCircleString(deepDataAndEvents) {
    var rvar = sc_gensym("writeCircle");
    /** @type {Object} */
    var a = new Object;
    /** @type {number} */
    a.nb = 0;
    sc_prepWriteCircle(deepDataAndEvents, rvar, a);
    return sc_genToWriteCircleString(deepDataAndEvents, rvar);
}
/**
 * @param {Object} list
 * @param {string} name
 * @param {boolean} v02
 * @return {undefined}
 */
function sc_prepWriteCircle(list, name, v02) {
    if (list instanceof sc_Pair || list instanceof sc_Vector) {
        if (list[name] !== undefined) {
            list[name]++;
            if (!list[name + "nb"]) {
                /** @type {number} */
                list[name + "nb"] = v02.nb++;
            }
            return;
        }
        /** @type {number} */
        list[name] = 0;
        if (list instanceof sc_Pair) {
            sc_prepWriteCircle(list.car, name, v02);
            sc_prepWriteCircle(list.cdr, name, v02);
        } else {
            /** @type {number} */
            var p = 0;
            for (;p < list.length;p++) {
                sc_prepWriteCircle(list[p], name, v02);
            }
        }
    }
}
/**
 * @param {?} prop
 * @param {string} name
 * @return {?}
 */
function sc_genToWriteCircleString(prop, name) {
    if (!(prop instanceof sc_Pair || prop instanceof sc_Vector)) {
        return sc_toWriteString(prop);
    }
    return prop.sc_toWriteCircleString(name);
}
/**
 * @param {string} label
 * @param {boolean} dataAndEvents
 * @return {?}
 */
sc_Pair.prototype.sc_toWriteCircleString = function(label, dataAndEvents) {
    if (this[label + "use"]) {
        var regex = this[label + "nb"];
        if (this[label]-- === 0) {
            delete this[label];
            delete this[label + "nb"];
            delete this[label + "use"];
        }
        if (dataAndEvents) {
            return ". #" + regex + "#";
        } else {
            return "#" + regex + "#";
        }
    }
    if (this[label]-- === 0) {
        delete this[label];
        delete this[label + "nb"];
        delete this[label + "use"];
    }
    /** @type {string} */
    var s = "";
    if (this[label] !== undefined) {
        /** @type {boolean} */
        this[label + "use"] = true;
        if (dataAndEvents) {
            s += ". #" + this[label + "nb"] + "=";
        } else {
            s += "#" + this[label + "nb"] + "=";
        }
        /** @type {boolean} */
        dataAndEvents = false;
    }
    if (!dataAndEvents) {
        s += "(";
    }
    s += sc_genToWriteCircleString(this.car, label);
    if (sc_isPair(this.cdr)) {
        s += " " + this.cdr.sc_toWriteCircleString(label, true);
    } else {
        if (this.cdr !== null) {
            s += " . " + sc_genToWriteCircleString(this.cdr, label);
        }
    }
    if (!dataAndEvents) {
        s += ")";
    }
    return s;
};
/**
 * @param {string} label
 * @return {?}
 */
sc_Vector.prototype.sc_toWriteCircleString = function(label) {
    if (this[label + "use"]) {
        var regex = this[label + "nb"];
        if (this[label]-- === 0) {
            delete this[label];
            delete this[label + "nb"];
            delete this[label + "use"];
        }
        return "#" + regex + "#";
    }
    if (this[label]-- === 0) {
        delete this[label];
        delete this[label + "nb"];
        delete this[label + "use"];
    }
    /** @type {string} */
    var s = "";
    if (this[label] !== undefined) {
        /** @type {boolean} */
        this[label + "use"] = true;
        s += "#" + this[label + "nb"] + "=";
    }
    s += "#(";
    /** @type {number} */
    var i = 0;
    for (;i < this.length;i++) {
        s += sc_genToWriteCircleString(this[i], label);
        if (i < this.length - 1) {
            s += " ";
        }
    }
    s += ")";
    return s;
};
/**
 * @param {?} walkers
 * @return {undefined}
 */
function sc_print(walkers) {
    if (arguments.length === 1) {
        sc_display(walkers);
        sc_newline();
    } else {
        /** @type {number} */
        var i = 0;
        for (;i < arguments.length;i++) {
            sc_display(arguments[i]);
        }
        sc_newline();
    }
}
/**
 * @param {string} value
 * @param {?} dataAndEvents
 * @return {?}
 */
function sc_format(value, dataAndEvents) {
    var length = value.length;
    var that = new sc_StringOutputPort;
    /** @type {number} */
    var index = 0;
    /** @type {number} */
    var i = 1;
    for (;index < length;) {
        var idx = value.indexOf("~", index);
        if (idx == -1) {
            that.appendJSString(value.substring(index, length));
            return that.close();
        } else {
            if (idx > index) {
                if (idx == length - 1) {
                    that.appendJSString(value.substring(index, length));
                    return that.close();
                } else {
                    that.appendJSString(value.substring(index, idx));
                    index = idx;
                }
            }
            switch(value.charCodeAt(idx + 1)) {
                case 65:
                    ;
                case 97:
                    sc_display(arguments[i], that);
                    index += 2;
                    i++;
                    break;
                case 83:
                    ;
                case 115:
                    sc_write(arguments[i], that);
                    index += 2;
                    i++;
                    break;
                case 86:
                    ;
                case 118:
                    sc_display(arguments[i], that);
                    that.appendJSString("\n");
                    index += 2;
                    i++;
                    break;
                case 67:
                    ;
                case 99:
                    that.appendJSString(String.fromCharCode(arguments[i]));
                    index += 2;
                    i++;
                    break;
                case 88:
                    ;
                case 120:
                    that.appendJSString(arguments[i].toString(6));
                    index += 2;
                    i++;
                    break;
                case 79:
                    ;
                case 111:
                    that.appendJSString(arguments[i].toString(8));
                    index += 2;
                    i++;
                    break;
                case 66:
                    ;
                case 98:
                    that.appendJSString(arguments[i].toString(2));
                    index += 2;
                    i++;
                    break;
                case 37:
                    ;
                case 110:
                    that.appendJSString("\n");
                    index += 2;
                    break;
                case 114:
                    that.appendJSString("\r");
                    index += 2;
                    break;
                case 126:
                    that.appendJSString("~");
                    index += 2;
                    break;
                default:
                    sc_error("format: illegal ~" + String.fromCharCode(value.charCodeAt(idx + 1)) + " sequence");
                    return "";
            }
        }
    }
    return that.close();
}
var SC_DEFAULT_IN = new sc_ErrorInputPort;
var SC_DEFAULT_OUT = new sc_ErrorOutputPort;
var SC_ERROR_OUT = new sc_ErrorOutputPort;
/** @type {string} */
var sc_SYMBOL_PREFIX = "\u1e9c";
/** @type {string} */
var sc_KEYWORD_PREFIX = "\u1e9d";
/**
 * @param {?} deepDataAndEvents
 * @return {?}
 */
function sc_jsstring2string(deepDataAndEvents) {
    return deepDataAndEvents;
}
/**
 * @param {string} dataAndEvents
 * @return {?}
 */
function sc_jsstring2symbol(dataAndEvents) {
    return sc_SYMBOL_PREFIX + dataAndEvents;
}
/**
 * @param {number} elem
 * @return {?}
 */
function sc_string2jsstring(elem) {
    return elem;
}
/**
 * @param {Object} models
 * @return {?}
 */
function sc_symbol2jsstring(models) {
    return models.slice(1);
}
/**
 * @param {Object} models
 * @return {?}
 */
function sc_keyword2jsstring(models) {
    return models.slice(1);
}
/**
 * @param {?} dataAndEvents
 * @return {?}
 */
function sc_jsstring2keyword(dataAndEvents) {
    return sc_KEYWORD_PREFIX + dataAndEvents;
}
/**
 * @param {string} child
 * @return {?}
 */
function sc_isKeyword(child) {
    return typeof child === "string" && child.charAt(0) === sc_KEYWORD_PREFIX;
}
var sc_gensym = function() {
    /** @type {number} */
    var name = 1E3;
    return function(ns) {
        name++;
        if (!ns) {
            ns = sc_SYMBOL_PREFIX;
        }
        return ns + "s" + name + "~" + "^sC-GeNsYm ";
    };
}();
/**
 * @param {?} deepDataAndEvents
 * @param {?} dataAndEvents
 * @return {?}
 */
function sc_isEqual(deepDataAndEvents, dataAndEvents) {
    return deepDataAndEvents === dataAndEvents || (sc_isPair(deepDataAndEvents) && (sc_isPair(dataAndEvents) && sc_isPairEqual(deepDataAndEvents, dataAndEvents, sc_isEqual)) || sc_isVector(deepDataAndEvents) && (sc_isVector(dataAndEvents) && sc_isVectorEqual(deepDataAndEvents, dataAndEvents, sc_isEqual)));
}
/**
 * @param {?} cx
 * @param {?} deepDataAndEvents
 * @return {?}
 */
function sc_number2symbol(cx, deepDataAndEvents) {
    return sc_SYMBOL_PREFIX + sc_number2jsstring(cx, deepDataAndEvents);
}
/** @type {function (?, ?): ?} */
var sc_number2string = sc_number2jsstring;
/**
 * @param {Object} models
 * @param {number} dataName
 * @return {?}
 */
function sc_symbol2number(models, dataName) {
    return sc_jsstring2number(models.slice(1), dataName);
}
/** @type {function (string, number): ?} */
var sc_string2number = sc_jsstring2number;
/**
 * @param {?} m1
 * @param {?} radix
 * @return {?}
 */
function sc_string2integer(m1, radix) {
    if (!radix) {
        return+m1;
    }
    return parseInt(m1, radix);
}
/**
 * @param {?} dataAndEvents
 * @return {?}
 */
function sc_string2real(dataAndEvents) {
    return+dataAndEvents;
}
/**
 * @param {string} child
 * @return {?}
 */
function sc_isSymbol(child) {
    return typeof child === "string" && child.charAt(0) === sc_SYMBOL_PREFIX;
}
/**
 * @param {Object} models
 * @return {?}
 */
function sc_symbol2string(models) {
    return models.slice(1);
}
/**
 * @param {?} dataAndEvents
 * @return {?}
 */
function sc_string2symbol(dataAndEvents) {
    return sc_SYMBOL_PREFIX + dataAndEvents;
}
/**
 * @return {?}
 */
function sc_symbolAppend() {
    var sc_symbolAppend = sc_SYMBOL_PREFIX;
    /** @type {number} */
    var i = 0;
    for (;i < arguments.length;i++) {
        sc_symbolAppend += arguments[i].slice(1);
    }
    return sc_symbolAppend;
}
/**
 * @param {Text} snap
 * @return {?}
 */
function sc_char2string(snap) {
    return snap.val;
}
/**
 * @param {Text} snap
 * @return {?}
 */
function sc_char2symbol(snap) {
    return sc_SYMBOL_PREFIX + snap.val;
}
/**
 * @param {string} child
 * @return {?}
 */
function sc_isString(child) {
    return typeof child === "string" && child.charAt(0) !== sc_SYMBOL_PREFIX;
}
/** @type {function (number, Text): ?} */
var sc_makeString = sc_makejsString;
/**
 * @return {?}
 */
function sc_string() {
    /** @type {number} */
    var i = 0;
    for (;i < arguments.length;i++) {
        arguments[i] = arguments[i].val;
    }
    return "".concat.apply("", arguments);
}
/**
 * @param {Array} newlines
 * @return {?}
 */
function sc_stringLength(newlines) {
    return newlines.length;
}
/**
 * @param {string} nv
 * @param {?} v
 * @return {?}
 */
function sc_stringRef(nv, v) {
    return new sc_Char(nv.charAt(v));
}
/**
 * @param {?} a
 * @param {?} b
 * @return {?}
 */
function sc_isStringEqual(a, b) {
    return a === b;
}
/**
 * @param {(boolean|number|string)} indexf
 * @param {(boolean|number|string)} f
 * @return {?}
 */
function sc_isStringLess(indexf, f) {
    return indexf < f;
}
/**
 * @param {(boolean|number|string)} a
 * @param {(boolean|number|string)} b
 * @return {?}
 */
function sc_isStringGreater(a, b) {
    return a > b;
}
/**
 * @param {number} dataAndEvents
 * @param {number} deepDataAndEvents
 * @return {?}
 */
function sc_isStringLessEqual(dataAndEvents, deepDataAndEvents) {
    return dataAndEvents <= deepDataAndEvents;
}
/**
 * @param {number} dataAndEvents
 * @param {number} deepDataAndEvents
 * @return {?}
 */
function sc_isStringGreaterEqual(dataAndEvents, deepDataAndEvents) {
    return dataAndEvents >= deepDataAndEvents;
}
/**
 * @param {Object} m3
 * @param {Object} evt
 * @return {?}
 */
function sc_isStringCIEqual(m3, evt) {
    return m3.toLowerCase() === evt.toLowerCase();
}
/**
 * @param {Object} m3
 * @param {Object} evt
 * @return {?}
 */
function sc_isStringCILess(m3, evt) {
    return m3.toLowerCase() < evt.toLowerCase();
}
/**
 * @param {Object} m3
 * @param {Object} evt
 * @return {?}
 */
function sc_isStringCIGreater(m3, evt) {
    return m3.toLowerCase() > evt.toLowerCase();
}
/**
 * @param {Object} m3
 * @param {Object} evt
 * @return {?}
 */
function sc_isStringCILessEqual(m3, evt) {
    return m3.toLowerCase() <= evt.toLowerCase();
}
/**
 * @param {Object} m3
 * @param {Object} evt
 * @return {?}
 */
function sc_isStringCIGreaterEqual(m3, evt) {
    return m3.toLowerCase() >= evt.toLowerCase();
}
/**
 * @param {string} value
 * @param {?} delimiter
 * @param {?} j
 * @return {?}
 */
function sc_substring(value, delimiter, j) {
    return value.substring(delimiter, j);
}
/**
 * @param {string} data
 * @param {Array} myValue
 * @param {string} startPos
 * @return {?}
 */
function sc_isSubstring_at(data, myValue, startPos) {
    return myValue == data.substring(startPos, startPos + myValue.length);
}
/**
 * @return {?}
 */
function sc_stringAppend() {
    return "".concat.apply("", arguments);
}
/** @type {function (string): ?} */
var sc_string2list = sc_jsstring2list;
/** @type {function (Object): ?} */
var sc_list2string = sc_list2jsstring;
/**
 * @param {?} dataAndEvents
 * @return {?}
 */
function sc_stringCopy(dataAndEvents) {
    return dataAndEvents;
}
/**
 * @param {Object} models
 * @return {?}
 */
function sc_keyword2string(models) {
    return models.slice(1);
}
/**
 * @param {?} dataAndEvents
 * @return {?}
 */
function sc_string2keyword(dataAndEvents) {
    return sc_KEYWORD_PREFIX + dataAndEvents;
}
/**
 * @return {?}
 */
String.prototype.sc_toDisplayString = function() {
    if (this.charAt(0) === sc_SYMBOL_PREFIX) {
        return this.slice(1);
    } else {
        if (this.charAt(0) === sc_KEYWORD_PREFIX) {
            return ":" + this.slice(1);
        } else {
            return this.toString();
        }
    }
};
/**
 * @return {?}
 */
String.prototype.sc_toWriteString = function() {
    if (this.charAt(0) === sc_SYMBOL_PREFIX) {
        return this.slice(1);
    } else {
        if (this.charAt(0) === sc_KEYWORD_PREFIX) {
            return ":" + this.slice(1);
        } else {
            return'"' + sc_escapeWriteString(this) + '"';
        }
    }
};
var BgL_testzd2boyerzd2;
var BgL_nboyerzd2benchmarkzd2;
var BgL_setupzd2boyerzd2;
var translate_term_nboyer;
var translate_args_nboyer;
var untranslate_term_nboyer;
var BgL_sc_symbolzd2ze3symbolzd2record_1ze3_nboyer;
var BgL_sc_za2symbolzd2recordszd2alistza2_2z00_nboyer;
var translate_alist_nboyer;
var apply_subst_nboyer;
var apply_subst_lst_nboyer;
var tautologyp_nboyer;
var if_constructor_nboyer;
var rewrite_count_nboyer;
var rewrite_nboyer;
var rewrite_args_nboyer;
var unify_subst_nboyer;
var one_way_unify1_nboyer;
var false_term_nboyer;
var true_term_nboyer;
var trans_of_implies1_nboyer;
var is_term_equal_nboyer;
var is_term_member_nboyer;
var const_nboyer;
var sc_const_3_nboyer;
var sc_const_4_nboyer;
sc_const_4_nboyer = new sc_Pair("\u1e9cimplies", new sc_Pair(new sc_Pair("\u1e9cand", new sc_Pair(new sc_Pair("\u1e9cimplies", new sc_Pair("\u1e9cx", new sc_Pair("\u1e9cy", null))), new sc_Pair(new sc_Pair("\u1e9cand", new sc_Pair(new sc_Pair("\u1e9cimplies", new sc_Pair("\u1e9cy", new sc_Pair("\u1e9cz", null))), new sc_Pair(new sc_Pair("\u1e9cand", new sc_Pair(new sc_Pair("\u1e9cimplies", new sc_Pair("\u1e9cz", new sc_Pair("\u1e9cu", null))), new sc_Pair(new sc_Pair("\u1e9cimplies", new sc_Pair("\u1e9cu",
    new sc_Pair("\u1e9cw", null))), null))), null))), null))), new sc_Pair(new sc_Pair("\u1e9cimplies", new sc_Pair("\u1e9cx", new sc_Pair("\u1e9cw", null))), null)));
sc_const_3_nboyer = sc_list(new sc_Pair("\u1e9cequal", new sc_Pair(new sc_Pair("\u1e9ccompile", new sc_Pair("\u1e9cform", null)), new sc_Pair(new sc_Pair("\u1e9creverse", new sc_Pair(new sc_Pair("\u1e9ccodegen", new sc_Pair(new sc_Pair("\u1e9coptimize", new sc_Pair("\u1e9cform", null)), new sc_Pair(new sc_Pair("\u1e9cnil", null), null))), null)), null))), new sc_Pair("\u1e9cequal", new sc_Pair(new sc_Pair("\u1e9ceqp", new sc_Pair("\u1e9cx", new sc_Pair("\u1e9cy", null))), new sc_Pair(new sc_Pair("\u1e9cequal",
        new sc_Pair(new sc_Pair("\u1e9cfix", new sc_Pair("\u1e9cx", null)), new sc_Pair(new sc_Pair("\u1e9cfix", new sc_Pair("\u1e9cy", null)), null))), null))), new sc_Pair("\u1e9cequal", new sc_Pair(new sc_Pair("\u1e9cgreaterp", new sc_Pair("\u1e9cx", new sc_Pair("\u1e9cy", null))), new sc_Pair(new sc_Pair("\u1e9clessp", new sc_Pair("\u1e9cy", new sc_Pair("\u1e9cx", null))), null))), new sc_Pair("\u1e9cequal", new sc_Pair(new sc_Pair("\u1e9clesseqp", new sc_Pair("\u1e9cx", new sc_Pair("\u1e9cy", null))),
        new sc_Pair(new sc_Pair("\u1e9cnot", new sc_Pair(new sc_Pair("\u1e9clessp", new sc_Pair("\u1e9cy", new sc_Pair("\u1e9cx", null))), null)), null))), new sc_Pair("\u1e9cequal", new sc_Pair(new sc_Pair("\u1e9cgreatereqp", new sc_Pair("\u1e9cx", new sc_Pair("\u1e9cy", null))), new sc_Pair(new sc_Pair("\u1e9cnot", new sc_Pair(new sc_Pair("\u1e9clessp", new sc_Pair("\u1e9cx", new sc_Pair("\u1e9cy", null))), null)), null))), new sc_Pair("\u1e9cequal", new sc_Pair(new sc_Pair("\u1e9cboolean", new sc_Pair("\u1e9cx",
        null)), new sc_Pair(new sc_Pair("\u1e9cor", new sc_Pair(new sc_Pair("\u1e9cequal", new sc_Pair("\u1e9cx", new sc_Pair(new sc_Pair("\u1e9ct", null), null))), new sc_Pair(new sc_Pair("\u1e9cequal", new sc_Pair("\u1e9cx", new sc_Pair(new sc_Pair("\u1e9cf", null), null))), null))), null))), new sc_Pair("\u1e9cequal", new sc_Pair(new sc_Pair("\u1e9ciff", new sc_Pair("\u1e9cx", new sc_Pair("\u1e9cy", null))), new sc_Pair(new sc_Pair("\u1e9cand", new sc_Pair(new sc_Pair("\u1e9cimplies", new sc_Pair("\u1e9cx",
        new sc_Pair("\u1e9cy", null))), new sc_Pair(new sc_Pair("\u1e9cimplies", new sc_Pair("\u1e9cy", new sc_Pair("\u1e9cx", null))), null))), null))), new sc_Pair("\u1e9cequal", new sc_Pair(new sc_Pair("\u1e9ceven1", new sc_Pair("\u1e9cx", null)), new sc_Pair(new sc_Pair("\u1e9cif", new sc_Pair(new sc_Pair("\u1e9czerop", new sc_Pair("\u1e9cx", null)), new sc_Pair(new sc_Pair("\u1e9ct", null), new sc_Pair(new sc_Pair("\u1e9codd", new sc_Pair(new sc_Pair("\u1e9csub1", new sc_Pair("\u1e9cx", null)), null)),
        null)))), null))), new sc_Pair("\u1e9cequal", new sc_Pair(new sc_Pair("\u1e9ccountps-", new sc_Pair("\u1e9cl", new sc_Pair("\u1e9cpred", null))), new sc_Pair(new sc_Pair("\u1e9ccountps-loop", new sc_Pair("\u1e9cl", new sc_Pair("\u1e9cpred", new sc_Pair(new sc_Pair("\u1e9czero", null), null)))), null))), new sc_Pair("\u1e9cequal", new sc_Pair(new sc_Pair("\u1e9cfact-", new sc_Pair("\u1e9ci", null)), new sc_Pair(new sc_Pair("\u1e9cfact-loop", new sc_Pair("\u1e9ci", new sc_Pair(1, null))), null))),
    new sc_Pair("\u1e9cequal", new sc_Pair(new sc_Pair("\u1e9creverse-", new sc_Pair("\u1e9cx", null)), new sc_Pair(new sc_Pair("\u1e9creverse-loop", new sc_Pair("\u1e9cx", new sc_Pair(new sc_Pair("\u1e9cnil", null), null))), null))), new sc_Pair("\u1e9cequal", new sc_Pair(new sc_Pair("\u1e9cdivides", new sc_Pair("\u1e9cx", new sc_Pair("\u1e9cy", null))), new sc_Pair(new sc_Pair("\u1e9czerop", new sc_Pair(new sc_Pair("\u1e9cremainder", new sc_Pair("\u1e9cy", new sc_Pair("\u1e9cx", null))), null)), null))),
    new sc_Pair("\u1e9cequal", new sc_Pair(new sc_Pair("\u1e9cassume-true", new sc_Pair("\u1e9cvar", new sc_Pair("\u1e9calist", null))), new sc_Pair(new sc_Pair("\u1e9ccons", new sc_Pair(new sc_Pair("\u1e9ccons", new sc_Pair("\u1e9cvar", new sc_Pair(new sc_Pair("\u1e9ct", null), null))), new sc_Pair("\u1e9calist", null))), null))), new sc_Pair("\u1e9cequal", new sc_Pair(new sc_Pair("\u1e9cassume-false", new sc_Pair("\u1e9cvar", new sc_Pair("\u1e9calist", null))), new sc_Pair(new sc_Pair("\u1e9ccons",
        new sc_Pair(new sc_Pair("\u1e9ccons", new sc_Pair("\u1e9cvar", new sc_Pair(new sc_Pair("\u1e9cf", null), null))), new sc_Pair("\u1e9calist", null))), null))), new sc_Pair("\u1e9cequal", new sc_Pair(new sc_Pair("\u1e9ctautology-checker", new sc_Pair("\u1e9cx", null)), new sc_Pair(new sc_Pair("\u1e9ctautologyp", new sc_Pair(new sc_Pair("\u1e9cnormalize", new sc_Pair("\u1e9cx", null)), new sc_Pair(new sc_Pair("\u1e9cnil", null), null))), null))), new sc_Pair("\u1e9cequal", new sc_Pair(new sc_Pair("\u1e9cfalsify",
        new sc_Pair("\u1e9cx", null)), new sc_Pair(new sc_Pair("\u1e9cfalsify1", new sc_Pair(new sc_Pair("\u1e9cnormalize", new sc_Pair("\u1e9cx", null)), new sc_Pair(new sc_Pair("\u1e9cnil", null), null))), null))), new sc_Pair("\u1e9cequal", new sc_Pair(new sc_Pair("\u1e9cprime", new sc_Pair("\u1e9cx", null)), new sc_Pair(new sc_Pair("\u1e9cand", new sc_Pair(new sc_Pair("\u1e9cnot", new sc_Pair(new sc_Pair("\u1e9czerop", new sc_Pair("\u1e9cx", null)), null)), new sc_Pair(new sc_Pair("\u1e9cnot", new sc_Pair(new sc_Pair("\u1e9cequal",
        new sc_Pair("\u1e9cx", new sc_Pair(new sc_Pair("\u1e9cadd1", new sc_Pair(new sc_Pair("\u1e9czero", null), null)), null))), null)), new sc_Pair(new sc_Pair("\u1e9cprime1", new sc_Pair("\u1e9cx", new sc_Pair(new sc_Pair("\u1e9csub1", new sc_Pair("\u1e9cx", null)), null))), null)))), null))), new sc_Pair("\u1e9cequal", new sc_Pair(new sc_Pair("\u1e9cand", new sc_Pair("\u1e9cp", new sc_Pair("\u1e9cq", null))), new sc_Pair(new sc_Pair("\u1e9cif", new sc_Pair("\u1e9cp", new sc_Pair(new sc_Pair("\u1e9cif",
        new sc_Pair("\u1e9cq", new sc_Pair(new sc_Pair("\u1e9ct", null), new sc_Pair(new sc_Pair("\u1e9cf", null), null)))), new sc_Pair(new sc_Pair("\u1e9cf", null), null)))), null))), new sc_Pair("\u1e9cequal", new sc_Pair(new sc_Pair("\u1e9cor", new sc_Pair("\u1e9cp", new sc_Pair("\u1e9cq", null))), new sc_Pair(new sc_Pair("\u1e9cif", new sc_Pair("\u1e9cp", new sc_Pair(new sc_Pair("\u1e9ct", null), new sc_Pair(new sc_Pair("\u1e9cif", new sc_Pair("\u1e9cq", new sc_Pair(new sc_Pair("\u1e9ct", null), new sc_Pair(new sc_Pair("\u1e9cf",
        null), null)))), null)))), null))), new sc_Pair("\u1e9cequal", new sc_Pair(new sc_Pair("\u1e9cnot", new sc_Pair("\u1e9cp", null)), new sc_Pair(new sc_Pair("\u1e9cif", new sc_Pair("\u1e9cp", new sc_Pair(new sc_Pair("\u1e9cf", null), new sc_Pair(new sc_Pair("\u1e9ct", null), null)))), null))), new sc_Pair("\u1e9cequal", new sc_Pair(new sc_Pair("\u1e9cimplies", new sc_Pair("\u1e9cp", new sc_Pair("\u1e9cq", null))), new sc_Pair(new sc_Pair("\u1e9cif", new sc_Pair("\u1e9cp", new sc_Pair(new sc_Pair("\u1e9cif",
        new sc_Pair("\u1e9cq", new sc_Pair(new sc_Pair("\u1e9ct", null), new sc_Pair(new sc_Pair("\u1e9cf", null), null)))), new sc_Pair(new sc_Pair("\u1e9ct", null), null)))), null))), new sc_Pair("\u1e9cequal", new sc_Pair(new sc_Pair("\u1e9cfix", new sc_Pair("\u1e9cx", null)), new sc_Pair(new sc_Pair("\u1e9cif", new sc_Pair(new sc_Pair("\u1e9cnumberp", new sc_Pair("\u1e9cx", null)), new sc_Pair("\u1e9cx", new sc_Pair(new sc_Pair("\u1e9czero", null), null)))), null))), new sc_Pair("\u1e9cequal", new sc_Pair(new sc_Pair("\u1e9cif",
        new sc_Pair(new sc_Pair("\u1e9cif", new sc_Pair("\u1e9ca", new sc_Pair("\u1e9cb", new sc_Pair("\u1e9cc", null)))), new sc_Pair("\u1e9cd", new sc_Pair("\u1e9ce", null)))), new sc_Pair(new sc_Pair("\u1e9cif", new sc_Pair("\u1e9ca", new sc_Pair(new sc_Pair("\u1e9cif", new sc_Pair("\u1e9cb", new sc_Pair("\u1e9cd", new sc_Pair("\u1e9ce", null)))), new sc_Pair(new sc_Pair("\u1e9cif", new sc_Pair("\u1e9cc", new sc_Pair("\u1e9cd", new sc_Pair("\u1e9ce", null)))), null)))), null))), new sc_Pair("\u1e9cequal",
        new sc_Pair(new sc_Pair("\u1e9czerop", new sc_Pair("\u1e9cx", null)), new sc_Pair(new sc_Pair("\u1e9cor", new sc_Pair(new sc_Pair("\u1e9cequal", new sc_Pair("\u1e9cx", new sc_Pair(new sc_Pair("\u1e9czero", null), null))), new sc_Pair(new sc_Pair("\u1e9cnot", new sc_Pair(new sc_Pair("\u1e9cnumberp", new sc_Pair("\u1e9cx", null)), null)), null))), null))), new sc_Pair("\u1e9cequal", new sc_Pair(new sc_Pair("\u1e9cplus", new sc_Pair(new sc_Pair("\u1e9cplus", new sc_Pair("\u1e9cx", new sc_Pair("\u1e9cy",
        null))), new sc_Pair("\u1e9cz", null))), new sc_Pair(new sc_Pair("\u1e9cplus", new sc_Pair("\u1e9cx", new sc_Pair(new sc_Pair("\u1e9cplus", new sc_Pair("\u1e9cy", new sc_Pair("\u1e9cz", null))), null))), null))), new sc_Pair("\u1e9cequal", new sc_Pair(new sc_Pair("\u1e9cequal", new sc_Pair(new sc_Pair("\u1e9cplus", new sc_Pair("\u1e9ca", new sc_Pair("\u1e9cb", null))), new sc_Pair(new sc_Pair("\u1e9czero", null), null))), new sc_Pair(new sc_Pair("\u1e9cand", new sc_Pair(new sc_Pair("\u1e9czerop",
        new sc_Pair("\u1e9ca", null)), new sc_Pair(new sc_Pair("\u1e9czerop", new sc_Pair("\u1e9cb", null)), null))), null))), new sc_Pair("\u1e9cequal", new sc_Pair(new sc_Pair("\u1e9cdifference", new sc_Pair("\u1e9cx", new sc_Pair("\u1e9cx", null))), new sc_Pair(new sc_Pair("\u1e9czero", null), null))), new sc_Pair("\u1e9cequal", new sc_Pair(new sc_Pair("\u1e9cequal", new sc_Pair(new sc_Pair("\u1e9cplus", new sc_Pair("\u1e9ca", new sc_Pair("\u1e9cb", null))), new sc_Pair(new sc_Pair("\u1e9cplus", new sc_Pair("\u1e9ca",
        new sc_Pair("\u1e9cc", null))), null))), new sc_Pair(new sc_Pair("\u1e9cequal", new sc_Pair(new sc_Pair("\u1e9cfix", new sc_Pair("\u1e9cb", null)), new sc_Pair(new sc_Pair("\u1e9cfix", new sc_Pair("\u1e9cc", null)), null))), null))), new sc_Pair("\u1e9cequal", new sc_Pair(new sc_Pair("\u1e9cequal", new sc_Pair(new sc_Pair("\u1e9czero", null), new sc_Pair(new sc_Pair("\u1e9cdifference", new sc_Pair("\u1e9cx", new sc_Pair("\u1e9cy", null))), null))), new sc_Pair(new sc_Pair("\u1e9cnot", new sc_Pair(new sc_Pair("\u1e9clessp",
        new sc_Pair("\u1e9cy", new sc_Pair("\u1e9cx", null))), null)), null))), new sc_Pair("\u1e9cequal", new sc_Pair(new sc_Pair("\u1e9cequal", new sc_Pair("\u1e9cx", new sc_Pair(new sc_Pair("\u1e9cdifference", new sc_Pair("\u1e9cx", new sc_Pair("\u1e9cy", null))), null))), new sc_Pair(new sc_Pair("\u1e9cand", new sc_Pair(new sc_Pair("\u1e9cnumberp", new sc_Pair("\u1e9cx", null)), new sc_Pair(new sc_Pair("\u1e9cor", new sc_Pair(new sc_Pair("\u1e9cequal", new sc_Pair("\u1e9cx", new sc_Pair(new sc_Pair("\u1e9czero",
        null), null))), new sc_Pair(new sc_Pair("\u1e9czerop", new sc_Pair("\u1e9cy", null)), null))), null))), null))), new sc_Pair("\u1e9cequal", new sc_Pair(new sc_Pair("\u1e9cmeaning", new sc_Pair(new sc_Pair("\u1e9cplus-tree", new sc_Pair(new sc_Pair("\u1e9cappend", new sc_Pair("\u1e9cx", new sc_Pair("\u1e9cy", null))), null)), new sc_Pair("\u1e9ca", null))), new sc_Pair(new sc_Pair("\u1e9cplus", new sc_Pair(new sc_Pair("\u1e9cmeaning", new sc_Pair(new sc_Pair("\u1e9cplus-tree", new sc_Pair("\u1e9cx",
        null)), new sc_Pair("\u1e9ca", null))), new sc_Pair(new sc_Pair("\u1e9cmeaning", new sc_Pair(new sc_Pair("\u1e9cplus-tree", new sc_Pair("\u1e9cy", null)), new sc_Pair("\u1e9ca", null))), null))), null))), new sc_Pair("\u1e9cequal", new sc_Pair(new sc_Pair("\u1e9cmeaning", new sc_Pair(new sc_Pair("\u1e9cplus-tree", new sc_Pair(new sc_Pair("\u1e9cplus-fringe", new sc_Pair("\u1e9cx", null)), null)), new sc_Pair("\u1e9ca", null))), new sc_Pair(new sc_Pair("\u1e9cfix", new sc_Pair(new sc_Pair("\u1e9cmeaning",
        new sc_Pair("\u1e9cx", new sc_Pair("\u1e9ca", null))), null)), null))), new sc_Pair("\u1e9cequal", new sc_Pair(new sc_Pair("\u1e9cappend", new sc_Pair(new sc_Pair("\u1e9cappend", new sc_Pair("\u1e9cx", new sc_Pair("\u1e9cy", null))), new sc_Pair("\u1e9cz", null))), new sc_Pair(new sc_Pair("\u1e9cappend", new sc_Pair("\u1e9cx", new sc_Pair(new sc_Pair("\u1e9cappend", new sc_Pair("\u1e9cy", new sc_Pair("\u1e9cz", null))), null))), null))), new sc_Pair("\u1e9cequal", new sc_Pair(new sc_Pair("\u1e9creverse",
        new sc_Pair(new sc_Pair("\u1e9cappend", new sc_Pair("\u1e9ca", new sc_Pair("\u1e9cb", null))), null)), new sc_Pair(new sc_Pair("\u1e9cappend", new sc_Pair(new sc_Pair("\u1e9creverse", new sc_Pair("\u1e9cb", null)), new sc_Pair(new sc_Pair("\u1e9creverse", new sc_Pair("\u1e9ca", null)), null))), null))), new sc_Pair("\u1e9cequal", new sc_Pair(new sc_Pair("\u1e9ctimes", new sc_Pair("\u1e9cx", new sc_Pair(new sc_Pair("\u1e9cplus", new sc_Pair("\u1e9cy", new sc_Pair("\u1e9cz", null))), null))), new sc_Pair(new sc_Pair("\u1e9cplus",
        new sc_Pair(new sc_Pair("\u1e9ctimes", new sc_Pair("\u1e9cx", new sc_Pair("\u1e9cy", null))), new sc_Pair(new sc_Pair("\u1e9ctimes", new sc_Pair("\u1e9cx", new sc_Pair("\u1e9cz", null))), null))), null))), new sc_Pair("\u1e9cequal", new sc_Pair(new sc_Pair("\u1e9ctimes", new sc_Pair(new sc_Pair("\u1e9ctimes", new sc_Pair("\u1e9cx", new sc_Pair("\u1e9cy", null))), new sc_Pair("\u1e9cz", null))), new sc_Pair(new sc_Pair("\u1e9ctimes", new sc_Pair("\u1e9cx", new sc_Pair(new sc_Pair("\u1e9ctimes", new sc_Pair("\u1e9cy",
        new sc_Pair("\u1e9cz", null))), null))), null))), new sc_Pair("\u1e9cequal", new sc_Pair(new sc_Pair("\u1e9cequal", new sc_Pair(new sc_Pair("\u1e9ctimes", new sc_Pair("\u1e9cx", new sc_Pair("\u1e9cy", null))), new sc_Pair(new sc_Pair("\u1e9czero", null), null))), new sc_Pair(new sc_Pair("\u1e9cor", new sc_Pair(new sc_Pair("\u1e9czerop", new sc_Pair("\u1e9cx", null)), new sc_Pair(new sc_Pair("\u1e9czerop", new sc_Pair("\u1e9cy", null)), null))), null))), new sc_Pair("\u1e9cequal", new sc_Pair(new sc_Pair("\u1e9cexec",
        new sc_Pair(new sc_Pair("\u1e9cappend", new sc_Pair("\u1e9cx", new sc_Pair("\u1e9cy", null))), new sc_Pair("\u1e9cpds", new sc_Pair("\u1e9cenvrn", null)))), new sc_Pair(new sc_Pair("\u1e9cexec", new sc_Pair("\u1e9cy", new sc_Pair(new sc_Pair("\u1e9cexec", new sc_Pair("\u1e9cx", new sc_Pair("\u1e9cpds", new sc_Pair("\u1e9cenvrn", null)))), new sc_Pair("\u1e9cenvrn", null)))), null))), new sc_Pair("\u1e9cequal", new sc_Pair(new sc_Pair("\u1e9cmc-flatten", new sc_Pair("\u1e9cx", new sc_Pair("\u1e9cy",
        null))), new sc_Pair(new sc_Pair("\u1e9cappend", new sc_Pair(new sc_Pair("\u1e9cflatten", new sc_Pair("\u1e9cx", null)), new sc_Pair("\u1e9cy", null))), null))), new sc_Pair("\u1e9cequal", new sc_Pair(new sc_Pair("\u1e9cmember", new sc_Pair("\u1e9cx", new sc_Pair(new sc_Pair("\u1e9cappend", new sc_Pair("\u1e9ca", new sc_Pair("\u1e9cb", null))), null))), new sc_Pair(new sc_Pair("\u1e9cor", new sc_Pair(new sc_Pair("\u1e9cmember", new sc_Pair("\u1e9cx", new sc_Pair("\u1e9ca", null))), new sc_Pair(new sc_Pair("\u1e9cmember",
        new sc_Pair("\u1e9cx", new sc_Pair("\u1e9cb", null))), null))), null))), new sc_Pair("\u1e9cequal", new sc_Pair(new sc_Pair("\u1e9cmember", new sc_Pair("\u1e9cx", new sc_Pair(new sc_Pair("\u1e9creverse", new sc_Pair("\u1e9cy", null)), null))), new sc_Pair(new sc_Pair("\u1e9cmember", new sc_Pair("\u1e9cx", new sc_Pair("\u1e9cy", null))), null))), new sc_Pair("\u1e9cequal", new sc_Pair(new sc_Pair("\u1e9clength", new sc_Pair(new sc_Pair("\u1e9creverse", new sc_Pair("\u1e9cx", null)), null)), new sc_Pair(new sc_Pair("\u1e9clength",
        new sc_Pair("\u1e9cx", null)), null))), new sc_Pair("\u1e9cequal", new sc_Pair(new sc_Pair("\u1e9cmember", new sc_Pair("\u1e9ca", new sc_Pair(new sc_Pair("\u1e9cintersect", new sc_Pair("\u1e9cb", new sc_Pair("\u1e9cc", null))), null))), new sc_Pair(new sc_Pair("\u1e9cand", new sc_Pair(new sc_Pair("\u1e9cmember", new sc_Pair("\u1e9ca", new sc_Pair("\u1e9cb", null))), new sc_Pair(new sc_Pair("\u1e9cmember", new sc_Pair("\u1e9ca", new sc_Pair("\u1e9cc", null))), null))), null))), new sc_Pair("\u1e9cequal",
        new sc_Pair(new sc_Pair("\u1e9cnth", new sc_Pair(new sc_Pair("\u1e9czero", null), new sc_Pair("\u1e9ci", null))), new sc_Pair(new sc_Pair("\u1e9czero", null), null))), new sc_Pair("\u1e9cequal", new sc_Pair(new sc_Pair("\u1e9cexp", new sc_Pair("\u1e9ci", new sc_Pair(new sc_Pair("\u1e9cplus", new sc_Pair("\u1e9cj", new sc_Pair("\u1e9ck", null))), null))), new sc_Pair(new sc_Pair("\u1e9ctimes", new sc_Pair(new sc_Pair("\u1e9cexp", new sc_Pair("\u1e9ci", new sc_Pair("\u1e9cj", null))), new sc_Pair(new sc_Pair("\u1e9cexp",
        new sc_Pair("\u1e9ci", new sc_Pair("\u1e9ck", null))), null))), null))), new sc_Pair("\u1e9cequal", new sc_Pair(new sc_Pair("\u1e9cexp", new sc_Pair("\u1e9ci", new sc_Pair(new sc_Pair("\u1e9ctimes", new sc_Pair("\u1e9cj", new sc_Pair("\u1e9ck", null))), null))), new sc_Pair(new sc_Pair("\u1e9cexp", new sc_Pair(new sc_Pair("\u1e9cexp", new sc_Pair("\u1e9ci", new sc_Pair("\u1e9cj", null))), new sc_Pair("\u1e9ck", null))), null))), new sc_Pair("\u1e9cequal", new sc_Pair(new sc_Pair("\u1e9creverse-loop",
        new sc_Pair("\u1e9cx", new sc_Pair("\u1e9cy", null))), new sc_Pair(new sc_Pair("\u1e9cappend", new sc_Pair(new sc_Pair("\u1e9creverse", new sc_Pair("\u1e9cx", null)), new sc_Pair("\u1e9cy", null))), null))), new sc_Pair("\u1e9cequal", new sc_Pair(new sc_Pair("\u1e9creverse-loop", new sc_Pair("\u1e9cx", new sc_Pair(new sc_Pair("\u1e9cnil", null), null))), new sc_Pair(new sc_Pair("\u1e9creverse", new sc_Pair("\u1e9cx", null)), null))), new sc_Pair("\u1e9cequal", new sc_Pair(new sc_Pair("\u1e9ccount-list",
        new sc_Pair("\u1e9cz", new sc_Pair(new sc_Pair("\u1e9csort-lp", new sc_Pair("\u1e9cx", new sc_Pair("\u1e9cy", null))), null))), new sc_Pair(new sc_Pair("\u1e9cplus", new sc_Pair(new sc_Pair("\u1e9ccount-list", new sc_Pair("\u1e9cz", new sc_Pair("\u1e9cx", null))), new sc_Pair(new sc_Pair("\u1e9ccount-list", new sc_Pair("\u1e9cz", new sc_Pair("\u1e9cy", null))), null))), null))), new sc_Pair("\u1e9cequal", new sc_Pair(new sc_Pair("\u1e9cequal", new sc_Pair(new sc_Pair("\u1e9cappend", new sc_Pair("\u1e9ca",
        new sc_Pair("\u1e9cb", null))), new sc_Pair(new sc_Pair("\u1e9cappend", new sc_Pair("\u1e9ca", new sc_Pair("\u1e9cc", null))), null))), new sc_Pair(new sc_Pair("\u1e9cequal", new sc_Pair("\u1e9cb", new sc_Pair("\u1e9cc", null))), null))), new sc_Pair("\u1e9cequal", new sc_Pair(new sc_Pair("\u1e9cplus", new sc_Pair(new sc_Pair("\u1e9cremainder", new sc_Pair("\u1e9cx", new sc_Pair("\u1e9cy", null))), new sc_Pair(new sc_Pair("\u1e9ctimes", new sc_Pair("\u1e9cy", new sc_Pair(new sc_Pair("\u1e9cquotient",
        new sc_Pair("\u1e9cx", new sc_Pair("\u1e9cy", null))), null))), null))), new sc_Pair(new sc_Pair("\u1e9cfix", new sc_Pair("\u1e9cx", null)), null))), new sc_Pair("\u1e9cequal", new sc_Pair(new sc_Pair("\u1e9cpower-eval", new sc_Pair(new sc_Pair("\u1e9cbig-plus1", new sc_Pair("\u1e9cl", new sc_Pair("\u1e9ci", new sc_Pair("\u1e9cbase", null)))), new sc_Pair("\u1e9cbase", null))), new sc_Pair(new sc_Pair("\u1e9cplus", new sc_Pair(new sc_Pair("\u1e9cpower-eval", new sc_Pair("\u1e9cl", new sc_Pair("\u1e9cbase",
        null))), new sc_Pair("\u1e9ci", null))), null))), new sc_Pair("\u1e9cequal", new sc_Pair(new sc_Pair("\u1e9cpower-eval", new sc_Pair(new sc_Pair("\u1e9cbig-plus", new sc_Pair("\u1e9cx", new sc_Pair("\u1e9cy", new sc_Pair("\u1e9ci", new sc_Pair("\u1e9cbase", null))))), new sc_Pair("\u1e9cbase", null))), new sc_Pair(new sc_Pair("\u1e9cplus", new sc_Pair("\u1e9ci", new sc_Pair(new sc_Pair("\u1e9cplus", new sc_Pair(new sc_Pair("\u1e9cpower-eval", new sc_Pair("\u1e9cx", new sc_Pair("\u1e9cbase", null))),
        new sc_Pair(new sc_Pair("\u1e9cpower-eval", new sc_Pair("\u1e9cy", new sc_Pair("\u1e9cbase", null))), null))), null))), null))), new sc_Pair("\u1e9cequal", new sc_Pair(new sc_Pair("\u1e9cremainder", new sc_Pair("\u1e9cy", new sc_Pair(1, null))), new sc_Pair(new sc_Pair("\u1e9czero", null), null))), new sc_Pair("\u1e9cequal", new sc_Pair(new sc_Pair("\u1e9clessp", new sc_Pair(new sc_Pair("\u1e9cremainder", new sc_Pair("\u1e9cx", new sc_Pair("\u1e9cy", null))), new sc_Pair("\u1e9cy", null))), new sc_Pair(new sc_Pair("\u1e9cnot",
        new sc_Pair(new sc_Pair("\u1e9czerop", new sc_Pair("\u1e9cy", null)), null)), null))), new sc_Pair("\u1e9cequal", new sc_Pair(new sc_Pair("\u1e9cremainder", new sc_Pair("\u1e9cx", new sc_Pair("\u1e9cx", null))), new sc_Pair(new sc_Pair("\u1e9czero", null), null))), new sc_Pair("\u1e9cequal", new sc_Pair(new sc_Pair("\u1e9clessp", new sc_Pair(new sc_Pair("\u1e9cquotient", new sc_Pair("\u1e9ci", new sc_Pair("\u1e9cj", null))), new sc_Pair("\u1e9ci", null))), new sc_Pair(new sc_Pair("\u1e9cand", new sc_Pair(new sc_Pair("\u1e9cnot",
        new sc_Pair(new sc_Pair("\u1e9czerop", new sc_Pair("\u1e9ci", null)), null)), new sc_Pair(new sc_Pair("\u1e9cor", new sc_Pair(new sc_Pair("\u1e9czerop", new sc_Pair("\u1e9cj", null)), new sc_Pair(new sc_Pair("\u1e9cnot", new sc_Pair(new sc_Pair("\u1e9cequal", new sc_Pair("\u1e9cj", new sc_Pair(1, null))), null)), null))), null))), null))), new sc_Pair("\u1e9cequal", new sc_Pair(new sc_Pair("\u1e9clessp", new sc_Pair(new sc_Pair("\u1e9cremainder", new sc_Pair("\u1e9cx", new sc_Pair("\u1e9cy", null))),
        new sc_Pair("\u1e9cx", null))), new sc_Pair(new sc_Pair("\u1e9cand", new sc_Pair(new sc_Pair("\u1e9cnot", new sc_Pair(new sc_Pair("\u1e9czerop", new sc_Pair("\u1e9cy", null)), null)), new sc_Pair(new sc_Pair("\u1e9cnot", new sc_Pair(new sc_Pair("\u1e9czerop", new sc_Pair("\u1e9cx", null)), null)), new sc_Pair(new sc_Pair("\u1e9cnot", new sc_Pair(new sc_Pair("\u1e9clessp", new sc_Pair("\u1e9cx", new sc_Pair("\u1e9cy", null))), null)), null)))), null))), new sc_Pair("\u1e9cequal", new sc_Pair(new sc_Pair("\u1e9cpower-eval",
        new sc_Pair(new sc_Pair("\u1e9cpower-rep", new sc_Pair("\u1e9ci", new sc_Pair("\u1e9cbase", null))), new sc_Pair("\u1e9cbase", null))), new sc_Pair(new sc_Pair("\u1e9cfix", new sc_Pair("\u1e9ci", null)), null))), new sc_Pair("\u1e9cequal", new sc_Pair(new sc_Pair("\u1e9cpower-eval", new sc_Pair(new sc_Pair("\u1e9cbig-plus", new sc_Pair(new sc_Pair("\u1e9cpower-rep", new sc_Pair("\u1e9ci", new sc_Pair("\u1e9cbase", null))), new sc_Pair(new sc_Pair("\u1e9cpower-rep", new sc_Pair("\u1e9cj", new sc_Pair("\u1e9cbase",
        null))), new sc_Pair(new sc_Pair("\u1e9czero", null), new sc_Pair("\u1e9cbase", null))))), new sc_Pair("\u1e9cbase", null))), new sc_Pair(new sc_Pair("\u1e9cplus", new sc_Pair("\u1e9ci", new sc_Pair("\u1e9cj", null))), null))), new sc_Pair("\u1e9cequal", new sc_Pair(new sc_Pair("\u1e9cgcd", new sc_Pair("\u1e9cx", new sc_Pair("\u1e9cy", null))), new sc_Pair(new sc_Pair("\u1e9cgcd", new sc_Pair("\u1e9cy", new sc_Pair("\u1e9cx", null))), null))), new sc_Pair("\u1e9cequal", new sc_Pair(new sc_Pair("\u1e9cnth",
        new sc_Pair(new sc_Pair("\u1e9cappend", new sc_Pair("\u1e9ca", new sc_Pair("\u1e9cb", null))), new sc_Pair("\u1e9ci", null))), new sc_Pair(new sc_Pair("\u1e9cappend", new sc_Pair(new sc_Pair("\u1e9cnth", new sc_Pair("\u1e9ca", new sc_Pair("\u1e9ci", null))), new sc_Pair(new sc_Pair("\u1e9cnth", new sc_Pair("\u1e9cb", new sc_Pair(new sc_Pair("\u1e9cdifference", new sc_Pair("\u1e9ci", new sc_Pair(new sc_Pair("\u1e9clength", new sc_Pair("\u1e9ca", null)), null))), null))), null))), null))), new sc_Pair("\u1e9cequal",
        new sc_Pair(new sc_Pair("\u1e9cdifference", new sc_Pair(new sc_Pair("\u1e9cplus", new sc_Pair("\u1e9cx", new sc_Pair("\u1e9cy", null))), new sc_Pair("\u1e9cx", null))), new sc_Pair(new sc_Pair("\u1e9cfix", new sc_Pair("\u1e9cy", null)), null))), new sc_Pair("\u1e9cequal", new sc_Pair(new sc_Pair("\u1e9cdifference", new sc_Pair(new sc_Pair("\u1e9cplus", new sc_Pair("\u1e9cy", new sc_Pair("\u1e9cx", null))), new sc_Pair("\u1e9cx", null))), new sc_Pair(new sc_Pair("\u1e9cfix", new sc_Pair("\u1e9cy",
        null)), null))), new sc_Pair("\u1e9cequal", new sc_Pair(new sc_Pair("\u1e9cdifference", new sc_Pair(new sc_Pair("\u1e9cplus", new sc_Pair("\u1e9cx", new sc_Pair("\u1e9cy", null))), new sc_Pair(new sc_Pair("\u1e9cplus", new sc_Pair("\u1e9cx", new sc_Pair("\u1e9cz", null))), null))), new sc_Pair(new sc_Pair("\u1e9cdifference", new sc_Pair("\u1e9cy", new sc_Pair("\u1e9cz", null))), null))), new sc_Pair("\u1e9cequal", new sc_Pair(new sc_Pair("\u1e9ctimes", new sc_Pair("\u1e9cx", new sc_Pair(new sc_Pair("\u1e9cdifference",
        new sc_Pair("\u1e9cc", new sc_Pair("\u1e9cw", null))), null))), new sc_Pair(new sc_Pair("\u1e9cdifference", new sc_Pair(new sc_Pair("\u1e9ctimes", new sc_Pair("\u1e9cc", new sc_Pair("\u1e9cx", null))), new sc_Pair(new sc_Pair("\u1e9ctimes", new sc_Pair("\u1e9cw", new sc_Pair("\u1e9cx", null))), null))), null))), new sc_Pair("\u1e9cequal", new sc_Pair(new sc_Pair("\u1e9cremainder", new sc_Pair(new sc_Pair("\u1e9ctimes", new sc_Pair("\u1e9cx", new sc_Pair("\u1e9cz", null))), new sc_Pair("\u1e9cz",
        null))), new sc_Pair(new sc_Pair("\u1e9czero", null), null))), new sc_Pair("\u1e9cequal", new sc_Pair(new sc_Pair("\u1e9cdifference", new sc_Pair(new sc_Pair("\u1e9cplus", new sc_Pair("\u1e9cb", new sc_Pair(new sc_Pair("\u1e9cplus", new sc_Pair("\u1e9ca", new sc_Pair("\u1e9cc", null))), null))), new sc_Pair("\u1e9ca", null))), new sc_Pair(new sc_Pair("\u1e9cplus", new sc_Pair("\u1e9cb", new sc_Pair("\u1e9cc", null))), null))), new sc_Pair("\u1e9cequal", new sc_Pair(new sc_Pair("\u1e9cdifference",
        new sc_Pair(new sc_Pair("\u1e9cadd1", new sc_Pair(new sc_Pair("\u1e9cplus", new sc_Pair("\u1e9cy", new sc_Pair("\u1e9cz", null))), null)), new sc_Pair("\u1e9cz", null))), new sc_Pair(new sc_Pair("\u1e9cadd1", new sc_Pair("\u1e9cy", null)), null))), new sc_Pair("\u1e9cequal", new sc_Pair(new sc_Pair("\u1e9clessp", new sc_Pair(new sc_Pair("\u1e9cplus", new sc_Pair("\u1e9cx", new sc_Pair("\u1e9cy", null))), new sc_Pair(new sc_Pair("\u1e9cplus", new sc_Pair("\u1e9cx", new sc_Pair("\u1e9cz", null))),
        null))), new sc_Pair(new sc_Pair("\u1e9clessp", new sc_Pair("\u1e9cy", new sc_Pair("\u1e9cz", null))), null))), new sc_Pair("\u1e9cequal", new sc_Pair(new sc_Pair("\u1e9clessp", new sc_Pair(new sc_Pair("\u1e9ctimes", new sc_Pair("\u1e9cx", new sc_Pair("\u1e9cz", null))), new sc_Pair(new sc_Pair("\u1e9ctimes", new sc_Pair("\u1e9cy", new sc_Pair("\u1e9cz", null))), null))), new sc_Pair(new sc_Pair("\u1e9cand", new sc_Pair(new sc_Pair("\u1e9cnot", new sc_Pair(new sc_Pair("\u1e9czerop", new sc_Pair("\u1e9cz",
        null)), null)), new sc_Pair(new sc_Pair("\u1e9clessp", new sc_Pair("\u1e9cx", new sc_Pair("\u1e9cy", null))), null))), null))), new sc_Pair("\u1e9cequal", new sc_Pair(new sc_Pair("\u1e9clessp", new sc_Pair("\u1e9cy", new sc_Pair(new sc_Pair("\u1e9cplus", new sc_Pair("\u1e9cx", new sc_Pair("\u1e9cy", null))), null))), new sc_Pair(new sc_Pair("\u1e9cnot", new sc_Pair(new sc_Pair("\u1e9czerop", new sc_Pair("\u1e9cx", null)), null)), null))), new sc_Pair("\u1e9cequal", new sc_Pair(new sc_Pair("\u1e9cgcd",
        new sc_Pair(new sc_Pair("\u1e9ctimes", new sc_Pair("\u1e9cx", new sc_Pair("\u1e9cz", null))), new sc_Pair(new sc_Pair("\u1e9ctimes", new sc_Pair("\u1e9cy", new sc_Pair("\u1e9cz", null))), null))), new sc_Pair(new sc_Pair("\u1e9ctimes", new sc_Pair("\u1e9cz", new sc_Pair(new sc_Pair("\u1e9cgcd", new sc_Pair("\u1e9cx", new sc_Pair("\u1e9cy", null))), null))), null))), new sc_Pair("\u1e9cequal", new sc_Pair(new sc_Pair("\u1e9cvalue", new sc_Pair(new sc_Pair("\u1e9cnormalize", new sc_Pair("\u1e9cx",
        null)), new sc_Pair("\u1e9ca", null))), new sc_Pair(new sc_Pair("\u1e9cvalue", new sc_Pair("\u1e9cx", new sc_Pair("\u1e9ca", null))), null))), new sc_Pair("\u1e9cequal", new sc_Pair(new sc_Pair("\u1e9cequal", new sc_Pair(new sc_Pair("\u1e9cflatten", new sc_Pair("\u1e9cx", null)), new sc_Pair(new sc_Pair("\u1e9ccons", new sc_Pair("\u1e9cy", new sc_Pair(new sc_Pair("\u1e9cnil", null), null))), null))), new sc_Pair(new sc_Pair("\u1e9cand", new sc_Pair(new sc_Pair("\u1e9cnlistp", new sc_Pair("\u1e9cx",
        null)), new sc_Pair(new sc_Pair("\u1e9cequal", new sc_Pair("\u1e9cx", new sc_Pair("\u1e9cy", null))), null))), null))), new sc_Pair("\u1e9cequal", new sc_Pair(new sc_Pair("\u1e9clistp", new sc_Pair(new sc_Pair("\u1e9cgopher", new sc_Pair("\u1e9cx", null)), null)), new sc_Pair(new sc_Pair("\u1e9clistp", new sc_Pair("\u1e9cx", null)), null))), new sc_Pair("\u1e9cequal", new sc_Pair(new sc_Pair("\u1e9csamefringe", new sc_Pair("\u1e9cx", new sc_Pair("\u1e9cy", null))), new sc_Pair(new sc_Pair("\u1e9cequal",
        new sc_Pair(new sc_Pair("\u1e9cflatten", new sc_Pair("\u1e9cx", null)), new sc_Pair(new sc_Pair("\u1e9cflatten", new sc_Pair("\u1e9cy", null)), null))), null))), new sc_Pair("\u1e9cequal", new sc_Pair(new sc_Pair("\u1e9cequal", new sc_Pair(new sc_Pair("\u1e9cgreatest-factor", new sc_Pair("\u1e9cx", new sc_Pair("\u1e9cy", null))), new sc_Pair(new sc_Pair("\u1e9czero", null), null))), new sc_Pair(new sc_Pair("\u1e9cand", new sc_Pair(new sc_Pair("\u1e9cor", new sc_Pair(new sc_Pair("\u1e9czerop", new sc_Pair("\u1e9cy",
        null)), new sc_Pair(new sc_Pair("\u1e9cequal", new sc_Pair("\u1e9cy", new sc_Pair(1, null))), null))), new sc_Pair(new sc_Pair("\u1e9cequal", new sc_Pair("\u1e9cx", new sc_Pair(new sc_Pair("\u1e9czero", null), null))), null))), null))), new sc_Pair("\u1e9cequal", new sc_Pair(new sc_Pair("\u1e9cequal", new sc_Pair(new sc_Pair("\u1e9cgreatest-factor", new sc_Pair("\u1e9cx", new sc_Pair("\u1e9cy", null))), new sc_Pair(1, null))), new sc_Pair(new sc_Pair("\u1e9cequal", new sc_Pair("\u1e9cx", new sc_Pair(1,
        null))), null))), new sc_Pair("\u1e9cequal", new sc_Pair(new sc_Pair("\u1e9cnumberp", new sc_Pair(new sc_Pair("\u1e9cgreatest-factor", new sc_Pair("\u1e9cx", new sc_Pair("\u1e9cy", null))), null)), new sc_Pair(new sc_Pair("\u1e9cnot", new sc_Pair(new sc_Pair("\u1e9cand", new sc_Pair(new sc_Pair("\u1e9cor", new sc_Pair(new sc_Pair("\u1e9czerop", new sc_Pair("\u1e9cy", null)), new sc_Pair(new sc_Pair("\u1e9cequal", new sc_Pair("\u1e9cy", new sc_Pair(1, null))), null))), new sc_Pair(new sc_Pair("\u1e9cnot",
        new sc_Pair(new sc_Pair("\u1e9cnumberp", new sc_Pair("\u1e9cx", null)), null)), null))), null)), null))), new sc_Pair("\u1e9cequal", new sc_Pair(new sc_Pair("\u1e9ctimes-list", new sc_Pair(new sc_Pair("\u1e9cappend", new sc_Pair("\u1e9cx", new sc_Pair("\u1e9cy", null))), null)), new sc_Pair(new sc_Pair("\u1e9ctimes", new sc_Pair(new sc_Pair("\u1e9ctimes-list", new sc_Pair("\u1e9cx", null)), new sc_Pair(new sc_Pair("\u1e9ctimes-list", new sc_Pair("\u1e9cy", null)), null))), null))), new sc_Pair("\u1e9cequal",
        new sc_Pair(new sc_Pair("\u1e9cprime-list", new sc_Pair(new sc_Pair("\u1e9cappend", new sc_Pair("\u1e9cx", new sc_Pair("\u1e9cy", null))), null)), new sc_Pair(new sc_Pair("\u1e9cand", new sc_Pair(new sc_Pair("\u1e9cprime-list", new sc_Pair("\u1e9cx", null)), new sc_Pair(new sc_Pair("\u1e9cprime-list", new sc_Pair("\u1e9cy", null)), null))), null))), new sc_Pair("\u1e9cequal", new sc_Pair(new sc_Pair("\u1e9cequal", new sc_Pair("\u1e9cz", new sc_Pair(new sc_Pair("\u1e9ctimes", new sc_Pair("\u1e9cw",
        new sc_Pair("\u1e9cz", null))), null))), new sc_Pair(new sc_Pair("\u1e9cand", new sc_Pair(new sc_Pair("\u1e9cnumberp", new sc_Pair("\u1e9cz", null)), new sc_Pair(new sc_Pair("\u1e9cor", new sc_Pair(new sc_Pair("\u1e9cequal", new sc_Pair("\u1e9cz", new sc_Pair(new sc_Pair("\u1e9czero", null), null))), new sc_Pair(new sc_Pair("\u1e9cequal", new sc_Pair("\u1e9cw", new sc_Pair(1, null))), null))), null))), null))), new sc_Pair("\u1e9cequal", new sc_Pair(new sc_Pair("\u1e9cgreatereqp", new sc_Pair("\u1e9cx",
        new sc_Pair("\u1e9cy", null))), new sc_Pair(new sc_Pair("\u1e9cnot", new sc_Pair(new sc_Pair("\u1e9clessp", new sc_Pair("\u1e9cx", new sc_Pair("\u1e9cy", null))), null)), null))), new sc_Pair("\u1e9cequal", new sc_Pair(new sc_Pair("\u1e9cequal", new sc_Pair("\u1e9cx", new sc_Pair(new sc_Pair("\u1e9ctimes", new sc_Pair("\u1e9cx", new sc_Pair("\u1e9cy", null))), null))), new sc_Pair(new sc_Pair("\u1e9cor", new sc_Pair(new sc_Pair("\u1e9cequal", new sc_Pair("\u1e9cx", new sc_Pair(new sc_Pair("\u1e9czero",
        null), null))), new sc_Pair(new sc_Pair("\u1e9cand", new sc_Pair(new sc_Pair("\u1e9cnumberp", new sc_Pair("\u1e9cx", null)), new sc_Pair(new sc_Pair("\u1e9cequal", new sc_Pair("\u1e9cy", new sc_Pair(1, null))), null))), null))), null))), new sc_Pair("\u1e9cequal", new sc_Pair(new sc_Pair("\u1e9cremainder", new sc_Pair(new sc_Pair("\u1e9ctimes", new sc_Pair("\u1e9cy", new sc_Pair("\u1e9cx", null))), new sc_Pair("\u1e9cy", null))), new sc_Pair(new sc_Pair("\u1e9czero", null), null))), new sc_Pair("\u1e9cequal",
        new sc_Pair(new sc_Pair("\u1e9cequal", new sc_Pair(new sc_Pair("\u1e9ctimes", new sc_Pair("\u1e9ca", new sc_Pair("\u1e9cb", null))), new sc_Pair(1, null))), new sc_Pair(sc_list("\u1e9cand", new sc_Pair("\u1e9cnot", new sc_Pair(new sc_Pair("\u1e9cequal", new sc_Pair("\u1e9ca", new sc_Pair(new sc_Pair("\u1e9czero", null), null))), null)), new sc_Pair("\u1e9cnot", new sc_Pair(new sc_Pair("\u1e9cequal", new sc_Pair("\u1e9cb", new sc_Pair(new sc_Pair("\u1e9czero", null), null))), null)), new sc_Pair("\u1e9cnumberp",
            new sc_Pair("\u1e9ca", null)), new sc_Pair("\u1e9cnumberp", new sc_Pair("\u1e9cb", null)), new sc_Pair("\u1e9cequal", new sc_Pair(new sc_Pair("\u1e9csub1", new sc_Pair("\u1e9ca", null)), new sc_Pair(new sc_Pair("\u1e9czero", null), null))), new sc_Pair("\u1e9cequal", new sc_Pair(new sc_Pair("\u1e9csub1", new sc_Pair("\u1e9cb", null)), new sc_Pair(new sc_Pair("\u1e9czero", null), null)))), null))), new sc_Pair("\u1e9cequal", new sc_Pair(new sc_Pair("\u1e9clessp", new sc_Pair(new sc_Pair("\u1e9clength",
        new sc_Pair(new sc_Pair("\u1e9cdelete", new sc_Pair("\u1e9cx", new sc_Pair("\u1e9cl", null))), null)), new sc_Pair(new sc_Pair("\u1e9clength", new sc_Pair("\u1e9cl", null)), null))), new sc_Pair(new sc_Pair("\u1e9cmember", new sc_Pair("\u1e9cx", new sc_Pair("\u1e9cl", null))), null))), new sc_Pair("\u1e9cequal", new sc_Pair(new sc_Pair("\u1e9csort2", new sc_Pair(new sc_Pair("\u1e9cdelete", new sc_Pair("\u1e9cx", new sc_Pair("\u1e9cl", null))), null)), new sc_Pair(new sc_Pair("\u1e9cdelete", new sc_Pair("\u1e9cx",
        new sc_Pair(new sc_Pair("\u1e9csort2", new sc_Pair("\u1e9cl", null)), null))), null))), new sc_Pair("\u1e9cequal", new sc_Pair(new sc_Pair("\u1e9cdsort", new sc_Pair("\u1e9cx", null)), new sc_Pair(new sc_Pair("\u1e9csort2", new sc_Pair("\u1e9cx", null)), null))), new sc_Pair("\u1e9cequal", new sc_Pair(new sc_Pair("\u1e9clength", new sc_Pair(new sc_Pair("\u1e9ccons", new sc_Pair("\u1e9cx1", new sc_Pair(new sc_Pair("\u1e9ccons", new sc_Pair("\u1e9cx2", new sc_Pair(new sc_Pair("\u1e9ccons", new sc_Pair("\u1e9cx3",
        new sc_Pair(new sc_Pair("\u1e9ccons", new sc_Pair("\u1e9cx4", new sc_Pair(new sc_Pair("\u1e9ccons", new sc_Pair("\u1e9cx5", new sc_Pair(new sc_Pair("\u1e9ccons", new sc_Pair("\u1e9cx6", new sc_Pair("\u1e9cx7", null))), null))), null))), null))), null))), null))), null)), new sc_Pair(new sc_Pair("\u1e9cplus", new sc_Pair(6, new sc_Pair(new sc_Pair("\u1e9clength", new sc_Pair("\u1e9cx7", null)), null))), null))), new sc_Pair("\u1e9cequal", new sc_Pair(new sc_Pair("\u1e9cdifference", new sc_Pair(new sc_Pair("\u1e9cadd1",
        new sc_Pair(new sc_Pair("\u1e9cadd1", new sc_Pair("\u1e9cx", null)), null)), new sc_Pair(2, null))), new sc_Pair(new sc_Pair("\u1e9cfix", new sc_Pair("\u1e9cx", null)), null))), new sc_Pair("\u1e9cequal", new sc_Pair(new sc_Pair("\u1e9cquotient", new sc_Pair(new sc_Pair("\u1e9cplus", new sc_Pair("\u1e9cx", new sc_Pair(new sc_Pair("\u1e9cplus", new sc_Pair("\u1e9cx", new sc_Pair("\u1e9cy", null))), null))), new sc_Pair(2, null))), new sc_Pair(new sc_Pair("\u1e9cplus", new sc_Pair("\u1e9cx", new sc_Pair(new sc_Pair("\u1e9cquotient",
        new sc_Pair("\u1e9cy", new sc_Pair(2, null))), null))), null))), new sc_Pair("\u1e9cequal", new sc_Pair(new sc_Pair("\u1e9csigma", new sc_Pair(new sc_Pair("\u1e9czero", null), new sc_Pair("\u1e9ci", null))), new sc_Pair(new sc_Pair("\u1e9cquotient", new sc_Pair(new sc_Pair("\u1e9ctimes", new sc_Pair("\u1e9ci", new sc_Pair(new sc_Pair("\u1e9cadd1", new sc_Pair("\u1e9ci", null)), null))), new sc_Pair(2, null))), null))), new sc_Pair("\u1e9cequal", new sc_Pair(new sc_Pair("\u1e9cplus", new sc_Pair("\u1e9cx",
        new sc_Pair(new sc_Pair("\u1e9cadd1", new sc_Pair("\u1e9cy", null)), null))), new sc_Pair(new sc_Pair("\u1e9cif", new sc_Pair(new sc_Pair("\u1e9cnumberp", new sc_Pair("\u1e9cy", null)), new sc_Pair(new sc_Pair("\u1e9cadd1", new sc_Pair(new sc_Pair("\u1e9cplus", new sc_Pair("\u1e9cx", new sc_Pair("\u1e9cy", null))), null)), new sc_Pair(new sc_Pair("\u1e9cadd1", new sc_Pair("\u1e9cx", null)), null)))), null))), new sc_Pair("\u1e9cequal", new sc_Pair(new sc_Pair("\u1e9cequal", new sc_Pair(new sc_Pair("\u1e9cdifference",
        new sc_Pair("\u1e9cx", new sc_Pair("\u1e9cy", null))), new sc_Pair(new sc_Pair("\u1e9cdifference", new sc_Pair("\u1e9cz", new sc_Pair("\u1e9cy", null))), null))), new sc_Pair(new sc_Pair("\u1e9cif", new sc_Pair(new sc_Pair("\u1e9clessp", new sc_Pair("\u1e9cx", new sc_Pair("\u1e9cy", null))), new sc_Pair(new sc_Pair("\u1e9cnot", new sc_Pair(new sc_Pair("\u1e9clessp", new sc_Pair("\u1e9cy", new sc_Pair("\u1e9cz", null))), null)), new sc_Pair(new sc_Pair("\u1e9cif", new sc_Pair(new sc_Pair("\u1e9clessp",
        new sc_Pair("\u1e9cz", new sc_Pair("\u1e9cy", null))), new sc_Pair(new sc_Pair("\u1e9cnot", new sc_Pair(new sc_Pair("\u1e9clessp", new sc_Pair("\u1e9cy", new sc_Pair("\u1e9cx", null))), null)), new sc_Pair(new sc_Pair("\u1e9cequal", new sc_Pair(new sc_Pair("\u1e9cfix", new sc_Pair("\u1e9cx", null)), new sc_Pair(new sc_Pair("\u1e9cfix", new sc_Pair("\u1e9cz", null)), null))), null)))), null)))), null))), new sc_Pair("\u1e9cequal", new sc_Pair(new sc_Pair("\u1e9cmeaning", new sc_Pair(new sc_Pair("\u1e9cplus-tree",
        new sc_Pair(new sc_Pair("\u1e9cdelete", new sc_Pair("\u1e9cx", new sc_Pair("\u1e9cy", null))), null)), new sc_Pair("\u1e9ca", null))), new sc_Pair(new sc_Pair("\u1e9cif", new sc_Pair(new sc_Pair("\u1e9cmember", new sc_Pair("\u1e9cx", new sc_Pair("\u1e9cy", null))), new sc_Pair(new sc_Pair("\u1e9cdifference", new sc_Pair(new sc_Pair("\u1e9cmeaning", new sc_Pair(new sc_Pair("\u1e9cplus-tree", new sc_Pair("\u1e9cy", null)), new sc_Pair("\u1e9ca", null))), new sc_Pair(new sc_Pair("\u1e9cmeaning", new sc_Pair("\u1e9cx",
        new sc_Pair("\u1e9ca", null))), null))), new sc_Pair(new sc_Pair("\u1e9cmeaning", new sc_Pair(new sc_Pair("\u1e9cplus-tree", new sc_Pair("\u1e9cy", null)), new sc_Pair("\u1e9ca", null))), null)))), null))), new sc_Pair("\u1e9cequal", new sc_Pair(new sc_Pair("\u1e9ctimes", new sc_Pair("\u1e9cx", new sc_Pair(new sc_Pair("\u1e9cadd1", new sc_Pair("\u1e9cy", null)), null))), new sc_Pair(new sc_Pair("\u1e9cif", new sc_Pair(new sc_Pair("\u1e9cnumberp", new sc_Pair("\u1e9cy", null)), new sc_Pair(new sc_Pair("\u1e9cplus",
        new sc_Pair("\u1e9cx", new sc_Pair(new sc_Pair("\u1e9ctimes", new sc_Pair("\u1e9cx", new sc_Pair("\u1e9cy", null))), null))), new sc_Pair(new sc_Pair("\u1e9cfix", new sc_Pair("\u1e9cx", null)), null)))), null))), new sc_Pair("\u1e9cequal", new sc_Pair(new sc_Pair("\u1e9cnth", new sc_Pair(new sc_Pair("\u1e9cnil", null), new sc_Pair("\u1e9ci", null))), new sc_Pair(new sc_Pair("\u1e9cif", new sc_Pair(new sc_Pair("\u1e9czerop", new sc_Pair("\u1e9ci", null)), new sc_Pair(new sc_Pair("\u1e9cnil", null),
        new sc_Pair(new sc_Pair("\u1e9czero", null), null)))), null))), new sc_Pair("\u1e9cequal", new sc_Pair(new sc_Pair("\u1e9clast", new sc_Pair(new sc_Pair("\u1e9cappend", new sc_Pair("\u1e9ca", new sc_Pair("\u1e9cb", null))), null)), new sc_Pair(new sc_Pair("\u1e9cif", new sc_Pair(new sc_Pair("\u1e9clistp", new sc_Pair("\u1e9cb", null)), new sc_Pair(new sc_Pair("\u1e9clast", new sc_Pair("\u1e9cb", null)), new sc_Pair(new sc_Pair("\u1e9cif", new sc_Pair(new sc_Pair("\u1e9clistp", new sc_Pair("\u1e9ca",
        null)), new sc_Pair(new sc_Pair("\u1e9ccons", new sc_Pair(new sc_Pair("\u1e9ccar", new sc_Pair(new sc_Pair("\u1e9clast", new sc_Pair("\u1e9ca", null)), null)), new sc_Pair("\u1e9cb", null))), new sc_Pair("\u1e9cb", null)))), null)))), null))), new sc_Pair("\u1e9cequal", new sc_Pair(new sc_Pair("\u1e9cequal", new sc_Pair(new sc_Pair("\u1e9clessp", new sc_Pair("\u1e9cx", new sc_Pair("\u1e9cy", null))), new sc_Pair("\u1e9cz", null))), new sc_Pair(new sc_Pair("\u1e9cif", new sc_Pair(new sc_Pair("\u1e9clessp",
        new sc_Pair("\u1e9cx", new sc_Pair("\u1e9cy", null))), new sc_Pair(new sc_Pair("\u1e9cequal", new sc_Pair(new sc_Pair("\u1e9ct", null), new sc_Pair("\u1e9cz", null))), new sc_Pair(new sc_Pair("\u1e9cequal", new sc_Pair(new sc_Pair("\u1e9cf", null), new sc_Pair("\u1e9cz", null))), null)))), null))), new sc_Pair("\u1e9cequal", new sc_Pair(new sc_Pair("\u1e9cassignment", new sc_Pair("\u1e9cx", new sc_Pair(new sc_Pair("\u1e9cappend", new sc_Pair("\u1e9ca", new sc_Pair("\u1e9cb", null))), null))), new sc_Pair(new sc_Pair("\u1e9cif",
        new sc_Pair(new sc_Pair("\u1e9cassignedp", new sc_Pair("\u1e9cx", new sc_Pair("\u1e9ca", null))), new sc_Pair(new sc_Pair("\u1e9cassignment", new sc_Pair("\u1e9cx", new sc_Pair("\u1e9ca", null))), new sc_Pair(new sc_Pair("\u1e9cassignment", new sc_Pair("\u1e9cx", new sc_Pair("\u1e9cb", null))), null)))), null))), new sc_Pair("\u1e9cequal", new sc_Pair(new sc_Pair("\u1e9ccar", new sc_Pair(new sc_Pair("\u1e9cgopher", new sc_Pair("\u1e9cx", null)), null)), new sc_Pair(new sc_Pair("\u1e9cif", new sc_Pair(new sc_Pair("\u1e9clistp",
        new sc_Pair("\u1e9cx", null)), new sc_Pair(new sc_Pair("\u1e9ccar", new sc_Pair(new sc_Pair("\u1e9cflatten", new sc_Pair("\u1e9cx", null)), null)), new sc_Pair(new sc_Pair("\u1e9czero", null), null)))), null))), new sc_Pair("\u1e9cequal", new sc_Pair(new sc_Pair("\u1e9cflatten", new sc_Pair(new sc_Pair("\u1e9ccdr", new sc_Pair(new sc_Pair("\u1e9cgopher", new sc_Pair("\u1e9cx", null)), null)), null)), new sc_Pair(new sc_Pair("\u1e9cif", new sc_Pair(new sc_Pair("\u1e9clistp", new sc_Pair("\u1e9cx",
        null)), new sc_Pair(new sc_Pair("\u1e9ccdr", new sc_Pair(new sc_Pair("\u1e9cflatten", new sc_Pair("\u1e9cx", null)), null)), new sc_Pair(new sc_Pair("\u1e9ccons", new sc_Pair(new sc_Pair("\u1e9czero", null), new sc_Pair(new sc_Pair("\u1e9cnil", null), null))), null)))), null))), new sc_Pair("\u1e9cequal", new sc_Pair(new sc_Pair("\u1e9cquotient", new sc_Pair(new sc_Pair("\u1e9ctimes", new sc_Pair("\u1e9cy", new sc_Pair("\u1e9cx", null))), new sc_Pair("\u1e9cy", null))), new sc_Pair(new sc_Pair("\u1e9cif",
        new sc_Pair(new sc_Pair("\u1e9czerop", new sc_Pair("\u1e9cy", null)), new sc_Pair(new sc_Pair("\u1e9czero", null), new sc_Pair(new sc_Pair("\u1e9cfix", new sc_Pair("\u1e9cx", null)), null)))), null))), new sc_Pair("\u1e9cequal", new sc_Pair(new sc_Pair("\u1e9cget", new sc_Pair("\u1e9cj", new sc_Pair(new sc_Pair("\u1e9cset", new sc_Pair("\u1e9ci", new sc_Pair("\u1e9cval", new sc_Pair("\u1e9cmem", null)))), null))), new sc_Pair(new sc_Pair("\u1e9cif", new sc_Pair(new sc_Pair("\u1e9ceqp", new sc_Pair("\u1e9cj",
        new sc_Pair("\u1e9ci", null))), new sc_Pair("\u1e9cval", new sc_Pair(new sc_Pair("\u1e9cget", new sc_Pair("\u1e9cj", new sc_Pair("\u1e9cmem", null))), null)))), null))));
const_nboyer = new sc_Pair(new sc_Pair("\u1e9cx", new sc_Pair("\u1e9cf", new sc_Pair(new sc_Pair("\u1e9cplus", new sc_Pair(new sc_Pair("\u1e9cplus", new sc_Pair("\u1e9ca", new sc_Pair("\u1e9cb", null))), new sc_Pair(new sc_Pair("\u1e9cplus", new sc_Pair("\u1e9cc", new sc_Pair(new sc_Pair("\u1e9czero", null), null))), null))), null))), new sc_Pair(new sc_Pair("\u1e9cy", new sc_Pair("\u1e9cf", new sc_Pair(new sc_Pair("\u1e9ctimes", new sc_Pair(new sc_Pair("\u1e9ctimes", new sc_Pair("\u1e9ca", new sc_Pair("\u1e9cb",
    null))), new sc_Pair(new sc_Pair("\u1e9cplus", new sc_Pair("\u1e9cc", new sc_Pair("\u1e9cd", null))), null))), null))), new sc_Pair(new sc_Pair("\u1e9cz", new sc_Pair("\u1e9cf", new sc_Pair(new sc_Pair("\u1e9creverse", new sc_Pair(new sc_Pair("\u1e9cappend", new sc_Pair(new sc_Pair("\u1e9cappend", new sc_Pair("\u1e9ca", new sc_Pair("\u1e9cb", null))), new sc_Pair(new sc_Pair("\u1e9cnil", null), null))), null)), null))), new sc_Pair(new sc_Pair("\u1e9cu", new sc_Pair("\u1e9cequal", new sc_Pair(new sc_Pair("\u1e9cplus",
    new sc_Pair("\u1e9ca", new sc_Pair("\u1e9cb", null))), new sc_Pair(new sc_Pair("\u1e9cdifference", new sc_Pair("\u1e9cx", new sc_Pair("\u1e9cy", null))), null)))), new sc_Pair(new sc_Pair("\u1e9cw", new sc_Pair("\u1e9clessp", new sc_Pair(new sc_Pair("\u1e9cremainder", new sc_Pair("\u1e9ca", new sc_Pair("\u1e9cb", null))), new sc_Pair(new sc_Pair("\u1e9cmember", new sc_Pair("\u1e9ca", new sc_Pair(new sc_Pair("\u1e9clength", new sc_Pair("\u1e9cb", null)), null))), null)))), null)))));
/**
 * @return {?}
 */
BgL_nboyerzd2benchmarkzd2 = function() {
    /** @type {null} */
    var current = null;
    /** @type {number} */
    var elementArgumentPos = arguments.length - 1;
    for (;elementArgumentPos >= 0;elementArgumentPos--) {
        current = sc_cons(arguments[elementArgumentPos], current);
    }
    var r20;
    return r20 = current === null ? 0 : current.car, BgL_setupzd2boyerzd2(), BgL_runzd2benchmarkzd2("nboyer" + sc_number2string(r20), 1, function() {
        return BgL_testzd2boyerzd2(r20);
    }, function(dataAndEvents) {
        if (sc_isNumber(dataAndEvents)) {
            switch(r20) {
                case 0:
                    return dataAndEvents === 95024;
                    break;
                case 1:
                    return dataAndEvents === 591777;
                    break;
                case 2:
                    return dataAndEvents === 1813975;
                    break;
                case 3:
                    return dataAndEvents === 5375678;
                    break;
                case 4:
                    return dataAndEvents === 16445406;
                    break;
                case 5:
                    return dataAndEvents === 51507739;
                    break;
                default:
                    return true;
                    break;
            }
        } else {
            return false;
        }
    });
};
/**
 * @return {?}
 */
BgL_setupzd2boyerzd2 = function() {
    return true;
};
/**
 * @return {?}
 */
BgL_testzd2boyerzd2 = function() {
    return true;
};
/**
 * @param {number} b
 * @return {?}
 */
translate_term_nboyer = function(b) {
    var a;
    return!(b instanceof sc_Pair) ? b : new sc_Pair(BgL_sc_symbolzd2ze3symbolzd2record_1ze3_nboyer(b.car), (a = b.cdr, a === null ? null : new sc_Pair(translate_term_nboyer(a.car), translate_args_nboyer(a.cdr))));
};
/**
 * @param {?} b
 * @return {?}
 */
translate_args_nboyer = function(b) {
    var a;
    var cell;
    return b === null ? null : new sc_Pair((cell = b.car, !(cell instanceof sc_Pair) ? cell : new sc_Pair(BgL_sc_symbolzd2ze3symbolzd2record_1ze3_nboyer(cell.car), translate_args_nboyer(cell.cdr))), (a = b.cdr, a === null ? null : new sc_Pair(translate_term_nboyer(a.car), translate_args_nboyer(a.cdr))));
};
/**
 * @param {?} obj
 * @return {?}
 */
untranslate_term_nboyer = function(obj) {
    var _j;
    var cdr;
    var args;
    var cells;
    var x;
    if (!(obj instanceof sc_Pair)) {
        return obj;
    } else {
        cells = new sc_Pair(null, null);
        args = obj.cdr;
        cdr = cells;
        for (;!(args === null);) {
            cdr.cdr = new sc_Pair(untranslate_term_nboyer(args.car), null);
            cdr = cdr.cdr;
            args = args.cdr;
        }
        _j = cells.cdr;
        return new sc_Pair((x = obj.car, x[0]), _j);
    }
};
/**
 * @param {string} deepDataAndEvents
 * @return {?}
 */
BgL_sc_symbolzd2ze3symbolzd2record_1ze3_nboyer = function(deepDataAndEvents) {
    var r;
    var cdr;
    return cdr = sc_assq(deepDataAndEvents, BgL_sc_za2symbolzd2recordszd2alistza2_2z00_nboyer), cdr !== false ? cdr.cdr : (r = [deepDataAndEvents, null], BgL_sc_za2symbolzd2recordszd2alistza2_2z00_nboyer = new sc_Pair(new sc_Pair(deepDataAndEvents, r), BgL_sc_za2symbolzd2recordszd2alistza2_2z00_nboyer), r);
};
/** @type {null} */
BgL_sc_za2symbolzd2recordszd2alistza2_2z00_nboyer = null;
/**
 * @param {?} cells
 * @return {?}
 */
translate_alist_nboyer = function(cells) {
    var pair;
    var cdr;
    return cells === null ? null : new sc_Pair(new sc_Pair(cells.car.car, (cdr = cells.car.cdr, !(cdr instanceof sc_Pair) ? cdr : new sc_Pair(BgL_sc_symbolzd2ze3symbolzd2record_1ze3_nboyer(cdr.car), translate_args_nboyer(cdr.cdr)))), (pair = cells.cdr, pair === null ? null : new sc_Pair(new sc_Pair(pair.car.car, translate_term_nboyer(pair.car.cdr)), translate_alist_nboyer(pair.cdr))));
};
/**
 * @param {?} deepDataAndEvents
 * @param {?} a
 * @return {?}
 */
apply_subst_nboyer = function(deepDataAndEvents, a) {
    var c;
    var b;
    return!(a instanceof sc_Pair) ? (b = sc_assq(a, deepDataAndEvents), b !== false ? b.cdr : a) : new sc_Pair(a.car, (c = a.cdr, c === null ? null : new sc_Pair(apply_subst_nboyer(deepDataAndEvents, c.car), apply_subst_lst_nboyer(deepDataAndEvents, c.cdr))));
};
/**
 * @param {?} deepDataAndEvents
 * @param {?} b
 * @return {?}
 */
apply_subst_lst_nboyer = function(deepDataAndEvents, b) {
    var a;
    return b === null ? null : new sc_Pair(apply_subst_nboyer(deepDataAndEvents, b.car), (a = b.cdr, a === null ? null : new sc_Pair(apply_subst_nboyer(deepDataAndEvents, a.car), apply_subst_lst_nboyer(deepDataAndEvents, a.cdr))));
};
/**
 * @param {Object} dataAndEvents
 * @param {Object} isXML
 * @param {Object} until
 * @return {?}
 */
tautologyp_nboyer = function(dataAndEvents, isXML, until) {
    var value;
    var deepDataAndEvents;
    var x;
    var j;
    var duration;
    var stored;
    for (;true;) {
        if ((stored = is_term_equal_nboyer(dataAndEvents, true_term_nboyer), stored !== false ? stored : is_term_member_nboyer(dataAndEvents, isXML)) !== false) {
            return true;
        } else {
            if ((duration = is_term_equal_nboyer(dataAndEvents, false_term_nboyer), duration !== false ? duration : is_term_member_nboyer(dataAndEvents, until)) !== false) {
                return false;
            } else {
                if (!(dataAndEvents instanceof sc_Pair)) {
                    return false;
                } else {
                    if (dataAndEvents.car === if_constructor_nboyer) {
                        if ((j = dataAndEvents.cdr.car, x = is_term_equal_nboyer(j, true_term_nboyer), x !== false ? x : is_term_member_nboyer(j, isXML)) !== false) {
                            dataAndEvents = dataAndEvents.cdr.cdr.car;
                        } else {
                            if ((deepDataAndEvents = dataAndEvents.cdr.car, value = is_term_equal_nboyer(deepDataAndEvents, false_term_nboyer), value !== false ? value : is_term_member_nboyer(deepDataAndEvents, until)) !== false) {
                                dataAndEvents = dataAndEvents.cdr.cdr.cdr.car;
                            } else {
                                if (tautologyp_nboyer(dataAndEvents.cdr.cdr.car, new sc_Pair(dataAndEvents.cdr.car, isXML), until) !== false) {
                                    until = new sc_Pair(dataAndEvents.cdr.car, until);
                                    dataAndEvents = dataAndEvents.cdr.cdr.cdr.car;
                                } else {
                                    return false;
                                }
                            }
                        }
                    } else {
                        return false;
                    }
                }
            }
        }
    }
};
/** @type {string} */
if_constructor_nboyer = "\u1e9c*";
/** @type {number} */
rewrite_count_nboyer = 0;
/**
 * @param {?} obj
 * @return {?}
 */
rewrite_nboyer = function(obj) {
    var dataAndEvents;
    var deepDataAndEvents;
    var pair;
    var x;
    var args;
    ++rewrite_count_nboyer;
    if (!(obj instanceof sc_Pair)) {
        return obj;
    } else {
        deepDataAndEvents = new sc_Pair(obj.car, (args = obj.cdr, args === null ? null : new sc_Pair(rewrite_nboyer(args.car), rewrite_args_nboyer(args.cdr))));
        pair = (x = obj.car, x[1]);
        for (;true;) {
            if (pair === null) {
                return deepDataAndEvents;
            } else {
                if ((dataAndEvents = pair.car.cdr.car, unify_subst_nboyer = null, one_way_unify1_nboyer(deepDataAndEvents, dataAndEvents)) !== false) {
                    return rewrite_nboyer(apply_subst_nboyer(unify_subst_nboyer, pair.car.cdr.cdr.car));
                } else {
                    pair = pair.cdr;
                }
            }
        }
    }
};
/**
 * @param {?} b
 * @return {?}
 */
rewrite_args_nboyer = function(b) {
    var a;
    return b === null ? null : new sc_Pair(rewrite_nboyer(b.car), (a = b.cdr, a === null ? null : new sc_Pair(rewrite_nboyer(a.car), rewrite_args_nboyer(a.cdr))));
};
/** @type {string} */
unify_subst_nboyer = "\u1e9c*";
/**
 * @param {?} deepDataAndEvents
 * @param {?} dataAndEvents
 * @return {?}
 */
one_way_unify1_nboyer = function(deepDataAndEvents, dataAndEvents) {
    var cdr;
    var b;
    var cells;
    if (!(dataAndEvents instanceof sc_Pair)) {
        cells = sc_assq(dataAndEvents, unify_subst_nboyer);
        if (cells !== false) {
            return is_term_equal_nboyer(deepDataAndEvents, cells.cdr);
        } else {
            if (sc_isNumber(dataAndEvents)) {
                return sc_isEqual(deepDataAndEvents, dataAndEvents);
            } else {
                unify_subst_nboyer = new sc_Pair(new sc_Pair(dataAndEvents, deepDataAndEvents), unify_subst_nboyer);
                return true;
            }
        }
    } else {
        if (!(deepDataAndEvents instanceof sc_Pair)) {
            return false;
        } else {
            if (deepDataAndEvents.car === dataAndEvents.car) {
                cdr = deepDataAndEvents.cdr;
                b = dataAndEvents.cdr;
                for (;true;) {
                    if (cdr === null) {
                        return b === null;
                    } else {
                        if (b === null) {
                            return false;
                        } else {
                            if (one_way_unify1_nboyer(cdr.car, b.car) !== false) {
                                cdr = cdr.cdr;
                                b = b.cdr;
                            } else {
                                return false;
                            }
                        }
                    }
                }
            } else {
                return false;
            }
        }
    }
};
/** @type {string} */
false_term_nboyer = "\u1e9c*";
/** @type {string} */
true_term_nboyer = "\u1e9c*";
/**
 * @param {number} deepDataAndEvents
 * @return {?}
 */
trans_of_implies1_nboyer = function(deepDataAndEvents) {
    var r20;
    return sc_isEqual(deepDataAndEvents, 1) ? sc_list("\u1e9cimplies", 0, 1) : sc_list("\u1e9cand", sc_list("\u1e9cimplies", deepDataAndEvents - 1, deepDataAndEvents), (r20 = deepDataAndEvents - 1, sc_isEqual(r20, 1) ? sc_list("\u1e9cimplies", 0, 1) : sc_list("\u1e9cand", sc_list("\u1e9cimplies", r20 - 1, r20), trans_of_implies1_nboyer(r20 - 1))));
};
/**
 * @param {?} deepDataAndEvents
 * @param {?} dataAndEvents
 * @return {?}
 */
is_term_equal_nboyer = function(deepDataAndEvents, dataAndEvents) {
    var cdr;
    var args;
    var b;
    var a;
    if (deepDataAndEvents instanceof sc_Pair) {
        if (dataAndEvents instanceof sc_Pair) {
            if ((a = deepDataAndEvents.car, b = dataAndEvents.car, a === b) !== false) {
                cdr = deepDataAndEvents.cdr;
                args = dataAndEvents.cdr;
                for (;true;) {
                    if (cdr === null) {
                        return args === null;
                    } else {
                        if (args === null) {
                            return false;
                        } else {
                            if (is_term_equal_nboyer(cdr.car, args.car) !== false) {
                                cdr = cdr.cdr;
                                args = args.cdr;
                            } else {
                                return false;
                            }
                        }
                    }
                }
            } else {
                return false;
            }
        } else {
            return false;
        }
    } else {
        return sc_isEqual(deepDataAndEvents, dataAndEvents);
    }
};
/**
 * @param {?} deepDataAndEvents
 * @param {Object} value
 * @return {?}
 */
is_term_member_nboyer = function(deepDataAndEvents, value) {
    for (;true;) {
        if (value === null) {
            return false;
        } else {
            if (is_term_equal_nboyer(deepDataAndEvents, value.car) !== false) {
                return true;
            } else {
                value = value.cdr;
            }
        }
    }
};
/**
 * @return {?}
 */
BgL_setupzd2boyerzd2 = function() {
    var result;
    var style;
    var nDigit;
    var cDigit;
    var radixToPower;
    var cells;
    var cdr;
    var args;
    var cons;
    /** @type {null} */
    BgL_sc_za2symbolzd2recordszd2alistza2_2z00_nboyer = null;
    if_constructor_nboyer = BgL_sc_symbolzd2ze3symbolzd2record_1ze3_nboyer("\u1e9cif");
    false_term_nboyer = (cons = new sc_Pair("\u1e9cf", null), !(cons instanceof sc_Pair) ? cons : new sc_Pair(BgL_sc_symbolzd2ze3symbolzd2record_1ze3_nboyer(cons.car), translate_args_nboyer(cons.cdr)));
    true_term_nboyer = (args = new sc_Pair("\u1e9ct", null), !(args instanceof sc_Pair) ? args : new sc_Pair(BgL_sc_symbolzd2ze3symbolzd2record_1ze3_nboyer(args.car), translate_args_nboyer(args.cdr)));
    cdr = sc_const_3_nboyer;
    for (;!(cdr === null);) {
        cells = cdr.car;
        if (cells instanceof sc_Pair && (cells.car === "\u1e9cequal" && cells.cdr.car instanceof sc_Pair)) {
            radixToPower = cells.cdr.car.car;
            style = new sc_Pair(!(cells instanceof sc_Pair) ? cells : new sc_Pair(BgL_sc_symbolzd2ze3symbolzd2record_1ze3_nboyer(cells.car), translate_args_nboyer(cells.cdr)), (cDigit = cells.cdr.car.car, nDigit = BgL_sc_symbolzd2ze3symbolzd2record_1ze3_nboyer(cDigit), nDigit[1]));
            result = BgL_sc_symbolzd2ze3symbolzd2record_1ze3_nboyer(radixToPower);
            result[1] = style;
        } else {
            sc_error("ADD-LEMMA did not like term:  ", cells);
        }
        cdr = cdr.cdr;
    }
    return true;
};
/**
 * @param {(number|string)} textAlt
 * @return {?}
 */
BgL_testzd2boyerzd2 = function(textAlt) {
    var old;
    var serverAttrs;
    var text;
    var answer;
    var suiteView;
    var expr;
    /** @type {number} */
    rewrite_count_nboyer = 0;
    serverAttrs = sc_const_4_nboyer;
    /** @type {(number|string)} */
    text = textAlt;
    for (;!(text === 0);) {
        serverAttrs = sc_list("\u1e9cor", serverAttrs, new sc_Pair("\u1e9cf", null));
        --text;
    }
    expr = serverAttrs;
    if (!(expr instanceof sc_Pair)) {
        old = expr;
    } else {
        old = new sc_Pair(BgL_sc_symbolzd2ze3symbolzd2record_1ze3_nboyer(expr.car), translate_args_nboyer(expr.cdr));
    }
    suiteView = apply_subst_nboyer(const_nboyer === null ? null : new sc_Pair(new sc_Pair(const_nboyer.car.car, translate_term_nboyer(const_nboyer.car.cdr)), translate_alist_nboyer(const_nboyer.cdr)), old);
    answer = tautologyp_nboyer(rewrite_nboyer(suiteView), null, null);
    sc_write(rewrite_count_nboyer);
    sc_display(" rewrites");
    sc_newline();
    if (answer !== false) {
        return rewrite_count_nboyer;
    } else {
        return false;
    }
};
var BgL_parsezd2ze3nbzd2treesze3;
var BgL_earleyzd2benchmarkzd2;
var BgL_parsezd2ze3parsedzf3zc2;
var test;
var BgL_parsezd2ze3treesz31;
var BgL_makezd2parserzd2;
var const_earley;
const_earley = new sc_Pair(new sc_Pair("\u1e9cs", new sc_Pair(new sc_Pair("\u1e9ca", null), new sc_Pair(new sc_Pair("\u1e9cs", new sc_Pair("\u1e9cs", null)), null))), null);
/**
 * @param {(Error|string)} args
 * @param {Function} ID
 * @return {?}
 */
BgL_makezd2parserzd2 = function(args, ID) {
    var i;
    var fields;
    var callback;
    var k;
    var dest;
    var ret;
    var obj;
    var msg;
    var data;
    var name;
    var mat;
    var array;
    var sourceKeys;
    var type;
    var tmp;
    var dataAndEvents;
    var promise;
    var source;
    var list;
    var tokenize;
    var clone;
    /**
     * @param {?} dataAndEvents
     * @param {Array} events
     * @return {?}
     */
    clone = function(dataAndEvents, events) {
        var b;
        /** @type {number} */
        b = events.length - 1;
        for (;true;) {
            if (b >= 0) {
                if (sc_isEqual(events[b], dataAndEvents)) {
                    return b;
                } else {
                    --b;
                }
            } else {
                return false;
            }
        }
    };
    list = (tokenize = function(args, isXML) {
        var token;
        var x;
        var obj;
        return args instanceof sc_Pair ? (obj = args.car, x = obj.car, token = function(value, isXML) {
            var x;
            var b;
            var ret;
            var ln;
            if (value instanceof sc_Pair) {
                ln = value.car;
                b = ln;
                /** @type {number} */
                ret = isXML;
                for (;b instanceof sc_Pair;) {
                    x = b.car;
                    b = b.cdr;
                    ret = sc_member(x, ret) !== false ? ret : new sc_Pair(x, ret);
                }
                return token(value.cdr, ret);
            } else {
                return tokenize(args.cdr, isXML);
            }
        }, token(obj.cdr, sc_member(x, isXML) !== false ? isXML : new sc_Pair(x, isXML))) : sc_list2vector(sc_reverse(isXML));
    }, tokenize(args, null));
    source = list.length;
    dataAndEvents = (promise = function(obj, deepDataAndEvents) {
        var resolve;
        var cell;
        return obj instanceof sc_Pair ? (cell = obj.car, resolve = function(a, deepDataAndEvents) {
            var cdr;
            var file;
            var ln;
            if (a instanceof sc_Pair) {
                ln = a.car;
                cdr = ln;
                /** @type {number} */
                file = deepDataAndEvents;
                for (;cdr instanceof sc_Pair;) {
                    cdr = cdr.cdr;
                    ++file;
                }
                return resolve(a.cdr, file + 1);
            } else {
                return promise(obj.cdr, deepDataAndEvents);
            }
        }, resolve(cell.cdr, deepDataAndEvents)) : deepDataAndEvents;
    }, promise(args, 0)) + source;
    tmp = sc_makeVector(source, null);
    type = sc_makeVector(source, null);
    sourceKeys = sc_makeVector(source, null);
    array = sc_makeVector(dataAndEvents, false);
    mat = sc_makeVector(dataAndEvents, false);
    name = list;
    data = tmp;
    msg = type;
    obj = sourceKeys;
    ret = array;
    dest = mat;
    k = list.length;
    /** @type {number} */
    i = k - 1;
    for (;i >= 0;) {
        /** @type {number} */
        array[i] = i - k;
        mat[i] = sc_list(list[i], 0);
        type[i] = sc_list(i);
        --i;
    }
    /**
     * @param {?} args
     * @param {number} key
     * @return {?}
     */
    callback = function(args, key) {
        var equal;
        var x;
        var obj;
        return args instanceof sc_Pair ? (obj = args.car, x = obj.car, equal = function(a, key, message) {
            var item;
            var val;
            var node;
            var list;
            var i;
            var ok;
            var l;
            if (a instanceof sc_Pair) {
                l = a.car;
                dest[key] = sc_list(x, message);
                ok = clone(x, name);
                data[ok] = new sc_Pair(key, data[ok]);
                list = l;
                /** @type {number} */
                i = key;
                for (;list instanceof sc_Pair;) {
                    node = list.car;
                    ret[i] = clone(node, name);
                    val = clone(node, name);
                    obj[val] = new sc_Pair(i, obj[val]);
                    list = list.cdr;
                    ++i;
                }
                /** @type {number} */
                ret[i] = clone(x, name) - k;
                item = clone(x, name);
                msg[item] = new sc_Pair(i, msg[item]);
                return equal(a.cdr, i + 1, message + 1);
            } else {
                return callback(args.cdr, key);
            }
        }, equal(obj.cdr, key, 1)) : undefined;
    };
    callback(args, list.length);
    /** @type {Array} */
    fields = [ID, list, tmp, type, sourceKeys, array, mat];
    return function(walkers) {
        var id;
        var value;
        var val;
        var obj;
        var test;
        var lines;
        var lastMatches;
        var e;
        var data;
        var src;
        var klass;
        var prototype;
        var openElement;
        var key;
        var callback;
        var args;
        var pdataOld;
        var sel;
        var res;
        var cdr;
        var udataCur;
        var cell;
        var c;
        var templatePair;
        var func;
        var base;
        var len;
        var result;
        var match;
        var pdataCur;
        var element;
        var y;
        var d;
        var matches;
        var p;
        var rg;
        var tmp;
        var field;
        var item;
        var name;
        var expected;
        var HOP;
        var objEquiv;
        var lookAhead;
        var $;
        var isArray;
        var call;
        var prop;
        var off;
        var is;
        var proxy;
        var clone;
        var next;
        var push;
        var fn;
        var stream;
        /**
         * @param {?} dataAndEvents
         * @param {Array} b
         * @return {?}
         */
        objEquiv = function(dataAndEvents, b) {
            var bi;
            /** @type {number} */
            bi = b.length - 1;
            for (;true;) {
                if (bi >= 0) {
                    if (sc_isEqual(b[bi], dataAndEvents)) {
                        return bi;
                    } else {
                        --bi;
                    }
                } else {
                    return false;
                }
            }
        };
        /**
         * @param {number} match
         * @param {number} str
         * @return {?}
         */
        lookAhead = function(match, str) {
            var elem;
            var idx;
            var matches;
            matches = sc_makeVector(match + 1, false);
            /** @type {number} */
            idx = match;
            for (;idx >= 0;) {
                elem = sc_makeVector(str + 1, false);
                /** @type {number} */
                elem[0] = -1;
                matches[idx] = elem;
                --idx;
            }
            return matches;
        };
        /**
         * @param {?} arg
         * @param {number} keepData
         * @param {number} callback
         * @return {?}
         */
        $ = function(arg, keepData, callback) {
            var conf_set;
            var defaultValue;
            return defaultValue = arg[callback + 1], defaultValue !== false ? defaultValue : (conf_set = sc_makeVector(keepData + 6, false), conf_set[1] = -3, conf_set[2] = -1, conf_set[3] = -1, conf_set[4] = -1, arg[callback + 1] = conf_set, conf_set);
        };
        /**
         * @param {Array} val
         * @return {?}
         */
        isArray = function(val) {
            return val[val[1] + 5] = val[4], val[1] = val[3], val[3] = -1, val[4] = -1;
        };
        /**
         * @param {?} obj
         * @param {Array} o
         * @param {number} func
         * @param {number} prop
         * @return {?}
         */
        call = function(obj, o, func, prop) {
            var step;
            return step = o[3], o[prop + 5] = -1, o[step + 5] = prop, o[3] = prop, step < 0 ? (o[0] = obj[0], obj[0] = func) : undefined;
        };
        /**
         * @param {Object} n
         * @param {number} name
         * @param {(Object|string)} value
         * @param {number} i
         * @return {?}
         */
        prop = function(n, name, value, i) {
            var e;
            var callback;
            var args;
            var s;
            s = n[name];
            /** @type {(Object|string)} */
            args = value;
            for (;args instanceof sc_Pair;) {
                callback = args.car;
                e = $(s, name, callback);
                if (e[i + 5] === false) {
                    call(s, e, callback, i);
                    args = args.cdr;
                } else {
                    args = args.cdr;
                }
            }
            return undefined;
        };
        /**
         * @param {(Array|NodeList)} element
         * @param {(Array|NodeList)} obj
         * @param {number} name
         * @param {number} callback
         * @param {number} fn
         * @return {?}
         */
        off = function(element, obj, name, callback, fn) {
            var e;
            var s;
            var item;
            var items;
            return items = element[name], (item = items[callback + 1], item !== false ? item[fn + 5] : false) !== false ? (s = obj[name], e = $(s, name, callback), e[fn + 5] === false ? call(s, e, callback, fn) : undefined, true) : false;
        };
        /**
         * @param {?} node
         * @param {?} selector
         * @param {number} callback
         * @param {(number|string)} obj
         * @return {?}
         */
        is = function(node, selector, callback, obj) {
            var i;
            i = obj[2];
            for (;i >= 0;) {
                if (selector[i + 5] === false) {
                    call(node, selector, callback, i);
                    i = obj[i + 5];
                } else {
                    i = obj[i + 5];
                }
            }
            return undefined;
        };
        /**
         * @param {Object} e
         * @param {number} name
         * @param {Object} events
         * @param {Object} res
         * @param {?} spec
         * @param {Object} f
         * @param {string} obj
         * @return {?}
         */
        proxy = function(e, name, events, res, spec, f, obj) {
            var item;
            var restoreScript;
            var data;
            var x;
            var c;
            var result;
            var callback;
            var p;
            var get;
            var member;
            var lines;
            var key;
            var r;
            var error;
            var suiteView;
            var source;
            var i;
            var k;
            var j;
            var value;
            value = e[name];
            j = obj.length;
            for (;true;) {
                k = value[0];
                if (k >= 0) {
                    i = f[k];
                    source = value[k + 1];
                    member = source[4];
                    value[0] = source[0];
                    isArray(source);
                    if (i >= 0) {
                        p = events[i];
                        for (;p instanceof sc_Pair;) {
                            callback = p.car;
                            result = $(value, name, callback);
                            if (result[name + 5] === false) {
                                call(value, result, callback, name);
                                p = p.cdr;
                            } else {
                                p = p.cdr;
                            }
                        }
                        c = res[i];
                        for (;c instanceof sc_Pair;) {
                            x = c.car;
                            if ((data = value[x + 1], data !== false ? data[name + 5] : false) !== false) {
                                restoreScript = k + 1;
                                item = $(value, name, restoreScript);
                                is(value, item, restoreScript, source);
                                c = c.cdr;
                            } else {
                                c = c.cdr;
                            }
                        }
                    } else {
                        suiteView = spec[i + j];
                        /** @type {Object} */
                        error = e;
                        r = value;
                        /** @type {number} */
                        key = name;
                        lines = source;
                        /**
                         * @param {?} obj
                         * @return {?}
                         */
                        get = function(obj) {
                            var text;
                            var val;
                            var restoreScript;
                            var suiteView;
                            var line;
                            var x;
                            if (obj instanceof sc_Pair) {
                                x = obj.car;
                                line = member;
                                for (;line >= 0;) {
                                    suiteView = (text = error[line], text[x + 1]);
                                    if (suiteView !== false) {
                                        restoreScript = x + 1;
                                        val = $(r, key, restoreScript);
                                        is(r, val, restoreScript, suiteView);
                                    }
                                    line = lines[line + 5];
                                }
                                return get(obj.cdr);
                            } else {
                                return undefined;
                            }
                        };
                        get(suiteView);
                    }
                } else {
                    return undefined;
                }
            }
        };
        /**
         * @param {?} dataAndEvents
         * @param {number} type
         * @param {number} id
         * @param {Array} target
         * @param {Object} object
         * @param {Array} deepDataAndEvents
         * @return {?}
         */
        clone = function(dataAndEvents, type, id, target, object, deepDataAndEvents) {
            var obj;
            var _ref2;
            var car;
            var pair;
            var index;
            index = objEquiv(dataAndEvents, target);
            if (index !== false) {
                target.length;
                pair = object[index];
                for (;true;) {
                    if (pair instanceof sc_Pair) {
                        car = pair.car;
                        if ((_ref2 = deepDataAndEvents[id], obj = _ref2[car + 1], obj !== false ? obj[type + 5] : false) !== false) {
                            return true;
                        } else {
                            pair = pair.cdr;
                        }
                    } else {
                        return false;
                    }
                }
            } else {
                return false;
            }
        };
        /**
         * @param {number} event
         * @param {number} key
         * @param {number} name
         * @param {?} callback
         * @param {?} deepDataAndEvents
         * @param {Array} obj
         * @param {Array} er
         * @param {Array} item
         * @param {number} shallow
         * @return {?}
         */
        next = function(event, key, name, callback, deepDataAndEvents, obj, er, item, shallow) {
            var handler;
            var field;
            var _ref;
            return _ref = obj[event], _ref !== false ? event < shallow ? sc_list(sc_list(_ref, er[key].car)) : sc_list(sc_list(_ref)) : (field = event - 1, handler = function(a, isXML) {
                var callback;
                var object;
                var data;
                var e;
                for (;true;) {
                    if (a instanceof sc_Pair) {
                        e = a.car;
                        object = (data = item[name], data[e + 1]);
                        if (object !== false) {
                            /**
                             * @param {number} id
                             * @param {number} isXML
                             * @return {?}
                             */
                            callback = function(id, isXML) {
                                var equal;
                                var res;
                                var value;
                                var cache;
                                var data;
                                for (;true;) {
                                    if (id >= 0) {
                                        if (id >= key && (data = item[id], cache = data[field + 1], cache !== false ? cache[key + 5] : false) !== false) {
                                            value = next(field, key, id, callback, deepDataAndEvents, obj, er, item, shallow);
                                            res = next(e, id, name, callback, deepDataAndEvents, obj, er, item, shallow);
                                            /**
                                             * @param {?} a
                                             * @param {number} isXML
                                             * @return {?}
                                             */
                                            equal = function(a, isXML) {
                                                var b;
                                                var tv;
                                                var r20;
                                                if (a instanceof sc_Pair) {
                                                    r20 = sc_list(a.car);
                                                    b = value;
                                                    /** @type {number} */
                                                    tv = isXML;
                                                    for (;b instanceof sc_Pair;) {
                                                        tv = new sc_Pair(sc_append(b.car, r20), tv);
                                                        b = b.cdr;
                                                    }
                                                    return equal(a.cdr, tv);
                                                } else {
                                                    return callback(object[id + 5], isXML);
                                                }
                                            };
                                            return equal(res, isXML);
                                        } else {
                                            id = object[id + 5];
                                        }
                                    } else {
                                        return handler(a.cdr, isXML);
                                    }
                                }
                            };
                            return callback(object[2], isXML);
                        } else {
                            a = a.cdr;
                        }
                    } else {
                        return isXML;
                    }
                }
            }, handler(callback[deepDataAndEvents[field]], null));
        };
        /**
         * @param {?} node
         * @param {number} result
         * @param {number} name
         * @param {Array} expected
         * @param {?} actual
         * @param {?} deepDataAndEvents
         * @param {Array} walkers
         * @param {Array} message
         * @param {Array} item
         * @return {?}
         */
        push = function(node, result, name, expected, actual, deepDataAndEvents, walkers, message, item) {
            var arg;
            var args;
            var e;
            var pair;
            var controller;
            var shallow;
            var index;
            index = objEquiv(node, expected);
            if (index !== false) {
                shallow = expected.length;
                pair = actual[index];
                /** @type {null} */
                controller = null;
                for (;pair instanceof sc_Pair;) {
                    e = pair.car;
                    if ((args = item[name], arg = args[e + 1], arg !== false ? arg[result + 5] : false) !== false) {
                        pair = pair.cdr;
                        controller = sc_append(next(e, result, name, actual, deepDataAndEvents, walkers, message, item, shallow), controller);
                    } else {
                        pair = pair.cdr;
                    }
                }
                return controller;
            } else {
                return false;
            }
        };
        /**
         * @param {number} v
         * @param {number} type
         * @param {string} key
         * @param {?} next
         * @param {?} cb
         * @param {?} deepDataAndEvents
         * @param {Object} map
         * @param {number} args
         * @return {?}
         */
        fn = function(v, type, key, next, cb, deepDataAndEvents, map, args) {
            var extend;
            var s;
            var i;
            return i = v - 1, (s = v < args, s !== false ? s : cb[i] < 0) !== false ? 1 : (extend = function(b, a) {
                var result;
                var ret;
                var obj;
                var attr;
                var name;
                var o;
                var attrNames;
                var val;
                var x;
                for (;true;) {
                    if (b instanceof sc_Pair) {
                        x = b.car;
                        attrNames = (val = map[key], val[x + 1]);
                        if (attrNames !== false) {
                            name = attrNames[2];
                            /** @type {number} */
                            o = a;
                            for (;name >= 0;) {
                                if (name >= type && (attr = map[name], obj = attr[i + 1], obj !== false ? obj[type + 5] : false) !== false) {
                                    ret = fn(i, type, name, next, cb, deepDataAndEvents, map, args);
                                    result = fn(x, name, key, next, cb, deepDataAndEvents, map, args);
                                    name = attrNames[name + 5];
                                    o += ret * result;
                                } else {
                                    name = attrNames[name + 5];
                                }
                            }
                            return extend(b.cdr, o);
                        } else {
                            b = b.cdr;
                        }
                    } else {
                        return a;
                    }
                }
            }, extend(next[cb[i]], 0));
        };
        /**
         * @param {?} dataAndEvents
         * @param {number} type
         * @param {string} id
         * @param {Array} expected
         * @param {?} next
         * @param {?} cb
         * @param {?} deepDataAndEvents
         * @param {Object} done
         * @return {?}
         */
        stream = function(dataAndEvents, type, id, expected, next, cb, deepDataAndEvents, done) {
            var obj;
            var map;
            var x;
            var b;
            var stream;
            var typePattern;
            var prop;
            prop = objEquiv(dataAndEvents, expected);
            if (prop !== false) {
                typePattern = expected.length;
                b = next[prop];
                /** @type {number} */
                stream = 0;
                for (;b instanceof sc_Pair;) {
                    x = b.car;
                    if ((map = done[id], obj = map[x + 1], obj !== false ? obj[type + 5] : false) !== false) {
                        b = b.cdr;
                        stream = fn(x, type, id, next, cb, deepDataAndEvents, done, typePattern) + stream;
                    } else {
                        b = b.cdr;
                    }
                }
                return stream;
            } else {
                return false;
            }
        };
        HOP = fields[0];
        expected = fields[1];
        name = fields[2];
        item = fields[3];
        field = fields[4];
        tmp = fields[5];
        rg = fields[6];
        p = new sc_Pair(null, null);
        templatePair = HOP(walkers);
        c = p;
        for (;!(templatePair === null);) {
            cell = templatePair.car;
            cdr = cell.cdr;
            /** @type {null} */
            udataCur = null;
            for (;cdr instanceof sc_Pair;) {
                res = objEquiv(cdr.car, expected);
                if (res !== false) {
                    cdr = cdr.cdr;
                    udataCur = new sc_Pair(res, udataCur);
                } else {
                    cdr = cdr.cdr;
                }
            }
            obj = new sc_Pair(cell.car, sc_reverse(udataCur));
            val = new sc_Pair(obj, null);
            c.cdr = val;
            c = c.cdr;
            templatePair = templatePair.cdr;
        }
        value = p.cdr;
        matches = sc_list2vector(value);
        d = matches.length;
        y = tmp.length;
        element = lookAhead(d, y);
        pdataCur = name[0];
        prop(element, 0, pdataCur, 0);
        proxy(element, 0, name, item, field, tmp, expected);
        /** @type {number} */
        sel = 0;
        for (;sel < d;) {
            pdataOld = matches[sel].cdr;
            prop(element, sel + 1, pdataOld, sel);
            proxy(element, sel + 1, name, item, field, tmp, expected);
            ++sel;
        }
        match = matches.length;
        result = tmp.length;
        len = expected.length;
        base = lookAhead(match, result);
        func = item[0];
        args = func;
        for (;args instanceof sc_Pair;) {
            callback = args.car;
            off(element, base, match, callback, 0);
            args = args.cdr;
        }
        key = match;
        for (;key >= 0;) {
            openElement = element;
            prototype = base;
            klass = key;
            src = item;
            data = tmp;
            e = len;
            lastMatches = matches;
            lines = base[key];
            /**
             * @return {?}
             */
            test = function() {
                var f;
                var callback;
                var suiteView;
                var self;
                var name;
                var taskComplete;
                var text;
                var source;
                var result;
                var line;
                line = lines[0];
                if (line >= 0) {
                    result = lines[line + 1];
                    source = result[4];
                    lines[0] = result[0];
                    isArray(result);
                    text = source;
                    for (;text >= 0;) {
                        taskComplete = text;
                        name = klass;
                        self = openElement;
                        suiteView = prototype;
                        /** @type {number} */
                        callback = line - 1;
                        if (line >= e && data[callback] >= 0) {
                            /**
                             * @param {(Function|string)} args
                             * @return {?}
                             */
                            f = function(args) {
                                var tmp;
                                var fn;
                                var value;
                                var restoreScript;
                                for (;true;) {
                                    if (args instanceof sc_Pair) {
                                        restoreScript = args.car;
                                        fn = (value = self[name], value[restoreScript + 1]);
                                        if (fn !== false) {
                                            tmp = fn[2];
                                            for (;tmp >= 0;) {
                                                if (tmp >= taskComplete) {
                                                    if (off(self, suiteView, tmp, callback, taskComplete) !== false) {
                                                        off(self, suiteView, name, restoreScript, tmp);
                                                    }
                                                }
                                                tmp = fn[tmp + 5];
                                            }
                                            return f(args.cdr);
                                        } else {
                                            args = args.cdr;
                                        }
                                    } else {
                                        return undefined;
                                    }
                                }
                            };
                            f(src[data[callback]]);
                        }
                        text = result[text + 5];
                    }
                    return test();
                } else {
                    return undefined;
                }
            };
            test();
            --key;
        }
        id = base;
        return[expected, name, item, field, tmp, rg, matches, id, clone, push, stream];
    };
};
/**
 * @param {Array} item
 * @param {?} _super
 * @param {?} name
 * @param {?} isXML
 * @return {?}
 */
BgL_parsezd2ze3parsedzf3zc2 = function(item, _super, name, isXML) {
    var getter;
    var fn_name;
    var func;
    var args;
    return args = item[0], func = item[2], fn_name = item[7], getter = item[8], getter(_super, name, isXML, args, func, fn_name);
};
/**
 * @param {Array} options
 * @param {string} walkers
 * @param {number} parent
 * @param {?} dataAndEvents
 * @return {?}
 */
BgL_parsezd2ze3treesz31 = function(options, walkers, parent, dataAndEvents) {
    var HOP;
    var copy;
    var r20;
    var restoreScript;
    var option;
    var rreturn;
    var xhr;
    return xhr = options[0], rreturn = options[2], option = options[4], restoreScript = options[5], r20 = options[6], copy = options[7], HOP = options[9], HOP(walkers, parent, dataAndEvents, xhr, rreturn, option, restoreScript, r20, copy);
};
/**
 * @param {Array} dataAndEvents
 * @param {?} error
 * @param {?} filePath
 * @param {?} linerNr
 * @return {?}
 */
BgL_parsezd2ze3nbzd2treesze3 = function(dataAndEvents, error, filePath, linerNr) {
    var onErrorFnPrev;
    var r20;
    var restoreScript;
    var rreturn;
    var udataCur;
    var pdataOld;
    return pdataOld = dataAndEvents[0], udataCur = dataAndEvents[2], rreturn = dataAndEvents[4], restoreScript = dataAndEvents[6], r20 = dataAndEvents[7], onErrorFnPrev = dataAndEvents[10], onErrorFnPrev(error, filePath, linerNr, pdataOld, udataCur, rreturn, restoreScript, r20);
};
/**
 * @param {?} dataAndEvents
 * @return {?}
 */
test = function(dataAndEvents) {
    var o;
    var a;
    return a = BgL_makezd2parserzd2(const_earley, function(dataAndEvents) {
        var car;
        var args;
        var cdr;
        var a;
        a = new sc_Pair(null, null);
        args = a;
        /** @type {(number|string)} */
        cdr = dataAndEvents;
        for (;!(cdr === null);) {
            args.cdr = new sc_Pair((car = cdr.car, sc_list(car, car)), null);
            args = args.cdr;
            cdr = cdr.cdr;
        }
        return a.cdr;
    }), o = a(sc_vector2list(sc_makeVector(dataAndEvents, "\u1e9ca"))), sc_length(BgL_parsezd2ze3treesz31(o, "\u1e9cs", 0, dataAndEvents));
};
/**
 * @return {?}
 */
BgL_earleyzd2benchmarkzd2 = function() {
    /** @type {null} */
    var current = null;
    /** @type {number} */
    var elementArgumentPos = arguments.length - 1;
    for (;elementArgumentPos >= 0;elementArgumentPos--) {
        current = sc_cons(arguments[elementArgumentPos], current);
    }
    var node;
    return node = current === null ? 7 : current.car, BgL_runzd2benchmarkzd2("earley", 1, function() {
        return test(node);
    }, function(walkers) {
        return sc_display(walkers), sc_newline(), walkers == 132;
    });
};
SC_DEFAULT_OUT = new sc_GenericOutputPort(function(dataAndEvents) {
});
SC_ERROR_OUT = SC_DEFAULT_OUT;
/**
 * @param {string} series
 * @param {number} dataAndEvents
 * @param {Function} indentCode
 * @param {Function} $sanitize
 * @return {undefined}
 */
function RunBenchmark(series, dataAndEvents, indentCode, $sanitize) {
    /** @type {number} */
    var n = 0;
    for (;n < dataAndEvents;++n) {
        result = indentCode();
        if (!$sanitize(result)) {
            throw new Error("Earley or Boyer did incorrect number of rewrites");
        }
    }
}
/** @type {function (string, number, Function, Function): undefined} */
var BgL_runzd2benchmarkzd2 = RunBenchmark;
