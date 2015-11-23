var performance = performance || {};
performance.now = function() {
    return performance.now || (performance.mozNow || (performance.msNow || (performance.oNow || (performance.webkitNow || Date.now))));
}();
/**
 * @param {string} name
 * @param {Object} options
 * @param {Object} opt_shareSetup
 * @param {?} opt_cleanup
 * @param {?} run
 * @param {Function} setup
 * @param {Function} tearDown
 * @param {?} opt_setup
 * @param {number} fn
 * @return {undefined}
 */
function Benchmark(name, options, opt_shareSetup, opt_cleanup, run, setup, tearDown, opt_setup, fn) {
    /** @type {string} */
    this.name = name;
    /** @type {Object} */
    this.doWarmup = options;
    /** @type {Object} */
    this.doDeterministic = opt_shareSetup;
    this.deterministicIterations = opt_cleanup;
    this.run = run;
    this.Setup = setup ? setup : function() {
    };
    this.TearDown = tearDown ? tearDown : function() {
    };
    this.rmsResult = opt_setup ? opt_setup : null;
    this.minIterations = fn ? fn : 32;
}
/**
 * @param {Object} benchmark
 * @param {number} time
 * @param {number} deltaTime
 * @return {undefined}
 */
function BenchmarkResult(benchmark, time, deltaTime) {
    /** @type {Object} */
    this.benchmark = benchmark;
    /** @type {number} */
    this.time = time;
    /** @type {number} */
    this.latency = deltaTime;
}
/**
 * @return {?}
 */
BenchmarkResult.prototype.valueOf = function() {
    return this.time;
};
/**
 * @param {string} name
 * @param {(Array|number)} reference
 * @param {(Array|number)} benchmarks
 * @return {undefined}
 */
function BenchmarkSuite(name, reference, benchmarks) {
    /** @type {string} */
    this.name = name;
    /** @type {(Array|number)} */
    this.reference = reference;
    /** @type {(Array|number)} */
    this.benchmarks = benchmarks;
    BenchmarkSuite.suites.push(this);
}
/** @type {Array} */
BenchmarkSuite.suites = [];
/** @type {string} */
BenchmarkSuite.version = "9";
BenchmarkSuite.config = {
    doWarmup : undefined,
    doDeterministic : undefined
};
/**
 * @param {string} completeCallback
 * @return {?}
 */
alert = function(completeCallback) {
    throw "Alert called with argument: " + completeCallback;
};
/**
 * @return {undefined}
 */
BenchmarkSuite.ResetRNG = function() {
    Math.random = function() {
        /** @type {number} */
        var seed = 49734321;
        return function() {
            /** @type {number} */
            seed = seed + 2127912214 + (seed << 12) & 4294967295;
            /** @type {number} */
            seed = (seed ^ 3345072700 ^ seed >>> 19) & 4294967295;
            /** @type {number} */
            seed = seed + 374761393 + (seed << 5) & 4294967295;
            /** @type {number} */
            seed = (seed + 3550635116 ^ seed << 9) & 4294967295;
            /** @type {number} */
            seed = seed + 4251993797 + (seed << 3) & 4294967295;
            /** @type {number} */
            seed = (seed ^ 3042594569 ^ seed >>> 16) & 4294967295;
            return(seed & 268435455) / 268435456;
        };
    }();
};
/**
 * @param {?} runner
 * @param {?} result
 * @return {undefined}
 */
BenchmarkSuite.RunSuites = function(runner, result) {
    /**
     * @return {undefined}
     */
    function RunStep() {
        for (;continuation || index < length;) {
            if (continuation) {
                continuation = continuation();
            } else {
                var suite = suites[index++];
                if (runner.NotifyStart) {
                    runner.NotifyStart(suite.name);
                }
                if (result.indexOf(suite.name) > -1) {
                    suite.NotifySkipped(runner);
                } else {
                    continuation = suite.RunStep(runner);
                }
            }
            if (continuation && (typeof window != "undefined" && window.setTimeout)) {
                window.setTimeout(RunStep, 25);
                return;
            }
        }
        if (runner.NotifyScore) {
            var score = BenchmarkSuite.GeometricMean(BenchmarkSuite.scores);
            var formatted = BenchmarkSuite.FormatScore(100 * score);
            runner.NotifyScore(formatted);
        }
    }
    result = typeof result === "undefined" ? [] : result;
    /** @type {null} */
    var continuation = null;
    /** @type {Array} */
    var suites = BenchmarkSuite.suites;
    /** @type {number} */
    var length = suites.length;
    /** @type {Array} */
    BenchmarkSuite.scores = [];
    /** @type {number} */
    var index = 0;
    RunStep();|
};
/**
 * @return {?}
 */
BenchmarkSuite.CountBenchmarks = function() {
    /** @type {number} */
    var result = 0;
    /** @type {Array} */
    var codeSegments = BenchmarkSuite.suites;
    /** @type {number} */
    var i = 0;
    for (;i < codeSegments.length;i++) {
        result += codeSegments[i].benchmarks.length;
    }
    return result;
};
/**
 * @param {Array} numbers
 * @return {?}
 */
BenchmarkSuite.GeometricMean = function(numbers) {
    /** @type {number} */
    var log = 0;
    /** @type {number} */
    var i = 0;
    for (;i < numbers.length;i++) {
        log += Math.log(numbers[i]);
    }
    return Math.pow(Math.E, log / numbers.length);
};
/**
 * @param {Array} codeSegments
 * @return {?}
 */
BenchmarkSuite.GeometricMeanTime = function(codeSegments) {
    /** @type {number} */
    var mean = 0;
    /** @type {number} */
    var i = 0;
    for (;i < codeSegments.length;i++) {
        mean += Math.log(codeSegments[i].time);
    }
    return Math.pow(Math.E, mean / codeSegments.length);
};
/**
 * @param {Array} codeSegments
 * @return {?}
 */
BenchmarkSuite.GeometricMeanLatency = function(codeSegments) {
    /** @type {number} */
    var mean = 0;
    /** @type {boolean} */
    var hasLatencyResult = false;
    /** @type {number} */
    var i = 0;
    for (;i < codeSegments.length;i++) {
        if (codeSegments[i].latency != 0) {
            mean += Math.log(codeSegments[i].latency);
            /** @type {boolean} */
            hasLatencyResult = true;
        }
    }
    if (hasLatencyResult) {
        return Math.pow(Math.E, mean / codeSegments.length);
    } else {
        return 0;
    }
};
/**
 * @param {number} value
 * @return {?}
 */
BenchmarkSuite.FormatScore = function(value) {
    if (value > 100) {
        return value.toFixed(0);
    } else {
        return value.toPrecision(3);
    }
};
/**
 * @param {Object} result
 * @return {undefined}
 */
BenchmarkSuite.prototype.NotifyStep = function(result) {
    this.results.push(result);
    if (this.runner.NotifyStep) {
        this.runner.NotifyStep(result.benchmark.name);
    }
};
/**
 * @return {undefined}
 */
BenchmarkSuite.prototype.NotifyResult = function() {
    var mean = BenchmarkSuite.GeometricMeanTime(this.results);
    /** @type {number} */
    var score = this.reference[0] / mean;
    BenchmarkSuite.scores.push(score);
    if (this.runner.NotifyResult) {
        var formatted = BenchmarkSuite.FormatScore(100 * score);
        this.runner.NotifyResult(this.name, formatted);
    }
    if (this.reference.length == 2) {
        var json = BenchmarkSuite.GeometricMeanLatency(this.results);
        if (json != 0) {
            /** @type {number} */
            var copies = this.reference[1] / json;
            BenchmarkSuite.scores.push(copies);
            if (this.runner.NotifyResult) {
                var r20 = BenchmarkSuite.FormatScore(100 * copies);
                this.runner.NotifyResult(this.name + "Latency", r20);
            }
        }
    }
};
/**
 * @param {?} node
 * @return {undefined}
 */
BenchmarkSuite.prototype.NotifySkipped = function(node) {
    BenchmarkSuite.scores.push(1);
    if (node.NotifyResult) {
        node.NotifyResult(this.name, "Skipped");
    }
};
/**
 * @param {?} error
 * @return {undefined}
 */
BenchmarkSuite.prototype.NotifyError = function(error) {
    if (this.runner.NotifyError) {
        this.runner.NotifyError(this.name, error);
    }
    if (this.runner.NotifyStep) {
        this.runner.NotifyStep(this.name);
    }
};
/**
 * @param {string} benchmark
 * @param {Object} data
 * @return {?}
 */
BenchmarkSuite.prototype.RunSingleBenchmark = function(benchmark, data) {
    /**
     * @param {Object} data
     * @return {undefined}
     */
    function Measure(data) {
        /** @type {number} */
        var elapsed = 0;
        /** @type {Date} */
        var start = new Date;
        /** @type {number} */
        var n = 0;
        for (;doDeterministic ? n < benchmark.deterministicIterations : elapsed < 1E3;n++) {
            benchmark.run();
            /** @type {number} */
            elapsed = new Date - start;
        }
        if (data != null) {
            data.runs += n;
            data.elapsed += elapsed;
        }
    }
    var view = BenchmarkSuite.config;
    var initialized = view.doWarmup !== undefined ? view.doWarmup : benchmark.doWarmup;
    var doDeterministic = view.doDeterministic !== undefined ? view.doDeterministic : benchmark.doDeterministic;
    if (!initialized && data == null) {
        data = {
            runs : 0,
            elapsed : 0
        };
    }
    if (data == null) {
        Measure(null);
        return{
            runs : 0,
            elapsed : 0
        };
    } else {
        Measure(data);
        if (data.runs < benchmark.minIterations) {
            return data;
        }
        /** @type {number} */
        var usec = data.elapsed * 1E3 / data.runs;
        var error = benchmark.rmsResult != null ? benchmark.rmsResult() : 0;
        this.NotifyStep(new BenchmarkResult(benchmark, usec, error));
        return null;
    }
};
/**
 * @param {?} runner
 * @return {?}
 */
BenchmarkSuite.prototype.RunStep = function(runner) {
    /**
     * @return {?}
     */
    function RunNextSetup() {
        if (index < length) {
            try {
                suite.benchmarks[index].Setup();
            } catch (e) {
                suite.NotifyError(e);
                return null;
            }
            return RunNextBenchmark;
        }
        suite.NotifyResult();
        return null;
    }
    /**
     * @return {?}
     */
    function RunNextBenchmark() {
        try {
            data = suite.RunSingleBenchmark(suite.benchmarks[index], data);
        } catch (e) {
            suite.NotifyError(e);
            return null;
        }
        return data == null ? RunNextTearDown : RunNextBenchmark();
    }
    /**
     * @return {?}
     */
    function RunNextTearDown() {
        try {
            suite.benchmarks[index++].TearDown();
        } catch (e) {
            suite.NotifyError(e);
            return null;
        }
        return RunNextSetup;
    }
    BenchmarkSuite.ResetRNG();
    /** @type {Array} */
    this.results = [];
    this.runner = runner;
    var length = this.benchmarks.length;
    /** @type {number} */
    var index = 0;
    var suite = this;
    var data;
    return RunNextSetup();
};
