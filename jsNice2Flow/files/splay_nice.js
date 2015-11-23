var Splay = new BenchmarkSuite("Splay", [81491, 2739514], [new Benchmark("Splay", true, false, 1400, SplayRun, SplaySetup, SplayTearDown, SplayRMS)]);
/** @type {number} */
var kSplayTreeSize = 8E3;
/** @type {number} */
var kSplayTreeModifications = 80;
/** @type {number} */
var kSplayTreePayloadDepth = 5;
/** @type {null} */
var splayTree = null;
/** @type {number} */
var splaySampleTimeStart = 0;
/**
 * @param {number} depth
 * @param {string} tag
 * @return {?}
 */
function GeneratePayloadTree(depth, tag) {
    if (depth == 0) {
        return{
            array : [0, 1, 2, 3, 4, 5, 6, 7, 8, 9],
            string : "String for key " + tag + " in leaf node"
        };
    } else {
        return{
            left : GeneratePayloadTree(depth - 1, tag),
            right : GeneratePayloadTree(depth - 1, tag)
        };
    }
}
/**
 * @return {?}
 */
function GenerateKey() {
    return Math.random();
}
/** @type {number} */
var splaySamples = 0;
/** @type {number} */
var splaySumOfSquaredPauses = 0;
/**
 * @return {?}
 */
function SplayRMS() {
    return Math.round(Math.sqrt(splaySumOfSquaredPauses / splaySamples) * 1E4);
}
/**
 * @param {number} far
 * @return {undefined}
 */
function SplayUpdateStats(far) {
    /** @type {number} */
    var dz = far - splaySampleTimeStart;
    /** @type {number} */
    splaySampleTimeStart = far;
    splaySamples++;
    splaySumOfSquaredPauses += dz * dz;
}
/**
 * @return {?}
 */
function InsertNewNode() {
    var key;
    do {
        key = GenerateKey();
    } while (splayTree.find(key) != null);
    var payload = GeneratePayloadTree(kSplayTreePayloadDepth, String(key));
    splayTree.insert(key, payload);
    return key;
}
/**
 * @return {undefined}
 */
function SplaySetup() {
    if (!performance.now) {
        throw "PerformanceNowUnsupported";
    }
    /** @type {SplayTree} */
    splayTree = new SplayTree;
    splaySampleTimeStart = performance.now();
    /** @type {number} */
    var i = 0;
    for (;i < kSplayTreeSize;i++) {
        InsertNewNode();
        if ((i + 1) % 20 == 19) {
            SplayUpdateStats(performance.now());
        }
    }
}
/**
 * @return {undefined}
 */
function SplayTearDown() {
    var keys = splayTree.exportKeys();
    /** @type {null} */
    splayTree = null;
    /** @type {number} */
    splaySamples = 0;
    /** @type {number} */
    splaySumOfSquaredPauses = 0;
    var length = keys.length;
    if (length != kSplayTreeSize) {
        throw new Error("Splay tree has wrong size");
    }
    /** @type {number} */
    var i = 0;
    for (;i < length - 1;i++) {
        if (keys[i] >= keys[i + 1]) {
            throw new Error("Splay tree not sorted");
        }
    }
}
/**
 * @return {undefined}
 */
function SplayRun() {
    /** @type {number} */
    var i = 0;
    for (;i < kSplayTreeModifications;i++) {
        var key = InsertNewNode();
        var greatest = splayTree.findGreatestLessThan(key);
        if (greatest == null) {
            splayTree.remove(key);
        } else {
            splayTree.remove(greatest.key);
        }
    }
    SplayUpdateStats(performance.now());
}
/**
 * @constructor
 */
function SplayTree() {
}
/** @type {null} */
SplayTree.prototype.root_ = null;
/**
 * @return {boolean}
 */
SplayTree.prototype.isEmpty = function() {
    return!this.root_;
};
/**
 * @param {number} key
 * @param {*} value
 * @return {undefined}
 */
SplayTree.prototype.insert = function(key, value) {
    if (this.isEmpty()) {
        this.root_ = new SplayTree.Node(key, value);
        return;
    }
    this.splay_(key);
    if (this.root_.key == key) {
        return;
    }
    var node = new SplayTree.Node(key, value);
    if (key > this.root_.key) {
        node.left = this.root_;
        node.right = this.root_.right;
        /** @type {null} */
        this.root_.right = null;
    } else {
        node.right = this.root_;
        node.left = this.root_.left;
        /** @type {null} */
        this.root_.left = null;
    }
    this.root_ = node;
};
/**
 * @param {number} key
 * @return {(SplayTree.Node|null)}
 */
SplayTree.prototype.remove = function(key) {
    if (this.isEmpty()) {
        throw Error("Key not found: " + key);
    }
    this.splay_(key);
    if (this.root_.key != key) {
        throw Error("Key not found: " + key);
    }
    var removed = this.root_;
    if (!this.root_.left) {
        this.root_ = this.root_.right;
    } else {
        var right = this.root_.right;
        this.root_ = this.root_.left;
        this.splay_(key);
        this.root_.right = right;
    }
    return removed;
};
/**
 * @param {number} key
 * @return {(SplayTree.Node|null)}
 */
SplayTree.prototype.find = function(key) {
    if (this.isEmpty()) {
        return null;
    }
    this.splay_(key);
    return this.root_.key == key ? this.root_ : null;
};
/**
 * @param {string} opt_startNode
 * @return {(SplayTree.Node|null)}
 */
SplayTree.prototype.findMax = function(opt_startNode) {
    if (this.isEmpty()) {
        return null;
    }
    var current = opt_startNode || this.root_;
    for (;current.right;) {
        current = current.right;
    }
    return current;
};
/**
 * @param {?} key
 * @return {(SplayTree.Node|null)}
 */
SplayTree.prototype.findGreatestLessThan = function(key) {
    if (this.isEmpty()) {
        return null;
    }
    this.splay_(key);
    if (this.root_.key < key) {
        return this.root_;
    } else {
        if (this.root_.left) {
            return this.findMax(this.root_.left);
        } else {
            return null;
        }
    }
};
/**
 * @return {(Array<|null)}
 */
SplayTree.prototype.exportKeys = function() {
    /** @type {Array} */
    var result = [];
    if (!this.isEmpty()) {
        this.root_.traverse_(function(pair) {
            result.push(pair.key);
        });
    }
    return result;
};
/**
 * @param {number} key
 * @return {undefined}
 */
SplayTree.prototype.splay_ = function(key) {
    if (this.isEmpty()) {
        return;
    }
    var dummy;
    var left;
    var right;
    dummy = left = right = new SplayTree.Node(null, null);
    var current = this.root_;
    for (;true;) {
        if (key < current.key) {
            if (!current.left) {
                break;
            }
            if (key < current.left.key) {
                var tmp = current.left;
                current.left = tmp.right;
                tmp.right = current;
                current = tmp;
                if (!current.left) {
                    break;
                }
            }
            right.left = current;
            right = current;
            current = current.left;
        } else {
            if (key > current.key) {
                if (!current.right) {
                    break;
                }
                if (key > current.right.key) {
                    tmp = current.right;
                    current.right = tmp.left;
                    tmp.left = current;
                    current = tmp;
                    if (!current.right) {
                        break;
                    }
                }
                left.right = current;
                left = current;
                current = current.right;
            } else {
                break;
            }
        }
    }
    left.right = current.left;
    right.left = current.right;
    current.left = dummy.right;
    current.right = dummy.left;
    this.root_ = current;
};
/**
 * @param {number} key
 * @param {*} val
 * @return {undefined}
 */
SplayTree.Node = function(key, val) {
    /** @type {number} */
    this.key = key;
    /** @type {*} */
    this.value = val;
};
/** @type {null} */
SplayTree.Node.prototype.left = null;
/** @type {null} */
SplayTree.Node.prototype.right = null;
/**
 * @param {function ((SplayTree.Node|null)): ?} f
 * @return {undefined}
 */
SplayTree.Node.prototype.traverse_ = function(f) {
    var current = this;
    for (;current;) {
        var left = current.left;
        if (left) {
            left.traverse_(f);
        }
        f(current);
        current = current.right;
    }
};
