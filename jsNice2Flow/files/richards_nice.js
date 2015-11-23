var Richards = new BenchmarkSuite("Richards", [35302], [new Benchmark("Richards", true, false, 8200, runRichards)]);
/**
 * @return {undefined}
 */
function runRichards() {
    /** @type {Scheduler} */
    var scheduler = new Scheduler;
    scheduler.addIdleTask(ID_IDLE, 0, null, COUNT);
    /** @type {Packet} */
    var queue = new Packet(null, ID_WORKER, KIND_WORK);
    /** @type {Packet} */
    queue = new Packet(queue, ID_WORKER, KIND_WORK);
    scheduler.addWorkerTask(ID_WORKER, 1E3, queue);
    /** @type {Packet} */
    queue = new Packet(null, ID_DEVICE_A, KIND_DEVICE);
    /** @type {Packet} */
    queue = new Packet(queue, ID_DEVICE_A, KIND_DEVICE);
    /** @type {Packet} */
    queue = new Packet(queue, ID_DEVICE_A, KIND_DEVICE);
    scheduler.addHandlerTask(ID_HANDLER_A, 2E3, queue);
    /** @type {Packet} */
    queue = new Packet(null, ID_DEVICE_B, KIND_DEVICE);
    /** @type {Packet} */
    queue = new Packet(queue, ID_DEVICE_B, KIND_DEVICE);
    /** @type {Packet} */
    queue = new Packet(queue, ID_DEVICE_B, KIND_DEVICE);
    scheduler.addHandlerTask(ID_HANDLER_B, 3E3, queue);
    scheduler.addDeviceTask(ID_DEVICE_A, 4E3, null);
    scheduler.addDeviceTask(ID_DEVICE_B, 5E3, null);
    scheduler.schedule();
    if (scheduler.queueCount != EXPECTED_QUEUE_COUNT || scheduler.holdCount != EXPECTED_HOLD_COUNT) {
        /** @type {string} */
        var str = "Error during execution: queueCount = " + scheduler.queueCount + ", holdCount = " + scheduler.holdCount + ".";
        throw new Error(str);
    }
}
/** @type {number} */
var COUNT = 1E3;
/** @type {number} */
var EXPECTED_QUEUE_COUNT = 2322;
/** @type {number} */
var EXPECTED_HOLD_COUNT = 928;
/**
 * @constructor
 */
function Scheduler() {
    /** @type {number} */
    this.queueCount = 0;
    /** @type {number} */
    this.holdCount = 0;
    /** @type {Array} */
    this.blocks = new Array(NUMBER_OF_IDS);
    /** @type {null} */
    this.list = null;
    /** @type {null} */
    this.currentTcb = null;
    /** @type {null} */
    this.currentId = null;
}
/** @type {number} */
var ID_IDLE = 0;
/** @type {number} */
var ID_WORKER = 1;
/** @type {number} */
var ID_HANDLER_A = 2;
/** @type {number} */
var ID_HANDLER_B = 3;
/** @type {number} */
var ID_DEVICE_A = 4;
/** @type {number} */
var ID_DEVICE_B = 5;
/** @type {number} */
var NUMBER_OF_IDS = 6;
/** @type {number} */
var KIND_DEVICE = 0;
/** @type {number} */
var KIND_WORK = 1;
/**
 * @param {number} id
 * @param {number} priority
 * @param {(Packet|null)} queue
 * @param {number} count
 * @return {undefined}
 */
Scheduler.prototype.addIdleTask = function(id, priority, queue, count) {
    this.addRunningTask(id, priority, queue, new IdleTask(this, 1, count));
};
/**
 * @param {number} id
 * @param {number} opt_attributes
 * @param {(Packet|null)} queue
 * @return {undefined}
 */
Scheduler.prototype.addWorkerTask = function(id, opt_attributes, queue) {
    this.addTask(id, opt_attributes, queue, new WorkerTask(this, ID_HANDLER_A, 0));
};
/**
 * @param {number} id
 * @param {number} opt_attributes
 * @param {(Packet|null)} queue
 * @return {undefined}
 */
Scheduler.prototype.addHandlerTask = function(id, opt_attributes, queue) {
    this.addTask(id, opt_attributes, queue, new HandlerTask(this));
};
/**
 * @param {number} id
 * @param {number} opt_attributes
 * @param {(Packet|null)} queue
 * @return {undefined}
 */
Scheduler.prototype.addDeviceTask = function(id, opt_attributes, queue) {
    this.addTask(id, opt_attributes, queue, new DeviceTask(this));
};
/**
 * @param {number} id
 * @param {number} priority
 * @param {(Packet|null)} queue
 * @param {number} task
 * @return {undefined}
 */
Scheduler.prototype.addRunningTask = function(id, priority, queue, task) {
    this.addTask(id, priority, queue, task);
    this.currentTcb.setRunning();
};
/**
 * @param {number} id
 * @param {number} opt_attributes
 * @param {(Packet|null)} queue
 * @param {number} task
 * @return {undefined}
 */
Scheduler.prototype.addTask = function(id, opt_attributes, queue, task) {
    /** @type {TaskControlBlock} */
    this.currentTcb = new TaskControlBlock(this.list, id, opt_attributes, queue, task);
    /** @type {TaskControlBlock} */
    this.list = this.currentTcb;
    /** @type {TaskControlBlock} */
    this.blocks[id] = this.currentTcb;
};
/**
 * @return {undefined}
 */
Scheduler.prototype.schedule = function() {
    /** @type {(TaskControlBlock|null)} */
    this.currentTcb = this.list;
    for (;this.currentTcb != null;) {
        if (this.currentTcb.isHeldOrSuspended()) {
            this.currentTcb = this.currentTcb.link;
        } else {
            this.currentId = this.currentTcb.id;
            this.currentTcb = this.currentTcb.run();
        }
    }
};
/**
 * @param {number} id
 * @return {?}
 */
Scheduler.prototype.release = function(id) {
    var tcb = this.blocks[id];
    if (tcb == null) {
        return tcb;
    }
    tcb.markAsNotHeld();
    if (tcb.priority > this.currentTcb.priority) {
        return tcb;
    } else {
        return this.currentTcb;
    }
};
/**
 * @return {?}
 */
Scheduler.prototype.holdCurrent = function() {
    this.holdCount++;
    this.currentTcb.markAsHeld();
    return this.currentTcb.link;
};
/**
 * @return {?}
 */
Scheduler.prototype.suspendCurrent = function() {
    this.currentTcb.markAsSuspended();
    return this.currentTcb;
};
/**
 * @param {(Packet|null)} packet
 * @return {?}
 */
Scheduler.prototype.queue = function(packet) {
    var t = this.blocks[packet.id];
    if (t == null) {
        return t;
    }
    this.queueCount++;
    /** @type {null} */
    packet.link = null;
    packet.id = this.currentId;
    return t.checkPriorityAdd(this.currentTcb, packet);
};
/**
 * @param {(TaskControlBlock|null)} link
 * @param {number} id
 * @param {number} priority
 * @param {(Packet|null)} queue
 * @param {Function} task
 * @constructor
 */
function TaskControlBlock(link, id, priority, queue, task) {
    /** @type {(TaskControlBlock|null)} */
    this.link = link;
    /** @type {number} */
    this.id = id;
    /** @type {number} */
    this.priority = priority;
    /** @type {(Packet|null)} */
    this.queue = queue;
    /** @type {Function} */
    this.task = task;
    if (queue == null) {
        this.state = STATE_SUSPENDED;
    } else {
        this.state = STATE_SUSPENDED_RUNNABLE;
    }
}
/** @type {number} */
var STATE_RUNNING = 0;
/** @type {number} */
var STATE_RUNNABLE = 1;
/** @type {number} */
var STATE_SUSPENDED = 2;
/** @type {number} */
var STATE_HELD = 4;
/** @type {number} */
var STATE_SUSPENDED_RUNNABLE = STATE_SUSPENDED | STATE_RUNNABLE;
/** @type {number} */
var STATE_NOT_HELD = ~STATE_HELD;
/**
 * @return {undefined}
 */
TaskControlBlock.prototype.setRunning = function() {
    this.state = STATE_RUNNING;
};
/**
 * @return {undefined}
 */
TaskControlBlock.prototype.markAsNotHeld = function() {
    /** @type {number} */
    this.state = this.state & STATE_NOT_HELD;
};
/**
 * @return {undefined}
 */
TaskControlBlock.prototype.markAsHeld = function() {
    /** @type {number} */
    this.state = this.state | STATE_HELD;
};
/**
 * @return {?}
 */
TaskControlBlock.prototype.isHeldOrSuspended = function() {
    return(this.state & STATE_HELD) != 0 || this.state == STATE_SUSPENDED;
};
/**
 * @return {undefined}
 */
TaskControlBlock.prototype.markAsSuspended = function() {
    /** @type {number} */
    this.state = this.state | STATE_SUSPENDED;
};
/**
 * @return {undefined}
 */
TaskControlBlock.prototype.markAsRunnable = function() {
    /** @type {number} */
    this.state = this.state | STATE_RUNNABLE;
};
/**
 * @return {?}
 */
TaskControlBlock.prototype.run = function() {
    var packet;
    if (this.state == STATE_SUSPENDED_RUNNABLE) {
        /** @type {(Packet|null)} */
        packet = this.queue;
        this.queue = packet.link;
        if (this.queue == null) {
            this.state = STATE_RUNNING;
        } else {
            this.state = STATE_RUNNABLE;
        }
    } else {
        /** @type {null} */
        packet = null;
    }
    return this.task.run(packet);
};
/**
 * @param {Object} task
 * @param {Packet} packet
 * @return {?}
 */
TaskControlBlock.prototype.checkPriorityAdd = function(task, packet) {
    if (this.queue == null) {
        /** @type {Packet} */
        this.queue = packet;
        this.markAsRunnable();
        if (this.priority > task.priority) {
            return this;
        }
    } else {
        this.queue = packet.addTo(this.queue);
    }
    return task;
};
/**
 * @return {string}
 */
TaskControlBlock.prototype.toString = function() {
    return "tcb { " + this.task + "@" + this.state + " }";
};
/**
 * @param {(Scheduler|null)} scheduler
 * @param {number} v1
 * @param {number} count
 * @constructor
 */
function IdleTask(scheduler, v1, count) {
    /** @type {(Scheduler|null)} */
    this.scheduler = scheduler;
    /** @type {number} */
    this.v1 = v1;
    /** @type {number} */
    this.count = count;
}
/**
 * @param {?} packet
 * @return {?}
 */
IdleTask.prototype.run = function(packet) {
    this.count--;
    if (this.count == 0) {
        return this.scheduler.holdCurrent();
    }
    if ((this.v1 & 1) == 0) {
        /** @type {number} */
        this.v1 = this.v1 >> 1;
        return this.scheduler.release(ID_DEVICE_A);
    } else {
        /** @type {number} */
        this.v1 = this.v1 >> 1 ^ 53256;
        return this.scheduler.release(ID_DEVICE_B);
    }
};
/**
 * @return {string}
 */
IdleTask.prototype.toString = function() {
    return "IdleTask";
};
/**
 * @param {(Scheduler|null)} scheduler
 * @constructor
 */
function DeviceTask(scheduler) {
    /** @type {(Scheduler|null)} */
    this.scheduler = scheduler;
    /** @type {null} */
    this.v1 = null;
}
/**
 * @param {number} packet
 * @return {?}
 */
DeviceTask.prototype.run = function(packet) {
    if (packet == null) {
        if (this.v1 == null) {
            return this.scheduler.suspendCurrent();
        }
        var v = this.v1;
        /** @type {null} */
        this.v1 = null;
        return this.scheduler.queue(v);
    } else {
        /** @type {number} */
        this.v1 = packet;
        return this.scheduler.holdCurrent();
    }
};
/**
 * @return {string}
 */
DeviceTask.prototype.toString = function() {
    return "DeviceTask";
};
/**
 * @param {(Scheduler|null)} scheduler
 * @param {number} v1
 * @param {number} v2
 * @constructor
 */
function WorkerTask(scheduler, v1, v2) {
    /** @type {(Scheduler|null)} */
    this.scheduler = scheduler;
    /** @type {number} */
    this.v1 = v1;
    /** @type {number} */
    this.v2 = v2;
}
/**
 * @param {Packet} packet
 * @return {?}
 */
WorkerTask.prototype.run = function(packet) {
    if (packet == null) {
        return this.scheduler.suspendCurrent();
    } else {
        if (this.v1 == ID_HANDLER_A) {
            this.v1 = ID_HANDLER_B;
        } else {
            this.v1 = ID_HANDLER_A;
        }
        packet.id = this.v1;
        /** @type {number} */
        packet.a1 = 0;
        /** @type {number} */
        var i = 0;
        for (;i < DATA_SIZE;i++) {
            this.v2++;
            if (this.v2 > 26) {
                /** @type {number} */
                this.v2 = 1;
            }
            /** @type {number} */
            packet.a2[i] = this.v2;
        }
        return this.scheduler.queue(packet);
    }
};
/**
 * @return {string}
 */
WorkerTask.prototype.toString = function() {
    return "WorkerTask";
};
/**
 * @param {(Scheduler|null)} scheduler
 * @constructor
 */
function HandlerTask(scheduler) {
    /** @type {(Scheduler|null)} */
    this.scheduler = scheduler;
    /** @type {null} */
    this.v1 = null;
    /** @type {null} */
    this.v2 = null;
}
/**
 * @param {string} packet
 * @return {?}
 */
HandlerTask.prototype.run = function(packet) {
    if (packet != null) {
        if (packet.kind == KIND_WORK) {
            this.v1 = packet.addTo(this.v1);
        } else {
            this.v2 = packet.addTo(this.v2);
        }
    }
    if (this.v1 != null) {
        var count = this.v1.a1;
        var v;
        if (count < DATA_SIZE) {
            if (this.v2 != null) {
                v = this.v2;
                this.v2 = this.v2.link;
                v.a1 = this.v1.a2[count];
                this.v1.a1 = count + 1;
                return this.scheduler.queue(v);
            }
        } else {
            v = this.v1;
            this.v1 = this.v1.link;
            return this.scheduler.queue(v);
        }
    }
    return this.scheduler.suspendCurrent();
};
/**
 * @return {string}
 */
HandlerTask.prototype.toString = function() {
    return "HandlerTask";
};
/** @type {number} */
var DATA_SIZE = 4;
/**
 * @param {(Packet|null)} link
 * @param {number} id
 * @param {number} kind
 * @constructor
 */
function Packet(link, id, kind) {
    /** @type {(Packet|null)} */
    this.link = link;
    /** @type {number} */
    this.id = id;
    /** @type {number} */
    this.kind = kind;
    /** @type {number} */
    this.a1 = 0;
    /** @type {Array} */
    this.a2 = new Array(DATA_SIZE);
}
/**
 * @param {(Packet|null)} queue
 * @return {?}
 */
Packet.prototype.addTo = function(queue) {
    /** @type {null} */
    this.link = null;
    if (queue == null) {
        return this;
    }
    var peek;
    /** @type {Packet} */
    var next = queue;
    for (;(peek = next.link) != null;) {
        /** @type {(Packet|null)} */
        next = peek;
    }
    /** @type {Packet} */
    next.link = this;
    return queue;
};
/**
 * @return {string}
 */
Packet.prototype.toString = function() {
    return "Packet";
};
