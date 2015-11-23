var DeltaBlue = new BenchmarkSuite("DeltaBlue", [66118], [new Benchmark("DeltaBlue", true, false, 4400, deltaBlue)]);
Object.defineProperty(Object.prototype, "inheritsFrom", {
    /**
     * @param {Object} b
     * @return {undefined}
     */
    value : function(b) {
        /**
         * @return {undefined}
         */
        function c() {
        }
        c.prototype = b.prototype;
        this.prototype = new c;
        /** @type {Object} */
        this.superConstructor = b;
    }
});
/**
 * @return {undefined}
 */
function OrderedCollection() {
    /** @type {Array} */
    this.elms = new Array;
}
/**
 * @param {?} elm
 * @return {undefined}
 */
OrderedCollection.prototype.add = function(elm) {
    this.elms.push(elm);
};
/**
 * @param {number} index
 * @return {?}
 */
OrderedCollection.prototype.at = function(index) {
    return this.elms[index];
};
/**
 * @return {?}
 */
OrderedCollection.prototype.size = function() {
    return this.elms.length;
};
/**
 * @return {?}
 */
OrderedCollection.prototype.removeFirst = function() {
    return this.elms.pop();
};
/**
 * @param {?} elm
 * @return {undefined}
 */
OrderedCollection.prototype.remove = function(elm) {
    /** @type {number} */
    var index = 0;
    /** @type {number} */
    var padLength = 0;
    /** @type {number} */
    var i = 0;
    for (;i < this.elms.length;i++) {
        var value = this.elms[i];
        if (value != elm) {
            this.elms[index] = value;
            index++;
        } else {
            padLength++;
        }
    }
    /** @type {number} */
    i = 0;
    for (;i < padLength;i++) {
        this.elms.pop();
    }
};
/**
 * @param {?} strengthValue
 * @param {string} name
 * @return {undefined}
 */
function Strength(strengthValue, name) {
    this.strengthValue = strengthValue;
    /** @type {string} */
    this.name = name;
}
/**
 * @param {?} s1
 * @param {?} s2
 * @return {?}
 */
Strength.stronger = function(s1, s2) {
    return s1.strengthValue < s2.strengthValue;
};
/**
 * @param {?} s1
 * @param {?} s2
 * @return {?}
 */
Strength.weaker = function(s1, s2) {
    return s1.strengthValue > s2.strengthValue;
};
/**
 * @param {?} s1
 * @param {?} s2
 * @return {?}
 */
Strength.weakestOf = function(s1, s2) {
    return this.weaker(s1, s2) ? s1 : s2;
};
/**
 * @param {number} s1
 * @param {number} s2
 * @return {?}
 */
Strength.strongest = function(s1, s2) {
    return this.stronger(s1, s2) ? s1 : s2;
};
/**
 * @return {?}
 */
Strength.prototype.nextWeaker = function() {
    switch(this.strengthValue) {
        case 0:
            return Strength.WEAKEST;
        case 1:
            return Strength.WEAK_DEFAULT;
        case 2:
            return Strength.NORMAL;
        case 3:
            return Strength.STRONG_DEFAULT;
        case 4:
            return Strength.PREFERRED;
        case 5:
            return Strength.REQUIRED;
    }
};
Strength.REQUIRED = new Strength(0, "required");
Strength.STONG_PREFERRED = new Strength(1, "strongPreferred");
Strength.PREFERRED = new Strength(2, "preferred");
Strength.STRONG_DEFAULT = new Strength(3, "strongDefault");
Strength.NORMAL = new Strength(4, "normal");
Strength.WEAK_DEFAULT = new Strength(5, "weakDefault");
Strength.WEAKEST = new Strength(6, "weakest");
/**
 * @param {?} strength
 * @return {undefined}
 */
function Constraint(strength) {
    this.strength = strength;
}
/**
 * @return {undefined}
 */
Constraint.prototype.addConstraint = function() {
    this.addToGraph();
    planner.incrementalAdd(this);
};
/**
 * @param {?} mark
 * @return {?}
 */
Constraint.prototype.satisfy = function(mark) {
    this.chooseMethod(mark);
    if (!this.isSatisfied()) {
        if (this.strength == Strength.REQUIRED) {
            alert("Could not satisfy a required constraint!");
        }
        return null;
    }
    this.markInputs(mark);
    var out = this.output();
    var overridden = out.determinedBy;
    if (overridden != null) {
        overridden.markUnsatisfied();
    }
    out.determinedBy = this;
    if (!planner.addPropagate(this, mark)) {
        alert("Cycle encountered");
    }
    out.mark = mark;
    return overridden;
};
/**
 * @return {undefined}
 */
Constraint.prototype.destroyConstraint = function() {
    if (this.isSatisfied()) {
        planner.incrementalRemove(this);
    } else {
        this.removeFromGraph();
    }
};
/**
 * @return {?}
 */
Constraint.prototype.isInput = function() {
    return false;
};
/**
 * @param {?} v
 * @param {?} mapper
 * @return {undefined}
 */
function UnaryConstraint(v, mapper) {
    UnaryConstraint.superConstructor.call(this, mapper);
    this.myOutput = v;
    /** @type {boolean} */
    this.satisfied = false;
    this.addConstraint();
}
UnaryConstraint.inheritsFrom(Constraint);
/**
 * @return {undefined}
 */
UnaryConstraint.prototype.addToGraph = function() {
    this.myOutput.addConstraint(this);
    /** @type {boolean} */
    this.satisfied = false;
};
/**
 * @param {?} mark
 * @return {undefined}
 */
UnaryConstraint.prototype.chooseMethod = function(mark) {
    this.satisfied = this.myOutput.mark != mark && Strength.stronger(this.strength, this.myOutput.walkStrength);
};
/**
 * @return {?}
 */
UnaryConstraint.prototype.isSatisfied = function() {
    return this.satisfied;
};
/**
 * @param {?} mark
 * @return {undefined}
 */
UnaryConstraint.prototype.markInputs = function(mark) {
};
/**
 * @return {?}
 */
UnaryConstraint.prototype.output = function() {
    return this.myOutput;
};
/**
 * @return {undefined}
 */
UnaryConstraint.prototype.recalculate = function() {
    this.myOutput.walkStrength = this.strength;
    /** @type {boolean} */
    this.myOutput.stay = !this.isInput();
    if (this.myOutput.stay) {
        this.execute();
    }
};
/**
 * @return {undefined}
 */
UnaryConstraint.prototype.markUnsatisfied = function() {
    /** @type {boolean} */
    this.satisfied = false;
};
/**
 * @return {?}
 */
UnaryConstraint.prototype.inputsKnown = function() {
    return true;
};
/**
 * @return {undefined}
 */
UnaryConstraint.prototype.removeFromGraph = function() {
    if (this.myOutput != null) {
        this.myOutput.removeConstraint(this);
    }
    /** @type {boolean} */
    this.satisfied = false;
};
/**
 * @param {?} mapper
 * @param {?} str
 * @return {undefined}
 */
function StayConstraint(mapper, str) {
    StayConstraint.superConstructor.call(this, mapper, str);
}
StayConstraint.inheritsFrom(UnaryConstraint);
/**
 * @return {undefined}
 */
StayConstraint.prototype.execute = function() {
};
/**
 * @param {?} mapper
 * @param {?} str
 * @return {undefined}
 */
function EditConstraint(mapper, str) {
    EditConstraint.superConstructor.call(this, mapper, str);
}
EditConstraint.inheritsFrom(UnaryConstraint);
/**
 * @return {?}
 */
EditConstraint.prototype.isInput = function() {
    return true;
};
/**
 * @return {undefined}
 */
EditConstraint.prototype.execute = function() {
};
/** @type {Object} */
var Direction = new Object;
/** @type {number} */
Direction.NONE = 0;
/** @type {number} */
Direction.FORWARD = 1;
/** @type {number} */
Direction.BACKWARD = -1;
/**
 * @param {number} var1
 * @param {number} var2
 * @param {?} mapper
 * @return {undefined}
 */
function BinaryConstraint(var1, var2, mapper) {
    BinaryConstraint.superConstructor.call(this, mapper);
    /** @type {number} */
    this.v1 = var1;
    /** @type {number} */
    this.v2 = var2;
    this.direction = Direction.NONE;
    this.addConstraint();
}
BinaryConstraint.inheritsFrom(Constraint);
/**
 * @param {?} mark
 * @return {undefined}
 */
BinaryConstraint.prototype.chooseMethod = function(mark) {
    if (this.v1.mark == mark) {
        this.direction = this.v2.mark != mark && Strength.stronger(this.strength, this.v2.walkStrength) ? Direction.FORWARD : Direction.NONE;
    }
    if (this.v2.mark == mark) {
        this.direction = this.v1.mark != mark && Strength.stronger(this.strength, this.v1.walkStrength) ? Direction.BACKWARD : Direction.NONE;
    }
    if (Strength.weaker(this.v1.walkStrength, this.v2.walkStrength)) {
        this.direction = Strength.stronger(this.strength, this.v1.walkStrength) ? Direction.BACKWARD : Direction.NONE;
    } else {
        this.direction = Strength.stronger(this.strength, this.v2.walkStrength) ? Direction.FORWARD : Direction.BACKWARD;
    }
};
/**
 * @return {undefined}
 */
BinaryConstraint.prototype.addToGraph = function() {
    this.v1.addConstraint(this);
    this.v2.addConstraint(this);
    this.direction = Direction.NONE;
};
/**
 * @return {?}
 */
BinaryConstraint.prototype.isSatisfied = function() {
    return this.direction != Direction.NONE;
};
/**
 * @param {?} mark
 * @return {undefined}
 */
BinaryConstraint.prototype.markInputs = function(mark) {
    this.input().mark = mark;
};
/**
 * @return {?}
 */
BinaryConstraint.prototype.input = function() {
    return this.direction == Direction.FORWARD ? this.v1 : this.v2;
};
/**
 * @return {?}
 */
BinaryConstraint.prototype.output = function() {
    return this.direction == Direction.FORWARD ? this.v2 : this.v1;
};
/**
 * @return {undefined}
 */
BinaryConstraint.prototype.recalculate = function() {
    var ihn = this.input();
    var out = this.output();
    out.walkStrength = Strength.weakestOf(this.strength, ihn.walkStrength);
    out.stay = ihn.stay;
    if (out.stay) {
        this.execute();
    }
};
/**
 * @return {undefined}
 */
BinaryConstraint.prototype.markUnsatisfied = function() {
    this.direction = Direction.NONE;
};
/**
 * @param {?} mark
 * @return {?}
 */
BinaryConstraint.prototype.inputsKnown = function(mark) {
    var i = this.input();
    return i.mark == mark || (i.stay || i.determinedBy == null);
};
/**
 * @return {undefined}
 */
BinaryConstraint.prototype.removeFromGraph = function() {
    if (this.v1 != null) {
        this.v1.removeConstraint(this);
    }
    if (this.v2 != null) {
        this.v2.removeConstraint(this);
    }
    this.direction = Direction.NONE;
};
/**
 * @param {?} mapper
 * @param {Object} scale
 * @param {Object} offset
 * @param {?} graphics
 * @param {?} capture
 * @return {undefined}
 */
function ScaleConstraint(mapper, scale, offset, graphics, capture) {
    this.direction = Direction.NONE;
    /** @type {Object} */
    this.scale = scale;
    /** @type {Object} */
    this.offset = offset;
    ScaleConstraint.superConstructor.call(this, mapper, graphics, capture);
}
ScaleConstraint.inheritsFrom(BinaryConstraint);
/**
 * @return {undefined}
 */
ScaleConstraint.prototype.addToGraph = function() {
    ScaleConstraint.superConstructor.prototype.addToGraph.call(this);
    this.scale.addConstraint(this);
    this.offset.addConstraint(this);
};
/**
 * @return {undefined}
 */
ScaleConstraint.prototype.removeFromGraph = function() {
    ScaleConstraint.superConstructor.prototype.removeFromGraph.call(this);
    if (this.scale != null) {
        this.scale.removeConstraint(this);
    }
    if (this.offset != null) {
        this.offset.removeConstraint(this);
    }
};
/**
 * @param {?} mark
 * @return {undefined}
 */
ScaleConstraint.prototype.markInputs = function(mark) {
    ScaleConstraint.superConstructor.prototype.markInputs.call(this, mark);
    this.scale.mark = this.offset.mark = mark;
};
/**
 * @return {undefined}
 */
ScaleConstraint.prototype.execute = function() {
    if (this.direction == Direction.FORWARD) {
        this.v2.value = this.v1.value * this.scale.value + this.offset.value;
    } else {
        /** @type {number} */
        this.v1.value = (this.v2.value - this.offset.value) / this.scale.value;
    }
};
/**
 * @return {undefined}
 */
ScaleConstraint.prototype.recalculate = function() {
    var ihn = this.input();
    var out = this.output();
    out.walkStrength = Strength.weakestOf(this.strength, ihn.walkStrength);
    out.stay = ihn.stay && (this.scale.stay && this.offset.stay);
    if (out.stay) {
        this.execute();
    }
};
/**
 * @param {?} mapper
 * @param {?} var2
 * @param {?} capture
 * @return {undefined}
 */
function EqualityConstraint(mapper, var2, capture) {
    EqualityConstraint.superConstructor.call(this, mapper, var2, capture);
}
EqualityConstraint.inheritsFrom(BinaryConstraint);
/**
 * @return {undefined}
 */
EqualityConstraint.prototype.execute = function() {
    this.output().value = this.input().value;
};
/**
 * @param {string} name
 * @param {number} initialValue
 * @return {undefined}
 */
function Variable(name, initialValue) {
    this.value = initialValue || 0;
    this.constraints = new OrderedCollection;
    /** @type {null} */
    this.determinedBy = null;
    /** @type {number} */
    this.mark = 0;
    this.walkStrength = Strength.WEAKEST;
    /** @type {boolean} */
    this.stay = true;
    /** @type {string} */
    this.name = name;
}
/**
 * @param {?} c
 * @return {undefined}
 */
Variable.prototype.addConstraint = function(c) {
    this.constraints.add(c);
};
/**
 * @param {?} c
 * @return {undefined}
 */
Variable.prototype.removeConstraint = function(c) {
    this.constraints.remove(c);
    if (this.determinedBy == c) {
        /** @type {null} */
        this.determinedBy = null;
    }
};
/**
 * @return {undefined}
 */
function Planner() {
    /** @type {number} */
    this.currentMark = 0;
}
/**
 * @param {?} c
 * @return {undefined}
 */
Planner.prototype.incrementalAdd = function(c) {
    var mark = this.newMark();
    var overridden = c.satisfy(mark);
    for (;overridden != null;) {
        overridden = overridden.satisfy(mark);
    }
};
/**
 * @param {(Object|string)} c
 * @return {undefined}
 */
Planner.prototype.incrementalRemove = function(c) {
    var out = c.output();
    c.markUnsatisfied();
    c.removeFromGraph();
    var unsatisfied = this.removePropagateFrom(out);
    var strength = Strength.REQUIRED;
    do {
        /** @type {number} */
        var i = 0;
        for (;i < unsatisfied.size();i++) {
            var u = unsatisfied.at(i);
            if (u.strength == strength) {
                this.incrementalAdd(u);
            }
        }
        strength = strength.nextWeaker();
    } while (strength != Strength.WEAKEST);
};
/**
 * @return {?}
 */
Planner.prototype.newMark = function() {
    return++this.currentMark;
};
/**
 * @param {Blob} sources
 * @return {?}
 */
Planner.prototype.makePlan = function(sources) {
    var mark = this.newMark();
    var plan = new Plan;
    /** @type {Blob} */
    var todo = sources;
    for (;todo.size() > 0;) {
        var c = todo.removeFirst();
        if (c.output().mark != mark && c.inputsKnown(mark)) {
            plan.addConstraint(c);
            c.output().mark = mark;
            this.addConstraintsConsumingTo(c.output(), todo);
        }
    }
    return plan;
};
/**
 * @param {Object} constraints
 * @return {?}
 */
Planner.prototype.extractPlanFromConstraints = function(constraints) {
    var sources = new OrderedCollection;
    /** @type {number} */
    var i = 0;
    for (;i < constraints.size();i++) {
        var c = constraints.at(i);
        if (c.isInput() && c.isSatisfied()) {
            sources.add(c);
        }
    }
    return this.makePlan(sources);
};
/**
 * @param {(Object|string)} c
 * @param {?} mark
 * @return {?}
 */
Planner.prototype.addPropagate = function(c, mark) {
    var todo = new OrderedCollection;
    todo.add(c);
    for (;todo.size() > 0;) {
        var d = todo.removeFirst();
        if (d.output().mark == mark) {
            this.incrementalRemove(c);
            return false;
        }
        d.recalculate();
        this.addConstraintsConsumingTo(d.output(), todo);
    }
    return true;
};
/**
 * @param {?} out
 * @return {?}
 */
Planner.prototype.removePropagateFrom = function(out) {
    /** @type {null} */
    out.determinedBy = null;
    out.walkStrength = Strength.WEAKEST;
    /** @type {boolean} */
    out.stay = true;
    var unsatisfied = new OrderedCollection;
    var todo = new OrderedCollection;
    todo.add(out);
    for (;todo.size() > 0;) {
        var v = todo.removeFirst();
        /** @type {number} */
        var i = 0;
        for (;i < v.constraints.size();i++) {
            var c = v.constraints.at(i);
            if (!c.isSatisfied()) {
                unsatisfied.add(c);
            }
        }
        var determining = v.determinedBy;
        /** @type {number} */
        i = 0;
        for (;i < v.constraints.size();i++) {
            var next = v.constraints.at(i);
            if (next != determining && next.isSatisfied()) {
                next.recalculate();
                todo.add(next.output());
            }
        }
    }
    return unsatisfied;
};
/**
 * @param {?} v
 * @param {?} coll
 * @return {undefined}
 */
Planner.prototype.addConstraintsConsumingTo = function(v, coll) {
    var determining = v.determinedBy;
    var cc = v.constraints;
    /** @type {number} */
    var i = 0;
    for (;i < cc.size();i++) {
        var c = cc.at(i);
        if (c != determining && c.isSatisfied()) {
            coll.add(c);
        }
    }
};
/**
 * @return {undefined}
 */
function Plan() {
    this.v = new OrderedCollection;
}
/**
 * @param {?} c
 * @return {undefined}
 */
Plan.prototype.addConstraint = function(c) {
    this.v.add(c);
};
/**
 * @return {?}
 */
Plan.prototype.size = function() {
    return this.v.size();
};
/**
 * @param {number} index
 * @return {?}
 */
Plan.prototype.constraintAt = function(index) {
    return this.v.at(index);
};
/**
 * @return {undefined}
 */
Plan.prototype.execute = function() {
    /** @type {number} */
    var i = 0;
    for (;i < this.size();i++) {
        var c = this.constraintAt(i);
        c.execute();
    }
};
/**
 * @param {number} n
 * @return {undefined}
 */
function chainTest(n) {
    planner = new Planner;
    /** @type {null} */
    var prev = null;
    /** @type {null} */
    var first = null;
    /** @type {null} */
    var last = null;
    /** @type {number} */
    var i = 0;
    for (;i <= n;i++) {
        /** @type {string} */
        var name = "v" + i;
        var v = new Variable(name);
        if (prev != null) {
            new EqualityConstraint(prev, v, Strength.REQUIRED);
        }
        if (i == 0) {
            first = v;
        }
        if (i == n) {
            last = v;
        }
        prev = v;
    }
    new StayConstraint(last, Strength.STRONG_DEFAULT);
    var edit = new EditConstraint(first, Strength.PREFERRED);
    var edits = new OrderedCollection;
    edits.add(edit);
    var plan = planner.extractPlanFromConstraints(edits);
    /** @type {number} */
    i = 0;
    for (;i < 100;i++) {
        /** @type {number} */
        first.value = i;
        plan.execute();
        if (last.value != i) {
            alert("Chain test failed.");
        }
    }
}
/**
 * @param {number} n
 * @return {undefined}
 */
function projectionTest(n) {
    planner = new Planner;
    var scale = new Variable("scale", 10);
    var offset = new Variable("offset", 1E3);
    /** @type {null} */
    var src = null;
    /** @type {null} */
    var dst = null;
    var dests = new OrderedCollection;
    /** @type {number} */
    var i = 0;
    for (;i < n;i++) {
        src = new Variable("src" + i, i);
        dst = new Variable("dst" + i, i);
        dests.add(dst);
        new StayConstraint(src, Strength.NORMAL);
        new ScaleConstraint(src, scale, offset, dst, Strength.REQUIRED);
    }
    change(src, 17);
    if (dst.value != 1170) {
        alert("Projection 1 failed");
    }
    change(dst, 1050);
    if (src.value != 5) {
        alert("Projection 2 failed");
    }
    change(scale, 5);
    /** @type {number} */
    i = 0;
    for (;i < n - 1;i++) {
        if (dests.at(i).value != i * 5 + 1E3) {
            alert("Projection 3 failed");
        }
    }
    change(offset, 2E3);
    /** @type {number} */
    i = 0;
    for (;i < n - 1;i++) {
        if (dests.at(i).value != i * 5 + 2E3) {
            alert("Projection 4 failed");
        }
    }
}
/**
 * @param {Object} v
 * @param {number} opt_attributes
 * @return {undefined}
 */
function change(v, opt_attributes) {
    var edit = new EditConstraint(v, Strength.PREFERRED);
    var edits = new OrderedCollection;
    edits.add(edit);
    var plan = planner.extractPlanFromConstraints(edits);
    /** @type {number} */
    var i = 0;
    for (;i < 10;i++) {
        /** @type {number} */
        v.value = opt_attributes;
        plan.execute();
    }
    edit.destroyConstraint();
}
/** @type {null} */
var planner = null;
/**
 * @return {undefined}
 */
function deltaBlue() {
    chainTest(100);
    projectionTest(100);
}
;