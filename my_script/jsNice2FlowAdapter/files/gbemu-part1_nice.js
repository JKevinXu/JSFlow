var GameboyBenchmark = new BenchmarkSuite("Gameboy", [26288412], [new Benchmark("Gameboy", false, false, 20, runGameboy, setupGameboy, tearDownGameboy, null, 4)]);
/** @type {null} */
var decoded_gameboy_rom = null;
/**
 * @return {undefined}
 */
function setupGameboy() {
    if (!(typeof Uint8Array != "undefined" && (typeof Int8Array != "undefined" && (typeof Float32Array != "undefined" && typeof Int32Array != "undefined")))) {
        throw "TypedArrayUnsupported";
    }
    decoded_gameboy_rom = base64_decode(gameboy_rom);
    /** @type {null} */
    rom = null;
}
/**
 * @return {undefined}
 */
function runGameboy() {
    start(new GameBoyCanvas, decoded_gameboy_rom);
    /** @type {number} */
    gameboy.instructions = 0;
    /** @type {number} */
    gameboy.totalInstructions = 25E4;
    for (;gameboy.instructions <= gameboy.totalInstructions;) {
        gameboy.run();
        GameBoyAudioNode.run();
    }
    resetGlobalVariables();
}
/**
 * @return {undefined}
 */
function tearDownGameboy() {
    /** @type {null} */
    decoded_gameboy_rom = null;
    /** @type {null} */
    expectedGameboyStateStr = null;
}
/** @type {string} */
var expectedGameboyStateStr = '{"registerA":160,"registerB":255,"registerC":255,"registerE":11,' + '"registersHL":51600,"programCounter":24309,"stackPointer":49706,' + '"sumROM":10171578,"sumMemory":3435856,"sumMBCRam":234598,"sumVRam":0}';
var GameBoyWindow = {};
/**
 * @return {undefined}
 */
function GameBoyContext() {
    /**
     * @return {?}
     */
    this.createBuffer = function() {
        return new Buffer;
    };
    /**
     * @param {number} width
     * @param {number} height
     * @return {?}
     */
    this.createImageData = function(width, height) {
        var evt = {};
        /** @type {Uint8Array} */
        evt.data = new Uint8Array(width * height * 4);
        return evt;
    };
    /**
     * @param {MessageEvent} imageData
     * @param {?} dirtyWidth
     * @param {?} dirtyY
     * @return {undefined}
     */
    this.putImageData = function(imageData, dirtyWidth, dirtyY) {
        /** @type {number} */
        var acc = 0;
        /** @type {number} */
        var i = 0;
        for (;i < imageData.data.length;i++) {
            acc += i * imageData.data[i];
            /** @type {number} */
            acc = acc % 1E3;
        }
    };
    /**
     * @return {undefined}
     */
    this.drawImage = function() {
    };
}
/**
 * @return {undefined}
 */
function GameBoyCanvas() {
    /**
     * @return {?}
     */
    this.getContext = function() {
        return new GameBoyContext;
    };
    /** @type {number} */
    this.width = 160;
    /** @type {number} */
    this.height = 144;
    this.style = {
        visibility : "visibile"
    };
}
/**
 * @param {?} dataAndEvents
 * @param {?} colorIndex
 * @return {undefined}
 */
function cout(dataAndEvents, colorIndex) {
}
/**
 * @return {undefined}
 */
function clear_terminal() {
}
var GameBoyAudioNode = {
    bufferSize : 0,
    onaudioprocess : null,
    /**
     * @return {undefined}
     */
    connect : function() {
    },
    /**
     * @return {undefined}
     */
    run : function() {
        var oldtitle = {
            outputBuffer : this.outputBuffer
        };
        this.onaudioprocess(oldtitle);
    }
};
/**
 * @return {undefined}
 */
function GameBoyAudioContext() {
    /**
     * @return {?}
     */
    this.createBufferSource = function() {
        return{
            /**
             * @return {undefined}
             */
            noteOn : function() {
            },
            /**
             * @return {undefined}
             */
            connect : function() {
            }
        };
    };
    /** @type {number} */
    this.sampleRate = 48E3;
    this.destination = {};
    /**
     * @param {number} dataAndEvents
     * @param {number} deepDataAndEvents
     * @param {number} numItems
     * @return {?}
     */
    this.createBuffer = function(dataAndEvents, deepDataAndEvents, numItems) {
        return{
            gain : 1,
            numberOfChannels : 1,
            length : 1,
            duration : 2.0833333110203966E-5,
            sampleRate : 48E3
        };
    };
    /**
     * @param {number} bufferSize
     * @param {number} dataAndEvents
     * @param {number} kbytes
     * @return {?}
     */
    this.createJavaScriptNode = function(bufferSize, dataAndEvents, kbytes) {
        /** @type {number} */
        GameBoyAudioNode.bufferSize = bufferSize;
        GameBoyAudioNode.outputBuffer = {
            /**
             * @param {number} channel
             * @return {?}
             */
            getChannelData : function(channel) {
                return this.channelData[channel];
            },
            channelData : []
        };
        /** @type {number} */
        var i = 0;
        for (;i < kbytes;i++) {
            /** @type {Float32Array} */
            GameBoyAudioNode.outputBuffer.channelData[i] = new Float32Array(bufferSize);
        }
        return GameBoyAudioNode;
    };
}
/** @type {number} */
var mock_date_time_counter = 0;
/**
 * @return {?}
 */
function new_Date() {
    return{
        /**
         * @return {?}
         */
        getTime : function() {
            mock_date_time_counter += 16;
            return mock_date_time_counter;
        }
    };
}
/**
 * @return {undefined}
 */
function checkFinalState() {
    /**
     * @param {Array} codeSegments
     * @return {?}
     */
    function promote(codeSegments) {
        /** @type {number} */
        var t = 0;
        /** @type {number} */
        var i = 0;
        for (;i < codeSegments.length;i++) {
            t += codeSegments[i];
        }
        return t;
    }
    var generatedColumn = {
        registerA : gameboy.registerA,
        registerB : gameboy.registerB,
        registerC : gameboy.registerC,
        registerE : gameboy.registerE,
        registerF : gameboy.registerF,
        registersHL : gameboy.registersHL,
        programCounter : gameboy.programCounter,
        stackPointer : gameboy.stackPointer,
        sumROM : promote(gameboy.fromTypedArray(gameboy.ROM)),
        sumMemory : promote(gameboy.fromTypedArray(gameboy.memory)),
        sumMBCRam : promote(gameboy.fromTypedArray(gameboy.MBCRam)),
        sumVRam : promote(gameboy.fromTypedArray(gameboy.VRam))
    };
    /** @type {string} */
    var MSG_CLOSURE_CUSTOM_COLOR_INVALID_INPUT = JSON.stringify(generatedColumn);
    if (typeof expectedGameboyStateStr != "undefined") {
        if (MSG_CLOSURE_CUSTOM_COLOR_INVALID_INPUT != expectedGameboyStateStr) {
            alert("Incorrect final state of processor:\n" + " actual   " + MSG_CLOSURE_CUSTOM_COLOR_INVALID_INPUT + "\n" + " expected " + expectedGameboyStateStr);
        }
    } else {
        alert(MSG_CLOSURE_CUSTOM_COLOR_INVALID_INPUT);
    }
}
/**
 * @return {undefined}
 */
function resetGlobalVariables() {
    /** @type {null} */
    audioContextHandle = null;
    /** @type {null} */
    audioNode = null;
    /** @type {null} */
    audioSource = null;
    /** @type {boolean} */
    launchedContext = false;
    /** @type {Array} */
    audioContextSampleBuffer = [];
    /** @type {Array} */
    resampled = [];
    /** @type {number} */
    webAudioMinBufferSize = 15E3;
    /** @type {number} */
    webAudioMaxBufferSize = 25E3;
    /** @type {number} */
    webAudioActualSampleRate = 44100;
    /** @type {number} */
    XAudioJSSampleRate = 0;
    /** @type {boolean} */
    webAudioMono = false;
    /** @type {number} */
    XAudioJSVolume = 1;
    /** @type {null} */
    resampleControl = null;
    /** @type {number} */
    audioBufferSize = 0;
    /** @type {number} */
    resampleBufferStart = 0;
    /** @type {number} */
    resampleBufferEnd = 0;
    /** @type {number} */
    resampleBufferSize = 2;
    /** @type {null} */
    gameboy = null;
    /** @type {null} */
    gbRunInterval = null;
}
/** @type {Array} */
var toBase64 = ["A", "B", "C", "D", "E", "F", "G", "H", "I", "J", "K", "L", "M", "N", "O", "P", "Q", "R", "S", "T", "U", "V", "W", "X", "Y", "Z", "a", "b", "c", "d", "e", "f", "g", "h", "i", "j", "k", "l", "m", "n", "o", "p", "q", "r", "s", "t", "u", "v", "w", "x", "y", "z", "0", "1", "2", "3", "4", "5", "6", "7", "8", "9", "+", "/", "="];
/** @type {string} */
var fromBase64 = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/=";
/**
 * @param {string} data
 * @return {?}
 */
function base64(data) {
    try {
        var base64 = GameBoyWindow.btoa(data);
    } catch (error) {
        /** @type {string} */
        base64 = "";
        var dataLength = data.length;
        if (dataLength > 0) {
            /** @type {Array} */
            var bytes = [0, 0, 0];
            /** @type {number} */
            var index = 0;
            /** @type {number} */
            var remainder = dataLength % 3;
            for (;data.length % 3 > 0;) {
                /** @type {string} */
                data[data.length] = " ";
            }
            for (;index < dataLength;) {
                /** @type {Array} */
                bytes = [data.charCodeAt(index++) & 255, data.charCodeAt(index++) & 255, data.charCodeAt(index++) & 255];
                base64 += toBase64[bytes[0] >> 2] + toBase64[(bytes[0] & 3) << 4 | bytes[1] >> 4] + toBase64[(bytes[1] & 15) << 2 | bytes[2] >> 6] + toBase64[bytes[2] & 63];
            }
            if (remainder > 0) {
                /** @type {string} */
                base64[base64.length - 1] = "=";
                if (remainder == 2) {
                    /** @type {string} */
                    base64[base64.length - 2] = "=";
                    base64[base64.length - 3] = toBase64[(bytes[0] & 3) << 4];
                } else {
                    base64[base64.length - 2] = toBase64[(bytes[1] & 15) << 2];
                }
            }
        }
    }
    return base64;
}
/**
 * @param {string} data
 * @return {?}
 */
function base64_decode(data) {
    try {
        var decode64 = GameBoyWindow.atob(data);
    } catch (error) {
        /** @type {string} */
        decode64 = "";
        var iLen = data.length;
        if (iLen > 3 && iLen % 4 == 0) {
            /** @type {Array} */
            var sixbits = [0, 0, 0, 0];
            /** @type {number} */
            var i = 0;
            for (;i < iLen;) {
                /** @type {Array} */
                sixbits = [fromBase64.indexOf(data.charAt(i++)), fromBase64.indexOf(data.charAt(i++)), fromBase64.indexOf(data.charAt(i++)), fromBase64.indexOf(data.charAt(i++))];
                decode64 += String.fromCharCode(sixbits[0] << 2 | sixbits[1] >> 4) + String.fromCharCode((sixbits[1] & 15) << 4 | sixbits[2] >> 2) + String.fromCharCode((sixbits[2] & 3) << 6 | sixbits[3]);
            }
            if (sixbits[3] >= 64) {
                decode64.length -= 1;
                if (sixbits[2] >= 64) {
                    decode64.length -= 1;
                }
            }
        }
    }
    return decode64;
}
/**
 * @param {number} str
 * @return {?}
 */
function to_little_endian_dword(str) {
    return to_little_endian_word(str) + String.fromCharCode(str >> 16 & 255, str >> 24 & 255);
}
/**
 * @param {number} str
 * @return {?}
 */
function to_little_endian_word(str) {
    return to_byte(str) + String.fromCharCode(str >> 8 & 255);
}
/**
 * @param {number} str
 * @return {?}
 */
function to_byte(str) {
    return String.fromCharCode(str & 255);
}
/**
 * @param {Array} array
 * @return {?}
 */
function arrayToBase64(array) {
    /** @type {string} */
    var msgs = "";
    var array_length = array.length;
    /** @type {number} */
    var i = 0;
    for (;i < array_length;++i) {
        if (typeof array[i] == "number") {
            msgs += String.fromCharCode(array[i]);
        }
    }
    return base64(msgs);
}
/**
 * @param {string} b64String
 * @return {?}
 */
function base64ToArray(b64String) {
    var binString = base64_decode(b64String);
    /** @type {Array} */
    var outArray = [];
    var length = binString.length;
    /** @type {number} */
    var index = 0;
    for (;index < length;) {
        outArray.push(binString.charCodeAt(index++) & 255);
    }
    return outArray;
}
/**
 * @param {?} fromSampleRate
 * @param {?} toSampleRate
 * @param {number} channels
 * @param {(Object|boolean|number|string)} outputBufferSize
 * @param {?} noReturn
 * @return {undefined}
 */
function Resampler(fromSampleRate, toSampleRate, channels, outputBufferSize, noReturn) {
    this.fromSampleRate = fromSampleRate;
    this.toSampleRate = toSampleRate;
    /** @type {number} */
    this.channels = channels | 0;
    /** @type {(Object|boolean|number|string)} */
    this.outputBufferSize = outputBufferSize;
    /** @type {boolean} */
    this.noReturn = !!noReturn;
    this.initialize();
}
/**
 * @return {undefined}
 */
Resampler.prototype.initialize = function() {
    if (this.fromSampleRate > 0 && (this.toSampleRate > 0 && this.channels > 0)) {
        if (this.fromSampleRate == this.toSampleRate) {
            this.resampler = this.bypassResampler;
            /** @type {number} */
            this.ratioWeight = 1;
        } else {
            this.compileInterpolationFunction();
            this.resampler = this.interpolate;
            /** @type {number} */
            this.ratioWeight = this.fromSampleRate / this.toSampleRate;
            /** @type {boolean} */
            this.tailExists = false;
            /** @type {number} */
            this.lastWeight = 0;
            this.initializeBuffers();
        }
    } else {
        throw new Error("Invalid settings specified for the resampler.");
    }
};
/**
 * @return {undefined}
 */
Resampler.prototype.compileInterpolationFunction = function() {
    /** @type {string} */
    var fun = "var bufferLength = Math.min(buffer.length, this.outputBufferSize);  if ((bufferLength % " + this.channels + ") == 0) {    if (bufferLength > 0) {      var ratioWeight = this.ratioWeight;      var weight = 0;";
    /** @type {number} */
    var channel = 0;
    for (;channel < this.channels;++channel) {
        fun += "var output" + channel + " = 0;";
    }
    fun += "var actualPosition = 0;      var amountToNext = 0;      var alreadyProcessedTail = !this.tailExists;      this.tailExists = false;      var outputBuffer = this.outputBuffer;      var outputOffset = 0;      var currentPosition = 0;      do {        if (alreadyProcessedTail) {          weight = ratioWeight;";
    /** @type {number} */
    channel = 0;
    for (;channel < this.channels;++channel) {
        fun += "output" + channel + " = 0;";
    }
    fun += "}        else {          weight = this.lastWeight;";
    /** @type {number} */
    channel = 0;
    for (;channel < this.channels;++channel) {
        fun += "output" + channel + " = this.lastOutput[" + channel + "];";
    }
    fun += "alreadyProcessedTail = true;        }        while (weight > 0 && actualPosition < bufferLength) {          amountToNext = 1 + actualPosition - currentPosition;          if (weight >= amountToNext) {";
    /** @type {number} */
    channel = 0;
    for (;channel < this.channels;++channel) {
        fun += "output" + channel + " += buffer[actualPosition++] * amountToNext;";
    }
    fun += "currentPosition = actualPosition;            weight -= amountToNext;          }          else {";
    /** @type {number} */
    channel = 0;
    for (;channel < this.channels;++channel) {
        fun += "output" + channel + " += buffer[actualPosition" + (channel > 0 ? " + " + channel : "") + "] * weight;";
    }
    fun += "currentPosition += weight;            weight = 0;            break;          }        }        if (weight == 0) {";
    /** @type {number} */
    channel = 0;
    for (;channel < this.channels;++channel) {
        fun += "outputBuffer[outputOffset++] = output" + channel + " / ratioWeight;";
    }
    fun += "}        else {          this.lastWeight = weight;";
    /** @type {number} */
    channel = 0;
    for (;channel < this.channels;++channel) {
        fun += "this.lastOutput[" + channel + "] = output" + channel + ";";
    }
    fun += 'this.tailExists = true;          break;        }      } while (actualPosition < bufferLength);      return this.bufferSlice(outputOffset);    }    else {      return (this.noReturn) ? 0 : [];    }  }  else {    throw(new Error("Buffer was of incorrect sample length."));  }';
    this.interpolate = Function("buffer", fun);
};
/**
 * @param {Array} buffer
 * @return {?}
 */
Resampler.prototype.bypassResampler = function(buffer) {
    if (this.noReturn) {
        /** @type {Array} */
        this.outputBuffer = buffer;
        return buffer.length;
    } else {
        return buffer;
    }
};
/**
 * @param {number} sliceAmount
 * @return {?}
 */
Resampler.prototype.bufferSlice = function(sliceAmount) {
    if (this.noReturn) {
        return sliceAmount;
    } else {
        try {
            return this.outputBuffer.subarray(0, sliceAmount);
        } catch (error) {
            try {
                /** @type {number} */
                this.outputBuffer.length = sliceAmount;
                return this.outputBuffer;
            } catch (error) {
                return this.outputBuffer.slice(0, sliceAmount);
            }
        }
    }
};
/**
 * @return {undefined}
 */
Resampler.prototype.initializeBuffers = function() {
    try {
        /** @type {Float32Array} */
        this.outputBuffer = new Float32Array(this.outputBufferSize);
        /** @type {Float32Array} */
        this.lastOutput = new Float32Array(this.channels);
    } catch (error) {
        /** @type {Array} */
        this.outputBuffer = [];
        /** @type {Array} */
        this.lastOutput = [];
    }
};
/**
 * @param {number} channels
 * @param {number} dataAndEvents
 * @param {number} minBufferSize
 * @param {number} maxBufferSize
 * @param {Function} underRunCallback
 * @param {number} volume
 * @return {undefined}
 */
function XAudioServer(channels, dataAndEvents, minBufferSize, maxBufferSize, underRunCallback, volume) {
    /** @type {number} */
    this.audioChannels = channels == 2 ? 2 : 1;
    /** @type {boolean} */
    webAudioMono = this.audioChannels == 1;
    XAudioJSSampleRate = dataAndEvents > 0 && dataAndEvents <= 16777215 ? dataAndEvents : 44100;
    /** @type {number} */
    webAudioMinBufferSize = minBufferSize >= samplesPerCallback << 1 && minBufferSize < maxBufferSize ? minBufferSize & (webAudioMono ? 4294967295 : 4294967294) : samplesPerCallback << 1;
    /** @type {number} */
    webAudioMaxBufferSize = Math.floor(maxBufferSize) > webAudioMinBufferSize + this.audioChannels ? maxBufferSize & (webAudioMono ? 4294967295 : 4294967294) : minBufferSize << 1;
    /** @type {Function} */
    this.underRunCallback = typeof underRunCallback == "function" ? underRunCallback : function() {
    };
    XAudioJSVolume = volume >= 0 && volume <= 1 ? volume : 1;
    /** @type {number} */
    this.audioType = -1;
    /** @type {Array} */
    this.mozAudioTail = [];
    /** @type {null} */
    this.audioHandleMoz = null;
    /** @type {null} */
    this.audioHandleFlash = null;
    /** @type {boolean} */
    this.flashInitialized = false;
    /** @type {boolean} */
    this.mozAudioFound = false;
    this.initializeAudio();
}
/**
 * @param {number} buffer
 * @return {undefined}
 */
XAudioServer.prototype.MOZWriteAudio = function(buffer) {
    this.MOZWriteAudioNoCallback(buffer);
    this.MOZExecuteCallback();
};
/**
 * @param {number} buffer
 * @return {undefined}
 */
XAudioServer.prototype.MOZWriteAudioNoCallback = function(buffer) {
    this.writeMozAudio(buffer);
};
/**
 * @param {number} buffer
 * @return {undefined}
 */
XAudioServer.prototype.callbackBasedWriteAudio = function(buffer) {
    this.callbackBasedWriteAudioNoCallback(buffer);
    this.callbackBasedExecuteCallback();
};
/**
 * @param {(Array|number)} buffer
 * @return {undefined}
 */
XAudioServer.prototype.callbackBasedWriteAudioNoCallback = function(buffer) {
    var numberOfChannels = buffer.length;
    /** @type {number} */
    var j = 0;
    for (;j < numberOfChannels && audioBufferSize < webAudioMaxBufferSize;) {
        audioContextSampleBuffer[audioBufferSize++] = buffer[j++];
    }
};
/**
 * @param {number} buffer
 * @return {undefined}
 */
XAudioServer.prototype.writeAudio = function(buffer) {
    if (this.audioType == 0) {
        this.MOZWriteAudio(buffer);
    } else {
        if (this.audioType == 1) {
            this.callbackBasedWriteAudio(buffer);
        } else {
            if (this.audioType == 2) {
                if (this.checkFlashInit() || launchedContext) {
                    this.callbackBasedWriteAudio(buffer);
                } else {
                    if (this.mozAudioFound) {
                        this.MOZWriteAudio(buffer);
                    }
                }
            }
        }
    }
};
/**
 * @param {number} buffer
 * @return {undefined}
 */
XAudioServer.prototype.writeAudioNoCallback = function(buffer) {
    if (this.audioType == 0) {
        this.MOZWriteAudioNoCallback(buffer);
    } else {
        if (this.audioType == 1) {
            this.callbackBasedWriteAudioNoCallback(buffer);
        } else {
            if (this.audioType == 2) {
                if (this.checkFlashInit() || launchedContext) {
                    this.callbackBasedWriteAudioNoCallback(buffer);
                } else {
                    if (this.mozAudioFound) {
                        this.MOZWriteAudioNoCallback(buffer);
                    }
                }
            }
        }
    }
};
/**
 * @return {?}
 */
XAudioServer.prototype.remainingBuffer = function() {
    if (this.audioType == 0) {
        return this.samplesAlreadyWritten - this.audioHandleMoz.mozCurrentSampleOffset();
    } else {
        if (this.audioType == 1) {
            return(resampledSamplesLeft() * resampleControl.ratioWeight >> this.audioChannels - 1 << this.audioChannels - 1) + audioBufferSize;
        } else {
            if (this.audioType == 2) {
                if (this.checkFlashInit() || launchedContext) {
                    return(resampledSamplesLeft() * resampleControl.ratioWeight >> this.audioChannels - 1 << this.audioChannels - 1) + audioBufferSize;
                } else {
                    if (this.mozAudioFound) {
                        return this.samplesAlreadyWritten - this.audioHandleMoz.mozCurrentSampleOffset();
                    }
                }
            }
        }
    }
    return 0;
};
/**
 * @return {undefined}
 */
XAudioServer.prototype.MOZExecuteCallback = function() {
    /** @type {number} */
    var samplesRequested = webAudioMinBufferSize - this.remainingBuffer();
    if (samplesRequested > 0) {
        this.writeMozAudio(this.underRunCallback(samplesRequested));
    }
};
/**
 * @return {undefined}
 */
XAudioServer.prototype.callbackBasedExecuteCallback = function() {
    /** @type {number} */
    var samplesRequested = webAudioMinBufferSize - this.remainingBuffer();
    if (samplesRequested > 0) {
        this.callbackBasedWriteAudioNoCallback(this.underRunCallback(samplesRequested));
    }
};
/**
 * @return {undefined}
 */
XAudioServer.prototype.executeCallback = function() {
    if (this.audioType == 0) {
        this.MOZExecuteCallback();
    } else {
        if (this.audioType == 1) {
            this.callbackBasedExecuteCallback();
        } else {
            if (this.audioType == 2) {
                if (this.checkFlashInit() || launchedContext) {
                    this.callbackBasedExecuteCallback();
                } else {
                    if (this.mozAudioFound) {
                        this.MOZExecuteCallback();
                    }
                }
            }
        }
    }
};
/**
 * @return {undefined}
 */
XAudioServer.prototype.initializeAudio = function() {
    try {
        throw new Error("Select initializeWebAudio case");this.preInitializeMozAudio();
        if (navigator.platform == "Linux i686") {
            throw new Error("");
        }
        this.initializeMozAudio();
    } catch (error) {
        try {
            this.initializeWebAudio();
        } catch (error) {
            try {
                this.initializeFlashAudio();
            } catch (error) {
                throw new Error("Browser does not support real time audio output.");
            }
        }
    }
};
/**
 * @return {undefined}
 */
XAudioServer.prototype.preInitializeMozAudio = function() {
    this.audioHandleMoz = new Audio;
    this.audioHandleMoz.mozSetup(this.audioChannels, XAudioJSSampleRate);
    /** @type {number} */
    this.samplesAlreadyWritten = 0;
    /** @type {Array} */
    var resampledBuffer = this.audioChannels == 2 ? [0, 0] : [0];
    /** @type {number} */
    var arg2 = 0;
    if (navigator.platform != "MacIntel" && navigator.platform != "MacPPC") {
        for (;this.audioHandleMoz.mozCurrentSampleOffset() == 0;) {
            arg2 += this.audioHandleMoz.mozWriteAudio(resampledBuffer);
        }
        /** @type {number} */
        var c = arg2 / this.audioChannels;
        /** @type {number} */
        var i = 0;
        for (;i < c;i++) {
            this.samplesAlreadyWritten += this.audioHandleMoz.mozWriteAudio(resampledBuffer);
        }
    }
    this.samplesAlreadyWritten += arg2;
    webAudioMinBufferSize += this.samplesAlreadyWritten;
    /** @type {boolean} */
    this.mozAudioFound = true;
};
/**
 * @return {undefined}
 */
XAudioServer.prototype.initializeMozAudio = function() {
    this.writeMozAudio(getFloat32(webAudioMinBufferSize));
    /** @type {number} */
    this.audioType = 0;
};
/**
 * @return {undefined}
 */
XAudioServer.prototype.initializeWebAudio = function() {
    if (launchedContext) {
        resetCallbackAPIAudioBuffer(webAudioActualSampleRate, samplesPerCallback);
        /** @type {number} */
        this.audioType = 1;
    } else {
        throw new Error("");
    }
};
/**
 * @return {undefined}
 */
XAudioServer.prototype.initializeFlashAudio = function() {
    /** @type {(HTMLElement|null)} */
    var existingFlashload = document.getElementById("XAudioJS");
    if (existingFlashload == null) {
        var thisObj = this;
        /** @type {Element} */
        var mainContainerNode = document.createElement("div");
        mainContainerNode.setAttribute("style", "position: fixed; bottom: 0px; right: 0px; margin: 0px; padding: 0px; border: none; width: 8px; height: 8px; overflow: hidden; z-index: -1000; ");
        /** @type {Element} */
        var containerNode = document.createElement("div");
        containerNode.setAttribute("style", "position: static; border: none; width: 0px; height: 0px; visibility: hidden; margin: 8px; padding: 0px;");
        containerNode.setAttribute("id", "XAudioJS");
        mainContainerNode.appendChild(containerNode);
        document.getElementsByTagName("body")[0].appendChild(mainContainerNode);
        swfobject.embedSWF("XAudioJS.swf", "XAudioJS", "8", "8", "9.0.0", "", {}, {
            "allowscriptaccess" : "always"
        }, {
            "style" : "position: static; visibility: hidden; margin: 8px; padding: 0px; border: none"
        }, function(event) {
            if (event.success) {
                thisObj.audioHandleFlash = event.ref;
            } else {
                /** @type {number} */
                thisObj.audioType = 1;
            }
        });
    } else {
        /** @type {HTMLElement} */
        this.audioHandleFlash = existingFlashload;
    }
    /** @type {number} */
    this.audioType = 2;
};
/**
 * @param {number} newVolume
 * @return {undefined}
 */
XAudioServer.prototype.changeVolume = function(newVolume) {
    if (newVolume >= 0 && newVolume <= 1) {
        /** @type {number} */
        XAudioJSVolume = newVolume;
        if (this.checkFlashInit()) {
            this.audioHandleFlash.changeVolume(XAudioJSVolume);
        }
        if (this.mozAudioFound) {
            this.audioHandleMoz.volume = XAudioJSVolume;
        }
    }
};
/**
 * @param {(Array|number)} data
 * @return {undefined}
 */
XAudioServer.prototype.writeMozAudio = function(data) {
    var thumbsCount = this.mozAudioTail.length;
    if (thumbsCount > 0) {
        var count = this.audioHandleMoz.mozWriteAudio(this.mozAudioTail);
        this.samplesAlreadyWritten += count;
        this.mozAudioTail.splice(0, count);
    }
    /** @type {number} */
    thumbsCount = Math.min(data.length, webAudioMaxBufferSize - this.samplesAlreadyWritten + this.audioHandleMoz.mozCurrentSampleOffset());
    count = this.audioHandleMoz.mozWriteAudio(data);
    this.samplesAlreadyWritten += count;
    /** @type {number} */
    var j = 0;
    for (;thumbsCount > count;--thumbsCount) {
        this.mozAudioTail.push(data[j++]);
    }
};
/**
 * @return {?}
 */
XAudioServer.prototype.checkFlashInit = function() {
    if (!this.flashInitialized && (this.audioHandleFlash && this.audioHandleFlash.initialize)) {
        /** @type {boolean} */
        this.flashInitialized = true;
        this.audioHandleFlash.initialize(this.audioChannels, XAudioJSVolume);
        resetCallbackAPIAudioBuffer(44100, samplesPerCallback);
    }
    return this.flashInitialized;
};
/**
 * @param {number} size
 * @return {?}
 */
function getFloat32(size) {
    try {
        return new Float32Array(size);
    } catch (error) {
        return new Array(size);
    }
}
/**
 * @param {number} length
 * @return {?}
 */
function getFloat32Flat(length) {
    try {
        /** @type {Float32Array} */
        var array = new Float32Array(length);
    } catch (error) {
        /** @type {Array} */
        array = new Array(length);
        /** @type {number} */
        var index = 0;
        do {
            /** @type {number} */
            array[index] = 0;
        } while (++index < length);
    }
    return array;
}
/** @type {number} */
var samplesPerCallback = 2048;
/** @type {null} */
var outputConvert = null;
/**
 * @return {?}
 */
function audioOutputFlashEvent() {
    resampleRefill();
    return outputConvert();
}
/**
 * @return {?}
 */
function generateFlashStereoString() {
    /** @type {string} */
    var pre = "";
    /** @type {string} */
    var post = "";
    /** @type {number} */
    var index = 0;
    for (;index < samplesPerCallback && resampleBufferStart != resampleBufferEnd;++index) {
        pre += String.fromCharCode((Math.min(Math.max(resampled[resampleBufferStart++] + 1, 0), 2) * 16383 | 0) + 12288);
        post += String.fromCharCode((Math.min(Math.max(resampled[resampleBufferStart++] + 1, 0), 2) * 16383 | 0) + 12288);
        if (resampleBufferStart == resampleBufferSize) {
            /** @type {number} */
            resampleBufferStart = 0;
        }
    }
    return pre + post;
}
/**
 * @return {?}
 */
function generateFlashMonoString() {
    /** @type {string} */
    var optsData = "";
    /** @type {number} */
    var index = 0;
    for (;index < samplesPerCallback && resampleBufferStart != resampleBufferEnd;++index) {
        optsData += String.fromCharCode((Math.min(Math.max(resampled[resampleBufferStart++] + 1, 0), 2) * 16383 | 0) + 12288);
        if (resampleBufferStart == resampleBufferSize) {
            /** @type {number} */
            resampleBufferStart = 0;
        }
    }
    return optsData;
}
/** @type {null} */
var audioContextHandle = null;
/** @type {null} */
var audioNode = null;
/** @type {null} */
var audioSource = null;
/** @type {boolean} */
var launchedContext = false;
/** @type {Array} */
var audioContextSampleBuffer = [];
/** @type {Array} */
var resampled = [];
/** @type {number} */
var webAudioMinBufferSize = 15E3;
/** @type {number} */
var webAudioMaxBufferSize = 25E3;
/** @type {number} */
var webAudioActualSampleRate = 44100;
/** @type {number} */
var XAudioJSSampleRate = 0;
/** @type {boolean} */
var webAudioMono = false;
/** @type {number} */
var XAudioJSVolume = 1;
/** @type {null} */
var resampleControl = null;
/** @type {number} */
var audioBufferSize = 0;
/** @type {number} */
var resampleBufferStart = 0;
/** @type {number} */
var resampleBufferEnd = 0;
/** @type {number} */
var resampleBufferSize = 2;
/**
 * @param {?} event
 * @return {undefined}
 */
function audioOutputEvent(event) {
    /** @type {number} */
    var index = 0;
    var viewItems = event.outputBuffer.getChannelData(0);
    var coffees = event.outputBuffer.getChannelData(1);
    resampleRefill();
    if (!webAudioMono) {
        for (;index < samplesPerCallback && resampleBufferStart != resampleBufferEnd;) {
            /** @type {number} */
            viewItems[index] = resampled[resampleBufferStart++] * XAudioJSVolume;
            /** @type {number} */
            coffees[index++] = resampled[resampleBufferStart++] * XAudioJSVolume;
            if (resampleBufferStart == resampleBufferSize) {
                /** @type {number} */
                resampleBufferStart = 0;
            }
        }
    } else {
        for (;index < samplesPerCallback && resampleBufferStart != resampleBufferEnd;) {
            /** @type {number} */
            coffees[index] = viewItems[index] = resampled[resampleBufferStart++] * XAudioJSVolume;
            ++index;
            if (resampleBufferStart == resampleBufferSize) {
                /** @type {number} */
                resampleBufferStart = 0;
            }
        }
    }
    for (;index < samplesPerCallback;) {
        /** @type {number} */
        coffees[index] = viewItems[index] = 0;
        ++index;
    }
}
/**
 * @return {undefined}
 */
function resampleRefill() {
    if (audioBufferSize > 0) {
        var padLength = resampleControl.resampler(getBufferSamples());
        var output = resampleControl.outputBuffer;
        /** @type {number} */
        var i = 0;
        for (;i < padLength;++i) {
            resampled[resampleBufferEnd++] = output[i];
            if (resampleBufferEnd == resampleBufferSize) {
                /** @type {number} */
                resampleBufferEnd = 0;
            }
            if (resampleBufferStart == resampleBufferEnd) {
                ++resampleBufferStart;
                if (resampleBufferStart == resampleBufferSize) {
                    /** @type {number} */
                    resampleBufferStart = 0;
                }
            }
        }
        /** @type {number} */
        audioBufferSize = 0;
    }
}
/**
 * @return {?}
 */
function resampledSamplesLeft() {
    return(resampleBufferStart <= resampleBufferEnd ? 0 : resampleBufferSize) + resampleBufferEnd - resampleBufferStart;
}
/**
 * @return {?}
 */
function getBufferSamples() {
    try {
        return audioContextSampleBuffer.subarray(0, audioBufferSize);
    } catch (error) {
        try {
            audioContextSampleBuffer.length = audioBufferSize;
            return audioContextSampleBuffer;
        } catch (error) {
            return audioContextSampleBuffer.slice(0, audioBufferSize);
        }
    }
}
/**
 * @param {number} rowHeight
 * @param {number} dataAndEvents
 * @return {undefined}
 */
function resetCallbackAPIAudioBuffer(rowHeight, dataAndEvents) {
    audioContextSampleBuffer = getFloat32(webAudioMaxBufferSize);
    audioBufferSize = webAudioMaxBufferSize;
    /** @type {number} */
    resampleBufferStart = 0;
    /** @type {number} */
    resampleBufferEnd = 0;
    /** @type {number} */
    resampleBufferSize = Math.max(webAudioMaxBufferSize * Math.ceil(XAudioJSSampleRate / rowHeight), samplesPerCallback) << 1;
    if (webAudioMono) {
        resampled = getFloat32Flat(resampleBufferSize);
        resampleControl = new Resampler(XAudioJSSampleRate, rowHeight, 1, resampleBufferSize, true);
        /** @type {function (): ?} */
        outputConvert = generateFlashMonoString;
    } else {
        resampleBufferSize <<= 1;
        resampled = getFloat32Flat(resampleBufferSize);
        resampleControl = new Resampler(XAudioJSSampleRate, rowHeight, 2, resampleBufferSize, true);
        /** @type {function (): ?} */
        outputConvert = generateFlashStereoString;
    }
}
(function() {
    if (!launchedContext) {
        try {
            audioContextHandle = new GameBoyAudioContext;
        } catch (error) {
            try {
                audioContextHandle = new AudioContext;
            } catch (error) {
                return;
            }
        }
        try {
            audioSource = audioContextHandle.createBufferSource();
            /** @type {boolean} */
            audioSource.loop = false;
            XAudioJSSampleRate = webAudioActualSampleRate = audioContextHandle.sampleRate;
            audioSource.buffer = audioContextHandle.createBuffer(1, 1, webAudioActualSampleRate);
            audioNode = audioContextHandle.createJavaScriptNode(samplesPerCallback, 1, 2);
            /** @type {function (?): undefined} */
            audioNode.onaudioprocess = audioOutputEvent;
            audioSource.connect(audioNode);
            audioNode.connect(audioContextHandle.destination);
            audioSource.noteOn(0);
        } catch (error) {
            return;
        }
        /** @type {boolean} */
        launchedContext = true;
    }
})();
/**
 * @param {?} m1
 * @param {?} time
 * @param {?} targetWidth
 * @param {?} targetHeight
 * @param {?} element
 * @param {?} opt_acc
 * @return {undefined}
 */
function Resize(m1, time, targetWidth, targetHeight, element, opt_acc) {
    /** @type {number} */
    this.widthOriginal = Math.abs(parseInt(m1) || 0);
    /** @type {number} */
    this.heightOriginal = Math.abs(parseInt(time) || 0);
    /** @type {number} */
    this.targetWidth = Math.abs(parseInt(targetWidth) || 0);
    /** @type {number} */
    this.targetHeight = Math.abs(parseInt(targetHeight) || 0);
    /** @type {number} */
    this.colorChannels = !!element ? 4 : 3;
    /** @type {boolean} */
    this.interpolationPass = !!opt_acc;
    /** @type {number} */
    this.targetWidthMultipliedByChannels = this.targetWidth * this.colorChannels;
    /** @type {number} */
    this.originalWidthMultipliedByChannels = this.widthOriginal * this.colorChannels;
    /** @type {number} */
    this.originalHeightMultipliedByChannels = this.heightOriginal * this.colorChannels;
    /** @type {number} */
    this.widthPassResultSize = this.targetWidthMultipliedByChannels * this.heightOriginal;
    /** @type {number} */
    this.finalResultSize = this.targetWidthMultipliedByChannels * this.targetHeight;
    this.initialize();
}
/**
 * @return {undefined}
 */
Resize.prototype.initialize = function() {
    if (this.widthOriginal > 0 && (this.heightOriginal > 0 && (this.targetWidth > 0 && this.targetHeight > 0))) {
        if (this.widthOriginal == this.targetWidth) {
            this.resizeWidth = this.bypassResizer;
        } else {
            /** @type {number} */
            this.ratioWeightWidthPass = this.widthOriginal / this.targetWidth;
            if (this.ratioWeightWidthPass < 1 && this.interpolationPass) {
                this.initializeFirstPassBuffers(true);
                this.resizeWidth = this.colorChannels == 4 ? this.resizeWidthInterpolatedRGBA : this.resizeWidthInterpolatedRGB;
            } else {
                this.initializeFirstPassBuffers(false);
                this.resizeWidth = this.colorChannels == 4 ? this.resizeWidthRGBA : this.resizeWidthRGB;
            }
        }
        if (this.heightOriginal == this.targetHeight) {
            this.resizeHeight = this.bypassResizer;
        } else {
            /** @type {number} */
            this.ratioWeightHeightPass = this.heightOriginal / this.targetHeight;
            if (this.ratioWeightHeightPass < 1 && this.interpolationPass) {
                this.initializeSecondPassBuffers(true);
                this.resizeHeight = this.resizeHeightInterpolated;
            } else {
                this.initializeSecondPassBuffers(false);
                this.resizeHeight = this.colorChannels == 4 ? this.resizeHeightRGBA : this.resizeHeightRGB;
            }
        }
    } else {
        throw new Error("Invalid settings specified for the resizer.");
    }
};
/**
 * @param {Array} buffer
 * @return {?}
 */
Resize.prototype.resizeWidthRGB = function(buffer) {
    var ratioWeight = this.ratioWeightWidthPass;
    /** @type {number} */
    var weight = 0;
    /** @type {number} */
    var amountToNext = 0;
    /** @type {number} */
    var actualPosition = 0;
    /** @type {number} */
    var currentPosition = 0;
    /** @type {number} */
    var line = 0;
    /** @type {number} */
    var pixelOffset = 0;
    /** @type {number} */
    var outputOffset = 0;
    /** @type {number} */
    var nextLineOffsetOriginalWidth = this.originalWidthMultipliedByChannels - 2;
    /** @type {number} */
    var nextLineOffsetTargetWidth = this.targetWidthMultipliedByChannels - 2;
    var output = this.outputWidthWorkBench;
    var outputBuffer = this.widthBuffer;
    do {
        /** @type {number} */
        line = 0;
        for (;line < this.originalHeightMultipliedByChannels;) {
            /** @type {number} */
            output[line++] = 0;
            /** @type {number} */
            output[line++] = 0;
            /** @type {number} */
            output[line++] = 0;
        }
        weight = ratioWeight;
        do {
            /** @type {number} */
            amountToNext = 1 + actualPosition - currentPosition;
            if (weight >= amountToNext) {
                /** @type {number} */
                line = 0;
                /** @type {number} */
                pixelOffset = actualPosition;
                for (;line < this.originalHeightMultipliedByChannels;pixelOffset += nextLineOffsetOriginalWidth) {
                    output[line++] += buffer[pixelOffset++] * amountToNext;
                    output[line++] += buffer[pixelOffset++] * amountToNext;
                    output[line++] += buffer[pixelOffset] * amountToNext;
                }
                /** @type {number} */
                currentPosition = actualPosition = actualPosition + 3;
                weight -= amountToNext;
            } else {
                /** @type {number} */
                line = 0;
                /** @type {number} */
                pixelOffset = actualPosition;
                for (;line < this.originalHeightMultipliedByChannels;pixelOffset += nextLineOffsetOriginalWidth) {
                    output[line++] += buffer[pixelOffset++] * weight;
                    output[line++] += buffer[pixelOffset++] * weight;
                    output[line++] += buffer[pixelOffset] * weight;
                }
                currentPosition += weight;
                break;
            }
        } while (weight > 0 && actualPosition < this.originalWidthMultipliedByChannels);
        /** @type {number} */
        line = 0;
        /** @type {number} */
        pixelOffset = outputOffset;
        for (;line < this.originalHeightMultipliedByChannels;pixelOffset += nextLineOffsetTargetWidth) {
            /** @type {number} */
            outputBuffer[pixelOffset++] = output[line++] / ratioWeight;
            /** @type {number} */
            outputBuffer[pixelOffset++] = output[line++] / ratioWeight;
            /** @type {number} */
            outputBuffer[pixelOffset] = output[line++] / ratioWeight;
        }
        outputOffset += 3;
    } while (outputOffset < this.targetWidthMultipliedByChannels);
    return outputBuffer;
};
/**
 * @param {?} buffer
 * @return {?}
 */
Resize.prototype.resizeWidthInterpolatedRGB = function(buffer) {
    /** @type {number} */
    var ratioWeight = (this.widthOriginal - 1) / this.targetWidth;
    /** @type {number} */
    var weight = 0;
    /** @type {number} */
    var finalOffset = 0;
    /** @type {number} */
    var pixelOffset = 0;
    var outputBuffer = this.widthBuffer;
    /** @type {number} */
    var targetPosition = 0;
    for (;targetPosition < this.targetWidthMultipliedByChannels;targetPosition += 3, weight += ratioWeight) {
        /** @type {number} */
        secondWeight = weight % 1;
        /** @type {number} */
        firstWeight = 1 - secondWeight;
        /** @type {number} */
        finalOffset = targetPosition;
        /** @type {number} */
        pixelOffset = Math.floor(weight) * 3;
        for (;finalOffset < this.widthPassResultSize;pixelOffset += this.originalWidthMultipliedByChannels, finalOffset += this.targetWidthMultipliedByChannels) {
            /** @type {number} */
            outputBuffer[finalOffset] = buffer[pixelOffset] * firstWeight + buffer[pixelOffset + 3] * secondWeight;
            /** @type {number} */
            outputBuffer[finalOffset + 1] = buffer[pixelOffset + 1] * firstWeight + buffer[pixelOffset + 4] * secondWeight;
            /** @type {number} */
            outputBuffer[finalOffset + 2] = buffer[pixelOffset + 2] * firstWeight + buffer[pixelOffset + 5] * secondWeight;
        }
    }
    return outputBuffer;
};
/**
 * @param {Array} buffer
 * @return {?}
 */
Resize.prototype.resizeWidthRGBA = function(buffer) {
    var ratioWeight = this.ratioWeightWidthPass;
    /** @type {number} */
    var weight = 0;
    /** @type {number} */
    var amountToNext = 0;
    /** @type {number} */
    var actualPosition = 0;
    /** @type {number} */
    var currentPosition = 0;
    /** @type {number} */
    var line = 0;
    /** @type {number} */
    var pixelOffset = 0;
    /** @type {number} */
    var outputOffset = 0;
    /** @type {number} */
    var nextLineOffsetOriginalWidth = this.originalWidthMultipliedByChannels - 3;
    /** @type {number} */
    var nextLineOffsetTargetWidth = this.targetWidthMultipliedByChannels - 3;
    var output = this.outputWidthWorkBench;
    var outputBuffer = this.widthBuffer;
    do {
        /** @type {number} */
        line = 0;
        for (;line < this.originalHeightMultipliedByChannels;) {
            /** @type {number} */
            output[line++] = 0;
            /** @type {number} */
            output[line++] = 0;
            /** @type {number} */
            output[line++] = 0;
            /** @type {number} */
            output[line++] = 0;
        }
        weight = ratioWeight;
        do {
            /** @type {number} */
            amountToNext = 1 + actualPosition - currentPosition;
            if (weight >= amountToNext) {
                /** @type {number} */
                line = 0;
                /** @type {number} */
                pixelOffset = actualPosition;
                for (;line < this.originalHeightMultipliedByChannels;pixelOffset += nextLineOffsetOriginalWidth) {
                    output[line++] += buffer[pixelOffset++] * amountToNext;
                    output[line++] += buffer[pixelOffset++] * amountToNext;
                    output[line++] += buffer[pixelOffset++] * amountToNext;
                    output[line++] += buffer[pixelOffset] * amountToNext;
                }
                /** @type {number} */
                currentPosition = actualPosition = actualPosition + 4;
                weight -= amountToNext;
            } else {
                /** @type {number} */
                line = 0;
                /** @type {number} */
                pixelOffset = actualPosition;
                for (;line < this.originalHeightMultipliedByChannels;pixelOffset += nextLineOffsetOriginalWidth) {
                    output[line++] += buffer[pixelOffset++] * weight;
                    output[line++] += buffer[pixelOffset++] * weight;
                    output[line++] += buffer[pixelOffset++] * weight;
                    output[line++] += buffer[pixelOffset] * weight;
                }
                currentPosition += weight;
                break;
            }
        } while (weight > 0 && actualPosition < this.originalWidthMultipliedByChannels);
        /** @type {number} */
        line = 0;
        /** @type {number} */
        pixelOffset = outputOffset;
        for (;line < this.originalHeightMultipliedByChannels;pixelOffset += nextLineOffsetTargetWidth) {
            /** @type {number} */
            outputBuffer[pixelOffset++] = output[line++] / ratioWeight;
            /** @type {number} */
            outputBuffer[pixelOffset++] = output[line++] / ratioWeight;
            /** @type {number} */
            outputBuffer[pixelOffset++] = output[line++] / ratioWeight;
            /** @type {number} */
            outputBuffer[pixelOffset] = output[line++] / ratioWeight;
        }
        outputOffset += 4;
    } while (outputOffset < this.targetWidthMultipliedByChannels);
    return outputBuffer;
};
/**
 * @param {?} buffer
 * @return {?}
 */
Resize.prototype.resizeWidthInterpolatedRGBA = function(buffer) {
    /** @type {number} */
    var ratioWeight = (this.widthOriginal - 1) / this.targetWidth;
    /** @type {number} */
    var weight = 0;
    /** @type {number} */
    var finalOffset = 0;
    /** @type {number} */
    var pixelOffset = 0;
    var outputBuffer = this.widthBuffer;
    /** @type {number} */
    var targetPosition = 0;
    for (;targetPosition < this.targetWidthMultipliedByChannels;targetPosition += 4, weight += ratioWeight) {
        /** @type {number} */
        secondWeight = weight % 1;
        /** @type {number} */
        firstWeight = 1 - secondWeight;
        /** @type {number} */
        finalOffset = targetPosition;
        /** @type {number} */
        pixelOffset = Math.floor(weight) * 4;
        for (;finalOffset < this.widthPassResultSize;pixelOffset += this.originalWidthMultipliedByChannels, finalOffset += this.targetWidthMultipliedByChannels) {
            /** @type {number} */
            outputBuffer[finalOffset] = buffer[pixelOffset] * firstWeight + buffer[pixelOffset + 4] * secondWeight;
            /** @type {number} */
            outputBuffer[finalOffset + 1] = buffer[pixelOffset + 1] * firstWeight + buffer[pixelOffset + 5] * secondWeight;
            /** @type {number} */
            outputBuffer[finalOffset + 2] = buffer[pixelOffset + 2] * firstWeight + buffer[pixelOffset + 6] * secondWeight;
            /** @type {number} */
            outputBuffer[finalOffset + 3] = buffer[pixelOffset + 3] * firstWeight + buffer[pixelOffset + 7] * secondWeight;
        }
    }
    return outputBuffer;
};
/**
 * @param {(Array|Int8Array|Uint8Array)} buffer
 * @return {?}
 */
Resize.prototype.resizeHeightRGB = function(buffer) {
    var radix = this.ratioWeightHeightPass;
    /** @type {number} */
    var weight = 0;
    /** @type {number} */
    var amountToNext = 0;
    /** @type {number} */
    var actualPosition = 0;
    /** @type {number} */
    var currentPosition = 0;
    /** @type {number} */
    var pixelOffset = 0;
    /** @type {number} */
    var outputOffset = 0;
    var output = this.outputHeightWorkBench;
    var outputBuffer = this.heightBuffer;
    do {
        /** @type {number} */
        pixelOffset = 0;
        for (;pixelOffset < this.targetWidthMultipliedByChannels;) {
            /** @type {number} */
            output[pixelOffset++] = 0;
            /** @type {number} */
            output[pixelOffset++] = 0;
            /** @type {number} */
            output[pixelOffset++] = 0;
        }
        weight = radix;
        do {
            /** @type {number} */
            amountToNext = 1 + actualPosition - currentPosition;
            if (weight >= amountToNext) {
                /** @type {number} */
                pixelOffset = 0;
                for (;pixelOffset < this.targetWidthMultipliedByChannels;) {
                    output[pixelOffset++] += buffer[actualPosition++] * amountToNext;
                    output[pixelOffset++] += buffer[actualPosition++] * amountToNext;
                    output[pixelOffset++] += buffer[actualPosition++] * amountToNext;
                }
                /** @type {number} */
                currentPosition = actualPosition;
                weight -= amountToNext;
            } else {
                /** @type {number} */
                pixelOffset = 0;
                /** @type {number} */
                amountToNext = actualPosition;
                for (;pixelOffset < this.targetWidthMultipliedByChannels;) {
                    output[pixelOffset++] += buffer[amountToNext++] * weight;
                    output[pixelOffset++] += buffer[amountToNext++] * weight;
                    output[pixelOffset++] += buffer[amountToNext++] * weight;
                }
                currentPosition += weight;
                break;
            }
        } while (weight > 0 && actualPosition < this.widthPassResultSize);
        /** @type {number} */
        pixelOffset = 0;
        for (;pixelOffset < this.targetWidthMultipliedByChannels;) {
            /** @type {number} */
            outputBuffer[outputOffset++] = Math.round(output[pixelOffset++] / radix);
            /** @type {number} */
            outputBuffer[outputOffset++] = Math.round(output[pixelOffset++] / radix);
            /** @type {number} */
            outputBuffer[outputOffset++] = Math.round(output[pixelOffset++] / radix);
        }
    } while (outputOffset < this.finalResultSize);
    return outputBuffer;
};
/**
 * @param {?} buffer
 * @return {?}
 */
Resize.prototype.resizeHeightInterpolated = function(buffer) {
    /** @type {number} */
    var ratioWeight = (this.heightOriginal - 1) / this.targetHeight;
    /** @type {number} */
    var weight = 0;
    /** @type {number} */
    var outputOffset = 0;
    /** @type {number} */
    var i = 0;
    /** @type {number} */
    var offset = 0;
    /** @type {number} */
    var index = 0;
    var outputBuffer = this.heightBuffer;
    do {
        /** @type {number} */
        secondWeight = weight % 1;
        /** @type {number} */
        firstWeight = 1 - secondWeight;
        /** @type {number} */
        offset = Math.floor(weight) * this.targetWidthMultipliedByChannels;
        index = offset + this.targetWidthMultipliedByChannels;
        /** @type {number} */
        i = 0;
        for (;i < this.targetWidthMultipliedByChannels;++i) {
            /** @type {number} */
            outputBuffer[outputOffset++] = buffer[offset + i] * firstWeight + buffer[index + i] * secondWeight;
        }
        weight += ratioWeight;
    } while (outputOffset < this.finalResultSize);
    return outputBuffer;
};
/**
 * @param {(Array|Int8Array|Uint8Array)} buffer
 * @return {?}
 */
Resize.prototype.resizeHeightRGBA = function(buffer) {
    var radix = this.ratioWeightHeightPass;
    /** @type {number} */
    var weight = 0;
    /** @type {number} */
    var amountToNext = 0;
    /** @type {number} */
    var actualPosition = 0;
    /** @type {number} */
    var currentPosition = 0;
    /** @type {number} */
    var pixelOffset = 0;
    /** @type {number} */
    var outputOffset = 0;
    var output = this.outputHeightWorkBench;
    var outputBuffer = this.heightBuffer;
    do {
        /** @type {number} */
        pixelOffset = 0;
        for (;pixelOffset < this.targetWidthMultipliedByChannels;) {
            /** @type {number} */
            output[pixelOffset++] = 0;
            /** @type {number} */
            output[pixelOffset++] = 0;
            /** @type {number} */
            output[pixelOffset++] = 0;
            /** @type {number} */
            output[pixelOffset++] = 0;
        }
        weight = radix;
        do {
            /** @type {number} */
            amountToNext = 1 + actualPosition - currentPosition;
            if (weight >= amountToNext) {
                /** @type {number} */
                pixelOffset = 0;
                for (;pixelOffset < this.targetWidthMultipliedByChannels;) {
                    output[pixelOffset++] += buffer[actualPosition++] * amountToNext;
                    output[pixelOffset++] += buffer[actualPosition++] * amountToNext;
                    output[pixelOffset++] += buffer[actualPosition++] * amountToNext;
                    output[pixelOffset++] += buffer[actualPosition++] * amountToNext;
                }
                /** @type {number} */
                currentPosition = actualPosition;
                weight -= amountToNext;
            } else {
                /** @type {number} */
                pixelOffset = 0;
                /** @type {number} */
                amountToNext = actualPosition;
                for (;pixelOffset < this.targetWidthMultipliedByChannels;) {
                    output[pixelOffset++] += buffer[amountToNext++] * weight;
                    output[pixelOffset++] += buffer[amountToNext++] * weight;
                    output[pixelOffset++] += buffer[amountToNext++] * weight;
                    output[pixelOffset++] += buffer[amountToNext++] * weight;
                }
                currentPosition += weight;
                break;
            }
        } while (weight > 0 && actualPosition < this.widthPassResultSize);
        /** @type {number} */
        pixelOffset = 0;
        for (;pixelOffset < this.targetWidthMultipliedByChannels;) {
            /** @type {number} */
            outputBuffer[outputOffset++] = Math.round(output[pixelOffset++] / radix);
            /** @type {number} */
            outputBuffer[outputOffset++] = Math.round(output[pixelOffset++] / radix);
            /** @type {number} */
            outputBuffer[outputOffset++] = Math.round(output[pixelOffset++] / radix);
            /** @type {number} */
            outputBuffer[outputOffset++] = Math.round(output[pixelOffset++] / radix);
        }
    } while (outputOffset < this.finalResultSize);
    return outputBuffer;
};
/**
 * @param {Array} buffer
 * @return {?}
 */
Resize.prototype.resizeHeightInterpolatedRGBA = function(buffer) {
    /** @type {number} */
    var ratioWeight = (this.heightOriginal - 1) / this.targetHeight;
    /** @type {number} */
    var weight = 0;
    /** @type {number} */
    var offset = 0;
    /** @type {number} */
    var pixelOffset = 0;
    var outputBuffer = this.heightBuffer;
    for (;pixelOffset < this.finalResultSize;) {
        /** @type {number} */
        secondWeight = weight % 1;
        /** @type {number} */
        firstWeight = 1 - secondWeight;
        /** @type {number} */
        pixelOffset = Math.floor(weight) * 4;
        for (;pixelOffset < this.targetWidthMultipliedByChannels;pixelOffset += 4) {
            /** @type {number} */
            outputBuffer[offset++] = buffer[pixelOffset] * firstWeight + buffer[pixelOffset + 4] * secondWeight;
            /** @type {number} */
            outputBuffer[offset++] = buffer[pixelOffset + 1] * firstWeight + buffer[pixelOffset + 5] * secondWeight;
            /** @type {number} */
            outputBuffer[offset++] = buffer[pixelOffset + 2] * firstWeight + buffer[pixelOffset + 6] * secondWeight;
            /** @type {number} */
            outputBuffer[offset++] = buffer[pixelOffset + 3] * firstWeight + buffer[pixelOffset + 7] * secondWeight;
        }
        weight += ratioWeight;
    }
    return outputBuffer;
};
/**
 * @param {?} BUFFER
 * @return {?}
 */
Resize.prototype.resize = function(BUFFER) {
    return this.resizeHeight(this.resizeWidth(BUFFER));
};
/**
 * @param {?} buffer
 * @return {?}
 */
Resize.prototype.bypassResizer = function(buffer) {
    return buffer;
};
/**
 * @param {boolean} recurring
 * @return {undefined}
 */
Resize.prototype.initializeFirstPassBuffers = function(recurring) {
    this.widthBuffer = this.generateFloatBuffer(this.widthPassResultSize);
    if (!recurring) {
        this.outputWidthWorkBench = this.generateFloatBuffer(this.originalHeightMultipliedByChannels);
    }
};
/**
 * @param {boolean} recurring
 * @return {undefined}
 */
Resize.prototype.initializeSecondPassBuffers = function(recurring) {
    this.heightBuffer = this.generateUint8Buffer(this.finalResultSize);
    if (!recurring) {
        this.outputHeightWorkBench = this.generateFloatBuffer(this.targetWidthMultipliedByChannels);
    }
};
/**
 * @param {?} bufferLength
 * @return {?}
 */
Resize.prototype.generateFloatBuffer = function(bufferLength) {
    try {
        return new Float32Array(bufferLength);
    } catch (error) {
        return[];
    }
};
/**
 * @param {?} bufferLength
 * @return {?}
 */
Resize.prototype.generateUint8Buffer = function(bufferLength) {
    try {
        return this.checkForOperaMathBug(new Uint8Array(bufferLength));
    } catch (error) {
        return[];
    }
};
/**
 * @param {Array} dataAndEvents
 * @return {?}
 */
Resize.prototype.checkForOperaMathBug = function(dataAndEvents) {
    /** @type {number} */
    dataAndEvents[0] = -1;
    dataAndEvents[0] >>= 0;
    if (dataAndEvents[0] != 255) {
        return[];
    } else {
        return dataAndEvents;
    }
};
