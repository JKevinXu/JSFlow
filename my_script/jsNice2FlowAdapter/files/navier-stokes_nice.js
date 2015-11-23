var NavierStokes = new BenchmarkSuite("NavierStokes", [1484E3], [new Benchmark("NavierStokes", true, false, 180, runNavierStokes, setupNavierStokes, tearDownNavierStokes, null, 16)]);
/** @type {null} */
var solver = null;
/** @type {number} */
var nsFrameCounter = 0;
/**
 * @return {undefined}
 */
function runNavierStokes() {
    solver.update();
    nsFrameCounter++;
    if (nsFrameCounter == 15) {
        checkResult(solver.getDens());
    }
}
/**
 * @param {Array} $cookies
 * @return {undefined}
 */
function checkResult($cookies) {
    /** @type {number} */
    this.result = 0;
    /** @type {number} */
    var key = 7E3;
    for (;key < 7100;key++) {
        this.result += ~~($cookies[key] * 10);
    }
    if (this.result != 77) {
        throw new Error("checksum failed");
    }
}
/**
 * @return {undefined}
 */
function setupNavierStokes() {
    solver = new FluidField(null);
    solver.setResolution(128, 128);
    solver.setIterations(20);
    solver.setDisplayFunction(function() {
    });
    solver.setUICallback(prepareFrame);
    solver.reset();
}
/**
 * @return {undefined}
 */
function tearDownNavierStokes() {
    /** @type {null} */
    solver = null;
}
/**
 * @param {?} ctx
 * @return {undefined}
 */
function addPoints(ctx) {
    /** @type {number} */
    var y = 64;
    /** @type {number} */
    var x = 1;
    for (;x <= y;x++) {
        ctx.setVelocity(x, x, y, y);
        ctx.setDensity(x, x, 5);
        ctx.setVelocity(x, y - x, -y, -y);
        ctx.setDensity(x, y - x, 20);
        ctx.setVelocity(128 - x, y + x, -y, -y);
        ctx.setDensity(128 - x, y + x, 30);
    }
}
/** @type {number} */
var framesTillAddingPoints = 0;
/** @type {number} */
var framesBetweenAddingPoints = 5;
/**
 * @param {?} cctx
 * @return {undefined}
 */
function prepareFrame(cctx) {
    if (framesTillAddingPoints == 0) {
        addPoints(cctx);
        framesTillAddingPoints = framesBetweenAddingPoints;
        framesBetweenAddingPoints++;
    } else {
        framesTillAddingPoints--;
    }
}
/**
 * @param {?} dataAndEvents
 * @return {undefined}
 */
function FluidField(dataAndEvents) {
    /**
     * @param {Array} target
     * @param {Array} data
     * @param {number} n
     * @return {undefined}
     */
    function func(target, data, n) {
        /** @type {number} */
        var i = 0;
        for (;i < length;i++) {
            target[i] += n * data[i];
        }
    }
    /**
     * @param {number} expectedNumberOfNonCommentArgs
     * @param {Array} data
     * @return {undefined}
     */
    function debug(expectedNumberOfNonCommentArgs, data) {
        if (expectedNumberOfNonCommentArgs === 1) {
            /** @type {number} */
            var x = 1;
            for (;x <= width;x++) {
                data[x] = data[x + step];
                data[x + (height + 1) * step] = data[x + height * step];
            }
            /** @type {number} */
            var i = 1;
            for (;i <= height;i++) {
                /** @type {number} */
                data[i * step] = -data[1 + i * step];
                /** @type {number} */
                data[width + 1 + i * step] = -data[width + i * step];
            }
        } else {
            if (expectedNumberOfNonCommentArgs === 2) {
                /** @type {number} */
                x = 1;
                for (;x <= width;x++) {
                    /** @type {number} */
                    data[x] = -data[x + step];
                    /** @type {number} */
                    data[x + (height + 1) * step] = -data[x + height * step];
                }
                /** @type {number} */
                i = 1;
                for (;i <= height;i++) {
                    data[i * step] = data[1 + i * step];
                    data[width + 1 + i * step] = data[width + i * step];
                }
            } else {
                /** @type {number} */
                x = 1;
                for (;x <= width;x++) {
                    data[x] = data[x + step];
                    data[x + (height + 1) * step] = data[x + height * step];
                }
                /** @type {number} */
                i = 1;
                for (;i <= height;i++) {
                    data[i * step] = data[1 + i * step];
                    data[width + 1 + i * step] = data[width + i * step];
                }
            }
        }
        /** @type {number} */
        var offset = (height + 1) * step;
        /** @type {number} */
        data[0] = 0.5 * (data[1] + data[step]);
        /** @type {number} */
        data[offset] = 0.5 * (data[1 + offset] + data[height * step]);
        /** @type {number} */
        data[width + 1] = 0.5 * (data[width] + data[width + 1 + step]);
        /** @type {number} */
        data[width + 1 + offset] = 0.5 * (data[width + offset] + data[width + 1 + height * step]);
    }
    /**
     * @param {number} isXML
     * @param {Array} args
     * @param {Array} o
     * @param {number} b
     * @param {number} c
     * @return {undefined}
     */
    function fn(isXML, args, o, b, c) {
        if (b === 0 && c === 1) {
            /** @type {number} */
            var j = 1;
            for (;j <= height;j++) {
                /** @type {number} */
                var v = j * step;
                ++v;
                /** @type {number} */
                var x = 0;
                for (;x < width;x++) {
                    args[v] = o[v];
                    ++v;
                }
            }
            debug(isXML, args);
        } else {
            /** @type {number} */
            var vdir = 1 / c;
            /** @type {number} */
            var m = 0;
            for (;m < iterations;m++) {
                /** @type {number} */
                j = 1;
                for (;j <= height;j++) {
                    /** @type {number} */
                    var i = (j - 1) * step;
                    /** @type {number} */
                    v = j * step;
                    /** @type {number} */
                    var value = (j + 1) * step;
                    var s = args[v];
                    ++v;
                    /** @type {number} */
                    x = 1;
                    for (;x <= width;x++) {
                        /** @type {number} */
                        s = args[v] = (o[v] + b * (s + args[++v] + args[++i] + args[++value])) * vdir;
                    }
                }
                debug(isXML, args);
            }
        }
    }
    /**
     * @param {number} isXML
     * @param {Array} results
     * @param {Array} index
     * @param {number} what
     * @return {undefined}
     */
    function find(isXML, results, index, what) {
        /** @type {number} */
        var oldconfig = 0;
        fn(isXML, results, index, oldconfig, 1 + 4 * oldconfig);
    }
    /**
     * @param {Array} data
     * @param {Array} state
     * @param {Array} args
     * @param {Array} o
     * @param {number} obj
     * @param {number} time
     * @return {undefined}
     */
    function trigger(data, state, args, o, obj, time) {
        if (obj === 0 && time === 1) {
            /** @type {number} */
            var j = 1;
            for (;j <= height;j++) {
                /** @type {number} */
                var v = j * step;
                ++v;
                /** @type {number} */
                var x = 0;
                for (;x < width;x++) {
                    data[v] = state[v];
                    args[v] = o[v];
                    ++v;
                }
            }
            debug(1, data);
            debug(2, args);
        } else {
            /** @type {number} */
            var speed = 1 / time;
            /** @type {number} */
            var i = 0;
            for (;i < iterations;i++) {
                /** @type {number} */
                j = 1;
                for (;j <= height;j++) {
                    /** @type {number} */
                    var arg = (j - 1) * step;
                    /** @type {number} */
                    v = j * step;
                    /** @type {number} */
                    var ind = (j + 1) * step;
                    var cometUrl = data[v];
                    var value = args[v];
                    ++v;
                    /** @type {number} */
                    x = 1;
                    for (;x <= width;x++) {
                        /** @type {number} */
                        cometUrl = data[v] = (state[v] + obj * (cometUrl + data[v] + data[arg] + data[ind])) * speed;
                        /** @type {number} */
                        value = args[v] = (o[v] + obj * (value + args[++v] + args[++arg] + args[++ind])) * speed;
                    }
                }
                debug(1, data);
                debug(2, args);
            }
        }
    }
    /**
     * @param {Array} frame
     * @param {Array} data
     * @param {Array} params
     * @param {Array} result
     * @param {number} obj1
     * @return {undefined}
     */
    function callback(frame, data, params, result, obj1) {
        /** @type {number} */
        var suiteView = 0;
        trigger(frame, data, params, result, suiteView, 1 + 4 * suiteView);
    }
    /**
     * @param {number} expectedNumberOfNonCommentArgs
     * @param {Array} arg
     * @param {Array} args
     * @param {(Array|Uint8Array|string)} data
     * @param {Array} result
     * @param {number} index
     * @return {undefined}
     */
    function log(expectedNumberOfNonCommentArgs, arg, args, data, result, index) {
        /** @type {number} */
        var n = index * width;
        /** @type {number} */
        var dy = index * height;
        var chartWidth = width + 0.5;
        var y2 = height + 0.5;
        /** @type {number} */
        var cy = 1;
        for (;cy <= height;cy++) {
            /** @type {number} */
            var j = cy * step;
            /** @type {number} */
            var w = 1;
            for (;w <= width;w++) {
                /** @type {number} */
                var x = w - n * data[++j];
                /** @type {number} */
                var y1 = cy - dy * result[j];
                if (x < 0.5) {
                    /** @type {number} */
                    x = 0.5;
                } else {
                    if (x > chartWidth) {
                        x = chartWidth;
                    }
                }
                /** @type {number} */
                var sum = x | 0;
                /** @type {number} */
                var memo = sum + 1;
                if (y1 < 0.5) {
                    /** @type {number} */
                    y1 = 0.5;
                } else {
                    if (y1 > y2) {
                        y1 = y2;
                    }
                }
                /** @type {number} */
                var y = y1 | 0;
                /** @type {number} */
                var stepX = y + 1;
                /** @type {number} */
                var m2 = x - sum;
                /** @type {number} */
                var m1 = 1 - m2;
                /** @type {number} */
                var dy0 = y1 - y;
                /** @type {number} */
                var r = 1 - dy0;
                /** @type {number} */
                var num = y * step;
                /** @type {number} */
                var value = stepX * step;
                /** @type {number} */
                arg[j] = m1 * (r * args[sum + num] + dy0 * args[sum + value]) + m2 * (r * args[memo + num] + dy0 * args[memo + value]);
            }
        }
        debug(expectedNumberOfNonCommentArgs, arg);
    }
    /**
     * @param {Array} path
     * @param {Array} params
     * @param {Array} args
     * @param {Array} data
     * @return {undefined}
     */
    function update(path, params, args, data) {
        /** @type {number} */
        var sign = -0.5 / Math.sqrt(width * height);
        /** @type {number} */
        var j = 1;
        for (;j <= height;j++) {
            /** @type {number} */
            var start = j * step;
            /** @type {number} */
            var rmin = (j - 1) * step;
            /** @type {number} */
            var index = start - 1;
            /** @type {number} */
            var x = start;
            /** @type {number} */
            var end = start + 1;
            /** @type {number} */
            var value = (j + 1) * step;
            /** @type {number} */
            var charlen = 1;
            for (;charlen <= width;charlen++) {
                /** @type {number} */
                data[++x] = sign * (path[++end] - path[++index] + params[++value] - params[++rmin]);
                /** @type {number} */
                args[x] = 0;
            }
        }
        debug(0, data);
        debug(0, args);
        fn(0, args, data, 1, 4);
        /** @type {number} */
        var offw = 0.5 * width;
        /** @type {number} */
        var topY = 0.5 * height;
        /** @type {number} */
        j = 1;
        for (;j <= height;j++) {
            /** @type {number} */
            var i = j * step - 1;
            /** @type {number} */
            var v = j * step;
            /** @type {number} */
            var arg = j * step + 1;
            /** @type {number} */
            var err = (j - 1) * step;
            /** @type {number} */
            x = j * step;
            /** @type {number} */
            value = (j + 1) * step;
            /** @type {number} */
            charlen = 1;
            for (;charlen <= width;charlen++) {
                path[++v] -= offw * (args[++arg] - args[++i]);
                params[v] -= topY * (args[++value] - args[++err]);
            }
        }
        debug(1, path);
        debug(2, params);
    }
    /**
     * @param {Array} key
     * @param {Array} data
     * @param {Array} info
     * @param {Array} entry
     * @param {number} value
     * @return {undefined}
     */
    function add(key, data, info, entry, value) {
        func(key, data, value);
        find(0, data, key, value);
        log(0, key, data, info, entry, value);
    }
    /**
     * @param {Array} name
     * @param {Array} params
     * @param {Array} data
     * @param {Array} a
     * @param {number} options
     * @return {undefined}
     */
    function render(name, params, data, a, options) {
        func(name, data, options);
        func(params, a, options);
        /** @type {Array} */
        var value = data;
        /** @type {Array} */
        data = name;
        name = value;
        /** @type {Array} */
        value = a;
        /** @type {Array} */
        a = params;
        params = value;
        callback(name, data, params, a, options);
        update(name, params, data, a);
        /** @type {Array} */
        value = data;
        /** @type {Array} */
        data = name;
        name = value;
        /** @type {Array} */
        value = a;
        /** @type {Array} */
        a = params;
        params = value;
        log(1, name, data, data, a, options);
        log(2, params, a, data, a, options);
        update(name, params, data, a);
    }
    /**
     * @param {?} data_
     * @param {?} mat
     * @param {?} data
     * @return {undefined}
     */
    function Plot(data_, mat, data) {
        /**
         * @param {number} v00
         * @param {number} i
         * @param {number} opt_attributes
         * @return {undefined}
         */
        this.setDensity = function(v00, i, opt_attributes) {
            /** @type {number} */
            data_[v00 + 1 + (i + 1) * step] = opt_attributes;
        };
        /**
         * @param {number} skip
         * @param {number} i
         * @return {?}
         */
        this.getDensity = function(skip, i) {
            return data_[skip + 1 + (i + 1) * step];
        };
        /**
         * @param {number} v00
         * @param {number} v
         * @param {number} v11
         * @param {number} b
         * @return {undefined}
         */
        this.setVelocity = function(v00, v, v11, b) {
            /** @type {number} */
            mat[v00 + 1 + (v + 1) * step] = v11;
            /** @type {number} */
            data[v00 + 1 + (v + 1) * step] = b;
        };
        /**
         * @param {number} dataAndEvents
         * @param {number} i
         * @return {?}
         */
        this.getXVelocity = function(dataAndEvents, i) {
            return mat[dataAndEvents + 1 + (i + 1) * step];
        };
        /**
         * @param {number} dataAndEvents
         * @param {number} i
         * @return {?}
         */
        this.getYVelocity = function(dataAndEvents, i) {
            return data[dataAndEvents + 1 + (i + 1) * step];
        };
        /**
         * @return {?}
         */
        this.width = function() {
            return width;
        };
        /**
         * @return {?}
         */
        this.height = function() {
            return height;
        };
    }
    /**
     * @param {Array} result
     * @param {Array} data
     * @param {Array} url
     * @return {undefined}
     */
    function successCallback(result, data, url) {
        /** @type {number} */
        var len = 0;
        for (;len < length;len++) {
            /** @type {number} */
            data[len] = url[len] = result[len] = 0;
        }
        win(new Plot(result, data, url));
    }
    /**
     * @return {undefined}
     */
    function reset() {
        step = width + 2;
        /** @type {number} */
        length = (width + 2) * (height + 2);
        /** @type {Array} */
        progressValues = new Array(length);
        /** @type {Array} */
        result = new Array(length);
        /** @type {Array} */
        args = new Array(length);
        /** @type {Array} */
        data = new Array(length);
        /** @type {Array} */
        params = new Array(length);
        /** @type {Array} */
        progressContexts = new Array(length);
        /** @type {number} */
        var i = 0;
        for (;i < length;i++) {
            /** @type {number} */
            result[i] = data[i] = progressContexts[i] = progressValues[i] = args[i] = params[i] = 0;
        }
    }
    /**
     * @param {?} xxx
     * @param {?} position
     * @param {?} a
     * @return {undefined}
     */
    var win = function(xxx, position, a) {
    };
    /**
     * @return {undefined}
     */
    this.update = function() {
        successCallback(result, data, progressContexts);
        render(args, params, data, progressContexts, silentOptions);
        add(progressValues, result, args, params, silentOptions);
        text(new Plot(progressValues, args, params));
    };
    /**
     * @param {?} textAlt
     * @return {undefined}
     */
    this.setDisplayFunction = function(textAlt) {
        text = textAlt;
    };
    /**
     * @return {?}
     */
    this.iterations = function() {
        return iterations;
    };
    /**
     * @param {number} x
     * @return {undefined}
     */
    this.setIterations = function(x) {
        if (x > 0 && x <= 100) {
            /** @type {number} */
            iterations = x;
        }
    };
    /**
     * @param {Function} params
     * @return {undefined}
     */
    this.setUICallback = function(params) {
        /** @type {Function} */
        win = params;
    };
    /** @type {number} */
    var iterations = 10;
    /** @type {number} */
    var visc = 0.5;
    /** @type {number} */
    var silentOptions = 0.1;
    var progressValues;
    var result;
    var args;
    var data;
    var params;
    var progressContexts;
    var width;
    var height;
    var step;
    var length;
    var text;
    /** @type {function (): undefined} */
    this.reset = reset;
    /**
     * @return {?}
     */
    this.getDens = function() {
        return progressValues;
    };
    /**
     * @param {number} y
     * @param {number} x
     * @return {?}
     */
    this.setResolution = function(y, x) {
        /** @type {number} */
        var z = x * y;
        if (z > 0 && (z < 1E6 && (x != width || y != height))) {
            /** @type {number} */
            width = x;
            /** @type {number} */
            height = y;
            reset();
            return true;
        }
        return false;
    };
    this.setResolution(64, 64);
}
;