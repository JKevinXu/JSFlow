/**
 * @param {HTMLElement} canvasElement
 * @param {string} dataAndEvents
 * @return {undefined}
 */
function GameBoyCore(canvasElement, dataAndEvents) {
    /** @type {HTMLElement} */
    this.canvas = canvasElement;
    /** @type {null} */
    this.drawContext = null;
    /** @type {string} */
    this.ROMImage = dataAndEvents;
    /** @type {number} */
    this.registerA = 1;
    /** @type {boolean} */
    this.FZero = true;
    /** @type {boolean} */
    this.FSubtract = false;
    /** @type {boolean} */
    this.FHalfCarry = true;
    /** @type {boolean} */
    this.FCarry = true;
    /** @type {number} */
    this.registerB = 0;
    /** @type {number} */
    this.registerC = 19;
    /** @type {number} */
    this.registerD = 0;
    /** @type {number} */
    this.registerE = 216;
    /** @type {number} */
    this.registersHL = 333;
    /** @type {number} */
    this.stackPointer = 65534;
    /** @type {number} */
    this.programCounter = 256;
    /** @type {number} */
    this.CPUCyclesTotal = 0;
    /** @type {number} */
    this.CPUCyclesTotalBase = 0;
    /** @type {number} */
    this.CPUCyclesTotalCurrent = 0;
    /** @type {number} */
    this.CPUCyclesTotalRoundoff = 0;
    /** @type {number} */
    this.baseCPUCyclesPerIteration = 0;
    /** @type {number} */
    this.remainingClocks = 0;
    /** @type {boolean} */
    this.inBootstrap = true;
    /** @type {boolean} */
    this.usedBootROM = false;
    /** @type {boolean} */
    this.usedGBCBootROM = false;
    /** @type {boolean} */
    this.halt = false;
    /** @type {boolean} */
    this.skipPCIncrement = false;
    /** @type {number} */
    this.stopEmulator = 3;
    /** @type {boolean} */
    this.IME = true;
    /** @type {number} */
    this.IRQLineMatched = 0;
    /** @type {number} */
    this.interruptsRequested = 0;
    /** @type {number} */
    this.interruptsEnabled = 0;
    /** @type {boolean} */
    this.hdmaRunning = false;
    /** @type {number} */
    this.CPUTicks = 0;
    /** @type {number} */
    this.doubleSpeedShifter = 0;
    /** @type {number} */
    this.JoyPad = 255;
    /** @type {boolean} */
    this.CPUStopped = false;
    /** @type {Array} */
    this.memoryReader = [];
    /** @type {Array} */
    this.memoryWriter = [];
    /** @type {Array} */
    this.memoryHighReader = [];
    /** @type {Array} */
    this.memoryHighWriter = [];
    /** @type {Array} */
    this.ROM = [];
    /** @type {Array} */
    this.memory = [];
    /** @type {Array} */
    this.MBCRam = [];
    /** @type {Array} */
    this.VRAM = [];
    /** @type {Array} */
    this.GBCMemory = [];
    /** @type {boolean} */
    this.MBC1Mode = false;
    /** @type {boolean} */
    this.MBCRAMBanksEnabled = false;
    /** @type {number} */
    this.currMBCRAMBank = 0;
    /** @type {number} */
    this.currMBCRAMBankPosition = -40960;
    /** @type {boolean} */
    this.cGBC = false;
    /** @type {number} */
    this.gbcRamBank = 1;
    /** @type {number} */
    this.gbcRamBankPosition = -53248;
    /** @type {number} */
    this.gbcRamBankPositionECHO = -61440;
    /** @type {Array} */
    this.RAMBanks = [0, 1, 2, 4, 16];
    /** @type {number} */
    this.ROMBank1offs = 0;
    /** @type {number} */
    this.currentROMBank = 0;
    /** @type {number} */
    this.cartridgeType = 0;
    /** @type {string} */
    this.name = "";
    /** @type {string} */
    this.gameCode = "";
    /** @type {boolean} */
    this.fromSaveState = false;
    /** @type {string} */
    this.savedStateFileName = "";
    /** @type {number} */
    this.STATTracker = 0;
    /** @type {number} */
    this.modeSTAT = 0;
    /** @type {number} */
    this.spriteCount = 252;
    /** @type {boolean} */
    this.LYCMatchTriggerSTAT = false;
    /** @type {boolean} */
    this.mode2TriggerSTAT = false;
    /** @type {boolean} */
    this.mode1TriggerSTAT = false;
    /** @type {boolean} */
    this.mode0TriggerSTAT = false;
    /** @type {boolean} */
    this.LCDisOn = false;
    /** @type {Array} */
    this.LINECONTROL = [];
    /** @type {Array} */
    this.DISPLAYOFFCONTROL = [function(dataAndEvents) {
    }];
    /** @type {null} */
    this.LCDCONTROL = null;
    this.initializeLCDController();
    /** @type {boolean} */
    this.RTCisLatched = false;
    /** @type {number} */
    this.latchedSeconds = 0;
    /** @type {number} */
    this.latchedMinutes = 0;
    /** @type {number} */
    this.latchedHours = 0;
    /** @type {number} */
    this.latchedLDays = 0;
    /** @type {number} */
    this.latchedHDays = 0;
    /** @type {number} */
    this.RTCSeconds = 0;
    /** @type {number} */
    this.RTCMinutes = 0;
    /** @type {number} */
    this.RTCHours = 0;
    /** @type {number} */
    this.RTCDays = 0;
    /** @type {boolean} */
    this.RTCDayOverFlow = false;
    /** @type {boolean} */
    this.RTCHALT = false;
    /** @type {number} */
    this.highX = 127;
    /** @type {number} */
    this.lowX = 127;
    /** @type {number} */
    this.highY = 127;
    /** @type {number} */
    this.lowY = 127;
    /** @type {null} */
    this.audioHandle = null;
    /** @type {number} */
    this.numSamplesTotal = 0;
    /** @type {number} */
    this.sampleSize = 0;
    /** @type {Array} */
    this.dutyLookup = [[false, false, false, false, false, false, false, true], [true, false, false, false, false, false, false, true], [true, false, false, false, false, true, true, true], [false, true, true, true, true, true, true, false]];
    /** @type {Array} */
    this.currentBuffer = [];
    /** @type {number} */
    this.bufferContainAmount = 0;
    /** @type {null} */
    this.LSFR15Table = null;
    /** @type {null} */
    this.LSFR7Table = null;
    /** @type {null} */
    this.noiseSampleTable = null;
    this.initializeAudioStartState();
    /** @type {boolean} */
    this.soundMasterEnabled = false;
    /** @type {null} */
    this.channel3PCM = null;
    /** @type {number} */
    this.VinLeftChannelMasterVolume = 8;
    /** @type {number} */
    this.VinRightChannelMasterVolume = 8;
    /** @type {boolean} */
    this.leftChannel1 = false;
    /** @type {boolean} */
    this.leftChannel2 = false;
    /** @type {boolean} */
    this.leftChannel3 = false;
    /** @type {boolean} */
    this.leftChannel4 = false;
    /** @type {boolean} */
    this.rightChannel1 = false;
    /** @type {boolean} */
    this.rightChannel2 = false;
    /** @type {boolean} */
    this.rightChannel3 = false;
    /** @type {boolean} */
    this.rightChannel4 = false;
    /** @type {number} */
    this.channel1currentSampleLeft = 0;
    /** @type {number} */
    this.channel1currentSampleRight = 0;
    /** @type {number} */
    this.channel2currentSampleLeft = 0;
    /** @type {number} */
    this.channel2currentSampleRight = 0;
    /** @type {number} */
    this.channel3currentSampleLeft = 0;
    /** @type {number} */
    this.channel3currentSampleRight = 0;
    /** @type {number} */
    this.channel4currentSampleLeft = 0;
    /** @type {number} */
    this.channel4currentSampleRight = 0;
    /** @type {number} */
    this.channel1currentSampleLeftSecondary = 0;
    /** @type {number} */
    this.channel1currentSampleRightSecondary = 0;
    /** @type {number} */
    this.channel2currentSampleLeftSecondary = 0;
    /** @type {number} */
    this.channel2currentSampleRightSecondary = 0;
    /** @type {number} */
    this.channel3currentSampleLeftSecondary = 0;
    /** @type {number} */
    this.channel3currentSampleRightSecondary = 0;
    /** @type {number} */
    this.channel4currentSampleLeftSecondary = 0;
    /** @type {number} */
    this.channel4currentSampleRightSecondary = 0;
    /** @type {number} */
    this.channel1currentSampleLeftTrimary = 0;
    /** @type {number} */
    this.channel1currentSampleRightTrimary = 0;
    /** @type {number} */
    this.channel2currentSampleLeftTrimary = 0;
    /** @type {number} */
    this.channel2currentSampleRightTrimary = 0;
    /** @type {number} */
    this.mixerOutputCache = 0;
    this.initializeTiming();
    /** @type {number} */
    this.machineOut = 0;
    /** @type {number} */
    this.audioTicks = 0;
    /** @type {number} */
    this.audioIndex = 0;
    /** @type {number} */
    this.rollover = 0;
    /** @type {number} */
    this.emulatorTicks = 0;
    /** @type {number} */
    this.DIVTicks = 56;
    /** @type {number} */
    this.LCDTicks = 60;
    /** @type {number} */
    this.timerTicks = 0;
    /** @type {boolean} */
    this.TIMAEnabled = false;
    /** @type {number} */
    this.TACClocker = 1024;
    /** @type {number} */
    this.serialTimer = 0;
    /** @type {number} */
    this.serialShiftTimer = 0;
    /** @type {number} */
    this.serialShiftTimerAllocated = 0;
    /** @type {number} */
    this.IRQEnableDelay = 0;
    var expected = new_Date();
    this.lastIteration = expected.getTime();
    expected = new_Date();
    this.firstIteration = expected.getTime();
    /** @type {number} */
    this.iterations = 0;
    /** @type {number} */
    this.actualScanLine = 0;
    /** @type {number} */
    this.lastUnrenderedLine = 0;
    /** @type {number} */
    this.queuedScanLines = 0;
    /** @type {number} */
    this.totalLinesPassed = 0;
    /** @type {number} */
    this.haltPostClocks = 0;
    /** @type {boolean} */
    this.cMBC1 = false;
    /** @type {boolean} */
    this.cMBC2 = false;
    /** @type {boolean} */
    this.cMBC3 = false;
    /** @type {boolean} */
    this.cMBC5 = false;
    /** @type {boolean} */
    this.cMBC7 = false;
    /** @type {boolean} */
    this.cSRAM = false;
    /** @type {boolean} */
    this.cMMMO1 = false;
    /** @type {boolean} */
    this.cRUMBLE = false;
    /** @type {boolean} */
    this.cCamera = false;
    /** @type {boolean} */
    this.cTAMA5 = false;
    /** @type {boolean} */
    this.cHuC3 = false;
    /** @type {boolean} */
    this.cHuC1 = false;
    /** @type {boolean} */
    this.cTIMER = false;
    /** @type {Array} */
    this.ROMBanks = [2, 4, 8, 16, 32, 64, 128, 256, 512];
    /** @type {number} */
    this.ROMBanks[82] = 72;
    /** @type {number} */
    this.ROMBanks[83] = 80;
    /** @type {number} */
    this.ROMBanks[84] = 96;
    /** @type {number} */
    this.numRAMBanks = 0;
    /** @type {number} */
    this.currVRAMBank = 0;
    /** @type {number} */
    this.backgroundX = 0;
    /** @type {number} */
    this.backgroundY = 0;
    /** @type {boolean} */
    this.gfxWindowDisplay = false;
    /** @type {boolean} */
    this.gfxSpriteShow = false;
    /** @type {boolean} */
    this.gfxSpriteNormalHeight = true;
    /** @type {boolean} */
    this.bgEnabled = true;
    /** @type {boolean} */
    this.BGPriorityEnabled = true;
    /** @type {number} */
    this.gfxWindowCHRBankPosition = 0;
    /** @type {number} */
    this.gfxBackgroundCHRBankPosition = 0;
    /** @type {number} */
    this.gfxBackgroundBankOffset = 128;
    /** @type {number} */
    this.windowY = 0;
    /** @type {number} */
    this.windowX = 0;
    /** @type {number} */
    this.drewBlank = 0;
    /** @type {boolean} */
    this.drewFrame = false;
    /** @type {number} */
    this.midScanlineOffset = -1;
    /** @type {number} */
    this.pixelEnd = 0;
    /** @type {number} */
    this.currentX = 0;
    /** @type {null} */
    this.BGCHRBank1 = null;
    /** @type {null} */
    this.BGCHRBank2 = null;
    /** @type {null} */
    this.BGCHRCurrentBank = null;
    /** @type {null} */
    this.tileCache = null;
    /** @type {Array} */
    this.colors = [15728606, 11392916, 5411443, 1586242];
    /** @type {null} */
    this.OBJPalette = null;
    /** @type {null} */
    this.BGPalette = null;
    /** @type {null} */
    this.gbcOBJRawPalette = null;
    /** @type {null} */
    this.gbcBGRawPalette = null;
    /** @type {null} */
    this.gbOBJPalette = null;
    /** @type {null} */
    this.gbBGPalette = null;
    /** @type {null} */
    this.gbcOBJPalette = null;
    /** @type {null} */
    this.gbcBGPalette = null;
    /** @type {null} */
    this.gbBGColorizedPalette = null;
    /** @type {null} */
    this.gbOBJColorizedPalette = null;
    /** @type {null} */
    this.cachedBGPaletteConversion = null;
    /** @type {null} */
    this.cachedOBJPaletteConversion = null;
    this.updateGBBGPalette = this.updateGBRegularBGPalette;
    this.updateGBOBJPalette = this.updateGBRegularOBJPalette;
    /** @type {boolean} */
    this.colorizedGBPalettes = false;
    /** @type {null} */
    this.BGLayerRender = null;
    /** @type {null} */
    this.WindowLayerRender = null;
    /** @type {null} */
    this.SpriteLayerRender = null;
    /** @type {Array} */
    this.frameBuffer = [];
    /** @type {null} */
    this.swizzledFrame = null;
    /** @type {null} */
    this.canvasBuffer = null;
    /** @type {number} */
    this.pixelStart = 0;
    /** @type {number} */
    this.onscreenWidth = this.offscreenWidth = 160;
    /** @type {number} */
    this.onscreenHeight = this.offScreenheight = 144;
    /** @type {number} */
    this.offscreenRGBCount = this.onscreenWidth * this.onscreenHeight * 4;
    this.intializeWhiteNoise();
}
/** @type {Array} */
GameBoyCore.prototype.GBBOOTROM = [];
/** @type {Array} */
GameBoyCore.prototype.GBCBOOTROM = [];
/** @type {Array} */
GameBoyCore.prototype.ffxxDump = [15, 0, 124, 255, 0, 0, 0, 248, 255, 255, 255, 255, 255, 255, 255, 1, 128, 191, 243, 255, 191, 255, 63, 0, 255, 191, 127, 255, 159, 255, 191, 255, 255, 0, 0, 191, 119, 243, 241, 255, 255, 255, 255, 255, 255, 255, 255, 255, 0, 255, 0, 255, 0, 255, 0, 255, 0, 255, 0, 255, 0, 255, 0, 255, 145, 128, 0, 0, 0, 0, 0, 252, 0, 0, 0, 0, 255, 126, 255, 254, 255, 255, 255, 255, 255, 255, 62, 255, 255, 255, 255, 255, 255, 255, 255, 255, 255, 255, 255, 255, 255, 255, 255, 255,
    192, 255, 193, 0, 254, 255, 255, 255, 248, 255, 0, 0, 0, 143, 0, 0, 255, 255, 255, 255, 255, 255, 255, 255, 206, 237, 102, 102, 204, 13, 0, 11, 3, 115, 0, 131, 0, 12, 0, 13, 0, 8, 17, 31, 136, 137, 0, 14, 220, 204, 110, 230, 221, 221, 217, 153, 187, 187, 103, 99, 110, 14, 236, 204, 221, 220, 153, 159, 187, 185, 51, 62, 69, 236, 82, 250, 8, 183, 7, 93, 1, 253, 192, 255, 8, 252, 0, 229, 11, 248, 194, 206, 244, 249, 15, 127, 69, 109, 61, 254, 70, 151, 51, 94, 8, 239, 241, 255, 134, 131, 36, 116, 18,
    252, 0, 159, 180, 183, 6, 213, 208, 122, 0, 158, 4, 95, 65, 47, 29, 119, 54, 117, 129, 170, 112, 58, 152, 209, 113, 2, 77, 1, 193, 255, 13, 0, 211, 5, 249, 0, 11, 0];
/** @type {Array} */
GameBoyCore.prototype.OPCODE = [function(dataAndEvents) {
}, function(event) {
    event.registerC = event.memoryReader[event.programCounter](event, event.programCounter);
    event.registerB = event.memoryRead(event.programCounter + 1 & 65535);
    /** @type {number} */
    event.programCounter = event.programCounter + 2 & 65535;
}, function(dataAndEvents) {
    dataAndEvents.memoryWrite(dataAndEvents.registerB << 8 | dataAndEvents.registerC, dataAndEvents.registerA);
}, function(dataAndEvents) {
    /** @type {number} */
    var registerC = (dataAndEvents.registerB << 8 | dataAndEvents.registerC) + 1;
    /** @type {number} */
    dataAndEvents.registerB = registerC >> 8 & 255;
    /** @type {number} */
    dataAndEvents.registerC = registerC & 255;
}, function(dataAndEvents) {
    /** @type {number} */
    dataAndEvents.registerB = dataAndEvents.registerB + 1 & 255;
    /** @type {boolean} */
    dataAndEvents.FZero = dataAndEvents.registerB == 0;
    /** @type {boolean} */
    dataAndEvents.FHalfCarry = (dataAndEvents.registerB & 15) == 0;
    /** @type {boolean} */
    dataAndEvents.FSubtract = false;
}, function(dataAndEvents) {
    /** @type {number} */
    dataAndEvents.registerB = dataAndEvents.registerB - 1 & 255;
    /** @type {boolean} */
    dataAndEvents.FZero = dataAndEvents.registerB == 0;
    /** @type {boolean} */
    dataAndEvents.FHalfCarry = (dataAndEvents.registerB & 15) == 15;
    /** @type {boolean} */
    dataAndEvents.FSubtract = true;
}, function(event) {
    event.registerB = event.memoryReader[event.programCounter](event, event.programCounter);
    /** @type {number} */
    event.programCounter = event.programCounter + 1 & 65535;
}, function(dataAndEvents) {
    /** @type {boolean} */
    dataAndEvents.FCarry = dataAndEvents.registerA > 127;
    /** @type {number} */
    dataAndEvents.registerA = dataAndEvents.registerA << 1 & 255 | dataAndEvents.registerA >> 7;
    /** @type {boolean} */
    dataAndEvents.FZero = dataAndEvents.FSubtract = dataAndEvents.FHalfCarry = false;
}, function(jQuery) {
    /** @type {number} */
    var which = jQuery.memoryRead(jQuery.programCounter + 1 & 65535) << 8 | jQuery.memoryReader[jQuery.programCounter](jQuery, jQuery.programCounter);
    /** @type {number} */
    jQuery.programCounter = jQuery.programCounter + 2 & 65535;
    jQuery.memoryWrite(which, jQuery.stackPointer & 255);
    jQuery.memoryWrite(which + 1 & 65535, jQuery.stackPointer >> 8);
}, function(dataAndEvents) {
    var registersHL = dataAndEvents.registersHL + (dataAndEvents.registerB << 8 | dataAndEvents.registerC);
    /** @type {boolean} */
    dataAndEvents.FHalfCarry = (dataAndEvents.registersHL & 4095) > (registersHL & 4095);
    /** @type {boolean} */
    dataAndEvents.FCarry = registersHL > 65535;
    /** @type {number} */
    dataAndEvents.registersHL = registersHL & 65535;
    /** @type {boolean} */
    dataAndEvents.FSubtract = false;
}, function(dataAndEvents) {
    dataAndEvents.registerA = dataAndEvents.memoryRead(dataAndEvents.registerB << 8 | dataAndEvents.registerC);
}, function(value) {
    /** @type {number} */
    var typeAndPlayer = (value.registerB << 8 | value.registerC) - 1 & 65535;
    /** @type {number} */
    value.registerB = typeAndPlayer >> 8;
    /** @type {number} */
    value.registerC = typeAndPlayer & 255;
}, function(dataAndEvents) {
    /** @type {number} */
    dataAndEvents.registerC = dataAndEvents.registerC + 1 & 255;
    /** @type {boolean} */
    dataAndEvents.FZero = dataAndEvents.registerC == 0;
    /** @type {boolean} */
    dataAndEvents.FHalfCarry = (dataAndEvents.registerC & 15) == 0;
    /** @type {boolean} */
    dataAndEvents.FSubtract = false;
}, function(dataAndEvents) {
    /** @type {number} */
    dataAndEvents.registerC = dataAndEvents.registerC - 1 & 255;
    /** @type {boolean} */
    dataAndEvents.FZero = dataAndEvents.registerC == 0;
    /** @type {boolean} */
    dataAndEvents.FHalfCarry = (dataAndEvents.registerC & 15) == 15;
    /** @type {boolean} */
    dataAndEvents.FSubtract = true;
}, function(event) {
    event.registerC = event.memoryReader[event.programCounter](event, event.programCounter);
    /** @type {number} */
    event.programCounter = event.programCounter + 1 & 65535;
}, function(dataAndEvents) {
    /** @type {number} */
    dataAndEvents.registerA = dataAndEvents.registerA >> 1 | (dataAndEvents.registerA & 1) << 7;
    /** @type {boolean} */
    dataAndEvents.FCarry = dataAndEvents.registerA > 127;
    /** @type {boolean} */
    dataAndEvents.FZero = dataAndEvents.FSubtract = dataAndEvents.FHalfCarry = false;
}, function(options) {
    if (options.cGBC) {
        if ((options.memory[65357] & 1) == 1) {
            if (options.memory[65357] > 127) {
                cout("Going into single clock speed mode.", 0);
                /** @type {number} */
                options.doubleSpeedShifter = 0;
                options.memory[65357] &= 127;
            } else {
                cout("Going into double clock speed mode.", 0);
                /** @type {number} */
                options.doubleSpeedShifter = 1;
                options.memory[65357] |= 128;
            }
            options.memory[65357] &= 254;
        } else {
            options.handleSTOP();
        }
    } else {
        options.handleSTOP();
    }
}, function(d) {
    d.registerE = d.memoryReader[d.programCounter](d, d.programCounter);
    d.registerD = d.memoryRead(d.programCounter + 1 & 65535);
    /** @type {number} */
    d.programCounter = d.programCounter + 2 & 65535;
}, function(dataAndEvents) {
    dataAndEvents.memoryWrite(dataAndEvents.registerD << 8 | dataAndEvents.registerE, dataAndEvents.registerA);
}, function(dataAndEvents) {
    /** @type {number} */
    var registerE = (dataAndEvents.registerD << 8 | dataAndEvents.registerE) + 1;
    /** @type {number} */
    dataAndEvents.registerD = registerE >> 8 & 255;
    /** @type {number} */
    dataAndEvents.registerE = registerE & 255;
}, function(dataAndEvents) {
    /** @type {number} */
    dataAndEvents.registerD = dataAndEvents.registerD + 1 & 255;
    /** @type {boolean} */
    dataAndEvents.FZero = dataAndEvents.registerD == 0;
    /** @type {boolean} */
    dataAndEvents.FHalfCarry = (dataAndEvents.registerD & 15) == 0;
    /** @type {boolean} */
    dataAndEvents.FSubtract = false;
}, function(dataAndEvents) {
    /** @type {number} */
    dataAndEvents.registerD = dataAndEvents.registerD - 1 & 255;
    /** @type {boolean} */
    dataAndEvents.FZero = dataAndEvents.registerD == 0;
    /** @type {boolean} */
    dataAndEvents.FHalfCarry = (dataAndEvents.registerD & 15) == 15;
    /** @type {boolean} */
    dataAndEvents.FSubtract = true;
}, function(event) {
    event.registerD = event.memoryReader[event.programCounter](event, event.programCounter);
    /** @type {number} */
    event.programCounter = event.programCounter + 1 & 65535;
}, function(dataAndEvents) {
    /** @type {number} */
    var registerA = dataAndEvents.FCarry ? 1 : 0;
    /** @type {boolean} */
    dataAndEvents.FCarry = dataAndEvents.registerA > 127;
    /** @type {number} */
    dataAndEvents.registerA = dataAndEvents.registerA << 1 & 255 | registerA;
    /** @type {boolean} */
    dataAndEvents.FZero = dataAndEvents.FSubtract = dataAndEvents.FHalfCarry = false;
}, function(deepDataAndEvents) {
    /** @type {number} */
    deepDataAndEvents.programCounter = deepDataAndEvents.programCounter + (deepDataAndEvents.memoryReader[deepDataAndEvents.programCounter](deepDataAndEvents, deepDataAndEvents.programCounter) << 24 >> 24) + 1 & 65535;
}, function(dataAndEvents) {
    var registersHL = dataAndEvents.registersHL + (dataAndEvents.registerD << 8 | dataAndEvents.registerE);
    /** @type {boolean} */
    dataAndEvents.FHalfCarry = (dataAndEvents.registersHL & 4095) > (registersHL & 4095);
    /** @type {boolean} */
    dataAndEvents.FCarry = registersHL > 65535;
    /** @type {number} */
    dataAndEvents.registersHL = registersHL & 65535;
    /** @type {boolean} */
    dataAndEvents.FSubtract = false;
}, function(dataAndEvents) {
    dataAndEvents.registerA = dataAndEvents.memoryRead(dataAndEvents.registerD << 8 | dataAndEvents.registerE);
}, function(value) {
    /** @type {number} */
    var typeAndPlayer = (value.registerD << 8 | value.registerE) - 1 & 65535;
    /** @type {number} */
    value.registerD = typeAndPlayer >> 8;
    /** @type {number} */
    value.registerE = typeAndPlayer & 255;
}, function(dataAndEvents) {
    /** @type {number} */
    dataAndEvents.registerE = dataAndEvents.registerE + 1 & 255;
    /** @type {boolean} */
    dataAndEvents.FZero = dataAndEvents.registerE == 0;
    /** @type {boolean} */
    dataAndEvents.FHalfCarry = (dataAndEvents.registerE & 15) == 0;
    /** @type {boolean} */
    dataAndEvents.FSubtract = false;
}, function(dataAndEvents) {
    /** @type {number} */
    dataAndEvents.registerE = dataAndEvents.registerE - 1 & 255;
    /** @type {boolean} */
    dataAndEvents.FZero = dataAndEvents.registerE == 0;
    /** @type {boolean} */
    dataAndEvents.FHalfCarry = (dataAndEvents.registerE & 15) == 15;
    /** @type {boolean} */
    dataAndEvents.FSubtract = true;
}, function(d) {
    d.registerE = d.memoryReader[d.programCounter](d, d.programCounter);
    /** @type {number} */
    d.programCounter = d.programCounter + 1 & 65535;
}, function(dataAndEvents) {
    /** @type {number} */
    var registerA = dataAndEvents.FCarry ? 128 : 0;
    /** @type {boolean} */
    dataAndEvents.FCarry = (dataAndEvents.registerA & 1) == 1;
    /** @type {number} */
    dataAndEvents.registerA = dataAndEvents.registerA >> 1 | registerA;
    /** @type {boolean} */
    dataAndEvents.FZero = dataAndEvents.FSubtract = dataAndEvents.FHalfCarry = false;
}, function(deepDataAndEvents) {
    if (!deepDataAndEvents.FZero) {
        /** @type {number} */
        deepDataAndEvents.programCounter = deepDataAndEvents.programCounter + (deepDataAndEvents.memoryReader[deepDataAndEvents.programCounter](deepDataAndEvents, deepDataAndEvents.programCounter) << 24 >> 24) + 1 & 65535;
        deepDataAndEvents.CPUTicks += 4;
    } else {
        /** @type {number} */
        deepDataAndEvents.programCounter = deepDataAndEvents.programCounter + 1 & 65535;
    }
}, function(deepDataAndEvents) {
    /** @type {number} */
    deepDataAndEvents.registersHL = deepDataAndEvents.memoryRead(deepDataAndEvents.programCounter + 1 & 65535) << 8 | deepDataAndEvents.memoryReader[deepDataAndEvents.programCounter](deepDataAndEvents, deepDataAndEvents.programCounter);
    /** @type {number} */
    deepDataAndEvents.programCounter = deepDataAndEvents.programCounter + 2 & 65535;
}, function(deepDataAndEvents) {
    deepDataAndEvents.memoryWriter[deepDataAndEvents.registersHL](deepDataAndEvents, deepDataAndEvents.registersHL, deepDataAndEvents.registerA);
    /** @type {number} */
    deepDataAndEvents.registersHL = deepDataAndEvents.registersHL + 1 & 65535;
}, function(dataAndEvents) {
    /** @type {number} */
    dataAndEvents.registersHL = dataAndEvents.registersHL + 1 & 65535;
}, function(dataAndEvents) {
    /** @type {number} */
    var FZero = (dataAndEvents.registersHL >> 8) + 1 & 255;
    /** @type {boolean} */
    dataAndEvents.FZero = FZero == 0;
    /** @type {boolean} */
    dataAndEvents.FHalfCarry = (FZero & 15) == 0;
    /** @type {boolean} */
    dataAndEvents.FSubtract = false;
    /** @type {number} */
    dataAndEvents.registersHL = FZero << 8 | dataAndEvents.registersHL & 255;
}, function(dataAndEvents) {
    /** @type {number} */
    var FZero = (dataAndEvents.registersHL >> 8) - 1 & 255;
    /** @type {boolean} */
    dataAndEvents.FZero = FZero == 0;
    /** @type {boolean} */
    dataAndEvents.FHalfCarry = (FZero & 15) == 15;
    /** @type {boolean} */
    dataAndEvents.FSubtract = true;
    /** @type {number} */
    dataAndEvents.registersHL = FZero << 8 | dataAndEvents.registersHL & 255;
}, function(deepDataAndEvents) {
    /** @type {number} */
    deepDataAndEvents.registersHL = deepDataAndEvents.memoryReader[deepDataAndEvents.programCounter](deepDataAndEvents, deepDataAndEvents.programCounter) << 8 | deepDataAndEvents.registersHL & 255;
    /** @type {number} */
    deepDataAndEvents.programCounter = deepDataAndEvents.programCounter + 1 & 65535;
}, function(dataAndEvents) {
    if (!dataAndEvents.FSubtract) {
        if (dataAndEvents.FCarry || dataAndEvents.registerA > 153) {
            /** @type {number} */
            dataAndEvents.registerA = dataAndEvents.registerA + 96 & 255;
            /** @type {boolean} */
            dataAndEvents.FCarry = true;
        }
        if (dataAndEvents.FHalfCarry || (dataAndEvents.registerA & 15) > 9) {
            /** @type {number} */
            dataAndEvents.registerA = dataAndEvents.registerA + 6 & 255;
            /** @type {boolean} */
            dataAndEvents.FHalfCarry = false;
        }
    } else {
        if (dataAndEvents.FCarry && dataAndEvents.FHalfCarry) {
            /** @type {number} */
            dataAndEvents.registerA = dataAndEvents.registerA + 154 & 255;
            /** @type {boolean} */
            dataAndEvents.FHalfCarry = false;
        } else {
            if (dataAndEvents.FCarry) {
                /** @type {number} */
                dataAndEvents.registerA = dataAndEvents.registerA + 160 & 255;
            } else {
                if (dataAndEvents.FHalfCarry) {
                    /** @type {number} */
                    dataAndEvents.registerA = dataAndEvents.registerA + 250 & 255;
                    /** @type {boolean} */
                    dataAndEvents.FHalfCarry = false;
                }
            }
        }
    }
    /** @type {boolean} */
    dataAndEvents.FZero = dataAndEvents.registerA == 0;
}, function(deepDataAndEvents) {
    if (deepDataAndEvents.FZero) {
        /** @type {number} */
        deepDataAndEvents.programCounter = deepDataAndEvents.programCounter + (deepDataAndEvents.memoryReader[deepDataAndEvents.programCounter](deepDataAndEvents, deepDataAndEvents.programCounter) << 24 >> 24) + 1 & 65535;
        deepDataAndEvents.CPUTicks += 4;
    } else {
        /** @type {number} */
        deepDataAndEvents.programCounter = deepDataAndEvents.programCounter + 1 & 65535;
    }
}, function(dataAndEvents) {
    /** @type {boolean} */
    dataAndEvents.FHalfCarry = (dataAndEvents.registersHL & 4095) > 2047;
    /** @type {boolean} */
    dataAndEvents.FCarry = dataAndEvents.registersHL > 32767;
    /** @type {number} */
    dataAndEvents.registersHL = dataAndEvents.registersHL << 1 & 65535;
    /** @type {boolean} */
    dataAndEvents.FSubtract = false;
}, function(event) {
    event.registerA = event.memoryReader[event.registersHL](event, event.registersHL);
    /** @type {number} */
    event.registersHL = event.registersHL + 1 & 65535;
}, function(dataAndEvents) {
    /** @type {number} */
    dataAndEvents.registersHL = dataAndEvents.registersHL - 1 & 65535;
}, function(dataAndEvents) {
    /** @type {number} */
    var registersHL = dataAndEvents.registersHL + 1 & 255;
    /** @type {boolean} */
    dataAndEvents.FZero = registersHL == 0;
    /** @type {boolean} */
    dataAndEvents.FHalfCarry = (registersHL & 15) == 0;
    /** @type {boolean} */
    dataAndEvents.FSubtract = false;
    /** @type {number} */
    dataAndEvents.registersHL = dataAndEvents.registersHL & 65280 | registersHL;
}, function(dataAndEvents) {
    /** @type {number} */
    var registersHL = dataAndEvents.registersHL - 1 & 255;
    /** @type {boolean} */
    dataAndEvents.FZero = registersHL == 0;
    /** @type {boolean} */
    dataAndEvents.FHalfCarry = (registersHL & 15) == 15;
    /** @type {boolean} */
    dataAndEvents.FSubtract = true;
    /** @type {number} */
    dataAndEvents.registersHL = dataAndEvents.registersHL & 65280 | registersHL;
}, function(deepDataAndEvents) {
    /** @type {number} */
    deepDataAndEvents.registersHL = deepDataAndEvents.registersHL & 65280 | deepDataAndEvents.memoryReader[deepDataAndEvents.programCounter](deepDataAndEvents, deepDataAndEvents.programCounter);
    /** @type {number} */
    deepDataAndEvents.programCounter = deepDataAndEvents.programCounter + 1 & 65535;
}, function(dataAndEvents) {
    dataAndEvents.registerA ^= 255;
    /** @type {boolean} */
    dataAndEvents.FSubtract = dataAndEvents.FHalfCarry = true;
}, function(deepDataAndEvents) {
    if (!deepDataAndEvents.FCarry) {
        /** @type {number} */
        deepDataAndEvents.programCounter = deepDataAndEvents.programCounter + (deepDataAndEvents.memoryReader[deepDataAndEvents.programCounter](deepDataAndEvents, deepDataAndEvents.programCounter) << 24 >> 24) + 1 & 65535;
        deepDataAndEvents.CPUTicks += 4;
    } else {
        /** @type {number} */
        deepDataAndEvents.programCounter = deepDataAndEvents.programCounter + 1 & 65535;
    }
}, function(deepDataAndEvents) {
    /** @type {number} */
    deepDataAndEvents.stackPointer = deepDataAndEvents.memoryRead(deepDataAndEvents.programCounter + 1 & 65535) << 8 | deepDataAndEvents.memoryReader[deepDataAndEvents.programCounter](deepDataAndEvents, deepDataAndEvents.programCounter);
    /** @type {number} */
    deepDataAndEvents.programCounter = deepDataAndEvents.programCounter + 2 & 65535;
}, function(deepDataAndEvents) {
    deepDataAndEvents.memoryWriter[deepDataAndEvents.registersHL](deepDataAndEvents, deepDataAndEvents.registersHL, deepDataAndEvents.registerA);
    /** @type {number} */
    deepDataAndEvents.registersHL = deepDataAndEvents.registersHL - 1 & 65535;
}, function(dataAndEvents) {
    /** @type {number} */
    dataAndEvents.stackPointer = dataAndEvents.stackPointer + 1 & 65535;
}, function(deepDataAndEvents) {
    /** @type {number} */
    var r20 = deepDataAndEvents.memoryReader[deepDataAndEvents.registersHL](deepDataAndEvents, deepDataAndEvents.registersHL) + 1 & 255;
    /** @type {boolean} */
    deepDataAndEvents.FZero = r20 == 0;
    /** @type {boolean} */
    deepDataAndEvents.FHalfCarry = (r20 & 15) == 0;
    /** @type {boolean} */
    deepDataAndEvents.FSubtract = false;
    deepDataAndEvents.memoryWriter[deepDataAndEvents.registersHL](deepDataAndEvents, deepDataAndEvents.registersHL, r20);
}, function(deepDataAndEvents) {
    /** @type {number} */
    var r20 = deepDataAndEvents.memoryReader[deepDataAndEvents.registersHL](deepDataAndEvents, deepDataAndEvents.registersHL) - 1 & 255;
    /** @type {boolean} */
    deepDataAndEvents.FZero = r20 == 0;
    /** @type {boolean} */
    deepDataAndEvents.FHalfCarry = (r20 & 15) == 15;
    /** @type {boolean} */
    deepDataAndEvents.FSubtract = true;
    deepDataAndEvents.memoryWriter[deepDataAndEvents.registersHL](deepDataAndEvents, deepDataAndEvents.registersHL, r20);
}, function(deepDataAndEvents) {
    deepDataAndEvents.memoryWriter[deepDataAndEvents.registersHL](deepDataAndEvents, deepDataAndEvents.registersHL, deepDataAndEvents.memoryReader[deepDataAndEvents.programCounter](deepDataAndEvents, deepDataAndEvents.programCounter));
    /** @type {number} */
    deepDataAndEvents.programCounter = deepDataAndEvents.programCounter + 1 & 65535;
}, function(dataAndEvents) {
    /** @type {boolean} */
    dataAndEvents.FCarry = true;
    /** @type {boolean} */
    dataAndEvents.FSubtract = dataAndEvents.FHalfCarry = false;
}, function(deepDataAndEvents) {
    if (deepDataAndEvents.FCarry) {
        /** @type {number} */
        deepDataAndEvents.programCounter = deepDataAndEvents.programCounter + (deepDataAndEvents.memoryReader[deepDataAndEvents.programCounter](deepDataAndEvents, deepDataAndEvents.programCounter) << 24 >> 24) + 1 & 65535;
        deepDataAndEvents.CPUTicks += 4;
    } else {
        /** @type {number} */
        deepDataAndEvents.programCounter = deepDataAndEvents.programCounter + 1 & 65535;
    }
}, function(tech) {
    var methodAttrib = tech.registersHL + tech.stackPointer;
    /** @type {boolean} */
    tech.FHalfCarry = (tech.registersHL & 4095) > (methodAttrib & 4095);
    /** @type {boolean} */
    tech.FCarry = methodAttrib > 65535;
    /** @type {number} */
    tech.registersHL = methodAttrib & 65535;
    /** @type {boolean} */
    tech.FSubtract = false;
}, function(d) {
    d.registerA = d.memoryReader[d.registersHL](d, d.registersHL);
    /** @type {number} */
    d.registersHL = d.registersHL - 1 & 65535;
}, function(dataAndEvents) {
    /** @type {number} */
    dataAndEvents.stackPointer = dataAndEvents.stackPointer - 1 & 65535;
}, function(dataAndEvents) {
    /** @type {number} */
    dataAndEvents.registerA = dataAndEvents.registerA + 1 & 255;
    /** @type {boolean} */
    dataAndEvents.FZero = dataAndEvents.registerA == 0;
    /** @type {boolean} */
    dataAndEvents.FHalfCarry = (dataAndEvents.registerA & 15) == 0;
    /** @type {boolean} */
    dataAndEvents.FSubtract = false;
}, function(dataAndEvents) {
    /** @type {number} */
    dataAndEvents.registerA = dataAndEvents.registerA - 1 & 255;
    /** @type {boolean} */
    dataAndEvents.FZero = dataAndEvents.registerA == 0;
    /** @type {boolean} */
    dataAndEvents.FHalfCarry = (dataAndEvents.registerA & 15) == 15;
    /** @type {boolean} */
    dataAndEvents.FSubtract = true;
}, function(event) {
    event.registerA = event.memoryReader[event.programCounter](event, event.programCounter);
    /** @type {number} */
    event.programCounter = event.programCounter + 1 & 65535;
}, function(dataAndEvents) {
    /** @type {boolean} */
    dataAndEvents.FCarry = !dataAndEvents.FCarry;
    /** @type {boolean} */
    dataAndEvents.FSubtract = dataAndEvents.FHalfCarry = false;
}, function(dataAndEvents) {
}, function(dataAndEvents) {
    dataAndEvents.registerB = dataAndEvents.registerC;
}, function(dataAndEvents) {
    dataAndEvents.registerB = dataAndEvents.registerD;
}, function(dataAndEvents) {
    dataAndEvents.registerB = dataAndEvents.registerE;
}, function(dataAndEvents) {
    /** @type {number} */
    dataAndEvents.registerB = dataAndEvents.registersHL >> 8;
}, function(dataAndEvents) {
    /** @type {number} */
    dataAndEvents.registerB = dataAndEvents.registersHL & 255;
}, function(d) {
    d.registerB = d.memoryReader[d.registersHL](d, d.registersHL);
}, function(dataAndEvents) {
    dataAndEvents.registerB = dataAndEvents.registerA;
}, function(dataAndEvents) {
    dataAndEvents.registerC = dataAndEvents.registerB;
}, function(dataAndEvents) {
}, function(dataAndEvents) {
    dataAndEvents.registerC = dataAndEvents.registerD;
}, function(dataAndEvents) {
    dataAndEvents.registerC = dataAndEvents.registerE;
}, function(dataAndEvents) {
    /** @type {number} */
    dataAndEvents.registerC = dataAndEvents.registersHL >> 8;
}, function(dataAndEvents) {
    /** @type {number} */
    dataAndEvents.registerC = dataAndEvents.registersHL & 255;
}, function(event) {
    event.registerC = event.memoryReader[event.registersHL](event, event.registersHL);
}, function(dataAndEvents) {
    dataAndEvents.registerC = dataAndEvents.registerA;
}, function(dataAndEvents) {
    dataAndEvents.registerD = dataAndEvents.registerB;
}, function(dataAndEvents) {
    dataAndEvents.registerD = dataAndEvents.registerC;
}, function(dataAndEvents) {
}, function(dataAndEvents) {
    dataAndEvents.registerD = dataAndEvents.registerE;
}, function(dataAndEvents) {
    /** @type {number} */
    dataAndEvents.registerD = dataAndEvents.registersHL >> 8;
}, function(dataAndEvents) {
    /** @type {number} */
    dataAndEvents.registerD = dataAndEvents.registersHL & 255;
}, function(event) {
    event.registerD = event.memoryReader[event.registersHL](event, event.registersHL);
}, function(dataAndEvents) {
    dataAndEvents.registerD = dataAndEvents.registerA;
}, function(dataAndEvents) {
    dataAndEvents.registerE = dataAndEvents.registerB;
}, function(dataAndEvents) {
    dataAndEvents.registerE = dataAndEvents.registerC;
}, function(dataAndEvents) {
    dataAndEvents.registerE = dataAndEvents.registerD;
}, function(dataAndEvents) {
}, function(dataAndEvents) {
    /** @type {number} */
    dataAndEvents.registerE = dataAndEvents.registersHL >> 8;
}, function(dataAndEvents) {
    /** @type {number} */
    dataAndEvents.registerE = dataAndEvents.registersHL & 255;
}, function(event) {
    event.registerE = event.memoryReader[event.registersHL](event, event.registersHL);
}, function(dataAndEvents) {
    dataAndEvents.registerE = dataAndEvents.registerA;
}, function(dataAndEvents) {
    /** @type {number} */
    dataAndEvents.registersHL = dataAndEvents.registerB << 8 | dataAndEvents.registersHL & 255;
}, function(dataAndEvents) {
    /** @type {number} */
    dataAndEvents.registersHL = dataAndEvents.registerC << 8 | dataAndEvents.registersHL & 255;
}, function(dataAndEvents) {
    /** @type {number} */
    dataAndEvents.registersHL = dataAndEvents.registerD << 8 | dataAndEvents.registersHL & 255;
}, function(dataAndEvents) {
    /** @type {number} */
    dataAndEvents.registersHL = dataAndEvents.registerE << 8 | dataAndEvents.registersHL & 255;
}, function(dataAndEvents) {
}, function(dataAndEvents) {
    /** @type {number} */
    dataAndEvents.registersHL = (dataAndEvents.registersHL & 255) * 257;
}, function(deepDataAndEvents) {
    /** @type {number} */
    deepDataAndEvents.registersHL = deepDataAndEvents.memoryReader[deepDataAndEvents.registersHL](deepDataAndEvents, deepDataAndEvents.registersHL) << 8 | deepDataAndEvents.registersHL & 255;
}, function(dataAndEvents) {
    /** @type {number} */
    dataAndEvents.registersHL = dataAndEvents.registerA << 8 | dataAndEvents.registersHL & 255;
}, function(dataAndEvents) {
    /** @type {number} */
    dataAndEvents.registersHL = dataAndEvents.registersHL & 65280 | dataAndEvents.registerB;
}, function(dataAndEvents) {
    /** @type {number} */
    dataAndEvents.registersHL = dataAndEvents.registersHL & 65280 | dataAndEvents.registerC;
}, function(dataAndEvents) {
    /** @type {number} */
    dataAndEvents.registersHL = dataAndEvents.registersHL & 65280 | dataAndEvents.registerD;
}, function(dataAndEvents) {
    /** @type {number} */
    dataAndEvents.registersHL = dataAndEvents.registersHL & 65280 | dataAndEvents.registerE;
}, function(dataAndEvents) {
    /** @type {number} */
    dataAndEvents.registersHL = dataAndEvents.registersHL & 65280 | dataAndEvents.registersHL >> 8;
}, function(dataAndEvents) {
}, function(deepDataAndEvents) {
    /** @type {number} */
    deepDataAndEvents.registersHL = deepDataAndEvents.registersHL & 65280 | deepDataAndEvents.memoryReader[deepDataAndEvents.registersHL](deepDataAndEvents, deepDataAndEvents.registersHL);
}, function(dataAndEvents) {
    /** @type {number} */
    dataAndEvents.registersHL = dataAndEvents.registersHL & 65280 | dataAndEvents.registerA;
}, function(deepDataAndEvents) {
    deepDataAndEvents.memoryWriter[deepDataAndEvents.registersHL](deepDataAndEvents, deepDataAndEvents.registersHL, deepDataAndEvents.registerB);
}, function(deepDataAndEvents) {
    deepDataAndEvents.memoryWriter[deepDataAndEvents.registersHL](deepDataAndEvents, deepDataAndEvents.registersHL, deepDataAndEvents.registerC);
}, function(deepDataAndEvents) {
    deepDataAndEvents.memoryWriter[deepDataAndEvents.registersHL](deepDataAndEvents, deepDataAndEvents.registersHL, deepDataAndEvents.registerD);
}, function(deepDataAndEvents) {
    deepDataAndEvents.memoryWriter[deepDataAndEvents.registersHL](deepDataAndEvents, deepDataAndEvents.registersHL, deepDataAndEvents.registerE);
}, function(deepDataAndEvents) {
    deepDataAndEvents.memoryWriter[deepDataAndEvents.registersHL](deepDataAndEvents, deepDataAndEvents.registersHL, deepDataAndEvents.registersHL >> 8);
}, function(deepDataAndEvents) {
    deepDataAndEvents.memoryWriter[deepDataAndEvents.registersHL](deepDataAndEvents, deepDataAndEvents.registersHL, deepDataAndEvents.registersHL & 255);
}, function(dataAndEvents) {
    if ((dataAndEvents.interruptsEnabled & dataAndEvents.interruptsRequested & 31) > 0) {
        if (!dataAndEvents.cGBC && !dataAndEvents.usedBootROM) {
            /** @type {boolean} */
            dataAndEvents.skipPCIncrement = true;
        } else {
            dataAndEvents.CPUTicks += 4;
        }
    } else {
        dataAndEvents.calculateHALTPeriod();
    }
}, function(deepDataAndEvents) {
    deepDataAndEvents.memoryWriter[deepDataAndEvents.registersHL](deepDataAndEvents, deepDataAndEvents.registersHL, deepDataAndEvents.registerA);
}, function(dataAndEvents) {
    dataAndEvents.registerA = dataAndEvents.registerB;
}, function(dataAndEvents) {
    dataAndEvents.registerA = dataAndEvents.registerC;
}, function(dataAndEvents) {
    dataAndEvents.registerA = dataAndEvents.registerD;
}, function(dataAndEvents) {
    dataAndEvents.registerA = dataAndEvents.registerE;
}, function(dataAndEvents) {
    /** @type {number} */
    dataAndEvents.registerA = dataAndEvents.registersHL >> 8;
}, function(dataAndEvents) {
    /** @type {number} */
    dataAndEvents.registerA = dataAndEvents.registersHL & 255;
}, function(event) {
    event.registerA = event.memoryReader[event.registersHL](event, event.registersHL);
}, function(dataAndEvents) {
}, function(tech) {
    var methodAttrib = tech.registerA + tech.registerB;
    /** @type {boolean} */
    tech.FHalfCarry = (methodAttrib & 15) < (tech.registerA & 15);
    /** @type {boolean} */
    tech.FCarry = methodAttrib > 255;
    /** @type {number} */
    tech.registerA = methodAttrib & 255;
    /** @type {boolean} */
    tech.FZero = tech.registerA == 0;
    /** @type {boolean} */
    tech.FSubtract = false;
}, function(tech) {
    var methodAttrib = tech.registerA + tech.registerC;
    /** @type {boolean} */
    tech.FHalfCarry = (methodAttrib & 15) < (tech.registerA & 15);
    /** @type {boolean} */
    tech.FCarry = methodAttrib > 255;
    /** @type {number} */
    tech.registerA = methodAttrib & 255;
    /** @type {boolean} */
    tech.FZero = tech.registerA == 0;
    /** @type {boolean} */
    tech.FSubtract = false;
}, function($scope) {
    var totalSections = $scope.registerA + $scope.registerD;
    /** @type {boolean} */
    $scope.FHalfCarry = (totalSections & 15) < ($scope.registerA & 15);
    /** @type {boolean} */
    $scope.FCarry = totalSections > 255;
    /** @type {number} */
    $scope.registerA = totalSections & 255;
    /** @type {boolean} */
    $scope.FZero = $scope.registerA == 0;
    /** @type {boolean} */
    $scope.FSubtract = false;
}, function($scope) {
    var totalSections = $scope.registerA + $scope.registerE;
    /** @type {boolean} */
    $scope.FHalfCarry = (totalSections & 15) < ($scope.registerA & 15);
    /** @type {boolean} */
    $scope.FCarry = totalSections > 255;
    /** @type {number} */
    $scope.registerA = totalSections & 255;
    /** @type {boolean} */
    $scope.FZero = $scope.registerA == 0;
    /** @type {boolean} */
    $scope.FSubtract = false;
}, function(dataAndEvents) {
    var registerA = dataAndEvents.registerA + (dataAndEvents.registersHL >> 8);
    /** @type {boolean} */
    dataAndEvents.FHalfCarry = (registerA & 15) < (dataAndEvents.registerA & 15);
    /** @type {boolean} */
    dataAndEvents.FCarry = registerA > 255;
    /** @type {number} */
    dataAndEvents.registerA = registerA & 255;
    /** @type {boolean} */
    dataAndEvents.FZero = dataAndEvents.registerA == 0;
    /** @type {boolean} */
    dataAndEvents.FSubtract = false;
}, function(dataAndEvents) {
    var registerA = dataAndEvents.registerA + (dataAndEvents.registersHL & 255);
    /** @type {boolean} */
    dataAndEvents.FHalfCarry = (registerA & 15) < (dataAndEvents.registerA & 15);
    /** @type {boolean} */
    dataAndEvents.FCarry = registerA > 255;
    /** @type {number} */
    dataAndEvents.registerA = registerA & 255;
    /** @type {boolean} */
    dataAndEvents.FZero = dataAndEvents.registerA == 0;
    /** @type {boolean} */
    dataAndEvents.FSubtract = false;
}, function(obj) {
    var hex = obj.registerA + obj.memoryReader[obj.registersHL](obj, obj.registersHL);
    /** @type {boolean} */
    obj.FHalfCarry = (hex & 15) < (obj.registerA & 15);
    /** @type {boolean} */
    obj.FCarry = hex > 255;
    /** @type {number} */
    obj.registerA = hex & 255;
    /** @type {boolean} */
    obj.FZero = obj.registerA == 0;
    /** @type {boolean} */
    obj.FSubtract = false;
}, function(dataAndEvents) {
    /** @type {boolean} */
    dataAndEvents.FHalfCarry = (dataAndEvents.registerA & 8) == 8;
    /** @type {boolean} */
    dataAndEvents.FCarry = dataAndEvents.registerA > 127;
    /** @type {number} */
    dataAndEvents.registerA = dataAndEvents.registerA << 1 & 255;
    /** @type {boolean} */
    dataAndEvents.FZero = dataAndEvents.registerA == 0;
    /** @type {boolean} */
    dataAndEvents.FSubtract = false;
}, function(tech) {
    var methodAttrib = tech.registerA + tech.registerB + (tech.FCarry ? 1 : 0);
    /** @type {boolean} */
    tech.FHalfCarry = (tech.registerA & 15) + (tech.registerB & 15) + (tech.FCarry ? 1 : 0) > 15;
    /** @type {boolean} */
    tech.FCarry = methodAttrib > 255;
    /** @type {number} */
    tech.registerA = methodAttrib & 255;
    /** @type {boolean} */
    tech.FZero = tech.registerA == 0;
    /** @type {boolean} */
    tech.FSubtract = false;
}, function($scope) {
    var totalSections = $scope.registerA + $scope.registerC + ($scope.FCarry ? 1 : 0);
    /** @type {boolean} */
    $scope.FHalfCarry = ($scope.registerA & 15) + ($scope.registerC & 15) + ($scope.FCarry ? 1 : 0) > 15;
    /** @type {boolean} */
    $scope.FCarry = totalSections > 255;
    /** @type {number} */
    $scope.registerA = totalSections & 255;
    /** @type {boolean} */
    $scope.FZero = $scope.registerA == 0;
    /** @type {boolean} */
    $scope.FSubtract = false;
}, function(tech) {
    var methodAttrib = tech.registerA + tech.registerD + (tech.FCarry ? 1 : 0);
    /** @type {boolean} */
    tech.FHalfCarry = (tech.registerA & 15) + (tech.registerD & 15) + (tech.FCarry ? 1 : 0) > 15;
    /** @type {boolean} */
    tech.FCarry = methodAttrib > 255;
    /** @type {number} */
    tech.registerA = methodAttrib & 255;
    /** @type {boolean} */
    tech.FZero = tech.registerA == 0;
    /** @type {boolean} */
    tech.FSubtract = false;
}, function($scope) {
    var totalSections = $scope.registerA + $scope.registerE + ($scope.FCarry ? 1 : 0);
    /** @type {boolean} */
    $scope.FHalfCarry = ($scope.registerA & 15) + ($scope.registerE & 15) + ($scope.FCarry ? 1 : 0) > 15;
    /** @type {boolean} */
    $scope.FCarry = totalSections > 255;
    /** @type {number} */
    $scope.registerA = totalSections & 255;
    /** @type {boolean} */
    $scope.FZero = $scope.registerA == 0;
    /** @type {boolean} */
    $scope.FSubtract = false;
}, function(arr) {
    /** @type {number} */
    var fromIndex = arr.registersHL >> 8;
    var registerA = arr.registerA + fromIndex + (arr.FCarry ? 1 : 0);
    /** @type {boolean} */
    arr.FHalfCarry = (arr.registerA & 15) + (fromIndex & 15) + (arr.FCarry ? 1 : 0) > 15;
    /** @type {boolean} */
    arr.FCarry = registerA > 255;
    /** @type {number} */
    arr.registerA = registerA & 255;
    /** @type {boolean} */
    arr.FZero = arr.registerA == 0;
    /** @type {boolean} */
    arr.FSubtract = false;
}, function(arr) {
    /** @type {number} */
    var fromIndex = arr.registersHL & 255;
    var registerA = arr.registerA + fromIndex + (arr.FCarry ? 1 : 0);
    /** @type {boolean} */
    arr.FHalfCarry = (arr.registerA & 15) + (fromIndex & 15) + (arr.FCarry ? 1 : 0) > 15;
    /** @type {boolean} */
    arr.FCarry = registerA > 255;
    /** @type {number} */
    arr.registerA = registerA & 255;
    /** @type {boolean} */
    arr.FZero = arr.registerA == 0;
    /** @type {boolean} */
    arr.FSubtract = false;
}, function(element) {
    var output = element.memoryReader[element.registersHL](element, element.registersHL);
    var registerA = element.registerA + output + (element.FCarry ? 1 : 0);
    /** @type {boolean} */
    element.FHalfCarry = (element.registerA & 15) + (output & 15) + (element.FCarry ? 1 : 0) > 15;
    /** @type {boolean} */
    element.FCarry = registerA > 255;
    /** @type {number} */
    element.registerA = registerA & 255;
    /** @type {boolean} */
    element.FZero = element.registerA == 0;
    /** @type {boolean} */
    element.FSubtract = false;
}, function(dataAndEvents) {
    /** @type {number} */
    var registerA = dataAndEvents.registerA << 1 | (dataAndEvents.FCarry ? 1 : 0);
    /** @type {boolean} */
    dataAndEvents.FHalfCarry = (dataAndEvents.registerA << 1 & 30 | (dataAndEvents.FCarry ? 1 : 0)) > 15;
    /** @type {boolean} */
    dataAndEvents.FCarry = registerA > 255;
    /** @type {number} */
    dataAndEvents.registerA = registerA & 255;
    /** @type {boolean} */
    dataAndEvents.FZero = dataAndEvents.registerA == 0;
    /** @type {boolean} */
    dataAndEvents.FSubtract = false;
}, function($scope) {
    /** @type {number} */
    var cnt = $scope.registerA - $scope.registerB;
    /** @type {boolean} */
    $scope.FHalfCarry = ($scope.registerA & 15) < (cnt & 15);
    /** @type {boolean} */
    $scope.FCarry = cnt < 0;
    /** @type {number} */
    $scope.registerA = cnt & 255;
    /** @type {boolean} */
    $scope.FZero = cnt == 0;
    /** @type {boolean} */
    $scope.FSubtract = true;
}, function($scope) {
    /** @type {number} */
    var cnt = $scope.registerA - $scope.registerC;
    /** @type {boolean} */
    $scope.FHalfCarry = ($scope.registerA & 15) < (cnt & 15);
    /** @type {boolean} */
    $scope.FCarry = cnt < 0;
    /** @type {number} */
    $scope.registerA = cnt & 255;
    /** @type {boolean} */
    $scope.FZero = cnt == 0;
    /** @type {boolean} */
    $scope.FSubtract = true;
}, function($scope) {
    /** @type {number} */
    var cnt = $scope.registerA - $scope.registerD;
    /** @type {boolean} */
    $scope.FHalfCarry = ($scope.registerA & 15) < (cnt & 15);
    /** @type {boolean} */
    $scope.FCarry = cnt < 0;
    /** @type {number} */
    $scope.registerA = cnt & 255;
    /** @type {boolean} */
    $scope.FZero = cnt == 0;
    /** @type {boolean} */
    $scope.FSubtract = true;
}, function($scope) {
    /** @type {number} */
    var cnt = $scope.registerA - $scope.registerE;
    /** @type {boolean} */
    $scope.FHalfCarry = ($scope.registerA & 15) < (cnt & 15);
    /** @type {boolean} */
    $scope.FCarry = cnt < 0;
    /** @type {number} */
    $scope.registerA = cnt & 255;
    /** @type {boolean} */
    $scope.FZero = cnt == 0;
    /** @type {boolean} */
    $scope.FSubtract = true;
}, function(child) {
    /** @type {number} */
    var i = child.registerA - (child.registersHL >> 8);
    /** @type {boolean} */
    child.FHalfCarry = (child.registerA & 15) < (i & 15);
    /** @type {boolean} */
    child.FCarry = i < 0;
    /** @type {number} */
    child.registerA = i & 255;
    /** @type {boolean} */
    child.FZero = i == 0;
    /** @type {boolean} */
    child.FSubtract = true;
}, function(child) {
    /** @type {number} */
    var i = child.registerA - (child.registersHL & 255);
    /** @type {boolean} */
    child.FHalfCarry = (child.registerA & 15) < (i & 15);
    /** @type {boolean} */
    child.FCarry = i < 0;
    /** @type {number} */
    child.registerA = i & 255;
    /** @type {boolean} */
    child.FZero = i == 0;
    /** @type {boolean} */
    child.FSubtract = true;
}, function(bench) {
    /** @type {number} */
    var clocked = bench.registerA - bench.memoryReader[bench.registersHL](bench, bench.registersHL);
    /** @type {boolean} */
    bench.FHalfCarry = (bench.registerA & 15) < (clocked & 15);
    /** @type {boolean} */
    bench.FCarry = clocked < 0;
    /** @type {number} */
    bench.registerA = clocked & 255;
    /** @type {boolean} */
    bench.FZero = clocked == 0;
    /** @type {boolean} */
    bench.FSubtract = true;
}, function(dataAndEvents) {
    /** @type {number} */
    dataAndEvents.registerA = 0;
    /** @type {boolean} */
    dataAndEvents.FHalfCarry = dataAndEvents.FCarry = false;
    /** @type {boolean} */
    dataAndEvents.FZero = dataAndEvents.FSubtract = true;
}, function($scope) {
    /** @type {number} */
    var cnt = $scope.registerA - $scope.registerB - ($scope.FCarry ? 1 : 0);
    /** @type {boolean} */
    $scope.FHalfCarry = ($scope.registerA & 15) - ($scope.registerB & 15) - ($scope.FCarry ? 1 : 0) < 0;
    /** @type {boolean} */
    $scope.FCarry = cnt < 0;
    /** @type {number} */
    $scope.registerA = cnt & 255;
    /** @type {boolean} */
    $scope.FZero = $scope.registerA == 0;
    /** @type {boolean} */
    $scope.FSubtract = true;
}, function($scope) {
    /** @type {number} */
    var cnt = $scope.registerA - $scope.registerC - ($scope.FCarry ? 1 : 0);
    /** @type {boolean} */
    $scope.FHalfCarry = ($scope.registerA & 15) - ($scope.registerC & 15) - ($scope.FCarry ? 1 : 0) < 0;
    /** @type {boolean} */
    $scope.FCarry = cnt < 0;
    /** @type {number} */
    $scope.registerA = cnt & 255;
    /** @type {boolean} */
    $scope.FZero = $scope.registerA == 0;
    /** @type {boolean} */
    $scope.FSubtract = true;
}, function($scope) {
    /** @type {number} */
    var cnt = $scope.registerA - $scope.registerD - ($scope.FCarry ? 1 : 0);
    /** @type {boolean} */
    $scope.FHalfCarry = ($scope.registerA & 15) - ($scope.registerD & 15) - ($scope.FCarry ? 1 : 0) < 0;
    /** @type {boolean} */
    $scope.FCarry = cnt < 0;
    /** @type {number} */
    $scope.registerA = cnt & 255;
    /** @type {boolean} */
    $scope.FZero = $scope.registerA == 0;
    /** @type {boolean} */
    $scope.FSubtract = true;
}, function($scope) {
    /** @type {number} */
    var cnt = $scope.registerA - $scope.registerE - ($scope.FCarry ? 1 : 0);
    /** @type {boolean} */
    $scope.FHalfCarry = ($scope.registerA & 15) - ($scope.registerE & 15) - ($scope.FCarry ? 1 : 0) < 0;
    /** @type {boolean} */
    $scope.FCarry = cnt < 0;
    /** @type {number} */
    $scope.registerA = cnt & 255;
    /** @type {boolean} */
    $scope.FZero = $scope.registerA == 0;
    /** @type {boolean} */
    $scope.FSubtract = true;
}, function(yy_) {
    /** @type {number} */
    var end = yy_.registersHL >> 8;
    /** @type {number} */
    var registerA = yy_.registerA - end - (yy_.FCarry ? 1 : 0);
    /** @type {boolean} */
    yy_.FHalfCarry = (yy_.registerA & 15) - (end & 15) - (yy_.FCarry ? 1 : 0) < 0;
    /** @type {boolean} */
    yy_.FCarry = registerA < 0;
    /** @type {number} */
    yy_.registerA = registerA & 255;
    /** @type {boolean} */
    yy_.FZero = yy_.registerA == 0;
    /** @type {boolean} */
    yy_.FSubtract = true;
}, function(dataAndEvents) {
    /** @type {number} */
    var registerA = dataAndEvents.registerA - (dataAndEvents.registersHL & 255) - (dataAndEvents.FCarry ? 1 : 0);
    /** @type {boolean} */
    dataAndEvents.FHalfCarry = (dataAndEvents.registerA & 15) - (dataAndEvents.registersHL & 15) - (dataAndEvents.FCarry ? 1 : 0) < 0;
    /** @type {boolean} */
    dataAndEvents.FCarry = registerA < 0;
    /** @type {number} */
    dataAndEvents.registerA = registerA & 255;
    /** @type {boolean} */
    dataAndEvents.FZero = dataAndEvents.registerA == 0;
    /** @type {boolean} */
    dataAndEvents.FSubtract = true;
}, function(c) {
    var pos = c.memoryReader[c.registersHL](c, c.registersHL);
    /** @type {number} */
    var registerA = c.registerA - pos - (c.FCarry ? 1 : 0);
    /** @type {boolean} */
    c.FHalfCarry = (c.registerA & 15) - (pos & 15) - (c.FCarry ? 1 : 0) < 0;
    /** @type {boolean} */
    c.FCarry = registerA < 0;
    /** @type {number} */
    c.registerA = registerA & 255;
    /** @type {boolean} */
    c.FZero = c.registerA == 0;
    /** @type {boolean} */
    c.FSubtract = true;
}, function(dataAndEvents) {
    if (dataAndEvents.FCarry) {
        /** @type {boolean} */
        dataAndEvents.FZero = false;
        /** @type {boolean} */
        dataAndEvents.FSubtract = dataAndEvents.FHalfCarry = dataAndEvents.FCarry = true;
        /** @type {number} */
        dataAndEvents.registerA = 255;
    } else {
        /** @type {boolean} */
        dataAndEvents.FHalfCarry = dataAndEvents.FCarry = false;
        /** @type {boolean} */
        dataAndEvents.FSubtract = dataAndEvents.FZero = true;
        /** @type {number} */
        dataAndEvents.registerA = 0;
    }
}, function(dataAndEvents) {
    dataAndEvents.registerA &= dataAndEvents.registerB;
    /** @type {boolean} */
    dataAndEvents.FZero = dataAndEvents.registerA == 0;
    /** @type {boolean} */
    dataAndEvents.FHalfCarry = true;
    /** @type {boolean} */
    dataAndEvents.FSubtract = dataAndEvents.FCarry = false;
}, function(dataAndEvents) {
    dataAndEvents.registerA &= dataAndEvents.registerC;
    /** @type {boolean} */
    dataAndEvents.FZero = dataAndEvents.registerA == 0;
    /** @type {boolean} */
    dataAndEvents.FHalfCarry = true;
    /** @type {boolean} */
    dataAndEvents.FSubtract = dataAndEvents.FCarry = false;
}, function(dataAndEvents) {
    dataAndEvents.registerA &= dataAndEvents.registerD;
    /** @type {boolean} */
    dataAndEvents.FZero = dataAndEvents.registerA == 0;
    /** @type {boolean} */
    dataAndEvents.FHalfCarry = true;
    /** @type {boolean} */
    dataAndEvents.FSubtract = dataAndEvents.FCarry = false;
}, function(dataAndEvents) {
    dataAndEvents.registerA &= dataAndEvents.registerE;
    /** @type {boolean} */
    dataAndEvents.FZero = dataAndEvents.registerA == 0;
    /** @type {boolean} */
    dataAndEvents.FHalfCarry = true;
    /** @type {boolean} */
    dataAndEvents.FSubtract = dataAndEvents.FCarry = false;
}, function(dataAndEvents) {
    dataAndEvents.registerA &= dataAndEvents.registersHL >> 8;
    /** @type {boolean} */
    dataAndEvents.FZero = dataAndEvents.registerA == 0;
    /** @type {boolean} */
    dataAndEvents.FHalfCarry = true;
    /** @type {boolean} */
    dataAndEvents.FSubtract = dataAndEvents.FCarry = false;
}, function(dataAndEvents) {
    dataAndEvents.registerA &= dataAndEvents.registersHL;
    /** @type {boolean} */
    dataAndEvents.FZero = dataAndEvents.registerA == 0;
    /** @type {boolean} */
    dataAndEvents.FHalfCarry = true;
    /** @type {boolean} */
    dataAndEvents.FSubtract = dataAndEvents.FCarry = false;
}, function(deepDataAndEvents) {
    deepDataAndEvents.registerA &= deepDataAndEvents.memoryReader[deepDataAndEvents.registersHL](deepDataAndEvents, deepDataAndEvents.registersHL);
    /** @type {boolean} */
    deepDataAndEvents.FZero = deepDataAndEvents.registerA == 0;
    /** @type {boolean} */
    deepDataAndEvents.FHalfCarry = true;
    /** @type {boolean} */
    deepDataAndEvents.FSubtract = deepDataAndEvents.FCarry = false;
}, function(dataAndEvents) {
    /** @type {boolean} */
    dataAndEvents.FZero = dataAndEvents.registerA == 0;
    /** @type {boolean} */
    dataAndEvents.FHalfCarry = true;
    /** @type {boolean} */
    dataAndEvents.FSubtract = dataAndEvents.FCarry = false;
}, function(dataAndEvents) {
    dataAndEvents.registerA ^= dataAndEvents.registerB;
    /** @type {boolean} */
    dataAndEvents.FZero = dataAndEvents.registerA == 0;
    /** @type {boolean} */
    dataAndEvents.FSubtract = dataAndEvents.FHalfCarry = dataAndEvents.FCarry = false;
}, function(dataAndEvents) {
    dataAndEvents.registerA ^= dataAndEvents.registerC;
    /** @type {boolean} */
    dataAndEvents.FZero = dataAndEvents.registerA == 0;
    /** @type {boolean} */
    dataAndEvents.FSubtract = dataAndEvents.FHalfCarry = dataAndEvents.FCarry = false;
}, function(dataAndEvents) {
    dataAndEvents.registerA ^= dataAndEvents.registerD;
    /** @type {boolean} */
    dataAndEvents.FZero = dataAndEvents.registerA == 0;
    /** @type {boolean} */
    dataAndEvents.FSubtract = dataAndEvents.FHalfCarry = dataAndEvents.FCarry = false;
}, function(dataAndEvents) {
    dataAndEvents.registerA ^= dataAndEvents.registerE;
    /** @type {boolean} */
    dataAndEvents.FZero = dataAndEvents.registerA == 0;
    /** @type {boolean} */
    dataAndEvents.FSubtract = dataAndEvents.FHalfCarry = dataAndEvents.FCarry = false;
}, function(dataAndEvents) {
    dataAndEvents.registerA ^= dataAndEvents.registersHL >> 8;
    /** @type {boolean} */
    dataAndEvents.FZero = dataAndEvents.registerA == 0;
    /** @type {boolean} */
    dataAndEvents.FSubtract = dataAndEvents.FHalfCarry = dataAndEvents.FCarry = false;
}, function(dataAndEvents) {
    dataAndEvents.registerA ^= dataAndEvents.registersHL & 255;
    /** @type {boolean} */
    dataAndEvents.FZero = dataAndEvents.registerA == 0;
    /** @type {boolean} */
    dataAndEvents.FSubtract = dataAndEvents.FHalfCarry = dataAndEvents.FCarry = false;
}, function(deepDataAndEvents) {
    deepDataAndEvents.registerA ^= deepDataAndEvents.memoryReader[deepDataAndEvents.registersHL](deepDataAndEvents, deepDataAndEvents.registersHL);
    /** @type {boolean} */
    deepDataAndEvents.FZero = deepDataAndEvents.registerA == 0;
    /** @type {boolean} */
    deepDataAndEvents.FSubtract = deepDataAndEvents.FHalfCarry = deepDataAndEvents.FCarry = false;
}, function(dataAndEvents) {
    /** @type {number} */
    dataAndEvents.registerA = 0;
    /** @type {boolean} */
    dataAndEvents.FZero = true;
    /** @type {boolean} */
    dataAndEvents.FSubtract = dataAndEvents.FHalfCarry = dataAndEvents.FCarry = false;
}, function(dataAndEvents) {
    dataAndEvents.registerA |= dataAndEvents.registerB;
    /** @type {boolean} */
    dataAndEvents.FZero = dataAndEvents.registerA == 0;
    /** @type {boolean} */
    dataAndEvents.FSubtract = dataAndEvents.FCarry = dataAndEvents.FHalfCarry = false;
}, function(dataAndEvents) {
    dataAndEvents.registerA |= dataAndEvents.registerC;
    /** @type {boolean} */
    dataAndEvents.FZero = dataAndEvents.registerA == 0;
    /** @type {boolean} */
    dataAndEvents.FSubtract = dataAndEvents.FCarry = dataAndEvents.FHalfCarry = false;
}, function(dataAndEvents) {
    dataAndEvents.registerA |= dataAndEvents.registerD;
    /** @type {boolean} */
    dataAndEvents.FZero = dataAndEvents.registerA == 0;
    /** @type {boolean} */
    dataAndEvents.FSubtract = dataAndEvents.FCarry = dataAndEvents.FHalfCarry = false;
}, function(dataAndEvents) {
    dataAndEvents.registerA |= dataAndEvents.registerE;
    /** @type {boolean} */
    dataAndEvents.FZero = dataAndEvents.registerA == 0;
    /** @type {boolean} */
    dataAndEvents.FSubtract = dataAndEvents.FCarry = dataAndEvents.FHalfCarry = false;
}, function(dataAndEvents) {
    dataAndEvents.registerA |= dataAndEvents.registersHL >> 8;
    /** @type {boolean} */
    dataAndEvents.FZero = dataAndEvents.registerA == 0;
    /** @type {boolean} */
    dataAndEvents.FSubtract = dataAndEvents.FCarry = dataAndEvents.FHalfCarry = false;
}, function(dataAndEvents) {
    dataAndEvents.registerA |= dataAndEvents.registersHL & 255;
    /** @type {boolean} */
    dataAndEvents.FZero = dataAndEvents.registerA == 0;
    /** @type {boolean} */
    dataAndEvents.FSubtract = dataAndEvents.FCarry = dataAndEvents.FHalfCarry = false;
}, function(deepDataAndEvents) {
    deepDataAndEvents.registerA |= deepDataAndEvents.memoryReader[deepDataAndEvents.registersHL](deepDataAndEvents, deepDataAndEvents.registersHL);
    /** @type {boolean} */
    deepDataAndEvents.FZero = deepDataAndEvents.registerA == 0;
    /** @type {boolean} */
    deepDataAndEvents.FSubtract = deepDataAndEvents.FCarry = deepDataAndEvents.FHalfCarry = false;
}, function(dataAndEvents) {
    /** @type {boolean} */
    dataAndEvents.FZero = dataAndEvents.registerA == 0;
    /** @type {boolean} */
    dataAndEvents.FSubtract = dataAndEvents.FCarry = dataAndEvents.FHalfCarry = false;
}, function($scope) {
    /** @type {number} */
    var cnt = $scope.registerA - $scope.registerB;
    /** @type {boolean} */
    $scope.FHalfCarry = (cnt & 15) > ($scope.registerA & 15);
    /** @type {boolean} */
    $scope.FCarry = cnt < 0;
    /** @type {boolean} */
    $scope.FZero = cnt == 0;
    /** @type {boolean} */
    $scope.FSubtract = true;
}, function($scope) {
    /** @type {number} */
    var cnt = $scope.registerA - $scope.registerC;
    /** @type {boolean} */
    $scope.FHalfCarry = (cnt & 15) > ($scope.registerA & 15);
    /** @type {boolean} */
    $scope.FCarry = cnt < 0;
    /** @type {boolean} */
    $scope.FZero = cnt == 0;
    /** @type {boolean} */
    $scope.FSubtract = true;
}, function($scope) {
    /** @type {number} */
    var cnt = $scope.registerA - $scope.registerD;
    /** @type {boolean} */
    $scope.FHalfCarry = (cnt & 15) > ($scope.registerA & 15);
    /** @type {boolean} */
    $scope.FCarry = cnt < 0;
    /** @type {boolean} */
    $scope.FZero = cnt == 0;
    /** @type {boolean} */
    $scope.FSubtract = true;
}, function($scope) {
    /** @type {number} */
    var cnt = $scope.registerA - $scope.registerE;
    /** @type {boolean} */
    $scope.FHalfCarry = (cnt & 15) > ($scope.registerA & 15);
    /** @type {boolean} */
    $scope.FCarry = cnt < 0;
    /** @type {boolean} */
    $scope.FZero = cnt == 0;
    /** @type {boolean} */
    $scope.FSubtract = true;
}, function(child) {
    /** @type {number} */
    var i = child.registerA - (child.registersHL >> 8);
    /** @type {boolean} */
    child.FHalfCarry = (i & 15) > (child.registerA & 15);
    /** @type {boolean} */
    child.FCarry = i < 0;
    /** @type {boolean} */
    child.FZero = i == 0;
    /** @type {boolean} */
    child.FSubtract = true;
}, function(child) {
    /** @type {number} */
    var i = child.registerA - (child.registersHL & 255);
    /** @type {boolean} */
    child.FHalfCarry = (i & 15) > (child.registerA & 15);
    /** @type {boolean} */
    child.FCarry = i < 0;
    /** @type {boolean} */
    child.FZero = i == 0;
    /** @type {boolean} */
    child.FSubtract = true;
}, function(bench) {
    /** @type {number} */
    var clocked = bench.registerA - bench.memoryReader[bench.registersHL](bench, bench.registersHL);
    /** @type {boolean} */
    bench.FHalfCarry = (clocked & 15) > (bench.registerA & 15);
    /** @type {boolean} */
    bench.FCarry = clocked < 0;
    /** @type {boolean} */
    bench.FZero = clocked == 0;
    /** @type {boolean} */
    bench.FSubtract = true;
}, function(dataAndEvents) {
    /** @type {boolean} */
    dataAndEvents.FHalfCarry = dataAndEvents.FCarry = false;
    /** @type {boolean} */
    dataAndEvents.FZero = dataAndEvents.FSubtract = true;
}, function(deepDataAndEvents) {
    if (!deepDataAndEvents.FZero) {
        /** @type {number} */
        deepDataAndEvents.programCounter = deepDataAndEvents.memoryRead(deepDataAndEvents.stackPointer + 1 & 65535) << 8 | deepDataAndEvents.memoryReader[deepDataAndEvents.stackPointer](deepDataAndEvents, deepDataAndEvents.stackPointer);
        /** @type {number} */
        deepDataAndEvents.stackPointer = deepDataAndEvents.stackPointer + 2 & 65535;
        deepDataAndEvents.CPUTicks += 12;
    }
}, function(event) {
    event.registerC = event.memoryReader[event.stackPointer](event, event.stackPointer);
    event.registerB = event.memoryRead(event.stackPointer + 1 & 65535);
    /** @type {number} */
    event.stackPointer = event.stackPointer + 2 & 65535;
}, function(deepDataAndEvents) {
    if (!deepDataAndEvents.FZero) {
        /** @type {number} */
        deepDataAndEvents.programCounter = deepDataAndEvents.memoryRead(deepDataAndEvents.programCounter + 1 & 65535) << 8 | deepDataAndEvents.memoryReader[deepDataAndEvents.programCounter](deepDataAndEvents, deepDataAndEvents.programCounter);
        deepDataAndEvents.CPUTicks += 4;
    } else {
        /** @type {number} */
        deepDataAndEvents.programCounter = deepDataAndEvents.programCounter + 2 & 65535;
    }
}, function(deepDataAndEvents) {
    /** @type {number} */
    deepDataAndEvents.programCounter = deepDataAndEvents.memoryRead(deepDataAndEvents.programCounter + 1 & 65535) << 8 | deepDataAndEvents.memoryReader[deepDataAndEvents.programCounter](deepDataAndEvents, deepDataAndEvents.programCounter);
}, function(a) {
    if (!a.FZero) {
        /** @type {number} */
        var e = a.memoryRead(a.programCounter + 1 & 65535) << 8 | a.memoryReader[a.programCounter](a, a.programCounter);
        /** @type {number} */
        a.programCounter = a.programCounter + 2 & 65535;
        /** @type {number} */
        a.stackPointer = a.stackPointer - 1 & 65535;
        a.memoryWriter[a.stackPointer](a, a.stackPointer, a.programCounter >> 8);
        /** @type {number} */
        a.stackPointer = a.stackPointer - 1 & 65535;
        a.memoryWriter[a.stackPointer](a, a.stackPointer, a.programCounter & 255);
        /** @type {number} */
        a.programCounter = e;
        a.CPUTicks += 12;
    } else {
        /** @type {number} */
        a.programCounter = a.programCounter + 2 & 65535;
    }
}, function(deepDataAndEvents) {
    /** @type {number} */
    deepDataAndEvents.stackPointer = deepDataAndEvents.stackPointer - 1 & 65535;
    deepDataAndEvents.memoryWriter[deepDataAndEvents.stackPointer](deepDataAndEvents, deepDataAndEvents.stackPointer, deepDataAndEvents.registerB);
    /** @type {number} */
    deepDataAndEvents.stackPointer = deepDataAndEvents.stackPointer - 1 & 65535;
    deepDataAndEvents.memoryWriter[deepDataAndEvents.stackPointer](deepDataAndEvents, deepDataAndEvents.stackPointer, deepDataAndEvents.registerC);
}, function(obj) {
    var hex = obj.registerA + obj.memoryReader[obj.programCounter](obj, obj.programCounter);
    /** @type {number} */
    obj.programCounter = obj.programCounter + 1 & 65535;
    /** @type {boolean} */
    obj.FHalfCarry = (hex & 15) < (obj.registerA & 15);
    /** @type {boolean} */
    obj.FCarry = hex > 255;
    /** @type {number} */
    obj.registerA = hex & 255;
    /** @type {boolean} */
    obj.FZero = obj.registerA == 0;
    /** @type {boolean} */
    obj.FSubtract = false;
}, function(deepDataAndEvents) {
    /** @type {number} */
    deepDataAndEvents.stackPointer = deepDataAndEvents.stackPointer - 1 & 65535;
    deepDataAndEvents.memoryWriter[deepDataAndEvents.stackPointer](deepDataAndEvents, deepDataAndEvents.stackPointer, deepDataAndEvents.programCounter >> 8);
    /** @type {number} */
    deepDataAndEvents.stackPointer = deepDataAndEvents.stackPointer - 1 & 65535;
    deepDataAndEvents.memoryWriter[deepDataAndEvents.stackPointer](deepDataAndEvents, deepDataAndEvents.stackPointer, deepDataAndEvents.programCounter & 255);
    /** @type {number} */
    deepDataAndEvents.programCounter = 0;
}, function(deepDataAndEvents) {
    if (deepDataAndEvents.FZero) {
        /** @type {number} */
        deepDataAndEvents.programCounter = deepDataAndEvents.memoryRead(deepDataAndEvents.stackPointer + 1 & 65535) << 8 | deepDataAndEvents.memoryReader[deepDataAndEvents.stackPointer](deepDataAndEvents, deepDataAndEvents.stackPointer);
        /** @type {number} */
        deepDataAndEvents.stackPointer = deepDataAndEvents.stackPointer + 2 & 65535;
        deepDataAndEvents.CPUTicks += 12;
    }
}, function(deepDataAndEvents) {
    /** @type {number} */
    deepDataAndEvents.programCounter = deepDataAndEvents.memoryRead(deepDataAndEvents.stackPointer + 1 & 65535) << 8 | deepDataAndEvents.memoryReader[deepDataAndEvents.stackPointer](deepDataAndEvents, deepDataAndEvents.stackPointer);
    /** @type {number} */
    deepDataAndEvents.stackPointer = deepDataAndEvents.stackPointer + 2 & 65535;
}, function(deepDataAndEvents) {
    if (deepDataAndEvents.FZero) {
        /** @type {number} */
        deepDataAndEvents.programCounter = deepDataAndEvents.memoryRead(deepDataAndEvents.programCounter + 1 & 65535) << 8 | deepDataAndEvents.memoryReader[deepDataAndEvents.programCounter](deepDataAndEvents, deepDataAndEvents.programCounter);
        deepDataAndEvents.CPUTicks += 4;
    } else {
        /** @type {number} */
        deepDataAndEvents.programCounter = deepDataAndEvents.programCounter + 2 & 65535;
    }
}, function(element) {
    var i = element.memoryReader[element.programCounter](element, element.programCounter);
    /** @type {number} */
    element.programCounter = element.programCounter + 1 & 65535;
    element.CPUTicks += element.SecondaryTICKTable[i];
    element.CBOPCODE[i](element);
}, function(a) {
    if (a.FZero) {
        /** @type {number} */
        var e = a.memoryRead(a.programCounter + 1 & 65535) << 8 | a.memoryReader[a.programCounter](a, a.programCounter);
        /** @type {number} */
        a.programCounter = a.programCounter + 2 & 65535;
        /** @type {number} */
        a.stackPointer = a.stackPointer - 1 & 65535;
        a.memoryWriter[a.stackPointer](a, a.stackPointer, a.programCounter >> 8);
        /** @type {number} */
        a.stackPointer = a.stackPointer - 1 & 65535;
        a.memoryWriter[a.stackPointer](a, a.stackPointer, a.programCounter & 255);
        /** @type {number} */
        a.programCounter = e;
        a.CPUTicks += 12;
    } else {
        /** @type {number} */
        a.programCounter = a.programCounter + 2 & 65535;
    }
}, function(a) {
    /** @type {number} */
    var e = a.memoryRead(a.programCounter + 1 & 65535) << 8 | a.memoryReader[a.programCounter](a, a.programCounter);
    /** @type {number} */
    a.programCounter = a.programCounter + 2 & 65535;
    /** @type {number} */
    a.stackPointer = a.stackPointer - 1 & 65535;
    a.memoryWriter[a.stackPointer](a, a.stackPointer, a.programCounter >> 8);
    /** @type {number} */
    a.stackPointer = a.stackPointer - 1 & 65535;
    a.memoryWriter[a.stackPointer](a, a.stackPointer, a.programCounter & 255);
    /** @type {number} */
    a.programCounter = e;
}, function(data) {
    var n = data.memoryReader[data.programCounter](data, data.programCounter);
    /** @type {number} */
    data.programCounter = data.programCounter + 1 & 65535;
    var registerA = data.registerA + n + (data.FCarry ? 1 : 0);
    /** @type {boolean} */
    data.FHalfCarry = (data.registerA & 15) + (n & 15) + (data.FCarry ? 1 : 0) > 15;
    /** @type {boolean} */
    data.FCarry = registerA > 255;
    /** @type {number} */
    data.registerA = registerA & 255;
    /** @type {boolean} */
    data.FZero = data.registerA == 0;
    /** @type {boolean} */
    data.FSubtract = false;
}, function(deepDataAndEvents) {
    /** @type {number} */
    deepDataAndEvents.stackPointer = deepDataAndEvents.stackPointer - 1 & 65535;
    deepDataAndEvents.memoryWriter[deepDataAndEvents.stackPointer](deepDataAndEvents, deepDataAndEvents.stackPointer, deepDataAndEvents.programCounter >> 8);
    /** @type {number} */
    deepDataAndEvents.stackPointer = deepDataAndEvents.stackPointer - 1 & 65535;
    deepDataAndEvents.memoryWriter[deepDataAndEvents.stackPointer](deepDataAndEvents, deepDataAndEvents.stackPointer, deepDataAndEvents.programCounter & 255);
    /** @type {number} */
    deepDataAndEvents.programCounter = 8;
}, function(deepDataAndEvents) {
    if (!deepDataAndEvents.FCarry) {
        /** @type {number} */
        deepDataAndEvents.programCounter = deepDataAndEvents.memoryRead(deepDataAndEvents.stackPointer + 1 & 65535) << 8 | deepDataAndEvents.memoryReader[deepDataAndEvents.stackPointer](deepDataAndEvents, deepDataAndEvents.stackPointer);
        /** @type {number} */
        deepDataAndEvents.stackPointer = deepDataAndEvents.stackPointer + 2 & 65535;
        deepDataAndEvents.CPUTicks += 12;
    }
}, function(event) {
    event.registerE = event.memoryReader[event.stackPointer](event, event.stackPointer);
    event.registerD = event.memoryRead(event.stackPointer + 1 & 65535);
    /** @type {number} */
    event.stackPointer = event.stackPointer + 2 & 65535;
}, function(deepDataAndEvents) {
    if (!deepDataAndEvents.FCarry) {
        /** @type {number} */
        deepDataAndEvents.programCounter = deepDataAndEvents.memoryRead(deepDataAndEvents.programCounter + 1 & 65535) << 8 | deepDataAndEvents.memoryReader[deepDataAndEvents.programCounter](deepDataAndEvents, deepDataAndEvents.programCounter);
        deepDataAndEvents.CPUTicks += 4;
    } else {
        /** @type {number} */
        deepDataAndEvents.programCounter = deepDataAndEvents.programCounter + 2 & 65535;
    }
}, function(dataAndEvents) {
    cout("Illegal op code 0xD3 called, pausing emulation.", 2);
    pause();
}, function(a) {
    if (!a.FCarry) {
        /** @type {number} */
        var e = a.memoryRead(a.programCounter + 1 & 65535) << 8 | a.memoryReader[a.programCounter](a, a.programCounter);
        /** @type {number} */
        a.programCounter = a.programCounter + 2 & 65535;
        /** @type {number} */
        a.stackPointer = a.stackPointer - 1 & 65535;
        a.memoryWriter[a.stackPointer](a, a.stackPointer, a.programCounter >> 8);
        /** @type {number} */
        a.stackPointer = a.stackPointer - 1 & 65535;
        a.memoryWriter[a.stackPointer](a, a.stackPointer, a.programCounter & 255);
        /** @type {number} */
        a.programCounter = e;
        a.CPUTicks += 12;
    } else {
        /** @type {number} */
        a.programCounter = a.programCounter + 2 & 65535;
    }
}, function(deepDataAndEvents) {
    /** @type {number} */
    deepDataAndEvents.stackPointer = deepDataAndEvents.stackPointer - 1 & 65535;
    deepDataAndEvents.memoryWriter[deepDataAndEvents.stackPointer](deepDataAndEvents, deepDataAndEvents.stackPointer, deepDataAndEvents.registerD);
    /** @type {number} */
    deepDataAndEvents.stackPointer = deepDataAndEvents.stackPointer - 1 & 65535;
    deepDataAndEvents.memoryWriter[deepDataAndEvents.stackPointer](deepDataAndEvents, deepDataAndEvents.stackPointer, deepDataAndEvents.registerE);
}, function(el) {
    /** @type {number} */
    var registerA = el.registerA - el.memoryReader[el.programCounter](el, el.programCounter);
    /** @type {number} */
    el.programCounter = el.programCounter + 1 & 65535;
    /** @type {boolean} */
    el.FHalfCarry = (el.registerA & 15) < (registerA & 15);
    /** @type {boolean} */
    el.FCarry = registerA < 0;
    /** @type {number} */
    el.registerA = registerA & 255;
    /** @type {boolean} */
    el.FZero = registerA == 0;
    /** @type {boolean} */
    el.FSubtract = true;
}, function(deepDataAndEvents) {
    /** @type {number} */
    deepDataAndEvents.stackPointer = deepDataAndEvents.stackPointer - 1 & 65535;
    deepDataAndEvents.memoryWriter[deepDataAndEvents.stackPointer](deepDataAndEvents, deepDataAndEvents.stackPointer, deepDataAndEvents.programCounter >> 8);
    /** @type {number} */
    deepDataAndEvents.stackPointer = deepDataAndEvents.stackPointer - 1 & 65535;
    deepDataAndEvents.memoryWriter[deepDataAndEvents.stackPointer](deepDataAndEvents, deepDataAndEvents.stackPointer, deepDataAndEvents.programCounter & 255);
    /** @type {number} */
    deepDataAndEvents.programCounter = 16;
}, function(deepDataAndEvents) {
    if (deepDataAndEvents.FCarry) {
        /** @type {number} */
        deepDataAndEvents.programCounter = deepDataAndEvents.memoryRead(deepDataAndEvents.stackPointer + 1 & 65535) << 8 | deepDataAndEvents.memoryReader[deepDataAndEvents.stackPointer](deepDataAndEvents, deepDataAndEvents.stackPointer);
        /** @type {number} */
        deepDataAndEvents.stackPointer = deepDataAndEvents.stackPointer + 2 & 65535;
        deepDataAndEvents.CPUTicks += 12;
    }
}, function(deepDataAndEvents) {
    /** @type {number} */
    deepDataAndEvents.programCounter = deepDataAndEvents.memoryRead(deepDataAndEvents.stackPointer + 1 & 65535) << 8 | deepDataAndEvents.memoryReader[deepDataAndEvents.stackPointer](deepDataAndEvents, deepDataAndEvents.stackPointer);
    /** @type {number} */
    deepDataAndEvents.stackPointer = deepDataAndEvents.stackPointer + 2 & 65535;
    /** @type {number} */
    deepDataAndEvents.IRQEnableDelay = deepDataAndEvents.IRQEnableDelay == 2 || deepDataAndEvents.memoryReader[deepDataAndEvents.programCounter](deepDataAndEvents, deepDataAndEvents.programCounter) == 118 ? 1 : 2;
}, function(deepDataAndEvents) {
    if (deepDataAndEvents.FCarry) {
        /** @type {number} */
        deepDataAndEvents.programCounter = deepDataAndEvents.memoryRead(deepDataAndEvents.programCounter + 1 & 65535) << 8 | deepDataAndEvents.memoryReader[deepDataAndEvents.programCounter](deepDataAndEvents, deepDataAndEvents.programCounter);
        deepDataAndEvents.CPUTicks += 4;
    } else {
        /** @type {number} */
        deepDataAndEvents.programCounter = deepDataAndEvents.programCounter + 2 & 65535;
    }
}, function(dataAndEvents) {
    cout("Illegal op code 0xDB called, pausing emulation.", 2);
    pause();
}, function(a) {
    if (a.FCarry) {
        /** @type {number} */
        var e = a.memoryRead(a.programCounter + 1 & 65535) << 8 | a.memoryReader[a.programCounter](a, a.programCounter);
        /** @type {number} */
        a.programCounter = a.programCounter + 2 & 65535;
        /** @type {number} */
        a.stackPointer = a.stackPointer - 1 & 65535;
        a.memoryWriter[a.stackPointer](a, a.stackPointer, a.programCounter >> 8);
        /** @type {number} */
        a.stackPointer = a.stackPointer - 1 & 65535;
        a.memoryWriter[a.stackPointer](a, a.stackPointer, a.programCounter & 255);
        /** @type {number} */
        a.programCounter = e;
        a.CPUTicks += 12;
    } else {
        /** @type {number} */
        a.programCounter = a.programCounter + 2 & 65535;
    }
}, function(dataAndEvents) {
    cout("Illegal op code 0xDD called, pausing emulation.", 2);
    pause();
}, function(c) {
    var pos = c.memoryReader[c.programCounter](c, c.programCounter);
    /** @type {number} */
    c.programCounter = c.programCounter + 1 & 65535;
    /** @type {number} */
    var registerA = c.registerA - pos - (c.FCarry ? 1 : 0);
    /** @type {boolean} */
    c.FHalfCarry = (c.registerA & 15) - (pos & 15) - (c.FCarry ? 1 : 0) < 0;
    /** @type {boolean} */
    c.FCarry = registerA < 0;
    /** @type {number} */
    c.registerA = registerA & 255;
    /** @type {boolean} */
    c.FZero = c.registerA == 0;
    /** @type {boolean} */
    c.FSubtract = true;
}, function(deepDataAndEvents) {
    /** @type {number} */
    deepDataAndEvents.stackPointer = deepDataAndEvents.stackPointer - 1 & 65535;
    deepDataAndEvents.memoryWriter[deepDataAndEvents.stackPointer](deepDataAndEvents, deepDataAndEvents.stackPointer, deepDataAndEvents.programCounter >> 8);
    /** @type {number} */
    deepDataAndEvents.stackPointer = deepDataAndEvents.stackPointer - 1 & 65535;
    deepDataAndEvents.memoryWriter[deepDataAndEvents.stackPointer](deepDataAndEvents, deepDataAndEvents.stackPointer, deepDataAndEvents.programCounter & 255);
    /** @type {number} */
    deepDataAndEvents.programCounter = 24;
}, function(f) {
    f.memoryHighWrite(f.memoryReader[f.programCounter](f, f.programCounter), f.registerA);
    /** @type {number} */
    f.programCounter = f.programCounter + 1 & 65535;
}, function(deepDataAndEvents) {
    /** @type {number} */
    deepDataAndEvents.registersHL = deepDataAndEvents.memoryRead(deepDataAndEvents.stackPointer + 1 & 65535) << 8 | deepDataAndEvents.memoryReader[deepDataAndEvents.stackPointer](deepDataAndEvents, deepDataAndEvents.stackPointer);
    /** @type {number} */
    deepDataAndEvents.stackPointer = deepDataAndEvents.stackPointer + 2 & 65535;
}, function(deepDataAndEvents) {
    deepDataAndEvents.memoryHighWriter[deepDataAndEvents.registerC](deepDataAndEvents, deepDataAndEvents.registerC, deepDataAndEvents.registerA);
}, function(dataAndEvents) {
    cout("Illegal op code 0xE3 called, pausing emulation.", 2);
    pause();
}, function(dataAndEvents) {
    cout("Illegal op code 0xE4 called, pausing emulation.", 2);
    pause();
}, function(deepDataAndEvents) {
    /** @type {number} */
    deepDataAndEvents.stackPointer = deepDataAndEvents.stackPointer - 1 & 65535;
    deepDataAndEvents.memoryWriter[deepDataAndEvents.stackPointer](deepDataAndEvents, deepDataAndEvents.stackPointer, deepDataAndEvents.registersHL >> 8);
    /** @type {number} */
    deepDataAndEvents.stackPointer = deepDataAndEvents.stackPointer - 1 & 65535;
    deepDataAndEvents.memoryWriter[deepDataAndEvents.stackPointer](deepDataAndEvents, deepDataAndEvents.stackPointer, deepDataAndEvents.registersHL & 255);
}, function(deepDataAndEvents) {
    deepDataAndEvents.registerA &= deepDataAndEvents.memoryReader[deepDataAndEvents.programCounter](deepDataAndEvents, deepDataAndEvents.programCounter);
    /** @type {number} */
    deepDataAndEvents.programCounter = deepDataAndEvents.programCounter + 1 & 65535;
    /** @type {boolean} */
    deepDataAndEvents.FZero = deepDataAndEvents.registerA == 0;
    /** @type {boolean} */
    deepDataAndEvents.FHalfCarry = true;
    /** @type {boolean} */
    deepDataAndEvents.FSubtract = deepDataAndEvents.FCarry = false;
}, function(deepDataAndEvents) {
    /** @type {number} */
    deepDataAndEvents.stackPointer = deepDataAndEvents.stackPointer - 1 & 65535;
    deepDataAndEvents.memoryWriter[deepDataAndEvents.stackPointer](deepDataAndEvents, deepDataAndEvents.stackPointer, deepDataAndEvents.programCounter >> 8);
    /** @type {number} */
    deepDataAndEvents.stackPointer = deepDataAndEvents.stackPointer - 1 & 65535;
    deepDataAndEvents.memoryWriter[deepDataAndEvents.stackPointer](deepDataAndEvents, deepDataAndEvents.stackPointer, deepDataAndEvents.programCounter & 255);
    /** @type {number} */
    deepDataAndEvents.programCounter = 32;
}, function(a) {
    /** @type {number} */
    var from = a.memoryReader[a.programCounter](a, a.programCounter) << 24 >> 24;
    /** @type {number} */
    a.programCounter = a.programCounter + 1 & 65535;
    /** @type {number} */
    var e = a.stackPointer + from & 65535;
    /** @type {number} */
    from = a.stackPointer ^ from ^ e;
    /** @type {number} */
    a.stackPointer = e;
    /** @type {boolean} */
    a.FCarry = (from & 256) == 256;
    /** @type {boolean} */
    a.FHalfCarry = (from & 16) == 16;
    /** @type {boolean} */
    a.FZero = a.FSubtract = false;
}, function(dataAndEvents) {
    dataAndEvents.programCounter = dataAndEvents.registersHL;
}, function(domNode) {
    domNode.memoryWrite(domNode.memoryRead(domNode.programCounter + 1 & 65535) << 8 | domNode.memoryReader[domNode.programCounter](domNode, domNode.programCounter), domNode.registerA);
    /** @type {number} */
    domNode.programCounter = domNode.programCounter + 2 & 65535;
}, function(dataAndEvents) {
    cout("Illegal op code 0xEB called, pausing emulation.", 2);
    pause();
}, function(dataAndEvents) {
    cout("Illegal op code 0xEC called, pausing emulation.", 2);
    pause();
}, function(dataAndEvents) {
    cout("Illegal op code 0xED called, pausing emulation.", 2);
    pause();
}, function(deepDataAndEvents) {
    deepDataAndEvents.registerA ^= deepDataAndEvents.memoryReader[deepDataAndEvents.programCounter](deepDataAndEvents, deepDataAndEvents.programCounter);
    /** @type {number} */
    deepDataAndEvents.programCounter = deepDataAndEvents.programCounter + 1 & 65535;
    /** @type {boolean} */
    deepDataAndEvents.FZero = deepDataAndEvents.registerA == 0;
    /** @type {boolean} */
    deepDataAndEvents.FSubtract = deepDataAndEvents.FHalfCarry = deepDataAndEvents.FCarry = false;
}, function(deepDataAndEvents) {
    /** @type {number} */
    deepDataAndEvents.stackPointer = deepDataAndEvents.stackPointer - 1 & 65535;
    deepDataAndEvents.memoryWriter[deepDataAndEvents.stackPointer](deepDataAndEvents, deepDataAndEvents.stackPointer, deepDataAndEvents.programCounter >> 8);
    /** @type {number} */
    deepDataAndEvents.stackPointer = deepDataAndEvents.stackPointer - 1 & 65535;
    deepDataAndEvents.memoryWriter[deepDataAndEvents.stackPointer](deepDataAndEvents, deepDataAndEvents.stackPointer, deepDataAndEvents.programCounter & 255);
    /** @type {number} */
    deepDataAndEvents.programCounter = 40;
}, function(elm) {
    elm.registerA = elm.memoryHighRead(elm.memoryReader[elm.programCounter](elm, elm.programCounter));
    /** @type {number} */
    elm.programCounter = elm.programCounter + 1 & 65535;
}, function(data) {
    var newState = data.memoryReader[data.stackPointer](data, data.stackPointer);
    /** @type {boolean} */
    data.FZero = newState > 127;
    /** @type {boolean} */
    data.FSubtract = (newState & 64) == 64;
    /** @type {boolean} */
    data.FHalfCarry = (newState & 32) == 32;
    /** @type {boolean} */
    data.FCarry = (newState & 16) == 16;
    data.registerA = data.memoryRead(data.stackPointer + 1 & 65535);
    /** @type {number} */
    data.stackPointer = data.stackPointer + 2 & 65535;
}, function(d) {
    d.registerA = d.memoryHighReader[d.registerC](d, d.registerC);
}, function(dataAndEvents) {
    /** @type {boolean} */
    dataAndEvents.IME = false;
    /** @type {number} */
    dataAndEvents.IRQEnableDelay = 0;
}, function(dataAndEvents) {
    cout("Illegal op code 0xF4 called, pausing emulation.", 2);
    pause();
}, function(deepDataAndEvents) {
    /** @type {number} */
    deepDataAndEvents.stackPointer = deepDataAndEvents.stackPointer - 1 & 65535;
    deepDataAndEvents.memoryWriter[deepDataAndEvents.stackPointer](deepDataAndEvents, deepDataAndEvents.stackPointer, deepDataAndEvents.registerA);
    /** @type {number} */
    deepDataAndEvents.stackPointer = deepDataAndEvents.stackPointer - 1 & 65535;
    deepDataAndEvents.memoryWriter[deepDataAndEvents.stackPointer](deepDataAndEvents, deepDataAndEvents.stackPointer, (deepDataAndEvents.FZero ? 128 : 0) | (deepDataAndEvents.FSubtract ? 64 : 0) | (deepDataAndEvents.FHalfCarry ? 32 : 0) | (deepDataAndEvents.FCarry ? 16 : 0));
}, function(deepDataAndEvents) {
    deepDataAndEvents.registerA |= deepDataAndEvents.memoryReader[deepDataAndEvents.programCounter](deepDataAndEvents, deepDataAndEvents.programCounter);
    /** @type {boolean} */
    deepDataAndEvents.FZero = deepDataAndEvents.registerA == 0;
    /** @type {number} */
    deepDataAndEvents.programCounter = deepDataAndEvents.programCounter + 1 & 65535;
    /** @type {boolean} */
    deepDataAndEvents.FSubtract = deepDataAndEvents.FCarry = deepDataAndEvents.FHalfCarry = false;
}, function(deepDataAndEvents) {
    /** @type {number} */
    deepDataAndEvents.stackPointer = deepDataAndEvents.stackPointer - 1 & 65535;
    deepDataAndEvents.memoryWriter[deepDataAndEvents.stackPointer](deepDataAndEvents, deepDataAndEvents.stackPointer, deepDataAndEvents.programCounter >> 8);
    /** @type {number} */
    deepDataAndEvents.stackPointer = deepDataAndEvents.stackPointer - 1 & 65535;
    deepDataAndEvents.memoryWriter[deepDataAndEvents.stackPointer](deepDataAndEvents, deepDataAndEvents.stackPointer, deepDataAndEvents.programCounter & 255);
    /** @type {number} */
    deepDataAndEvents.programCounter = 48;
}, function(data) {
    /** @type {number} */
    var px = data.memoryReader[data.programCounter](data, data.programCounter) << 24 >> 24;
    /** @type {number} */
    data.programCounter = data.programCounter + 1 & 65535;
    /** @type {number} */
    data.registersHL = data.stackPointer + px & 65535;
    /** @type {number} */
    px = data.stackPointer ^ px ^ data.registersHL;
    /** @type {boolean} */
    data.FCarry = (px & 256) == 256;
    /** @type {boolean} */
    data.FHalfCarry = (px & 16) == 16;
    /** @type {boolean} */
    data.FZero = data.FSubtract = false;
}, function(dataAndEvents) {
    dataAndEvents.stackPointer = dataAndEvents.registersHL;
}, function(deepDataAndEvents) {
    deepDataAndEvents.registerA = deepDataAndEvents.memoryRead(deepDataAndEvents.memoryRead(deepDataAndEvents.programCounter + 1 & 65535) << 8 | deepDataAndEvents.memoryReader[deepDataAndEvents.programCounter](deepDataAndEvents, deepDataAndEvents.programCounter));
    /** @type {number} */
    deepDataAndEvents.programCounter = deepDataAndEvents.programCounter + 2 & 65535;
}, function(deepDataAndEvents) {
    /** @type {number} */
    deepDataAndEvents.IRQEnableDelay = deepDataAndEvents.IRQEnableDelay == 2 || deepDataAndEvents.memoryReader[deepDataAndEvents.programCounter](deepDataAndEvents, deepDataAndEvents.programCounter) == 118 ? 1 : 2;
}, function(dataAndEvents) {
    cout("Illegal op code 0xFC called, pausing emulation.", 2);
    pause();
}, function(dataAndEvents) {
    cout("Illegal op code 0xFD called, pausing emulation.", 2);
    pause();
}, function(bench) {
    /** @type {number} */
    var clocked = bench.registerA - bench.memoryReader[bench.programCounter](bench, bench.programCounter);
    /** @type {number} */
    bench.programCounter = bench.programCounter + 1 & 65535;
    /** @type {boolean} */
    bench.FHalfCarry = (clocked & 15) > (bench.registerA & 15);
    /** @type {boolean} */
    bench.FCarry = clocked < 0;
    /** @type {boolean} */
    bench.FZero = clocked == 0;
    /** @type {boolean} */
    bench.FSubtract = true;
}, function(deepDataAndEvents) {
    /** @type {number} */
    deepDataAndEvents.stackPointer = deepDataAndEvents.stackPointer - 1 & 65535;
    deepDataAndEvents.memoryWriter[deepDataAndEvents.stackPointer](deepDataAndEvents, deepDataAndEvents.stackPointer, deepDataAndEvents.programCounter >> 8);
    /** @type {number} */
    deepDataAndEvents.stackPointer = deepDataAndEvents.stackPointer - 1 & 65535;
    deepDataAndEvents.memoryWriter[deepDataAndEvents.stackPointer](deepDataAndEvents, deepDataAndEvents.stackPointer, deepDataAndEvents.programCounter & 255);
    /** @type {number} */
    deepDataAndEvents.programCounter = 56;
}];
/** @type {Array} */
GameBoyCore.prototype.CBOPCODE = [function(dataAndEvents) {
    /** @type {boolean} */
    dataAndEvents.FCarry = dataAndEvents.registerB > 127;
    /** @type {number} */
    dataAndEvents.registerB = dataAndEvents.registerB << 1 & 255 | (dataAndEvents.FCarry ? 1 : 0);
    /** @type {boolean} */
    dataAndEvents.FHalfCarry = dataAndEvents.FSubtract = false;
    /** @type {boolean} */
    dataAndEvents.FZero = dataAndEvents.registerB == 0;
}, function(dataAndEvents) {
    /** @type {boolean} */
    dataAndEvents.FCarry = dataAndEvents.registerC > 127;
    /** @type {number} */
    dataAndEvents.registerC = dataAndEvents.registerC << 1 & 255 | (dataAndEvents.FCarry ? 1 : 0);
    /** @type {boolean} */
    dataAndEvents.FHalfCarry = dataAndEvents.FSubtract = false;
    /** @type {boolean} */
    dataAndEvents.FZero = dataAndEvents.registerC == 0;
}, function(dataAndEvents) {
    /** @type {boolean} */
    dataAndEvents.FCarry = dataAndEvents.registerD > 127;
    /** @type {number} */
    dataAndEvents.registerD = dataAndEvents.registerD << 1 & 255 | (dataAndEvents.FCarry ? 1 : 0);
    /** @type {boolean} */
    dataAndEvents.FHalfCarry = dataAndEvents.FSubtract = false;
    /** @type {boolean} */
    dataAndEvents.FZero = dataAndEvents.registerD == 0;
}, function(dataAndEvents) {
    /** @type {boolean} */
    dataAndEvents.FCarry = dataAndEvents.registerE > 127;
    /** @type {number} */
    dataAndEvents.registerE = dataAndEvents.registerE << 1 & 255 | (dataAndEvents.FCarry ? 1 : 0);
    /** @type {boolean} */
    dataAndEvents.FHalfCarry = dataAndEvents.FSubtract = false;
    /** @type {boolean} */
    dataAndEvents.FZero = dataAndEvents.registerE == 0;
}, function(dataAndEvents) {
    /** @type {boolean} */
    dataAndEvents.FCarry = dataAndEvents.registersHL > 32767;
    /** @type {number} */
    dataAndEvents.registersHL = dataAndEvents.registersHL << 1 & 65024 | (dataAndEvents.FCarry ? 256 : 0) | dataAndEvents.registersHL & 255;
    /** @type {boolean} */
    dataAndEvents.FHalfCarry = dataAndEvents.FSubtract = false;
    /** @type {boolean} */
    dataAndEvents.FZero = dataAndEvents.registersHL < 256;
}, function(dataAndEvents) {
    /** @type {boolean} */
    dataAndEvents.FCarry = (dataAndEvents.registersHL & 128) == 128;
    /** @type {number} */
    dataAndEvents.registersHL = dataAndEvents.registersHL & 65280 | dataAndEvents.registersHL << 1 & 255 | (dataAndEvents.FCarry ? 1 : 0);
    /** @type {boolean} */
    dataAndEvents.FHalfCarry = dataAndEvents.FSubtract = false;
    /** @type {boolean} */
    dataAndEvents.FZero = (dataAndEvents.registersHL & 255) == 0;
}, function(state) {
    var ch = state.memoryReader[state.registersHL](state, state.registersHL);
    /** @type {boolean} */
    state.FCarry = ch > 127;
    /** @type {number} */
    ch = ch << 1 & 255 | (state.FCarry ? 1 : 0);
    state.memoryWriter[state.registersHL](state, state.registersHL, ch);
    /** @type {boolean} */
    state.FHalfCarry = state.FSubtract = false;
    /** @type {boolean} */
    state.FZero = ch == 0;
}, function(dataAndEvents) {
    /** @type {boolean} */
    dataAndEvents.FCarry = dataAndEvents.registerA > 127;
    /** @type {number} */
    dataAndEvents.registerA = dataAndEvents.registerA << 1 & 255 | (dataAndEvents.FCarry ? 1 : 0);
    /** @type {boolean} */
    dataAndEvents.FHalfCarry = dataAndEvents.FSubtract = false;
    /** @type {boolean} */
    dataAndEvents.FZero = dataAndEvents.registerA == 0;
}, function(dataAndEvents) {
    /** @type {boolean} */
    dataAndEvents.FCarry = (dataAndEvents.registerB & 1) == 1;
    /** @type {number} */
    dataAndEvents.registerB = (dataAndEvents.FCarry ? 128 : 0) | dataAndEvents.registerB >> 1;
    /** @type {boolean} */
    dataAndEvents.FHalfCarry = dataAndEvents.FSubtract = false;
    /** @type {boolean} */
    dataAndEvents.FZero = dataAndEvents.registerB == 0;
}, function(dataAndEvents) {
    /** @type {boolean} */
    dataAndEvents.FCarry = (dataAndEvents.registerC & 1) == 1;
    /** @type {number} */
    dataAndEvents.registerC = (dataAndEvents.FCarry ? 128 : 0) | dataAndEvents.registerC >> 1;
    /** @type {boolean} */
    dataAndEvents.FHalfCarry = dataAndEvents.FSubtract = false;
    /** @type {boolean} */
    dataAndEvents.FZero = dataAndEvents.registerC == 0;
}, function(dataAndEvents) {
    /** @type {boolean} */
    dataAndEvents.FCarry = (dataAndEvents.registerD & 1) == 1;
    /** @type {number} */
    dataAndEvents.registerD = (dataAndEvents.FCarry ? 128 : 0) | dataAndEvents.registerD >> 1;
    /** @type {boolean} */
    dataAndEvents.FHalfCarry = dataAndEvents.FSubtract = false;
    /** @type {boolean} */
    dataAndEvents.FZero = dataAndEvents.registerD == 0;
}, function(dataAndEvents) {
    /** @type {boolean} */
    dataAndEvents.FCarry = (dataAndEvents.registerE & 1) == 1;
    /** @type {number} */
    dataAndEvents.registerE = (dataAndEvents.FCarry ? 128 : 0) | dataAndEvents.registerE >> 1;
    /** @type {boolean} */
    dataAndEvents.FHalfCarry = dataAndEvents.FSubtract = false;
    /** @type {boolean} */
    dataAndEvents.FZero = dataAndEvents.registerE == 0;
}, function(dataAndEvents) {
    /** @type {boolean} */
    dataAndEvents.FCarry = (dataAndEvents.registersHL & 256) == 256;
    /** @type {number} */
    dataAndEvents.registersHL = (dataAndEvents.FCarry ? 32768 : 0) | dataAndEvents.registersHL >> 1 & 65280 | dataAndEvents.registersHL & 255;
    /** @type {boolean} */
    dataAndEvents.FHalfCarry = dataAndEvents.FSubtract = false;
    /** @type {boolean} */
    dataAndEvents.FZero = dataAndEvents.registersHL < 256;
}, function(dataAndEvents) {
    /** @type {boolean} */
    dataAndEvents.FCarry = (dataAndEvents.registersHL & 1) == 1;
    /** @type {number} */
    dataAndEvents.registersHL = dataAndEvents.registersHL & 65280 | (dataAndEvents.FCarry ? 128 : 0) | (dataAndEvents.registersHL & 255) >> 1;
    /** @type {boolean} */
    dataAndEvents.FHalfCarry = dataAndEvents.FSubtract = false;
    /** @type {boolean} */
    dataAndEvents.FZero = (dataAndEvents.registersHL & 255) == 0;
}, function(element) {
    var elementRect = element.memoryReader[element.registersHL](element, element.registersHL);
    /** @type {boolean} */
    element.FCarry = (elementRect & 1) == 1;
    /** @type {number} */
    elementRect = (element.FCarry ? 128 : 0) | elementRect >> 1;
    element.memoryWriter[element.registersHL](element, element.registersHL, elementRect);
    /** @type {boolean} */
    element.FHalfCarry = element.FSubtract = false;
    /** @type {boolean} */
    element.FZero = elementRect == 0;
}, function(dataAndEvents) {
    /** @type {boolean} */
    dataAndEvents.FCarry = (dataAndEvents.registerA & 1) == 1;
    /** @type {number} */
    dataAndEvents.registerA = (dataAndEvents.FCarry ? 128 : 0) | dataAndEvents.registerA >> 1;
    /** @type {boolean} */
    dataAndEvents.FHalfCarry = dataAndEvents.FSubtract = false;
    /** @type {boolean} */
    dataAndEvents.FZero = dataAndEvents.registerA == 0;
}, function(eventHandle) {
    /** @type {boolean} */
    var elem = eventHandle.registerB > 127;
    /** @type {number} */
    eventHandle.registerB = eventHandle.registerB << 1 & 255 | (eventHandle.FCarry ? 1 : 0);
    /** @type {boolean} */
    eventHandle.FCarry = elem;
    /** @type {boolean} */
    eventHandle.FHalfCarry = eventHandle.FSubtract = false;
    /** @type {boolean} */
    eventHandle.FZero = eventHandle.registerB == 0;
}, function(eventHandle) {
    /** @type {boolean} */
    var elem = eventHandle.registerC > 127;
    /** @type {number} */
    eventHandle.registerC = eventHandle.registerC << 1 & 255 | (eventHandle.FCarry ? 1 : 0);
    /** @type {boolean} */
    eventHandle.FCarry = elem;
    /** @type {boolean} */
    eventHandle.FHalfCarry = eventHandle.FSubtract = false;
    /** @type {boolean} */
    eventHandle.FZero = eventHandle.registerC == 0;
}, function(eventHandle) {
    /** @type {boolean} */
    var elem = eventHandle.registerD > 127;
    /** @type {number} */
    eventHandle.registerD = eventHandle.registerD << 1 & 255 | (eventHandle.FCarry ? 1 : 0);
    /** @type {boolean} */
    eventHandle.FCarry = elem;
    /** @type {boolean} */
    eventHandle.FHalfCarry = eventHandle.FSubtract = false;
    /** @type {boolean} */
    eventHandle.FZero = eventHandle.registerD == 0;
}, function(eventHandle) {
    /** @type {boolean} */
    var elem = eventHandle.registerE > 127;
    /** @type {number} */
    eventHandle.registerE = eventHandle.registerE << 1 & 255 | (eventHandle.FCarry ? 1 : 0);
    /** @type {boolean} */
    eventHandle.FCarry = elem;
    /** @type {boolean} */
    eventHandle.FHalfCarry = eventHandle.FSubtract = false;
    /** @type {boolean} */
    eventHandle.FZero = eventHandle.registerE == 0;
}, function(eventHandle) {
    /** @type {boolean} */
    var elem = eventHandle.registersHL > 32767;
    /** @type {number} */
    eventHandle.registersHL = eventHandle.registersHL << 1 & 65024 | (eventHandle.FCarry ? 256 : 0) | eventHandle.registersHL & 255;
    /** @type {boolean} */
    eventHandle.FCarry = elem;
    /** @type {boolean} */
    eventHandle.FHalfCarry = eventHandle.FSubtract = false;
    /** @type {boolean} */
    eventHandle.FZero = eventHandle.registersHL < 256;
}, function(eventHandle) {
    /** @type {boolean} */
    var elem = (eventHandle.registersHL & 128) == 128;
    /** @type {number} */
    eventHandle.registersHL = eventHandle.registersHL & 65280 | eventHandle.registersHL << 1 & 255 | (eventHandle.FCarry ? 1 : 0);
    /** @type {boolean} */
    eventHandle.FCarry = elem;
    /** @type {boolean} */
    eventHandle.FHalfCarry = eventHandle.FSubtract = false;
    /** @type {boolean} */
    eventHandle.FZero = (eventHandle.registersHL & 255) == 0;
}, function(element) {
    var elementRect = element.memoryReader[element.registersHL](element, element.registersHL);
    /** @type {boolean} */
    var className = elementRect > 127;
    /** @type {number} */
    elementRect = elementRect << 1 & 255 | (element.FCarry ? 1 : 0);
    /** @type {boolean} */
    element.FCarry = className;
    element.memoryWriter[element.registersHL](element, element.registersHL, elementRect);
    /** @type {boolean} */
    element.FHalfCarry = element.FSubtract = false;
    /** @type {boolean} */
    element.FZero = elementRect == 0;
}, function(eventHandle) {
    /** @type {boolean} */
    var elem = eventHandle.registerA > 127;
    /** @type {number} */
    eventHandle.registerA = eventHandle.registerA << 1 & 255 | (eventHandle.FCarry ? 1 : 0);
    /** @type {boolean} */
    eventHandle.FCarry = elem;
    /** @type {boolean} */
    eventHandle.FHalfCarry = eventHandle.FSubtract = false;
    /** @type {boolean} */
    eventHandle.FZero = eventHandle.registerA == 0;
}, function(eventHandle) {
    /** @type {boolean} */
    var elem = (eventHandle.registerB & 1) == 1;
    /** @type {number} */
    eventHandle.registerB = (eventHandle.FCarry ? 128 : 0) | eventHandle.registerB >> 1;
    /** @type {boolean} */
    eventHandle.FCarry = elem;
    /** @type {boolean} */
    eventHandle.FHalfCarry = eventHandle.FSubtract = false;
    /** @type {boolean} */
    eventHandle.FZero = eventHandle.registerB == 0;
}, function(eventHandle) {
    /** @type {boolean} */
    var elem = (eventHandle.registerC & 1) == 1;
    /** @type {number} */
    eventHandle.registerC = (eventHandle.FCarry ? 128 : 0) | eventHandle.registerC >> 1;
    /** @type {boolean} */
    eventHandle.FCarry = elem;
    /** @type {boolean} */
    eventHandle.FHalfCarry = eventHandle.FSubtract = false;
    /** @type {boolean} */
    eventHandle.FZero = eventHandle.registerC == 0;
}, function(eventHandle) {
    /** @type {boolean} */
    var elem = (eventHandle.registerD & 1) == 1;
    /** @type {number} */
    eventHandle.registerD = (eventHandle.FCarry ? 128 : 0) | eventHandle.registerD >> 1;
    /** @type {boolean} */
    eventHandle.FCarry = elem;
    /** @type {boolean} */
    eventHandle.FHalfCarry = eventHandle.FSubtract = false;
    /** @type {boolean} */
    eventHandle.FZero = eventHandle.registerD == 0;
}, function(eventHandle) {
    /** @type {boolean} */
    var elem = (eventHandle.registerE & 1) == 1;
    /** @type {number} */
    eventHandle.registerE = (eventHandle.FCarry ? 128 : 0) | eventHandle.registerE >> 1;
    /** @type {boolean} */
    eventHandle.FCarry = elem;
    /** @type {boolean} */
    eventHandle.FHalfCarry = eventHandle.FSubtract = false;
    /** @type {boolean} */
    eventHandle.FZero = eventHandle.registerE == 0;
}, function(eventHandle) {
    /** @type {boolean} */
    var elem = (eventHandle.registersHL & 256) == 256;
    /** @type {number} */
    eventHandle.registersHL = (eventHandle.FCarry ? 32768 : 0) | eventHandle.registersHL >> 1 & 65280 | eventHandle.registersHL & 255;
    /** @type {boolean} */
    eventHandle.FCarry = elem;
    /** @type {boolean} */
    eventHandle.FHalfCarry = eventHandle.FSubtract = false;
    /** @type {boolean} */
    eventHandle.FZero = eventHandle.registersHL < 256;
}, function(eventHandle) {
    /** @type {boolean} */
    var elem = (eventHandle.registersHL & 1) == 1;
    /** @type {number} */
    eventHandle.registersHL = eventHandle.registersHL & 65280 | (eventHandle.FCarry ? 128 : 0) | (eventHandle.registersHL & 255) >> 1;
    /** @type {boolean} */
    eventHandle.FCarry = elem;
    /** @type {boolean} */
    eventHandle.FHalfCarry = eventHandle.FSubtract = false;
    /** @type {boolean} */
    eventHandle.FZero = (eventHandle.registersHL & 255) == 0;
}, function(element) {
    var elementRect = element.memoryReader[element.registersHL](element, element.registersHL);
    /** @type {boolean} */
    var className = (elementRect & 1) == 1;
    /** @type {number} */
    elementRect = (element.FCarry ? 128 : 0) | elementRect >> 1;
    /** @type {boolean} */
    element.FCarry = className;
    element.memoryWriter[element.registersHL](element, element.registersHL, elementRect);
    /** @type {boolean} */
    element.FHalfCarry = element.FSubtract = false;
    /** @type {boolean} */
    element.FZero = elementRect == 0;
}, function(eventHandle) {
    /** @type {boolean} */
    var elem = (eventHandle.registerA & 1) == 1;
    /** @type {number} */
    eventHandle.registerA = (eventHandle.FCarry ? 128 : 0) | eventHandle.registerA >> 1;
    /** @type {boolean} */
    eventHandle.FCarry = elem;
    /** @type {boolean} */
    eventHandle.FHalfCarry = eventHandle.FSubtract = false;
    /** @type {boolean} */
    eventHandle.FZero = eventHandle.registerA == 0;
}, function(dataAndEvents) {
    /** @type {boolean} */
    dataAndEvents.FCarry = dataAndEvents.registerB > 127;
    /** @type {number} */
    dataAndEvents.registerB = dataAndEvents.registerB << 1 & 255;
    /** @type {boolean} */
    dataAndEvents.FHalfCarry = dataAndEvents.FSubtract = false;
    /** @type {boolean} */
    dataAndEvents.FZero = dataAndEvents.registerB == 0;
}, function(dataAndEvents) {
    /** @type {boolean} */
    dataAndEvents.FCarry = dataAndEvents.registerC > 127;
    /** @type {number} */
    dataAndEvents.registerC = dataAndEvents.registerC << 1 & 255;
    /** @type {boolean} */
    dataAndEvents.FHalfCarry = dataAndEvents.FSubtract = false;
    /** @type {boolean} */
    dataAndEvents.FZero = dataAndEvents.registerC == 0;
}, function(dataAndEvents) {
    /** @type {boolean} */
    dataAndEvents.FCarry = dataAndEvents.registerD > 127;
    /** @type {number} */
    dataAndEvents.registerD = dataAndEvents.registerD << 1 & 255;
    /** @type {boolean} */
    dataAndEvents.FHalfCarry = dataAndEvents.FSubtract = false;
    /** @type {boolean} */
    dataAndEvents.FZero = dataAndEvents.registerD == 0;
}, function(dataAndEvents) {
    /** @type {boolean} */
    dataAndEvents.FCarry = dataAndEvents.registerE > 127;
    /** @type {number} */
    dataAndEvents.registerE = dataAndEvents.registerE << 1 & 255;
    /** @type {boolean} */
    dataAndEvents.FHalfCarry = dataAndEvents.FSubtract = false;
    /** @type {boolean} */
    dataAndEvents.FZero = dataAndEvents.registerE == 0;
}, function(dataAndEvents) {
    /** @type {boolean} */
    dataAndEvents.FCarry = dataAndEvents.registersHL > 32767;
    /** @type {number} */
    dataAndEvents.registersHL = dataAndEvents.registersHL << 1 & 65024 | dataAndEvents.registersHL & 255;
    /** @type {boolean} */
    dataAndEvents.FHalfCarry = dataAndEvents.FSubtract = false;
    /** @type {boolean} */
    dataAndEvents.FZero = dataAndEvents.registersHL < 256;
}, function(dataAndEvents) {
    /** @type {boolean} */
    dataAndEvents.FCarry = (dataAndEvents.registersHL & 128) == 128;
    /** @type {number} */
    dataAndEvents.registersHL = dataAndEvents.registersHL & 65280 | dataAndEvents.registersHL << 1 & 255;
    /** @type {boolean} */
    dataAndEvents.FHalfCarry = dataAndEvents.FSubtract = false;
    /** @type {boolean} */
    dataAndEvents.FZero = (dataAndEvents.registersHL & 255) == 0;
}, function(state) {
    var ch = state.memoryReader[state.registersHL](state, state.registersHL);
    /** @type {boolean} */
    state.FCarry = ch > 127;
    /** @type {number} */
    ch = ch << 1 & 255;
    state.memoryWriter[state.registersHL](state, state.registersHL, ch);
    /** @type {boolean} */
    state.FHalfCarry = state.FSubtract = false;
    /** @type {boolean} */
    state.FZero = ch == 0;
}, function(dataAndEvents) {
    /** @type {boolean} */
    dataAndEvents.FCarry = dataAndEvents.registerA > 127;
    /** @type {number} */
    dataAndEvents.registerA = dataAndEvents.registerA << 1 & 255;
    /** @type {boolean} */
    dataAndEvents.FHalfCarry = dataAndEvents.FSubtract = false;
    /** @type {boolean} */
    dataAndEvents.FZero = dataAndEvents.registerA == 0;
}, function(dataAndEvents) {
    /** @type {boolean} */
    dataAndEvents.FCarry = (dataAndEvents.registerB & 1) == 1;
    /** @type {number} */
    dataAndEvents.registerB = dataAndEvents.registerB & 128 | dataAndEvents.registerB >> 1;
    /** @type {boolean} */
    dataAndEvents.FHalfCarry = dataAndEvents.FSubtract = false;
    /** @type {boolean} */
    dataAndEvents.FZero = dataAndEvents.registerB == 0;
}, function(dataAndEvents) {
    /** @type {boolean} */
    dataAndEvents.FCarry = (dataAndEvents.registerC & 1) == 1;
    /** @type {number} */
    dataAndEvents.registerC = dataAndEvents.registerC & 128 | dataAndEvents.registerC >> 1;
    /** @type {boolean} */
    dataAndEvents.FHalfCarry = dataAndEvents.FSubtract = false;
    /** @type {boolean} */
    dataAndEvents.FZero = dataAndEvents.registerC == 0;
}, function(dataAndEvents) {
    /** @type {boolean} */
    dataAndEvents.FCarry = (dataAndEvents.registerD & 1) == 1;
    /** @type {number} */
    dataAndEvents.registerD = dataAndEvents.registerD & 128 | dataAndEvents.registerD >> 1;
    /** @type {boolean} */
    dataAndEvents.FHalfCarry = dataAndEvents.FSubtract = false;
    /** @type {boolean} */
    dataAndEvents.FZero = dataAndEvents.registerD == 0;
}, function(dataAndEvents) {
    /** @type {boolean} */
    dataAndEvents.FCarry = (dataAndEvents.registerE & 1) == 1;
    /** @type {number} */
    dataAndEvents.registerE = dataAndEvents.registerE & 128 | dataAndEvents.registerE >> 1;
    /** @type {boolean} */
    dataAndEvents.FHalfCarry = dataAndEvents.FSubtract = false;
    /** @type {boolean} */
    dataAndEvents.FZero = dataAndEvents.registerE == 0;
}, function(dataAndEvents) {
    /** @type {boolean} */
    dataAndEvents.FCarry = (dataAndEvents.registersHL & 256) == 256;
    /** @type {number} */
    dataAndEvents.registersHL = dataAndEvents.registersHL >> 1 & 65280 | dataAndEvents.registersHL & 33023;
    /** @type {boolean} */
    dataAndEvents.FHalfCarry = dataAndEvents.FSubtract = false;
    /** @type {boolean} */
    dataAndEvents.FZero = dataAndEvents.registersHL < 256;
}, function(dataAndEvents) {
    /** @type {boolean} */
    dataAndEvents.FCarry = (dataAndEvents.registersHL & 1) == 1;
    /** @type {number} */
    dataAndEvents.registersHL = dataAndEvents.registersHL & 65408 | (dataAndEvents.registersHL & 255) >> 1;
    /** @type {boolean} */
    dataAndEvents.FHalfCarry = dataAndEvents.FSubtract = false;
    /** @type {boolean} */
    dataAndEvents.FZero = (dataAndEvents.registersHL & 255) == 0;
}, function(state) {
    var ch = state.memoryReader[state.registersHL](state, state.registersHL);
    /** @type {boolean} */
    state.FCarry = (ch & 1) == 1;
    /** @type {number} */
    ch = ch & 128 | ch >> 1;
    state.memoryWriter[state.registersHL](state, state.registersHL, ch);
    /** @type {boolean} */
    state.FHalfCarry = state.FSubtract = false;
    /** @type {boolean} */
    state.FZero = ch == 0;
}, function(dataAndEvents) {
    /** @type {boolean} */
    dataAndEvents.FCarry = (dataAndEvents.registerA & 1) == 1;
    /** @type {number} */
    dataAndEvents.registerA = dataAndEvents.registerA & 128 | dataAndEvents.registerA >> 1;
    /** @type {boolean} */
    dataAndEvents.FHalfCarry = dataAndEvents.FSubtract = false;
    /** @type {boolean} */
    dataAndEvents.FZero = dataAndEvents.registerA == 0;
}, function(dataAndEvents) {
    /** @type {number} */
    dataAndEvents.registerB = (dataAndEvents.registerB & 15) << 4 | dataAndEvents.registerB >> 4;
    /** @type {boolean} */
    dataAndEvents.FZero = dataAndEvents.registerB == 0;
    /** @type {boolean} */
    dataAndEvents.FCarry = dataAndEvents.FHalfCarry = dataAndEvents.FSubtract = false;
}, function(dataAndEvents) {
    /** @type {number} */
    dataAndEvents.registerC = (dataAndEvents.registerC & 15) << 4 | dataAndEvents.registerC >> 4;
    /** @type {boolean} */
    dataAndEvents.FZero = dataAndEvents.registerC == 0;
    /** @type {boolean} */
    dataAndEvents.FCarry = dataAndEvents.FHalfCarry = dataAndEvents.FSubtract = false;
}, function(dataAndEvents) {
    /** @type {number} */
    dataAndEvents.registerD = (dataAndEvents.registerD & 15) << 4 | dataAndEvents.registerD >> 4;
    /** @type {boolean} */
    dataAndEvents.FZero = dataAndEvents.registerD == 0;
    /** @type {boolean} */
    dataAndEvents.FCarry = dataAndEvents.FHalfCarry = dataAndEvents.FSubtract = false;
}, function(dataAndEvents) {
    /** @type {number} */
    dataAndEvents.registerE = (dataAndEvents.registerE & 15) << 4 | dataAndEvents.registerE >> 4;
    /** @type {boolean} */
    dataAndEvents.FZero = dataAndEvents.registerE == 0;
    /** @type {boolean} */
    dataAndEvents.FCarry = dataAndEvents.FHalfCarry = dataAndEvents.FSubtract = false;
}, function(dataAndEvents) {
    /** @type {number} */
    dataAndEvents.registersHL = (dataAndEvents.registersHL & 3840) << 4 | (dataAndEvents.registersHL & 61440) >> 4 | dataAndEvents.registersHL & 255;
    /** @type {boolean} */
    dataAndEvents.FZero = dataAndEvents.registersHL < 256;
    /** @type {boolean} */
    dataAndEvents.FCarry = dataAndEvents.FHalfCarry = dataAndEvents.FSubtract = false;
}, function(dataAndEvents) {
    /** @type {number} */
    dataAndEvents.registersHL = dataAndEvents.registersHL & 65280 | (dataAndEvents.registersHL & 15) << 4 | (dataAndEvents.registersHL & 240) >> 4;
    /** @type {boolean} */
    dataAndEvents.FZero = (dataAndEvents.registersHL & 255) == 0;
    /** @type {boolean} */
    dataAndEvents.FCarry = dataAndEvents.FHalfCarry = dataAndEvents.FSubtract = false;
}, function(state) {
    var ch = state.memoryReader[state.registersHL](state, state.registersHL);
    /** @type {number} */
    ch = (ch & 15) << 4 | ch >> 4;
    state.memoryWriter[state.registersHL](state, state.registersHL, ch);
    /** @type {boolean} */
    state.FZero = ch == 0;
    /** @type {boolean} */
    state.FCarry = state.FHalfCarry = state.FSubtract = false;
}, function(dataAndEvents) {
    /** @type {number} */
    dataAndEvents.registerA = (dataAndEvents.registerA & 15) << 4 | dataAndEvents.registerA >> 4;
    /** @type {boolean} */
    dataAndEvents.FZero = dataAndEvents.registerA == 0;
    /** @type {boolean} */
    dataAndEvents.FCarry = dataAndEvents.FHalfCarry = dataAndEvents.FSubtract = false;
}, function(dataAndEvents) {
    /** @type {boolean} */
    dataAndEvents.FCarry = (dataAndEvents.registerB & 1) == 1;
    dataAndEvents.registerB >>= 1;
    /** @type {boolean} */
    dataAndEvents.FHalfCarry = dataAndEvents.FSubtract = false;
    /** @type {boolean} */
    dataAndEvents.FZero = dataAndEvents.registerB == 0;
}, function(dataAndEvents) {
    /** @type {boolean} */
    dataAndEvents.FCarry = (dataAndEvents.registerC & 1) == 1;
    dataAndEvents.registerC >>= 1;
    /** @type {boolean} */
    dataAndEvents.FHalfCarry = dataAndEvents.FSubtract = false;
    /** @type {boolean} */
    dataAndEvents.FZero = dataAndEvents.registerC == 0;
}, function(dataAndEvents) {
    /** @type {boolean} */
    dataAndEvents.FCarry = (dataAndEvents.registerD & 1) == 1;
    dataAndEvents.registerD >>= 1;
    /** @type {boolean} */
    dataAndEvents.FHalfCarry = dataAndEvents.FSubtract = false;
    /** @type {boolean} */
    dataAndEvents.FZero = dataAndEvents.registerD == 0;
}, function(dataAndEvents) {
    /** @type {boolean} */
    dataAndEvents.FCarry = (dataAndEvents.registerE & 1) == 1;
    dataAndEvents.registerE >>= 1;
    /** @type {boolean} */
    dataAndEvents.FHalfCarry = dataAndEvents.FSubtract = false;
    /** @type {boolean} */
    dataAndEvents.FZero = dataAndEvents.registerE == 0;
}, function(dataAndEvents) {
    /** @type {boolean} */
    dataAndEvents.FCarry = (dataAndEvents.registersHL & 256) == 256;
    /** @type {number} */
    dataAndEvents.registersHL = dataAndEvents.registersHL >> 1 & 65280 | dataAndEvents.registersHL & 255;
    /** @type {boolean} */
    dataAndEvents.FHalfCarry = dataAndEvents.FSubtract = false;
    /** @type {boolean} */
    dataAndEvents.FZero = dataAndEvents.registersHL < 256;
}, function(dataAndEvents) {
    /** @type {boolean} */
    dataAndEvents.FCarry = (dataAndEvents.registersHL & 1) == 1;
    /** @type {number} */
    dataAndEvents.registersHL = dataAndEvents.registersHL & 65280 | (dataAndEvents.registersHL & 255) >> 1;
    /** @type {boolean} */
    dataAndEvents.FHalfCarry = dataAndEvents.FSubtract = false;
    /** @type {boolean} */
    dataAndEvents.FZero = (dataAndEvents.registersHL & 255) == 0;
}, function(data) {
    var d = data.memoryReader[data.registersHL](data, data.registersHL);
    /** @type {boolean} */
    data.FCarry = (d & 1) == 1;
    data.memoryWriter[data.registersHL](data, data.registersHL, d >> 1);
    /** @type {boolean} */
    data.FHalfCarry = data.FSubtract = false;
    /** @type {boolean} */
    data.FZero = d < 2;
}, function(dataAndEvents) {
    /** @type {boolean} */
    dataAndEvents.FCarry = (dataAndEvents.registerA & 1) == 1;
    dataAndEvents.registerA >>= 1;
    /** @type {boolean} */
    dataAndEvents.FHalfCarry = dataAndEvents.FSubtract = false;
    /** @type {boolean} */
    dataAndEvents.FZero = dataAndEvents.registerA == 0;
}, function(dataAndEvents) {
    /** @type {boolean} */
    dataAndEvents.FHalfCarry = true;
    /** @type {boolean} */
    dataAndEvents.FSubtract = false;
    /** @type {boolean} */
    dataAndEvents.FZero = (dataAndEvents.registerB & 1) == 0;
}, function(dataAndEvents) {
    /** @type {boolean} */
    dataAndEvents.FHalfCarry = true;
    /** @type {boolean} */
    dataAndEvents.FSubtract = false;
    /** @type {boolean} */
    dataAndEvents.FZero = (dataAndEvents.registerC & 1) == 0;
}, function(dataAndEvents) {
    /** @type {boolean} */
    dataAndEvents.FHalfCarry = true;
    /** @type {boolean} */
    dataAndEvents.FSubtract = false;
    /** @type {boolean} */
    dataAndEvents.FZero = (dataAndEvents.registerD & 1) == 0;
}, function(dataAndEvents) {
    /** @type {boolean} */
    dataAndEvents.FHalfCarry = true;
    /** @type {boolean} */
    dataAndEvents.FSubtract = false;
    /** @type {boolean} */
    dataAndEvents.FZero = (dataAndEvents.registerE & 1) == 0;
}, function(dataAndEvents) {
    /** @type {boolean} */
    dataAndEvents.FHalfCarry = true;
    /** @type {boolean} */
    dataAndEvents.FSubtract = false;
    /** @type {boolean} */
    dataAndEvents.FZero = (dataAndEvents.registersHL & 256) == 0;
}, function(dataAndEvents) {
    /** @type {boolean} */
    dataAndEvents.FHalfCarry = true;
    /** @type {boolean} */
    dataAndEvents.FSubtract = false;
    /** @type {boolean} */
    dataAndEvents.FZero = (dataAndEvents.registersHL & 1) == 0;
}, function(deepDataAndEvents) {
    /** @type {boolean} */
    deepDataAndEvents.FHalfCarry = true;
    /** @type {boolean} */
    deepDataAndEvents.FSubtract = false;
    /** @type {boolean} */
    deepDataAndEvents.FZero = (deepDataAndEvents.memoryReader[deepDataAndEvents.registersHL](deepDataAndEvents, deepDataAndEvents.registersHL) & 1) == 0;
}, function(dataAndEvents) {
    /** @type {boolean} */
    dataAndEvents.FHalfCarry = true;
    /** @type {boolean} */
    dataAndEvents.FSubtract = false;
    /** @type {boolean} */
    dataAndEvents.FZero = (dataAndEvents.registerA & 1) == 0;
}, function(dataAndEvents) {
    /** @type {boolean} */
    dataAndEvents.FHalfCarry = true;
    /** @type {boolean} */
    dataAndEvents.FSubtract = false;
    /** @type {boolean} */
    dataAndEvents.FZero = (dataAndEvents.registerB & 2) == 0;
}, function(dataAndEvents) {
    /** @type {boolean} */
    dataAndEvents.FHalfCarry = true;
    /** @type {boolean} */
    dataAndEvents.FSubtract = false;
    /** @type {boolean} */
    dataAndEvents.FZero = (dataAndEvents.registerC & 2) == 0;
}, function(dataAndEvents) {
    /** @type {boolean} */
    dataAndEvents.FHalfCarry = true;
    /** @type {boolean} */
    dataAndEvents.FSubtract = false;
    /** @type {boolean} */
    dataAndEvents.FZero = (dataAndEvents.registerD & 2) == 0;
}, function(dataAndEvents) {
    /** @type {boolean} */
    dataAndEvents.FHalfCarry = true;
    /** @type {boolean} */
    dataAndEvents.FSubtract = false;
    /** @type {boolean} */
    dataAndEvents.FZero = (dataAndEvents.registerE & 2) == 0;
}, function(dataAndEvents) {
    /** @type {boolean} */
    dataAndEvents.FHalfCarry = true;
    /** @type {boolean} */
    dataAndEvents.FSubtract = false;
    /** @type {boolean} */
    dataAndEvents.FZero = (dataAndEvents.registersHL & 512) == 0;
}, function(dataAndEvents) {
    /** @type {boolean} */
    dataAndEvents.FHalfCarry = true;
    /** @type {boolean} */
    dataAndEvents.FSubtract = false;
    /** @type {boolean} */
    dataAndEvents.FZero = (dataAndEvents.registersHL & 2) == 0;
}, function(deepDataAndEvents) {
    /** @type {boolean} */
    deepDataAndEvents.FHalfCarry = true;
    /** @type {boolean} */
    deepDataAndEvents.FSubtract = false;
    /** @type {boolean} */
    deepDataAndEvents.FZero = (deepDataAndEvents.memoryReader[deepDataAndEvents.registersHL](deepDataAndEvents, deepDataAndEvents.registersHL) & 2) == 0;
}, function(dataAndEvents) {
    /** @type {boolean} */
    dataAndEvents.FHalfCarry = true;
    /** @type {boolean} */
    dataAndEvents.FSubtract = false;
    /** @type {boolean} */
    dataAndEvents.FZero = (dataAndEvents.registerA & 2) == 0;
}, function(dataAndEvents) {
    /** @type {boolean} */
    dataAndEvents.FHalfCarry = true;
    /** @type {boolean} */
    dataAndEvents.FSubtract = false;
    /** @type {boolean} */
    dataAndEvents.FZero = (dataAndEvents.registerB & 4) == 0;
}, function(dataAndEvents) {
    /** @type {boolean} */
    dataAndEvents.FHalfCarry = true;
    /** @type {boolean} */
    dataAndEvents.FSubtract = false;
    /** @type {boolean} */
    dataAndEvents.FZero = (dataAndEvents.registerC & 4) == 0;
}, function(dataAndEvents) {
    /** @type {boolean} */
    dataAndEvents.FHalfCarry = true;
    /** @type {boolean} */
    dataAndEvents.FSubtract = false;
    /** @type {boolean} */
    dataAndEvents.FZero = (dataAndEvents.registerD & 4) == 0;
}, function(dataAndEvents) {
    /** @type {boolean} */
    dataAndEvents.FHalfCarry = true;
    /** @type {boolean} */
    dataAndEvents.FSubtract = false;
    /** @type {boolean} */
    dataAndEvents.FZero = (dataAndEvents.registerE & 4) == 0;
}, function(dataAndEvents) {
    /** @type {boolean} */
    dataAndEvents.FHalfCarry = true;
    /** @type {boolean} */
    dataAndEvents.FSubtract = false;
    /** @type {boolean} */
    dataAndEvents.FZero = (dataAndEvents.registersHL & 1024) == 0;
}, function(dataAndEvents) {
    /** @type {boolean} */
    dataAndEvents.FHalfCarry = true;
    /** @type {boolean} */
    dataAndEvents.FSubtract = false;
    /** @type {boolean} */
    dataAndEvents.FZero = (dataAndEvents.registersHL & 4) == 0;
}, function(deepDataAndEvents) {
    /** @type {boolean} */
    deepDataAndEvents.FHalfCarry = true;
    /** @type {boolean} */
    deepDataAndEvents.FSubtract = false;
    /** @type {boolean} */
    deepDataAndEvents.FZero = (deepDataAndEvents.memoryReader[deepDataAndEvents.registersHL](deepDataAndEvents, deepDataAndEvents.registersHL) & 4) == 0;
}, function(dataAndEvents) {
    /** @type {boolean} */
    dataAndEvents.FHalfCarry = true;
    /** @type {boolean} */
    dataAndEvents.FSubtract = false;
    /** @type {boolean} */
    dataAndEvents.FZero = (dataAndEvents.registerA & 4) == 0;
}, function(dataAndEvents) {
    /** @type {boolean} */
    dataAndEvents.FHalfCarry = true;
    /** @type {boolean} */
    dataAndEvents.FSubtract = false;
    /** @type {boolean} */
    dataAndEvents.FZero = (dataAndEvents.registerB & 8) == 0;
}, function(dataAndEvents) {
    /** @type {boolean} */
    dataAndEvents.FHalfCarry = true;
    /** @type {boolean} */
    dataAndEvents.FSubtract = false;
    /** @type {boolean} */
    dataAndEvents.FZero = (dataAndEvents.registerC & 8) == 0;
}, function(dataAndEvents) {
    /** @type {boolean} */
    dataAndEvents.FHalfCarry = true;
    /** @type {boolean} */
    dataAndEvents.FSubtract = false;
    /** @type {boolean} */
    dataAndEvents.FZero = (dataAndEvents.registerD & 8) == 0;
}, function(dataAndEvents) {
    /** @type {boolean} */
    dataAndEvents.FHalfCarry = true;
    /** @type {boolean} */
    dataAndEvents.FSubtract = false;
    /** @type {boolean} */
    dataAndEvents.FZero = (dataAndEvents.registerE & 8) == 0;
}, function(dataAndEvents) {
    /** @type {boolean} */
    dataAndEvents.FHalfCarry = true;
    /** @type {boolean} */
    dataAndEvents.FSubtract = false;
    /** @type {boolean} */
    dataAndEvents.FZero = (dataAndEvents.registersHL & 2048) == 0;
}, function(dataAndEvents) {
    /** @type {boolean} */
    dataAndEvents.FHalfCarry = true;
    /** @type {boolean} */
    dataAndEvents.FSubtract = false;
    /** @type {boolean} */
    dataAndEvents.FZero = (dataAndEvents.registersHL & 8) == 0;
}, function(deepDataAndEvents) {
    /** @type {boolean} */
    deepDataAndEvents.FHalfCarry = true;
    /** @type {boolean} */
    deepDataAndEvents.FSubtract = false;
    /** @type {boolean} */
    deepDataAndEvents.FZero = (deepDataAndEvents.memoryReader[deepDataAndEvents.registersHL](deepDataAndEvents, deepDataAndEvents.registersHL) & 8) == 0;
}, function(dataAndEvents) {
    /** @type {boolean} */
    dataAndEvents.FHalfCarry = true;
    /** @type {boolean} */
    dataAndEvents.FSubtract = false;
    /** @type {boolean} */
    dataAndEvents.FZero = (dataAndEvents.registerA & 8) == 0;
}, function(dataAndEvents) {
    /** @type {boolean} */
    dataAndEvents.FHalfCarry = true;
    /** @type {boolean} */
    dataAndEvents.FSubtract = false;
    /** @type {boolean} */
    dataAndEvents.FZero = (dataAndEvents.registerB & 16) == 0;
}, function(dataAndEvents) {
    /** @type {boolean} */
    dataAndEvents.FHalfCarry = true;
    /** @type {boolean} */
    dataAndEvents.FSubtract = false;
    /** @type {boolean} */
    dataAndEvents.FZero = (dataAndEvents.registerC & 16) == 0;
}, function(dataAndEvents) {
    /** @type {boolean} */
    dataAndEvents.FHalfCarry = true;
    /** @type {boolean} */
    dataAndEvents.FSubtract = false;
    /** @type {boolean} */
    dataAndEvents.FZero = (dataAndEvents.registerD & 16) == 0;
}, function(dataAndEvents) {
    /** @type {boolean} */
    dataAndEvents.FHalfCarry = true;
    /** @type {boolean} */
    dataAndEvents.FSubtract = false;
    /** @type {boolean} */
    dataAndEvents.FZero = (dataAndEvents.registerE & 16) == 0;
}, function(dataAndEvents) {
    /** @type {boolean} */
    dataAndEvents.FHalfCarry = true;
    /** @type {boolean} */
    dataAndEvents.FSubtract = false;
    /** @type {boolean} */
    dataAndEvents.FZero = (dataAndEvents.registersHL & 4096) == 0;
}, function(dataAndEvents) {
    /** @type {boolean} */
    dataAndEvents.FHalfCarry = true;
    /** @type {boolean} */
    dataAndEvents.FSubtract = false;
    /** @type {boolean} */
    dataAndEvents.FZero = (dataAndEvents.registersHL & 16) == 0;
}, function(deepDataAndEvents) {
    /** @type {boolean} */
    deepDataAndEvents.FHalfCarry = true;
    /** @type {boolean} */
    deepDataAndEvents.FSubtract = false;
    /** @type {boolean} */
    deepDataAndEvents.FZero = (deepDataAndEvents.memoryReader[deepDataAndEvents.registersHL](deepDataAndEvents, deepDataAndEvents.registersHL) & 16) == 0;
}, function(dataAndEvents) {
    /** @type {boolean} */
    dataAndEvents.FHalfCarry = true;
    /** @type {boolean} */
    dataAndEvents.FSubtract = false;
    /** @type {boolean} */
    dataAndEvents.FZero = (dataAndEvents.registerA & 16) == 0;
}, function(dataAndEvents) {
    /** @type {boolean} */
    dataAndEvents.FHalfCarry = true;
    /** @type {boolean} */
    dataAndEvents.FSubtract = false;
    /** @type {boolean} */
    dataAndEvents.FZero = (dataAndEvents.registerB & 32) == 0;
}, function(dataAndEvents) {
    /** @type {boolean} */
    dataAndEvents.FHalfCarry = true;
    /** @type {boolean} */
    dataAndEvents.FSubtract = false;
    /** @type {boolean} */
    dataAndEvents.FZero = (dataAndEvents.registerC & 32) == 0;
}, function(dataAndEvents) {
    /** @type {boolean} */
    dataAndEvents.FHalfCarry = true;
    /** @type {boolean} */
    dataAndEvents.FSubtract = false;
    /** @type {boolean} */
    dataAndEvents.FZero = (dataAndEvents.registerD & 32) == 0;
}, function(dataAndEvents) {
    /** @type {boolean} */
    dataAndEvents.FHalfCarry = true;
    /** @type {boolean} */
    dataAndEvents.FSubtract = false;
    /** @type {boolean} */
    dataAndEvents.FZero = (dataAndEvents.registerE & 32) == 0;
}, function(dataAndEvents) {
    /** @type {boolean} */
    dataAndEvents.FHalfCarry = true;
    /** @type {boolean} */
    dataAndEvents.FSubtract = false;
    /** @type {boolean} */
    dataAndEvents.FZero = (dataAndEvents.registersHL & 8192) == 0;
}, function(dataAndEvents) {
    /** @type {boolean} */
    dataAndEvents.FHalfCarry = true;
    /** @type {boolean} */
    dataAndEvents.FSubtract = false;
    /** @type {boolean} */
    dataAndEvents.FZero = (dataAndEvents.registersHL & 32) == 0;
}, function(deepDataAndEvents) {
    /** @type {boolean} */
    deepDataAndEvents.FHalfCarry = true;
    /** @type {boolean} */
    deepDataAndEvents.FSubtract = false;
    /** @type {boolean} */
    deepDataAndEvents.FZero = (deepDataAndEvents.memoryReader[deepDataAndEvents.registersHL](deepDataAndEvents, deepDataAndEvents.registersHL) & 32) == 0;
}, function(dataAndEvents) {
    /** @type {boolean} */
    dataAndEvents.FHalfCarry = true;
    /** @type {boolean} */
    dataAndEvents.FSubtract = false;
    /** @type {boolean} */
    dataAndEvents.FZero = (dataAndEvents.registerA & 32) == 0;
}, function(dataAndEvents) {
    /** @type {boolean} */
    dataAndEvents.FHalfCarry = true;
    /** @type {boolean} */
    dataAndEvents.FSubtract = false;
    /** @type {boolean} */
    dataAndEvents.FZero = (dataAndEvents.registerB & 64) == 0;
}, function(dataAndEvents) {
    /** @type {boolean} */
    dataAndEvents.FHalfCarry = true;
    /** @type {boolean} */
    dataAndEvents.FSubtract = false;
    /** @type {boolean} */
    dataAndEvents.FZero = (dataAndEvents.registerC & 64) == 0;
}, function(dataAndEvents) {
    /** @type {boolean} */
    dataAndEvents.FHalfCarry = true;
    /** @type {boolean} */
    dataAndEvents.FSubtract = false;
    /** @type {boolean} */
    dataAndEvents.FZero = (dataAndEvents.registerD & 64) == 0;
}, function(dataAndEvents) {
    /** @type {boolean} */
    dataAndEvents.FHalfCarry = true;
    /** @type {boolean} */
    dataAndEvents.FSubtract = false;
    /** @type {boolean} */
    dataAndEvents.FZero = (dataAndEvents.registerE & 64) == 0;
}, function(dataAndEvents) {
    /** @type {boolean} */
    dataAndEvents.FHalfCarry = true;
    /** @type {boolean} */
    dataAndEvents.FSubtract = false;
    /** @type {boolean} */
    dataAndEvents.FZero = (dataAndEvents.registersHL & 16384) == 0;
}, function(dataAndEvents) {
    /** @type {boolean} */
    dataAndEvents.FHalfCarry = true;
    /** @type {boolean} */
    dataAndEvents.FSubtract = false;
    /** @type {boolean} */
    dataAndEvents.FZero = (dataAndEvents.registersHL & 64) == 0;
}, function(deepDataAndEvents) {
    /** @type {boolean} */
    deepDataAndEvents.FHalfCarry = true;
    /** @type {boolean} */
    deepDataAndEvents.FSubtract = false;
    /** @type {boolean} */
    deepDataAndEvents.FZero = (deepDataAndEvents.memoryReader[deepDataAndEvents.registersHL](deepDataAndEvents, deepDataAndEvents.registersHL) & 64) == 0;
}, function(dataAndEvents) {
    /** @type {boolean} */
    dataAndEvents.FHalfCarry = true;
    /** @type {boolean} */
    dataAndEvents.FSubtract = false;
    /** @type {boolean} */
    dataAndEvents.FZero = (dataAndEvents.registerA & 64) == 0;
}, function(dataAndEvents) {
    /** @type {boolean} */
    dataAndEvents.FHalfCarry = true;
    /** @type {boolean} */
    dataAndEvents.FSubtract = false;
    /** @type {boolean} */
    dataAndEvents.FZero = (dataAndEvents.registerB & 128) == 0;
}, function(dataAndEvents) {
    /** @type {boolean} */
    dataAndEvents.FHalfCarry = true;
    /** @type {boolean} */
    dataAndEvents.FSubtract = false;
    /** @type {boolean} */
    dataAndEvents.FZero = (dataAndEvents.registerC & 128) == 0;
}, function(dataAndEvents) {
    /** @type {boolean} */
    dataAndEvents.FHalfCarry = true;
    /** @type {boolean} */
    dataAndEvents.FSubtract = false;
    /** @type {boolean} */
    dataAndEvents.FZero = (dataAndEvents.registerD & 128) == 0;
}, function(dataAndEvents) {
    /** @type {boolean} */
    dataAndEvents.FHalfCarry = true;
    /** @type {boolean} */
    dataAndEvents.FSubtract = false;
    /** @type {boolean} */
    dataAndEvents.FZero = (dataAndEvents.registerE & 128) == 0;
}, function(dataAndEvents) {
    /** @type {boolean} */
    dataAndEvents.FHalfCarry = true;
    /** @type {boolean} */
    dataAndEvents.FSubtract = false;
    /** @type {boolean} */
    dataAndEvents.FZero = (dataAndEvents.registersHL & 32768) == 0;
}, function(dataAndEvents) {
    /** @type {boolean} */
    dataAndEvents.FHalfCarry = true;
    /** @type {boolean} */
    dataAndEvents.FSubtract = false;
    /** @type {boolean} */
    dataAndEvents.FZero = (dataAndEvents.registersHL & 128) == 0;
}, function(deepDataAndEvents) {
    /** @type {boolean} */
    deepDataAndEvents.FHalfCarry = true;
    /** @type {boolean} */
    deepDataAndEvents.FSubtract = false;
    /** @type {boolean} */
    deepDataAndEvents.FZero = (deepDataAndEvents.memoryReader[deepDataAndEvents.registersHL](deepDataAndEvents, deepDataAndEvents.registersHL) & 128) == 0;
}, function(dataAndEvents) {
    /** @type {boolean} */
    dataAndEvents.FHalfCarry = true;
    /** @type {boolean} */
    dataAndEvents.FSubtract = false;
    /** @type {boolean} */
    dataAndEvents.FZero = (dataAndEvents.registerA & 128) == 0;
}, function(dataAndEvents) {
    dataAndEvents.registerB &= 254;
}, function(dataAndEvents) {
    dataAndEvents.registerC &= 254;
}, function(dataAndEvents) {
    dataAndEvents.registerD &= 254;
}, function(dataAndEvents) {
    dataAndEvents.registerE &= 254;
}, function(dataAndEvents) {
    dataAndEvents.registersHL &= 65279;
}, function(dataAndEvents) {
    dataAndEvents.registersHL &= 65534;
}, function(deepDataAndEvents) {
    deepDataAndEvents.memoryWriter[deepDataAndEvents.registersHL](deepDataAndEvents, deepDataAndEvents.registersHL, deepDataAndEvents.memoryReader[deepDataAndEvents.registersHL](deepDataAndEvents, deepDataAndEvents.registersHL) & 254);
}, function(dataAndEvents) {
    dataAndEvents.registerA &= 254;
}, function(dataAndEvents) {
    dataAndEvents.registerB &= 253;
}, function(dataAndEvents) {
    dataAndEvents.registerC &= 253;
}, function(dataAndEvents) {
    dataAndEvents.registerD &= 253;
}, function(dataAndEvents) {
    dataAndEvents.registerE &= 253;
}, function(dataAndEvents) {
    dataAndEvents.registersHL &= 65023;
}, function(dataAndEvents) {
    dataAndEvents.registersHL &= 65533;
}, function(deepDataAndEvents) {
    deepDataAndEvents.memoryWriter[deepDataAndEvents.registersHL](deepDataAndEvents, deepDataAndEvents.registersHL, deepDataAndEvents.memoryReader[deepDataAndEvents.registersHL](deepDataAndEvents, deepDataAndEvents.registersHL) & 253);
}, function(dataAndEvents) {
    dataAndEvents.registerA &= 253;
}, function(dataAndEvents) {
    dataAndEvents.registerB &= 251;
}, function(dataAndEvents) {
    dataAndEvents.registerC &= 251;
}, function(dataAndEvents) {
    dataAndEvents.registerD &= 251;
}, function(dataAndEvents) {
    dataAndEvents.registerE &= 251;
}, function(dataAndEvents) {
    dataAndEvents.registersHL &= 64511;
}, function(dataAndEvents) {
    dataAndEvents.registersHL &= 65531;
}, function(deepDataAndEvents) {
    deepDataAndEvents.memoryWriter[deepDataAndEvents.registersHL](deepDataAndEvents, deepDataAndEvents.registersHL, deepDataAndEvents.memoryReader[deepDataAndEvents.registersHL](deepDataAndEvents, deepDataAndEvents.registersHL) & 251);
}, function(dataAndEvents) {
    dataAndEvents.registerA &= 251;
}, function(dataAndEvents) {
    dataAndEvents.registerB &= 247;
}, function(dataAndEvents) {
    dataAndEvents.registerC &= 247;
}, function(dataAndEvents) {
    dataAndEvents.registerD &= 247;
}, function(dataAndEvents) {
    dataAndEvents.registerE &= 247;
}, function(dataAndEvents) {
    dataAndEvents.registersHL &= 63487;
}, function(dataAndEvents) {
    dataAndEvents.registersHL &= 65527;
}, function(deepDataAndEvents) {
    deepDataAndEvents.memoryWriter[deepDataAndEvents.registersHL](deepDataAndEvents, deepDataAndEvents.registersHL, deepDataAndEvents.memoryReader[deepDataAndEvents.registersHL](deepDataAndEvents, deepDataAndEvents.registersHL) & 247);
}, function(dataAndEvents) {
    dataAndEvents.registerA &= 247;
}, function(dataAndEvents) {
    dataAndEvents.registerB &= 239;
}, function(dataAndEvents) {
    dataAndEvents.registerC &= 239;
}, function(dataAndEvents) {
    dataAndEvents.registerD &= 239;
}, function(dataAndEvents) {
    dataAndEvents.registerE &= 239;
}, function(dataAndEvents) {
    dataAndEvents.registersHL &= 61439;
}, function(dataAndEvents) {
    dataAndEvents.registersHL &= 65519;
}, function(deepDataAndEvents) {
    deepDataAndEvents.memoryWriter[deepDataAndEvents.registersHL](deepDataAndEvents, deepDataAndEvents.registersHL, deepDataAndEvents.memoryReader[deepDataAndEvents.registersHL](deepDataAndEvents, deepDataAndEvents.registersHL) & 239);
}, function(dataAndEvents) {
    dataAndEvents.registerA &= 239;
}, function(dataAndEvents) {
    dataAndEvents.registerB &= 223;
}, function(dataAndEvents) {
    dataAndEvents.registerC &= 223;
}, function(dataAndEvents) {
    dataAndEvents.registerD &= 223;
}, function(dataAndEvents) {
    dataAndEvents.registerE &= 223;
}, function(dataAndEvents) {
    dataAndEvents.registersHL &= 57343;
}, function(dataAndEvents) {
    dataAndEvents.registersHL &= 65503;
}, function(deepDataAndEvents) {
    deepDataAndEvents.memoryWriter[deepDataAndEvents.registersHL](deepDataAndEvents, deepDataAndEvents.registersHL, deepDataAndEvents.memoryReader[deepDataAndEvents.registersHL](deepDataAndEvents, deepDataAndEvents.registersHL) & 223);
}, function(dataAndEvents) {
    dataAndEvents.registerA &= 223;
}, function(dataAndEvents) {
    dataAndEvents.registerB &= 191;
}, function(dataAndEvents) {
    dataAndEvents.registerC &= 191;
}, function(dataAndEvents) {
    dataAndEvents.registerD &= 191;
}, function(dataAndEvents) {
    dataAndEvents.registerE &= 191;
}, function(dataAndEvents) {
    dataAndEvents.registersHL &= 49151;
}, function(dataAndEvents) {
    dataAndEvents.registersHL &= 65471;
}, function(deepDataAndEvents) {
    deepDataAndEvents.memoryWriter[deepDataAndEvents.registersHL](deepDataAndEvents, deepDataAndEvents.registersHL, deepDataAndEvents.memoryReader[deepDataAndEvents.registersHL](deepDataAndEvents, deepDataAndEvents.registersHL) & 191);
}, function(dataAndEvents) {
    dataAndEvents.registerA &= 191;
}, function(dataAndEvents) {
    dataAndEvents.registerB &= 127;
}, function(dataAndEvents) {
    dataAndEvents.registerC &= 127;
}, function(dataAndEvents) {
    dataAndEvents.registerD &= 127;
}, function(dataAndEvents) {
    dataAndEvents.registerE &= 127;
}, function(dataAndEvents) {
    dataAndEvents.registersHL &= 32767;
}, function(dataAndEvents) {
    dataAndEvents.registersHL &= 65407;
}, function(deepDataAndEvents) {
    deepDataAndEvents.memoryWriter[deepDataAndEvents.registersHL](deepDataAndEvents, deepDataAndEvents.registersHL, deepDataAndEvents.memoryReader[deepDataAndEvents.registersHL](deepDataAndEvents, deepDataAndEvents.registersHL) & 127);
}, function(dataAndEvents) {
    dataAndEvents.registerA &= 127;
}, function(dataAndEvents) {
    dataAndEvents.registerB |= 1;
}, function(dataAndEvents) {
    dataAndEvents.registerC |= 1;
}, function(dataAndEvents) {
    dataAndEvents.registerD |= 1;
}, function(dataAndEvents) {
    dataAndEvents.registerE |= 1;
}, function(dataAndEvents) {
    dataAndEvents.registersHL |= 256;
}, function(dataAndEvents) {
    dataAndEvents.registersHL |= 1;
}, function(deepDataAndEvents) {
    deepDataAndEvents.memoryWriter[deepDataAndEvents.registersHL](deepDataAndEvents, deepDataAndEvents.registersHL, deepDataAndEvents.memoryReader[deepDataAndEvents.registersHL](deepDataAndEvents, deepDataAndEvents.registersHL) | 1);
}, function(dataAndEvents) {
    dataAndEvents.registerA |= 1;
}, function(dataAndEvents) {
    dataAndEvents.registerB |= 2;
}, function(dataAndEvents) {
    dataAndEvents.registerC |= 2;
}, function(dataAndEvents) {
    dataAndEvents.registerD |= 2;
}, function(dataAndEvents) {
    dataAndEvents.registerE |= 2;
}, function(dataAndEvents) {
    dataAndEvents.registersHL |= 512;
}, function(dataAndEvents) {
    dataAndEvents.registersHL |= 2;
}, function(deepDataAndEvents) {
    deepDataAndEvents.memoryWriter[deepDataAndEvents.registersHL](deepDataAndEvents, deepDataAndEvents.registersHL, deepDataAndEvents.memoryReader[deepDataAndEvents.registersHL](deepDataAndEvents, deepDataAndEvents.registersHL) | 2);
}, function(dataAndEvents) {
    dataAndEvents.registerA |= 2;
}, function(dataAndEvents) {
    dataAndEvents.registerB |= 4;
}, function(dataAndEvents) {
    dataAndEvents.registerC |= 4;
}, function(dataAndEvents) {
    dataAndEvents.registerD |= 4;
}, function(dataAndEvents) {
    dataAndEvents.registerE |= 4;
}, function(dataAndEvents) {
    dataAndEvents.registersHL |= 1024;
}, function(dataAndEvents) {
    dataAndEvents.registersHL |= 4;
}, function(deepDataAndEvents) {
    deepDataAndEvents.memoryWriter[deepDataAndEvents.registersHL](deepDataAndEvents, deepDataAndEvents.registersHL, deepDataAndEvents.memoryReader[deepDataAndEvents.registersHL](deepDataAndEvents, deepDataAndEvents.registersHL) | 4);
}, function(dataAndEvents) {
    dataAndEvents.registerA |= 4;
}, function(dataAndEvents) {
    dataAndEvents.registerB |= 8;
}, function(dataAndEvents) {
    dataAndEvents.registerC |= 8;
}, function(dataAndEvents) {
    dataAndEvents.registerD |= 8;
}, function(dataAndEvents) {
    dataAndEvents.registerE |= 8;
}, function(dataAndEvents) {
    dataAndEvents.registersHL |= 2048;
}, function(dataAndEvents) {
    dataAndEvents.registersHL |= 8;
}, function(deepDataAndEvents) {
    deepDataAndEvents.memoryWriter[deepDataAndEvents.registersHL](deepDataAndEvents, deepDataAndEvents.registersHL, deepDataAndEvents.memoryReader[deepDataAndEvents.registersHL](deepDataAndEvents, deepDataAndEvents.registersHL) | 8);
}, function(dataAndEvents) {
    dataAndEvents.registerA |= 8;
}, function(dataAndEvents) {
    dataAndEvents.registerB |= 16;
}, function(dataAndEvents) {
    dataAndEvents.registerC |= 16;
}, function(dataAndEvents) {
    dataAndEvents.registerD |= 16;
}, function(dataAndEvents) {
    dataAndEvents.registerE |= 16;
}, function(dataAndEvents) {
    dataAndEvents.registersHL |= 4096;
}, function(dataAndEvents) {
    dataAndEvents.registersHL |= 16;
}, function(deepDataAndEvents) {
    deepDataAndEvents.memoryWriter[deepDataAndEvents.registersHL](deepDataAndEvents, deepDataAndEvents.registersHL, deepDataAndEvents.memoryReader[deepDataAndEvents.registersHL](deepDataAndEvents, deepDataAndEvents.registersHL) | 16);
}, function(dataAndEvents) {
    dataAndEvents.registerA |= 16;
}, function(dataAndEvents) {
    dataAndEvents.registerB |= 32;
}, function(dataAndEvents) {
    dataAndEvents.registerC |= 32;
}, function(dataAndEvents) {
    dataAndEvents.registerD |= 32;
}, function(dataAndEvents) {
    dataAndEvents.registerE |= 32;
}, function(dataAndEvents) {
    dataAndEvents.registersHL |= 8192;
}, function(dataAndEvents) {
    dataAndEvents.registersHL |= 32;
}, function(deepDataAndEvents) {
    deepDataAndEvents.memoryWriter[deepDataAndEvents.registersHL](deepDataAndEvents, deepDataAndEvents.registersHL, deepDataAndEvents.memoryReader[deepDataAndEvents.registersHL](deepDataAndEvents, deepDataAndEvents.registersHL) | 32);
}, function(dataAndEvents) {
    dataAndEvents.registerA |= 32;
}, function(dataAndEvents) {
    dataAndEvents.registerB |= 64;
}, function(dataAndEvents) {
    dataAndEvents.registerC |= 64;
}, function(dataAndEvents) {
    dataAndEvents.registerD |= 64;
}, function(dataAndEvents) {
    dataAndEvents.registerE |= 64;
}, function(dataAndEvents) {
    dataAndEvents.registersHL |= 16384;
}, function(dataAndEvents) {
    dataAndEvents.registersHL |= 64;
}, function(deepDataAndEvents) {
    deepDataAndEvents.memoryWriter[deepDataAndEvents.registersHL](deepDataAndEvents, deepDataAndEvents.registersHL, deepDataAndEvents.memoryReader[deepDataAndEvents.registersHL](deepDataAndEvents, deepDataAndEvents.registersHL) | 64);
}, function(dataAndEvents) {
    dataAndEvents.registerA |= 64;
}, function(dataAndEvents) {
    dataAndEvents.registerB |= 128;
}, function(dataAndEvents) {
    dataAndEvents.registerC |= 128;
}, function(dataAndEvents) {
    dataAndEvents.registerD |= 128;
}, function(dataAndEvents) {
    dataAndEvents.registerE |= 128;
}, function(dataAndEvents) {
    dataAndEvents.registersHL |= 32768;
}, function(dataAndEvents) {
    dataAndEvents.registersHL |= 128;
}, function(deepDataAndEvents) {
    deepDataAndEvents.memoryWriter[deepDataAndEvents.registersHL](deepDataAndEvents, deepDataAndEvents.registersHL, deepDataAndEvents.memoryReader[deepDataAndEvents.registersHL](deepDataAndEvents, deepDataAndEvents.registersHL) | 128);
}, function(dataAndEvents) {
    dataAndEvents.registerA |= 128;
}];
/** @type {Array} */
GameBoyCore.prototype.TICKTable = [4, 12, 8, 8, 4, 4, 8, 4, 20, 8, 8, 8, 4, 4, 8, 4, 4, 12, 8, 8, 4, 4, 8, 4, 12, 8, 8, 8, 4, 4, 8, 4, 8, 12, 8, 8, 4, 4, 8, 4, 8, 8, 8, 8, 4, 4, 8, 4, 8, 12, 8, 8, 12, 12, 12, 4, 8, 8, 8, 8, 4, 4, 8, 4, 4, 4, 4, 4, 4, 4, 8, 4, 4, 4, 4, 4, 4, 4, 8, 4, 4, 4, 4, 4, 4, 4, 8, 4, 4, 4, 4, 4, 4, 4, 8, 4, 4, 4, 4, 4, 4, 4, 8, 4, 4, 4, 4, 4, 4, 4, 8, 4, 8, 8, 8, 8, 8, 8, 4, 8, 4, 4, 4, 4, 4, 4, 8, 4, 4, 4, 4, 4, 4, 4, 8, 4, 4, 4, 4, 4, 4, 4, 8, 4, 4, 4, 4, 4, 4, 4, 8, 4, 4,
    4, 4, 4, 4, 4, 8, 4, 4, 4, 4, 4, 4, 4, 8, 4, 4, 4, 4, 4, 4, 4, 8, 4, 4, 4, 4, 4, 4, 4, 8, 4, 4, 4, 4, 4, 4, 4, 8, 4, 8, 12, 12, 16, 12, 16, 8, 16, 8, 16, 12, 0, 12, 24, 8, 16, 8, 12, 12, 4, 12, 16, 8, 16, 8, 16, 12, 4, 12, 4, 8, 16, 12, 12, 8, 4, 4, 16, 8, 16, 16, 4, 16, 4, 4, 4, 8, 16, 12, 12, 8, 4, 4, 16, 8, 16, 12, 8, 16, 4, 0, 4, 8, 16];
/** @type {Array} */
GameBoyCore.prototype.SecondaryTICKTable = [8, 8, 8, 8, 8, 8, 16, 8, 8, 8, 8, 8, 8, 8, 16, 8, 8, 8, 8, 8, 8, 8, 16, 8, 8, 8, 8, 8, 8, 8, 16, 8, 8, 8, 8, 8, 8, 8, 16, 8, 8, 8, 8, 8, 8, 8, 16, 8, 8, 8, 8, 8, 8, 8, 16, 8, 8, 8, 8, 8, 8, 8, 16, 8, 8, 8, 8, 8, 8, 8, 12, 8, 8, 8, 8, 8, 8, 8, 12, 8, 8, 8, 8, 8, 8, 8, 12, 8, 8, 8, 8, 8, 8, 8, 12, 8, 8, 8, 8, 8, 8, 8, 12, 8, 8, 8, 8, 8, 8, 8, 12, 8, 8, 8, 8, 8, 8, 8, 12, 8, 8, 8, 8, 8, 8, 8, 12, 8, 8, 8, 8, 8, 8, 8, 16, 8, 8, 8, 8, 8, 8, 8, 16, 8, 8, 8, 8,
    8, 8, 8, 16, 8, 8, 8, 8, 8, 8, 8, 16, 8, 8, 8, 8, 8, 8, 8, 16, 8, 8, 8, 8, 8, 8, 8, 16, 8, 8, 8, 8, 8, 8, 8, 16, 8, 8, 8, 8, 8, 8, 8, 16, 8, 8, 8, 8, 8, 8, 8, 16, 8, 8, 8, 8, 8, 8, 8, 16, 8, 8, 8, 8, 8, 8, 8, 16, 8, 8, 8, 8, 8, 8, 8, 16, 8, 8, 8, 8, 8, 8, 8, 16, 8, 8, 8, 8, 8, 8, 8, 16, 8, 8, 8, 8, 8, 8, 8, 16, 8, 8, 8, 8, 8, 8, 8, 16, 8];
/**
 * @return {?}
 */
GameBoyCore.prototype.saveSRAMState = function() {
    if (!this.cBATT || this.MBCRam.length == 0) {
        return[];
    } else {
        return this.fromTypedArray(this.MBCRam);
    }
};
/**
 * @return {?}
 */
GameBoyCore.prototype.saveRTCState = function() {
    if (!this.cTIMER) {
        return[];
    } else {
        return[this.lastIteration, this.RTCisLatched, this.latchedSeconds, this.latchedMinutes, this.latchedHours, this.latchedLDays, this.latchedHDays, this.RTCSeconds, this.RTCMinutes, this.RTCHours, this.RTCDays, this.RTCDayOverFlow, this.RTCHALT];
    }
};
/**
 * @return {?}
 */
GameBoyCore.prototype.saveState = function() {
    return[this.fromTypedArray(this.ROM), this.inBootstrap, this.registerA, this.FZero, this.FSubtract, this.FHalfCarry, this.FCarry, this.registerB, this.registerC, this.registerD, this.registerE, this.registersHL, this.stackPointer, this.programCounter, this.halt, this.IME, this.hdmaRunning, this.CPUTicks, this.doubleSpeedShifter, this.fromTypedArray(this.memory), this.fromTypedArray(this.MBCRam), this.fromTypedArray(this.VRAM), this.currVRAMBank, this.fromTypedArray(this.GBCMemory), this.MBC1Mode,
        this.MBCRAMBanksEnabled, this.currMBCRAMBank, this.currMBCRAMBankPosition, this.cGBC, this.gbcRamBank, this.gbcRamBankPosition, this.ROMBank1offs, this.currentROMBank, this.cartridgeType, this.name, this.gameCode, this.modeSTAT, this.LYCMatchTriggerSTAT, this.mode2TriggerSTAT, this.mode1TriggerSTAT, this.mode0TriggerSTAT, this.LCDisOn, this.gfxWindowCHRBankPosition, this.gfxWindowDisplay, this.gfxSpriteShow, this.gfxSpriteNormalHeight, this.gfxBackgroundCHRBankPosition, this.gfxBackgroundBankOffset,
        this.TIMAEnabled, this.DIVTicks, this.LCDTicks, this.timerTicks, this.TACClocker, this.serialTimer, this.serialShiftTimer, this.serialShiftTimerAllocated, this.IRQEnableDelay, this.lastIteration, this.cMBC1, this.cMBC2, this.cMBC3, this.cMBC5, this.cMBC7, this.cSRAM, this.cMMMO1, this.cRUMBLE, this.cCamera, this.cTAMA5, this.cHuC3, this.cHuC1, this.drewBlank, this.fromTypedArray(this.frameBuffer), this.bgEnabled, this.BGPriorityEnabled, this.channel1FrequencyTracker, this.channel1FrequencyCounter,
        this.channel1totalLength, this.channel1envelopeVolume, this.channel1envelopeType, this.channel1envelopeSweeps, this.channel1envelopeSweepsLast, this.channel1consecutive, this.channel1frequency, this.channel1SweepFault, this.channel1ShadowFrequency, this.channel1timeSweep, this.channel1lastTimeSweep, this.channel1numSweep, this.channel1frequencySweepDivider, this.channel1decreaseSweep, this.channel2FrequencyTracker, this.channel2FrequencyCounter, this.channel2totalLength, this.channel2envelopeVolume,
        this.channel2envelopeType, this.channel2envelopeSweeps, this.channel2envelopeSweepsLast, this.channel2consecutive, this.channel2frequency, this.channel3canPlay, this.channel3totalLength, this.channel3patternType, this.channel3frequency, this.channel3consecutive, this.fromTypedArray(this.channel3PCM), this.channel4FrequencyPeriod, this.channel4lastSampleLookup, this.channel4totalLength, this.channel4envelopeVolume, this.channel4currentVolume, this.channel4envelopeType, this.channel4envelopeSweeps,
        this.channel4envelopeSweepsLast, this.channel4consecutive, this.channel4BitRange, this.soundMasterEnabled, this.VinLeftChannelMasterVolume, this.VinRightChannelMasterVolume, this.leftChannel1, this.leftChannel2, this.leftChannel3, this.leftChannel4, this.rightChannel1, this.rightChannel2, this.rightChannel3, this.rightChannel4, this.channel1currentSampleLeft, this.channel1currentSampleRight, this.channel2currentSampleLeft, this.channel2currentSampleRight, this.channel3currentSampleLeft, this.channel3currentSampleRight,
        this.channel4currentSampleLeft, this.channel4currentSampleRight, this.channel1currentSampleLeftSecondary, this.channel1currentSampleRightSecondary, this.channel2currentSampleLeftSecondary, this.channel2currentSampleRightSecondary, this.channel3currentSampleLeftSecondary, this.channel3currentSampleRightSecondary, this.channel4currentSampleLeftSecondary, this.channel4currentSampleRightSecondary, this.channel1currentSampleLeftTrimary, this.channel1currentSampleRightTrimary, this.channel2currentSampleLeftTrimary,
        this.channel2currentSampleRightTrimary, this.mixerOutputCache, this.channel1DutyTracker, this.channel1CachedDuty, this.channel2DutyTracker, this.channel2CachedDuty, this.channel1Enabled, this.channel2Enabled, this.channel3Enabled, this.channel4Enabled, this.sequencerClocks, this.sequencePosition, this.channel3Counter, this.channel4Counter, this.cachedChannel3Sample, this.cachedChannel4Sample, this.channel3FrequencyPeriod, this.channel3lastSampleLookup, this.actualScanLine, this.lastUnrenderedLine,
        this.queuedScanLines, this.RTCisLatched, this.latchedSeconds, this.latchedMinutes, this.latchedHours, this.latchedLDays, this.latchedHDays, this.RTCSeconds, this.RTCMinutes, this.RTCHours, this.RTCDays, this.RTCDayOverFlow, this.RTCHALT, this.usedBootROM, this.skipPCIncrement, this.STATTracker, this.gbcRamBankPositionECHO, this.numRAMBanks, this.windowY, this.windowX, this.fromTypedArray(this.gbcOBJRawPalette), this.fromTypedArray(this.gbcBGRawPalette), this.fromTypedArray(this.gbOBJPalette), this.fromTypedArray(this.gbBGPalette),
        this.fromTypedArray(this.gbcOBJPalette), this.fromTypedArray(this.gbcBGPalette), this.fromTypedArray(this.gbBGColorizedPalette), this.fromTypedArray(this.gbOBJColorizedPalette), this.fromTypedArray(this.cachedBGPaletteConversion), this.fromTypedArray(this.cachedOBJPaletteConversion), this.fromTypedArray(this.BGCHRBank1), this.fromTypedArray(this.BGCHRBank2), this.haltPostClocks, this.interruptsRequested, this.interruptsEnabled, this.remainingClocks, this.colorizedGBPalettes, this.backgroundY, this.backgroundX,
        this.CPUStopped];
};
/**
 * @param {Object} models
 * @return {undefined}
 */
GameBoyCore.prototype.returnFromState = function(models) {
    /** @type {number} */
    var j = 0;
    var second = models.slice(0);
    this.ROM = this.toTypedArray(second[j++], "uint8");
    /** @type {number} */
    this.ROMBankEdge = Math.floor(this.ROM.length / 16384);
    this.inBootstrap = second[j++];
    this.registerA = second[j++];
    this.FZero = second[j++];
    this.FSubtract = second[j++];
    this.FHalfCarry = second[j++];
    this.FCarry = second[j++];
    this.registerB = second[j++];
    this.registerC = second[j++];
    this.registerD = second[j++];
    this.registerE = second[j++];
    this.registersHL = second[j++];
    this.stackPointer = second[j++];
    this.programCounter = second[j++];
    this.halt = second[j++];
    this.IME = second[j++];
    this.hdmaRunning = second[j++];
    this.CPUTicks = second[j++];
    this.doubleSpeedShifter = second[j++];
    this.memory = this.toTypedArray(second[j++], "uint8");
    this.MBCRam = this.toTypedArray(second[j++], "uint8");
    this.VRAM = this.toTypedArray(second[j++], "uint8");
    this.currVRAMBank = second[j++];
    this.GBCMemory = this.toTypedArray(second[j++], "uint8");
    this.MBC1Mode = second[j++];
    this.MBCRAMBanksEnabled = second[j++];
    this.currMBCRAMBank = second[j++];
    this.currMBCRAMBankPosition = second[j++];
    this.cGBC = second[j++];
    this.gbcRamBank = second[j++];
    this.gbcRamBankPosition = second[j++];
    this.ROMBank1offs = second[j++];
    this.currentROMBank = second[j++];
    this.cartridgeType = second[j++];
    this.name = second[j++];
    this.gameCode = second[j++];
    this.modeSTAT = second[j++];
    this.LYCMatchTriggerSTAT = second[j++];
    this.mode2TriggerSTAT = second[j++];
    this.mode1TriggerSTAT = second[j++];
    this.mode0TriggerSTAT = second[j++];
    this.LCDisOn = second[j++];
    this.gfxWindowCHRBankPosition = second[j++];
    this.gfxWindowDisplay = second[j++];
    this.gfxSpriteShow = second[j++];
    this.gfxSpriteNormalHeight = second[j++];
    this.gfxBackgroundCHRBankPosition = second[j++];
    this.gfxBackgroundBankOffset = second[j++];
    this.TIMAEnabled = second[j++];
    this.DIVTicks = second[j++];
    this.LCDTicks = second[j++];
    this.timerTicks = second[j++];
    this.TACClocker = second[j++];
    this.serialTimer = second[j++];
    this.serialShiftTimer = second[j++];
    this.serialShiftTimerAllocated = second[j++];
    this.IRQEnableDelay = second[j++];
    this.lastIteration = second[j++];
    this.cMBC1 = second[j++];
    this.cMBC2 = second[j++];
    this.cMBC3 = second[j++];
    this.cMBC5 = second[j++];
    this.cMBC7 = second[j++];
    this.cSRAM = second[j++];
    this.cMMMO1 = second[j++];
    this.cRUMBLE = second[j++];
    this.cCamera = second[j++];
    this.cTAMA5 = second[j++];
    this.cHuC3 = second[j++];
    this.cHuC1 = second[j++];
    this.drewBlank = second[j++];
    this.frameBuffer = this.toTypedArray(second[j++], "int32");
    this.bgEnabled = second[j++];
    this.BGPriorityEnabled = second[j++];
    this.channel1FrequencyTracker = second[j++];
    this.channel1FrequencyCounter = second[j++];
    this.channel1totalLength = second[j++];
    this.channel1envelopeVolume = second[j++];
    this.channel1envelopeType = second[j++];
    this.channel1envelopeSweeps = second[j++];
    this.channel1envelopeSweepsLast = second[j++];
    this.channel1consecutive = second[j++];
    this.channel1frequency = second[j++];
    this.channel1SweepFault = second[j++];
    this.channel1ShadowFrequency = second[j++];
    this.channel1timeSweep = second[j++];
    this.channel1lastTimeSweep = second[j++];
    this.channel1numSweep = second[j++];
    this.channel1frequencySweepDivider = second[j++];
    this.channel1decreaseSweep = second[j++];
    this.channel2FrequencyTracker = second[j++];
    this.channel2FrequencyCounter = second[j++];
    this.channel2totalLength = second[j++];
    this.channel2envelopeVolume = second[j++];
    this.channel2envelopeType = second[j++];
    this.channel2envelopeSweeps = second[j++];
    this.channel2envelopeSweepsLast = second[j++];
    this.channel2consecutive = second[j++];
    this.channel2frequency = second[j++];
    this.channel3canPlay = second[j++];
    this.channel3totalLength = second[j++];
    this.channel3patternType = second[j++];
    this.channel3frequency = second[j++];
    this.channel3consecutive = second[j++];
    this.channel3PCM = this.toTypedArray(second[j++], "int8");
    this.channel4FrequencyPeriod = second[j++];
    this.channel4lastSampleLookup = second[j++];
    this.channel4totalLength = second[j++];
    this.channel4envelopeVolume = second[j++];
    this.channel4currentVolume = second[j++];
    this.channel4envelopeType = second[j++];
    this.channel4envelopeSweeps = second[j++];
    this.channel4envelopeSweepsLast = second[j++];
    this.channel4consecutive = second[j++];
    this.channel4BitRange = second[j++];
    this.soundMasterEnabled = second[j++];
    this.VinLeftChannelMasterVolume = second[j++];
    this.VinRightChannelMasterVolume = second[j++];
    this.leftChannel1 = second[j++];
    this.leftChannel2 = second[j++];
    this.leftChannel3 = second[j++];
    this.leftChannel4 = second[j++];
    this.rightChannel1 = second[j++];
    this.rightChannel2 = second[j++];
    this.rightChannel3 = second[j++];
    this.rightChannel4 = second[j++];
    this.channel1currentSampleLeft = second[j++];
    this.channel1currentSampleRight = second[j++];
    this.channel2currentSampleLeft = second[j++];
    this.channel2currentSampleRight = second[j++];
    this.channel3currentSampleLeft = second[j++];
    this.channel3currentSampleRight = second[j++];
    this.channel4currentSampleLeft = second[j++];
    this.channel4currentSampleRight = second[j++];
    this.channel1currentSampleLeftSecondary = second[j++];
    this.channel1currentSampleRightSecondary = second[j++];
    this.channel2currentSampleLeftSecondary = second[j++];
    this.channel2currentSampleRightSecondary = second[j++];
    this.channel3currentSampleLeftSecondary = second[j++];
    this.channel3currentSampleRightSecondary = second[j++];
    this.channel4currentSampleLeftSecondary = second[j++];
    this.channel4currentSampleRightSecondary = second[j++];
    this.channel1currentSampleLeftTrimary = second[j++];
    this.channel1currentSampleRightTrimary = second[j++];
    this.channel2currentSampleLeftTrimary = second[j++];
    this.channel2currentSampleRightTrimary = second[j++];
    this.mixerOutputCache = second[j++];
    this.channel1DutyTracker = second[j++];
    this.channel1CachedDuty = second[j++];
    this.channel2DutyTracker = second[j++];
    this.channel2CachedDuty = second[j++];
    this.channel1Enabled = second[j++];
    this.channel2Enabled = second[j++];
    this.channel3Enabled = second[j++];
    this.channel4Enabled = second[j++];
    this.sequencerClocks = second[j++];
    this.sequencePosition = second[j++];
    this.channel3Counter = second[j++];
    this.channel4Counter = second[j++];
    this.cachedChannel3Sample = second[j++];
    this.cachedChannel4Sample = second[j++];
    this.channel3FrequencyPeriod = second[j++];
    this.channel3lastSampleLookup = second[j++];
    this.actualScanLine = second[j++];
    this.lastUnrenderedLine = second[j++];
    this.queuedScanLines = second[j++];
    this.RTCisLatched = second[j++];
    this.latchedSeconds = second[j++];
    this.latchedMinutes = second[j++];
    this.latchedHours = second[j++];
    this.latchedLDays = second[j++];
    this.latchedHDays = second[j++];
    this.RTCSeconds = second[j++];
    this.RTCMinutes = second[j++];
    this.RTCHours = second[j++];
    this.RTCDays = second[j++];
    this.RTCDayOverFlow = second[j++];
    this.RTCHALT = second[j++];
    this.usedBootROM = second[j++];
    this.skipPCIncrement = second[j++];
    this.STATTracker = second[j++];
    this.gbcRamBankPositionECHO = second[j++];
    this.numRAMBanks = second[j++];
    this.windowY = second[j++];
    this.windowX = second[j++];
    this.gbcOBJRawPalette = this.toTypedArray(second[j++], "uint8");
    this.gbcBGRawPalette = this.toTypedArray(second[j++], "uint8");
    this.gbOBJPalette = this.toTypedArray(second[j++], "int32");
    this.gbBGPalette = this.toTypedArray(second[j++], "int32");
    this.gbcOBJPalette = this.toTypedArray(second[j++], "int32");
    this.gbcBGPalette = this.toTypedArray(second[j++], "int32");
    this.gbBGColorizedPalette = this.toTypedArray(second[j++], "int32");
    this.gbOBJColorizedPalette = this.toTypedArray(second[j++], "int32");
    this.cachedBGPaletteConversion = this.toTypedArray(second[j++], "int32");
    this.cachedOBJPaletteConversion = this.toTypedArray(second[j++], "int32");
    this.BGCHRBank1 = this.toTypedArray(second[j++], "uint8");
    this.BGCHRBank2 = this.toTypedArray(second[j++], "uint8");
    this.haltPostClocks = second[j++];
    this.interruptsRequested = second[j++];
    this.interruptsEnabled = second[j++];
    this.checkIRQMatching();
    this.remainingClocks = second[j++];
    this.colorizedGBPalettes = second[j++];
    this.backgroundY = second[j++];
    this.backgroundX = second[j++];
    this.CPUStopped = second[j];
    /** @type {boolean} */
    this.fromSaveState = true;
    this.TICKTable = this.toTypedArray(this.TICKTable, "uint8");
    this.SecondaryTICKTable = this.toTypedArray(this.SecondaryTICKTable, "uint8");
    this.initializeReferencesFromSaveState();
    this.memoryReadJumpCompile();
    this.memoryWriteJumpCompile();
    this.initLCD();
    this.initSound();
    this.noiseSampleTable = this.channel4BitRange == 32767 ? this.LSFR15Table : this.LSFR7Table;
    /** @type {number} */
    this.channel4VolumeShifter = this.channel4BitRange == 32767 ? 15 : 7;
};
/**
 * @return {undefined}
 */
GameBoyCore.prototype.returnFromRTCState = function() {
    if (typeof this.openRTC == "function" && this.cTIMER) {
        var second = this.openRTC(this.name);
        /** @type {number} */
        var j = 0;
        this.lastIteration = second[j++];
        this.RTCisLatched = second[j++];
        this.latchedSeconds = second[j++];
        this.latchedMinutes = second[j++];
        this.latchedHours = second[j++];
        this.latchedLDays = second[j++];
        this.latchedHDays = second[j++];
        this.RTCSeconds = second[j++];
        this.RTCMinutes = second[j++];
        this.RTCHours = second[j++];
        this.RTCDays = second[j++];
        this.RTCDayOverFlow = second[j++];
        this.RTCHALT = second[j];
    }
};
/**
 * @return {undefined}
 */
GameBoyCore.prototype.start = function() {
    this.initMemory();
    this.ROMLoad();
    this.initLCD();
    this.initSound();
    this.run();
};
/**
 * @return {undefined}
 */
GameBoyCore.prototype.initMemory = function() {
    this.memory = this.getTypedArray(65536, 0, "uint8");
    this.frameBuffer = this.getTypedArray(23040, 16316664, "int32");
    this.BGCHRBank1 = this.getTypedArray(2048, 0, "uint8");
    this.TICKTable = this.toTypedArray(this.TICKTable, "uint8");
    this.SecondaryTICKTable = this.toTypedArray(this.SecondaryTICKTable, "uint8");
    this.channel3PCM = this.getTypedArray(32, 0, "int8");
};
/**
 * @param {number} opt_attributes
 * @return {?}
 */
GameBoyCore.prototype.generateCacheArray = function(opt_attributes) {
    /** @type {Array} */
    var res = [];
    /** @type {number} */
    var resLength = 0;
    for (;resLength < opt_attributes;) {
        res[resLength++] = this.getTypedArray(64, 0, "uint8");
    }
    return res;
};
/**
 * @return {undefined}
 */
GameBoyCore.prototype.initSkipBootstrap = function() {
    /** @type {number} */
    var hours = 255;
    for (;hours >= 0;) {
        if (hours >= 48 && hours < 64) {
            this.memoryWrite(65280 | hours, this.ffxxDump[hours]);
        } else {
            switch(hours) {
                case 0:
                    ;
                case 1:
                    ;
                case 2:
                    ;
                case 5:
                    ;
                case 7:
                    ;
                case 15:
                    ;
                case 255:
                    this.memoryWrite(65280 | hours, this.ffxxDump[hours]);
                    break;
                default:
                    this.memory[65280 | hours] = this.ffxxDump[hours];
            }
        }
        --hours;
    }
    if (this.cGBC) {
        /** @type {number} */
        this.memory[65388] = 254;
        /** @type {number} */
        this.memory[65396] = 254;
    } else {
        /** @type {number} */
        this.memory[65352] = 255;
        /** @type {number} */
        this.memory[65353] = 255;
        /** @type {number} */
        this.memory[65388] = 255;
        /** @type {number} */
        this.memory[65396] = 255;
    }
    cout("Starting without the GBC boot ROM.", 0);
    /** @type {number} */
    this.registerA = this.cGBC ? 17 : 1;
    /** @type {number} */
    this.registerB = 0;
    /** @type {number} */
    this.registerC = 19;
    /** @type {number} */
    this.registerD = 0;
    /** @type {number} */
    this.registerE = 216;
    /** @type {boolean} */
    this.FZero = true;
    /** @type {boolean} */
    this.FSubtract = false;
    /** @type {boolean} */
    this.FHalfCarry = true;
    /** @type {boolean} */
    this.FCarry = true;
    /** @type {number} */
    this.registersHL = 333;
    this.LCDCONTROL = this.LINECONTROL;
    /** @type {boolean} */
    this.IME = false;
    /** @type {number} */
    this.IRQLineMatched = 0;
    /** @type {number} */
    this.interruptsRequested = 225;
    /** @type {number} */
    this.interruptsEnabled = 0;
    /** @type {boolean} */
    this.hdmaRunning = false;
    /** @type {number} */
    this.CPUTicks = 12;
    /** @type {number} */
    this.STATTracker = 0;
    /** @type {number} */
    this.modeSTAT = 1;
    /** @type {number} */
    this.spriteCount = 252;
    /** @type {boolean} */
    this.LYCMatchTriggerSTAT = false;
    /** @type {boolean} */
    this.mode2TriggerSTAT = false;
    /** @type {boolean} */
    this.mode1TriggerSTAT = false;
    /** @type {boolean} */
    this.mode0TriggerSTAT = false;
    /** @type {boolean} */
    this.LCDisOn = true;
    /** @type {number} */
    this.channel1FrequencyTracker = 8192;
    /** @type {number} */
    this.channel1DutyTracker = 0;
    this.channel1CachedDuty = this.dutyLookup[2];
    /** @type {number} */
    this.channel1totalLength = 0;
    /** @type {number} */
    this.channel1envelopeVolume = 0;
    /** @type {boolean} */
    this.channel1envelopeType = false;
    /** @type {number} */
    this.channel1envelopeSweeps = 0;
    /** @type {number} */
    this.channel1envelopeSweepsLast = 0;
    /** @type {boolean} */
    this.channel1consecutive = true;
    /** @type {number} */
    this.channel1frequency = 1985;
    /** @type {boolean} */
    this.channel1SweepFault = true;
    /** @type {number} */
    this.channel1ShadowFrequency = 1985;
    /** @type {number} */
    this.channel1timeSweep = 1;
    /** @type {number} */
    this.channel1lastTimeSweep = 0;
    /** @type {number} */
    this.channel1numSweep = 0;
    /** @type {number} */
    this.channel1frequencySweepDivider = 0;
    /** @type {boolean} */
    this.channel1decreaseSweep = false;
    /** @type {number} */
    this.channel2FrequencyTracker = 8192;
    /** @type {number} */
    this.channel2DutyTracker = 0;
    this.channel2CachedDuty = this.dutyLookup[2];
    /** @type {number} */
    this.channel2totalLength = 0;
    /** @type {number} */
    this.channel2envelopeVolume = 0;
    /** @type {boolean} */
    this.channel2envelopeType = false;
    /** @type {number} */
    this.channel2envelopeSweeps = 0;
    /** @type {number} */
    this.channel2envelopeSweepsLast = 0;
    /** @type {boolean} */
    this.channel2consecutive = true;
    /** @type {number} */
    this.channel2frequency = 0;
    /** @type {boolean} */
    this.channel3canPlay = false;
    /** @type {number} */
    this.channel3totalLength = 0;
    /** @type {number} */
    this.channel3patternType = 4;
    /** @type {number} */
    this.channel3frequency = 0;
    /** @type {boolean} */
    this.channel3consecutive = true;
    /** @type {number} */
    this.channel3Counter = 1048;
    /** @type {number} */
    this.channel4FrequencyPeriod = 8;
    /** @type {number} */
    this.channel4totalLength = 0;
    /** @type {number} */
    this.channel4envelopeVolume = 0;
    /** @type {number} */
    this.channel4currentVolume = 0;
    /** @type {boolean} */
    this.channel4envelopeType = false;
    /** @type {number} */
    this.channel4envelopeSweeps = 0;
    /** @type {number} */
    this.channel4envelopeSweepsLast = 0;
    /** @type {boolean} */
    this.channel4consecutive = true;
    /** @type {number} */
    this.channel4BitRange = 32767;
    /** @type {number} */
    this.channel4VolumeShifter = 15;
    /** @type {number} */
    this.channel1FrequencyCounter = 512;
    /** @type {number} */
    this.channel2FrequencyCounter = 512;
    /** @type {number} */
    this.channel3Counter = 2048;
    /** @type {number} */
    this.channel3FrequencyPeriod = 2048;
    /** @type {number} */
    this.channel3lastSampleLookup = 0;
    /** @type {number} */
    this.channel4lastSampleLookup = 0;
    /** @type {number} */
    this.VinLeftChannelMasterVolume = 1;
    /** @type {number} */
    this.VinRightChannelMasterVolume = 1;
    /** @type {boolean} */
    this.soundMasterEnabled = true;
    /** @type {boolean} */
    this.leftChannel1 = true;
    /** @type {boolean} */
    this.leftChannel2 = true;
    /** @type {boolean} */
    this.leftChannel3 = true;
    /** @type {boolean} */
    this.leftChannel4 = true;
    /** @type {boolean} */
    this.rightChannel1 = true;
    /** @type {boolean} */
    this.rightChannel2 = true;
    /** @type {boolean} */
    this.rightChannel3 = false;
    /** @type {boolean} */
    this.rightChannel4 = false;
    /** @type {number} */
    this.DIVTicks = 27044;
    /** @type {number} */
    this.LCDTicks = 160;
    /** @type {number} */
    this.timerTicks = 0;
    /** @type {boolean} */
    this.TIMAEnabled = false;
    /** @type {number} */
    this.TACClocker = 1024;
    /** @type {number} */
    this.serialTimer = 0;
    /** @type {number} */
    this.serialShiftTimer = 0;
    /** @type {number} */
    this.serialShiftTimerAllocated = 0;
    /** @type {number} */
    this.IRQEnableDelay = 0;
    /** @type {number} */
    this.actualScanLine = 144;
    /** @type {number} */
    this.lastUnrenderedLine = 0;
    /** @type {boolean} */
    this.gfxWindowDisplay = false;
    /** @type {boolean} */
    this.gfxSpriteShow = false;
    /** @type {boolean} */
    this.gfxSpriteNormalHeight = true;
    /** @type {boolean} */
    this.bgEnabled = true;
    /** @type {boolean} */
    this.BGPriorityEnabled = true;
    /** @type {number} */
    this.gfxWindowCHRBankPosition = 0;
    /** @type {number} */
    this.gfxBackgroundCHRBankPosition = 0;
    /** @type {number} */
    this.gfxBackgroundBankOffset = 0;
    /** @type {number} */
    this.windowY = 0;
    /** @type {number} */
    this.windowX = 0;
    /** @type {number} */
    this.drewBlank = 0;
    /** @type {number} */
    this.midScanlineOffset = -1;
    /** @type {number} */
    this.currentX = 0;
};
/**
 * @return {undefined}
 */
GameBoyCore.prototype.initBootstrap = function() {
    cout("Starting the selected boot ROM.", 0);
    /** @type {number} */
    this.programCounter = 0;
    /** @type {number} */
    this.stackPointer = 0;
    /** @type {boolean} */
    this.IME = false;
    /** @type {number} */
    this.LCDTicks = 0;
    /** @type {number} */
    this.DIVTicks = 0;
    /** @type {number} */
    this.registerA = 0;
    /** @type {number} */
    this.registerB = 0;
    /** @type {number} */
    this.registerC = 0;
    /** @type {number} */
    this.registerD = 0;
    /** @type {number} */
    this.registerE = 0;
    /** @type {boolean} */
    this.FZero = this.FSubtract = this.FHalfCarry = this.FCarry = false;
    /** @type {number} */
    this.registersHL = 0;
    /** @type {boolean} */
    this.leftChannel1 = false;
    /** @type {boolean} */
    this.leftChannel2 = false;
    /** @type {boolean} */
    this.leftChannel3 = false;
    /** @type {boolean} */
    this.leftChannel4 = false;
    /** @type {boolean} */
    this.rightChannel1 = false;
    /** @type {boolean} */
    this.rightChannel2 = false;
    /** @type {boolean} */
    this.rightChannel3 = false;
    /** @type {boolean} */
    this.rightChannel4 = false;
    /** @type {number} */
    this.channel2frequency = this.channel1frequency = 0;
    /** @type {boolean} */
    this.channel4consecutive = this.channel2consecutive = this.channel1consecutive = false;
    /** @type {number} */
    this.VinLeftChannelMasterVolume = 8;
    /** @type {number} */
    this.VinRightChannelMasterVolume = 8;
    /** @type {number} */
    this.memory[65280] = 15;
};
/**
 * @return {undefined}
 */
GameBoyCore.prototype.ROMLoad = function() {
    /** @type {Array} */
    this.ROM = [];
    this.usedBootROM = settings[1];
    var padLength = this.ROMImage.length;
    if (padLength < 16384) {
        throw new Error("ROM image size too small.");
    }
    this.ROM = this.getTypedArray(padLength, 0, "uint8");
    /** @type {number} */
    var i = 0;
    if (this.usedBootROM) {
        if (!settings[11]) {
            for (;i < 256;++i) {
                this.memory[i] = this.GBCBOOTROM[i];
                /** @type {number} */
                this.ROM[i] = this.ROMImage.charCodeAt(i) & 255;
            }
            for (;i < 512;++i) {
                /** @type {number} */
                this.memory[i] = this.ROM[i] = this.ROMImage.charCodeAt(i) & 255;
            }
            for (;i < 2304;++i) {
                this.memory[i] = this.GBCBOOTROM[i - 256];
                /** @type {number} */
                this.ROM[i] = this.ROMImage.charCodeAt(i) & 255;
            }
            /** @type {boolean} */
            this.usedGBCBootROM = true;
        } else {
            for (;i < 256;++i) {
                this.memory[i] = this.GBBOOTROM[i];
                /** @type {number} */
                this.ROM[i] = this.ROMImage.charCodeAt(i) & 255;
            }
        }
        for (;i < 16384;++i) {
            /** @type {number} */
            this.memory[i] = this.ROM[i] = this.ROMImage.charCodeAt(i) & 255;
        }
    } else {
        for (;i < 16384;++i) {
            /** @type {number} */
            this.memory[i] = this.ROM[i] = this.ROMImage.charCodeAt(i) & 255;
        }
    }
    for (;i < padLength;++i) {
        /** @type {number} */
        this.ROM[i] = this.ROMImage.charCodeAt(i) & 255;
    }
    /** @type {number} */
    this.ROMBankEdge = Math.floor(this.ROM.length / 16384);
    this.interpretCartridge();
    this.checkIRQMatching();
};
/**
 * @return {?}
 */
GameBoyCore.prototype.getROMImage = function() {
    if (this.ROMImage.length > 0) {
        return this.ROMImage.length;
    }
    var valuesLen = this.ROM.length;
    /** @type {number} */
    var i = 0;
    for (;i < valuesLen;i++) {
        this.ROMImage += String.fromCharCode(this.ROM[i]);
    }
    return this.ROMImage;
};
/**
 * @return {undefined}
 */
GameBoyCore.prototype.interpretCartridge = function() {
    /** @type {number} */
    var z = 308;
    for (;z < 319;z++) {
        if (this.ROMImage.charCodeAt(z) > 0) {
            this.name += this.ROMImage[z];
        }
    }
    /** @type {number} */
    z = 319;
    for (;z < 323;z++) {
        if (this.ROMImage.charCodeAt(z) > 0) {
            this.gameCode += this.ROMImage[z];
        }
    }
    cout("Game Title: " + this.name + "[" + this.gameCode + "][" + this.ROMImage[323] + "]", 0);
    cout("Game Code: " + this.gameCode, 0);
    this.cartridgeType = this.ROM[327];
    cout("Cartridge type #" + this.cartridgeType, 0);
    /** @type {string} */
    var optsData = "";
    switch(this.cartridgeType) {
        case 0:
            if (!settings[9]) {
                /** @type {string} */
                optsData = "ROM";
                break;
            }
            ;
        case 1:
            /** @type {boolean} */
            this.cMBC1 = true;
            /** @type {string} */
            optsData = "MBC1";
            break;
        case 2:
            /** @type {boolean} */
            this.cMBC1 = true;
            /** @type {boolean} */
            this.cSRAM = true;
            /** @type {string} */
            optsData = "MBC1 + SRAM";
            break;
        case 3:
            /** @type {boolean} */
            this.cMBC1 = true;
            /** @type {boolean} */
            this.cSRAM = true;
            /** @type {boolean} */
            this.cBATT = true;
            /** @type {string} */
            optsData = "MBC1 + SRAM + BATT";
            break;
        case 5:
            /** @type {boolean} */
            this.cMBC2 = true;
            /** @type {string} */
            optsData = "MBC2";
            break;
        case 6:
            /** @type {boolean} */
            this.cMBC2 = true;
            /** @type {boolean} */
            this.cBATT = true;
            /** @type {string} */
            optsData = "MBC2 + BATT";
            break;
        case 8:
            /** @type {boolean} */
            this.cSRAM = true;
            /** @type {string} */
            optsData = "ROM + SRAM";
            break;
        case 9:
            /** @type {boolean} */
            this.cSRAM = true;
            /** @type {boolean} */
            this.cBATT = true;
            /** @type {string} */
            optsData = "ROM + SRAM + BATT";
            break;
        case 11:
            /** @type {boolean} */
            this.cMMMO1 = true;
            /** @type {string} */
            optsData = "MMMO1";
            break;
        case 12:
            /** @type {boolean} */
            this.cMMMO1 = true;
            /** @type {boolean} */
            this.cSRAM = true;
            /** @type {string} */
            optsData = "MMMO1 + SRAM";
            break;
        case 13:
            /** @type {boolean} */
            this.cMMMO1 = true;
            /** @type {boolean} */
            this.cSRAM = true;
            /** @type {boolean} */
            this.cBATT = true;
            /** @type {string} */
            optsData = "MMMO1 + SRAM + BATT";
            break;
        case 15:
            /** @type {boolean} */
            this.cMBC3 = true;
            /** @type {boolean} */
            this.cTIMER = true;
            /** @type {boolean} */
            this.cBATT = true;
            /** @type {string} */
            optsData = "MBC3 + TIMER + BATT";
            break;
        case 16:
            /** @type {boolean} */
            this.cMBC3 = true;
            /** @type {boolean} */
            this.cTIMER = true;
            /** @type {boolean} */
            this.cBATT = true;
            /** @type {boolean} */
            this.cSRAM = true;
            /** @type {string} */
            optsData = "MBC3 + TIMER + BATT + SRAM";
            break;
        case 17:
            /** @type {boolean} */
            this.cMBC3 = true;
            /** @type {string} */
            optsData = "MBC3";
            break;
        case 18:
            /** @type {boolean} */
            this.cMBC3 = true;
            /** @type {boolean} */
            this.cSRAM = true;
            /** @type {string} */
            optsData = "MBC3 + SRAM";
            break;
        case 19:
            /** @type {boolean} */
            this.cMBC3 = true;
            /** @type {boolean} */
            this.cSRAM = true;
            /** @type {boolean} */
            this.cBATT = true;
            /** @type {string} */
            optsData = "MBC3 + SRAM + BATT";
            break;
        case 25:
            /** @type {boolean} */
            this.cMBC5 = true;
            /** @type {string} */
            optsData = "MBC5";
            break;
        case 26:
            /** @type {boolean} */
            this.cMBC5 = true;
            /** @type {boolean} */
            this.cSRAM = true;
            /** @type {string} */
            optsData = "MBC5 + SRAM";
            break;
        case 27:
            /** @type {boolean} */
            this.cMBC5 = true;
            /** @type {boolean} */
            this.cSRAM = true;
            /** @type {boolean} */
            this.cBATT = true;
            /** @type {string} */
            optsData = "MBC5 + SRAM + BATT";
            break;
        case 28:
            /** @type {boolean} */
            this.cRUMBLE = true;
            /** @type {string} */
            optsData = "RUMBLE";
            break;
        case 29:
            /** @type {boolean} */
            this.cRUMBLE = true;
            /** @type {boolean} */
            this.cSRAM = true;
            /** @type {string} */
            optsData = "RUMBLE + SRAM";
            break;
        case 30:
            /** @type {boolean} */
            this.cRUMBLE = true;
            /** @type {boolean} */
            this.cSRAM = true;
            /** @type {boolean} */
            this.cBATT = true;
            /** @type {string} */
            optsData = "RUMBLE + SRAM + BATT";
            break;
        case 31:
            /** @type {boolean} */
            this.cCamera = true;
            /** @type {string} */
            optsData = "GameBoy Camera";
            break;
        case 34:
            /** @type {boolean} */
            this.cMBC7 = true;
            /** @type {boolean} */
            this.cSRAM = true;
            /** @type {boolean} */
            this.cBATT = true;
            /** @type {string} */
            optsData = "MBC7 + SRAM + BATT";
            break;
        case 253:
            /** @type {boolean} */
            this.cTAMA5 = true;
            /** @type {string} */
            optsData = "TAMA5";
            break;
        case 254:
            /** @type {boolean} */
            this.cHuC3 = true;
            /** @type {string} */
            optsData = "HuC3";
            break;
        case 255:
            /** @type {boolean} */
            this.cHuC1 = true;
            /** @type {string} */
            optsData = "HuC1";
            break;
        default:
            /** @type {string} */
            optsData = "Unknown";
            cout("Cartridge type is unknown.", 2);
            pause();
    }
    cout("Cartridge Type: " + optsData + ".", 0);
    this.numROMBanks = this.ROMBanks[this.ROM[328]];
    cout(this.numROMBanks + " ROM banks.", 0);
    switch(this.RAMBanks[this.ROM[329]]) {
        case 0:
            cout("No RAM banking requested for allocation or MBC is of type 2.", 0);
            break;
        case 2:
            cout("1 RAM bank requested for allocation.", 0);
            break;
        case 3:
            cout("4 RAM banks requested for allocation.", 0);
            break;
        case 4:
            cout("16 RAM banks requested for allocation.", 0);
            break;
        default:
            cout("RAM bank amount requested is unknown, will use maximum allowed by specified MBC type.", 0);
    }
    if (!this.usedBootROM) {
        switch(this.ROM[323]) {
            case 0:
                /** @type {boolean} */
                this.cGBC = false;
                cout("Only GB mode detected.", 0);
                break;
            case 50:
                if (!settings[2] && this.name + this.gameCode + this.ROM[323] == "Game and Watch 50") {
                    /** @type {boolean} */
                    this.cGBC = true;
                    cout("Created a boot exception for Game and Watch Gallery 2 (GBC ID byte is wrong on the cartridge).", 1);
                } else {
                    /** @type {boolean} */
                    this.cGBC = false;
                }
                break;
            case 128:
                /** @type {boolean} */
                this.cGBC = !settings[2];
                cout("GB and GBC mode detected.", 0);
                break;
            case 192:
                /** @type {boolean} */
                this.cGBC = true;
                cout("Only GBC mode detected.", 0);
                break;
            default:
                /** @type {boolean} */
                this.cGBC = false;
                cout("Unknown GameBoy game type code #" + this.ROM[323] + ", defaulting to GB mode (Old games don't have a type code).", 1);
        }
        /** @type {boolean} */
        this.inBootstrap = false;
        this.setupRAM();
        this.initSkipBootstrap();
        this.initializeAudioStartState();
    } else {
        this.cGBC = this.usedGBCBootROM;
        this.setupRAM();
        this.initBootstrap();
    }
    this.initializeModeSpecificArrays();
    var state_suffix = this.ROM[331];
    /** @type {number} */
    var cNewLicense = this.ROM[324] & 65280 | this.ROM[325] & 255;
    if (state_suffix != 51) {
        cout("Old style license code: " + state_suffix, 0);
    } else {
        cout("New style license code: " + cNewLicense, 0);
    }
    /** @type {string} */
    this.ROMImage = "";
};
/**
 * @return {undefined}
 */
GameBoyCore.prototype.disableBootROM = function() {
    /** @type {number} */
    var identifier = 0;
    for (;identifier < 256;++identifier) {
        this.memory[identifier] = this.ROM[identifier];
    }
    if (this.usedGBCBootROM) {
        /** @type {number} */
        identifier = 512;
        for (;identifier < 2304;++identifier) {
            this.memory[identifier] = this.ROM[identifier];
        }
        if (!this.cGBC) {
            this.GBCtoGBModeAdjust();
        } else {
            this.recompileBootIOWriteHandling();
        }
    } else {
        this.recompileBootIOWriteHandling();
    }
};
/**
 * @return {undefined}
 */
GameBoyCore.prototype.initializeTiming = function() {
    /** @type {number} */
    this.baseCPUCyclesPerIteration = 524288 / 125 * settings[6];
    /** @type {number} */
    this.CPUCyclesTotalRoundoff = this.baseCPUCyclesPerIteration % 4;
    /** @type {number} */
    this.CPUCyclesTotalBase = this.CPUCyclesTotal = this.baseCPUCyclesPerIteration - this.CPUCyclesTotalRoundoff | 0;
    /** @type {number} */
    this.CPUCyclesTotalCurrent = 0;
};
/**
 * @return {undefined}
 */
GameBoyCore.prototype.setupRAM = function() {
    if (this.cMBC2) {
        /** @type {number} */
        this.numRAMBanks = 1 / 16;
    } else {
        if (this.cMBC1 || (this.cRUMBLE || (this.cMBC3 || this.cHuC3))) {
            /** @type {number} */
            this.numRAMBanks = 4;
        } else {
            if (this.cMBC5) {
                /** @type {number} */
                this.numRAMBanks = 16;
            } else {
                if (this.cSRAM) {
                    /** @type {number} */
                    this.numRAMBanks = 1;
                }
            }
        }
    }
    if (this.numRAMBanks > 0) {
        if (!this.MBCRAMUtilized()) {
            /** @type {boolean} */
            this.MBCRAMBanksEnabled = true;
        }
        var destElements = typeof this.openMBC == "function" ? this.openMBC(this.name) : [];
        if (destElements.length > 0) {
            this.MBCRam = this.toTypedArray(destElements, "uint8");
        } else {
            this.MBCRam = this.getTypedArray(this.numRAMBanks * 8192, 0, "uint8");
        }
    }
    cout("Actual bytes of MBC RAM allocated: " + this.numRAMBanks * 8192, 0);
    this.returnFromRTCState();
    if (this.cGBC) {
        this.VRAM = this.getTypedArray(8192, 0, "uint8");
        this.GBCMemory = this.getTypedArray(28672, 0, "uint8");
    }
    this.memoryReadJumpCompile();
    this.memoryWriteJumpCompile();
};
/**
 * @return {?}
 */
GameBoyCore.prototype.MBCRAMUtilized = function() {
    return this.cMBC1 || (this.cMBC2 || (this.cMBC3 || (this.cMBC5 || (this.cMBC7 || this.cRUMBLE))));
};
/**
 * @return {undefined}
 */
GameBoyCore.prototype.recomputeDimension = function() {
    initNewCanvas();
    this.onscreenWidth = this.canvas.width;
    this.onscreenHeight = this.canvas.height;
    if (GameBoyWindow && GameBoyWindow.mozRequestAnimationFrame) {
        this.canvas.width = this.onscreenWidth = !settings[12] ? 160 : this.canvas.width;
        this.canvas.height = this.onscreenHeight = !settings[12] ? 144 : this.canvas.height;
    } else {
        this.onscreenWidth = this.canvas.width;
        this.onscreenHeight = this.canvas.height;
    }
    this.offscreenWidth = !settings[12] ? 160 : this.canvas.width;
    this.offscreenHeight = !settings[12] ? 144 : this.canvas.height;
    /** @type {number} */
    this.offscreenRGBCount = this.offscreenWidth * this.offscreenHeight * 4;
};
/**
 * @return {undefined}
 */
GameBoyCore.prototype.initLCD = function() {
    this.recomputeDimension();
    if (this.offscreenRGBCount != 92160) {
        this.compileResizeFrameBufferFunction();
    } else {
        /** @type {null} */
        this.resizer = null;
    }
    try {
        this.canvasOffscreen = new GameBoyCanvas;
        this.canvasOffscreen.width = this.offscreenWidth;
        this.canvasOffscreen.height = this.offscreenHeight;
        this.drawContextOffscreen = this.canvasOffscreen.getContext("2d");
        this.drawContextOnscreen = this.canvas.getContext("2d");
        try {
            this.canvasBuffer = this.drawContextOffscreen.createImageData(this.offscreenWidth, this.offscreenHeight);
        } catch (er) {
            cout('Falling back to the getImageData initialization (Error "' + er.message + '").', 1);
            this.canvasBuffer = this.drawContextOffscreen.getImageData(0, 0, this.offscreenWidth, this.offscreenHeight);
        }
        var index = this.offscreenRGBCount;
        for (;index > 0;) {
            /** @type {number} */
            this.canvasBuffer.data[index -= 4] = 248;
            /** @type {number} */
            this.canvasBuffer.data[index + 1] = 248;
            /** @type {number} */
            this.canvasBuffer.data[index + 2] = 248;
            /** @type {number} */
            this.canvasBuffer.data[index + 3] = 255;
        }
        this.graphicsBlit();
        /** @type {string} */
        this.canvas.style.visibility = "visible";
        if (this.swizzledFrame == null) {
            this.swizzledFrame = this.getTypedArray(69120, 255, "uint8");
        }
        /** @type {boolean} */
        this.drewFrame = true;
        this.requestDraw();
    } catch (ex) {
        throw new Error("HTML5 Canvas support required: " + ex.message + "file: " + ex.fileName + ", line: " + ex.lineNumber);
    }
};
/**
 * @return {undefined}
 */
GameBoyCore.prototype.graphicsBlit = function() {
    if (this.offscreenWidth == this.onscreenWidth && this.offscreenHeight == this.onscreenHeight) {
        this.drawContextOnscreen.putImageData(this.canvasBuffer, 0, 0);
    } else {
        this.drawContextOffscreen.putImageData(this.canvasBuffer, 0, 0);
        this.drawContextOnscreen.drawImage(this.canvasOffscreen, 0, 0, this.onscreenWidth, this.onscreenHeight);
    }
};
/**
 * @param {number} keycode
 * @param {boolean} recurring
 * @return {undefined}
 */
GameBoyCore.prototype.JoyPadEvent = function(keycode, recurring) {
    if (recurring) {
        this.JoyPad &= 255 ^ 1 << keycode;
        if (!this.cGBC && (!this.usedBootROM || !this.usedGBCBootROM)) {
            this.interruptsRequested |= 16;
            /** @type {number} */
            this.remainingClocks = 0;
            this.checkIRQMatching();
        }
    } else {
        this.JoyPad |= 1 << keycode;
    }
    /** @type {number} */
    this.memory[65280] = (this.memory[65280] & 48) + (((this.memory[65280] & 32) == 0 ? this.JoyPad >> 4 : 15) & ((this.memory[65280] & 16) == 0 ? this.JoyPad & 15 : 15));
    /** @type {boolean} */
    this.CPUStopped = false;
};
/**
 * @param {number} dataAndEvents
 * @param {number} deepDataAndEvents
 * @return {undefined}
 */
GameBoyCore.prototype.GyroEvent = function(dataAndEvents, deepDataAndEvents) {
    dataAndEvents *= -100;
    dataAndEvents += 2047;
    /** @type {number} */
    this.highX = dataAndEvents >> 8;
    /** @type {number} */
    this.lowX = dataAndEvents & 255;
    deepDataAndEvents *= -100;
    deepDataAndEvents += 2047;
    /** @type {number} */
    this.highY = deepDataAndEvents >> 8;
    /** @type {number} */
    this.lowY = deepDataAndEvents & 255;
};
/**
 * @return {undefined}
 */
GameBoyCore.prototype.initSound = function() {
    /** @type {number} */
    this.sampleSize = 4194304 / 1E3 * settings[6];
    this.machineOut = settings[13];
    if (settings[0]) {
        try {
            var parentObj = this;
            this.audioHandle = new XAudioServer(2, 4194304 / settings[13], 0, Math.max(this.sampleSize * settings[8] / settings[13], 8192) << 1, null, settings[14]);
            this.initAudioBuffer();
        } catch (ex) {
            cout("Audio system cannot run: " + ex.message, 2);
            /** @type {boolean} */
            settings[0] = false;
        }
    } else {
        if (this.audioHandle) {
            try {
                this.audioHandle.changeVolume(0);
            } catch (error) {
            }
        }
    }
};
/**
 * @return {undefined}
 */
GameBoyCore.prototype.changeVolume = function() {
    if (settings[0] && this.audioHandle) {
        try {
            this.audioHandle.changeVolume(settings[14]);
        } catch (error) {
        }
    }
};
/**
 * @return {undefined}
 */
GameBoyCore.prototype.initAudioBuffer = function() {
    /** @type {number} */
    this.audioIndex = 0;
    /** @type {number} */
    this.bufferContainAmount = Math.max(this.sampleSize * settings[7] / settings[13], 4096) << 1;
    /** @type {number} */
    this.numSamplesTotal = this.sampleSize - this.sampleSize % settings[13] | 0;
    this.currentBuffer = this.getTypedArray(this.numSamplesTotal, 61680, "int32");
    this.secondaryBuffer = this.getTypedArray((this.numSamplesTotal << 1) / settings[13], 0, "float32");
};
/**
 * @return {undefined}
 */
GameBoyCore.prototype.intializeWhiteNoise = function() {
    /** @type {number} */
    var randomFactor = 1;
    this.LSFR15Table = this.getTypedArray(524288, 0, "int8");
    /** @type {number} */
    var LSFR = 32767;
    /** @type {number} */
    var LSFRShifted = 16383;
    /** @type {number} */
    var index = 0;
    for (;index < 32768;++index) {
        /** @type {number} */
        randomFactor = 1 - (LSFR & 1);
        /** @type {number} */
        this.LSFR15Table[32768 | index] = randomFactor;
        /** @type {number} */
        this.LSFR15Table[65536 | index] = randomFactor * 2;
        /** @type {number} */
        this.LSFR15Table[98304 | index] = randomFactor * 3;
        /** @type {number} */
        this.LSFR15Table[131072 | index] = randomFactor * 4;
        /** @type {number} */
        this.LSFR15Table[163840 | index] = randomFactor * 5;
        /** @type {number} */
        this.LSFR15Table[196608 | index] = randomFactor * 6;
        /** @type {number} */
        this.LSFR15Table[229376 | index] = randomFactor * 7;
        /** @type {number} */
        this.LSFR15Table[262144 | index] = randomFactor * 8;
        /** @type {number} */
        this.LSFR15Table[294912 | index] = randomFactor * 9;
        /** @type {number} */
        this.LSFR15Table[327680 | index] = randomFactor * 10;
        /** @type {number} */
        this.LSFR15Table[360448 | index] = randomFactor * 11;
        /** @type {number} */
        this.LSFR15Table[393216 | index] = randomFactor * 12;
        /** @type {number} */
        this.LSFR15Table[425984 | index] = randomFactor * 13;
        /** @type {number} */
        this.LSFR15Table[458752 | index] = randomFactor * 14;
        /** @type {number} */
        this.LSFR15Table[491520 | index] = randomFactor * 15;
        /** @type {number} */
        LSFRShifted = LSFR >> 1;
        /** @type {number} */
        LSFR = LSFRShifted | ((LSFRShifted ^ LSFR) & 1) << 14;
    }
    this.LSFR7Table = this.getTypedArray(2048, 0, "int8");
    /** @type {number} */
    LSFR = 127;
    /** @type {number} */
    index = 0;
    for (;index < 128;++index) {
        /** @type {number} */
        randomFactor = 1 - (LSFR & 1);
        /** @type {number} */
        this.LSFR7Table[128 | index] = randomFactor;
        /** @type {number} */
        this.LSFR7Table[256 | index] = randomFactor * 2;
        /** @type {number} */
        this.LSFR7Table[384 | index] = randomFactor * 3;
        /** @type {number} */
        this.LSFR7Table[512 | index] = randomFactor * 4;
        /** @type {number} */
        this.LSFR7Table[640 | index] = randomFactor * 5;
        /** @type {number} */
        this.LSFR7Table[768 | index] = randomFactor * 6;
        /** @type {number} */
        this.LSFR7Table[896 | index] = randomFactor * 7;
        /** @type {number} */
        this.LSFR7Table[1024 | index] = randomFactor * 8;
        /** @type {number} */
        this.LSFR7Table[1152 | index] = randomFactor * 9;
        /** @type {number} */
        this.LSFR7Table[1280 | index] = randomFactor * 10;
        /** @type {number} */
        this.LSFR7Table[1408 | index] = randomFactor * 11;
        /** @type {number} */
        this.LSFR7Table[1536 | index] = randomFactor * 12;
        /** @type {number} */
        this.LSFR7Table[1664 | index] = randomFactor * 13;
        /** @type {number} */
        this.LSFR7Table[1792 | index] = randomFactor * 14;
        /** @type {number} */
        this.LSFR7Table[1920 | index] = randomFactor * 15;
        /** @type {number} */
        LSFRShifted = LSFR >> 1;
        /** @type {number} */
        LSFR = LSFRShifted | ((LSFRShifted ^ LSFR) & 1) << 6;
    }
    if (!this.noiseSampleTable && this.memory.length == 65536) {
        this.noiseSampleTable = (this.memory[65314] & 8) == 8 ? this.LSFR7Table : this.LSFR15Table;
    }
};
/**
 * @return {undefined}
 */
GameBoyCore.prototype.audioUnderrunAdjustment = function() {
    if (settings[0]) {
        /** @type {number} */
        var bufferContainAmount = this.bufferContainAmount - this.audioHandle.remainingBuffer();
        if (bufferContainAmount > 0) {
            this.CPUCyclesTotalCurrent += (bufferContainAmount >> 1) * this.machineOut;
            this.recalculateIterationClockLimit();
        }
    }
};
/**
 * @return {undefined}
 */
GameBoyCore.prototype.initializeAudioStartState = function() {
    /** @type {number} */
    this.channel1FrequencyTracker = 8192;
    /** @type {number} */
    this.channel1DutyTracker = 0;
    this.channel1CachedDuty = this.dutyLookup[2];
    /** @type {number} */
    this.channel1totalLength = 0;
    /** @type {number} */
    this.channel1envelopeVolume = 0;
    /** @type {boolean} */
    this.channel1envelopeType = false;
    /** @type {number} */
    this.channel1envelopeSweeps = 0;
    /** @type {number} */
    this.channel1envelopeSweepsLast = 0;
    /** @type {boolean} */
    this.channel1consecutive = true;
    /** @type {number} */
    this.channel1frequency = 0;
    /** @type {boolean} */
    this.channel1SweepFault = false;
    /** @type {number} */
    this.channel1ShadowFrequency = 0;
    /** @type {number} */
    this.channel1timeSweep = 1;
    /** @type {number} */
    this.channel1lastTimeSweep = 0;
    /** @type {number} */
    this.channel1numSweep = 0;
    /** @type {number} */
    this.channel1frequencySweepDivider = 0;
    /** @type {boolean} */
    this.channel1decreaseSweep = false;
    /** @type {number} */
    this.channel2FrequencyTracker = 8192;
    /** @type {number} */
    this.channel2DutyTracker = 0;
    this.channel2CachedDuty = this.dutyLookup[2];
    /** @type {number} */
    this.channel2totalLength = 0;
    /** @type {number} */
    this.channel2envelopeVolume = 0;
    /** @type {boolean} */
    this.channel2envelopeType = false;
    /** @type {number} */
    this.channel2envelopeSweeps = 0;
    /** @type {number} */
    this.channel2envelopeSweepsLast = 0;
    /** @type {boolean} */
    this.channel2consecutive = true;
    /** @type {number} */
    this.channel2frequency = 0;
    /** @type {boolean} */
    this.channel3canPlay = false;
    /** @type {number} */
    this.channel3totalLength = 0;
    /** @type {number} */
    this.channel3patternType = 4;
    /** @type {number} */
    this.channel3frequency = 0;
    /** @type {boolean} */
    this.channel3consecutive = true;
    /** @type {number} */
    this.channel3Counter = 2048;
    /** @type {number} */
    this.channel4FrequencyPeriod = 8;
    /** @type {number} */
    this.channel4totalLength = 0;
    /** @type {number} */
    this.channel4envelopeVolume = 0;
    /** @type {number} */
    this.channel4currentVolume = 0;
    /** @type {boolean} */
    this.channel4envelopeType = false;
    /** @type {number} */
    this.channel4envelopeSweeps = 0;
    /** @type {number} */
    this.channel4envelopeSweepsLast = 0;
    /** @type {boolean} */
    this.channel4consecutive = true;
    /** @type {number} */
    this.channel4BitRange = 32767;
    this.noiseSampleTable = this.LSFR15Table;
    /** @type {number} */
    this.channel4VolumeShifter = 15;
    /** @type {number} */
    this.channel1FrequencyCounter = 8192;
    /** @type {number} */
    this.channel2FrequencyCounter = 8192;
    /** @type {number} */
    this.channel3Counter = 2048;
    /** @type {number} */
    this.channel3FrequencyPeriod = 2048;
    /** @type {number} */
    this.channel3lastSampleLookup = 0;
    /** @type {number} */
    this.channel4lastSampleLookup = 0;
    /** @type {number} */
    this.VinLeftChannelMasterVolume = 8;
    /** @type {number} */
    this.VinRightChannelMasterVolume = 8;
    /** @type {number} */
    this.mixerOutputCache = 0;
    /** @type {number} */
    this.sequencerClocks = 8192;
    /** @type {number} */
    this.sequencePosition = 0;
    /** @type {number} */
    this.channel4FrequencyPeriod = 8;
    /** @type {number} */
    this.channel4Counter = 8;
    /** @type {number} */
    this.cachedChannel3Sample = 0;
    /** @type {number} */
    this.cachedChannel4Sample = 0;
    /** @type {boolean} */
    this.channel1Enabled = false;
    /** @type {boolean} */
    this.channel2Enabled = false;
    /** @type {boolean} */
    this.channel3Enabled = false;
    /** @type {boolean} */
    this.channel4Enabled = false;
    /** @type {boolean} */
    this.channel1canPlay = false;
    /** @type {boolean} */
    this.channel2canPlay = false;
    /** @type {boolean} */
    this.channel4canPlay = false;
    this.channel1OutputLevelCache();
    this.channel2OutputLevelCache();
    this.channel3OutputLevelCache();
    this.channel4OutputLevelCache();
};
/**
 * @return {undefined}
 */
GameBoyCore.prototype.outputAudio = function() {
    /** @type {number} */
    var i = 0;
    /** @type {number} */
    var count = 0;
    /** @type {number} */
    var n = 0;
    /** @type {number} */
    var a = 0;
    /** @type {number} */
    var destinationPosition = 0;
    var padLength = settings[13];
    /** @type {number} */
    var b = padLength * 240;
    /** @type {number} */
    var numSamplesTotal = 0;
    for (;numSamplesTotal < this.numSamplesTotal;) {
        /** @type {number} */
        i = n = a = 0;
        for (;i < padLength;++i) {
            count = this.currentBuffer[numSamplesTotal++];
            n += count >> 9;
            a += count & 511;
        }
        /** @type {number} */
        this.secondaryBuffer[destinationPosition++] = n / b - 1;
        /** @type {number} */
        this.secondaryBuffer[destinationPosition++] = a / b - 1;
    }
    this.audioHandle.writeAudioNoCallback(this.secondaryBuffer);
};
/**
 * @param {number} dataAndEvents
 * @return {undefined}
 */
GameBoyCore.prototype.generateAudio = function(dataAndEvents) {
    if (this.soundMasterEnabled && !this.CPUStopped) {
        /** @type {number} */
        var deepDataAndEvents = 0;
        for (;dataAndEvents > 0;) {
            deepDataAndEvents = dataAndEvents < this.sequencerClocks ? dataAndEvents : this.sequencerClocks;
            this.sequencerClocks -= deepDataAndEvents;
            dataAndEvents -= deepDataAndEvents;
            for (;--deepDataAndEvents > -1;) {
                this.computeAudioChannels();
                this.currentBuffer[this.audioIndex++] = this.mixerOutputCache;
                if (this.audioIndex == this.numSamplesTotal) {
                    /** @type {number} */
                    this.audioIndex = 0;
                    this.outputAudio();
                }
            }
            if (this.sequencerClocks == 0) {
                this.audioComputeSequencer();
                /** @type {number} */
                this.sequencerClocks = 8192;
            }
        }
    } else {
        for (;--dataAndEvents > -1;) {
            /** @type {number} */
            this.currentBuffer[this.audioIndex++] = 61680;
            if (this.audioIndex == this.numSamplesTotal) {
                /** @type {number} */
                this.audioIndex = 0;
                this.outputAudio();
            }
        }
    }
};
/**
 * @param {?} numSamples
 * @return {undefined}
 */
GameBoyCore.prototype.generateAudioFake = function(numSamples) {
    if (this.soundMasterEnabled && !this.CPUStopped) {
        for (;--numSamples > -1;) {
            this.computeAudioChannels();
            if (--this.sequencerClocks == 0) {
                this.audioComputeSequencer();
                /** @type {number} */
                this.sequencerClocks = 8192;
            }
        }
    }
};
/**
 * @return {undefined}
 */
GameBoyCore.prototype.audioJIT = function() {
    if (settings[0]) {
        this.generateAudio(this.audioTicks);
    } else {
        this.generateAudioFake(this.audioTicks);
    }
    /** @type {number} */
    this.audioTicks = 0;
};
/**
 * @return {undefined}
 */
GameBoyCore.prototype.audioComputeSequencer = function() {
    switch(this.sequencePosition++) {
        case 0:
            this.clockAudioLength();
            break;
        case 2:
            this.clockAudioLength();
            this.clockAudioSweep();
            break;
        case 4:
            this.clockAudioLength();
            break;
        case 6:
            this.clockAudioLength();
            this.clockAudioSweep();
            break;
        case 7:
            this.clockAudioEnvelope();
            /** @type {number} */
            this.sequencePosition = 0;
    }
};
/**
 * @return {undefined}
 */
GameBoyCore.prototype.clockAudioLength = function() {
    if (this.channel1totalLength > 1) {
        --this.channel1totalLength;
    } else {
        if (this.channel1totalLength == 1) {
            /** @type {number} */
            this.channel1totalLength = 0;
            this.channel1EnableCheck();
            this.memory[65318] &= 254;
        }
    }
    if (this.channel2totalLength > 1) {
        --this.channel2totalLength;
    } else {
        if (this.channel2totalLength == 1) {
            /** @type {number} */
            this.channel2totalLength = 0;
            this.channel2EnableCheck();
            this.memory[65318] &= 253;
        }
    }
    if (this.channel3totalLength > 1) {
        --this.channel3totalLength;
    } else {
        if (this.channel3totalLength == 1) {
            /** @type {number} */
            this.channel3totalLength = 0;
            this.channel3EnableCheck();
            this.memory[65318] &= 251;
        }
    }
    if (this.channel4totalLength > 1) {
        --this.channel4totalLength;
    } else {
        if (this.channel4totalLength == 1) {
            /** @type {number} */
            this.channel4totalLength = 0;
            this.channel4EnableCheck();
            this.memory[65318] &= 247;
        }
    }
};
/**
 * @return {undefined}
 */
GameBoyCore.prototype.clockAudioSweep = function() {
    if (!this.channel1SweepFault && this.channel1timeSweep > 0) {
        if (--this.channel1timeSweep == 0) {
            this.runAudioSweep();
        }
    }
};
/**
 * @return {undefined}
 */
GameBoyCore.prototype.runAudioSweep = function() {
    if (this.channel1lastTimeSweep > 0) {
        if (this.channel1frequencySweepDivider > 0) {
            if (this.channel1numSweep > 0) {
                --this.channel1numSweep;
                if (this.channel1decreaseSweep) {
                    this.channel1ShadowFrequency -= this.channel1ShadowFrequency >> this.channel1frequencySweepDivider;
                    /** @type {number} */
                    this.channel1frequency = this.channel1ShadowFrequency & 2047;
                    /** @type {number} */
                    this.channel1FrequencyTracker = 2048 - this.channel1frequency << 2;
                } else {
                    this.channel1ShadowFrequency += this.channel1ShadowFrequency >> this.channel1frequencySweepDivider;
                    this.channel1frequency = this.channel1ShadowFrequency;
                    if (this.channel1ShadowFrequency <= 2047) {
                        /** @type {number} */
                        this.channel1FrequencyTracker = 2048 - this.channel1frequency << 2;
                        if (this.channel1ShadowFrequency + (this.channel1ShadowFrequency >> this.channel1frequencySweepDivider) > 2047) {
                            /** @type {boolean} */
                            this.channel1SweepFault = true;
                            this.channel1EnableCheck();
                            this.memory[65318] &= 254;
                        }
                    } else {
                        this.channel1frequency &= 2047;
                        /** @type {boolean} */
                        this.channel1SweepFault = true;
                        this.channel1EnableCheck();
                        this.memory[65318] &= 254;
                    }
                }
            }
            this.channel1timeSweep = this.channel1lastTimeSweep;
        } else {
            /** @type {boolean} */
            this.channel1SweepFault = true;
            this.channel1EnableCheck();
        }
    }
};
/**
 * @return {undefined}
 */
GameBoyCore.prototype.clockAudioEnvelope = function() {
    if (this.channel1envelopeSweepsLast > -1) {
        if (this.channel1envelopeSweeps > 0) {
            --this.channel1envelopeSweeps;
        } else {
            if (!this.channel1envelopeType) {
                if (this.channel1envelopeVolume > 0) {
                    --this.channel1envelopeVolume;
                    this.channel1envelopeSweeps = this.channel1envelopeSweepsLast;
                    this.channel1OutputLevelCache();
                } else {
                    /** @type {number} */
                    this.channel1envelopeSweepsLast = -1;
                }
            } else {
                if (this.channel1envelopeVolume < 15) {
                    ++this.channel1envelopeVolume;
                    this.channel1envelopeSweeps = this.channel1envelopeSweepsLast;
                    this.channel1OutputLevelCache();
                } else {
                    /** @type {number} */
                    this.channel1envelopeSweepsLast = -1;
                }
            }
        }
    }
    if (this.channel2envelopeSweepsLast > -1) {
        if (this.channel2envelopeSweeps > 0) {
            --this.channel2envelopeSweeps;
        } else {
            if (!this.channel2envelopeType) {
                if (this.channel2envelopeVolume > 0) {
                    --this.channel2envelopeVolume;
                    this.channel2envelopeSweeps = this.channel2envelopeSweepsLast;
                    this.channel2OutputLevelCache();
                } else {
                    /** @type {number} */
                    this.channel2envelopeSweepsLast = -1;
                }
            } else {
                if (this.channel2envelopeVolume < 15) {
                    ++this.channel2envelopeVolume;
                    this.channel2envelopeSweeps = this.channel2envelopeSweepsLast;
                    this.channel2OutputLevelCache();
                } else {
                    /** @type {number} */
                    this.channel2envelopeSweepsLast = -1;
                }
            }
        }
    }
    if (this.channel4envelopeSweepsLast > -1) {
        if (this.channel4envelopeSweeps > 0) {
            --this.channel4envelopeSweeps;
        } else {
            if (!this.channel4envelopeType) {
                if (this.channel4envelopeVolume > 0) {
                    /** @type {number} */
                    this.channel4currentVolume = --this.channel4envelopeVolume << this.channel4VolumeShifter;
                    this.channel4envelopeSweeps = this.channel4envelopeSweepsLast;
                    this.channel4UpdateCache();
                } else {
                    /** @type {number} */
                    this.channel4envelopeSweepsLast = -1;
                }
            } else {
                if (this.channel4envelopeVolume < 15) {
                    /** @type {number} */
                    this.channel4currentVolume = ++this.channel4envelopeVolume << this.channel4VolumeShifter;
                    this.channel4envelopeSweeps = this.channel4envelopeSweepsLast;
                    this.channel4UpdateCache();
                } else {
                    /** @type {number} */
                    this.channel4envelopeSweepsLast = -1;
                }
            }
        }
    }
};
/**
 * @return {undefined}
 */
GameBoyCore.prototype.computeAudioChannels = function() {
    if (--this.channel1FrequencyCounter == 0) {
        this.channel1FrequencyCounter = this.channel1FrequencyTracker;
        /** @type {number} */
        this.channel1DutyTracker = this.channel1DutyTracker + 1 & 7;
        this.channel1OutputLevelTrimaryCache();
    }
    if (--this.channel2FrequencyCounter == 0) {
        this.channel2FrequencyCounter = this.channel2FrequencyTracker;
        /** @type {number} */
        this.channel2DutyTracker = this.channel2DutyTracker + 1 & 7;
        this.channel2OutputLevelTrimaryCache();
    }
    if (--this.channel3Counter == 0) {
        if (this.channel3canPlay) {
            /** @type {number} */
            this.channel3lastSampleLookup = this.channel3lastSampleLookup + 1 & 31;
        }
        this.channel3Counter = this.channel3FrequencyPeriod;
        this.channel3UpdateCache();
    }
    if (--this.channel4Counter == 0) {
        /** @type {number} */
        this.channel4lastSampleLookup = this.channel4lastSampleLookup + 1 & this.channel4BitRange;
        this.channel4Counter = this.channel4FrequencyPeriod;
        this.channel4UpdateCache();
    }
};
/**
 * @return {undefined}
 */
GameBoyCore.prototype.channel1EnableCheck = function() {
    this.channel1Enabled = (this.channel1consecutive || this.channel1totalLength > 0) && (!this.channel1SweepFault && this.channel1canPlay);
    this.channel1OutputLevelSecondaryCache();
};
/**
 * @return {undefined}
 */
GameBoyCore.prototype.channel1VolumeEnableCheck = function() {
    /** @type {boolean} */
    this.channel1canPlay = this.memory[65298] > 7;
    this.channel1EnableCheck();
    this.channel1OutputLevelSecondaryCache();
};
/**
 * @return {undefined}
 */
GameBoyCore.prototype.channel1OutputLevelCache = function() {
    this.channel1currentSampleLeft = this.leftChannel1 ? this.channel1envelopeVolume : 0;
    this.channel1currentSampleRight = this.rightChannel1 ? this.channel1envelopeVolume : 0;
    this.channel1OutputLevelSecondaryCache();
};
/**
 * @return {undefined}
 */
GameBoyCore.prototype.channel1OutputLevelSecondaryCache = function() {
    if (this.channel1Enabled) {
        this.channel1currentSampleLeftSecondary = this.channel1currentSampleLeft;
        this.channel1currentSampleRightSecondary = this.channel1currentSampleRight;
    } else {
        /** @type {number} */
        this.channel1currentSampleLeftSecondary = 0;
        /** @type {number} */
        this.channel1currentSampleRightSecondary = 0;
    }
    this.channel1OutputLevelTrimaryCache();
};
/**
 * @return {undefined}
 */
GameBoyCore.prototype.channel1OutputLevelTrimaryCache = function() {
    if (this.channel1CachedDuty[this.channel1DutyTracker]) {
        this.channel1currentSampleLeftTrimary = this.channel1currentSampleLeftSecondary;
        this.channel1currentSampleRightTrimary = this.channel1currentSampleRightSecondary;
    } else {
        /** @type {number} */
        this.channel1currentSampleLeftTrimary = 0;
        /** @type {number} */
        this.channel1currentSampleRightTrimary = 0;
    }
    this.mixerOutputLevelCache();
};
/**
 * @return {undefined}
 */
GameBoyCore.prototype.channel2EnableCheck = function() {
    this.channel2Enabled = (this.channel2consecutive || this.channel2totalLength > 0) && this.channel2canPlay;
    this.channel2OutputLevelSecondaryCache();
};
/**
 * @return {undefined}
 */
GameBoyCore.prototype.channel2VolumeEnableCheck = function() {
    /** @type {boolean} */
    this.channel2canPlay = this.memory[65303] > 7;
    this.channel2EnableCheck();
    this.channel2OutputLevelSecondaryCache();
};
/**
 * @return {undefined}
 */
GameBoyCore.prototype.channel2OutputLevelCache = function() {
    this.channel2currentSampleLeft = this.leftChannel2 ? this.channel2envelopeVolume : 0;
    this.channel2currentSampleRight = this.rightChannel2 ? this.channel2envelopeVolume : 0;
    this.channel2OutputLevelSecondaryCache();
};
/**
 * @return {undefined}
 */
GameBoyCore.prototype.channel2OutputLevelSecondaryCache = function() {
    if (this.channel2Enabled) {
        this.channel2currentSampleLeftSecondary = this.channel2currentSampleLeft;
        this.channel2currentSampleRightSecondary = this.channel2currentSampleRight;
    } else {
        /** @type {number} */
        this.channel2currentSampleLeftSecondary = 0;
        /** @type {number} */
        this.channel2currentSampleRightSecondary = 0;
    }
    this.channel2OutputLevelTrimaryCache();
};
/**
 * @return {undefined}
 */
GameBoyCore.prototype.channel2OutputLevelTrimaryCache = function() {
    if (this.channel2CachedDuty[this.channel2DutyTracker]) {
        this.channel2currentSampleLeftTrimary = this.channel2currentSampleLeftSecondary;
        this.channel2currentSampleRightTrimary = this.channel2currentSampleRightSecondary;
    } else {
        /** @type {number} */
        this.channel2currentSampleLeftTrimary = 0;
        /** @type {number} */
        this.channel2currentSampleRightTrimary = 0;
    }
    this.mixerOutputLevelCache();
};
/**
 * @return {undefined}
 */
GameBoyCore.prototype.channel3EnableCheck = function() {
    this.channel3Enabled = this.channel3consecutive || this.channel3totalLength > 0;
    this.channel3OutputLevelSecondaryCache();
};
/**
 * @return {undefined}
 */
GameBoyCore.prototype.channel3OutputLevelCache = function() {
    this.channel3currentSampleLeft = this.leftChannel3 ? this.cachedChannel3Sample : 0;
    this.channel3currentSampleRight = this.rightChannel3 ? this.cachedChannel3Sample : 0;
    this.channel3OutputLevelSecondaryCache();
};
/**
 * @return {undefined}
 */
GameBoyCore.prototype.channel3OutputLevelSecondaryCache = function() {
    if (this.channel3Enabled) {
        this.channel3currentSampleLeftSecondary = this.channel3currentSampleLeft;
        this.channel3currentSampleRightSecondary = this.channel3currentSampleRight;
    } else {
        /** @type {number} */
        this.channel3currentSampleLeftSecondary = 0;
        /** @type {number} */
        this.channel3currentSampleRightSecondary = 0;
    }
    this.mixerOutputLevelCache();
};
/**
 * @return {undefined}
 */
GameBoyCore.prototype.channel4EnableCheck = function() {
    this.channel4Enabled = (this.channel4consecutive || this.channel4totalLength > 0) && this.channel4canPlay;
    this.channel4OutputLevelSecondaryCache();
};
/**
 * @return {undefined}
 */
GameBoyCore.prototype.channel4VolumeEnableCheck = function() {
    /** @type {boolean} */
    this.channel4canPlay = this.memory[65313] > 7;
    this.channel4EnableCheck();
    this.channel4OutputLevelSecondaryCache();
};
/**
 * @return {undefined}
 */
GameBoyCore.prototype.channel4OutputLevelCache = function() {
    this.channel4currentSampleLeft = this.leftChannel4 ? this.cachedChannel4Sample : 0;
    this.channel4currentSampleRight = this.rightChannel4 ? this.cachedChannel4Sample : 0;
    this.channel4OutputLevelSecondaryCache();
};
/**
 * @return {undefined}
 */
GameBoyCore.prototype.channel4OutputLevelSecondaryCache = function() {
    if (this.channel4Enabled) {
        this.channel4currentSampleLeftSecondary = this.channel4currentSampleLeft;
        this.channel4currentSampleRightSecondary = this.channel4currentSampleRight;
    } else {
        /** @type {number} */
        this.channel4currentSampleLeftSecondary = 0;
        /** @type {number} */
        this.channel4currentSampleRightSecondary = 0;
    }
    this.mixerOutputLevelCache();
};
/**
 * @return {undefined}
 */
GameBoyCore.prototype.mixerOutputLevelCache = function() {
    /** @type {number} */
    this.mixerOutputCache = ((this.channel1currentSampleLeftTrimary + this.channel2currentSampleLeftTrimary + this.channel3currentSampleLeftSecondary + this.channel4currentSampleLeftSecondary) * this.VinLeftChannelMasterVolume << 9) + (this.channel1currentSampleRightTrimary + this.channel2currentSampleRightTrimary + this.channel3currentSampleRightSecondary + this.channel4currentSampleRightSecondary) * this.VinRightChannelMasterVolume;
};
/**
 * @return {undefined}
 */
GameBoyCore.prototype.channel3UpdateCache = function() {
    /** @type {number} */
    this.cachedChannel3Sample = this.channel3PCM[this.channel3lastSampleLookup] >> this.channel3patternType;
    this.channel3OutputLevelCache();
};
/**
 * @param {number} desiredNonCommentArgIndex
 * @param {number} dataAndEvents
 * @return {undefined}
 */
GameBoyCore.prototype.channel3WriteRAM = function(desiredNonCommentArgIndex, dataAndEvents) {
    if (this.channel3canPlay) {
        this.audioJIT();
    }
    /** @type {number} */
    this.memory[65328 | desiredNonCommentArgIndex] = dataAndEvents;
    desiredNonCommentArgIndex <<= 1;
    /** @type {number} */
    this.channel3PCM[desiredNonCommentArgIndex] = dataAndEvents >> 4;
    /** @type {number} */
    this.channel3PCM[desiredNonCommentArgIndex | 1] = dataAndEvents & 15;
};
/**
 * @return {undefined}
 */
GameBoyCore.prototype.channel4UpdateCache = function() {
    this.cachedChannel4Sample = this.noiseSampleTable[this.channel4currentVolume | this.channel4lastSampleLookup];
    this.channel4OutputLevelCache();
};
/**
 * @return {undefined}
 */
GameBoyCore.prototype.run = function() {
    if ((this.stopEmulator & 2) == 0) {
        if ((this.stopEmulator & 1) == 1) {
            if (!this.CPUStopped) {
                /** @type {number} */
                this.stopEmulator = 0;
                /** @type {boolean} */
                this.drewFrame = false;
                this.audioUnderrunAdjustment();
                this.clockUpdate();
                if (!this.halt) {
                    this.executeIteration();
                } else {
                    /** @type {number} */
                    this.CPUTicks = 0;
                    this.calculateHALTPeriod();
                    if (this.halt) {
                        this.updateCoreFull();
                    } else {
                        this.executeIteration();
                    }
                }
                this.requestDraw();
            } else {
                this.audioUnderrunAdjustment();
                this.audioTicks += this.CPUCyclesTotal;
                this.audioJIT();
                this.stopEmulator |= 1;
            }
        } else {
            cout("Iterator restarted a faulted core.", 2);
            pause();
        }
    }
};
/**
 * @return {undefined}
 */
GameBoyCore.prototype.executeIteration = function() {
    /** @type {number} */
    var unlock = 0;
    /** @type {number} */
    var audioTicks = 0;
    for (;this.stopEmulator == 0;) {
        switch(this.IRQEnableDelay) {
            case 1:
                /** @type {boolean} */
                this.IME = true;
                this.checkIRQMatching();
            case 2:
                --this.IRQEnableDelay;
        }
        if (this.IRQLineMatched > 0) {
            this.launchIRQ();
        }
        unlock = this.memoryReader[this.programCounter](this, this.programCounter);
        /** @type {number} */
        this.programCounter = this.programCounter + 1 & 65535;
        if (this.skipPCIncrement) {
            /** @type {number} */
            this.programCounter = this.programCounter - 1 & 65535;
            /** @type {boolean} */
            this.skipPCIncrement = false;
        }
        this.CPUTicks = this.TICKTable[unlock];
        this.OPCODE[unlock](this);
        this.LCDTicks += this.CPUTicks >> this.doubleSpeedShifter;
        this.LCDCONTROL[this.actualScanLine](this);
        /** @type {number} */
        audioTicks = this.CPUTicks >> this.doubleSpeedShifter;
        this.audioTicks += audioTicks;
        this.emulatorTicks += audioTicks;
        this.DIVTicks += this.CPUTicks;
        if (this.TIMAEnabled) {
            this.timerTicks += this.CPUTicks;
            for (;this.timerTicks >= this.TACClocker;) {
                this.timerTicks -= this.TACClocker;
                if (++this.memory[65285] == 256) {
                    this.memory[65285] = this.memory[65286];
                    this.interruptsRequested |= 4;
                    this.checkIRQMatching();
                }
            }
        }
        if (this.serialTimer > 0) {
            this.serialTimer -= this.CPUTicks;
            if (this.serialTimer <= 0) {
                this.interruptsRequested |= 8;
                this.checkIRQMatching();
            }
            this.serialShiftTimer -= this.CPUTicks;
            if (this.serialShiftTimer <= 0) {
                this.serialShiftTimer = this.serialShiftTimerAllocated;
                /** @type {number} */
                this.memory[65281] = this.memory[65281] << 1 & 254 | 1;
            }
        }
        if (this.emulatorTicks >= this.CPUCyclesTotal) {
            this.iterationEndRoutine();
        }
        this.instructions += 1;
        if (this.instructions > this.totalInstructions) {
            this.iterationEndRoutine();
            this.stopEmulator |= 2;
            checkFinalState();
        }
    }
};
/**
 * @return {undefined}
 */
GameBoyCore.prototype.iterationEndRoutine = function() {
    if ((this.stopEmulator & 1) == 0) {
        this.audioJIT();
        /** @type {number} */
        this.memory[65284] = this.memory[65284] + (this.DIVTicks >> 8) & 255;
        this.DIVTicks &= 255;
        this.stopEmulator |= 1;
        this.emulatorTicks -= this.CPUCyclesTotal;
        this.CPUCyclesTotalCurrent += this.CPUCyclesTotalRoundoff;
        this.recalculateIterationClockLimit();
    }
};
/**
 * @return {undefined}
 */
GameBoyCore.prototype.handleSTOP = function() {
    /** @type {boolean} */
    this.CPUStopped = true;
    this.iterationEndRoutine();
    if (this.emulatorTicks < 0) {
        this.audioTicks -= this.emulatorTicks;
        this.audioJIT();
    }
};
/**
 * @return {undefined}
 */
GameBoyCore.prototype.recalculateIterationClockLimit = function() {
    /** @type {number} */
    var CPUCyclesTotalCurrent = this.CPUCyclesTotalCurrent % 4;
    /** @type {number} */
    this.CPUCyclesTotal = this.CPUCyclesTotalBase + this.CPUCyclesTotalCurrent - CPUCyclesTotalCurrent;
    /** @type {number} */
    this.CPUCyclesTotalCurrent = CPUCyclesTotalCurrent;
};
/**
 * @return {undefined}
 */
GameBoyCore.prototype.scanLineMode2 = function() {
    if (this.STATTracker != 1) {
        if (this.mode2TriggerSTAT) {
            this.interruptsRequested |= 2;
            this.checkIRQMatching();
        }
        /** @type {number} */
        this.STATTracker = 1;
        /** @type {number} */
        this.modeSTAT = 2;
    }
};
/**
 * @return {undefined}
 */
GameBoyCore.prototype.scanLineMode3 = function() {
    if (this.modeSTAT != 3) {
        if (this.STATTracker == 0 && this.mode2TriggerSTAT) {
            this.interruptsRequested |= 2;
            this.checkIRQMatching();
        }
        /** @type {number} */
        this.STATTracker = 1;
        /** @type {number} */
        this.modeSTAT = 3;
    }
};
/**
 * @return {undefined}
 */
GameBoyCore.prototype.scanLineMode0 = function() {
    if (this.modeSTAT != 0) {
        if (this.STATTracker != 2) {
            if (this.STATTracker == 0) {
                if (this.mode2TriggerSTAT) {
                    this.interruptsRequested |= 2;
                    this.checkIRQMatching();
                }
                /** @type {number} */
                this.modeSTAT = 3;
            }
            this.incrementScanLineQueue();
            this.updateSpriteCount(this.actualScanLine);
            /** @type {number} */
            this.STATTracker = 2;
        }
        if (this.LCDTicks >= this.spriteCount) {
            if (this.hdmaRunning) {
                this.executeHDMA();
            }
            if (this.mode0TriggerSTAT) {
                this.interruptsRequested |= 2;
                this.checkIRQMatching();
            }
            /** @type {number} */
            this.STATTracker = 3;
            /** @type {number} */
            this.modeSTAT = 0;
        }
    }
};
/**
 * @return {?}
 */
GameBoyCore.prototype.clocksUntilLYCMatch = function() {
    if (this.memory[65349] != 0) {
        if (this.memory[65349] > this.actualScanLine) {
            return 456 * (this.memory[65349] - this.actualScanLine);
        }
        return 456 * (154 - this.actualScanLine + this.memory[65349]);
    }
    return 456 * (this.actualScanLine == 153 && this.memory[65348] == 0 ? 154 : 153 - this.actualScanLine) + 8;
};
/**
 * @return {?}
 */
GameBoyCore.prototype.clocksUntilMode0 = function() {
    switch(this.modeSTAT) {
        case 0:
            if (this.actualScanLine == 143) {
                this.updateSpriteCount(0);
                return this.spriteCount + 5016;
            }
            this.updateSpriteCount(this.actualScanLine + 1);
            return this.spriteCount + 456;
        case 2:
            ;
        case 3:
            this.updateSpriteCount(this.actualScanLine);
            return this.spriteCount;
        case 1:
            this.updateSpriteCount(0);
            return this.spriteCount + 456 * (154 - this.actualScanLine);
    }
};
/**
 * @param {number} recurring
 * @return {undefined}
 */
GameBoyCore.prototype.updateSpriteCount = function(recurring) {
    /** @type {number} */
    this.spriteCount = 252;
    if (this.cGBC && this.gfxSpriteShow) {
        var timeNow = recurring + 16;
        /** @type {number} */
        var d = 0;
        /** @type {number} */
        var neighbordist = this.gfxSpriteNormalHeight ? 8 : 16;
        /** @type {number} */
        var identifier = 65024;
        for (;identifier < 65184 && this.spriteCount < 312;identifier += 4) {
            /** @type {number} */
            d = timeNow - this.memory[identifier];
            if (d > -1 && d < neighbordist) {
                this.spriteCount += 6;
            }
        }
    }
};
/**
 * @return {undefined}
 */
GameBoyCore.prototype.matchLYC = function() {
    if (this.memory[65348] == this.memory[65349]) {
        this.memory[65345] |= 4;
        if (this.LYCMatchTriggerSTAT) {
            this.interruptsRequested |= 2;
            this.checkIRQMatching();
        }
    } else {
        this.memory[65345] &= 123;
    }
};
/**
 * @return {undefined}
 */
GameBoyCore.prototype.updateCore = function() {
    this.LCDTicks += this.CPUTicks >> this.doubleSpeedShifter;
    this.LCDCONTROL[this.actualScanLine](this);
    /** @type {number} */
    var audioTicks = this.CPUTicks >> this.doubleSpeedShifter;
    this.audioTicks += audioTicks;
    this.emulatorTicks += audioTicks;
    this.DIVTicks += this.CPUTicks;
    if (this.TIMAEnabled) {
        this.timerTicks += this.CPUTicks;
        for (;this.timerTicks >= this.TACClocker;) {
            this.timerTicks -= this.TACClocker;
            if (++this.memory[65285] == 256) {
                this.memory[65285] = this.memory[65286];
                this.interruptsRequested |= 4;
                this.checkIRQMatching();
            }
        }
    }
    if (this.serialTimer > 0) {
        this.serialTimer -= this.CPUTicks;
        if (this.serialTimer <= 0) {
            this.interruptsRequested |= 8;
            this.checkIRQMatching();
        }
        this.serialShiftTimer -= this.CPUTicks;
        if (this.serialShiftTimer <= 0) {
            this.serialShiftTimer = this.serialShiftTimerAllocated;
            /** @type {number} */
            this.memory[65281] = this.memory[65281] << 1 & 254 | 1;
        }
    }
};
/**
 * @return {undefined}
 */
GameBoyCore.prototype.updateCoreFull = function() {
    this.updateCore();
    if (this.emulatorTicks >= this.CPUCyclesTotal) {
        this.iterationEndRoutine();
    }
};
/**
 * @return {undefined}
 */
GameBoyCore.prototype.initializeLCDController = function() {
    /** @type {number} */
    var unlock = 0;
    for (;unlock < 154;) {
        if (unlock < 143) {
            /**
             * @param {Object} $scope
             * @return {undefined}
             */
            this.LINECONTROL[unlock] = function($scope) {
                if ($scope.LCDTicks < 80) {
                    $scope.scanLineMode2();
                } else {
                    if ($scope.LCDTicks < 252) {
                        $scope.scanLineMode3();
                    } else {
                        if ($scope.LCDTicks < 456) {
                            $scope.scanLineMode0();
                        } else {
                            $scope.LCDTicks -= 456;
                            if ($scope.STATTracker != 3) {
                                if ($scope.STATTracker != 2) {
                                    if ($scope.STATTracker == 0 && $scope.mode2TriggerSTAT) {
                                        $scope.interruptsRequested |= 2;
                                    }
                                    $scope.incrementScanLineQueue();
                                }
                                if ($scope.hdmaRunning) {
                                    $scope.executeHDMA();
                                }
                                if ($scope.mode0TriggerSTAT) {
                                    $scope.interruptsRequested |= 2;
                                }
                            }
                            /** @type {number} */
                            $scope.actualScanLine = ++$scope.memory[65348];
                            if ($scope.actualScanLine == $scope.memory[65349]) {
                                $scope.memory[65345] |= 4;
                                if ($scope.LYCMatchTriggerSTAT) {
                                    $scope.interruptsRequested |= 2;
                                }
                            } else {
                                $scope.memory[65345] &= 123;
                            }
                            $scope.checkIRQMatching();
                            /** @type {number} */
                            $scope.STATTracker = 0;
                            /** @type {number} */
                            $scope.modeSTAT = 2;
                            $scope.LINECONTROL[$scope.actualScanLine]($scope);
                        }
                    }
                }
            };
        } else {
            if (unlock == 143) {
                /**
                 * @param {Object} options
                 * @return {undefined}
                 */
                this.LINECONTROL[143] = function(options) {
                    if (options.LCDTicks < 80) {
                        options.scanLineMode2();
                    } else {
                        if (options.LCDTicks < 252) {
                            options.scanLineMode3();
                        } else {
                            if (options.LCDTicks < 456) {
                                options.scanLineMode0();
                            } else {
                                options.LCDTicks -= 456;
                                if (options.STATTracker != 3) {
                                    if (options.STATTracker != 2) {
                                        if (options.STATTracker == 0 && options.mode2TriggerSTAT) {
                                            options.interruptsRequested |= 2;
                                        }
                                        options.incrementScanLineQueue();
                                    }
                                    if (options.hdmaRunning) {
                                        options.executeHDMA();
                                    }
                                    if (options.mode0TriggerSTAT) {
                                        options.interruptsRequested |= 2;
                                    }
                                }
                                /** @type {number} */
                                options.actualScanLine = options.memory[65348] = 144;
                                if (options.memory[65349] == 144) {
                                    options.memory[65345] |= 4;
                                    if (options.LYCMatchTriggerSTAT) {
                                        options.interruptsRequested |= 2;
                                    }
                                } else {
                                    options.memory[65345] &= 123;
                                }
                                /** @type {number} */
                                options.STATTracker = 0;
                                /** @type {number} */
                                options.modeSTAT = 1;
                                options.interruptsRequested |= options.mode1TriggerSTAT ? 3 : 1;
                                options.checkIRQMatching();
                                if (options.drewBlank == 0) {
                                    if (options.totalLinesPassed < 144 || options.totalLinesPassed == 144 && options.midScanlineOffset > -1) {
                                        options.graphicsJITVBlank();
                                        options.prepareFrame();
                                    }
                                } else {
                                    --options.drewBlank;
                                }
                                options.LINECONTROL[144](options);
                            }
                        }
                    }
                };
            } else {
                if (unlock < 153) {
                    /**
                     * @param {Object} $scope
                     * @return {undefined}
                     */
                    this.LINECONTROL[unlock] = function($scope) {
                        if ($scope.LCDTicks >= 456) {
                            $scope.LCDTicks -= 456;
                            /** @type {number} */
                            $scope.actualScanLine = ++$scope.memory[65348];
                            if ($scope.actualScanLine == $scope.memory[65349]) {
                                $scope.memory[65345] |= 4;
                                if ($scope.LYCMatchTriggerSTAT) {
                                    $scope.interruptsRequested |= 2;
                                    $scope.checkIRQMatching();
                                }
                            } else {
                                $scope.memory[65345] &= 123;
                            }
                            $scope.LINECONTROL[$scope.actualScanLine]($scope);
                        }
                    };
                } else {
                    /**
                     * @param {Object} options
                     * @return {undefined}
                     */
                    this.LINECONTROL[153] = function(options) {
                        if (options.LCDTicks >= 8) {
                            if (options.STATTracker != 4 && options.memory[65348] == 153) {
                                /** @type {number} */
                                options.memory[65348] = 0;
                                if (options.memory[65349] == 0) {
                                    options.memory[65345] |= 4;
                                    if (options.LYCMatchTriggerSTAT) {
                                        options.interruptsRequested |= 2;
                                        options.checkIRQMatching();
                                    }
                                } else {
                                    options.memory[65345] &= 123;
                                }
                                /** @type {number} */
                                options.STATTracker = 4;
                            }
                            if (options.LCDTicks >= 456) {
                                options.LCDTicks -= 456;
                                /** @type {number} */
                                options.STATTracker = options.actualScanLine = 0;
                                options.LINECONTROL[0](options);
                            }
                        }
                    };
                }
            }
        }
        ++unlock;
    }
};
/**
 * @return {undefined}
 */
GameBoyCore.prototype.DisplayShowOff = function() {
    if (this.drewBlank == 0) {
        this.clearFrameBuffer();
        /** @type {boolean} */
        this.drewFrame = true;
    }
    /** @type {number} */
    this.drewBlank = 2;
};
/**
 * @return {undefined}
 */
GameBoyCore.prototype.executeHDMA = function() {
    this.DMAWrite(1);
    if (this.halt) {
        if (this.LCDTicks - this.spriteCount < (4 >> this.doubleSpeedShifter | 32)) {
            /** @type {number} */
            this.CPUTicks = 4 + (32 + this.spriteCount << this.doubleSpeedShifter);
            this.LCDTicks = this.spriteCount + (4 >> this.doubleSpeedShifter | 32);
        }
    } else {
        this.LCDTicks += 4 >> this.doubleSpeedShifter | 32;
    }
    if (this.memory[65365] == 0) {
        /** @type {boolean} */
        this.hdmaRunning = false;
        /** @type {number} */
        this.memory[65365] = 255;
    } else {
        --this.memory[65365];
    }
};
/**
 * @return {undefined}
 */
GameBoyCore.prototype.clockUpdate = function() {
    if (this.cTIMER) {
        var expected = new_Date();
        var length = expected.getTime();
        /** @type {number} */
        var padLength = length - this.lastIteration;
        this.lastIteration = length;
        if (this.cTIMER && !this.RTCHALT) {
            this.RTCSeconds += padLength / 1E3;
            for (;this.RTCSeconds >= 60;) {
                this.RTCSeconds -= 60;
                ++this.RTCMinutes;
                if (this.RTCMinutes >= 60) {
                    this.RTCMinutes -= 60;
                    ++this.RTCHours;
                    if (this.RTCHours >= 24) {
                        this.RTCHours -= 24;
                        ++this.RTCDays;
                        if (this.RTCDays >= 512) {
                            this.RTCDays -= 512;
                            /** @type {boolean} */
                            this.RTCDayOverFlow = true;
                        }
                    }
                }
            }
        }
    }
};
/**
 * @return {undefined}
 */
GameBoyCore.prototype.prepareFrame = function() {
    this.swizzleFrameBuffer();
    /** @type {boolean} */
    this.drewFrame = true;
};
/**
 * @return {undefined}
 */
GameBoyCore.prototype.requestDraw = function() {
    if (this.drewFrame) {
        this.dispatchDraw();
    }
};
/**
 * @return {undefined}
 */
GameBoyCore.prototype.dispatchDraw = function() {
    var length = this.offscreenRGBCount;
    if (length > 0) {
        var swizzledFrame = length == 92160 ? this.swizzledFrame : this.resizeFrameBuffer();
        var canvasData = this.canvasBuffer.data;
        /** @type {number} */
        var bufferIndex = 0;
        /** @type {number} */
        var canvasIndex = 0;
        for (;canvasIndex < length;++canvasIndex) {
            canvasData[canvasIndex++] = swizzledFrame[bufferIndex++];
            canvasData[canvasIndex++] = swizzledFrame[bufferIndex++];
            canvasData[canvasIndex++] = swizzledFrame[bufferIndex++];
        }
        this.graphicsBlit();
    }
};
/**
 * @return {undefined}
 */
GameBoyCore.prototype.swizzleFrameBuffer = function() {
    var second = this.frameBuffer;
    var res = this.swizzledFrame;
    /** @type {number} */
    var j = 0;
    /** @type {number} */
    var resLength = 0;
    for (;resLength < 69120;) {
        /** @type {number} */
        res[resLength++] = second[j] >> 16 & 255;
        /** @type {number} */
        res[resLength++] = second[j] >> 8 & 255;
        /** @type {number} */
        res[resLength++] = second[j++] & 255;
    }
};
/**
 * @return {undefined}
 */
GameBoyCore.prototype.clearFrameBuffer = function() {
    /** @type {number} */
    var resLength = 0;
    var res = this.swizzledFrame;
    if (this.cGBC || this.colorizedGBPalettes) {
        for (;resLength < 69120;) {
            /** @type {number} */
            res[resLength++] = 248;
        }
    } else {
        for (;resLength < 69120;) {
            /** @type {number} */
            res[resLength++] = 239;
            /** @type {number} */
            res[resLength++] = 255;
            /** @type {number} */
            res[resLength++] = 222;
        }
    }
};
/**
 * @return {?}
 */
GameBoyCore.prototype.resizeFrameBuffer = function() {
    return this.resizer.resize(this.swizzledFrame);
};
/**
 * @return {undefined}
 */
GameBoyCore.prototype.compileResizeFrameBufferFunction = function() {
    if (this.offscreenRGBCount > 0) {
        this.resizer = new Resize(160, 144, this.offscreenWidth, this.offscreenHeight, false, true);
    }
};
/**
 * @param {number} dataAndEvents
 * @return {undefined}
 */
GameBoyCore.prototype.renderScanLine = function(dataAndEvents) {
    /** @type {number} */
    this.pixelStart = dataAndEvents * 160;
    if (this.bgEnabled) {
        /** @type {number} */
        this.pixelEnd = 160;
        this.BGLayerRender(dataAndEvents);
        this.WindowLayerRender(dataAndEvents);
    } else {
        /** @type {number} */
        var padLength = (dataAndEvents + 1) * 160;
        /** @type {number} */
        var v0 = this.cGBC || this.colorizedGBPalettes ? 16316664 : 15728606;
        var i = dataAndEvents * 160 + this.currentX;
        for (;i < padLength;i++) {
            /** @type {number} */
            this.frameBuffer[i] = v0;
        }
    }
    this.SpriteLayerRender(dataAndEvents);
    /** @type {number} */
    this.currentX = 0;
    /** @type {number} */
    this.midScanlineOffset = -1;
};
/**
 * @return {undefined}
 */
GameBoyCore.prototype.renderMidScanLine = function() {
    if (this.actualScanLine < 144 && this.modeSTAT == 3) {
        if (this.midScanlineOffset == -1) {
            /** @type {number} */
            this.midScanlineOffset = this.backgroundX & 7;
        }
        if (this.LCDTicks >= 82) {
            /** @type {number} */
            this.pixelEnd = this.LCDTicks - 74;
            /** @type {number} */
            this.pixelEnd = Math.min(this.pixelEnd - this.midScanlineOffset - this.pixelEnd % 8, 160);
            if (this.bgEnabled) {
                /** @type {number} */
                this.pixelStart = this.lastUnrenderedLine * 160;
                this.BGLayerRender(this.lastUnrenderedLine);
                this.WindowLayerRender(this.lastUnrenderedLine);
            } else {
                /** @type {number} */
                var padLength = this.lastUnrenderedLine * 160 + this.pixelEnd;
                /** @type {number} */
                var v0 = this.cGBC || this.colorizedGBPalettes ? 16316664 : 15728606;
                var i = this.lastUnrenderedLine * 160 + this.currentX;
                for (;i < padLength;i++) {
                    /** @type {number} */
                    this.frameBuffer[i] = v0;
                }
            }
            /** @type {number} */
            this.currentX = this.pixelEnd;
        }
    }
};
/**
 * @return {undefined}
 */
GameBoyCore.prototype.initializeModeSpecificArrays = function() {
    this.LCDCONTROL = this.LCDisOn ? this.LINECONTROL : this.DISPLAYOFFCONTROL;
    if (this.cGBC) {
        this.gbcOBJRawPalette = this.getTypedArray(64, 0, "uint8");
        this.gbcBGRawPalette = this.getTypedArray(64, 0, "uint8");
        this.gbcOBJPalette = this.getTypedArray(32, 16777216, "int32");
        this.gbcBGPalette = this.getTypedArray(64, 0, "int32");
        this.BGCHRBank2 = this.getTypedArray(2048, 0, "uint8");
        this.BGCHRCurrentBank = this.currVRAMBank > 0 ? this.BGCHRBank2 : this.BGCHRBank1;
        this.tileCache = this.generateCacheArray(3968);
    } else {
        this.gbOBJPalette = this.getTypedArray(8, 0, "int32");
        this.gbBGPalette = this.getTypedArray(4, 0, "int32");
        this.BGPalette = this.gbBGPalette;
        this.OBJPalette = this.gbOBJPalette;
        this.tileCache = this.generateCacheArray(1792);
        this.sortBuffer = this.getTypedArray(256, 0, "uint8");
        this.OAMAddressCache = this.getTypedArray(10, 0, "int32");
    }
    this.renderPathBuild();
};
/**
 * @return {undefined}
 */
GameBoyCore.prototype.GBCtoGBModeAdjust = function() {
    cout("Stepping down from GBC mode.", 0);
    /** @type {null} */
    this.VRAM = this.GBCMemory = this.BGCHRCurrentBank = this.BGCHRBank2 = null;
    /** @type {number} */
    this.tileCache.length = 1792;
    if (settings[4]) {
        this.gbBGColorizedPalette = this.getTypedArray(4, 0, "int32");
        this.gbOBJColorizedPalette = this.getTypedArray(8, 0, "int32");
        this.cachedBGPaletteConversion = this.getTypedArray(4, 0, "int32");
        this.cachedOBJPaletteConversion = this.getTypedArray(8, 0, "int32");
        this.BGPalette = this.gbBGColorizedPalette;
        this.OBJPalette = this.gbOBJColorizedPalette;
        /** @type {null} */
        this.gbOBJPalette = this.gbBGPalette = null;
        this.getGBCColor();
    } else {
        this.gbOBJPalette = this.getTypedArray(8, 0, "int32");
        this.gbBGPalette = this.getTypedArray(4, 0, "int32");
        this.BGPalette = this.gbBGPalette;
        this.OBJPalette = this.gbOBJPalette;
    }
    this.sortBuffer = this.getTypedArray(256, 0, "uint8");
    this.OAMAddressCache = this.getTypedArray(10, 0, "int32");
    this.renderPathBuild();
    this.memoryReadJumpCompile();
    this.memoryWriteJumpCompile();
};
/**
 * @return {undefined}
 */
GameBoyCore.prototype.renderPathBuild = function() {
    if (!this.cGBC) {
        this.BGLayerRender = this.BGGBLayerRender;
        this.WindowLayerRender = this.WindowGBLayerRender;
        this.SpriteLayerRender = this.SpriteGBLayerRender;
    } else {
        this.priorityFlaggingPathRebuild();
        this.SpriteLayerRender = this.SpriteGBCLayerRender;
    }
};
/**
 * @return {undefined}
 */
GameBoyCore.prototype.priorityFlaggingPathRebuild = function() {
    if (this.BGPriorityEnabled) {
        this.BGLayerRender = this.BGGBCLayerRender;
        this.WindowLayerRender = this.WindowGBCLayerRender;
    } else {
        this.BGLayerRender = this.BGGBCLayerRenderNoPriorityFlagging;
        this.WindowLayerRender = this.WindowGBCLayerRenderNoPriorityFlagging;
    }
};
/**
 * @return {undefined}
 */
GameBoyCore.prototype.initializeReferencesFromSaveState = function() {
    this.LCDCONTROL = this.LCDisOn ? this.LINECONTROL : this.DISPLAYOFFCONTROL;
    /** @type {number} */
    var scripts = 0;
    if (!this.cGBC) {
        if (this.colorizedGBPalettes) {
            this.BGPalette = this.gbBGColorizedPalette;
            this.OBJPalette = this.gbOBJColorizedPalette;
            this.updateGBBGPalette = this.updateGBColorizedBGPalette;
            this.updateGBOBJPalette = this.updateGBColorizedOBJPalette;
        } else {
            this.BGPalette = this.gbBGPalette;
            this.OBJPalette = this.gbOBJPalette;
        }
        this.tileCache = this.generateCacheArray(1792);
        /** @type {number} */
        scripts = 32768;
        for (;scripts < 36864;scripts += 2) {
            this.generateGBOAMTileLine(scripts);
        }
        /** @type {number} */
        scripts = 36864;
        for (;scripts < 38912;scripts += 2) {
            this.generateGBTileLine(scripts);
        }
        this.sortBuffer = this.getTypedArray(256, 0, "uint8");
        this.OAMAddressCache = this.getTypedArray(10, 0, "int32");
    } else {
        this.BGCHRCurrentBank = this.currVRAMBank > 0 ? this.BGCHRBank2 : this.BGCHRBank1;
        this.tileCache = this.generateCacheArray(3968);
        for (;scripts < 6144;scripts += 16) {
            this.generateGBCTileBank1(scripts);
            this.generateGBCTileBank2(scripts);
        }
    }
    this.renderPathBuild();
};
/**
 * @param {number} color
 * @return {?}
 */
GameBoyCore.prototype.RGBTint = function(color) {
    /** @type {number} */
    var r = color & 31;
    /** @type {number} */
    var c = color >> 5 & 31;
    /** @type {number} */
    var b = color >> 10 & 31;
    return r * 13 + c * 2 + b >> 1 << 16 | c * 3 + b << 9 | r * 3 + c * 2 + b * 11 >> 1;
};
/**
 * @return {undefined}
 */
GameBoyCore.prototype.getGBCColor = function() {
    /** @type {number} */
    var width = 0;
    for (;width < 4;width++) {
        /** @type {number} */
        var w4 = width << 1;
        this.cachedBGPaletteConversion[width] = this.RGBTint(this.gbcBGRawPalette[w4 | 1] << 8 | this.gbcBGRawPalette[w4]);
        this.cachedOBJPaletteConversion[width] = this.RGBTint(this.gbcOBJRawPalette[w4 | 1] << 8 | this.gbcOBJRawPalette[w4]);
    }
    /** @type {number} */
    width = 4;
    for (;width < 8;width++) {
        /** @type {number} */
        w4 = width << 1;
        this.cachedOBJPaletteConversion[width] = this.RGBTint(this.gbcOBJRawPalette[w4 | 1] << 8 | this.gbcOBJRawPalette[w4]);
    }
    this.updateGBBGPalette = this.updateGBColorizedBGPalette;
    this.updateGBOBJPalette = this.updateGBColorizedOBJPalette;
    this.updateGBBGPalette(this.memory[65351]);
    this.updateGBOBJPalette(0, this.memory[65352]);
    this.updateGBOBJPalette(1, this.memory[65353]);
    /** @type {boolean} */
    this.colorizedGBPalettes = true;
};
/**
 * @param {number} dataAndEvents
 * @return {undefined}
 */
GameBoyCore.prototype.updateGBRegularBGPalette = function(dataAndEvents) {
    /** @type {number} */
    this.gbBGPalette[0] = this.colors[dataAndEvents & 3] | 33554432;
    this.gbBGPalette[1] = this.colors[dataAndEvents >> 2 & 3];
    this.gbBGPalette[2] = this.colors[dataAndEvents >> 4 & 3];
    this.gbBGPalette[3] = this.colors[dataAndEvents >> 6];
};
/**
 * @param {number} dataAndEvents
 * @return {undefined}
 */
GameBoyCore.prototype.updateGBColorizedBGPalette = function(dataAndEvents) {
    /** @type {number} */
    this.gbBGColorizedPalette[0] = this.cachedBGPaletteConversion[dataAndEvents & 3] | 33554432;
    this.gbBGColorizedPalette[1] = this.cachedBGPaletteConversion[dataAndEvents >> 2 & 3];
    this.gbBGColorizedPalette[2] = this.cachedBGPaletteConversion[dataAndEvents >> 4 & 3];
    this.gbBGColorizedPalette[3] = this.cachedBGPaletteConversion[dataAndEvents >> 6];
};
/**
 * @param {number} recurring
 * @param {number} dataAndEvents
 * @return {undefined}
 */
GameBoyCore.prototype.updateGBRegularOBJPalette = function(recurring, dataAndEvents) {
    this.gbOBJPalette[recurring | 1] = this.colors[dataAndEvents >> 2 & 3];
    this.gbOBJPalette[recurring | 2] = this.colors[dataAndEvents >> 4 & 3];
    this.gbOBJPalette[recurring | 3] = this.colors[dataAndEvents >> 6];
};
/**
 * @param {number} recurring
 * @param {number} dataAndEvents
 * @return {undefined}
 */
GameBoyCore.prototype.updateGBColorizedOBJPalette = function(recurring, dataAndEvents) {
    this.gbOBJColorizedPalette[recurring | 1] = this.cachedOBJPaletteConversion[recurring | dataAndEvents >> 2 & 3];
    this.gbOBJColorizedPalette[recurring | 2] = this.cachedOBJPaletteConversion[recurring | dataAndEvents >> 4 & 3];
    this.gbOBJColorizedPalette[recurring | 3] = this.cachedOBJPaletteConversion[recurring | dataAndEvents >> 6];
};
/**
 * @param {number} key
 * @param {number} value
 * @return {undefined}
 */
GameBoyCore.prototype.updateGBCBGPalette = function(key, value) {
    if (this.gbcBGRawPalette[key] != value) {
        this.midScanLineJIT();
        /** @type {number} */
        this.gbcBGRawPalette[key] = value;
        if ((key & 6) == 0) {
            /** @type {number} */
            value = 33554432 | this.RGBTint(this.gbcBGRawPalette[key | 1] << 8 | this.gbcBGRawPalette[key & 62]);
            key >>= 1;
            /** @type {number} */
            this.gbcBGPalette[key] = value;
            /** @type {number} */
            this.gbcBGPalette[32 | key] = 16777216 | value;
        } else {
            value = this.RGBTint(this.gbcBGRawPalette[key | 1] << 8 | this.gbcBGRawPalette[key & 62]);
            key >>= 1;
            /** @type {number} */
            this.gbcBGPalette[key] = value;
            /** @type {number} */
            this.gbcBGPalette[32 | key] = 16777216 | value;
        }
    }
};
/**
 * @param {number} key
 * @param {?} value
 * @return {undefined}
 */
GameBoyCore.prototype.updateGBCOBJPalette = function(key, value) {
    if (this.gbcOBJRawPalette[key] != value) {
        this.gbcOBJRawPalette[key] = value;
        if ((key & 6) > 0) {
            this.midScanLineJIT();
            /** @type {number} */
            this.gbcOBJPalette[key >> 1] = 16777216 | this.RGBTint(this.gbcOBJRawPalette[key | 1] << 8 | this.gbcOBJRawPalette[key & 62]);
        }
    }
};
/**
 * @param {number} dataAndEvents
 * @return {undefined}
 */
GameBoyCore.prototype.BGGBLayerRender = function(dataAndEvents) {
    /** @type {number} */
    var scrollYAdjusted = this.backgroundY + dataAndEvents & 255;
    /** @type {number} */
    var mid = (scrollYAdjusted & 7) << 3;
    /** @type {number} */
    var i = this.gfxBackgroundCHRBankPosition | (scrollYAdjusted & 248) << 2;
    /** @type {number} */
    var barWidth = this.backgroundX + this.currentX & 255;
    var bufferIndex = this.pixelStart + this.currentX;
    var bufferLength = this.pixelStart + (this.gfxWindowDisplay && dataAndEvents - this.windowY >= 0 ? Math.min(Math.max(this.windowX, 0) + this.currentX, this.pixelEnd) : this.pixelEnd);
    /** @type {number} */
    var n = i + (barWidth >> 3);
    var url = this.BGCHRBank1[n];
    if (url < this.gfxBackgroundBankOffset) {
        url |= 256;
    }
    var img = this.tileCache[url];
    /** @type {number} */
    var high = barWidth & 7;
    for (;high < 8 && (bufferIndex < bufferLength && barWidth < 256);++barWidth) {
        this.frameBuffer[bufferIndex++] = this.BGPalette[img[mid | high++]];
    }
    /** @type {number} */
    var l = Math.min(bufferLength - bufferIndex, 256 - barWidth) >> 3;
    barWidth += l << 3;
    l += n;
    for (;n < l;) {
        url = this.BGCHRBank1[++n];
        if (url < this.gfxBackgroundBankOffset) {
            url |= 256;
        }
        img = this.tileCache[url];
        /** @type {number} */
        high = mid;
        this.frameBuffer[bufferIndex++] = this.BGPalette[img[high++]];
        this.frameBuffer[bufferIndex++] = this.BGPalette[img[high++]];
        this.frameBuffer[bufferIndex++] = this.BGPalette[img[high++]];
        this.frameBuffer[bufferIndex++] = this.BGPalette[img[high++]];
        this.frameBuffer[bufferIndex++] = this.BGPalette[img[high++]];
        this.frameBuffer[bufferIndex++] = this.BGPalette[img[high++]];
        this.frameBuffer[bufferIndex++] = this.BGPalette[img[high++]];
        this.frameBuffer[bufferIndex++] = this.BGPalette[img[high]];
    }
    if (bufferIndex < bufferLength) {
        if (barWidth < 256) {
            url = this.BGCHRBank1[++n];
            if (url < this.gfxBackgroundBankOffset) {
                url |= 256;
            }
            img = this.tileCache[url];
            /** @type {number} */
            high = mid - 1;
            for (;bufferIndex < bufferLength && barWidth < 256;++barWidth) {
                this.frameBuffer[bufferIndex++] = this.BGPalette[img[++high]];
            }
        }
        /** @type {number} */
        l = (bufferLength - bufferIndex >> 3) + i;
        for (;i < l;) {
            url = this.BGCHRBank1[i++];
            if (url < this.gfxBackgroundBankOffset) {
                url |= 256;
            }
            img = this.tileCache[url];
            /** @type {number} */
            high = mid;
            this.frameBuffer[bufferIndex++] = this.BGPalette[img[high++]];
            this.frameBuffer[bufferIndex++] = this.BGPalette[img[high++]];
            this.frameBuffer[bufferIndex++] = this.BGPalette[img[high++]];
            this.frameBuffer[bufferIndex++] = this.BGPalette[img[high++]];
            this.frameBuffer[bufferIndex++] = this.BGPalette[img[high++]];
            this.frameBuffer[bufferIndex++] = this.BGPalette[img[high++]];
            this.frameBuffer[bufferIndex++] = this.BGPalette[img[high++]];
            this.frameBuffer[bufferIndex++] = this.BGPalette[img[high]];
        }
        if (bufferIndex < bufferLength) {
            url = this.BGCHRBank1[i];
            if (url < this.gfxBackgroundBankOffset) {
                url |= 256;
            }
            img = this.tileCache[url];
            switch(bufferLength - bufferIndex) {
                case 7:
                    this.frameBuffer[bufferIndex + 6] = this.BGPalette[img[mid | 6]];
                case 6:
                    this.frameBuffer[bufferIndex + 5] = this.BGPalette[img[mid | 5]];
                case 5:
                    this.frameBuffer[bufferIndex + 4] = this.BGPalette[img[mid | 4]];
                case 4:
                    this.frameBuffer[bufferIndex + 3] = this.BGPalette[img[mid | 3]];
                case 3:
                    this.frameBuffer[bufferIndex + 2] = this.BGPalette[img[mid | 2]];
                case 2:
                    this.frameBuffer[bufferIndex + 1] = this.BGPalette[img[mid | 1]];
                case 1:
                    this.frameBuffer[bufferIndex] = this.BGPalette[img[mid]];
            }
        }
    }
};
/**
 * @param {number} dataAndEvents
 * @return {undefined}
 */
GameBoyCore.prototype.BGGBCLayerRender = function(dataAndEvents) {
    /** @type {number} */
    var scrollYAdjusted = this.backgroundY + dataAndEvents & 255;
    /** @type {number} */
    var k = (scrollYAdjusted & 7) << 3;
    /** @type {number} */
    var i = this.gfxBackgroundCHRBankPosition | (scrollYAdjusted & 248) << 2;
    /** @type {number} */
    var barWidth = this.backgroundX + this.currentX & 255;
    var bufferIndex = this.pixelStart + this.currentX;
    var bufferLength = this.pixelStart + (this.gfxWindowDisplay && dataAndEvents - this.windowY >= 0 ? Math.min(Math.max(this.windowX, 0) + this.currentX, this.pixelEnd) : this.pixelEnd);
    /** @type {number} */
    var n = i + (barWidth >> 3);
    var part = this.BGCHRBank1[n];
    if (part < this.gfxBackgroundBankOffset) {
        part |= 256;
    }
    var cur = this.BGCHRBank2[n];
    var second = this.tileCache[(cur & 8) << 8 | (cur & 96) << 4 | part];
    /** @type {number} */
    var acc = (cur & 7) << 2 | (cur & 128) >> 2;
    /** @type {number} */
    var j = barWidth & 7;
    for (;j < 8 && (bufferIndex < bufferLength && barWidth < 256);++barWidth) {
        this.frameBuffer[bufferIndex++] = this.gbcBGPalette[acc | second[k | j++]];
    }
    /** @type {number} */
    var l = Math.min(bufferLength - bufferIndex, 256 - barWidth) >> 3;
    barWidth += l << 3;
    l += n;
    for (;n < l;) {
        part = this.BGCHRBank1[++n];
        if (part < this.gfxBackgroundBankOffset) {
            part |= 256;
        }
        cur = this.BGCHRBank2[n];
        second = this.tileCache[(cur & 8) << 8 | (cur & 96) << 4 | part];
        /** @type {number} */
        acc = (cur & 7) << 2 | (cur & 128) >> 2;
        /** @type {number} */
        j = k;
        this.frameBuffer[bufferIndex++] = this.gbcBGPalette[acc | second[j++]];
        this.frameBuffer[bufferIndex++] = this.gbcBGPalette[acc | second[j++]];
        this.frameBuffer[bufferIndex++] = this.gbcBGPalette[acc | second[j++]];
        this.frameBuffer[bufferIndex++] = this.gbcBGPalette[acc | second[j++]];
        this.frameBuffer[bufferIndex++] = this.gbcBGPalette[acc | second[j++]];
        this.frameBuffer[bufferIndex++] = this.gbcBGPalette[acc | second[j++]];
        this.frameBuffer[bufferIndex++] = this.gbcBGPalette[acc | second[j++]];
        this.frameBuffer[bufferIndex++] = this.gbcBGPalette[acc | second[j]];
    }
    if (bufferIndex < bufferLength) {
        if (barWidth < 256) {
            part = this.BGCHRBank1[++n];
            if (part < this.gfxBackgroundBankOffset) {
                part |= 256;
            }
            cur = this.BGCHRBank2[n];
            second = this.tileCache[(cur & 8) << 8 | (cur & 96) << 4 | part];
            /** @type {number} */
            acc = (cur & 7) << 2 | (cur & 128) >> 2;
            /** @type {number} */
            j = k - 1;
            for (;bufferIndex < bufferLength && barWidth < 256;++barWidth) {
                this.frameBuffer[bufferIndex++] = this.gbcBGPalette[acc | second[++j]];
            }
        }
        /** @type {number} */
        l = (bufferLength - bufferIndex >> 3) + i;
        for (;i < l;) {
            part = this.BGCHRBank1[i];
            if (part < this.gfxBackgroundBankOffset) {
                part |= 256;
            }
            cur = this.BGCHRBank2[i++];
            second = this.tileCache[(cur & 8) << 8 | (cur & 96) << 4 | part];
            /** @type {number} */
            acc = (cur & 7) << 2 | (cur & 128) >> 2;
            /** @type {number} */
            j = k;
            this.frameBuffer[bufferIndex++] = this.gbcBGPalette[acc | second[j++]];
            this.frameBuffer[bufferIndex++] = this.gbcBGPalette[acc | second[j++]];
            this.frameBuffer[bufferIndex++] = this.gbcBGPalette[acc | second[j++]];
            this.frameBuffer[bufferIndex++] = this.gbcBGPalette[acc | second[j++]];
            this.frameBuffer[bufferIndex++] = this.gbcBGPalette[acc | second[j++]];
            this.frameBuffer[bufferIndex++] = this.gbcBGPalette[acc | second[j++]];
            this.frameBuffer[bufferIndex++] = this.gbcBGPalette[acc | second[j++]];
            this.frameBuffer[bufferIndex++] = this.gbcBGPalette[acc | second[j]];
        }
        if (bufferIndex < bufferLength) {
            part = this.BGCHRBank1[i];
            if (part < this.gfxBackgroundBankOffset) {
                part |= 256;
            }
            cur = this.BGCHRBank2[i];
            second = this.tileCache[(cur & 8) << 8 | (cur & 96) << 4 | part];
            /** @type {number} */
            acc = (cur & 7) << 2 | (cur & 128) >> 2;
            switch(bufferLength - bufferIndex) {
                case 7:
                    this.frameBuffer[bufferIndex + 6] = this.gbcBGPalette[acc | second[k | 6]];
                case 6:
                    this.frameBuffer[bufferIndex + 5] = this.gbcBGPalette[acc | second[k | 5]];
                case 5:
                    this.frameBuffer[bufferIndex + 4] = this.gbcBGPalette[acc | second[k | 4]];
                case 4:
                    this.frameBuffer[bufferIndex + 3] = this.gbcBGPalette[acc | second[k | 3]];
                case 3:
                    this.frameBuffer[bufferIndex + 2] = this.gbcBGPalette[acc | second[k | 2]];
                case 2:
                    this.frameBuffer[bufferIndex + 1] = this.gbcBGPalette[acc | second[k | 1]];
                case 1:
                    this.frameBuffer[bufferIndex] = this.gbcBGPalette[acc | second[k]];
            }
        }
    }
};
/**
 * @param {number} dataAndEvents
 * @return {undefined}
 */
GameBoyCore.prototype.BGGBCLayerRenderNoPriorityFlagging = function(dataAndEvents) {
    /** @type {number} */
    var scrollYAdjusted = this.backgroundY + dataAndEvents & 255;
    /** @type {number} */
    var current = (scrollYAdjusted & 7) << 3;
    /** @type {number} */
    var i = this.gfxBackgroundCHRBankPosition | (scrollYAdjusted & 248) << 2;
    /** @type {number} */
    var barWidth = this.backgroundX + this.currentX & 255;
    var bufferIndex = this.pixelStart + this.currentX;
    var bufferLength = this.pixelStart + (this.gfxWindowDisplay && dataAndEvents - this.windowY >= 0 ? Math.min(Math.max(this.windowX, 0) + this.currentX, this.pixelEnd) : this.pixelEnd);
    /** @type {number} */
    var j = i + (barWidth >> 3);
    var alias = this.BGCHRBank1[j];
    if (alias < this.gfxBackgroundBankOffset) {
        alias |= 256;
    }
    var part = this.BGCHRBank2[j];
    var keys = this.tileCache[(part & 8) << 8 | (part & 96) << 4 | alias];
    /** @type {number} */
    var hashId = (part & 7) << 2;
    /** @type {number} */
    var last = barWidth & 7;
    for (;last < 8 && (bufferIndex < bufferLength && barWidth < 256);++barWidth) {
        this.frameBuffer[bufferIndex++] = this.gbcBGPalette[hashId | keys[current | last++]];
    }
    /** @type {number} */
    var k = Math.min(bufferLength - bufferIndex, 256 - barWidth) >> 3;
    barWidth += k << 3;
    k += j;
    for (;j < k;) {
        alias = this.BGCHRBank1[++j];
        if (alias < this.gfxBackgroundBankOffset) {
            alias |= 256;
        }
        part = this.BGCHRBank2[j];
        keys = this.tileCache[(part & 8) << 8 | (part & 96) << 4 | alias];
        /** @type {number} */
        hashId = (part & 7) << 2;
        /** @type {number} */
        last = current;
        this.frameBuffer[bufferIndex++] = this.gbcBGPalette[hashId | keys[last++]];
        this.frameBuffer[bufferIndex++] = this.gbcBGPalette[hashId | keys[last++]];
        this.frameBuffer[bufferIndex++] = this.gbcBGPalette[hashId | keys[last++]];
        this.frameBuffer[bufferIndex++] = this.gbcBGPalette[hashId | keys[last++]];
        this.frameBuffer[bufferIndex++] = this.gbcBGPalette[hashId | keys[last++]];
        this.frameBuffer[bufferIndex++] = this.gbcBGPalette[hashId | keys[last++]];
        this.frameBuffer[bufferIndex++] = this.gbcBGPalette[hashId | keys[last++]];
        this.frameBuffer[bufferIndex++] = this.gbcBGPalette[hashId | keys[last]];
    }
    if (bufferIndex < bufferLength) {
        if (barWidth < 256) {
            alias = this.BGCHRBank1[++j];
            if (alias < this.gfxBackgroundBankOffset) {
                alias |= 256;
            }
            part = this.BGCHRBank2[j];
            keys = this.tileCache[(part & 8) << 8 | (part & 96) << 4 | alias];
            /** @type {number} */
            hashId = (part & 7) << 2;
            /** @type {number} */
            last = current - 1;
            for (;bufferIndex < bufferLength && barWidth < 256;++barWidth) {
                this.frameBuffer[bufferIndex++] = this.gbcBGPalette[hashId | keys[++last]];
            }
        }
        /** @type {number} */
        k = (bufferLength - bufferIndex >> 3) + i;
        for (;i < k;) {
            alias = this.BGCHRBank1[i];
            if (alias < this.gfxBackgroundBankOffset) {
                alias |= 256;
            }
            part = this.BGCHRBank2[i++];
            keys = this.tileCache[(part & 8) << 8 | (part & 96) << 4 | alias];
            /** @type {number} */
            hashId = (part & 7) << 2;
            /** @type {number} */
            last = current;
            this.frameBuffer[bufferIndex++] = this.gbcBGPalette[hashId | keys[last++]];
            this.frameBuffer[bufferIndex++] = this.gbcBGPalette[hashId | keys[last++]];
            this.frameBuffer[bufferIndex++] = this.gbcBGPalette[hashId | keys[last++]];
            this.frameBuffer[bufferIndex++] = this.gbcBGPalette[hashId | keys[last++]];
            this.frameBuffer[bufferIndex++] = this.gbcBGPalette[hashId | keys[last++]];
            this.frameBuffer[bufferIndex++] = this.gbcBGPalette[hashId | keys[last++]];
            this.frameBuffer[bufferIndex++] = this.gbcBGPalette[hashId | keys[last++]];
            this.frameBuffer[bufferIndex++] = this.gbcBGPalette[hashId | keys[last]];
        }
        if (bufferIndex < bufferLength) {
            alias = this.BGCHRBank1[i];
            if (alias < this.gfxBackgroundBankOffset) {
                alias |= 256;
            }
            part = this.BGCHRBank2[i];
            keys = this.tileCache[(part & 8) << 8 | (part & 96) << 4 | alias];
            /** @type {number} */
            hashId = (part & 7) << 2;
            switch(bufferLength - bufferIndex) {
                case 7:
                    this.frameBuffer[bufferIndex + 6] = this.gbcBGPalette[hashId | keys[current | 6]];
                case 6:
                    this.frameBuffer[bufferIndex + 5] = this.gbcBGPalette[hashId | keys[current | 5]];
                case 5:
                    this.frameBuffer[bufferIndex + 4] = this.gbcBGPalette[hashId | keys[current | 4]];
                case 4:
                    this.frameBuffer[bufferIndex + 3] = this.gbcBGPalette[hashId | keys[current | 3]];
                case 3:
                    this.frameBuffer[bufferIndex + 2] = this.gbcBGPalette[hashId | keys[current | 2]];
                case 2:
                    this.frameBuffer[bufferIndex + 1] = this.gbcBGPalette[hashId | keys[current | 1]];
                case 1:
                    this.frameBuffer[bufferIndex] = this.gbcBGPalette[hashId | keys[current]];
            }
        }
    }
};
/**
 * @param {number} dataAndEvents
 * @return {undefined}
 */
GameBoyCore.prototype.WindowGBLayerRender = function(dataAndEvents) {
    if (this.gfxWindowDisplay) {
        /** @type {number} */
        var windowY = dataAndEvents - this.windowY;
        if (windowY >= 0) {
            var count = this.windowX > 0 ? this.windowX + this.currentX : this.currentX;
            var start = this.pixelStart + count;
            var stop = this.pixelStart + this.pixelEnd;
            if (start < stop) {
                /** @type {number} */
                var index = (windowY & 7) << 3;
                /** @type {number} */
                var position = (this.gfxWindowCHRBankPosition | (windowY & 248) << 2) + (this.currentX >> 3);
                var methodName = this.BGCHRBank1[position];
                if (methodName < this.gfxBackgroundBankOffset) {
                    methodName |= 256;
                }
                var func = this.tileCache[methodName];
                /** @type {number} */
                var i = count - this.windowX & 7;
                /** @type {number} */
                count = Math.min(8, i + stop - start);
                for (;i < count;) {
                    this.frameBuffer[start++] = this.BGPalette[func[index | i++]];
                }
                /** @type {number} */
                count = position + (stop - start >> 3);
                for (;position < count;) {
                    methodName = this.BGCHRBank1[++position];
                    if (methodName < this.gfxBackgroundBankOffset) {
                        methodName |= 256;
                    }
                    func = this.tileCache[methodName];
                    /** @type {number} */
                    i = index;
                    this.frameBuffer[start++] = this.BGPalette[func[i++]];
                    this.frameBuffer[start++] = this.BGPalette[func[i++]];
                    this.frameBuffer[start++] = this.BGPalette[func[i++]];
                    this.frameBuffer[start++] = this.BGPalette[func[i++]];
                    this.frameBuffer[start++] = this.BGPalette[func[i++]];
                    this.frameBuffer[start++] = this.BGPalette[func[i++]];
                    this.frameBuffer[start++] = this.BGPalette[func[i++]];
                    this.frameBuffer[start++] = this.BGPalette[func[i]];
                }
                if (start < stop) {
                    methodName = this.BGCHRBank1[++position];
                    if (methodName < this.gfxBackgroundBankOffset) {
                        methodName |= 256;
                    }
                    func = this.tileCache[methodName];
                    switch(stop - start) {
                        case 7:
                            this.frameBuffer[start + 6] = this.BGPalette[func[index | 6]];
                        case 6:
                            this.frameBuffer[start + 5] = this.BGPalette[func[index | 5]];
                        case 5:
                            this.frameBuffer[start + 4] = this.BGPalette[func[index | 4]];
                        case 4:
                            this.frameBuffer[start + 3] = this.BGPalette[func[index | 3]];
                        case 3:
                            this.frameBuffer[start + 2] = this.BGPalette[func[index | 2]];
                        case 2:
                            this.frameBuffer[start + 1] = this.BGPalette[func[index | 1]];
                        case 1:
                            this.frameBuffer[start] = this.BGPalette[func[index]];
                    }
                }
            }
        }
    }
};
/**
 * @param {number} dataAndEvents
 * @return {undefined}
 */
GameBoyCore.prototype.WindowGBCLayerRender = function(dataAndEvents) {
    if (this.gfxWindowDisplay) {
        /** @type {number} */
        var windowY = dataAndEvents - this.windowY;
        if (windowY >= 0) {
            var k = this.windowX > 0 ? this.windowX + this.currentX : this.currentX;
            var start = this.pixelStart + k;
            var stop = this.pixelStart + this.pixelEnd;
            if (start < stop) {
                /** @type {number} */
                var offset = (windowY & 7) << 3;
                /** @type {number} */
                var j = (this.gfxWindowCHRBankPosition | (windowY & 248) << 2) + (this.currentX >> 3);
                var arr = this.BGCHRBank1[j];
                if (arr < this.gfxBackgroundBankOffset) {
                    arr |= 256;
                }
                var part = this.BGCHRBank2[j];
                var stack = this.tileCache[(part & 8) << 8 | (part & 96) << 4 | arr];
                /** @type {number} */
                var e = (part & 7) << 2 | (part & 128) >> 2;
                /** @type {number} */
                var i = k - this.windowX & 7;
                /** @type {number} */
                k = Math.min(8, i + stop - start);
                for (;i < k;) {
                    this.frameBuffer[start++] = this.gbcBGPalette[e | stack[offset | i++]];
                }
                /** @type {number} */
                k = j + (stop - start >> 3);
                for (;j < k;) {
                    arr = this.BGCHRBank1[++j];
                    if (arr < this.gfxBackgroundBankOffset) {
                        arr |= 256;
                    }
                    part = this.BGCHRBank2[j];
                    stack = this.tileCache[(part & 8) << 8 | (part & 96) << 4 | arr];
                    /** @type {number} */
                    e = (part & 7) << 2 | (part & 128) >> 2;
                    /** @type {number} */
                    i = offset;
                    this.frameBuffer[start++] = this.gbcBGPalette[e | stack[i++]];
                    this.frameBuffer[start++] = this.gbcBGPalette[e | stack[i++]];
                    this.frameBuffer[start++] = this.gbcBGPalette[e | stack[i++]];
                    this.frameBuffer[start++] = this.gbcBGPalette[e | stack[i++]];
                    this.frameBuffer[start++] = this.gbcBGPalette[e | stack[i++]];
                    this.frameBuffer[start++] = this.gbcBGPalette[e | stack[i++]];
                    this.frameBuffer[start++] = this.gbcBGPalette[e | stack[i++]];
                    this.frameBuffer[start++] = this.gbcBGPalette[e | stack[i]];
                }
                if (start < stop) {
                    arr = this.BGCHRBank1[++j];
                    if (arr < this.gfxBackgroundBankOffset) {
                        arr |= 256;
                    }
                    part = this.BGCHRBank2[j];
                    stack = this.tileCache[(part & 8) << 8 | (part & 96) << 4 | arr];
                    /** @type {number} */
                    e = (part & 7) << 2 | (part & 128) >> 2;
                    switch(stop - start) {
                        case 7:
                            this.frameBuffer[start + 6] = this.gbcBGPalette[e | stack[offset | 6]];
                        case 6:
                            this.frameBuffer[start + 5] = this.gbcBGPalette[e | stack[offset | 5]];
                        case 5:
                            this.frameBuffer[start + 4] = this.gbcBGPalette[e | stack[offset | 4]];
                        case 4:
                            this.frameBuffer[start + 3] = this.gbcBGPalette[e | stack[offset | 3]];
                        case 3:
                            this.frameBuffer[start + 2] = this.gbcBGPalette[e | stack[offset | 2]];
                        case 2:
                            this.frameBuffer[start + 1] = this.gbcBGPalette[e | stack[offset | 1]];
                        case 1:
                            this.frameBuffer[start] = this.gbcBGPalette[e | stack[offset]];
                    }
                }
            }
        }
    }
};
/**
 * @param {number} dataAndEvents
 * @return {undefined}
 */
GameBoyCore.prototype.WindowGBCLayerRenderNoPriorityFlagging = function(dataAndEvents) {
    if (this.gfxWindowDisplay) {
        /** @type {number} */
        var windowY = dataAndEvents - this.windowY;
        if (windowY >= 0) {
            var j = this.windowX > 0 ? this.windowX + this.currentX : this.currentX;
            var left = this.pixelStart + j;
            var right = this.pixelStart + this.pixelEnd;
            if (left < right) {
                /** @type {number} */
                var key = (windowY & 7) << 3;
                /** @type {number} */
                var i = (this.gfxWindowCHRBankPosition | (windowY & 248) << 2) + (this.currentX >> 3);
                var seg = this.BGCHRBank1[i];
                if (seg < this.gfxBackgroundBankOffset) {
                    seg |= 256;
                }
                var part = this.BGCHRBank2[i];
                var result = this.tileCache[(part & 8) << 8 | (part & 96) << 4 | seg];
                /** @type {number} */
                var acc = (part & 7) << 2;
                /** @type {number} */
                var index = j - this.windowX & 7;
                /** @type {number} */
                j = Math.min(8, index + right - left);
                for (;index < j;) {
                    this.frameBuffer[left++] = this.gbcBGPalette[acc | result[key | index++]];
                }
                /** @type {number} */
                j = i + (right - left >> 3);
                for (;i < j;) {
                    seg = this.BGCHRBank1[++i];
                    if (seg < this.gfxBackgroundBankOffset) {
                        seg |= 256;
                    }
                    part = this.BGCHRBank2[i];
                    result = this.tileCache[(part & 8) << 8 | (part & 96) << 4 | seg];
                    /** @type {number} */
                    acc = (part & 7) << 2;
                    /** @type {number} */
                    index = key;
                    this.frameBuffer[left++] = this.gbcBGPalette[acc | result[index++]];
                    this.frameBuffer[left++] = this.gbcBGPalette[acc | result[index++]];
                    this.frameBuffer[left++] = this.gbcBGPalette[acc | result[index++]];
                    this.frameBuffer[left++] = this.gbcBGPalette[acc | result[index++]];
                    this.frameBuffer[left++] = this.gbcBGPalette[acc | result[index++]];
                    this.frameBuffer[left++] = this.gbcBGPalette[acc | result[index++]];
                    this.frameBuffer[left++] = this.gbcBGPalette[acc | result[index++]];
                    this.frameBuffer[left++] = this.gbcBGPalette[acc | result[index]];
                }
                if (left < right) {
                    seg = this.BGCHRBank1[++i];
                    if (seg < this.gfxBackgroundBankOffset) {
                        seg |= 256;
                    }
                    part = this.BGCHRBank2[i];
                    result = this.tileCache[(part & 8) << 8 | (part & 96) << 4 | seg];
                    /** @type {number} */
                    acc = (part & 7) << 2;
                    switch(right - left) {
                        case 7:
                            this.frameBuffer[left + 6] = this.gbcBGPalette[acc | result[key | 6]];
                        case 6:
                            this.frameBuffer[left + 5] = this.gbcBGPalette[acc | result[key | 5]];
                        case 5:
                            this.frameBuffer[left + 4] = this.gbcBGPalette[acc | result[key | 4]];
                        case 4:
                            this.frameBuffer[left + 3] = this.gbcBGPalette[acc | result[key | 3]];
                        case 3:
                            this.frameBuffer[left + 2] = this.gbcBGPalette[acc | result[key | 2]];
                        case 2:
                            this.frameBuffer[left + 1] = this.gbcBGPalette[acc | result[key | 1]];
                        case 1:
                            this.frameBuffer[left] = this.gbcBGPalette[acc | result[key]];
                    }
                }
            }
        }
    }
};
/**
 * @param {number} dataAndEvents
 * @return {undefined}
 */
GameBoyCore.prototype.SpriteGBLayerRender = function(dataAndEvents) {
    if (this.gfxSpriteShow) {
        var udataCur = dataAndEvents + 16;
        /** @type {number} */
        var identifier = 65024;
        /** @type {number} */
        var pixelPosition = 0;
        /** @type {number} */
        var _i = 1;
        /** @type {number} */
        var right = 0;
        /** @type {number} */
        var _len = 0;
        /** @type {number} */
        var memory = 0;
        /** @type {number} */
        var three = 0;
        /** @type {null} */
        var css = null;
        /** @type {number} */
        var v = 0;
        /** @type {number} */
        var i = 0;
        /** @type {number} */
        var padLength = 0;
        /** @type {number} */
        var bufferIndex = 0;
        /** @type {number} */
        var left = 0;
        for (;_i < 168;) {
            /** @type {number} */
            this.sortBuffer[_i++] = 255;
        }
        if (this.gfxSpriteNormalHeight) {
            padLength = this.findLowestSpriteDrawable(udataCur, 7);
            for (;i < padLength;++i) {
                identifier = this.OAMAddressCache[i];
                /** @type {number} */
                pixelPosition = udataCur - this.memory[identifier] << 3;
                memory = this.memory[identifier | 3];
                /** @type {number} */
                three = (memory & 16) >> 2;
                css = this.tileCache[(memory & 96) << 4 | this.memory[identifier | 2]];
                left = right = this.memory[identifier | 1];
                /** @type {number} */
                _len = Math.min(168 - left, 8);
                /** @type {number} */
                _i = left > 7 ? 0 : 8 - left;
                bufferIndex = this.pixelStart + (left > 8 ? left - 8 : 0);
                for (;_i < _len;++_i, ++bufferIndex, ++left) {
                    if (this.sortBuffer[left] > right) {
                        if (this.frameBuffer[bufferIndex] >= 33554432) {
                            v = css[pixelPosition | _i];
                            if (v > 0) {
                                this.frameBuffer[bufferIndex] = this.OBJPalette[three | v];
                                this.sortBuffer[left] = right;
                            }
                        } else {
                            if (this.frameBuffer[bufferIndex] < 16777216) {
                                v = css[pixelPosition | _i];
                                if (v > 0 && memory < 128) {
                                    this.frameBuffer[bufferIndex] = this.OBJPalette[three | v];
                                    this.sortBuffer[left] = right;
                                }
                            }
                        }
                    }
                }
            }
        } else {
            padLength = this.findLowestSpriteDrawable(udataCur, 15);
            for (;i < padLength;++i) {
                identifier = this.OAMAddressCache[i];
                /** @type {number} */
                pixelPosition = udataCur - this.memory[identifier] << 3;
                memory = this.memory[identifier | 3];
                /** @type {number} */
                three = (memory & 16) >> 2;
                if ((memory & 64) == (64 & pixelPosition)) {
                    css = this.tileCache[(memory & 96) << 4 | this.memory[identifier | 2] & 254];
                } else {
                    css = this.tileCache[(memory & 96) << 4 | this.memory[identifier | 2] | 1];
                }
                pixelPosition &= 63;
                left = right = this.memory[identifier | 1];
                /** @type {number} */
                _len = Math.min(168 - left, 8);
                /** @type {number} */
                _i = left > 7 ? 0 : 8 - left;
                bufferIndex = this.pixelStart + (left > 8 ? left - 8 : 0);
                for (;_i < _len;++_i, ++bufferIndex, ++left) {
                    if (this.sortBuffer[left] > right) {
                        if (this.frameBuffer[bufferIndex] >= 33554432) {
                            v = css[pixelPosition | _i];
                            if (v > 0) {
                                this.frameBuffer[bufferIndex] = this.OBJPalette[three | v];
                                this.sortBuffer[left] = right;
                            }
                        } else {
                            if (this.frameBuffer[bufferIndex] < 16777216) {
                                v = css[pixelPosition | _i];
                                if (v > 0 && memory < 128) {
                                    this.frameBuffer[bufferIndex] = this.OBJPalette[three | v];
                                    this.sortBuffer[left] = right;
                                }
                            }
                        }
                    }
                }
            }
        }
    }
};
/**
 * @param {?} value
 * @param {number} opt_attributes
 * @return {?}
 */
GameBoyCore.prototype.findLowestSpriteDrawable = function(value, opt_attributes) {
    /** @type {number} */
    var i = 65024;
    /** @type {number} */
    var num = 0;
    /** @type {number} */
    var aboveMin = 0;
    for (;i < 65184 && num < 10;) {
        /** @type {number} */
        aboveMin = value - this.memory[i];
        if ((aboveMin & opt_attributes) == aboveMin) {
            /** @type {number} */
            this.OAMAddressCache[num++] = i;
        }
        i += 4;
    }
    return num;
};
/**
 * @param {number} dataAndEvents
 * @return {undefined}
 */
GameBoyCore.prototype.SpriteGBCLayerRender = function(dataAndEvents) {
    if (this.gfxSpriteShow) {
        /** @type {number} */
        var hour = 65024;
        var max = dataAndEvents + 16;
        /** @type {number} */
        var diff = 0;
        /** @type {number} */
        var i = 0;
        /** @type {number} */
        var y = 0;
        /** @type {number} */
        var x = 0;
        /** @type {number} */
        var memory = 0;
        /** @type {number} */
        var palette = 0;
        /** @type {null} */
        var tmp = null;
        /** @type {number} */
        var elem = 0;
        /** @type {number} */
        var tx = 0;
        /** @type {number} */
        var minute = 0;
        if (this.gfxSpriteNormalHeight) {
            for (;hour < 65184 && minute < 10;hour += 4) {
                /** @type {number} */
                diff = max - this.memory[hour];
                if ((diff & 7) == diff) {
                    /** @type {number} */
                    i = this.memory[hour | 1] - 8;
                    /** @type {number} */
                    y = Math.min(160, i + 8);
                    memory = this.memory[hour | 3];
                    /** @type {number} */
                    palette = (memory & 7) << 2;
                    tmp = this.tileCache[(memory & 8) << 8 | (memory & 96) << 4 | this.memory[hour | 2]];
                    /** @type {number} */
                    x = i > 0 ? i : 0;
                    i -= diff << 3;
                    tx = this.pixelStart + x;
                    for (;x < y;++x, ++tx) {
                        if (this.frameBuffer[tx] >= 33554432) {
                            elem = tmp[x - i];
                            if (elem > 0) {
                                this.frameBuffer[tx] = this.gbcOBJPalette[palette | elem];
                            }
                        } else {
                            if (this.frameBuffer[tx] < 16777216) {
                                elem = tmp[x - i];
                                if (elem > 0 && memory < 128) {
                                    this.frameBuffer[tx] = this.gbcOBJPalette[palette | elem];
                                }
                            }
                        }
                    }
                    ++minute;
                }
            }
        } else {
            for (;hour < 65184 && minute < 10;hour += 4) {
                /** @type {number} */
                diff = max - this.memory[hour];
                if ((diff & 15) == diff) {
                    /** @type {number} */
                    i = this.memory[hour | 1] - 8;
                    /** @type {number} */
                    y = Math.min(160, i + 8);
                    memory = this.memory[hour | 3];
                    /** @type {number} */
                    palette = (memory & 7) << 2;
                    if ((memory & 64) == (64 & diff << 3)) {
                        tmp = this.tileCache[(memory & 8) << 8 | (memory & 96) << 4 | this.memory[hour | 2] & 254];
                    } else {
                        tmp = this.tileCache[(memory & 8) << 8 | (memory & 96) << 4 | this.memory[hour | 2] | 1];
                    }
                    /** @type {number} */
                    x = i > 0 ? i : 0;
                    i -= (diff & 7) << 3;
                    tx = this.pixelStart + x;
                    for (;x < y;++x, ++tx) {
                        if (this.frameBuffer[tx] >= 33554432) {
                            elem = tmp[x - i];
                            if (elem > 0) {
                                this.frameBuffer[tx] = this.gbcOBJPalette[palette | elem];
                            }
                        } else {
                            if (this.frameBuffer[tx] < 16777216) {
                                elem = tmp[x - i];
                                if (elem > 0 && memory < 128) {
                                    this.frameBuffer[tx] = this.gbcOBJPalette[palette | elem];
                                }
                            }
                        }
                    }
                    ++minute;
                }
            }
        }
    }
};
/**
 * @param {number} key
 * @return {undefined}
 */
GameBoyCore.prototype.generateGBTileLine = function(key) {
    /** @type {number} */
    var lineCopy = this.memory[1 | key] << 8 | this.memory[40958 & key];
    var $cookies = this.tileCache[(key & 8176) >> 4];
    /** @type {number} */
    key = (key & 14) << 2;
    /** @type {number} */
    $cookies[key | 7] = (lineCopy & 256) >> 7 | lineCopy & 1;
    /** @type {number} */
    $cookies[key | 6] = (lineCopy & 512) >> 8 | (lineCopy & 2) >> 1;
    /** @type {number} */
    $cookies[key | 5] = (lineCopy & 1024) >> 9 | (lineCopy & 4) >> 2;
    /** @type {number} */
    $cookies[key | 4] = (lineCopy & 2048) >> 10 | (lineCopy & 8) >> 3;
    /** @type {number} */
    $cookies[key | 3] = (lineCopy & 4096) >> 11 | (lineCopy & 16) >> 4;
    /** @type {number} */
    $cookies[key | 2] = (lineCopy & 8192) >> 12 | (lineCopy & 32) >> 5;
    /** @type {number} */
    $cookies[key | 1] = (lineCopy & 16384) >> 13 | (lineCopy & 64) >> 6;
    /** @type {number} */
    $cookies[key] = (lineCopy & 32768) >> 14 | (lineCopy & 128) >> 7;
};
/**
 * @param {number} key
 * @return {undefined}
 */
GameBoyCore.prototype.generateGBCTileLineBank1 = function(key) {
    /** @type {number} */
    var lineCopy = this.memory[1 | key] << 8 | this.memory[40958 & key];
    key &= 8190;
    var internalValues = this.tileCache[key >> 4];
    var $cookies = this.tileCache[512 | key >> 4];
    var img = this.tileCache[1024 | key >> 4];
    var OBJWindowBuffer = this.tileCache[1536 | key >> 4];
    /** @type {number} */
    key = (key & 14) << 2;
    /** @type {number} */
    var pixelPosition = 56 - key;
    /** @type {number} */
    OBJWindowBuffer[pixelPosition] = $cookies[key] = img[pixelPosition | 7] = internalValues[key | 7] = (lineCopy & 256) >> 7 | lineCopy & 1;
    /** @type {number} */
    OBJWindowBuffer[pixelPosition | 1] = $cookies[key | 1] = img[pixelPosition | 6] = internalValues[key | 6] = (lineCopy & 512) >> 8 | (lineCopy & 2) >> 1;
    /** @type {number} */
    OBJWindowBuffer[pixelPosition | 2] = $cookies[key | 2] = img[pixelPosition | 5] = internalValues[key | 5] = (lineCopy & 1024) >> 9 | (lineCopy & 4) >> 2;
    /** @type {number} */
    OBJWindowBuffer[pixelPosition | 3] = $cookies[key | 3] = img[pixelPosition | 4] = internalValues[key | 4] = (lineCopy & 2048) >> 10 | (lineCopy & 8) >> 3;
    /** @type {number} */
    OBJWindowBuffer[pixelPosition | 4] = $cookies[key | 4] = img[pixelPosition | 3] = internalValues[key | 3] = (lineCopy & 4096) >> 11 | (lineCopy & 16) >> 4;
    /** @type {number} */
    OBJWindowBuffer[pixelPosition | 5] = $cookies[key | 5] = img[pixelPosition | 2] = internalValues[key | 2] = (lineCopy & 8192) >> 12 | (lineCopy & 32) >> 5;
    /** @type {number} */
    OBJWindowBuffer[pixelPosition | 6] = $cookies[key | 6] = img[pixelPosition | 1] = internalValues[key | 1] = (lineCopy & 16384) >> 13 | (lineCopy & 64) >> 6;
    /** @type {number} */
    OBJWindowBuffer[pixelPosition | 7] = $cookies[key | 7] = img[pixelPosition] = internalValues[key] = (lineCopy & 32768) >> 14 | (lineCopy & 128) >> 7;
};
/**
 * @param {number} selector
 * @return {undefined}
 */
GameBoyCore.prototype.generateGBCTileBank1 = function(selector) {
    /** @type {number} */
    var name = selector >> 4;
    var old = this.tileCache[name];
    var guaranteedUnique = this.tileCache[512 | name];
    var CommandProxyMap = this.tileCache[1024 | name];
    var done = this.tileCache[1536 | name];
    /** @type {number} */
    var lineCopy = 0;
    selector |= 32768;
    /** @type {number} */
    name = 0;
    /** @type {number} */
    var id = 56;
    do {
        /** @type {number} */
        lineCopy = this.memory[1 | selector] << 8 | this.memory[selector];
        /** @type {number} */
        done[id] = guaranteedUnique[name] = CommandProxyMap[id | 7] = old[name | 7] = (lineCopy & 256) >> 7 | lineCopy & 1;
        /** @type {number} */
        done[id | 1] = guaranteedUnique[name | 1] = CommandProxyMap[id | 6] = old[name | 6] = (lineCopy & 512) >> 8 | (lineCopy & 2) >> 1;
        /** @type {number} */
        done[id | 2] = guaranteedUnique[name | 2] = CommandProxyMap[id | 5] = old[name | 5] = (lineCopy & 1024) >> 9 | (lineCopy & 4) >> 2;
        /** @type {number} */
        done[id | 3] = guaranteedUnique[name | 3] = CommandProxyMap[id | 4] = old[name | 4] = (lineCopy & 2048) >> 10 | (lineCopy & 8) >> 3;
        /** @type {number} */
        done[id | 4] = guaranteedUnique[name | 4] = CommandProxyMap[id | 3] = old[name | 3] = (lineCopy & 4096) >> 11 | (lineCopy & 16) >> 4;
        /** @type {number} */
        done[id | 5] = guaranteedUnique[name | 5] = CommandProxyMap[id | 2] = old[name | 2] = (lineCopy & 8192) >> 12 | (lineCopy & 32) >> 5;
        /** @type {number} */
        done[id | 6] = guaranteedUnique[name | 6] = CommandProxyMap[id | 1] = old[name | 1] = (lineCopy & 16384) >> 13 | (lineCopy & 64) >> 6;
        /** @type {number} */
        done[id | 7] = guaranteedUnique[name | 7] = CommandProxyMap[id] = old[name] = (lineCopy & 32768) >> 14 | (lineCopy & 128) >> 7;
        name += 8;
        id -= 8;
        selector += 2;
    } while (id > -1);
};
/**
 * @param {number} key
 * @return {undefined}
 */
GameBoyCore.prototype.generateGBCTileLineBank2 = function(key) {
    /** @type {number} */
    var lineCopy = this.VRAM[1 | key] << 8 | this.VRAM[8190 & key];
    var img = this.tileCache[2048 | key >> 4];
    var $cookies = this.tileCache[2560 | key >> 4];
    var groupedSelectors = this.tileCache[3072 | key >> 4];
    var prevSources = this.tileCache[3584 | key >> 4];
    /** @type {number} */
    key = (key & 14) << 2;
    /** @type {number} */
    var i = 56 - key;
    /** @type {number} */
    prevSources[i] = $cookies[key] = groupedSelectors[i | 7] = img[key | 7] = (lineCopy & 256) >> 7 | lineCopy & 1;
    /** @type {number} */
    prevSources[i | 1] = $cookies[key | 1] = groupedSelectors[i | 6] = img[key | 6] = (lineCopy & 512) >> 8 | (lineCopy & 2) >> 1;
    /** @type {number} */
    prevSources[i | 2] = $cookies[key | 2] = groupedSelectors[i | 5] = img[key | 5] = (lineCopy & 1024) >> 9 | (lineCopy & 4) >> 2;
    /** @type {number} */
    prevSources[i | 3] = $cookies[key | 3] = groupedSelectors[i | 4] = img[key | 4] = (lineCopy & 2048) >> 10 | (lineCopy & 8) >> 3;
    /** @type {number} */
    prevSources[i | 4] = $cookies[key | 4] = groupedSelectors[i | 3] = img[key | 3] = (lineCopy & 4096) >> 11 | (lineCopy & 16) >> 4;
    /** @type {number} */
    prevSources[i | 5] = $cookies[key | 5] = groupedSelectors[i | 2] = img[key | 2] = (lineCopy & 8192) >> 12 | (lineCopy & 32) >> 5;
    /** @type {number} */
    prevSources[i | 6] = $cookies[key | 6] = groupedSelectors[i | 1] = img[key | 1] = (lineCopy & 16384) >> 13 | (lineCopy & 64) >> 6;
    /** @type {number} */
    prevSources[i | 7] = $cookies[key | 7] = groupedSelectors[i] = img[key] = (lineCopy & 32768) >> 14 | (lineCopy & 128) >> 7;
};
/**
 * @param {number} selector
 * @return {undefined}
 */
GameBoyCore.prototype.generateGBCTileBank2 = function(selector) {
    /** @type {number} */
    var i = selector >> 4;
    var groupedSelectors = this.tileCache[2048 | i];
    var prevSources = this.tileCache[2560 | i];
    var done = this.tileCache[3072 | i];
    var CommandProxyMap = this.tileCache[3584 | i];
    /** @type {number} */
    var lineCopy = 0;
    /** @type {number} */
    i = 0;
    /** @type {number} */
    var id = 56;
    do {
        /** @type {number} */
        lineCopy = this.VRAM[1 | selector] << 8 | this.VRAM[selector];
        /** @type {number} */
        CommandProxyMap[id] = prevSources[i] = done[id | 7] = groupedSelectors[i | 7] = (lineCopy & 256) >> 7 | lineCopy & 1;
        /** @type {number} */
        CommandProxyMap[id | 1] = prevSources[i | 1] = done[id | 6] = groupedSelectors[i | 6] = (lineCopy & 512) >> 8 | (lineCopy & 2) >> 1;
        /** @type {number} */
        CommandProxyMap[id | 2] = prevSources[i | 2] = done[id | 5] = groupedSelectors[i | 5] = (lineCopy & 1024) >> 9 | (lineCopy & 4) >> 2;
        /** @type {number} */
        CommandProxyMap[id | 3] = prevSources[i | 3] = done[id | 4] = groupedSelectors[i | 4] = (lineCopy & 2048) >> 10 | (lineCopy & 8) >> 3;
        /** @type {number} */
        CommandProxyMap[id | 4] = prevSources[i | 4] = done[id | 3] = groupedSelectors[i | 3] = (lineCopy & 4096) >> 11 | (lineCopy & 16) >> 4;
        /** @type {number} */
        CommandProxyMap[id | 5] = prevSources[i | 5] = done[id | 2] = groupedSelectors[i | 2] = (lineCopy & 8192) >> 12 | (lineCopy & 32) >> 5;
        /** @type {number} */
        CommandProxyMap[id | 6] = prevSources[i | 6] = done[id | 1] = groupedSelectors[i | 1] = (lineCopy & 16384) >> 13 | (lineCopy & 64) >> 6;
        /** @type {number} */
        CommandProxyMap[id | 7] = prevSources[i | 7] = done[id] = groupedSelectors[i] = (lineCopy & 32768) >> 14 | (lineCopy & 128) >> 7;
        i += 8;
        id -= 8;
        selector += 2;
    } while (id > -1);
};
/**
 * @param {number} selector
 * @return {undefined}
 */
GameBoyCore.prototype.generateGBOAMTileLine = function(selector) {
    /** @type {number} */
    var lineCopy = this.memory[1 | selector] << 8 | this.memory[40958 & selector];
    selector &= 8190;
    var refs = this.tileCache[selector >> 4];
    var rules = this.tileCache[512 | selector >> 4];
    var groupedSelectors = this.tileCache[1024 | selector >> 4];
    var prevSources = this.tileCache[1536 | selector >> 4];
    /** @type {number} */
    selector = (selector & 14) << 2;
    /** @type {number} */
    var i = 56 - selector;
    /** @type {number} */
    prevSources[i] = rules[selector] = groupedSelectors[i | 7] = refs[selector | 7] = (lineCopy & 256) >> 7 | lineCopy & 1;
    /** @type {number} */
    prevSources[i | 1] = rules[selector | 1] = groupedSelectors[i | 6] = refs[selector | 6] = (lineCopy & 512) >> 8 | (lineCopy & 2) >> 1;
    /** @type {number} */
    prevSources[i | 2] = rules[selector | 2] = groupedSelectors[i | 5] = refs[selector | 5] = (lineCopy & 1024) >> 9 | (lineCopy & 4) >> 2;
    /** @type {number} */
    prevSources[i | 3] = rules[selector | 3] = groupedSelectors[i | 4] = refs[selector | 4] = (lineCopy & 2048) >> 10 | (lineCopy & 8) >> 3;
    /** @type {number} */
    prevSources[i | 4] = rules[selector | 4] = groupedSelectors[i | 3] = refs[selector | 3] = (lineCopy & 4096) >> 11 | (lineCopy & 16) >> 4;
    /** @type {number} */
    prevSources[i | 5] = rules[selector | 5] = groupedSelectors[i | 2] = refs[selector | 2] = (lineCopy & 8192) >> 12 | (lineCopy & 32) >> 5;
    /** @type {number} */
    prevSources[i | 6] = rules[selector | 6] = groupedSelectors[i | 1] = refs[selector | 1] = (lineCopy & 16384) >> 13 | (lineCopy & 64) >> 6;
    /** @type {number} */
    prevSources[i | 7] = rules[selector | 7] = groupedSelectors[i] = refs[selector] = (lineCopy & 32768) >> 14 | (lineCopy & 128) >> 7;
};
/**
 * @return {undefined}
 */
GameBoyCore.prototype.graphicsJIT = function() {
    if (this.LCDisOn) {
        /** @type {number} */
        this.totalLinesPassed = 0;
        this.graphicsJITScanlineGroup();
    }
};
/**
 * @return {undefined}
 */
GameBoyCore.prototype.graphicsJITVBlank = function() {
    this.totalLinesPassed += this.queuedScanLines;
    this.graphicsJITScanlineGroup();
};
/**
 * @return {undefined}
 */
GameBoyCore.prototype.graphicsJITScanlineGroup = function() {
    for (;this.queuedScanLines > 0;) {
        this.renderScanLine(this.lastUnrenderedLine);
        if (this.lastUnrenderedLine < 143) {
            ++this.lastUnrenderedLine;
        } else {
            /** @type {number} */
            this.lastUnrenderedLine = 0;
        }
        --this.queuedScanLines;
    }
};
/**
 * @return {undefined}
 */
GameBoyCore.prototype.incrementScanLineQueue = function() {
    if (this.queuedScanLines < 144) {
        ++this.queuedScanLines;
    } else {
        /** @type {number} */
        this.currentX = 0;
        /** @type {number} */
        this.midScanlineOffset = -1;
        if (this.lastUnrenderedLine < 143) {
            ++this.lastUnrenderedLine;
        } else {
            /** @type {number} */
            this.lastUnrenderedLine = 0;
        }
    }
};
/**
 * @return {undefined}
 */
GameBoyCore.prototype.midScanLineJIT = function() {
    this.graphicsJIT();
    this.renderMidScanLine();
};
/**
 * @return {undefined}
 */
GameBoyCore.prototype.launchIRQ = function() {
    /** @type {number} */
    var bitShift = 0;
    /** @type {number} */
    var interruptsRequested = 1;
    do {
        if ((interruptsRequested & this.IRQLineMatched) == interruptsRequested) {
            /** @type {boolean} */
            this.IME = false;
            this.interruptsRequested -= interruptsRequested;
            /** @type {number} */
            this.IRQLineMatched = 0;
            /** @type {number} */
            this.CPUTicks = 20;
            /** @type {number} */
            this.stackPointer = this.stackPointer - 1 & 65535;
            this.memoryWriter[this.stackPointer](this, this.stackPointer, this.programCounter >> 8);
            /** @type {number} */
            this.stackPointer = this.stackPointer - 1 & 65535;
            this.memoryWriter[this.stackPointer](this, this.stackPointer, this.programCounter & 255);
            /** @type {number} */
            this.programCounter = 64 | bitShift << 3;
            this.updateCore();
            return;
        }
        /** @type {number} */
        interruptsRequested = 1 << ++bitShift;
    } while (bitShift < 5);
};
/**
 * @return {undefined}
 */
GameBoyCore.prototype.checkIRQMatching = function() {
    if (this.IME) {
        /** @type {number} */
        this.IRQLineMatched = this.interruptsEnabled & this.interruptsRequested & 31;
    }
};
/**
 * @return {undefined}
 */
GameBoyCore.prototype.calculateHALTPeriod = function() {
    if (!this.halt) {
        /** @type {boolean} */
        this.halt = true;
        /** @type {number} */
        var n = -1;
        /** @type {number} */
        var step = 0;
        if (this.LCDisOn) {
            if ((this.interruptsEnabled & 1) == 1) {
                /** @type {number} */
                n = 456 * ((this.modeSTAT == 1 ? 298 : 144) - this.actualScanLine) - this.LCDTicks << this.doubleSpeedShifter;
            }
            if ((this.interruptsEnabled & 2) == 2) {
                if (this.mode0TriggerSTAT) {
                    /** @type {number} */
                    step = this.clocksUntilMode0() - this.LCDTicks << this.doubleSpeedShifter;
                    if (step <= n || n == -1) {
                        /** @type {number} */
                        n = step;
                    }
                }
                if (this.mode1TriggerSTAT && (this.interruptsEnabled & 1) == 0) {
                    /** @type {number} */
                    step = 456 * ((this.modeSTAT == 1 ? 298 : 144) - this.actualScanLine) - this.LCDTicks << this.doubleSpeedShifter;
                    if (step <= n || n == -1) {
                        /** @type {number} */
                        n = step;
                    }
                }
                if (this.mode2TriggerSTAT) {
                    /** @type {number} */
                    step = (this.actualScanLine >= 143 ? 456 * (154 - this.actualScanLine) : 456) - this.LCDTicks << this.doubleSpeedShifter;
                    if (step <= n || n == -1) {
                        /** @type {number} */
                        n = step;
                    }
                }
                if (this.LYCMatchTriggerSTAT && this.memory[65349] <= 153) {
                    /** @type {number} */
                    step = this.clocksUntilLYCMatch() - this.LCDTicks << this.doubleSpeedShifter;
                    if (step <= n || n == -1) {
                        /** @type {number} */
                        n = step;
                    }
                }
            }
        }
        if (this.TIMAEnabled && (this.interruptsEnabled & 4) == 4) {
            /** @type {number} */
            step = (256 - this.memory[65285]) * this.TACClocker - this.timerTicks;
            if (step <= n || n == -1) {
                /** @type {number} */
                n = step;
            }
        }
        if (this.serialTimer > 0 && (this.interruptsEnabled & 8) == 8) {
            if (this.serialTimer <= n || n == -1) {
                n = this.serialTimer;
            }
        }
    } else {
        n = this.remainingClocks;
    }
    /** @type {number} */
    var minimumCellWidth = this.CPUCyclesTotal - this.emulatorTicks << this.doubleSpeedShifter;
    if (n >= 0) {
        if (n <= minimumCellWidth) {
            /** @type {number} */
            this.CPUTicks = Math.max(n, this.CPUTicks);
            this.updateCoreFull();
            /** @type {boolean} */
            this.halt = false;
            /** @type {number} */
            this.CPUTicks = 0;
        } else {
            /** @type {number} */
            this.CPUTicks = Math.max(minimumCellWidth, this.CPUTicks);
            /** @type {number} */
            this.remainingClocks = n - this.CPUTicks;
        }
    } else {
        this.CPUTicks += minimumCellWidth;
    }
};
/**
 * @param {number} length
 * @return {?}
 */
GameBoyCore.prototype.memoryRead = function(length) {
    return this.memoryReader[length](this, length);
};
/**
 * @param {?} tag
 * @return {?}
 */
GameBoyCore.prototype.memoryHighRead = function(tag) {
    return this.memoryHighReader[tag](this, tag);
};
/**
 * @return {undefined}
 */
GameBoyCore.prototype.memoryReadJumpCompile = function() {
    /** @type {number} */
    var unlock = 0;
    for (;unlock <= 65535;unlock++) {
        if (unlock < 16384) {
            this.memoryReader[unlock] = this.memoryReadNormal;
        } else {
            if (unlock < 32768) {
                this.memoryReader[unlock] = this.memoryReadROM;
            } else {
                if (unlock < 38912) {
                    this.memoryReader[unlock] = this.cGBC ? this.VRAMDATAReadCGBCPU : this.VRAMDATAReadDMGCPU;
                } else {
                    if (unlock < 40960) {
                        this.memoryReader[unlock] = this.cGBC ? this.VRAMCHRReadCGBCPU : this.VRAMCHRReadDMGCPU;
                    } else {
                        if (unlock >= 40960 && unlock < 49152) {
                            if (this.numRAMBanks == 1 / 16 && unlock < 41472 || this.numRAMBanks >= 1) {
                                if (this.cMBC7) {
                                    this.memoryReader[unlock] = this.memoryReadMBC7;
                                } else {
                                    if (!this.cMBC3) {
                                        this.memoryReader[unlock] = this.memoryReadMBC;
                                    } else {
                                        this.memoryReader[unlock] = this.memoryReadMBC3;
                                    }
                                }
                            } else {
                                this.memoryReader[unlock] = this.memoryReadBAD;
                            }
                        } else {
                            if (unlock >= 49152 && unlock < 57344) {
                                if (!this.cGBC || unlock < 53248) {
                                    this.memoryReader[unlock] = this.memoryReadNormal;
                                } else {
                                    this.memoryReader[unlock] = this.memoryReadGBCMemory;
                                }
                            } else {
                                if (unlock >= 57344 && unlock < 65024) {
                                    if (!this.cGBC || unlock < 61440) {
                                        this.memoryReader[unlock] = this.memoryReadECHONormal;
                                    } else {
                                        this.memoryReader[unlock] = this.memoryReadECHOGBCMemory;
                                    }
                                } else {
                                    if (unlock < 65184) {
                                        this.memoryReader[unlock] = this.memoryReadOAM;
                                    } else {
                                        if (this.cGBC && (unlock >= 65184 && unlock < 65280)) {
                                            this.memoryReader[unlock] = this.memoryReadNormal;
                                        } else {
                                            if (unlock >= 65280) {
                                                switch(unlock) {
                                                    case 65280:
                                                        /** @type {function (Object, ?): ?} */
                                                        this.memoryHighReader[0] = this.memoryReader[65280] = function(options, dataAndEvents) {
                                                            return 192 | options.memory[65280];
                                                        };
                                                        break;
                                                    case 65281:
                                                        /** @type {function (Object, ?): ?} */
                                                        this.memoryHighReader[1] = this.memoryReader[65281] = function(options, dataAndEvents) {
                                                            return options.memory[65282] < 128 ? options.memory[65281] : 255;
                                                        };
                                                        break;
                                                    case 65282:
                                                        if (this.cGBC) {
                                                            /** @type {function (Object, ?): ?} */
                                                            this.memoryHighReader[2] = this.memoryReader[65282] = function(options, dataAndEvents) {
                                                                return(options.serialTimer <= 0 ? 124 : 252) | options.memory[65282];
                                                            };
                                                        } else {
                                                            /** @type {function (Object, ?): ?} */
                                                            this.memoryHighReader[2] = this.memoryReader[65282] = function(options, dataAndEvents) {
                                                                return(options.serialTimer <= 0 ? 126 : 254) | options.memory[65282];
                                                            };
                                                        }
                                                        break;
                                                    case 65284:
                                                        /** @type {function (Object, ?): ?} */
                                                        this.memoryHighReader[4] = this.memoryReader[65284] = function(options, dataAndEvents) {
                                                            /** @type {number} */
                                                            options.memory[65284] = options.memory[65284] + (options.DIVTicks >> 8) & 255;
                                                            options.DIVTicks &= 255;
                                                            return options.memory[65284];
                                                        };
                                                        break;
                                                    case 65287:
                                                        /** @type {function (Object, ?): ?} */
                                                        this.memoryHighReader[7] = this.memoryReader[65287] = function(options, dataAndEvents) {
                                                            return 248 | options.memory[65287];
                                                        };
                                                        break;
                                                    case 65295:
                                                        /** @type {function (?, ?): ?} */
                                                        this.memoryHighReader[15] = this.memoryReader[65295] = function(dataAndEvents, deepDataAndEvents) {
                                                            return 224 | dataAndEvents.interruptsRequested;
                                                        };
                                                        break;
                                                    case 65296:
                                                        /** @type {function (Object, ?): ?} */
                                                        this.memoryHighReader[16] = this.memoryReader[65296] = function(options, dataAndEvents) {
                                                            return 128 | options.memory[65296];
                                                        };
                                                        break;
                                                    case 65297:
                                                        /** @type {function (Object, ?): ?} */
                                                        this.memoryHighReader[17] = this.memoryReader[65297] = function(options, dataAndEvents) {
                                                            return 63 | options.memory[65297];
                                                        };
                                                        break;
                                                    case 65299:
                                                        this.memoryHighReader[19] = this.memoryReader[65299] = this.memoryReadBAD;
                                                        break;
                                                    case 65300:
                                                        /** @type {function (Object, ?): ?} */
                                                        this.memoryHighReader[20] = this.memoryReader[65300] = function(options, dataAndEvents) {
                                                            return 191 | options.memory[65300];
                                                        };
                                                        break;
                                                    case 65302:
                                                        /** @type {function (Object, ?): ?} */
                                                        this.memoryHighReader[22] = this.memoryReader[65302] = function(options, dataAndEvents) {
                                                            return 63 | options.memory[65302];
                                                        };
                                                        break;
                                                    case 65304:
                                                        this.memoryHighReader[24] = this.memoryReader[65304] = this.memoryReadBAD;
                                                        break;
                                                    case 65305:
                                                        /** @type {function (Object, ?): ?} */
                                                        this.memoryHighReader[25] = this.memoryReader[65305] = function(options, dataAndEvents) {
                                                            return 191 | options.memory[65305];
                                                        };
                                                        break;
                                                    case 65306:
                                                        /** @type {function (Object, ?): ?} */
                                                        this.memoryHighReader[26] = this.memoryReader[65306] = function(options, dataAndEvents) {
                                                            return 127 | options.memory[65306];
                                                        };
                                                        break;
                                                    case 65307:
                                                        this.memoryHighReader[27] = this.memoryReader[65307] = this.memoryReadBAD;
                                                        break;
                                                    case 65308:
                                                        /** @type {function (Object, ?): ?} */
                                                        this.memoryHighReader[28] = this.memoryReader[65308] = function(options, dataAndEvents) {
                                                            return 159 | options.memory[65308];
                                                        };
                                                        break;
                                                    case 65309:
                                                        /** @type {function (?, ?): ?} */
                                                        this.memoryHighReader[29] = this.memoryReader[65309] = function(dataAndEvents, deepDataAndEvents) {
                                                            return 255;
                                                        };
                                                        break;
                                                    case 65310:
                                                        /** @type {function (Object, ?): ?} */
                                                        this.memoryHighReader[30] = this.memoryReader[65310] = function(options, dataAndEvents) {
                                                            return 191 | options.memory[65310];
                                                        };
                                                        break;
                                                    case 65311:
                                                        ;
                                                    case 65312:
                                                        this.memoryHighReader[unlock & 255] = this.memoryReader[unlock] = this.memoryReadBAD;
                                                        break;
                                                    case 65315:
                                                        /** @type {function (Object, ?): ?} */
                                                        this.memoryHighReader[35] = this.memoryReader[65315] = function(options, dataAndEvents) {
                                                            return 191 | options.memory[65315];
                                                        };
                                                        break;
                                                    case 65318:
                                                        /** @type {function (Object, ?): ?} */
                                                        this.memoryHighReader[38] = this.memoryReader[65318] = function(options, dataAndEvents) {
                                                            options.audioJIT();
                                                            return 112 | options.memory[65318];
                                                        };
                                                        break;
                                                    case 65319:
                                                        ;
                                                    case 65320:
                                                        ;
                                                    case 65321:
                                                        ;
                                                    case 65322:
                                                        ;
                                                    case 65323:
                                                        ;
                                                    case 65324:
                                                        ;
                                                    case 65325:
                                                        ;
                                                    case 65326:
                                                        ;
                                                    case 65327:
                                                        this.memoryHighReader[unlock & 255] = this.memoryReader[unlock] = this.memoryReadBAD;
                                                        break;
                                                    case 65328:
                                                        ;
                                                    case 65329:
                                                        ;
                                                    case 65330:
                                                        ;
                                                    case 65331:
                                                        ;
                                                    case 65332:
                                                        ;
                                                    case 65333:
                                                        ;
                                                    case 65334:
                                                        ;
                                                    case 65335:
                                                        ;
                                                    case 65336:
                                                        ;
                                                    case 65337:
                                                        ;
                                                    case 65338:
                                                        ;
                                                    case 65339:
                                                        ;
                                                    case 65340:
                                                        ;
                                                    case 65341:
                                                        ;
                                                    case 65342:
                                                        ;
                                                    case 65343:
                                                        /**
                                                         * @param {Object} options
                                                         * @param {?} key
                                                         * @return {?}
                                                         */
                                                        this.memoryReader[unlock] = function(options, key) {
                                                            return options.channel3canPlay ? options.memory[65280 | options.channel3lastSampleLookup >> 1] : options.memory[key];
                                                        };
                                                        /**
                                                         * @param {Object} options
                                                         * @param {number} dataAndEvents
                                                         * @return {?}
                                                         */
                                                        this.memoryHighReader[unlock & 255] = function(options, dataAndEvents) {
                                                            return options.channel3canPlay ? options.memory[65280 | options.channel3lastSampleLookup >> 1] : options.memory[65280 | dataAndEvents];
                                                        };
                                                        break;
                                                    case 65345:
                                                        /** @type {function (Object, ?): ?} */
                                                        this.memoryHighReader[65] = this.memoryReader[65345] = function(options, dataAndEvents) {
                                                            return 128 | options.memory[65345] | options.modeSTAT;
                                                        };
                                                        break;
                                                    case 65346:
                                                        /** @type {function (?, ?): ?} */
                                                        this.memoryHighReader[66] = this.memoryReader[65346] = function(dataAndEvents, deepDataAndEvents) {
                                                            return dataAndEvents.backgroundY;
                                                        };
                                                        break;
                                                    case 65347:
                                                        /** @type {function (?, ?): ?} */
                                                        this.memoryHighReader[67] = this.memoryReader[65347] = function(dataAndEvents, deepDataAndEvents) {
                                                            return dataAndEvents.backgroundX;
                                                        };
                                                        break;
                                                    case 65348:
                                                        /** @type {function (Object, ?): ?} */
                                                        this.memoryHighReader[68] = this.memoryReader[65348] = function(options, dataAndEvents) {
                                                            return options.LCDisOn ? options.memory[65348] : 0;
                                                        };
                                                        break;
                                                    case 65354:
                                                        /** @type {function (?, ?): ?} */
                                                        this.memoryHighReader[74] = this.memoryReader[65354] = function(dataAndEvents, deepDataAndEvents) {
                                                            return dataAndEvents.windowY;
                                                        };
                                                        break;
                                                    case 65359:
                                                        /** @type {function (?, ?): ?} */
                                                        this.memoryHighReader[79] = this.memoryReader[65359] = function(dataAndEvents, deepDataAndEvents) {
                                                            return dataAndEvents.currVRAMBank;
                                                        };
                                                        break;
                                                    case 65365:
                                                        if (this.cGBC) {
                                                            /** @type {function (Object, ?): ?} */
                                                            this.memoryHighReader[85] = this.memoryReader[65365] = function(options, dataAndEvents) {
                                                                if (!options.LCDisOn && options.hdmaRunning) {
                                                                    options.DMAWrite((options.memory[65365] & 127) + 1);
                                                                    /** @type {number} */
                                                                    options.memory[65365] = 255;
                                                                    /** @type {boolean} */
                                                                    options.hdmaRunning = false;
                                                                }
                                                                return options.memory[65365];
                                                            };
                                                        } else {
                                                            this.memoryReader[65365] = this.memoryReadNormal;
                                                            this.memoryHighReader[85] = this.memoryHighReadNormal;
                                                        }
                                                        break;
                                                    case 65366:
                                                        if (this.cGBC) {
                                                            /** @type {function (Object, ?): ?} */
                                                            this.memoryHighReader[86] = this.memoryReader[65366] = function(options, dataAndEvents) {
                                                                return 60 | (options.memory[65366] >= 192 ? 2 | options.memory[65366] & 193 : options.memory[65366] & 195);
                                                            };
                                                        } else {
                                                            this.memoryReader[65366] = this.memoryReadNormal;
                                                            this.memoryHighReader[86] = this.memoryHighReadNormal;
                                                        }
                                                        break;
                                                    case 65388:
                                                        if (this.cGBC) {
                                                            /** @type {function (Object, ?): ?} */
                                                            this.memoryHighReader[108] = this.memoryReader[65388] = function(options, dataAndEvents) {
                                                                return 254 | options.memory[65388];
                                                            };
                                                        } else {
                                                            this.memoryHighReader[108] = this.memoryReader[65388] = this.memoryReadBAD;
                                                        }
                                                        break;
                                                    case 65392:
                                                        if (this.cGBC) {
                                                            /** @type {function (Object, ?): ?} */
                                                            this.memoryHighReader[112] = this.memoryReader[65392] = function(options, dataAndEvents) {
                                                                return 64 | options.memory[65392];
                                                            };
                                                        } else {
                                                            this.memoryHighReader[112] = this.memoryReader[65392] = this.memoryReadBAD;
                                                        }
                                                        break;
                                                    case 65397:
                                                        /** @type {function (Object, ?): ?} */
                                                        this.memoryHighReader[117] = this.memoryReader[65397] = function(options, dataAndEvents) {
                                                            return 143 | options.memory[65397];
                                                        };
                                                        break;
                                                    case 65398:
                                                        ;
                                                    case 65399:
                                                        /** @type {function (?, ?): ?} */
                                                        this.memoryHighReader[unlock & 255] = this.memoryReader[unlock] = function(dataAndEvents, deepDataAndEvents) {
                                                            return 0;
                                                        };
                                                        break;
                                                    case 65535:
                                                        /** @type {function (?, ?): ?} */
                                                        this.memoryHighReader[255] = this.memoryReader[65535] = function(dataAndEvents, deepDataAndEvents) {
                                                            return dataAndEvents.interruptsEnabled;
                                                        };
                                                        break;
                                                    default:
                                                        this.memoryReader[unlock] = this.memoryReadNormal;
                                                        this.memoryHighReader[unlock & 255] = this.memoryHighReadNormal;
                                                }
                                            } else {
                                                this.memoryReader[unlock] = this.memoryReadBAD;
                                            }
                                        }
                                    }
                                }
                            }
                        }
                    }
                }
            }
        }
    }
};
/**
 * @param {Object} self
 * @param {?} timeoutKey
 * @return {?}
 */
GameBoyCore.prototype.memoryReadNormal = function(self, timeoutKey) {
    return self.memory[timeoutKey];
};
/**
 * @param {Object} options
 * @param {number} dataAndEvents
 * @return {?}
 */
GameBoyCore.prototype.memoryHighReadNormal = function(options, dataAndEvents) {
    return options.memory[65280 | dataAndEvents];
};
/**
 * @param {?} arr
 * @param {?} opt_fromIndex
 * @return {?}
 */
GameBoyCore.prototype.memoryReadROM = function(arr, opt_fromIndex) {
    return arr.ROM[arr.currentROMBank + opt_fromIndex];
};
/**
 * @param {?} _this
 * @param {?} i
 * @return {?}
 */
GameBoyCore.prototype.memoryReadMBC = function(_this, i) {
    if (_this.MBCRAMBanksEnabled || settings[10]) {
        return _this.MBCRam[i + _this.currMBCRAMBankPosition];
    }
    return 255;
};
/**
 * @param {?} _this
 * @param {?} i
 * @return {?}
 */
GameBoyCore.prototype.memoryReadMBC7 = function(_this, i) {
    if (_this.MBCRAMBanksEnabled || settings[10]) {
        switch(i) {
            case 40960:
                ;
            case 41056:
                ;
            case 41072:
                return 0;
            case 41088:
                return 0;
            case 41040:
                return _this.highY;
            case 41024:
                return _this.lowY;
            case 41008:
                return _this.highX;
            case 40992:
                return _this.lowX;
            default:
                return _this.MBCRam[i + _this.currMBCRAMBankPosition];
        }
    }
    return 255;
};
/**
 * @param {?} _this
 * @param {?} i
 * @return {?}
 */
GameBoyCore.prototype.memoryReadMBC3 = function(_this, i) {
    if (_this.MBCRAMBanksEnabled || settings[10]) {
        switch(_this.currMBCRAMBank) {
            case 0:
                ;
            case 1:
                ;
            case 2:
                ;
            case 3:
                return _this.MBCRam[i + _this.currMBCRAMBankPosition];
                break;
            case 8:
                return _this.latchedSeconds;
                break;
            case 9:
                return _this.latchedMinutes;
                break;
            case 10:
                return _this.latchedHours;
                break;
            case 11:
                return _this.latchedLDays;
                break;
            case 12:
                return(_this.RTCDayOverFlow ? 128 : 0) + (_this.RTCHALT ? 64 : 0) + _this.latchedHDays;
        }
    }
    return 255;
};
/**
 * @param {?} _this
 * @param {?} i
 * @return {?}
 */
GameBoyCore.prototype.memoryReadGBCMemory = function(_this, i) {
    return _this.GBCMemory[i + _this.gbcRamBankPosition];
};
/**
 * @param {Object} self
 * @param {?} timeoutKey
 * @return {?}
 */
GameBoyCore.prototype.memoryReadOAM = function(self, timeoutKey) {
    return self.modeSTAT > 1 ? 255 : self.memory[timeoutKey];
};
/**
 * @param {?} _this
 * @param {?} i
 * @return {?}
 */
GameBoyCore.prototype.memoryReadECHOGBCMemory = function(_this, i) {
    return _this.GBCMemory[i + _this.gbcRamBankPositionECHO];
};
/**
 * @param {Object} options
 * @param {number} i
 * @return {?}
 */
GameBoyCore.prototype.memoryReadECHONormal = function(options, i) {
    return options.memory[i - 8192];
};
/**
 * @param {?} dataAndEvents
 * @param {?} deepDataAndEvents
 * @return {?}
 */
GameBoyCore.prototype.memoryReadBAD = function(dataAndEvents, deepDataAndEvents) {
    return 255;
};
/**
 * @param {Object} core
 * @param {number} idx_channel
 * @return {?}
 */
GameBoyCore.prototype.VRAMDATAReadCGBCPU = function(core, idx_channel) {
    return core.modeSTAT > 2 ? 255 : core.currVRAMBank == 0 ? core.memory[idx_channel] : core.VRAM[idx_channel & 8191];
};
/**
 * @param {Object} self
 * @param {?} timeoutKey
 * @return {?}
 */
GameBoyCore.prototype.VRAMDATAReadDMGCPU = function(self, timeoutKey) {
    return self.modeSTAT > 2 ? 255 : self.memory[timeoutKey];
};
/**
 * @param {?} dataAndEvents
 * @param {number} deepDataAndEvents
 * @return {?}
 */
GameBoyCore.prototype.VRAMCHRReadCGBCPU = function(dataAndEvents, deepDataAndEvents) {
    return dataAndEvents.modeSTAT > 2 ? 255 : dataAndEvents.BGCHRCurrentBank[deepDataAndEvents & 2047];
};
/**
 * @param {?} dataAndEvents
 * @param {number} deepDataAndEvents
 * @return {?}
 */
GameBoyCore.prototype.VRAMCHRReadDMGCPU = function(dataAndEvents, deepDataAndEvents) {
    return dataAndEvents.modeSTAT > 2 ? 255 : dataAndEvents.BGCHRBank1[deepDataAndEvents & 2047];
};
/**
 * @return {undefined}
 */
GameBoyCore.prototype.setCurrentMBC1ROMBank = function() {
    switch(this.ROMBank1offs) {
        case 0:
            ;
        case 32:
            ;
        case 64:
            ;
        case 96:
            /** @type {number} */
            this.currentROMBank = this.ROMBank1offs % this.ROMBankEdge << 14;
            break;
        default:
            /** @type {number} */
            this.currentROMBank = this.ROMBank1offs % this.ROMBankEdge - 1 << 14;
    }
};
/**
 * @return {undefined}
 */
GameBoyCore.prototype.setCurrentMBC2AND3ROMBank = function() {
    /** @type {number} */
    this.currentROMBank = Math.max(this.ROMBank1offs % this.ROMBankEdge - 1, 0) << 14;
};
/**
 * @return {undefined}
 */
GameBoyCore.prototype.setCurrentMBC5ROMBank = function() {
    /** @type {number} */
    this.currentROMBank = this.ROMBank1offs % this.ROMBankEdge - 1 << 14;
};
/**
 * @param {number} type
 * @param {number} value
 * @return {undefined}
 */
GameBoyCore.prototype.memoryWrite = function(type, value) {
    this.memoryWriter[type](this, type, value);
};
/**
 * @param {?} type
 * @param {?} isXML
 * @return {undefined}
 */
GameBoyCore.prototype.memoryHighWrite = function(type, isXML) {
    this.memoryHighWriter[type](this, type, isXML);
};
/**
 * @return {undefined}
 */
GameBoyCore.prototype.memoryWriteJumpCompile = function() {
    /** @type {number} */
    var unlock = 0;
    for (;unlock <= 65535;unlock++) {
        if (unlock < 32768) {
            if (this.cMBC1) {
                if (unlock < 8192) {
                    this.memoryWriter[unlock] = this.MBCWriteEnable;
                } else {
                    if (unlock < 16384) {
                        this.memoryWriter[unlock] = this.MBC1WriteROMBank;
                    } else {
                        if (unlock < 24576) {
                            this.memoryWriter[unlock] = this.MBC1WriteRAMBank;
                        } else {
                            this.memoryWriter[unlock] = this.MBC1WriteType;
                        }
                    }
                }
            } else {
                if (this.cMBC2) {
                    if (unlock < 4096) {
                        this.memoryWriter[unlock] = this.MBCWriteEnable;
                    } else {
                        if (unlock >= 8448 && unlock < 8704) {
                            this.memoryWriter[unlock] = this.MBC2WriteROMBank;
                        } else {
                            this.memoryWriter[unlock] = this.cartIgnoreWrite;
                        }
                    }
                } else {
                    if (this.cMBC3) {
                        if (unlock < 8192) {
                            this.memoryWriter[unlock] = this.MBCWriteEnable;
                        } else {
                            if (unlock < 16384) {
                                this.memoryWriter[unlock] = this.MBC3WriteROMBank;
                            } else {
                                if (unlock < 24576) {
                                    this.memoryWriter[unlock] = this.MBC3WriteRAMBank;
                                } else {
                                    this.memoryWriter[unlock] = this.MBC3WriteRTCLatch;
                                }
                            }
                        }
                    } else {
                        if (this.cMBC5 || (this.cRUMBLE || this.cMBC7)) {
                            if (unlock < 8192) {
                                this.memoryWriter[unlock] = this.MBCWriteEnable;
                            } else {
                                if (unlock < 12288) {
                                    this.memoryWriter[unlock] = this.MBC5WriteROMBankLow;
                                } else {
                                    if (unlock < 16384) {
                                        this.memoryWriter[unlock] = this.MBC5WriteROMBankHigh;
                                    } else {
                                        if (unlock < 24576) {
                                            this.memoryWriter[unlock] = this.cRUMBLE ? this.RUMBLEWriteRAMBank : this.MBC5WriteRAMBank;
                                        } else {
                                            this.memoryWriter[unlock] = this.cartIgnoreWrite;
                                        }
                                    }
                                }
                            }
                        } else {
                            if (this.cHuC3) {
                                if (unlock < 8192) {
                                    this.memoryWriter[unlock] = this.MBCWriteEnable;
                                } else {
                                    if (unlock < 16384) {
                                        this.memoryWriter[unlock] = this.MBC3WriteROMBank;
                                    } else {
                                        if (unlock < 24576) {
                                            this.memoryWriter[unlock] = this.HuC3WriteRAMBank;
                                        } else {
                                            this.memoryWriter[unlock] = this.cartIgnoreWrite;
                                        }
                                    }
                                }
                            } else {
                                this.memoryWriter[unlock] = this.cartIgnoreWrite;
                            }
                        }
                    }
                }
            }
        } else {
            if (unlock < 36864) {
                this.memoryWriter[unlock] = this.cGBC ? this.VRAMGBCDATAWrite : this.VRAMGBDATAWrite;
            } else {
                if (unlock < 38912) {
                    this.memoryWriter[unlock] = this.cGBC ? this.VRAMGBCDATAWrite : this.VRAMGBDATAUpperWrite;
                } else {
                    if (unlock < 40960) {
                        this.memoryWriter[unlock] = this.cGBC ? this.VRAMGBCCHRMAPWrite : this.VRAMGBCHRMAPWrite;
                    } else {
                        if (unlock < 49152) {
                            if (this.numRAMBanks == 1 / 16 && unlock < 41472 || this.numRAMBanks >= 1) {
                                if (!this.cMBC3) {
                                    this.memoryWriter[unlock] = this.memoryWriteMBCRAM;
                                } else {
                                    this.memoryWriter[unlock] = this.memoryWriteMBC3RAM;
                                }
                            } else {
                                this.memoryWriter[unlock] = this.cartIgnoreWrite;
                            }
                        } else {
                            if (unlock < 57344) {
                                if (this.cGBC && unlock >= 53248) {
                                    this.memoryWriter[unlock] = this.memoryWriteGBCRAM;
                                } else {
                                    this.memoryWriter[unlock] = this.memoryWriteNormal;
                                }
                            } else {
                                if (unlock < 65024) {
                                    if (this.cGBC && unlock >= 61440) {
                                        this.memoryWriter[unlock] = this.memoryWriteECHOGBCRAM;
                                    } else {
                                        this.memoryWriter[unlock] = this.memoryWriteECHONormal;
                                    }
                                } else {
                                    if (unlock <= 65184) {
                                        this.memoryWriter[unlock] = this.memoryWriteOAMRAM;
                                    } else {
                                        if (unlock < 65280) {
                                            if (this.cGBC) {
                                                this.memoryWriter[unlock] = this.memoryWriteNormal;
                                            } else {
                                                this.memoryWriter[unlock] = this.cartIgnoreWrite;
                                            }
                                        } else {
                                            this.memoryWriter[unlock] = this.memoryWriteNormal;
                                            this.memoryHighWriter[unlock & 255] = this.memoryHighWriteNormal;
                                        }
                                    }
                                }
                            }
                        }
                    }
                }
            }
        }
    }
    this.registerWriteJumpCompile();
};
/**
 * @param {?} dataAndEvents
 * @param {?} deepDataAndEvents
 * @param {number} ignoreMethodDoesntExist
 * @return {undefined}
 */
GameBoyCore.prototype.MBCWriteEnable = function(dataAndEvents, deepDataAndEvents, ignoreMethodDoesntExist) {
    /** @type {boolean} */
    dataAndEvents.MBCRAMBanksEnabled = (ignoreMethodDoesntExist & 15) == 10;
};
/**
 * @param {?} dataAndEvents
 * @param {?} deepDataAndEvents
 * @param {number} ignoreMethodDoesntExist
 * @return {undefined}
 */
GameBoyCore.prototype.MBC1WriteROMBank = function(dataAndEvents, deepDataAndEvents, ignoreMethodDoesntExist) {
    /** @type {number} */
    dataAndEvents.ROMBank1offs = dataAndEvents.ROMBank1offs & 96 | ignoreMethodDoesntExist & 31;
    dataAndEvents.setCurrentMBC1ROMBank();
};
/**
 * @param {?} dataAndEvents
 * @param {?} ignoreMethodDoesntExist
 * @param {number} deepDataAndEvents
 * @return {undefined}
 */
GameBoyCore.prototype.MBC1WriteRAMBank = function(dataAndEvents, ignoreMethodDoesntExist, deepDataAndEvents) {
    if (dataAndEvents.MBC1Mode) {
        /** @type {number} */
        dataAndEvents.currMBCRAMBank = deepDataAndEvents & 3;
        /** @type {number} */
        dataAndEvents.currMBCRAMBankPosition = (dataAndEvents.currMBCRAMBank << 13) - 40960;
    } else {
        /** @type {number} */
        dataAndEvents.ROMBank1offs = (deepDataAndEvents & 3) << 5 | dataAndEvents.ROMBank1offs & 31;
        dataAndEvents.setCurrentMBC1ROMBank();
    }
};
/**
 * @param {?} dataAndEvents
 * @param {?} deepDataAndEvents
 * @param {number} ignoreMethodDoesntExist
 * @return {undefined}
 */
GameBoyCore.prototype.MBC1WriteType = function(dataAndEvents, deepDataAndEvents, ignoreMethodDoesntExist) {
    /** @type {boolean} */
    dataAndEvents.MBC1Mode = (ignoreMethodDoesntExist & 1) == 1;
    if (dataAndEvents.MBC1Mode) {
        dataAndEvents.ROMBank1offs &= 31;
        dataAndEvents.setCurrentMBC1ROMBank();
    } else {
        /** @type {number} */
        dataAndEvents.currMBCRAMBank = 0;
        /** @type {number} */
        dataAndEvents.currMBCRAMBankPosition = -40960;
    }
};
/**
 * @param {?} dataAndEvents
 * @param {?} ignoreMethodDoesntExist
 * @param {number} deepDataAndEvents
 * @return {undefined}
 */
GameBoyCore.prototype.MBC2WriteROMBank = function(dataAndEvents, ignoreMethodDoesntExist, deepDataAndEvents) {
    /** @type {number} */
    dataAndEvents.ROMBank1offs = deepDataAndEvents & 15;
    dataAndEvents.setCurrentMBC2AND3ROMBank();
};
/**
 * @param {?} dataAndEvents
 * @param {?} ignoreMethodDoesntExist
 * @param {number} deepDataAndEvents
 * @return {undefined}
 */
GameBoyCore.prototype.MBC3WriteROMBank = function(dataAndEvents, ignoreMethodDoesntExist, deepDataAndEvents) {
    /** @type {number} */
    dataAndEvents.ROMBank1offs = deepDataAndEvents & 127;
    dataAndEvents.setCurrentMBC2AND3ROMBank();
};
/**
 * @param {?} a
 * @param {?} dataAndEvents
 * @param {number} e
 * @return {undefined}
 */
GameBoyCore.prototype.MBC3WriteRAMBank = function(a, dataAndEvents, e) {
    /** @type {number} */
    a.currMBCRAMBank = e;
    if (e < 4) {
        /** @type {number} */
        a.currMBCRAMBankPosition = (a.currMBCRAMBank << 13) - 40960;
    }
};
/**
 * @param {?} dataAndEvents
 * @param {?} deepDataAndEvents
 * @param {number} ignoreMethodDoesntExist
 * @return {undefined}
 */
GameBoyCore.prototype.MBC3WriteRTCLatch = function(dataAndEvents, deepDataAndEvents, ignoreMethodDoesntExist) {
    if (ignoreMethodDoesntExist == 0) {
        /** @type {boolean} */
        dataAndEvents.RTCisLatched = false;
    } else {
        if (!dataAndEvents.RTCisLatched) {
            /** @type {boolean} */
            dataAndEvents.RTCisLatched = true;
            /** @type {number} */
            dataAndEvents.latchedSeconds = dataAndEvents.RTCSeconds | 0;
            dataAndEvents.latchedMinutes = dataAndEvents.RTCMinutes;
            dataAndEvents.latchedHours = dataAndEvents.RTCHours;
            /** @type {number} */
            dataAndEvents.latchedLDays = dataAndEvents.RTCDays & 255;
            /** @type {number} */
            dataAndEvents.latchedHDays = dataAndEvents.RTCDays >> 8;
        }
    }
};
/**
 * @param {?} dataAndEvents
 * @param {?} ignoreMethodDoesntExist
 * @param {number} deepDataAndEvents
 * @return {undefined}
 */
GameBoyCore.prototype.MBC5WriteROMBankLow = function(dataAndEvents, ignoreMethodDoesntExist, deepDataAndEvents) {
    /** @type {number} */
    dataAndEvents.ROMBank1offs = dataAndEvents.ROMBank1offs & 256 | deepDataAndEvents;
    dataAndEvents.setCurrentMBC5ROMBank();
};
/**
 * @param {?} dataAndEvents
 * @param {?} deepDataAndEvents
 * @param {number} ignoreMethodDoesntExist
 * @return {undefined}
 */
GameBoyCore.prototype.MBC5WriteROMBankHigh = function(dataAndEvents, deepDataAndEvents, ignoreMethodDoesntExist) {
    /** @type {number} */
    dataAndEvents.ROMBank1offs = (ignoreMethodDoesntExist & 1) << 8 | dataAndEvents.ROMBank1offs & 255;
    dataAndEvents.setCurrentMBC5ROMBank();
};
/**
 * @param {?} dataAndEvents
 * @param {?} ignoreMethodDoesntExist
 * @param {number} deepDataAndEvents
 * @return {undefined}
 */
GameBoyCore.prototype.MBC5WriteRAMBank = function(dataAndEvents, ignoreMethodDoesntExist, deepDataAndEvents) {
    /** @type {number} */
    dataAndEvents.currMBCRAMBank = deepDataAndEvents & 15;
    /** @type {number} */
    dataAndEvents.currMBCRAMBankPosition = (dataAndEvents.currMBCRAMBank << 13) - 40960;
};
/**
 * @param {?} dataAndEvents
 * @param {?} ignoreMethodDoesntExist
 * @param {number} deepDataAndEvents
 * @return {undefined}
 */
GameBoyCore.prototype.RUMBLEWriteRAMBank = function(dataAndEvents, ignoreMethodDoesntExist, deepDataAndEvents) {
    /** @type {number} */
    dataAndEvents.currMBCRAMBank = deepDataAndEvents & 3;
    /** @type {number} */
    dataAndEvents.currMBCRAMBankPosition = (dataAndEvents.currMBCRAMBank << 13) - 40960;
};
/**
 * @param {?} dataAndEvents
 * @param {?} ignoreMethodDoesntExist
 * @param {number} deepDataAndEvents
 * @return {undefined}
 */
GameBoyCore.prototype.HuC3WriteRAMBank = function(dataAndEvents, ignoreMethodDoesntExist, deepDataAndEvents) {
    /** @type {number} */
    dataAndEvents.currMBCRAMBank = deepDataAndEvents & 3;
    /** @type {number} */
    dataAndEvents.currMBCRAMBankPosition = (dataAndEvents.currMBCRAMBank << 13) - 40960;
};
/**
 * @param {?} dataAndEvents
 * @param {?} deepDataAndEvents
 * @param {?} ignoreMethodDoesntExist
 * @return {undefined}
 */
GameBoyCore.prototype.cartIgnoreWrite = function(dataAndEvents, deepDataAndEvents, ignoreMethodDoesntExist) {
};
/**
 * @param {Object} options
 * @param {?} i
 * @param {?} offsetPosition
 * @return {undefined}
 */
GameBoyCore.prototype.memoryWriteNormal = function(options, i, offsetPosition) {
    options.memory[i] = offsetPosition;
};
/**
 * @param {Object} options
 * @param {number} dataAndEvents
 * @param {?} deepDataAndEvents
 * @return {undefined}
 */
GameBoyCore.prototype.memoryHighWriteNormal = function(options, dataAndEvents, deepDataAndEvents) {
    options.memory[65280 | dataAndEvents] = deepDataAndEvents;
};
/**
 * @param {?} _this
 * @param {?} i
 * @param {?} dataAndEvents
 * @return {undefined}
 */
GameBoyCore.prototype.memoryWriteMBCRAM = function(_this, i, dataAndEvents) {
    if (_this.MBCRAMBanksEnabled || settings[10]) {
        _this.MBCRam[i + _this.currMBCRAMBankPosition] = dataAndEvents;
    }
};
/**
 * @param {?} a
 * @param {?} ax
 * @param {number} e
 * @return {undefined}
 */
GameBoyCore.prototype.memoryWriteMBC3RAM = function(a, ax, e) {
    if (a.MBCRAMBanksEnabled || settings[10]) {
        switch(a.currMBCRAMBank) {
            case 0:
                ;
            case 1:
                ;
            case 2:
                ;
            case 3:
                /** @type {number} */
                a.MBCRam[ax + a.currMBCRAMBankPosition] = e;
                break;
            case 8:
                if (e < 60) {
                    /** @type {number} */
                    a.RTCSeconds = e;
                } else {
                    cout("(Bank #" + a.currMBCRAMBank + ") RTC write out of range: " + e, 1);
                }
                break;
            case 9:
                if (e < 60) {
                    /** @type {number} */
                    a.RTCMinutes = e;
                } else {
                    cout("(Bank #" + a.currMBCRAMBank + ") RTC write out of range: " + e, 1);
                }
                break;
            case 10:
                if (e < 24) {
                    /** @type {number} */
                    a.RTCHours = e;
                } else {
                    cout("(Bank #" + a.currMBCRAMBank + ") RTC write out of range: " + e, 1);
                }
                break;
            case 11:
                /** @type {number} */
                a.RTCDays = e & 255 | a.RTCDays & 256;
                break;
            case 12:
                /** @type {boolean} */
                a.RTCDayOverFlow = e > 127;
                /** @type {boolean} */
                a.RTCHalt = (e & 64) == 64;
                /** @type {number} */
                a.RTCDays = (e & 1) << 8 | a.RTCDays & 255;
                break;
            default:
                cout("Invalid MBC3 bank address selected: " + a.currMBCRAMBank, 0);
        }
    }
};
/**
 * @param {?} _this
 * @param {?} i
 * @param {?} dataAndEvents
 * @return {undefined}
 */
GameBoyCore.prototype.memoryWriteGBCRAM = function(_this, i, dataAndEvents) {
    _this.GBCMemory[i + _this.gbcRamBankPosition] = dataAndEvents;
};
/**
 * @param {Object} options
 * @param {?} key
 * @param {?} value
 * @return {undefined}
 */
GameBoyCore.prototype.memoryWriteOAMRAM = function(options, key, value) {
    if (options.modeSTAT < 2) {
        if (options.memory[key] != value) {
            options.graphicsJIT();
            options.memory[key] = value;
        }
    }
};
/**
 * @param {?} _this
 * @param {?} i
 * @param {?} dataAndEvents
 * @return {undefined}
 */
GameBoyCore.prototype.memoryWriteECHOGBCRAM = function(_this, i, dataAndEvents) {
    _this.GBCMemory[i + _this.gbcRamBankPositionECHO] = dataAndEvents;
};
/**
 * @param {Object} options
 * @param {number} i
 * @param {?} dataAndEvents
 * @return {undefined}
 */
GameBoyCore.prototype.memoryWriteECHONormal = function(options, i, dataAndEvents) {
    options.memory[i - 8192] = dataAndEvents;
};
/**
 * @param {Object} options
 * @param {number} key
 * @param {?} value
 * @return {undefined}
 */
GameBoyCore.prototype.VRAMGBDATAWrite = function(options, key, value) {
    if (options.modeSTAT < 3) {
        if (options.memory[key] != value) {
            options.graphicsJIT();
            options.memory[key] = value;
            options.generateGBOAMTileLine(key);
        }
    }
};
/**
 * @param {Object} options
 * @param {number} key
 * @param {?} value
 * @return {undefined}
 */
GameBoyCore.prototype.VRAMGBDATAUpperWrite = function(options, key, value) {
    if (options.modeSTAT < 3) {
        if (options.memory[key] != value) {
            options.graphicsJIT();
            options.memory[key] = value;
            options.generateGBTileLine(key);
        }
    }
};
/**
 * @param {Object} options
 * @param {number} key
 * @param {number} value
 * @return {undefined}
 */
GameBoyCore.prototype.VRAMGBCDATAWrite = function(options, key, value) {
    if (options.modeSTAT < 3) {
        if (options.currVRAMBank == 0) {
            if (options.memory[key] != value) {
                options.graphicsJIT();
                /** @type {number} */
                options.memory[key] = value;
                options.generateGBCTileLineBank1(key);
            }
        } else {
            key &= 8191;
            if (options.VRAM[key] != value) {
                options.graphicsJIT();
                /** @type {number} */
                options.VRAM[key] = value;
                options.generateGBCTileLineBank2(key);
            }
        }
    }
};
/**
 * @param {?} stmt
 * @param {number} key
 * @param {?} value
 * @return {undefined}
 */
GameBoyCore.prototype.VRAMGBCHRMAPWrite = function(stmt, key, value) {
    if (stmt.modeSTAT < 3) {
        key &= 2047;
        if (stmt.BGCHRBank1[key] != value) {
            stmt.graphicsJIT();
            stmt.BGCHRBank1[key] = value;
        }
    }
};
/**
 * @param {?} stmt
 * @param {number} key
 * @param {?} value
 * @return {undefined}
 */
GameBoyCore.prototype.VRAMGBCCHRMAPWrite = function(stmt, key, value) {
    if (stmt.modeSTAT < 3) {
        key &= 2047;
        if (stmt.BGCHRCurrentBank[key] != value) {
            stmt.graphicsJIT();
            stmt.BGCHRCurrentBank[key] = value;
        }
    }
};
/**
 * @param {number} dataAndEvents
 * @return {undefined}
 */
GameBoyCore.prototype.DMAWrite = function(dataAndEvents) {
    if (!this.halt) {
        this.CPUTicks += 4 | dataAndEvents << 5 << this.doubleSpeedShifter;
    }
    /** @type {number} */
    var c = this.memory[65361] << 8 | this.memory[65362];
    /** @type {number} */
    var sel = this.memory[65363] << 8 | this.memory[65364];
    var classNames = this.memoryReader;
    this.graphicsJIT();
    var b = this.memory;
    if (this.currVRAMBank == 0) {
        do {
            if (sel < 6144) {
                b[32768 | sel] = classNames[c](this, c++);
                b[32769 | sel] = classNames[c](this, c++);
                b[32770 | sel] = classNames[c](this, c++);
                b[32771 | sel] = classNames[c](this, c++);
                b[32772 | sel] = classNames[c](this, c++);
                b[32773 | sel] = classNames[c](this, c++);
                b[32774 | sel] = classNames[c](this, c++);
                b[32775 | sel] = classNames[c](this, c++);
                b[32776 | sel] = classNames[c](this, c++);
                b[32777 | sel] = classNames[c](this, c++);
                b[32778 | sel] = classNames[c](this, c++);
                b[32779 | sel] = classNames[c](this, c++);
                b[32780 | sel] = classNames[c](this, c++);
                b[32781 | sel] = classNames[c](this, c++);
                b[32782 | sel] = classNames[c](this, c++);
                b[32783 | sel] = classNames[c](this, c++);
                this.generateGBCTileBank1(sel);
                sel += 16;
            } else {
                sel &= 2032;
                this.BGCHRBank1[sel++] = classNames[c](this, c++);
                this.BGCHRBank1[sel++] = classNames[c](this, c++);
                this.BGCHRBank1[sel++] = classNames[c](this, c++);
                this.BGCHRBank1[sel++] = classNames[c](this, c++);
                this.BGCHRBank1[sel++] = classNames[c](this, c++);
                this.BGCHRBank1[sel++] = classNames[c](this, c++);
                this.BGCHRBank1[sel++] = classNames[c](this, c++);
                this.BGCHRBank1[sel++] = classNames[c](this, c++);
                this.BGCHRBank1[sel++] = classNames[c](this, c++);
                this.BGCHRBank1[sel++] = classNames[c](this, c++);
                this.BGCHRBank1[sel++] = classNames[c](this, c++);
                this.BGCHRBank1[sel++] = classNames[c](this, c++);
                this.BGCHRBank1[sel++] = classNames[c](this, c++);
                this.BGCHRBank1[sel++] = classNames[c](this, c++);
                this.BGCHRBank1[sel++] = classNames[c](this, c++);
                this.BGCHRBank1[sel++] = classNames[c](this, c++);
                /** @type {number} */
                sel = sel + 6144 & 8176;
            }
            c &= 65520;
            --dataAndEvents;
        } while (dataAndEvents > 0);
    } else {
        var matches = this.VRAM;
        do {
            if (sel < 6144) {
                matches[sel] = classNames[c](this, c++);
                matches[sel | 1] = classNames[c](this, c++);
                matches[sel | 2] = classNames[c](this, c++);
                matches[sel | 3] = classNames[c](this, c++);
                matches[sel | 4] = classNames[c](this, c++);
                matches[sel | 5] = classNames[c](this, c++);
                matches[sel | 6] = classNames[c](this, c++);
                matches[sel | 7] = classNames[c](this, c++);
                matches[sel | 8] = classNames[c](this, c++);
                matches[sel | 9] = classNames[c](this, c++);
                matches[sel | 10] = classNames[c](this, c++);
                matches[sel | 11] = classNames[c](this, c++);
                matches[sel | 12] = classNames[c](this, c++);
                matches[sel | 13] = classNames[c](this, c++);
                matches[sel | 14] = classNames[c](this, c++);
                matches[sel | 15] = classNames[c](this, c++);
                this.generateGBCTileBank2(sel);
                sel += 16;
            } else {
                sel &= 2032;
                this.BGCHRBank2[sel++] = classNames[c](this, c++);
                this.BGCHRBank2[sel++] = classNames[c](this, c++);
                this.BGCHRBank2[sel++] = classNames[c](this, c++);
                this.BGCHRBank2[sel++] = classNames[c](this, c++);
                this.BGCHRBank2[sel++] = classNames[c](this, c++);
                this.BGCHRBank2[sel++] = classNames[c](this, c++);
                this.BGCHRBank2[sel++] = classNames[c](this, c++);
                this.BGCHRBank2[sel++] = classNames[c](this, c++);
                this.BGCHRBank2[sel++] = classNames[c](this, c++);
                this.BGCHRBank2[sel++] = classNames[c](this, c++);
                this.BGCHRBank2[sel++] = classNames[c](this, c++);
                this.BGCHRBank2[sel++] = classNames[c](this, c++);
                this.BGCHRBank2[sel++] = classNames[c](this, c++);
                this.BGCHRBank2[sel++] = classNames[c](this, c++);
                this.BGCHRBank2[sel++] = classNames[c](this, c++);
                this.BGCHRBank2[sel++] = classNames[c](this, c++);
                /** @type {number} */
                sel = sel + 6144 & 8176;
            }
            c &= 65520;
            --dataAndEvents;
        } while (dataAndEvents > 0);
    }
    /** @type {number} */
    b[65361] = c >> 8;
    /** @type {number} */
    b[65362] = c & 240;
    /** @type {number} */
    b[65363] = sel >> 8;
    /** @type {number} */
    b[65364] = sel & 240;
};
/**
 * @return {undefined}
 */
GameBoyCore.prototype.registerWriteJumpCompile = function() {
    /** @type {function (Object, ?, number): undefined} */
    this.memoryHighWriter[0] = this.memoryWriter[65280] = function(options, dataAndEvents, deepDataAndEvents) {
        /** @type {number} */
        options.memory[65280] = deepDataAndEvents & 48 | ((deepDataAndEvents & 32) == 0 ? options.JoyPad >> 4 : 15) & ((deepDataAndEvents & 16) == 0 ? options.JoyPad & 15 : 15);
    };
    /** @type {function (Object, ?, ?): undefined} */
    this.memoryHighWriter[1] = this.memoryWriter[65281] = function(options, dataAndEvents, deepDataAndEvents) {
        if (options.memory[65282] < 128) {
            options.memory[65281] = deepDataAndEvents;
        }
    };
    /** @type {function (Object, ?, ?): undefined} */
    this.memoryHighWriter[4] = this.memoryWriter[65284] = function(options, dataAndEvents, deepDataAndEvents) {
        options.DIVTicks &= 255;
        /** @type {number} */
        options.memory[65284] = 0;
    };
    /** @type {function (Object, ?, ?): undefined} */
    this.memoryHighWriter[5] = this.memoryWriter[65285] = function(options, dataAndEvents, deepDataAndEvents) {
        options.memory[65285] = deepDataAndEvents;
    };
    /** @type {function (Object, ?, ?): undefined} */
    this.memoryHighWriter[6] = this.memoryWriter[65286] = function(options, dataAndEvents, deepDataAndEvents) {
        options.memory[65286] = deepDataAndEvents;
    };
    /** @type {function (Object, ?, number): undefined} */
    this.memoryHighWriter[7] = this.memoryWriter[65287] = function(options, dataAndEvents, deepDataAndEvents) {
        /** @type {number} */
        options.memory[65287] = deepDataAndEvents & 7;
        /** @type {boolean} */
        options.TIMAEnabled = (deepDataAndEvents & 4) == 4;
        /** @type {number} */
        options.TACClocker = Math.pow(4, (deepDataAndEvents & 3) != 0 ? deepDataAndEvents & 3 : 4) << 2;
    };
    /** @type {function (?, ?, number): undefined} */
    this.memoryHighWriter[15] = this.memoryWriter[65295] = function(a, dataAndEvents, e) {
        /** @type {number} */
        a.interruptsRequested = e;
        a.checkIRQMatching();
    };
    /** @type {function (Object, ?, number): undefined} */
    this.memoryHighWriter[16] = this.memoryWriter[65296] = function(options, deepDataAndEvents, dataAndEvents) {
        if (options.soundMasterEnabled) {
            options.audioJIT();
            if (options.channel1decreaseSweep && (dataAndEvents & 8) == 0) {
                if (options.channel1numSweep != options.channel1frequencySweepDivider) {
                    /** @type {boolean} */
                    options.channel1SweepFault = true;
                }
            }
            /** @type {number} */
            options.channel1lastTimeSweep = (dataAndEvents & 112) >> 4;
            /** @type {number} */
            options.channel1frequencySweepDivider = dataAndEvents & 7;
            /** @type {boolean} */
            options.channel1decreaseSweep = (dataAndEvents & 8) == 8;
            /** @type {number} */
            options.memory[65296] = dataAndEvents;
            options.channel1EnableCheck();
        }
    };
    /** @type {function (Object, ?, number): undefined} */
    this.memoryHighWriter[17] = this.memoryWriter[65297] = function(options, deepDataAndEvents, dataAndEvents) {
        if (options.soundMasterEnabled || !options.cGBC) {
            if (options.soundMasterEnabled) {
                options.audioJIT();
            } else {
                dataAndEvents &= 63;
            }
            options.channel1CachedDuty = options.dutyLookup[dataAndEvents >> 6];
            /** @type {number} */
            options.channel1totalLength = 64 - (dataAndEvents & 63);
            /** @type {number} */
            options.memory[65297] = dataAndEvents & 192;
            options.channel1EnableCheck();
        }
    };
    /** @type {function (Object, ?, number): undefined} */
    this.memoryHighWriter[18] = this.memoryWriter[65298] = function(options, dataAndEvents, deepDataAndEvents) {
        if (options.soundMasterEnabled) {
            options.audioJIT();
            if (options.channel1Enabled && options.channel1envelopeSweeps == 0) {
                if (((options.memory[65298] ^ deepDataAndEvents) & 8) == 8) {
                    if ((options.memory[65298] & 8) == 0) {
                        if ((options.memory[65298] & 7) == 7) {
                            options.channel1envelopeVolume += 2;
                        } else {
                            ++options.channel1envelopeVolume;
                        }
                    }
                    /** @type {number} */
                    options.channel1envelopeVolume = 16 - options.channel1envelopeVolume & 15;
                } else {
                    if ((options.memory[65298] & 15) == 8) {
                        /** @type {number} */
                        options.channel1envelopeVolume = 1 + options.channel1envelopeVolume & 15;
                    }
                }
                options.channel1OutputLevelCache();
            }
            /** @type {boolean} */
            options.channel1envelopeType = (deepDataAndEvents & 8) == 8;
            /** @type {number} */
            options.memory[65298] = deepDataAndEvents;
            options.channel1VolumeEnableCheck();
        }
    };
    /** @type {function (Object, ?, number): undefined} */
    this.memoryHighWriter[19] = this.memoryWriter[65299] = function(options, deepDataAndEvents, dataAndEvents) {
        if (options.soundMasterEnabled) {
            options.audioJIT();
            /** @type {number} */
            options.channel1frequency = options.channel1frequency & 1792 | dataAndEvents;
            /** @type {number} */
            options.channel1FrequencyTracker = 2048 - options.channel1frequency << 2;
            /** @type {number} */
            options.memory[65299] = dataAndEvents;
        }
    };
    /** @type {function (Object, ?, number): undefined} */
    this.memoryHighWriter[20] = this.memoryWriter[65300] = function(options, dataAndEvents, deepDataAndEvents) {
        if (options.soundMasterEnabled) {
            options.audioJIT();
            /** @type {boolean} */
            options.channel1consecutive = (deepDataAndEvents & 64) == 0;
            /** @type {number} */
            options.channel1frequency = (deepDataAndEvents & 7) << 8 | options.channel1frequency & 255;
            /** @type {number} */
            options.channel1FrequencyTracker = 2048 - options.channel1frequency << 2;
            if (deepDataAndEvents > 127) {
                options.channel1timeSweep = options.channel1lastTimeSweep;
                options.channel1numSweep = options.channel1frequencySweepDivider;
                var channel1envelopeVolume = options.memory[65298];
                /** @type {number} */
                options.channel1envelopeVolume = channel1envelopeVolume >> 4;
                options.channel1OutputLevelCache();
                /** @type {number} */
                options.channel1envelopeSweepsLast = (channel1envelopeVolume & 7) - 1;
                if (options.channel1totalLength == 0) {
                    /** @type {number} */
                    options.channel1totalLength = 64;
                }
                if (options.channel1lastTimeSweep > 0 || options.channel1frequencySweepDivider > 0) {
                    options.memory[65318] |= 1;
                } else {
                    options.memory[65318] &= 254;
                }
                if ((deepDataAndEvents & 64) == 64) {
                    options.memory[65318] |= 1;
                }
                /** @type {number} */
                options.channel1ShadowFrequency = options.channel1frequency;
                /** @type {boolean} */
                options.channel1SweepFault = false;
                options.runAudioSweep();
            }
            options.channel1EnableCheck();
            /** @type {number} */
            options.memory[65300] = deepDataAndEvents & 64;
        }
    };
    /** @type {function (Object, ?, number): undefined} */
    this.memoryHighWriter[22] = this.memoryWriter[65302] = function(options, deepDataAndEvents, dataAndEvents) {
        if (options.soundMasterEnabled || !options.cGBC) {
            if (options.soundMasterEnabled) {
                options.audioJIT();
            } else {
                dataAndEvents &= 63;
            }
            options.channel2CachedDuty = options.dutyLookup[dataAndEvents >> 6];
            /** @type {number} */
            options.channel2totalLength = 64 - (dataAndEvents & 63);
            /** @type {number} */
            options.memory[65302] = dataAndEvents & 192;
            options.channel2EnableCheck();
        }
    };
    /** @type {function (Object, ?, number): undefined} */
    this.memoryHighWriter[23] = this.memoryWriter[65303] = function(options, dataAndEvents, deepDataAndEvents) {
        if (options.soundMasterEnabled) {
            options.audioJIT();
            if (options.channel2Enabled && options.channel2envelopeSweeps == 0) {
                if (((options.memory[65303] ^ deepDataAndEvents) & 8) == 8) {
                    if ((options.memory[65303] & 8) == 0) {
                        if ((options.memory[65303] & 7) == 7) {
                            options.channel2envelopeVolume += 2;
                        } else {
                            ++options.channel2envelopeVolume;
                        }
                    }
                    /** @type {number} */
                    options.channel2envelopeVolume = 16 - options.channel2envelopeVolume & 15;
                } else {
                    if ((options.memory[65303] & 15) == 8) {
                        /** @type {number} */
                        options.channel2envelopeVolume = 1 + options.channel2envelopeVolume & 15;
                    }
                }
                options.channel2OutputLevelCache();
            }
            /** @type {boolean} */
            options.channel2envelopeType = (deepDataAndEvents & 8) == 8;
            /** @type {number} */
            options.memory[65303] = deepDataAndEvents;
            options.channel2VolumeEnableCheck();
        }
    };
    /** @type {function (Object, ?, number): undefined} */
    this.memoryHighWriter[24] = this.memoryWriter[65304] = function(options, deepDataAndEvents, dataAndEvents) {
        if (options.soundMasterEnabled) {
            options.audioJIT();
            /** @type {number} */
            options.channel2frequency = options.channel2frequency & 1792 | dataAndEvents;
            /** @type {number} */
            options.channel2FrequencyTracker = 2048 - options.channel2frequency << 2;
            /** @type {number} */
            options.memory[65304] = dataAndEvents;
        }
    };
    /** @type {function (Object, ?, number): undefined} */
    this.memoryHighWriter[25] = this.memoryWriter[65305] = function(options, dataAndEvents, deepDataAndEvents) {
        if (options.soundMasterEnabled) {
            options.audioJIT();
            if (deepDataAndEvents > 127) {
                var channel2envelopeVolume = options.memory[65303];
                /** @type {number} */
                options.channel2envelopeVolume = channel2envelopeVolume >> 4;
                options.channel2OutputLevelCache();
                /** @type {number} */
                options.channel2envelopeSweepsLast = (channel2envelopeVolume & 7) - 1;
                if (options.channel2totalLength == 0) {
                    /** @type {number} */
                    options.channel2totalLength = 64;
                }
                if ((deepDataAndEvents & 64) == 64) {
                    options.memory[65318] |= 2;
                }
            }
            /** @type {boolean} */
            options.channel2consecutive = (deepDataAndEvents & 64) == 0;
            /** @type {number} */
            options.channel2frequency = (deepDataAndEvents & 7) << 8 | options.channel2frequency & 255;
            /** @type {number} */
            options.channel2FrequencyTracker = 2048 - options.channel2frequency << 2;
            /** @type {number} */
            options.memory[65305] = deepDataAndEvents & 64;
            options.channel2EnableCheck();
        }
    };
    /** @type {function (Object, ?, number): undefined} */
    this.memoryHighWriter[26] = this.memoryWriter[65306] = function(options, deepDataAndEvents, dataAndEvents) {
        if (options.soundMasterEnabled) {
            options.audioJIT();
            if (!options.channel3canPlay && dataAndEvents >= 128) {
                /** @type {number} */
                options.channel3lastSampleLookup = 0;
                options.channel3UpdateCache();
            }
            /** @type {boolean} */
            options.channel3canPlay = dataAndEvents > 127;
            if (options.channel3canPlay && (options.memory[65306] > 127 && !options.channel3consecutive)) {
                options.memory[65318] |= 4;
            }
            /** @type {number} */
            options.memory[65306] = dataAndEvents & 128;
        }
    };
    /** @type {function (Object, ?, number): undefined} */
    this.memoryHighWriter[27] = this.memoryWriter[65307] = function(options, dataAndEvents, off) {
        if (options.soundMasterEnabled || !options.cGBC) {
            if (options.soundMasterEnabled) {
                options.audioJIT();
            }
            /** @type {number} */
            options.channel3totalLength = 256 - off;
            /** @type {number} */
            options.memory[65307] = off;
            options.channel3EnableCheck();
        }
    };
    /** @type {function (Object, ?, number): undefined} */
    this.memoryHighWriter[28] = this.memoryWriter[65308] = function(options, dataAndEvents, deepDataAndEvents) {
        if (options.soundMasterEnabled) {
            options.audioJIT();
            deepDataAndEvents &= 96;
            /** @type {number} */
            options.memory[65308] = deepDataAndEvents;
            /** @type {number} */
            options.channel3patternType = deepDataAndEvents == 0 ? 4 : (deepDataAndEvents >> 5) - 1;
        }
    };
    /** @type {function (Object, ?, number): undefined} */
    this.memoryHighWriter[29] = this.memoryWriter[65309] = function(options, deepDataAndEvents, dataAndEvents) {
        if (options.soundMasterEnabled) {
            options.audioJIT();
            /** @type {number} */
            options.channel3frequency = options.channel3frequency & 1792 | dataAndEvents;
            /** @type {number} */
            options.channel3FrequencyPeriod = 2048 - options.channel3frequency << 1;
            /** @type {number} */
            options.memory[65309] = dataAndEvents;
        }
    };
    /** @type {function (Object, ?, number): undefined} */
    this.memoryHighWriter[30] = this.memoryWriter[65310] = function(options, dataAndEvents, deepDataAndEvents) {
        if (options.soundMasterEnabled) {
            options.audioJIT();
            if (deepDataAndEvents > 127) {
                if (options.channel3totalLength == 0) {
                    /** @type {number} */
                    options.channel3totalLength = 256;
                }
                /** @type {number} */
                options.channel3lastSampleLookup = 0;
                if ((deepDataAndEvents & 64) == 64) {
                    options.memory[65318] |= 4;
                }
            }
            /** @type {boolean} */
            options.channel3consecutive = (deepDataAndEvents & 64) == 0;
            /** @type {number} */
            options.channel3frequency = (deepDataAndEvents & 7) << 8 | options.channel3frequency & 255;
            /** @type {number} */
            options.channel3FrequencyPeriod = 2048 - options.channel3frequency << 1;
            /** @type {number} */
            options.memory[65310] = deepDataAndEvents & 64;
            options.channel3EnableCheck();
        }
    };
    /** @type {function (Object, ?, number): undefined} */
    this.memoryHighWriter[32] = this.memoryWriter[65312] = function(options, dataAndEvents, deepDataAndEvents) {
        if (options.soundMasterEnabled || !options.cGBC) {
            if (options.soundMasterEnabled) {
                options.audioJIT();
            }
            /** @type {number} */
            options.channel4totalLength = 64 - (deepDataAndEvents & 63);
            /** @type {number} */
            options.memory[65312] = deepDataAndEvents | 192;
            options.channel4EnableCheck();
        }
    };
    /** @type {function (Object, ?, number): undefined} */
    this.memoryHighWriter[33] = this.memoryWriter[65313] = function(options, dataAndEvents, deepDataAndEvents) {
        if (options.soundMasterEnabled) {
            options.audioJIT();
            if (options.channel4Enabled && options.channel4envelopeSweeps == 0) {
                if (((options.memory[65313] ^ deepDataAndEvents) & 8) == 8) {
                    if ((options.memory[65313] & 8) == 0) {
                        if ((options.memory[65313] & 7) == 7) {
                            options.channel4envelopeVolume += 2;
                        } else {
                            ++options.channel4envelopeVolume;
                        }
                    }
                    /** @type {number} */
                    options.channel4envelopeVolume = 16 - options.channel4envelopeVolume & 15;
                } else {
                    if ((options.memory[65313] & 15) == 8) {
                        /** @type {number} */
                        options.channel4envelopeVolume = 1 + options.channel4envelopeVolume & 15;
                    }
                }
                /** @type {number} */
                options.channel4currentVolume = options.channel4envelopeVolume << options.channel4VolumeShifter;
            }
            /** @type {boolean} */
            options.channel4envelopeType = (deepDataAndEvents & 8) == 8;
            /** @type {number} */
            options.memory[65313] = deepDataAndEvents;
            options.channel4UpdateCache();
            options.channel4VolumeEnableCheck();
        }
    };
    /** @type {function (Object, ?, number): undefined} */
    this.memoryHighWriter[34] = this.memoryWriter[65314] = function(options, deepDataAndEvents, dataAndEvents) {
        if (options.soundMasterEnabled) {
            options.audioJIT();
            /** @type {number} */
            options.channel4FrequencyPeriod = Math.max((dataAndEvents & 7) << 4, 8) << (dataAndEvents >> 4);
            /** @type {number} */
            var axes = dataAndEvents & 8;
            if (axes == 8 && options.channel4BitRange == 32767 || axes == 0 && options.channel4BitRange == 127) {
                /** @type {number} */
                options.channel4lastSampleLookup = 0;
                /** @type {number} */
                options.channel4BitRange = axes == 8 ? 127 : 32767;
                /** @type {number} */
                options.channel4VolumeShifter = axes == 8 ? 7 : 15;
                /** @type {number} */
                options.channel4currentVolume = options.channel4envelopeVolume << options.channel4VolumeShifter;
                options.noiseSampleTable = axes == 8 ? options.LSFR7Table : options.LSFR15Table;
            }
            /** @type {number} */
            options.memory[65314] = dataAndEvents;
            options.channel4UpdateCache();
        }
    };
    /** @type {function (Object, ?, number): undefined} */
    this.memoryHighWriter[35] = this.memoryWriter[65315] = function(options, dataAndEvents, deepDataAndEvents) {
        if (options.soundMasterEnabled) {
            options.audioJIT();
            /** @type {number} */
            options.memory[65315] = deepDataAndEvents;
            /** @type {boolean} */
            options.channel4consecutive = (deepDataAndEvents & 64) == 0;
            if (deepDataAndEvents > 127) {
                var channel4envelopeVolume = options.memory[65313];
                /** @type {number} */
                options.channel4envelopeVolume = channel4envelopeVolume >> 4;
                /** @type {number} */
                options.channel4currentVolume = options.channel4envelopeVolume << options.channel4VolumeShifter;
                /** @type {number} */
                options.channel4envelopeSweepsLast = (channel4envelopeVolume & 7) - 1;
                if (options.channel4totalLength == 0) {
                    /** @type {number} */
                    options.channel4totalLength = 64;
                }
                if ((deepDataAndEvents & 64) == 64) {
                    options.memory[65318] |= 8;
                }
            }
            options.channel4EnableCheck();
        }
    };
    /** @type {function (Object, ?, number): undefined} */
    this.memoryHighWriter[36] = this.memoryWriter[65316] = function(options, dataAndEvents, always) {
        if (options.soundMasterEnabled && options.memory[65316] != always) {
            options.audioJIT();
            /** @type {number} */
            options.memory[65316] = always;
            /** @type {number} */
            options.VinLeftChannelMasterVolume = (always >> 4 & 7) + 1;
            /** @type {number} */
            options.VinRightChannelMasterVolume = (always & 7) + 1;
            options.mixerOutputLevelCache();
        }
    };
    /** @type {function (Object, ?, number): undefined} */
    this.memoryHighWriter[37] = this.memoryWriter[65317] = function(options, dataAndEvents, always) {
        if (options.soundMasterEnabled && options.memory[65317] != always) {
            options.audioJIT();
            /** @type {number} */
            options.memory[65317] = always;
            /** @type {boolean} */
            options.rightChannel1 = (always & 1) == 1;
            /** @type {boolean} */
            options.rightChannel2 = (always & 2) == 2;
            /** @type {boolean} */
            options.rightChannel3 = (always & 4) == 4;
            /** @type {boolean} */
            options.rightChannel4 = (always & 8) == 8;
            /** @type {boolean} */
            options.leftChannel1 = (always & 16) == 16;
            /** @type {boolean} */
            options.leftChannel2 = (always & 32) == 32;
            /** @type {boolean} */
            options.leftChannel3 = (always & 64) == 64;
            /** @type {boolean} */
            options.leftChannel4 = always > 127;
            options.channel1OutputLevelCache();
            options.channel2OutputLevelCache();
            options.channel3OutputLevelCache();
            options.channel4OutputLevelCache();
        }
    };
    /** @type {function (Object, ?, number): undefined} */
    this.memoryHighWriter[38] = this.memoryWriter[65318] = function(options, dataAndEvents, index) {
        options.audioJIT();
        if (!options.soundMasterEnabled && index > 127) {
            /** @type {number} */
            options.memory[65318] = 128;
            /** @type {boolean} */
            options.soundMasterEnabled = true;
            options.initializeAudioStartState();
        } else {
            if (options.soundMasterEnabled && index < 128) {
                /** @type {number} */
                options.memory[65318] = 0;
                /** @type {boolean} */
                options.soundMasterEnabled = false;
                /** @type {number} */
                var type = 65296;
                for (;type < 65318;type++) {
                    options.memoryWriter[type](options, type, 0);
                }
            }
        }
    };
    this.memoryHighWriter[39] = this.memoryWriter[65319] = this.cartIgnoreWrite;
    this.memoryHighWriter[40] = this.memoryWriter[65320] = this.cartIgnoreWrite;
    this.memoryHighWriter[41] = this.memoryWriter[65321] = this.cartIgnoreWrite;
    this.memoryHighWriter[42] = this.memoryWriter[65322] = this.cartIgnoreWrite;
    this.memoryHighWriter[43] = this.memoryWriter[65323] = this.cartIgnoreWrite;
    this.memoryHighWriter[44] = this.memoryWriter[65324] = this.cartIgnoreWrite;
    this.memoryHighWriter[45] = this.memoryWriter[65325] = this.cartIgnoreWrite;
    this.memoryHighWriter[46] = this.memoryWriter[65326] = this.cartIgnoreWrite;
    this.memoryHighWriter[47] = this.memoryWriter[65327] = this.cartIgnoreWrite;
    /** @type {function (?, ?, number): undefined} */
    this.memoryHighWriter[48] = this.memoryWriter[65328] = function(jQuery, deepDataAndEvents, dataAndEvents) {
        jQuery.channel3WriteRAM(0, dataAndEvents);
    };
    /** @type {function (?, ?, number): undefined} */
    this.memoryHighWriter[49] = this.memoryWriter[65329] = function(jQuery, deepDataAndEvents, dataAndEvents) {
        jQuery.channel3WriteRAM(1, dataAndEvents);
    };
    /** @type {function (?, ?, number): undefined} */
    this.memoryHighWriter[50] = this.memoryWriter[65330] = function(jQuery, deepDataAndEvents, dataAndEvents) {
        jQuery.channel3WriteRAM(2, dataAndEvents);
    };
    /** @type {function (?, ?, number): undefined} */
    this.memoryHighWriter[51] = this.memoryWriter[65331] = function(jQuery, deepDataAndEvents, dataAndEvents) {
        jQuery.channel3WriteRAM(3, dataAndEvents);
    };
    /** @type {function (?, ?, number): undefined} */
    this.memoryHighWriter[52] = this.memoryWriter[65332] = function(jQuery, deepDataAndEvents, dataAndEvents) {
        jQuery.channel3WriteRAM(4, dataAndEvents);
    };
    /** @type {function (?, ?, number): undefined} */
    this.memoryHighWriter[53] = this.memoryWriter[65333] = function(jQuery, deepDataAndEvents, dataAndEvents) {
        jQuery.channel3WriteRAM(5, dataAndEvents);
    };
    /** @type {function (?, ?, number): undefined} */
    this.memoryHighWriter[54] = this.memoryWriter[65334] = function(jQuery, deepDataAndEvents, dataAndEvents) {
        jQuery.channel3WriteRAM(6, dataAndEvents);
    };
    /** @type {function (?, ?, number): undefined} */
    this.memoryHighWriter[55] = this.memoryWriter[65335] = function(jQuery, deepDataAndEvents, dataAndEvents) {
        jQuery.channel3WriteRAM(7, dataAndEvents);
    };
    /** @type {function (?, ?, number): undefined} */
    this.memoryHighWriter[56] = this.memoryWriter[65336] = function(jQuery, deepDataAndEvents, dataAndEvents) {
        jQuery.channel3WriteRAM(8, dataAndEvents);
    };
    /** @type {function (?, ?, number): undefined} */
    this.memoryHighWriter[57] = this.memoryWriter[65337] = function(jQuery, deepDataAndEvents, dataAndEvents) {
        jQuery.channel3WriteRAM(9, dataAndEvents);
    };
    /** @type {function (?, ?, number): undefined} */
    this.memoryHighWriter[58] = this.memoryWriter[65338] = function(jQuery, deepDataAndEvents, dataAndEvents) {
        jQuery.channel3WriteRAM(10, dataAndEvents);
    };
    /** @type {function (?, ?, number): undefined} */
    this.memoryHighWriter[59] = this.memoryWriter[65339] = function(jQuery, deepDataAndEvents, dataAndEvents) {
        jQuery.channel3WriteRAM(11, dataAndEvents);
    };
    /** @type {function (?, ?, number): undefined} */
    this.memoryHighWriter[60] = this.memoryWriter[65340] = function(jQuery, deepDataAndEvents, dataAndEvents) {
        jQuery.channel3WriteRAM(12, dataAndEvents);
    };
    /** @type {function (?, ?, number): undefined} */
    this.memoryHighWriter[61] = this.memoryWriter[65341] = function(jQuery, deepDataAndEvents, dataAndEvents) {
        jQuery.channel3WriteRAM(13, dataAndEvents);
    };
    /** @type {function (?, ?, number): undefined} */
    this.memoryHighWriter[62] = this.memoryWriter[65342] = function(jQuery, deepDataAndEvents, dataAndEvents) {
        jQuery.channel3WriteRAM(14, dataAndEvents);
    };
    /** @type {function (?, ?, number): undefined} */
    this.memoryHighWriter[63] = this.memoryWriter[65343] = function(jQuery, deepDataAndEvents, dataAndEvents) {
        jQuery.channel3WriteRAM(15, dataAndEvents);
    };
    /** @type {function (?, ?, Array): undefined} */
    this.memoryHighWriter[66] = this.memoryWriter[65346] = function(options, dataAndEvents, value) {
        if (options.backgroundY != value) {
            options.midScanLineJIT();
            /** @type {Array} */
            options.backgroundY = value;
        }
    };
    /** @type {function (?, ?, number): undefined} */
    this.memoryHighWriter[67] = this.memoryWriter[65347] = function(st, dataAndEvents, pos) {
        if (st.backgroundX != pos) {
            st.midScanLineJIT();
            /** @type {number} */
            st.backgroundX = pos;
        }
    };
    /** @type {function (Object, ?, ?): undefined} */
    this.memoryHighWriter[68] = this.memoryWriter[65348] = function(data, dataAndEvents, deepDataAndEvents) {
        if (data.LCDisOn) {
            /** @type {number} */
            data.modeSTAT = 2;
            /** @type {number} */
            data.midScanlineOffset = -1;
            /** @type {number} */
            data.totalLinesPassed = data.currentX = data.queuedScanLines = data.lastUnrenderedLine = data.LCDTicks = data.STATTracker = data.actualScanLine = data.memory[65348] = 0;
        }
    };
    /** @type {function (Object, ?, ?): undefined} */
    this.memoryHighWriter[69] = this.memoryWriter[65349] = function(options, dataAndEvents, deepDataAndEvents) {
        if (options.memory[65349] != deepDataAndEvents) {
            options.memory[65349] = deepDataAndEvents;
            if (options.LCDisOn) {
                options.matchLYC();
            }
        }
    };
    /** @type {function (?, ?, number): undefined} */
    this.memoryHighWriter[74] = this.memoryWriter[65354] = function(st, dataAndEvents, pos) {
        if (st.windowY != pos) {
            st.midScanLineJIT();
            /** @type {number} */
            st.windowY = pos;
        }
    };
    /** @type {function (Object, ?, number): undefined} */
    this.memoryHighWriter[75] = this.memoryWriter[65355] = function(options, dataAndEvents, iterations) {
        if (options.memory[65355] != iterations) {
            options.midScanLineJIT();
            /** @type {number} */
            options.memory[65355] = iterations;
            /** @type {number} */
            options.windowX = iterations - 7;
        }
    };
    /** @type {function (Object, ?, ?): undefined} */
    this.memoryHighWriter[114] = this.memoryWriter[65394] = function(options, dataAndEvents, deepDataAndEvents) {
        options.memory[65394] = deepDataAndEvents;
    };
    /** @type {function (Object, ?, ?): undefined} */
    this.memoryHighWriter[115] = this.memoryWriter[65395] = function(options, dataAndEvents, deepDataAndEvents) {
        options.memory[65395] = deepDataAndEvents;
    };
    /** @type {function (Object, ?, ?): undefined} */
    this.memoryHighWriter[117] = this.memoryWriter[65397] = function(options, dataAndEvents, deepDataAndEvents) {
        options.memory[65397] = deepDataAndEvents;
    };
    this.memoryHighWriter[118] = this.memoryWriter[65398] = this.cartIgnoreWrite;
    this.memoryHighWriter[119] = this.memoryWriter[65399] = this.cartIgnoreWrite;
    /** @type {function (?, ?, number): undefined} */
    this.memoryHighWriter[255] = this.memoryWriter[65535] = function(a, dataAndEvents, e) {
        /** @type {number} */
        a.interruptsEnabled = e;
        a.checkIRQMatching();
    };
    this.recompileModelSpecificIOWriteHandling();
    this.recompileBootIOWriteHandling();
};
/**
 * @return {undefined}
 */
GameBoyCore.prototype.recompileModelSpecificIOWriteHandling = function() {
    if (this.cGBC) {
        /** @type {function (Object, ?, number): undefined} */
        this.memoryHighWriter[2] = this.memoryWriter[65282] = function(options, dataAndEvents, deepDataAndEvents) {
            if ((deepDataAndEvents & 1) == 1) {
                /** @type {number} */
                options.memory[65282] = deepDataAndEvents & 127;
                /** @type {number} */
                options.serialTimer = (deepDataAndEvents & 2) == 0 ? 4096 : 128;
                /** @type {number} */
                options.serialShiftTimer = options.serialShiftTimerAllocated = (deepDataAndEvents & 2) == 0 ? 512 : 16;
            } else {
                /** @type {number} */
                options.memory[65282] = deepDataAndEvents;
                /** @type {number} */
                options.serialShiftTimer = options.serialShiftTimerAllocated = options.serialTimer = 0;
            }
        };
        /** @type {function (Object, ?, number): undefined} */
        this.memoryHighWriter[64] = this.memoryWriter[65344] = function(session, deepDataAndEvents, dataAndEvents) {
            if (session.memory[65344] != dataAndEvents) {
                session.midScanLineJIT();
                /** @type {boolean} */
                var game_id = dataAndEvents > 127;
                if (game_id != session.LCDisOn) {
                    /** @type {boolean} */
                    session.LCDisOn = game_id;
                    session.memory[65345] &= 120;
                    /** @type {number} */
                    session.midScanlineOffset = -1;
                    /** @type {number} */
                    session.totalLinesPassed = session.currentX = session.queuedScanLines = session.lastUnrenderedLine = session.STATTracker = session.LCDTicks = session.actualScanLine = session.memory[65348] = 0;
                    if (session.LCDisOn) {
                        /** @type {number} */
                        session.modeSTAT = 2;
                        session.matchLYC();
                        session.LCDCONTROL = session.LINECONTROL;
                    } else {
                        /** @type {number} */
                        session.modeSTAT = 0;
                        session.LCDCONTROL = session.DISPLAYOFFCONTROL;
                        session.DisplayShowOff();
                    }
                    session.interruptsRequested &= 253;
                }
                /** @type {number} */
                session.gfxWindowCHRBankPosition = (dataAndEvents & 64) == 64 ? 1024 : 0;
                /** @type {boolean} */
                session.gfxWindowDisplay = (dataAndEvents & 32) == 32;
                /** @type {number} */
                session.gfxBackgroundBankOffset = (dataAndEvents & 16) == 16 ? 0 : 128;
                /** @type {number} */
                session.gfxBackgroundCHRBankPosition = (dataAndEvents & 8) == 8 ? 1024 : 0;
                /** @type {boolean} */
                session.gfxSpriteNormalHeight = (dataAndEvents & 4) == 0;
                /** @type {boolean} */
                session.gfxSpriteShow = (dataAndEvents & 2) == 2;
                /** @type {boolean} */
                session.BGPriorityEnabled = (dataAndEvents & 1) == 1;
                session.priorityFlaggingPathRebuild();
                /** @type {number} */
                session.memory[65344] = dataAndEvents;
            }
        };
        /** @type {function (Object, ?, number): undefined} */
        this.memoryHighWriter[65] = this.memoryWriter[65345] = function(options, dataAndEvents, deepDataAndEvents) {
            /** @type {boolean} */
            options.LYCMatchTriggerSTAT = (deepDataAndEvents & 64) == 64;
            /** @type {boolean} */
            options.mode2TriggerSTAT = (deepDataAndEvents & 32) == 32;
            /** @type {boolean} */
            options.mode1TriggerSTAT = (deepDataAndEvents & 16) == 16;
            /** @type {boolean} */
            options.mode0TriggerSTAT = (deepDataAndEvents & 8) == 8;
            /** @type {number} */
            options.memory[65345] = deepDataAndEvents & 120;
        };
        /** @type {function (Object, number, number): undefined} */
        this.memoryHighWriter[70] = this.memoryWriter[65350] = function(options, propertyName, functionName) {
            /** @type {number} */
            options.memory[65350] = functionName;
            if (functionName < 224) {
                functionName <<= 8;
                /** @type {number} */
                propertyName = 65024;
                var len = options.modeSTAT;
                /** @type {number} */
                options.modeSTAT = 0;
                /** @type {number} */
                var value = 0;
                do {
                    value = options.memoryReader[functionName](options, functionName++);
                    if (value != options.memory[propertyName]) {
                        options.modeSTAT = len;
                        options.graphicsJIT();
                        /** @type {number} */
                        options.modeSTAT = 0;
                        options.memory[propertyName++] = value;
                        break;
                    }
                } while (++propertyName < 65184);
                if (propertyName < 65184) {
                    do {
                        options.memory[propertyName++] = options.memoryReader[functionName](options, functionName++);
                        options.memory[propertyName++] = options.memoryReader[functionName](options, functionName++);
                        options.memory[propertyName++] = options.memoryReader[functionName](options, functionName++);
                        options.memory[propertyName++] = options.memoryReader[functionName](options, functionName++);
                    } while (propertyName < 65184);
                }
                options.modeSTAT = len;
            }
        };
        /** @type {function (Object, ?, number): undefined} */
        this.memoryHighWriter[77] = this.memoryWriter[65357] = function(options, dataAndEvents, deepDataAndEvents) {
            /** @type {number} */
            options.memory[65357] = deepDataAndEvents & 127 | options.memory[65357] & 128;
        };
        /** @type {function (?, ?, number): undefined} */
        this.memoryHighWriter[79] = this.memoryWriter[65359] = function(key, dataAndEvents, b) {
            /** @type {number} */
            key.currVRAMBank = b & 1;
            if (key.currVRAMBank > 0) {
                key.BGCHRCurrentBank = key.BGCHRBank2;
            } else {
                key.BGCHRCurrentBank = key.BGCHRBank1;
            }
        };
        /** @type {function (Object, ?, ?): undefined} */
        this.memoryHighWriter[81] = this.memoryWriter[65361] = function(options, dataAndEvents, deepDataAndEvents) {
            if (!options.hdmaRunning) {
                options.memory[65361] = deepDataAndEvents;
            }
        };
        /** @type {function (Object, ?, number): undefined} */
        this.memoryHighWriter[82] = this.memoryWriter[65362] = function(options, dataAndEvents, deepDataAndEvents) {
            if (!options.hdmaRunning) {
                /** @type {number} */
                options.memory[65362] = deepDataAndEvents & 240;
            }
        };
        /** @type {function (Object, ?, number): undefined} */
        this.memoryHighWriter[83] = this.memoryWriter[65363] = function(options, dataAndEvents, deepDataAndEvents) {
            if (!options.hdmaRunning) {
                /** @type {number} */
                options.memory[65363] = deepDataAndEvents & 31;
            }
        };
        /** @type {function (Object, ?, number): undefined} */
        this.memoryHighWriter[84] = this.memoryWriter[65364] = function(options, dataAndEvents, deepDataAndEvents) {
            if (!options.hdmaRunning) {
                /** @type {number} */
                options.memory[65364] = deepDataAndEvents & 240;
            }
        };
        /** @type {function (Object, ?, number): undefined} */
        this.memoryHighWriter[85] = this.memoryWriter[65365] = function(options, dataAndEvents, deepDataAndEvents) {
            if (!options.hdmaRunning) {
                if ((deepDataAndEvents & 128) == 0) {
                    options.DMAWrite((deepDataAndEvents & 127) + 1);
                    /** @type {number} */
                    options.memory[65365] = 255;
                } else {
                    /** @type {boolean} */
                    options.hdmaRunning = true;
                    /** @type {number} */
                    options.memory[65365] = deepDataAndEvents & 127;
                }
            } else {
                if ((deepDataAndEvents & 128) == 0) {
                    /** @type {boolean} */
                    options.hdmaRunning = false;
                    options.memory[65365] |= 128;
                } else {
                    /** @type {number} */
                    options.memory[65365] = deepDataAndEvents & 127;
                }
            }
        };
        /** @type {function (Object, ?, number): undefined} */
        this.memoryHighWriter[104] = this.memoryWriter[65384] = function(options, deepDataAndEvents, dataAndEvents) {
            options.memory[65385] = options.gbcBGRawPalette[dataAndEvents & 63];
            /** @type {number} */
            options.memory[65384] = dataAndEvents;
        };
        /** @type {function (Object, ?, number): undefined} */
        this.memoryHighWriter[105] = this.memoryWriter[65385] = function(jQuery, dataAndEvents, selection) {
            jQuery.updateGBCBGPalette(jQuery.memory[65384] & 63, selection);
            if (jQuery.memory[65384] > 127) {
                /** @type {number} */
                var original = jQuery.memory[65384] + 1 & 63;
                /** @type {number} */
                jQuery.memory[65384] = original | 128;
                jQuery.memory[65385] = jQuery.gbcBGRawPalette[original];
            } else {
                /** @type {number} */
                jQuery.memory[65385] = selection;
            }
        };
        /** @type {function (Object, ?, number): undefined} */
        this.memoryHighWriter[106] = this.memoryWriter[65386] = function(options, deepDataAndEvents, dataAndEvents) {
            options.memory[65387] = options.gbcOBJRawPalette[dataAndEvents & 63];
            /** @type {number} */
            options.memory[65386] = dataAndEvents;
        };
        /** @type {function (Object, ?, ?): undefined} */
        this.memoryHighWriter[107] = this.memoryWriter[65387] = function(self, dataAndEvents, reqUrl) {
            self.updateGBCOBJPalette(self.memory[65386] & 63, reqUrl);
            if (self.memory[65386] > 127) {
                /** @type {number} */
                var timeoutKey = self.memory[65386] + 1 & 63;
                /** @type {number} */
                self.memory[65386] = timeoutKey | 128;
                self.memory[65387] = self.gbcOBJRawPalette[timeoutKey];
            } else {
                self.memory[65387] = reqUrl;
            }
        };
        /** @type {function (Object, ?, number): undefined} */
        this.memoryHighWriter[112] = this.memoryWriter[65392] = function(options, deepDataAndEvents, dataAndEvents) {
            /** @type {number} */
            var index = options.memory[65361] << 8 | options.memory[65362];
            if (!options.hdmaRunning || (index < 53248 || index >= 57344)) {
                /** @type {number} */
                options.gbcRamBank = Math.max(dataAndEvents & 7, 1);
                /** @type {number} */
                options.gbcRamBankPosition = (options.gbcRamBank - 1 << 12) - 53248;
                /** @type {number} */
                options.gbcRamBankPositionECHO = options.gbcRamBankPosition - 8192;
            }
            /** @type {number} */
            options.memory[65392] = dataAndEvents;
        };
        /** @type {function (Object, ?, ?): undefined} */
        this.memoryHighWriter[116] = this.memoryWriter[65396] = function(options, dataAndEvents, deepDataAndEvents) {
            options.memory[65396] = deepDataAndEvents;
        };
    } else {
        /** @type {function (Object, ?, number): undefined} */
        this.memoryHighWriter[2] = this.memoryWriter[65282] = function(options, dataAndEvents, deepDataAndEvents) {
            if ((deepDataAndEvents & 1) == 1) {
                /** @type {number} */
                options.memory[65282] = deepDataAndEvents & 127;
                /** @type {number} */
                options.serialTimer = 4096;
                /** @type {number} */
                options.serialShiftTimer = options.serialShiftTimerAllocated = 512;
            } else {
                /** @type {number} */
                options.memory[65282] = deepDataAndEvents;
                /** @type {number} */
                options.serialShiftTimer = options.serialShiftTimerAllocated = options.serialTimer = 0;
            }
        };
        /** @type {function (Object, ?, number): undefined} */
        this.memoryHighWriter[64] = this.memoryWriter[65344] = function(session, deepDataAndEvents, dataAndEvents) {
            if (session.memory[65344] != dataAndEvents) {
                session.midScanLineJIT();
                /** @type {boolean} */
                var game_id = dataAndEvents > 127;
                if (game_id != session.LCDisOn) {
                    /** @type {boolean} */
                    session.LCDisOn = game_id;
                    session.memory[65345] &= 120;
                    /** @type {number} */
                    session.midScanlineOffset = -1;
                    /** @type {number} */
                    session.totalLinesPassed = session.currentX = session.queuedScanLines = session.lastUnrenderedLine = session.STATTracker = session.LCDTicks = session.actualScanLine = session.memory[65348] = 0;
                    if (session.LCDisOn) {
                        /** @type {number} */
                        session.modeSTAT = 2;
                        session.matchLYC();
                        session.LCDCONTROL = session.LINECONTROL;
                    } else {
                        /** @type {number} */
                        session.modeSTAT = 0;
                        session.LCDCONTROL = session.DISPLAYOFFCONTROL;
                        session.DisplayShowOff();
                    }
                    session.interruptsRequested &= 253;
                }
                /** @type {number} */
                session.gfxWindowCHRBankPosition = (dataAndEvents & 64) == 64 ? 1024 : 0;
                /** @type {boolean} */
                session.gfxWindowDisplay = (dataAndEvents & 32) == 32;
                /** @type {number} */
                session.gfxBackgroundBankOffset = (dataAndEvents & 16) == 16 ? 0 : 128;
                /** @type {number} */
                session.gfxBackgroundCHRBankPosition = (dataAndEvents & 8) == 8 ? 1024 : 0;
                /** @type {boolean} */
                session.gfxSpriteNormalHeight = (dataAndEvents & 4) == 0;
                /** @type {boolean} */
                session.gfxSpriteShow = (dataAndEvents & 2) == 2;
                /** @type {boolean} */
                session.bgEnabled = (dataAndEvents & 1) == 1;
                /** @type {number} */
                session.memory[65344] = dataAndEvents;
            }
        };
        /** @type {function (Object, ?, number): undefined} */
        this.memoryHighWriter[65] = this.memoryWriter[65345] = function(options, dataAndEvents, deepDataAndEvents) {
            /** @type {boolean} */
            options.LYCMatchTriggerSTAT = (deepDataAndEvents & 64) == 64;
            /** @type {boolean} */
            options.mode2TriggerSTAT = (deepDataAndEvents & 32) == 32;
            /** @type {boolean} */
            options.mode1TriggerSTAT = (deepDataAndEvents & 16) == 16;
            /** @type {boolean} */
            options.mode0TriggerSTAT = (deepDataAndEvents & 8) == 8;
            /** @type {number} */
            options.memory[65345] = deepDataAndEvents & 120;
            if ((!options.usedBootROM || !options.usedGBCBootROM) && (options.LCDisOn && options.modeSTAT < 2)) {
                options.interruptsRequested |= 2;
                options.checkIRQMatching();
            }
        };
        /** @type {function (Object, number, number): undefined} */
        this.memoryHighWriter[70] = this.memoryWriter[65350] = function(options, propertyName, id) {
            /** @type {number} */
            options.memory[65350] = id;
            if (id > 127 && id < 224) {
                id <<= 8;
                /** @type {number} */
                propertyName = 65024;
                var len = options.modeSTAT;
                /** @type {number} */
                options.modeSTAT = 0;
                /** @type {number} */
                var value = 0;
                do {
                    value = options.memoryReader[id](options, id++);
                    if (value != options.memory[propertyName]) {
                        options.modeSTAT = len;
                        options.graphicsJIT();
                        /** @type {number} */
                        options.modeSTAT = 0;
                        options.memory[propertyName++] = value;
                        break;
                    }
                } while (++propertyName < 65184);
                if (propertyName < 65184) {
                    do {
                        options.memory[propertyName++] = options.memoryReader[id](options, id++);
                        options.memory[propertyName++] = options.memoryReader[id](options, id++);
                        options.memory[propertyName++] = options.memoryReader[id](options, id++);
                        options.memory[propertyName++] = options.memoryReader[id](options, id++);
                    } while (propertyName < 65184);
                }
                options.modeSTAT = len;
            }
        };
        /** @type {function (Object, ?, number): undefined} */
        this.memoryHighWriter[71] = this.memoryWriter[65351] = function(options, deepDataAndEvents, dataAndEvents) {
            if (options.memory[65351] != dataAndEvents) {
                options.midScanLineJIT();
                options.updateGBBGPalette(dataAndEvents);
                /** @type {number} */
                options.memory[65351] = dataAndEvents;
            }
        };
        /** @type {function (Object, ?, number): undefined} */
        this.memoryHighWriter[72] = this.memoryWriter[65352] = function(jQuery, deepDataAndEvents, dataAndEvents) {
            if (jQuery.memory[65352] != dataAndEvents) {
                jQuery.midScanLineJIT();
                jQuery.updateGBOBJPalette(0, dataAndEvents);
                /** @type {number} */
                jQuery.memory[65352] = dataAndEvents;
            }
        };
        /** @type {function (Object, ?, number): undefined} */
        this.memoryHighWriter[73] = this.memoryWriter[65353] = function(jQuery, deepDataAndEvents, dataAndEvents) {
            if (jQuery.memory[65353] != dataAndEvents) {
                jQuery.midScanLineJIT();
                jQuery.updateGBOBJPalette(4, dataAndEvents);
                /** @type {number} */
                jQuery.memory[65353] = dataAndEvents;
            }
        };
        /** @type {function (Object, ?, ?): undefined} */
        this.memoryHighWriter[77] = this.memoryWriter[65357] = function(options, dataAndEvents, deepDataAndEvents) {
            options.memory[65357] = deepDataAndEvents;
        };
        this.memoryHighWriter[79] = this.memoryWriter[65359] = this.cartIgnoreWrite;
        this.memoryHighWriter[85] = this.memoryWriter[65365] = this.cartIgnoreWrite;
        this.memoryHighWriter[104] = this.memoryWriter[65384] = this.cartIgnoreWrite;
        this.memoryHighWriter[105] = this.memoryWriter[65385] = this.cartIgnoreWrite;
        this.memoryHighWriter[106] = this.memoryWriter[65386] = this.cartIgnoreWrite;
        this.memoryHighWriter[107] = this.memoryWriter[65387] = this.cartIgnoreWrite;
        this.memoryHighWriter[108] = this.memoryWriter[65388] = this.cartIgnoreWrite;
        this.memoryHighWriter[112] = this.memoryWriter[65392] = this.cartIgnoreWrite;
        this.memoryHighWriter[116] = this.memoryWriter[65396] = this.cartIgnoreWrite;
    }
};
/**
 * @return {undefined}
 */
GameBoyCore.prototype.recompileBootIOWriteHandling = function() {
    if (this.inBootstrap) {
        /** @type {function (Object, ?, ?): undefined} */
        this.memoryHighWriter[80] = this.memoryWriter[65360] = function(options, dataAndEvents, deepDataAndEvents) {
            cout("Boot ROM reads blocked: Bootstrap process has ended.", 0);
            /** @type {boolean} */
            options.inBootstrap = false;
            options.disableBootROM();
            options.memory[65360] = deepDataAndEvents;
        };
        if (this.cGBC) {
            /** @type {function (Object, ?, number): undefined} */
            this.memoryHighWriter[108] = this.memoryWriter[65388] = function(options, dataAndEvents, deepDataAndEvents) {
                if (options.inBootstrap) {
                    /** @type {boolean} */
                    options.cGBC = (deepDataAndEvents & 1) == 0;
                    if (options.name + options.gameCode + options.ROM[323] == "Game and Watch 50") {
                        /** @type {boolean} */
                        options.cGBC = true;
                        cout("Created a boot exception for Game and Watch Gallery 2 (GBC ID byte is wrong on the cartridge).", 1);
                    }
                    cout("Booted to GBC Mode: " + options.cGBC, 0);
                }
                /** @type {number} */
                options.memory[65388] = deepDataAndEvents;
            };
        }
    } else {
        this.memoryHighWriter[80] = this.memoryWriter[65360] = this.cartIgnoreWrite;
    }
};
/**
 * @param {Array} elems
 * @param {string} structure
 * @return {?}
 */
GameBoyCore.prototype.toTypedArray = function(elems, structure) {
    try {
        if (settings[5] || structure != "float32" && (GameBoyWindow.opera && this.checkForOperaMathBug())) {
            return elems;
        }
        if (!elems || !elems.length) {
            return[];
        }
        var length = elems.length;
        switch(structure) {
            case "uint8":
                /** @type {Uint8Array} */
                var array = new Uint8Array(length);
                break;
            case "int8":
                /** @type {Int8Array} */
                array = new Int8Array(length);
                break;
            case "int32":
                /** @type {Int32Array} */
                array = new Int32Array(length);
                break;
            case "float32":
                /** @type {Float32Array} */
                array = new Float32Array(length);
        }
        /** @type {number} */
        var i = 0;
        for (;i < length;i++) {
            array[i] = elems[i];
        }
        return array;
    } catch (ex) {
        cout("Could not convert an array to a typed array: " + ex.message, 1);
        return elems;
    }
};
/**
 * @param {?} properties
 * @return {?}
 */
GameBoyCore.prototype.fromTypedArray = function(properties) {
    try {
        if (!properties || !properties.length) {
            return[];
        }
        /** @type {Array} */
        var contact = [];
        /** @type {number} */
        var i = 0;
        for (;i < properties.length;++i) {
            contact[i] = properties[i];
        }
        return contact;
    } catch (ex) {
        cout("Conversion from a typed array failed: " + ex.message, 1);
        return properties;
    }
};
/**
 * @param {number} opt_attributes
 * @param {number} lab
 * @param {string} structure
 * @return {?}
 */
GameBoyCore.prototype.getTypedArray = function(opt_attributes, lab, structure) {
    try {
        if (settings[5]) {
            throw new Error("");
        }
        if (structure != "float32" && (GameBoyWindow.opera && this.checkForOperaMathBug())) {
            throw new Error("");
        }
        switch(structure) {
            case "int8":
                /** @type {Int8Array} */
                var array = new Int8Array(opt_attributes);
                break;
            case "uint8":
                /** @type {Uint8Array} */
                array = new Uint8Array(opt_attributes);
                break;
            case "int32":
                /** @type {Int32Array} */
                array = new Int32Array(opt_attributes);
                break;
            case "float32":
                /** @type {Float32Array} */
                array = new Float32Array(opt_attributes);
        }
        if (lab != 0) {
            /** @type {number} */
            var headNode = 0;
            for (;headNode < opt_attributes;) {
                /** @type {number} */
                array[headNode++] = lab;
            }
        }
    } catch (ex) {
        cout("Could not convert an array to a typed array: " + ex.message, 1);
        /** @type {Array} */
        array = [];
        /** @type {number} */
        headNode = 0;
        for (;headNode < opt_attributes;) {
            /** @type {number} */
            array[headNode++] = lab;
        }
    }
    return array;
};
/**
 * @return {?}
 */
GameBoyCore.prototype.checkForOperaMathBug = function() {
    /** @type {Uint8Array} */
    var writeArrayBuffer = new Uint8Array(1);
    /** @type {number} */
    writeArrayBuffer[0] = -1;
    writeArrayBuffer[0] >>= 0;
    if (writeArrayBuffer[0] != 255) {
        cout("Detected faulty math by your browser.", 2);
        return true;
    } else {
        return false;
    }
};
"use strict";
/** @type {null} */
var gameboy = null;
/** @type {null} */
var gbRunInterval = null;
/** @type {Array} */
var settings = [true, false, false, [39, 37, 38, 40, 88, 90, 16, 13], true, false, 4, 15, 30, false, false, false, false, 16, 1];
/**
 * @param {Array} canvas
 * @param {Array} ROM
 * @return {undefined}
 */
function start(canvas, ROM) {
    clearLastEmulation();
    autoSave();
    gameboy = new GameBoyCore(canvas, ROM);
    /** @type {function (string): ?} */
    gameboy.openMBC = openSRAM;
    /** @type {function (string): ?} */
    gameboy.openRTC = openRTC;
    gameboy.start();
    run();
}
/**
 * @return {undefined}
 */
function run() {
    if (GameBoyEmulatorInitialized()) {
        if (!GameBoyEmulatorPlaying()) {
            gameboy.stopEmulator &= 1;
            cout("Starting the iterator.", 0);
            var expected = new_Date();
            gameboy.firstIteration = expected.getTime();
            /** @type {number} */
            gameboy.iterations = 0;
        } else {
            cout("The GameBoy core is already running.", 1);
        }
    } else {
        cout("GameBoy core cannot run while it has not been initialized.", 1);
    }
}
/**
 * @return {undefined}
 */
function pause() {
    if (GameBoyEmulatorInitialized()) {
        if (GameBoyEmulatorPlaying()) {
            clearLastEmulation();
        } else {
            cout("GameBoy core has already been paused.", 1);
        }
    } else {
        cout("GameBoy core cannot be paused while it has not been initialized.", 1);
    }
}
/**
 * @return {undefined}
 */
function clearLastEmulation() {
    if (GameBoyEmulatorInitialized() && GameBoyEmulatorPlaying()) {
        clearInterval(gbRunInterval);
        gameboy.stopEmulator |= 2;
        cout("The previous emulation has been cleared.", 0);
    } else {
        cout("No previous emulation was found to be cleared.", 0);
    }
}
/**
 * @return {undefined}
 */
function save() {
    if (GameBoyEmulatorInitialized()) {
        try {
            /** @type {number} */
            var state_suffix = 0;
            for (;findValue("FREEZE_" + gameboy.name + "_" + state_suffix) != null;) {
                state_suffix++;
            }
            setValue("FREEZE_" + gameboy.name + "_" + state_suffix, gameboy.saveState());
            cout("Saved the current state as: FREEZE_" + gameboy.name + "_" + state_suffix, 0);
        } catch (ex) {
            cout('Could not save the current emulation state("' + ex.message + '").', 2);
        }
    } else {
        cout("GameBoy core cannot be saved while it has not been initialized.", 1);
    }
}
/**
 * @return {undefined}
 */
function saveSRAM() {
    if (GameBoyEmulatorInitialized()) {
        if (gameboy.cBATT) {
            try {
                var sram = gameboy.saveSRAMState();
                if (sram.length > 0) {
                    cout("Saving the SRAM...", 0);
                    if (findValue("SRAM_" + gameboy.name) != null) {
                        cout("Deleting the old SRAM save due to outdated format.", 0);
                        deleteValue("SRAM_" + gameboy.name);
                    }
                    setValue("B64_SRAM_" + gameboy.name, arrayToBase64(sram));
                } else {
                    cout("SRAM could not be saved because it was empty.", 1);
                }
            } catch (ex) {
                cout('Could not save the current emulation state("' + ex.message + '").', 2);
            }
        } else {
            cout("Cannot save a game that does not have battery backed SRAM specified.", 1);
        }
        saveRTC();
    } else {
        cout("GameBoy core cannot be saved while it has not been initialized.", 1);
    }
}
/**
 * @return {undefined}
 */
function saveRTC() {
    if (GameBoyEmulatorInitialized()) {
        if (gameboy.cTIMER) {
            try {
                cout("Saving the RTC...", 0);
                setValue("RTC_" + gameboy.name, gameboy.saveRTCState());
            } catch (ex) {
                cout('Could not save the RTC of the current emulation state("' + ex.message + '").', 2);
            }
        }
    } else {
        cout("GameBoy core cannot be saved while it has not been initialized.", 1);
    }
}
/**
 * @return {undefined}
 */
function autoSave() {
    if (GameBoyEmulatorInitialized()) {
        cout("Automatically saving the SRAM.", 0);
        saveSRAM();
        saveRTC();
    }
}
/**
 * @param {string} filename
 * @return {?}
 */
function openSRAM(filename) {
    try {
        if (findValue("B64_SRAM_" + filename) != null) {
            cout("Found a previous SRAM state (Will attempt to load).", 0);
            return base64ToArray(findValue("B64_SRAM_" + filename));
        } else {
            if (findValue("SRAM_" + filename) != null) {
                cout("Found a previous SRAM state (Will attempt to load).", 0);
                return findValue("SRAM_" + filename);
            } else {
                cout("Could not find any previous SRAM copy for the current ROM.", 0);
            }
        }
    } catch (error) {
        cout("Could not open the  SRAM of the saved emulation state.", 2);
    }
    return[];
}
/**
 * @param {string} filename
 * @return {?}
 */
function openRTC(filename) {
    try {
        if (findValue("RTC_" + filename) != null) {
            cout("Found a previous RTC state (Will attempt to load).", 0);
            return findValue("RTC_" + filename);
        } else {
            cout("Could not find any previous RTC copy for the current ROM.", 0);
        }
    } catch (error) {
        cout("Could not open the RTC data of the saved emulation state.", 2);
    }
    return[];
}
/**
 * @param {string} filename
 * @param {Array} canvas
 * @return {undefined}
 */
function openState(filename, canvas) {
    try {
        if (findValue(filename) != null) {
            try {
                clearLastEmulation();
                cout("Attempting to run a saved emulation state.", 0);
                gameboy = new GameBoyCore(canvas, "");
                /** @type {string} */
                gameboy.savedStateFileName = filename;
                gameboy.returnFromState(findValue(filename));
                run();
            } catch (ex) {
                alert(ex.message + " file: " + ex.fileName + " line: " + ex.lineNumber);
            }
        } else {
            cout("Could not find the save state " + filename + '".', 2);
        }
    } catch (error) {
        cout("Could not open the saved emulation state.", 2);
    }
}
/**
 * @param {(Array|string)} blobData
 * @return {undefined}
 */
function import_save(blobData) {
    blobData = decodeBlob(blobData);
    if (blobData && blobData.blobs) {
        if (blobData.blobs.length > 0) {
            /** @type {number} */
            var index = 0;
            for (;index < blobData.blobs.length;++index) {
                cout('Importing blob "' + blobData.blobs[index].blobID + '"', 0);
                if (blobData.blobs[index].blobContent) {
                    if (blobData.blobs[index].blobID.substring(0, 5) == "SRAM_") {
                        setValue("B64_" + blobData.blobs[index].blobID, base64(blobData.blobs[index].blobContent));
                    } else {
                        setValue(blobData.blobs[index].blobID, JSON.parse(blobData.blobs[index].blobContent));
                    }
                } else {
                    if (blobData.blobs[index].blobID) {
                        cout('Save file imported had blob "' + blobData.blobs[index].blobID + '" with no blob data interpretable.', 2);
                    } else {
                        cout("Blob chunk information missing completely.", 2);
                    }
                }
            }
        } else {
            cout("Could not decode the imported file.", 2);
        }
    } else {
        cout("Could not decode the imported file.", 2);
    }
}
/**
 * @param {string} keyName
 * @param {string} encodedData
 * @return {?}
 */
function generateBlob(keyName, encodedData) {
    /** @type {string} */
    var saveString = "EMULATOR_DATA";
    /** @type {string} */
    var consoleID = "GameBoy";
    var totalLength = saveString.length + 4 + (1 + consoleID.length) + (1 + keyName.length + (4 + encodedData.length));
    saveString += to_little_endian_dword(totalLength);
    saveString += to_byte(consoleID.length);
    saveString += consoleID;
    saveString += to_byte(keyName.length);
    saveString += keyName;
    saveString += to_little_endian_dword(encodedData.length);
    saveString += encodedData;
    return saveString;
}
/**
 * @param {Array} codeSegments
 * @return {?}
 */
function generateMultiBlob(codeSegments) {
    /** @type {string} */
    var consoleID = "GameBoy";
    /** @type {number} */
    var totalLength = 13 + 4 + 1 + consoleID.length;
    var saveString = to_byte(consoleID.length);
    saveString += consoleID;
    /** @type {string} */
    var keyName = "";
    /** @type {string} */
    var encodedData = "";
    /** @type {number} */
    var i = 0;
    for (;i < codeSegments.length;++i) {
        keyName = codeSegments[i][0];
        encodedData = codeSegments[i][1];
        saveString += to_byte(keyName.length);
        saveString += keyName;
        saveString += to_little_endian_dword(encodedData.length);
        saveString += encodedData;
        totalLength += 1 + keyName.length + 4 + encodedData.length;
    }
    saveString = "EMULATOR_DATA" + to_little_endian_dword(totalLength) + saveString;
    return saveString;
}
/**
 * @param {string} blobData
 * @return {?}
 */
function decodeBlob(blobData) {
    var length = blobData.length;
    var blobProperties = {};
    /** @type {null} */
    blobProperties.consoleID = null;
    /** @type {number} */
    var blobsCount = -1;
    /** @type {Array} */
    blobProperties.blobs = [];
    if (length > 17) {
        if (blobData.substring(0, 13) == "EMULATOR_DATA") {
            /** @type {number} */
            length = Math.min((blobData.charCodeAt(16) & 255) << 24 | (blobData.charCodeAt(15) & 255) << 16 | (blobData.charCodeAt(14) & 255) << 8 | blobData.charCodeAt(13) & 255, length);
            /** @type {number} */
            var consoleIDLength = blobData.charCodeAt(17) & 255;
            if (length > 17 + consoleIDLength) {
                blobProperties.consoleID = blobData.substring(18, 18 + consoleIDLength);
                /** @type {number} */
                var blobIDLength = 0;
                /** @type {number} */
                var blobLength = 0;
                /** @type {number} */
                var index = 18 + consoleIDLength;
                for (;index < length;) {
                    /** @type {number} */
                    blobIDLength = blobData.charCodeAt(index++) & 255;
                    if (index + blobIDLength < length) {
                        blobProperties.blobs[++blobsCount] = {};
                        blobProperties.blobs[blobsCount].blobID = blobData.substring(index, index + blobIDLength);
                        index += blobIDLength;
                        if (index + 4 < length) {
                            /** @type {number} */
                            blobLength = (blobData.charCodeAt(index + 3) & 255) << 24 | (blobData.charCodeAt(index + 2) & 255) << 16 | (blobData.charCodeAt(index + 1) & 255) << 8 | blobData.charCodeAt(index) & 255;
                            index += 4;
                            if (index + blobLength <= length) {
                                blobProperties.blobs[blobsCount].blobContent = blobData.substring(index, index + blobLength);
                                index += blobLength;
                            } else {
                                cout("Blob length check failed, blob determined to be incomplete.", 2);
                                break;
                            }
                        } else {
                            cout("Blob was incomplete, bailing out.", 2);
                            break;
                        }
                    } else {
                        cout("Blob was incomplete, bailing out.", 2);
                        break;
                    }
                }
            }
        }
    }
    return blobProperties;
}
/**
 * @param {?} match
 * @return {?}
 */
function matchKey(match) {
    /** @type {number} */
    var i = 0;
    for (;i < settings[3].length;i++) {
        if (settings[3][i] == match) {
            return i;
        }
    }
    return-1;
}
/**
 * @return {?}
 */
function GameBoyEmulatorInitialized() {
    return typeof gameboy == "object" && gameboy != null;
}
/**
 * @return {?}
 */
function GameBoyEmulatorPlaying() {
    return(gameboy.stopEmulator & 2) == 0;
}
/**
 * @param {Object} event
 * @return {undefined}
 */
function GameBoyKeyDown(event) {
    if (GameBoyEmulatorInitialized() && GameBoyEmulatorPlaying()) {
        var keycode = matchKey(event.keyCode);
        if (keycode >= 0 && keycode < 8) {
            gameboy.JoyPadEvent(keycode, true);
            try {
                event.preventDefault();
            } catch (error) {
            }
        }
    }
}
/**
 * @param {Object} event
 * @return {undefined}
 */
function GameBoyKeyUp(event) {
    if (GameBoyEmulatorInitialized() && GameBoyEmulatorPlaying()) {
        var keycode = matchKey(event.keyCode);
        if (keycode >= 0 && keycode < 8) {
            gameboy.JoyPadEvent(keycode, false);
            try {
                event.preventDefault();
            } catch (error) {
            }
        }
    }
}
/**
 * @param {Object} e
 * @return {undefined}
 */
function GameBoyGyroSignalHandler(e) {
    if (GameBoyEmulatorInitialized() && GameBoyEmulatorPlaying()) {
        if (e.gamma || e.beta) {
            gameboy.GyroEvent(e.gamma * Math.PI / 180, e.beta * Math.PI / 180);
        } else {
            gameboy.GyroEvent(e.x, e.y);
        }
        try {
            e.preventDefault();
        } catch (error) {
        }
    }
}
/**
 * @return {undefined}
 */
function initNewCanvas() {
    if (GameBoyEmulatorInitialized()) {
        gameboy.canvas.width = gameboy.canvas.clientWidth;
        gameboy.canvas.height = gameboy.canvas.clientHeight;
    }
}
/**
 * @return {undefined}
 */
function initNewCanvasSize() {
    if (GameBoyEmulatorInitialized()) {
        if (!settings[12]) {
            if (gameboy.onscreenWidth != 160 || gameboy.onscreenHeight != 144) {
                gameboy.initLCD();
            }
        } else {
            if (gameboy.onscreenWidth != gameboy.canvas.clientWidth || gameboy.onscreenHeight != gameboy.canvas.clientHeight) {
                gameboy.initLCD();
            }
        }
    }
}
/** @type {string} */
var gameboy_rom = "r+BPyZiEZwA+AeBPySAobeEq6gAgKlYj5WJv6SRmZjjhKuXqACDJ/////////////////////////////////xgHZwCYhGcA2fX6/3/1xdXlIRPKNgHN9f/h0cHx6gAg+hLKtyAC8cnwgLcoF/CC7hjgUT6Q4FOv4FLgVOCAPv/gVfHZ8IG3IALx2fBA7gjgQA8PD+YB7gHgT/CC4FHuEOCCPojgU6/gUuBU4IE+/uBV4ID6NMs86jTL8dkKCgoKbWFkZSBieSBhZ28uIGVtYWlsOmdvYnV6b3ZAeWFob28uY29tCnVybDogc3BlY2N5LmRhLnJ1CgoKCv///////wDDSgnO7WZmzA0ACwNzAIMADAANAAgRH4iJAA7czG7m3d3Zmbu7Z2NuDuzM3dyZn7u5Mz5BR08nUyBSRUFMVElNRSCAAAAAAgEDADMBSTQeIUD/y37I8P/1y4fg//BE/pEg+su+8eD/yT7A4EY+KD0g/cnF1eWvEQPK1RITEhMGAyEAyuXFTgYAIWAMCQkqEhMqEhPB4SMFIOrhrwYIzYsU4dHByf////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////8AAgMFBggJCwwOEBETFBYXGBobHR4fISIjJSYnKSorLC0uLzAxMjM0NTY3ODg5Ojo7PDw9PT4+Pj8/Pz9AQEBAQEBAQEBAPz8/Pz4+PT08PDs7Ojk5ODc2NTU0MzIxMC8uLCsqKSgmJSQjISAfHRwaGRcWFRMSEA8NCwoIBwUEAgH//fz6+ff29PPx8O7t6+ro5+Xk4uHg3t3c2tnY19bU09LR0M/OzczLysnJyMfGxsXFxMPDw8LCwcHBwcDAwMDAwMDAwMDBwcHBwsLDw8PExcXGxsfIycnKy8zNzs/Q0dLT1NXX2Nna3N3e4OHi5OXn6Onr7O7v8fL09vf5+vz9AAEECRAZJDFAUWR5kKnE4QAhRGmQueQRQHGk2RBJhMEAQYTJEFmk8UCR5DmQ6UShAGHEKZD5ZNFAsSSZEIkEgQCBBIkQmSSxQNFk+ZApxGEAoUTpkDnkkUDxpFkQyYRBAMGESRDZpHFAEeS5kGlEIQDhxKmQeWRRQDEkGRAJBAEAAQQJEBkkMUBRZHmQqcThACFEaZC55BFAcaTZEEmEwQBBhMkQWaTxQJHkOZDpRKEAYcQpkPlk0UCxJJkQiQSBAIEEiRCZJLFA0WT5kCnEYQChROmQOeSRQPGkWRDJhEEAwYRJENmkcUAR5LmQaUQhAOHEqZB5ZFFAMSQZEAkEAQAAAAAAAAAAAAAAAAAAAAABAQEBAQEBAgICAgIDAwMDBAQEBAUFBQUGBgYHBwcICAkJCQoKCgsLDAwNDQ4ODw8QEBEREhITExQUFRUWFxcYGRkaGhscHB0eHh8gISEiIyQkJSYnJygpKisrLC0uLzAxMTIzNDU2Nzg5Ojs8PT4/QEFCQ0RFRkdISUpLTE1OT1FSU1RVVldZWltcXV9gYWJkZWZnaWprbG5vcHJzdHZ3eXp7fX5/gYKEhYeIiouNjpCRk5SWl5manJ2foKKkpaepqqytr7GytLa3ubu9vsDCxMXHycvMztDS1NXX2dvd3+Hi5Obo6uzu8PL09vj6/P4A//z38Ofcz8CvnIdwVzwfAN+8l3BHHO/Aj1wn8Ld8PwC/fDfwp1wPwG8cx3AXvF8AnzzXcAecL8BP3Gfwd/x/AH/8d/Bn3E/AL5wHcNc8nwBfvBdwxxxvwA9cp/A3fL8AP3y38Cdcj8DvHEdwl7zfAB88V3CHnK/Az9zn8Pf8/wD//Pfw59zPwK+ch3BXPB8A37yXcEcc78CPXCfwt3w/AL98N/CnXA/AbxzHcBe8XwCfPNdwB5wvwE/cZ/B3/H8Af/x38GfcT8AvnAdw1zyfAF+8F3DHHG/AD1yn8Dd8vwA/fLfwJ1yPwO8cR3CXvN8AHzxXcIecr8DP3Ofw9/z/AP/////////////////////+/v7+/v79/f39/fz8/Pz8+/v7+vr6+vn5+fj4+Pf39/b29fX19PTz8/Ly8fHw8PDv7u7t7ezs6+vq6uno6Ofn5uXl5OPj4uHh4N/e3t3c3Nva2djY19bV1NTT0tHQz8/OzczLysnIx8bFxMPCwcDAvr28u7q5uLe2tbSzsrGwr62sq6qpqKalpKOioJ+enZyamZiWlZSTkZCPjYyLiYiHhYSCgYB+fXt6eHd1dHJxcG5sa2loZmVjYmBfXVtaWFdVU1JQTk1LSUhGREJBPz08Ojg2NDMxLy0rKigmJCIgHx0bGRcVExEPDQsJBwUDAf9/Px8PBwMBgEAgEAgEAgEAAQEBAQEBAQEBAQEA//////////////+AEAcAAQABAAEBAAEBAAEA/wD//wD//wD/AP+AKwcBAAEAAQD/AP8A/wD/AP8A/wABAAEAAQCARgcBAQEBAQD//////////////wABAQEBAQGAYQf///////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////+AwODw+Pz+/xEAwAGxwj4E9cU+BfUKbwMKZ37+gCALI34LAiN+AwILGOsahhIDHBwcHPE9IN7BIRAAGVRdPgX1Cm8DCmcalhIjfAILfQIDAx0dHR3xPSDnIRgAGVRd8T0grskRAcAB6cI+BPUKbwMKZ37+gCALI34LAiN+AwILGOs+CvUahhIcHBwc8T0g9CN8Agt9AgMD8T0g0MkgIEZJTExFRCAgIFBPTFlHT05TIEhFTElDT1BURVJJTiBBQ1RJT04gIQDADgpwLHQsGhPWICI2ACwNIPE+oOoQyngBCQDlYmsJVF3hDMYKR3AsdCwaG9YgIjYALA0g8a/qEcrJ+hDK/jDI1gTqEMpHPqCQ/lA4Aj5QDgAM1ggw+3ghAcARBAB3xggZDSD5+hHKg+oRykf+UDgCPlAOAAzWCDD7eC4td9YIGQ0g+ckh9grzMf/PzVABr+Am4P/gD+BD4EL2SOBFPkDgQT4E4AfN9RM+CuoAAA4HeeBwJqCvIstsKPsNIPIh/v8yy30g+wEKABH1/yFpAc3kE+cCAVYAEQDBIVt2zeQTrwYYIWsOzYsUIYsOzaQUxwGwAxEAgCGhF8XlzeQT4cERAIjN5BMhAJgRAwABYMDHcc9yIwUg+BQdIPHN9RMhuxUGAc2WE82JEz5E4EGv4EU+A+D/+z4B6hLK4E0QAAB4zccTBSD6zZATxwEACFkhAIhzIwt4sSD5IQDHPv9FdyRwJCJ3JXclcCwg8x5/IQCYx3PPNgDL1DYIx3PLlCPLVCjuPoABDxARIAAhIpjF5XfL1HfLlDwZDSD1POEswQUg7D486jPLr+o0yz3qL8s+oOCCPgLqG8vNiRM+ROBBr+BFPgPg/68+ACEXyyI+CiI+IHev6h7L4ITgluodyz4B6h/L6g/D6g3KBlARnAjNxAjNcwsBLAHFzTsLzQAJwQt4sSDzzZATxwEACFkhAIhzIwt4sSD5zfUTeQYQIYMOzYsUPv/qKcsGgBGwCM3ECM2JEwEsAcXNbAzNAAnBC3ixIPOv6hLKzZATPpDgU/PHAbADEQCIIaEXzeQTzfUTIQIWBgHNlhPNiRM+ROBBr+BFPgPg//sY/j4D6gAgzcRGBgMhF8t+gCJ+gDwifoB3zckP+jDLb/oxy2fNtgs+AeCB8IG3IPv6Dcq3KAPNcwHJ+h3LBgARTg2Hb2AZKmZvTgkq4ItfKjzgjD1PKuCNe4eHg0cRAMUqEhwFIPp5h4eBRxEAxCoSHAUg+n3qMMt86jHLyfCL4I7wjOCP8I3gkBEAw9XlzcoQ4dHwpeaAEhwBAwAJ8JA94JAg6CEAxQYPKk+gXxq3IB95yzegXxq3IBYqT6BfGrcgD3nLN6BfGrcgBiwsLBhHLOXNyhDwlrcoKwYB8KXGP0/LfygBBcXwpMY/Vx4AzZMOe8H18KPGP1ceAM2TDsHhJCJwGAzhJPCjxj8i8KTGPyIsJRbDBg/wjj3gjsLiCz4C6gAgw1JhfBjcHwAL7mpIYL9vBgMhF8t+gCJ+gDwifoB3zckPIcsNEQDGzf4MI+U+A+oAICEgy83+DPocy9YIb+ocy82vYAYDESDLIWIOxeXVzcoQ4fCjxhQi8KQiNg8jVF3hIyMjwQUg5M3ERsE+AeoAIAr+/ygiEQDGbyYAKRnlAwoDbyYAKRleI1bhKmZvxc0xHMwAQMEY2T4B4IHwgbcg+8l+PMjl1c3KEAYB8KVPy38oAQXF8KTLf/UoAi88Vx4AzZMO8XsgAi88xn/B9fCjy3/1KAIvPFceAM2TDvF7KAIvPMZ/wdESE3gSE+EjIyMYsFANAgAIDAYCRCgoFANEKAAUE0QAABQSRAAoFAJVKCjsA1UoAOwTVQAA7BJVACjsAAAEBQAAAAEFAAEBAwIGAQEDBwYCAgAHAwICAAcEAwMBAgYDAwEFBgQEAAECBAQAAwIFBQQFBgUFBAcGMgAAzgAAADIAAM4AAAAyAADOKAAAHhEAChEAAAAACu8AHu8AFAAKFAD2FAAPCgAF6AAC4gAQ3gAQ4gD+CgD74g4C3Q4C4QAC4vIC3fIC4AAM4PsM4PsQ4/sJ3fsJ/wABAQICAwMEBAUFAAAGAQYCBgMGBAYFBgAHAQcCBwMHBAcFBwYICQoKCwsMDA0NDgoPDxAQEQoSEhMTERQVFRYVFxUYCBkIGggb/yAAD/AbD/DlD/9//3+XEQAAAGD/f5cRAAAYAP9/lxEAAIB8lxH/f/9/QHz/f18IAADLI8sSeC9HeS9PAyEAAH2Pb3yPZwk4BWd9kW+3yxPLEn2Pb3yPZwk4BWd9kW+3yxPLEn2Pb3yPZwk4BWd9kW+3yxPLEn2Pb3yPZwk4BWd9kW+3yxPLEn2Pb3yPZwk4BWd9kW+3yxPLEn2Pb3yPZwk4BWd9kW+3yxPLEn2Pb3yPZwk4BWd9kW+3yxPLEn2Pb3yPZwk4BWd9kW+3yxPLEn2Pb3yPZwk4BWd9kW+3yxPLEn2Pb3yPZwk4BWd9kW+3yxPLEn2Pb3yPZwk4BWd9kW+3yxPLEn2Pb3yPZwk4BWd9kW+3yxPLEn2Pb3yPZwk4BWd9kW+3yxPLEn2Pb3yPZwk4BWd9kW+3yxPLEn2Pb3yPZwk4BWd9kW+3yxPLEn2Pb3yPZwk4BWd9kW+3yxPLEssoyxkJ0BPJ+hfLJgJvfuCcLzzgnn3GQG9+4Jvgn6/gmOCZ4JrgneChPkDgl/oYy29OfcZAb0bFeOCgeeCizdMQ8KPgpvCk4KnwpeCsr+Cg4KI+QOChzdMQ8KPgp/Ck4KrwpeCtwXkvPOCgr+CheOCizdMQ8KPgmfCk4JzwpeCf8Kbgl/Cp4JrwrOCd8KfgmPCq4JvwreCe+hnLJgJvTn3GQG9GxXjgoHkvPOChr+CizdMQ8KPgpvCk4KnwpeCswXngoHjgoa/gos3TEPCj4KfwpOCq8KXgra/goOChPkDgos3TEPCj4JnwpOCc8KXgn/Cm4JfwqeCa8KzgnfCn4JjwquCb8K3gnskq4KAq4KEq4KLwl1/woCYGV8t6ICDLe3soJy88X3qTMAIvPG96g1YlXiVvfiVuZxl8LzwYH3ovPFfLeyjhey88X5IwAi88b3qDViVeJW9+JW5nGXxH8Jhf8KEmBlfLeiAgy3t7KCcvPF96kzACLzxveoNWJV4lb34lbmcZfC88GB96LzxXy3so4XsvPF+SMAIvPG96g1YlXiVvfiVuZxl8T/CZX/CiJgZXy3ogIMt7eygnLzxfepMwAi88b3qDViVeJW9+JW5nGXwvPBgfei88V8t7KOF7LzxfkjACLzxveoNWJV4lb34lbmcZfICB4KPwml/woCYGV8t6ICDLe3soJy88X3qTMAIvPG96g1YlXiVvfiVuZxl8LzwYH3ovPFfLeyjhey88X5IwAi88b3qDViVeJW9+JW5nGXxH8Jtf8KEmBlfLeiAgy3t7KCcvPF96kzACLzxveoNWJV4lb34lbmcZfC88GB96LzxXy3so4XsvPF+SMAIvPG96g1YlXiVvfiVuZxl8T/CcX/CiJgZXy3ogIMt7eygnLzxfepMwAi88b3qDViVeJW9+JW5nGXwvPBgfei88V8t7KOF7LzxfkjACLzxveoNWJV4lb34lbmcZfICB4KTwnV/woCYGV8t6ICDLe3soJy88X3qTMAIvPG96g1YlXiVvfiVuZxl8LzwYH3ovPFfLeyjhey88X5IwAi88b3qDViVeJW9+JW5nGXxH8J5f8KEmBlfLeiAgy3t7KCcvPF96kzACLzxveoNWJV4lb34lbmcZfC88GB96LzxXy3so4XsvPF+SMAIvPG96g1YlXiVvfiVuZxl8T/CfX/CiJgZXy3ogIMt7eygnLzxfepMwAi88b3qDViVeJW9+JW5nGXwvPBgfei88V8t7KOF7LzxfkjACLzxveoNWJV4lb34lbmcZfICB4KXJ9T6D4EDxyfWv4EDxyfXF1eXHKv7/KFD+FiAaTiMqh4eHVF1vJgApKXgGmAlHelRne11vGNzGYBLPeBIcGNN2ACETyjQ1KPc1yfvFBmR2AAUg+8HJ+3YABSD7yfXF1eUqEhMLeLEg+OHRwfHJxeUBAKAhAMDNAxThwcnF5XEjBSD74cHJxdXlAQCAIZXKzQMU4dHBycXV5a/qFcuwIAwaEyIaEzIEDXjqFcvlxRq+EyAPIxq+IAkTIw0gCMHhGBkrGyMjBSDmecFPBBoTIhoTIiEVyzThDSDS+hXL4dHBydVfzXIUuzD60cnF9cH6FMrLD6mAR/CLkR+AR/AFqOoUysHJ9cXltxcXF/aA4Ggq4GkFIPo+5OBH4cHxyfXF5bcXFxf2gOBqKuBrBSD6PuTgSOBJ4cHxyT4Q4ADwAC/LN+bwRz4g4ADwAC/mD7DqFsvJzyEAgK8GIE8+CCINIPwFIPnHIQCABiBPIg0g/AUg+cnFzQMVSs0eFcHJxc0RFUjNGRVLzSMVwcnFBgHNKxXBycUGABj2xQYDGPHFBgLNKxXByfXlh4eAJsBvceHxyfXlh4cmwG9GI04jXiNW4fHJ9cXV5eCDKjzK8BPWIF/wg835FF95xghPezwY6PXF1eXF1c13FdHBex4FIS3LGNUBKssR8NjNlRURGPzNlRURnP/NlRUR9v/NlRUR//8+LzwZOPwCA3ovV3svXxMZyTAwRlBT/zAwUE5UU/8wMExJTkVT/xYFB1dFTENPTUUgVE8WBQgtUkVBTFRJTUUtFgAJREVNTyBNQURFIEVTUEVDSUFMTFkWAQpGT1IgTENQJzIwMDAgUEFSVFn/FgAAR1JFRVRJTlg6ICAgICAgICAgICAWAAFEU0MsUEFOLFNBQixGQVRBTElUWRYAAkpFRkYgRlJPSFdFSU4sSUNBUlVTFgADRE9YLFFVQU5HLEFCWVNTICAgICAWAAQgICAgICAgICAgICAgICAgICAgIBYABUNSRURJVFM6ICAgICAgICAgICAgFgAGQUxMIEdGWCZDT0RFIEJZIEFHTyAWAAdIRUxJQ09QVEVSIDNEIE1PREVMIBYACENSRUFURUQgQlkgQlVTWSAgICAgFgAJICAgICAgICAgICAgICAgICAgICAWAApVU0VEIFNPRlRXQVJFOiAgICAgIBYAC1JHQkRTLE5PJENBU0gsRkFSICAgFgAMICAgICAgICAgICAgICAgICAgICAWAA1DT05UQUNUOiAgICAgICAgICAgIBYADkdPQlVaT1ZAWUFIT08uQ09NICAgFgAPSFRUUDovL1NQRUNDWS5EQS5SVSAWABAgICAgICAgICAgICAgICAgICAgIBYAEVNFRSBZT1UgT04gR0JERVYyMDAw/wAAAAAAAAAAAAAAAAAAAAAICBwUHBQ4KDgoMDBwUCAgKCh8VHxUKCgAAAAAAAAAABQUPip/QT4qfFT+gnxUKCgICDw0fkL8rP6Cfmr8hHhYJCR+Wn5SPCR4SPyU/LRISBgYPCR+Wjwkflr8tH5KNDQQEDgocFAgIAAAAAAAAAAABAQOChwUOCg4KDgoHBQICBAQOCgcFBwUHBQ4KHBQICAAABQUPio8NH5CPCx8VCgoAAAICBwUPDR+QjwsOCgQEAAAAAAAAAAAEBA4KHBQcFAAAAAAAAB8fP6CfHwAAAAAAAAAAAAAAAAwMHhIeEgwMAQEDgoeEjwkeEjwkOCgQEAYGDwkflr+qv6q/LR4SDAwGBg8JHxUPDQ4KHxs/oJ8fBwcPiJ+Wjw0eEj8vP6CfHwcHD4iflo8NE5K/LR4SDAwJCR+Wn5afFT8tP6CfGwQEBwcPiJ8XPyEfnr8tHhIMDAYGDwkeFj8pP66/LR4SDAwPDx+Qv66XFQ4KHBQcFAgIBwcPiJ+Wjwkflr8tPiIcHAcHD4iflr+sn5KfHT4iHBwAAAAAAgIHBQICBAQOCgQEAAACAgcFAgIEBA4KDgocFAAAAAAHBQ4KHBQcFA4KAAAAAAAADw8fkJ8fPyEeHgAAAAAAAA4KBwUHBQ4KHBQAAAYGDwkflr8tHhoEBA4KBAQHBw+In5a/rL8pPi4+IhwcBwcPiJ+Wv66/oL+uvy0SEg4OHxEflr8pP6a/LT4iHBwHBw+In5a5qbgoP6y/IxwcDAweEh8VH5a7qr+uvyEeHgcHD4ifFx8RHhY/Lz+gnx8HBw+Inxc/IT4uOCg4KBAQBwcPiJ+Wvy8/qL+uvyEeHgkJH5a/rr+gv66/LT8tEhIPDx+QjwsOChwUHhY/IR4eDw8fkI+Og4KXFT8tHhIMDAkJH5afFR+Qv66/LT8tEhIICBwUHBQ4KDkpP66fEQ4OCgofFR+Qv6q/rr8tPy0SEgkJH5a/pr+qv6y7qr8tEhIHBw+In5a7qruqvy0+IhwcBwcPiJ+Wv66/IT4uOCgQEAcHD4iflr+uv6q/LT+inZ2HBw+In5a/LT4iPy0/LRISBwcPiJ8XP6Cfnr8tPiIcHB8fP6CfGw4KHBQcFBwUCAgJCR+Wn5a7qruqvy0eEgwMERE7qruqnxUfFR4SHBQICAkJH5aflr+uv6q/KR8VCgoJCR+WnxUOCg8JH5a/LRISCQkflr8tPy0eEhwUHBQICA8PH5C/LT46Dwsflr8hHh4HBw+IjwsOChwUHhYfEQ4OEBA4KDwkHhIPCQeEg4KBAQ4OHxEPDQcFDgoeGj4iHBwGBg8JH5a7qpERAAAAAAAAAAAAAAAAAAAAAB8fP6CfHx81rdPfJJne5X1MAIvPEevyxkwAYAfyxkwAYAfyxkwAYAfyxkwAYAfyxkwAYAfyxkwAYAfyxkwAYAfyxkwAYAfyxnLEcsXlDABhMsRyxeUMAGEyxHLF5QwAYTLEcsXlDABhMsRyxeUMAGEyxHLF5QwAYTLEcsXlDABhMsRyxeUMAGEeRcvT/F5MAIvPIVvJrcBAAA+t7zLEbrLED6/vcsRu8sQPj+8P8sRuj/LEL0/yxG7P8sQeLHIeKHAebcgB3xiV31rX3jLH9L/HD5AlU97lW96lPUwAi88R6/LGTABgB/LGTABgB/LGTABgB/LGTABgB/LGTABgB/LGTABgB/LGTABgB/LGTABgB/LGcsRyxeVMAGFyxHLF5UwAYXLEcsXlTABhcsRyxeVMAGFyxHLF5UwAYXLEcsXlTABhcsRyxeVMAGFyxHLF5UwAYV5Fy9P8XkwAi88hGcuQMMxHMsf0pcdPkCUT3qUZ3uV9TACLzxHr8sZMAGAH8sZMAGAH8sZMAGAH8sZMAGAH8sZMAGAH8sZMAGAH8sZMAGAH8sZMAGAH8sZyxHLF5QwAYTLEcsXlDABhMsRyxeUMAGEyxHLF5QwAYTLEcsXlDABhMsRyxeUMAGEyxHLF5QwAYTLEcsXlDABhHkXL0/xeTACLzyFbyZAwzEcyx/SoRt91r9PfZNvepT1MAIvPEevyxkwAYAfyxkwAYAfyxkwAYAfyxkwAYAfyxkwAYAfyxkwAYAfyxkwAYAfyxkwAYAfyxnLEcsXlTABhcsRyxeVMAGFyxHLF5UwAYXLEcsXlTABhcsRyxeVMAGFyxHLF5UwAYXLEcsXlTABhcsRyxeVMAGFeRcvT/F5MAIvPIRnLr/DMRz//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////3q8MAVUZ3tdb3u90pdAfZNPepRfkTA+V3nLPy88g+CDPn+R5YdPbyYARCkpKQkBkVIJweV41kAXb3nWQB8fH+YPZ/CChGd55gcGB/YITwpP8INHLMl5S1+RV3nLPy88g+CDPneR5YdPbyYARCkpKQkBklsJweV41kAXb3nWQB8fH+YPZ/CChGd55gcGB/YITwpP8INHLMmVT3qUX5EwPld5yz8vPIPggz5/keWHT28mAEQpKSkJAR9BCcHleNZAF2951kAfHx/mD2fwgoRneeYHBgf2CE8KT/CDRyzJeUtfkVd5yz8vPIPggz53keWHT28mAEQpKSkJASBKCcHleNZAF2951kAfHx/mD2fwgoRneeYHBgf2CE8KT/CDRyzJfrF3e8t4IAN6LCyAR8sJMAEkfrF3e8t4IAN6LCyAR8sJMAEkfrF3e8t4IAN6LCyAR8sJMAEkfrF3e8t4IAN6LCyAR8sJMAEkfrF3e8t4IAN6LCyAR8sJMAEkfrF3e8t4IAN6LCyAR8sJMAEkfrF3e8t4IAN6LCyAR8sJMAEkfrF3e8t4IAN6LCyAR8sJMAEkfrF3e8t4IAN6LCyAR8sJMAEkfrF3e8t4IAN6LCyAR8sJMAEkfrF3e8t4IAN6LCyAR8sJMAEkfrF3e8t4IAN6LCyAR8sJMAEkfrF3e8t4IAN6LCyAR8sJMAEkfrF3e8t4IAN6LCyAR8sJMAEkfrF3e8t4IAN6LCyAR8sJMAEkfrF3e8t4IAN6LCyAR8sJMAEkfrF3e8t4IAN6LCyAR8sJMAEkfrF3e8t4IAN6LCyAR8sJMAEkfrF3e8t4IAN6LCyAR8sJMAEkfrF3e8t4IAN6LCyAR8sJMAEkfrF3e8t4IAN6LCyAR8sJMAEkfrF3e8t4IAN6LCyAR8sJMAEkfrF3e8t4IAN6LCyAR8sJMAEkfrF3e8t4IAN6LCyAR8sJMAEkfrF3e8t4IAN6LCyAR8sJMAEkfrF3e8t4IAN6LCyAR8sJMAEkfrF3e8t4IAN6LCyAR8sJMAEkfrF3e8t4IAN6LCyAR8sJMAEkfrF3e8t4IAN6LCyAR8sJMAEkfrF3e8t4IAN6LCyAR8sJMAEkfrF3e8t4IAN6LCyAR8sJMAEkfrF3e8t4IAN6LCyAR8sJMAEkfrF3e8t4IAN6LCyAR8sJMAEkfrF3e8t4IAN6LCyAR8sJMAEkfrF3e8t4IAN6LCyAR8sJMAEkfrF3e8t4IAN6LCyAR8sJMAEkfrF3e8t4IAN6LCyAR8sJMAEkfrF3e8t4IAN6LCyAR8sJMAEkfrF3e8t4IAN6LCyAR8sJMAEkfrF3e8t4IAN6LCyAR8sJMAEkfrF3e8t4IAN6LCyAR8sJMAEkfrF3e8t4IAN6LCyAR8sJMAEkfrF3e8t4IAN6LCyAR8sJMAEkfrF3e8t4IAN6LCyAR8sJMAEkfrF3e8t4IAN6LCyAR8sJMAEkfrF3e8t4IAN6LCyAR8sJMAEkfrF3e8t4IAN6LCyAR8sJMAEkfrF3e8t4IAN6LCyAR8sJMAEkfrF3e8t4IAN6LCyAR8sJMAEkfrF3e8t4IAN6LCyAR8sJMAEkfrF3e8t4IAN6LCyAR8sJMAEkfrF3e8t4IAN6LCyAR8sJMAEkfrF3e8t4IAN6LCyAR8sJMAEkfrF3e8t4IAN6LCyAR8sJMAEkfrF3e8t4IAN6LCyAR8sJMAEkfrF3e8t4IAN6LCyAR8sJMAEkfrF3e8t4IAN6LCyAR8sJMAEkfrF3e8t4IAN6LCyAR8sJMAEkfrF3e8t4IAN6LCyAR8sJMAEkfrF3e8t4IAN6LCyAR8sJMAEkfrF3e8t4IAN6LCyAR8sJMAEkfrF3e8t4IAN6LCyAR8sJMAEkfrF3e8t4IAN6LCyAR8sJMAEkfrF3e8t4IAN6LCyAR8sJMAEkfrF3e8t4IAN6LCyAR8sJMAEkfrF3e8t4IAN6LCyAR8sJMAEkfrF3e8t4IAN6LCyAR8sJMAEkfrF3e8t4IAN6LCyAR8sJMAEkfrF3e8t4IAN6LCyAR8sJMAEkfrF3e8t4IAN6LCyAR8sJMAEkfrF3e8t4IAN6LCyAR8sJMAEkfrF3e8t4IAN6LCyAR8sJMAEkfrF3e8t4IAN6LCyAR8sJMAEkfrF3e8t4IAN6LCyAR8sJMAEkfrF3e8t4IAN6LCyAR8sJMAEkfrF3e8t4IAN6LCyAR8sJMAEkfrF3e8t4IAN6LCyAR8sJMAEkfrF3e8t4IAN6LCyAR8sJMAEkfrF3e8t4IAN6LCyAR8sJMAEkfrF3e8t4IAN6LCyAR8sJMAEkfrF3e8t4IAN6LCyAR8sJMAEkfrF3e8t4IAN6LCyAR8sJMAEkfrF3e8t4IAN6LCyAR8sJMAEkfrF3e8t4IAN6LCyAR8sJMAEkfrF3e8t4IAN6LCyAR8sJMAEkfrF3e8t4IAN6LCyAR8sJMAEkfrF3e8t4IAN6LCyAR8sJMAEkfrF3e8t4IAN6LCyAR8sJMAEkfrF3e8t4IAN6LCyAR8sJMAEkfrF3e8t4IAN6LCyAR8sJMAEkfrF3e8t4IAN6LCyAR8sJMAEkfrF3e8t4IAN6LCyAR8sJMAEkfrF3e8t4IAN6LCyAR8sJMAEkfrF3e8t4IAN6LCyAR8sJMAEkfrF3e8t4IAN6LCyAR8sJMAEkfrF3e8t4IAN6LCyAR8sJMAEkfrF3e8t4IAN6LCyAR8sJMAEkfrF3e8t4IAN6LCyAR8sJMAEkfrF3e8t4IAN6LCyAR8sJMAEkfrF3e8t4IAN6LCyAR8sJMAEkfrF3e8t4IAN6LCyAR8sJMAEkfrF3e8t4IAN6LCyAR8sJMAEkfrF3e8t4IAN6LCyAR8sJMAEkfrF3e8t4IAN6LCyAR8sJMAEkfrF3e8t4IAN6LCyAR8sJMAEkfrF3e8t4IAN6LCyAR8sJMAEkfrF3e8t4IAN6LCyAR8sJMAEkfrF3e8t4IAN6LCyAR8sJMAEkfrF3e8t4IAN6LCyAR8sJMAEkfrF3e8t4IAN6LCyAR8sJMAEkfrF3e8t4IAN6LCyAR8sJMAEkfrF3e8t4IAN6LCyAR8sJMAEkfrF3e8t4IAN6LCyAR8sJMAEkfrF3e8t4IAN6LCyAR8sJMAEkfrF3e8t4IAN6LCyAR8sJMAEkfrF3e8t4IAN6LCyAR8sJMAEkfrF3e8t4IAN6LCyAR8sJMAEkfrF3e8t4IAN6LCyAR8sJMAEkfrF3e8t4IAN6LCyAR8sJMAEkfrF3e8t4IAN6LCyAR8sJMAEkfrF3e8t4IAN6LCyAR8sJMAEkfrF3e8t4IAN6LCyAR8sJMAEkfrF3e8t4IAN6LCyAR8sJMAEkfrF3e8t4IAN6LCyAR8sJMAEkfrF3e8t4IAN6LCyAR8sJMAEkfrF3e8t4IAN6LCyAR8sJMAEkfrF3e8t4IAN6LCyAR8sJMAEkfrF3e8t4IAN6LCyAR8sJMAEkyX6xInvLeCAGessJMAEkgEcALH6xInvLeCAGessJMAEkgEcALH6xInvLeCAGessJMAEkgEcALH6xInvLeCAGessJMAEkgEcALH6xInvLeCAGessJMAEkgEcALH6xInvLeCAGessJMAEkgEcALH6xInvLeCAGessJMAEkgEcALH6xInvLeCAGessJMAEkgEcALH6xInvLeCAGessJMAEkgEcALH6xInvLeCAGessJMAEkgEcALH6xInvLeCAGessJMAEkgEcALH6xInvLeCAGessJMAEkgEcALH6xInvLeCAGessJMAEkgEcALH6xInvLeCAGessJMAEkgEcALH6xInvLeCAGessJMAEkgEcALH6xInvLeCAGessJMAEkgEcALH6xInvLeCAGessJMAEkgEcALH6xInvLeCAGessJMAEkgEcALH6xInvLeCAGessJMAEkgEcALH6xInvLeCAGessJMAEkgEcALH6xInvLeCAGessJMAEkgEcALH6xInvLeCAGessJMAEkgEcALH6xInvLeCAGessJMAEkgEcALH6xInvLeCAGessJMAEkgEcALH6xInvLeCAGessJMAEkgEcALH6xInvLeCAGessJMAEkgEcALH6xInvLeCAGessJMAEkgEcALH6xInvLeCAGessJMAEkgEcALH6xInvLeCAGessJMAEkgEcALH6xInvLeCAGessJMAEkgEcALH6xInvLeCAGessJMAEkgEcALH6xInvLeCAGessJMAEkgEcALH6xInvLeCAGessJMAEkgEcALH6xInvLeCAGessJMAEkgEcALH6xInvLeCAGessJMAEkgEcALH6xInvLeCAGessJMAEkgEcALH6xInvLeCAGessJMAEkgEcALH6xInvLeCAGessJMAEkgEcALH6xInvLeCAGessJMAEkgEcALH6xInvLeCAGessJMAEkgEcALH6xInvLeCAGessJMAEkgEcALH6xInvLeCAGessJMAEkgEcALH6xInvLeCAGessJMAEkgEcALH6xInvLeCAGessJMAEkgEcALH6xInvLeCAGessJMAEkgEcALH6xInvLeCAGessJMAEkgEcALH6xInvLeCAGessJMAEkgEcALH6xInvLeCAGessJMAEkgEcALH6xInvLeCAGessJMAEkgEcALH6xInvLeCAGessJMAEkgEcALH6xInvLeCAGessJMAEkgEcALH6xInvLeCAGessJMAEkgEcALH6xInvLeCAGessJMAEkgEcALH6xInvLeCAGessJMAEkgEcALH6xInvLeCAGessJMAEkgEcALH6xInvLeCAGessJMAEkgEcALH6xInvLeCAGessJMAEkgEcALH6xInvLeCAGessJMAEkgEcALH6xInvLeCAGessJMAEkgEcALH6xInvLeCAGessJMAEkgEcALH6xInvLeCAGessJMAEkgEcALH6xInvLeCAGessJMAEkgEcALH6xInvLeCAGessJMAEkgEcALH6xInvLeCAGessJMAEkgEcALH6xInvLeCAGessJMAEkgEcALH6xInvLeCAGessJMAEkgEcALH6xInvLeCAGessJMAEkgEcALH6xInvLeCAGessJMAEkgEcALH6xInvLeCAGessJMAEkgEcALH6xInvLeCAGessJMAEkgEcALH6xInvLeCAGessJMAEkgEcALH6xInvLeCAGessJMAEkgEcALH6xInvLeCAGessJMAEkgEcALH6xInvLeCAGessJMAEkgEcALH6xInvLeCAGessJMAEkgEcALH6xInvLeCAGessJMAEkgEcALH6xInvLeCAGessJMAEkgEcALH6xInvLeCAGessJMAEkgEcALH6xInvLeCAGessJMAEkgEcALH6xInvLeCAGessJMAEkgEcALH6xInvLeCAGessJMAEkgEcALH6xInvLeCAGessJMAEkgEcALH6xInvLeCAGessJMAEkgEcALH6xInvLeCAGessJMAEkgEcALH6xInvLeCAGessJMAEkgEcALH6xInvLeCAGessJMAEkgEcALH6xInvLeCAGessJMAEkgEcALH6xInvLeCAGessJMAEkgEcALH6xInvLeCAGessJMAEkgEcALH6xInvLeCAGessJMAEkgEcALH6xInvLeCAGessJMAEkgEcALH6xInvLeCAGessJMAEkgEcALH6xInvLeCAGessJMAEkgEcALH6xInvLeCAGessJMAEkgEcALH6xInvLeCAGessJMAEkgEcALH6xInvLeCAGessJMAEkgEcALH6xInvLeCAGessJMAEkgEcALH6xInvLeCAGessJMAEkgEcALH6xInvLeCAGessJMAEkgEcALH6xInvLeCAGessJMAEkgEcALH6xInvLeCAGessJMAEkgEcALH6xInvLeCAGessJMAEkgEcALH6xInvLeCAGessJMAEkgEcALH6xInvLeCAGessJMAEkgEcALH6xInvLeCAGessJMAEkgEcALH6xInvLeCAGessJMAEkgEcALH6xInvLeCAGessJMAEkgEcALH6xInvLeCAGessJMAEkgEcALH6xInvLeCAGessJMAEkgEcALH6xInvLeCAGessJMAEkgEcALH6xInvLeCAGessJMAEkgEcALH6xInvLeCAGessJMAEkgEcALH6xInvLeCAGessJMAEkgEcALH6xInvLeCAGessJMAEkgEcALH6xInvLeCAGessJMAEkgEcALH6xInvLeCAGessJMAEkgEcALH6xInvLeCAGessJMAEkgEcALH6xInvLeCAGessJMAEkgEcALH6xInvLeCAGessJMAEkgEcALH6xInvLeCAGessJMAEkgEcALMl+sXd7y3ggA3osLIBHywEwASV+sXd7y3ggA3osLIBHywEwASV+sXd7y3ggA3osLIBHywEwASV+sXd7y3ggA3osLIBHywEwASV+sXd7y3ggA3osLIBHywEwASV+sXd7y3ggA3osLIBHywEwASV+sXd7y3ggA3osLIBHywEwASV+sXd7y3ggA3osLIBHywEwASV+sXd7y3ggA3osLIBHywEwASV+sXd7y3ggA3osLIBHywEwASV+sXd7y3ggA3osLIBHywEwASV+sXd7y3ggA3osLIBHywEwASV+sXd7y3ggA3osLIBHywEwASV+sXd7y3ggA3osLIBHywEwASV+sXd7y3ggA3osLIBHywEwASV+sXd7y3ggA3osLIBHywEwASV+sXd7y3ggA3osLIBHywEwASV+sXd7y3ggA3osLIBHywEwASV+sXd7y3ggA3osLIBHywEwASV+sXd7y3ggA3osLIBHywEwASV+sXd7y3ggA3osLIBHywEwASV+sXd7y3ggA3osLIBHywEwASV+sXd7y3ggA3osLIBHywEwASV+sXd7y3ggA3osLIBHywEwASV+sXd7y3ggA3osLIBHywEwASV+sXd7y3ggA3osLIBHywEwASV+sXd7y3ggA3osLIBHywEwASV+sXd7y3ggA3osLIBHywEwASV+sXd7y3ggA3osLIBHywEwASV+sXd7y3ggA3osLIBHywEwASV+sXd7y3ggA3osLIBHywEwASV+sXd7y3ggA3osLIBHywEwASV+sXd7y3ggA3osLIBHywEwASV+sXd7y3ggA3osLIBHywEwASV+sXd7y3ggA3osLIBHywEwASV+sXd7y3ggA3osLIBHywEwASV+sXd7y3ggA3osLIBHywEwASV+sXd7y3ggA3osLIBHywEwASV+sXd7y3ggA3osLIBHywEwASV+sXd7y3ggA3osLIBHywEwASV+sXd7y3ggA3osLIBHywEwASV+sXd7y3ggA3osLIBHywEwASV+sXd7y3ggA3osLIBHywEwASV+sXd7y3ggA3osLIBHywEwASV+sXd7y3ggA3osLIBHywEwASV+sXd7y3ggA3osLIBHywEwASV+sXd7y3ggA3osLIBHywEwASV+sXd7y3ggA3osLIBHywEwASV+sXd7y3ggA3osLIBHywEwASV+sXd7y3ggA3osLIBHywEwASV+sXd7y3ggA3osLIBHywEwASV+sXd7y3ggA3osLIBHywEwASV+sXd7y3ggA3osLIBHywEwASV+sXd7y3ggA3osLIBHywEwASV+sXd7y3ggA3osLIBHywEwASV+sXd7y3ggA3osLIBHywEwASV+sXd7y3ggA3osLIBHywEwASV+sXd7y3ggA3osLIBHywEwASV+sXd7y3ggA3osLIBHywEwASV+sXd7y3ggA3osLIBHywEwASV+sXd7y3ggA3osLIBHywEwASV+sXd7y3ggA3osLIBHywEwASV+sXd7y3ggA3osLIBHywEwASV+sXd7y3ggA3osLIBHywEwASV+sXd7y3ggA3osLIBHywEwASV+sXd7y3ggA3osLIBHywEwASV+sXd7y3ggA3osLIBHywEwASV+sXd7y3ggA3osLIBHywEwASV+sXd7y3ggA3osLIBHywEwASV+sXd7y3ggA3osLIBHywEwASV+sXd7y3ggA3osLIBHywEwASV+sXd7y3ggA3osLIBHywEwASV+sXd7y3ggA3osLIBHywEwASV+sXd7y3ggA3osLIBHywEwASV+sXd7y3ggA3osLIBHywEwASV+sXd7y3ggA3osLIBHywEwASV+sXd7y3ggA3osLIBHywEwASV+sXd7y3ggA3osLIBHywEwASV+sXd7y3ggA3osLIBHywEwASV+sXd7y3ggA3osLIBHywEwASV+sXd7y3ggA3osLIBHywEwASV+sXd7y3ggA3osLIBHywEwASV+sXd7y3ggA3osLIBHywEwASV+sXd7y3ggA3osLIBHywEwASV+sXd7y3ggA3osLIBHywEwASV+sXd7y3ggA3osLIBHywEwASV+sXd7y3ggA3osLIBHywEwASV+sXd7y3ggA3osLIBHywEwASV+sXd7y3ggA3osLIBHywEwASV+sXd7y3ggA3osLIBHywEwASV+sXd7y3ggA3osLIBHywEwASV+sXd7y3ggA3osLIBHywEwASV+sXd7y3ggA3osLIBHywEwASV+sXd7y3ggA3osLIBHywEwASV+sXd7y3ggA3osLIBHywEwASV+sXd7y3ggA3osLIBHywEwASV+sXd7y3ggA3osLIBHywEwASV+sXd7y3ggA3osLIBHywEwASV+sXd7y3ggA3osLIBHywEwASV+sXd7y3ggA3osLIBHywEwASV+sXd7y3ggA3osLIBHywEwASV+sXd7y3ggA3osLIBHywEwASV+sXd7y3ggA3osLIBHywEwASV+sXd7y3ggA3osLIBHywEwASV+sXd7y3ggA3osLIBHywEwASV+sXd7y3ggA3osLIBHywEwASV+sXd7y3ggA3osLIBHywEwASV+sXd7y3ggA3osLIBHywEwASV+sXd7y3ggA3osLIBHywEwASV+sXd7y3ggA3osLIBHywEwASV+sXd7y3ggA3osLIBHywEwASV+sXd7y3ggA3osLIBHywEwASV+sXd7y3ggA3osLIBHywEwASV+sXd7y3ggA3osLIBHywEwASV+sXd7y3ggA3osLIBHywEwASV+sXd7y3ggA3osLIBHywEwASV+sXd7y3ggA3osLIBHywEwASV+sXd7y3ggA3osLIBHywEwASV+sXd7y3ggA3osLIBHywEwASV+sXd7y3ggA3osLIBHywEwASV+sXd7y3ggA3osLIBHywEwASV+sXd7y3ggA3osLIBHywEwASV+sXd7y3ggA3osLIBHywEwASV+sXd7y3ggA3osLIBHywEwASV+sXd7y3ggA3osLIBHywEwASV+sXd7y3ggA3osLIBHywEwASV+sXd7y3ggA3osLIBHywEwASV+sXd7y3ggA3osLIBHywEwASXJfrF3e8t4IAZ6ywEwASWARywsfrF3e8t4IAZ6ywEwASWARywsfrF3e8t4IAZ6ywEwASWARywsfrF3e8t4IAZ6ywEwASWARywsfrF3e8t4IAZ6ywEwASWARywsfrF3e8t4IAZ6ywEwASWARywsfrF3e8t4IAZ6ywEwASWARywsfrF3e8t4IAZ6ywEwASWARywsfrF3e8t4IAZ6ywEwASWARywsfrF3e8t4IAZ6ywEwASWARywsfrF3e8t4IAZ6ywEwASWARywsfrF3e8t4IAZ6ywEwASWARywsfrF3e8t4IAZ6ywEwASWARywsfrF3e8t4IAZ6ywEwASWARywsfrF3e8t4IAZ6ywEwASWARywsfrF3e8t4IAZ6ywEwASWARywsfrF3e8t4IAZ6ywEwASWARywsfrF3e8t4IAZ6ywEwASWARywsfrF3e8t4IAZ6ywEwASWARywsfrF3e8t4IAZ6ywEwASWARywsfrF3e8t4IAZ6ywEwASWARywsfrF3e8t4IAZ6ywEwASWARywsfrF3e8t4IAZ6ywEwASWARywsfrF3e8t4IAZ6ywEwASWARywsfrF3e8t4IAZ6ywEwASWARywsfrF3e8t4IAZ6ywEwASWARywsfrF3e8t4IAZ6ywEwASWARywsfrF3e8t4IAZ6ywEwASWARywsfrF3e8t4IAZ6ywEwASWARywsfrF3e8t4IAZ6ywEwASWARywsfrF3e8t4IAZ6ywEwASWARywsfrF3e8t4IAZ6ywEwASWARywsfrF3e8t4IAZ6ywEwASWARywsfrF3e8t4IAZ6ywEwASWARywsfrF3e8t4IAZ6ywEwASWARywsfrF3e8t4IAZ6ywEwASWARywsfrF3e8t4IAZ6ywEwASWARywsfrF3e8t4IAZ6ywEwASWARywsfrF3e8t4IAZ6ywEwASWARywsfrF3e8t4IAZ6ywEwASWARywsfrF3e8t4IAZ6ywEwASWARywsfrF3e8t4IAZ6ywEwASWARywsfrF3e8t4IAZ6ywEwASWARywsfrF3e8t4IAZ6ywEwASWARywsfrF3e8t4IAZ6ywEwASWARywsfrF3e8t4IAZ6ywEwASWARywsfrF3e8t4IAZ6ywEwASWARywsfrF3e8t4IAZ6ywEwASWARywsfrF3e8t4IAZ6ywEwASWARywsfrF3e8t4IAZ6ywEwASWARywsfrF3e8t4IAZ6ywEwASWARywsfrF3e8t4IAZ6ywEwASWARywsfrF3e8t4IAZ6ywEwASWARywsfrF3e8t4IAZ6ywEwASWARywsfrF3e8t4IAZ6ywEwASWARywsfrF3e8t4IAZ6ywEwASWARywsfrF3e8t4IAZ6ywEwASWARywsfrF3e8t4IAZ6ywEwASWARywsfrF3e8t4IAZ6ywEwASWARywsfrF3e8t4IAZ6ywEwASWARywsfrF3e8t4IAZ6ywEwASWARywsfrF3e8t4IAZ6ywEwASWARywsfrF3e8t4IAZ6ywEwASWARywsfrF3e8t4IAZ6ywEwASWARywsfrF3e8t4IAZ6ywEwASWARywsfrF3e8t4IAZ6ywEwASWARywsfrF3e8t4IAZ6ywEwASWARywsfrF3e8t4IAZ6ywEwASWARywsfrF3e8t4IAZ6ywEwASWARywsfrF3e8t4IAZ6ywEwASWARywsfrF3e8t4IAZ6ywEwASWARywsfrF3e8t4IAZ6ywEwASWARywsfrF3e8t4IAZ6ywEwASWARywsfrF3e8t4IAZ6ywEwASWARywsfrF3e8t4IAZ6ywEwASWARywsfrF3e8t4IAZ6ywEwASWARywsfrF3e8t4IAZ6ywEwASWARywsfrF3e8t4IAZ6ywEwASWARywsfrF3e8t4IAZ6ywEwASWARywsfrF3e8t4IAZ6ywEwASWARywsfrF3e8t4IAZ6ywEwASWARywsfrF3e8t4IAZ6ywEwASWARywsfrF3e8t4IAZ6ywEwASWARywsfrF3e8t4IAZ6ywEwASWARywsfrF3e8t4IAZ6ywEwASWARywsfrF3e8t4IAZ6ywEwASWARywsfrF3e8t4IAZ6ywEwASWARywsfrF3e8t4IAZ6ywEwASWARywsfrF3e8t4IAZ6ywEwASWARywsfrF3e8t4IAZ6ywEwASWARywsfrF3e8t4IAZ6ywEwASWARywsfrF3e8t4IAZ6ywEwASWARywsfrF3e8t4IAZ6ywEwASWARywsfrF3e8t4IAZ6ywEwASWARywsfrF3e8t4IAZ6ywEwASWARywsfrF3e8t4IAZ6ywEwASWARywsfrF3e8t4IAZ6ywEwASWARywsfrF3e8t4IAZ6ywEwASWARywsfrF3e8t4IAZ6ywEwASWARywsfrF3e8t4IAZ6ywEwASWARywsfrF3e8t4IAZ6ywEwASWARywsfrF3e8t4IAZ6ywEwASWARywsfrF3e8t4IAZ6ywEwASWARywsfrF3e8t4IAZ6ywEwASWARywsfrF3e8t4IAZ6ywEwASWARywsfrF3e8t4IAZ6ywEwASWARywsfrF3e8t4IAZ6ywEwASWARywsfrF3e8t4IAZ6ywEwASWARywsfrF3e8t4IAZ6ywEwASWARywsfrF3e8t4IAZ6ywEwASWARywsfrF3e8t4IAZ6ywEwASWARywsfrF3e8t4IAZ6ywEwASWARywsfrF3e8t4IAZ6ywEwASWARywsfrF3e8t4IAZ6ywEwASWARywsfrF3e8t4IAZ6ywEwASWARywsfrF3e8t4IAZ6ywEwASWARywsfrF3e8t4IAZ6ywEwASWARywsfrF3e8t4IAZ6ywEwASWARywsfrF3e8t4IAZ6ywEwASWARywsfrF3e8t4IAZ6ywEwASWARywsyf///////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////wHRe7o4A1pXewYHoE8K9XqgTwQK4JF6Hx8f5g9X8JNnTixGLXsfHx/mD1/wgoNne5LRxADB8JGiVy+mX3qhsyJ6L6ZfeqCzItF7ujgDWld7BgegTwr1eqBPBArgkXofHx/mD1fwk2dOLEYtex8fH+YPX/CCg2d7ktHEAMHwkaJXL6ZfeqGzInovpl96oLMi0Xu6OANaV3sGB6BPCvV6oE8ECuCReh8fH+YPV/CTZ04sRi17Hx8f5g9f8IKDZ3uS0cQAwfCRolcvpl96obMiei+mX3qgsyLRe7o4A1pXewYHoE8K9XqgTwQK4JF6Hx8f5g9X8JNnTixGLXsfHx/mD1/wgoNne5LRxADB8JGiVy+mX3qhsyJ6L6ZfeqCzItF7ujgDWld7BgegTwr1eqBPBArgkXofHx/mD1fwk2dOLEYtex8fH+YPX/CCg2d7ktHEAMHwkaJXL6ZfeqGzInovpl96oLMi0Xu6OANaV3sGB6BPCvV6oE8ECuCReh8fH+YPV/CTZ04sRi17Hx8f5g9f8IKDZ3uS0cQAwfCRolcvpl96obMiei+mX3qgsyLRe7o4A1pXewYHoE8K9XqgTwQK4JF6Hx8f5g9X8JNnTixGLXsfHx/mD1/wgoNne5LRxADB8JGiVy+mX3qhsyJ6L6ZfeqCzItF7ujgDWld7BgegTwr1eqBPBArgkXofHx/mD1fwk2dOLEYtex8fH+YPX/CCg2d7ktHEAMHwkaJXL6ZfeqGzInovpl96oLMi0Xu6OANaV3sGB6BPCvV6oE8ECuCReh8fH+YPV/CTZ04sRi17Hx8f5g9f8IKDZ3uS0cQAwfCRolcvpl96obMiei+mX3qgsyLRe7o4A1pXewYHoE8K9XqgTwQK4JF6Hx8f5g9X8JNnTixGLXsfHx/mD1/wgoNne5LRxADB8JGiVy+mX3qhsyJ6L6ZfeqCzItF7ujgDWld7BgegTwr1eqBPBArgkXofHx/mD1fwk2dOLEYtex8fH+YPX/CCg2d7ktHEAMHwkaJXL6ZfeqGzInovpl96oLMi0Xu6OANaV3sGB6BPCvV6oE8ECuCReh8fH+YPV/CTZ04sRi17Hx8f5g9f8IKDZ3uS0cQAwfCRolcvpl96obMiei+mX3qgsyLRe7o4A1pXewYHoE8K9XqgTwQK4JF6Hx8f5g9X8JNnTixGLXsfHx/mD1/wgoNne5LRxADB8JGiVy+mX3qhsyJ6L6ZfeqCzItF7ujgDWld7BgegTwr1eqBPBArgkXofHx/mD1fwk2dOLEYtex8fH+YPX/CCg2d7ktHEAMHwkaJXL6ZfeqGzInovpl96oLMi0Xu6OANaV3sGB6BPCvV6oE8ECuCReh8fH+YPV/CTZ04sRi17Hx8f5g9f8IKDZ3uS0cQAwfCRolcvpl96obMiei+mX3qgsyLRe7o4A1pXewYHoE8K9XqgTwQK4JF6Hx8f5g9X8JNnTixGLXsfHx/mD1/wgoNne5LRxADB8JGiVy+mX3qhsyJ6L6ZfeqCzItF7ujgDWld7BgegTwr1eqBPBArgkXofHx/mD1fwk2dOLEYtex8fH+YPX/CCg2d7ktHEAMHwkaJXL6ZfeqGzInovpl96oLMi0Xu6OANaV3sGB6BPCvV6oE8ECuCReh8fH+YPV/CTZ04sRi17Hx8f5g9f8IKDZ3uS0cQAwfCRolcvpl96obMiei+mX3qgsyLRe7o4A1pXewYHoE8K9XqgTwQK4JF6Hx8f5g9X8JNnTixGLXsfHx/mD1/wgoNne5LRxADB8JGiVy+mX3qhsyJ6L6ZfeqCzItF7ujgDWld7BgegTwr1eqBPBArgkXofHx/mD1fwk2dOLEYtex8fH+YPX/CCg2d7ktHEAMHwkaJXL6ZfeqGzInovpl96oLMi0Xu6OANaV3sGB6BPCvV6oE8ECuCReh8fH+YPV/CTZ04sRi17Hx8f5g9f8IKDZ3uS0cQAwfCRolcvpl96obMiei+mX3qgsyLRe7o4A1pXewYHoE8K9XqgTwQK4JF6Hx8f5g9X8JNnTixGLXsfHx/mD1/wgoNne5LRxADB8JGiVy+mX3qhsyJ6L6ZfeqCzItF7ujgDWld7BgegTwr1eqBPBArgkXofHx/mD1fwk2dOLEYtex8fH+YPX/CCg2d7ktHEAMHwkaJXL6ZfeqGzInovpl96oLMi0Xu6OANaV3sGB6BPCvV6oE8ECuCReh8fH+YPV/CTZ04sRi17Hx8f5g9f8IKDZ3uS0cQAwfCRolcvpl96obMiei+mX3qgsyLRe7o4A1pXewYHoE8K9XqgTwQK4JF6Hx8f5g9X8JNnTixGLXsfHx/mD1/wgoNne5LRxADB8JGiVy+mX3qhsyJ6L6ZfeqCzItF7ujgDWld7BgegTwr1eqBPBArgkXofHx/mD1fwk2dOLEYtex8fH+YPX/CCg2d7ktHEAMHwkaJXL6ZfeqGzInovpl96oLMi0Xu6OANaV3sGB6BPCvV6oE8ECuCReh8fH+YPV/CTZ04sRi17Hx8f5g9f8IKDZ3uS0cQAwfCRolcvpl96obMiei+mX3qgsyLRe7o4A1pXewYHoE8K9XqgTwQK4JF6Hx8f5g9X8JNnTixGLXsfHx/mD1/wgoNne5LRxADB8JGiVy+mX3qhsyJ6L6ZfeqCzItF7ujgDWld7BgegTwr1eqBPBArgkXofHx/mD1fwk2dOLEYtex8fH+YPX/CCg2d7ktHEAMHwkaJXL6ZfeqGzInovpl96oLMi0Xu6OANaV3sGB6BPCvV6oE8ECuCReh8fH+YPV/CTZ04sRi17Hx8f5g9f8IKDZ3uS0cQAwfCRolcvpl96obMiei+mX3qgsyLRe7o4A1pXewYHoE8K9XqgTwQK4JF6Hx8f5g9X8JNnTixGLXsfHx/mD1/wgoNne5LRxADB8JGiVy+mX3qhsyJ6L6ZfeqCzItF7ujgDWld7BgegTwr1eqBPBArgkXofHx/mD1fwk2dOLEYtex8fH+YPX/CCg2d7ktHEAMHwkaJXL6ZfeqGzInovpl96oLMi0Xu6OANaV3sGB6BPCvV6oE8ECuCReh8fH+YPV/CTZ04sRi17Hx8f5g9f8IKDZ3uS0cQAwfCRolcvpl96obMiei+mX3qgsyLRe7o4A1pXewYHoE8K9XqgTwQK4JF6Hx8f5g9X8JNnTixGLXsfHx/mD1/wgoNne5LRxADB8JGiVy+mX3qhsyJ6L6ZfeqCzItF7ujgDWld7BgegTwr1eqBPBArgkXofHx/mD1fwk2dOLEYtex8fH+YPX/CCg2d7ktHEAMHwkaJXL6ZfeqGzInovpl96oLMi0Xu6OANaV3sGB6BPCvV6oE8ECuCReh8fH+YPV/CTZ04sRi17Hx8f5g9f8IKDZ3uS0cQAwfCRolcvpl96obMiei+mX3qgsyLRe7o4A1pXewYHoE8K9XqgTwQK4JF6Hx8f5g9X8JNnTixGLXsfHx/mD1/wgoNne5LRxADB8JGiVy+mX3qhsyJ6L6ZfeqCzItF7ujgDWld7BgegTwr1eqBPBArgkXofHx/mD1fwk2dOLEYtex8fH+YPX/CCg2d7ktHEAMHwkaJXL6ZfeqGzInovpl96oLMi0Xu6OANaV3sGB6BPCvV6oE8ECuCReh8fH+YPV/CTZ04sRi17Hx8f5g9f8IKDZ3uS0cQAwfCRolcvpl96obMiei+mX3qgsyLRe7o4A1pXewYHoE8K9XqgTwQK4JF6Hx8f5g9X8JNnTixGLXsfHx/mD1/wgoNne5LRxADB8JGiVy+mX3qhsyJ6L6ZfeqCzItF7ujgDWld7BgegTwr1eqBPBArgkXofHx/mD1fwk2dOLEYtex8fH+YPX/CCg2d7ktHEAMHwkaJXL6ZfeqGzInovpl96oLMi0Xu6OANaV3sGB6BPCvV6oE8ECuCReh8fH+YPV/CTZ04sRi17Hx8f5g9f8IKDZ3uS0cQAwfCRolcvpl96obMiei+mX3qgsyLRe7o4A1pXewYHoE8K9XqgTwQK4JF6Hx8f5g9X8JNnTixGLXsfHx/mD1/wgoNne5LRxADB8JGiVy+mX3qhsyJ6L6ZfeqCzItF7ujgDWld7BgegTwr1eqBPBArgkXofHx/mD1fwk2dOLEYtex8fH+YPX/CCg2d7ktHEAMHwkaJXL6ZfeqGzInovpl96oLMi0Xu6OANaV3sGB6BPCvV6oE8ECuCReh8fH+YPV/CTZ04sRi17Hx8f5g9f8IKDZ3uS0cQAwfCRolcvpl96obMiei+mX3qgsyLRe7o4A1pXewYHoE8K9XqgTwQK4JF6Hx8f5g9X8JNnTixGLXsfHx/mD1/wgoNne5LRxADB8JGiVy+mX3qhsyJ6L6ZfeqCzItF7ujgDWld7BgegTwr1eqBPBArgkXofHx/mD1fwk2dOLEYtex8fH+YPX/CCg2d7ktHEAMHwkaJXL6ZfeqGzInovpl96oLMi0Xu6OANaV3sGB6BPCvV6oE8ECuCReh8fH+YPV/CTZ04sRi17Hx8f5g9f8IKDZ3uS0cQAwfCRolcvpl96obMiei+mX3qgsyLRe7o4A1pXewYHoE8K9XqgTwQK4JF6Hx8f5g9X8JNnTixGLXsfHx/mD1/wgoNne5LRxADB8JGiVy+mX3qhsyJ6L6ZfeqCzItF7ujgDWld7BgegTwr1eqBPBArgkXofHx/mD1fwk2dOLEYtex8fH+YPX/CCg2d7ktHEAMHwkaJXL6ZfeqGzInovpl96oLMi0Xu6OANaV3sGB6BPCvV6oE8ECuCReh8fH+YPV/CTZ04sRi17Hx8f5g9f8IKDZ3uS0cQAwfCRolcvpl96obMiei+mX3qgsyLRe7o4A1pXewYHoE8K9XqgTwQK4JF6Hx8f5g9X8JNnTixGLXsfHx/mD1/wgoNne5LRxADB8JGiVy+mX3qhsyJ6L6ZfeqCzItF7ujgDWld7BgegTwr1eqBPBArgkXofHx/mD1fwk2dOLEYtex8fH+YPX/CCg2d7ktHEAMHwkaJXL6ZfeqGzInovpl96oLMi0Xu6OANaV3sGB6BPCvV6oE8ECuCReh8fH+YPV/CTZ04sRi17Hx8f5g9f8IKDZ3uS0cQAwfCRolcvpl96obMiei+mX3qgsyLRe7o4A1pXewYHoE8K9XqgTwQK4JF6Hx8f5g9X8JNnTixGLXsfHx/mD1/wgoNne5LRxADB8JGiVy+mX3qhsyJ6L6ZfeqCzItF7ujgDWld7BgegTwr1eqBPBArgkXofHx/mD1fwk2dOLEYtex8fH+YPX/CCg2d7ktHEAMHwkaJXL6ZfeqGzInovpl96oLMi0Xu6OANaV3sGB6BPCvV6oE8ECuCReh8fH+YPV/CTZ04sRi17Hx8f5g9f8IKDZ3uS0cQAwfCRolcvpl96obMiei+mX3qgsyLRe7o4A1pXewYHoE8K9XqgTwQK4JF6Hx8f5g9X8JNnTixGLXsfHx/mD1/wgoNne5LRxADB8JGiVy+mX3qhsyJ6L6ZfeqCzItF7ujgDWld7BgegTwr1eqBPBArgkXofHx/mD1fwk2dOLEYtex8fH+YPX/CCg2d7ktHEAMHwkaJXL6ZfeqGzInovpl96oLMi0Xu6OANaV3sGB6BPCvV6oE8ECuCReh8fH+YPV/CTZ04sRi17Hx8f5g9f8IKDZ3uS0cQAwfCRolcvpl96obMiei+mX3qgsyLRe7o4A1pXewYHoE8K9XqgTwQK4JF6Hx8f5g9X8JNnTixGLXsfHx/mD1/wgoNne5LRxADB8JGiVy+mX3qhsyJ6L6ZfeqCzItF7ujgDWld7BgegTwr1eqBPBArgkXofHx/mD1fwk2dOLEYtex8fH+YPX/CCg2d7ktHEAMHwkaJXL6ZfeqGzInovpl96oLMi0Xu6OANaV3sGB6BPCvV6oE8ECuCReh8fH+YPV/CTZ04sRi17Hx8f5g9f8IKDZ3uS0cQAwfCRolcvpl96obMiei+mX3qgsyLRe7o4A1pXewYHoE8K9XqgTwQK4JF6Hx8f5g9X8JNnTixGLXsfHx/mD1/wgoNne5LRxADB8JGiVy+mX3qhsyJ6L6ZfeqCzItF7ujgDWld7BgegTwr1eqBPBArgkXofHx/mD1fwk2dOLEYtex8fH+YPX/CCg2d7ktHEAMHwkaJXL6ZfeqGzInovpl96oLMi0Xu6OANaV3sGB6BPCvV6oE8ECuCReh8fH+YPV/CTZ04sRi17Hx8f5g9f8IKDZ3uS0cQAwfCRolcvpl96obMiei+mX3qgsyLRe7o4A1pXewYHoE8K9XqgTwQK4JF6Hx8f5g9X8JNnTixGLXsfHx/mD1/wgoNne5LRxADB8JGiVy+mX3qhsyJ6L6ZfeqCzItF7ujgDWld7BgegTwr1eqBPBArgkXofHx/mD1fwk2dOLEYtex8fH+YPX/CCg2d7ktHEAMHwkaJXL6ZfeqGzInovpl96oLMi0Xu6OANaV3sGB6BPCvV6oE8ECuCReh8fH+YPV/CTZ04sRi17Hx8f5g9f8IKDZ3uS0cQAwfCRolcvpl96obMiei+mX3qgsyLRe7o4A1pXewYHoE8K9XqgTwQK4JF6Hx8f5g9X8JNnTixGLXsfHx/mD1/wgoNne5LRxADB8JGiVy+mX3qhsyJ6L6ZfeqCzItF7ujgDWld7BgegTwr1eqBPBArgkXofHx/mD1fwk2dOLEYtex8fH+YPX/CCg2d7ktHEAMHwkaJXL6ZfeqGzInovpl96oLMi0Xu6OANaV3sGB6BPCvV6oE8ECuCReh8fH+YPV/CTZ04sRi17Hx8f5g9f8IKDZ3uS0cQAwfCRolcvpl96obMiei+mX3qgsyLRe7o4A1pXewYHoE8K9XqgTwQK4JF6Hx8f5g9X8JNnTixGLXsfHx/mD1/wgoNne5LRxADB8JGiVy+mX3qhsyJ6L6ZfeqCzItF7ujgDWld7BgegTwr1eqBPBArgkXofHx/mD1fwk2dOLEYtex8fH+YPX/CCg2d7ktHEAMHwkaJXL6ZfeqGzInovpl96oLMi0Xu6OANaV3sGB6BPCvV6oE8ECuCReh8fH+YPV/CTZ04sRi17Hx8f5g9f8IKDZ3uS0cQAwfCRolcvpl96obMiei+mX3qgsyLRe7o4A1pXewYHoE8K9XqgTwQK4JF6Hx8f5g9X8JNnTixGLXsfHx/mD1/wgoNne5LRxADB8JGiVy+mX3qhsyJ6L6ZfeqCzItF7ujgDWld7BgegTwr1eqBPBArgkXofHx/mD1fwk2dOLEYtex8fH+YPX/CCg2d7ktHEAMHwkaJXL6ZfeqGzInovpl96oLMi0Xu6OANaV3sGB6BPCvV6oE8ECuCReh8fH+YPV/CTZ04sRi17Hx8f5g9f8IKDZ3uS0cQAwfCRolcvpl96obMiei+mX3qgsyLRe7o4A1pXewYHoE8K9XqgTwQK4JF6Hx8f5g9X8JNnTixGLXsfHx/mD1/wgoNne5LRxADB8JGiVy+mX3qhsyJ6L6ZfeqCzItF7ujgDWld7BgegTwr1eqBPBArgkXofHx/mD1fwk2dOLEYtex8fH+YPX/CCg2d7ktHEAMHwkaJXL6ZfeqGzInovpl96oLMi0Xu6OANaV3sGB6BPCvV6oE8ECuCReh8fH+YPV/CTZ04sRi17Hx8f5g9f8IKDZ3uS0cQAwfCRolcvpl96obMiei+mX3qgsyLRe7o4A1pXewYHoE8K9XqgTwQK4JF6Hx8f5g9X8JNnTixGLXsfHx/mD1/wgoNne5LRxADB8JGiVy+mX3qhsyJ6L6ZfeqCzItF7ujgDWld7BgegTwr1eqBPBArgkXofHx/mD1fwk2dOLEYtex8fH+YPX/CCg2d7ktHEAMHwkaJXL6ZfeqGzInovpl96oLMi0Xu6OANaV3sGB6BPCvV6oE8ECuCReh8fH+YPV/CTZ04sRi17Hx8f5g9f8IKDZ3uS0cQAwfCRolcvpl96obMiei+mX3qgsyLRe7o4A1pXewYHoE8K9XqgTwQK4JF6Hx8f5g9X8JNnTixGLXsfHx/mD1/wgoNne5LRxADB8JGiVy+mX3qhsyJ6L6ZfeqCzItF7ujgDWld7BgegTwr1eqBPBArgkXofHx/mD1fwk2dOLEYtex8fH+YPX/CCg2d7ktHEAMHwkaJXL6ZfeqGzInovpl96oLMi0Xu6OANaV3sGB6BPCvV6oE8ECuCReh8fH+YPV/CTZ04sRi17Hx8f5g9f8IKDZ3uS0cQAwfCRolcvpl96obMiei+mX3qgsyLRe7o4A1pXewYHoE8K9XqgTwQK4JF6Hx8f5g9X8JNnTixGLXsfHx/mD1/wgoNne5LRxADB8JGiVy+mX3qhsyJ6L6ZfeqCzItF7ujgDWld7BgegTwr1eqBPBArgkXofHx/mD1fwk2dOLEYtex8fH+YPX/CCg2d7ktHEAMHwkaJXL6ZfeqGzInovpl96oLMi0Xu6OANaV3sGB6BPCvV6oE8ECuCReh8fH+YPV/CTZ04sRi17Hx8f5g9f8IKDZ3uS0cQAwfCRolcvpl96obMiei+mX3qgsyLRe7o4A1pXewYHoE8K9XqgTwQK4JF6Hx8f5g9X8JNnTixGLXsfHx/mD1/wgoNne5LRxADB8JGiVy+mX3qhsyJ6L6ZfeqCzItF7ujgDWld7BgegTwr1eqBPBArgkXofHx/mD1fwk2dOLEYtex8fH+YPX/CCg2d7ktHEAMHwkaJXL6ZfeqGzInovpl96oLMi0Xu6OANaV3sGB6BPCvV6oE8ECuCReh8fH+YPV/CTZ04sRi17Hx8f5g9f8IKDZ3uS0cQAwfCRolcvpl96obMiei+mX3qgsyLRe7o4A1pXewYHoE8K9XqgTwQK4JF6Hx8f5g9X8JNnTixGLXsfHx/mD1/wgoNne5LRxADB8JGiVy+mX3qhsyJ6L6ZfeqCzItF7ujgDWld7BgegTwr1eqBPBArgkXofHx/mD1fwk2dOLEYtex8fH+YPX/CCg2d7ktHEAMHwkaJXL6ZfeqGzInovpl96oLMi0Xu6OANaV3sGB6BPCvV6oE8ECuCReh8fH+YPV/CTZ04sRi17Hx8f5g9f8IKDZ3uS0cQAwfCRolcvpl96obMiei+mX3qgsyLRe7o4A1pXewYHoE8K9XqgTwQK4JF6Hx8f5g9X8JNnTixGLXsfHx/mD1/wgoNne5LRxADB8JGiVy+mX3qhsyJ6L6ZfeqCzItF7ujgDWld7BgegTwr1eqBPBArgkXofHx/mD1fwk2dOLEYtex8fH+YPX/CCg2d7ktHEAMHwkaJXL6ZfeqGzInovpl96oLMi0Xu6OANaV3sGB6BPCvV6oE8ECuCReh8fH+YPV/CTZ04sRi17Hx8f5g9f8IKDZ3uS0cQAwfCRolcvpl96obMiei+mX3qgsyLRe7o4A1pXewYHoE8K9XqgTwQK4JF6Hx8f5g9X8JNnTixGLXsfHx/mD1/wgoNne5LRxADB8JGiVy+mX3qhsyJ6L6ZfeqCzItF7ujgDWld7BgegTwr1eqBPBArgkXofHx/mD1fwk2dOLEYtex8fH+YPX/CCg2d7ktHEAMHwkaJXL6ZfeqGzInovpl96oLMi0Xu6OANaV3sGB6BPCvV6oE8ECuCReh8fH+YPV/CTZ04sRi17Hx8f5g9f8IKDZ3uS0cQAwfCRolcvpl96obMiei+mX3qgsyLRe7o4A1pXewYHoE8K9XqgTwQK4JF6Hx8f5g9X8JNnTixGLXsfHx/mD1/wgoNne5LRxADB8JGiVy+mX3qhsyJ6L6ZfeqCzItF7ujgDWld7BgegTwr1eqBPBArgkXofHx/mD1fwk2dOLEYtex8fH+YPX/CCg2d7ktHEAMHwkaJXL6ZfeqGzInovpl96oLMi0Xu6OANaV3sGB6BPCvV6oE8ECuCReh8fH+YPV/CTZ04sRi17Hx8f5g9f8IKDZ3uS0cQAwfCRolcvpl96obMiei+mX3qgsyLRe7o4A1pXewYHoE8K9XqgTwQK4JF6Hx8f5g9X8JNnTixGLXsfHx/mD1/wgoNne5LRxADB8JGiVy+mX3qhsyJ6L6ZfeqCzItF7ujgDWld7BgegTwr1eqBPBArgkXofHx/mD1fwk2dOLEYtex8fH+YPX/CCg2d7ktHEAMHwkaJXL6ZfeqGzInovpl96oLMi0Xu6OANaV3sGB6BPCvV6oE8ECuCReh8fH+YPV/CTZ04sRi17Hx8f5g9f8IKDZ3uS0cQAwfCRolcvpl96obMiei+mX3qgsyLRe7o4A1pXewYHoE8K9XqgTwQK4JF6Hx8f5g9X8JNnTixGLXsfHx/mD1/wgoNne5LRxADB8JGiVy+mX3qhsyJ6L6ZfeqCzItF7ujgDWld7BgegTwr1eqBPBArgkXofHx/mD1fwk2dOLEYtex8fH+YPX/CCg2d7ktHEAMHwkaJXL6ZfeqGzInovpl96oLMi0Xu6OANaV3sGB6BPCvV6oE8ECuCReh8fH+YPV/CTZ04sRi17Hx8f5g9f8IKDZ3uS0cQAwfCRolcvpl96obMiei+mX3qgsyLRe7o4A1pXewYHoE8K9XqgTwQK4JF6Hx8f5g9X8JNnTixGLXsfHx/mD1/wgoNne5LRxADB8JGiVy+mX3qhsyJ6L6ZfeqCzItF7ujgDWld7BgegTwr1eqBPBArgkXofHx/mD1fwk2dOLEYtex8fH+YPX/CCg2d7ktHEAMHwkaJXL6ZfeqGzInovpl96oLMi0Xu6OANaV3sGB6BPCvV6oE8ECuCReh8fH+YPV/CTZ04sRi17Hx8f5g9f8IKDZ3uS0cQAwfCRolcvpl96obMiei+mX3qgsyLRe7o4A1pXewYHoE8K9XqgTwQK4JF6Hx8f5g9X8JNnTixGLXsfHx/mD1/wgoNne5LRxADB8JGiVy+mX3qhsyJ6L6ZfeqCzItF7ujgDWld7BgegTwr1eqBPBArgkXofHx/mD1fwk2dOLEYtex8fH+YPX/CCg2d7ktHEAMHwkaJXL6ZfeqGzInovpl96oLMi0Xu6OANaV3sGB6BPCvV6oE8ECuCReh8fH+YPV/CTZ04sRi17Hx8f5g9f8IKDZ3uS0cQAwfCRolcvpl96obMiei+mX3qgsyLRe7o4A1pXewYHoE8K9XqgTwQK4JF6Hx8f5g9X8JNnTixGLXsfHx/mD1/wgoNne5LRxADB8JGiVy+mX3qhsyJ6L6ZfeqCzItF7ujgDWld7BgegTwr1eqBPBArgkXofHx/mD1fwk2dOLEYtex8fH+YPX/CCg2d7ktHEAMHwkaJXL6ZfeqGzInovpl96oLMi0Xu6OANaV3sGB6BPCvV6oE8ECuCReh8fH+YPV/CTZ04sRi17Hx8f5g9f8IKDZ3uS0cQAwfCRolcvpl96obMiei+mX3qgsyIxDsrh+eEWwxgNIf3Er+oLyuoMyiwsLPCPPcjgj14sGrcqKPDGeeCT+g3Ktygm+gvKPP4DIAI+AeoLyiAH+gzKPOoMyvoMyl8WyvCT1nkSe8bH4JMqTypHKuUmxl+Hh4M8PG8qX1Z5h4eBPDxveE4sh4eARjw8bypmb3y6OAViV31rX3y4OAVgR31pT3q4OAVQR3tZT3iU4JR8h+CV5dXFr+CSzUpifeCS0eHVzUpi0eE+AeCSzUpi8JRfPniTZy5Hr8sdMAGEH8sdMAGEH8sdMAGEH8sdMAGEH8sdMAGEH8sdMAGEH8sdMAGEH8sdMAGEH8sdxkBnCA7KMQDC5fCVb8l7vTBVfZNPepRfkTAkV3nLPy88Rz5/kU3Fh09vJgBEKSkJAfdiCcHlJsLwkm94BoDJeUtfkVd5yz8vPEc+d5FNxYdPbyYARCkpCQH4ZwnB5SbC8JJveAaAyZVPepRfkTAkV3nLPy88Rz5/kU3Fh09vJgBEKSkJAalsCcHlJsLwkm94BoDJeUtfkVd5yz8vPEc+d5FNxYdPbyYARCkpCQGqcQnB5SbC8JJveAaAyYO4MAWTgnEsLA2DuDAFk4JxLCwNg7gwBZOCcSwsDYO4MAWTgnEsLA2DuDAFk4JxLCwNg7gwBZOCcSwsDYO4MAWTgnEsLA2DuDAFk4JxLCwNg7gwBZOCcSwsDYO4MAWTgnEsLA2DuDAFk4JxLCwNg7gwBZOCcSwsDYO4MAWTgnEsLA2DuDAFk4JxLCwNg7gwBZOCcSwsDYO4MAWTgnEsLA2DuDAFk4JxLCwNg7gwBZOCcSwsDYO4MAWTgnEsLA2DuDAFk4JxLCwNg7gwBZOCcSwsDYO4MAWTgnEsLA2DuDAFk4JxLCwNg7gwBZOCcSwsDYO4MAWTgnEsLA2DuDAFk4JxLCwNg7gwBZOCcSwsDYO4MAWTgnEsLA2DuDAFk4JxLCwNg7gwBZOCcSwsDYO4MAWTgnEsLA2DuDAFk4JxLCwNg7gwBZOCcSwsDYO4MAWTgnEsLA2DuDAFk4JxLCwNg7gwBZOCcSwsDYO4MAWTgnEsLA2DuDAFk4JxLCwNg7gwBZOCcSwsDYO4MAWTgnEsLA2DuDAFk4JxLCwNg7gwBZOCcSwsDYO4MAWTgnEsLA2DuDAFk4JxLCwNg7gwBZOCcSwsDYO4MAWTgnEsLA2DuDAFk4JxLCwNg7gwBZOCcSwsDYO4MAWTgnEsLA2DuDAFk4JxLCwNg7gwBZOCcSwsDYO4MAWTgnEsLA2DuDAFk4JxLCwNg7gwBZOCcSwsDYO4MAWTgnEsLA2DuDAFk4JxLCwNg7gwBZOCcSwsDYO4MAWTgnEsLA2DuDAFk4JxLCwNg7gwBZOCcSwsDYO4MAWTgnEsLA2DuDAFk4JxLCwNg7gwBZOCcSwsDYO4MAWTgnEsLA2DuDAFk4JxLCwNg7gwBZOCcSwsDYO4MAWTgnEsLA2DuDAFk4JxLCwNg7gwBZOCcSwsDYO4MAWTgnEsLA2DuDAFk4JxLCwNg7gwBZOCcSwsDYO4MAWTgnEsLA2DuDAFk4JxLCwNg7gwBZOCcSwsDYO4MAWTgnEsLA2DuDAFk4JxLCwNg7gwBZOCcSwsDYO4MAWTgnEsLA2DuDAFk4JxLCwNg7gwBZOCcSwsDYO4MAWTgnEsLA2DuDAFk4JxLCwNg7gwBZOCcSwsDYO4MAWTgnEsLA2DuDAFk4JxLCwNg7gwBZOCcSwsDYO4MAWTgnEsLA2DuDAFk4JxLCwNg7gwBZOCcSwsDYO4MAWTgnEsLA2DuDAFk4JxLCwNg7gwBZOCcSwsDYO4MAWTgnEsLA2DuDAFk4JxLCwNg7gwBZOCcSwsDYO4MAWTgnEsLA2DuDAFk4JxLCwNg7gwBZOCcSwsDYO4MAWTgnEsLA2DuDAFk4JxLCwNg7gwBZOCcSwsDYO4MAWTgnEsLA2DuDAFk4JxLCwNg7gwBZOCcSwsDYO4MAWTgnEsLA2DuDAFk4JxLCwNg7gwBZOCcSwsDYO4MAWTgnEsLA2DuDAFk4JxLCwNg7gwBZOCcSwsDYO4MAWTgnEsLA2DuDAFk4JxLCwNg7gwBZOCcSwsDYO4MAWTgnEsLA2DuDAFk4JxLCwNg7gwBZOCcSwsDYO4MAWTgnEsLA2DuDAFk4JxLCwNg7gwBZOCcSwsDYO4MAWTgnEsLA2DuDAFk4JxLCwNg7gwBZOCcSwsDYO4MAWTgnEsLA2DuDAFk4JxLCwNg7gwBZOCcSwsDYO4MAWTgnEsLA2DuDAFk4JxLCwNyXEsLIO4MAOTgg1xLCyDuDADk4INcSwsg7gwA5OCDXEsLIO4MAOTgg1xLCyDuDADk4INcSwsg7gwA5OCDXEsLIO4MAOTgg1xLCyDuDADk4INcSwsg7gwA5OCDXEsLIO4MAOTgg1xLCyDuDADk4INcSwsg7gwA5OCDXEsLIO4MAOTgg1xLCyDuDADk4INcSwsg7gwA5OCDXEsLIO4MAOTgg1xLCyDuDADk4INcSwsg7gwA5OCDXEsLIO4MAOTgg1xLCyDuDADk4INcSwsg7gwA5OCDXEsLIO4MAOTgg1xLCyDuDADk4INcSwsg7gwA5OCDXEsLIO4MAOTgg1xLCyDuDADk4INcSwsg7gwA5OCDXEsLIO4MAOTgg1xLCyDuDADk4INcSwsg7gwA5OCDXEsLIO4MAOTgg1xLCyDuDADk4INcSwsg7gwA5OCDXEsLIO4MAOTgg1xLCyDuDADk4INcSwsg7gwA5OCDXEsLIO4MAOTgg1xLCyDuDADk4INcSwsg7gwA5OCDXEsLIO4MAOTgg1xLCyDuDADk4INcSwsg7gwA5OCDXEsLIO4MAOTgg1xLCyDuDADk4INcSwsg7gwA5OCDXEsLIO4MAOTgg1xLCyDuDADk4INcSwsg7gwA5OCDXEsLIO4MAOTgg1xLCyDuDADk4INcSwsg7gwA5OCDXEsLIO4MAOTgg1xLCyDuDADk4INcSwsg7gwA5OCDXEsLIO4MAOTgg1xLCyDuDADk4INcSwsg7gwA5OCDXEsLIO4MAOTgg1xLCyDuDADk4INcSwsg7gwA5OCDXEsLIO4MAOTgg1xLCyDuDADk4INcSwsg7gwA5OCDXEsLIO4MAOTgg1xLCyDuDADk4INcSwsg7gwA5OCDXEsLIO4MAOTgg1xLCyDuDADk4INcSwsg7gwA5OCDXEsLIO4MAOTgg1xLCyDuDADk4INcSwsg7gwA5OCDXEsLIO4MAOTgg1xLCyDuDADk4INcSwsg7gwA5OCDXEsLIO4MAOTgg1xLCyDuDADk4INcSwsg7gwA5OCDXEsLIO4MAOTgg1xLCyDuDADk4INcSwsg7gwA5OCDXEsLIO4MAOTgg1xLCyDuDADk4INcSwsg7gwA5OCDXEsLIO4MAOTgg1xLCyDuDADk4INcSwsg7gwA5OCDXEsLIO4MAOTgg1xLCyDuDADk4INcSwsg7gwA5OCDXEsLIO4MAOTgg1xLCyDuDADk4INcSwsg7gwA5OCDXEsLIO4MAOTgg1xLCyDuDADk4INcSwsg7gwA5OCDXEsLIO4MAOTgg1xLCyDuDADk4INcSwsg7gwA5OCDXEsLIO4MAOTgg1xLCyDuDADk4INcSwsg7gwA5OCDXEsLIO4MAOTgg1xLCyDuDADk4INcSwsg7gwA5OCDXEsLIO4MAOTgg1xLCyDuDADk4INcSwsg7gwA5OCDXEsLIO4MAOTgg1xLCyDuDADk4INcSwsg7gwA5OCDXEsLIO4MAOTgg1xLCyDuDADk4INcSwsg7gwA5OCDXEsLIO4MAOTgg1xLCyDuDADk4INcSwsg7gwA5OCDXEsLIO4MAOTgg1xLCyDuDADk4INcSwsg7gwA5OCDcmDuDAFk4JxLCwMg7gwBZOCcSwsDIO4MAWTgnEsLAyDuDAFk4JxLCwMg7gwBZOCcSwsDIO4MAWTgnEsLAyDuDAFk4JxLCwMg7gwBZOCcSwsDIO4MAWTgnEsLAyDuDAFk4JxLCwMg7gwBZOCcSwsDIO4MAWTgnEsLAyDuDAFk4JxLCwMg7gwBZOCcSwsDIO4MAWTgnEsLAyDuDAFk4JxLCwMg7gwBZOCcSwsDIO4MAWTgnEsLAyDuDAFk4JxLCwMg7gwBZOCcSwsDIO4MAWTgnEsLAyDuDAFk4JxLCwMg7gwBZOCcSwsDIO4MAWTgnEsLAyDuDAFk4JxLCwMg7gwBZOCcSwsDIO4MAWTgnEsLAyDuDAFk4JxLCwMg7gwBZOCcSwsDIO4MAWTgnEsLAyDuDAFk4JxLCwMg7gwBZOCcSwsDIO4MAWTgnEsLAyDuDAFk4JxLCwMg7gwBZOCcSwsDIO4MAWTgnEsLAyDuDAFk4JxLCwMg7gwBZOCcSwsDIO4MAWTgnEsLAyDuDAFk4JxLCwMg7gwBZOCcSwsDIO4MAWTgnEsLAyDuDAFk4JxLCwMg7gwBZOCcSwsDIO4MAWTgnEsLAyDuDAFk4JxLCwMg7gwBZOCcSwsDIO4MAWTgnEsLAyDuDAFk4JxLCwMg7gwBZOCcSwsDIO4MAWTgnEsLAyDuDAFk4JxLCwMg7gwBZOCcSwsDIO4MAWTgnEsLAyDuDAFk4JxLCwMg7gwBZOCcSwsDIO4MAWTgnEsLAyDuDAFk4JxLCwMg7gwBZOCcSwsDIO4MAWTgnEsLAyDuDAFk4JxLCwMg7gwBZOCcSwsDIO4MAWTgnEsLAyDuDAFk4JxLCwMg7gwBZOCcSwsDIO4MAWTgnEsLAyDuDAFk4JxLCwMg7gwBZOCcSwsDIO4MAWTgnEsLAyDuDAFk4JxLCwMg7gwBZOCcSwsDIO4MAWTgnEsLAyDuDAFk4JxLCwMg7gwBZOCcSwsDIO4MAWTgnEsLAyDuDAFk4JxLCwMg7gwBZOCcSwsDIO4MAWTgnEsLAyDuDAFk4JxLCwMg7gwBZOCcSwsDIO4MAWTgnEsLAyDuDAFk4JxLCwMg7gwBZOCcSwsDIO4MAWTgnEsLAyDuDAFk4JxLCwMg7gwBZOCcSwsDIO4MAWTgnEsLAyDuDAFk4JxLCwMg7gwBZOCcSwsDIO4MAWTgnEsLAyDuDAFk4JxLCwMg7gwBZOCcSwsDIO4MAWTgnEsLAyDuDAFk4JxLCwMg7gwBZOCcSwsDIO4MAWTgnEsLAyDuDAFk4JxLCwMg7gwBZOCcSwsDIO4MAWTgnEsLAyDuDAFk4JxLCwMg7gwBZOCcSwsDIO4MAWTgnEsLAyDuDAFk4JxLCwMg7gwBZOCcSwsDIO4MAWTgnEsLAyDuDAFk4JxLCwMg7gwBZOCcSwsDIO4MAWTgnEsLAyDuDAFk4JxLCwMg7gwBZOCcSwsDIO4MAWTgnEsLAyDuDAFk4JxLCwMg7gwBZOCcSwsDIO4MAWTgnEsLAyDuDAFk4JxLCwMg7gwBZOCcSwsDIO4MAWTgnEsLAyDuDAFk4JxLCwMg7gwBZOCcSwsDIO4MAWTgnEsLAyDuDAFk4JxLCwMg7gwBZOCcSwsDIO4MAWTgnEsLAyDuDAFk4JxLCwMg7gwBZOCcSwsDIO4MAWTgnEsLAyDuDAFk4JxLCwMg7gwBZOCcSwsDMlxLCyDuDADk4IMcSwsg7gwA5OCDHEsLIO4MAOTggxxLCyDuDADk4IMcSwsg7gwA5OCDHEsLIO4MAOTggxxLCyDuDADk4IMcSwsg7gwA5OCDHEsLIO4MAOTggxxLCyDuDADk4IMcSwsg7gwA5OCDHEsLIO4MAOTggxxLCyDuDADk4IMcSwsg7gwA5OCDHEsLIO4MAOTggxxLCyDuDADk4IMcSwsg7gwA5OCDHEsLIO4MAOTggxxLCyDuDADk4IMcSwsg7gwA5OCDHEsLIO4MAOTggxxLCyDuDADk4IMcSwsg7gwA5OCDHEsLIO4MAOTggxxLCyDuDADk4IMcSwsg7gwA5OCDHEsLIO4MAOTggxxLCyDuDADk4IMcSwsg7gwA5OCDHEsLIO4MAOTggxxLCyDuDADk4IMcSwsg7gwA5OCDHEsLIO4MAOTggxxLCyDuDADk4IMcSwsg7gwA5OCDHEsLIO4MAOTggxxLCyDuDADk4IMcSwsg7gwA5OCDHEsLIO4MAOTggxxLCyDuDADk4IMcSwsg7gwA5OCDHEsLIO4MAOTggxxLCyDuDADk4IMcSwsg7gwA5OCDHEsLIO4MAOTggxxLCyDuDADk4IMcSwsg7gwA5OCDHEsLIO4MAOTggxxLCyDuDADk4IMcSwsg7gwA5OCDHEsLIO4MAOTggxxLCyDuDADk4IMcSwsg7gwA5OCDHEsLIO4MAOTggxxLCyDuDADk4IMcSwsg7gwA5OCDHEsLIO4MAOTggxxLCyDuDADk4IMcSwsg7gwA5OCDHEsLIO4MAOTggxxLCyDuDADk4IMcSwsg7gwA5OCDHEsLIO4MAOTggxxLCyDuDADk4IMcSwsg7gwA5OCDHEsLIO4MAOTggxxLCyDuDADk4IMcSwsg7gwA5OCDHEsLIO4MAOTggxxLCyDuDADk4IMcSwsg7gwA5OCDHEsLIO4MAOTggxxLCyDuDADk4IMcSwsg7gwA5OCDHEsLIO4MAOTggxxLCyDuDADk4IMcSwsg7gwA5OCDHEsLIO4MAOTggxxLCyDuDADk4IMcSwsg7gwA5OCDHEsLIO4MAOTggxxLCyDuDADk4IMcSwsg7gwA5OCDHEsLIO4MAOTggxxLCyDuDADk4IMcSwsg7gwA5OCDHEsLIO4MAOTggxxLCyDuDADk4IMcSwsg7gwA5OCDHEsLIO4MAOTggxxLCyDuDADk4IMcSwsg7gwA5OCDHEsLIO4MAOTggxxLCyDuDADk4IMcSwsg7gwA5OCDHEsLIO4MAOTggxxLCyDuDADk4IMcSwsg7gwA5OCDHEsLIO4MAOTggxxLCyDuDADk4IMcSwsg7gwA5OCDHEsLIO4MAOTggxxLCyDuDADk4IMcSwsg7gwA5OCDHEsLIO4MAOTggxxLCyDuDADk4IMcSwsg7gwA5OCDHEsLIO4MAOTggxxLCyDuDADk4IMcSwsg7gwA5OCDHEsLIO4MAOTggxxLCyDuDADk4IMcSwsg7gwA5OCDHEsLIO4MAOTggxxLCyDuDADk4IMcSwsg7gwA5OCDHEsLIO4MAOTggxxLCyDuDADk4IMcSwsg7gwA5OCDHEsLIO4MAOTggzJxg+Hh+oawXovpl96obMiei+mX3qgszIkeRgAInAtJCJwLSQicC0kInAtJCJwLSQicC0kInAtJCJwLSQicC0kInAtJCJwLSQicC0kInAtJCJwLSQW/8n///////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////+qqlVVqqpVVaqqVVWqqlVVqqpVVaqqVVWqqlVVqqpVVaqqVVWqqlVVqqpVVaqqVVWqqlVVqqpVVaqqVVWqqlVVqqpVVaqqVVWqqlVVqqpVVaqqVVWqqlVVqqpVVaqqVVWqqlVVqqpVVaqqVVWqqlVVqqpVVaqqVVWqqlVVqqpVVaqqVVWqqlVVqqpVVaqqVVWqqlVVqqpVVaqqVVWqqlVVqqpVVaqqVVWqqlVVqqpVVaqqVVWqqlVVqqpVVaqqVVWqqlVVqqpVVaqqVVWqqlVVqqpVVaqqVVWqqlVVqqpVVaqqVVWqqlVVqqpVVaqqVVWqqlVVqqpVVaqqVVWqqlVVACEzDDPAABIAEjPAMwwAIQAhMwwzwAASABIzwDMMACEAITMMM8AAEgASM8AzDAAhACEzDDPAABIAEjPAMwwAIQAhMwwzwAASABIzwDMMACEAITMMM8AAEgASM8AzDAAhACEzDDPAABIAEjPAMwwAIQAhMwwzwAASABIzwDMMACEAITMMM8AAEgASM8AzDAAhACEzDDPAABIAEjPAMwwAIQAhMwwzwAASABIzwDMMACEAITMMM8AAEgASM8AzDAAhACEzDDPAABIAEjPAMwwAIQAhMwwzwAASABIzwDMMACEAITMMM8AAEgASM8AzDAAhACEzDDPAABIAEjPAMwwAIQj8GH4y/WT7wO+B50CzINkI/Bh+Mv1k+8DvgedAsyDZCPwYfjL9ZPvA74HnQLMg2Qj8GH4y/WT7wO+B50CzINkI/Bh+Mv1k+8DvgedAsyDZCPwYfjL9ZPvA74HnQLMg2Qj8GH4y/WT7wO+B50CzINkI/Bh+Mv1k+8DvgedAsyDZCPwYfjL9ZPvA74HnQLMg2Qj8GH4y/WT7wO+B50CzINkI/Bh+Mv1k+8DvgedAsyDZCPwYfjL9ZPvA74HnQLMg2Qj8GH4y/WT7wO+B50CzINkI/Bh+Mv1k+8DvgedAsyDZCPwYfjL9ZPvA74HnQLMg2Qj8GH4y/WT7wO+B50CzINnMzMzMMzMzM8zMzMwzMzMzzMzMzDMzMzPMzMzMMzMzM8zMzMwzMzMzzMzMzDMzMzPMzMzMMzMzM8zMzMwzMzMzzMzMzDMzMzPMzMzMMzMzM8zMzMwzMzMzzMzMzDMzMzPMzMzMMzMzM8zMzMwzMzMzzMzMzDMzMzPMzMzMMzMzM8zMzMwzMzMzzMzMzDMzMzPMzMzMMzMzM8zMzMwzMzMzzMzMzDMzMzPMzMzMMzMzM8zMzMwzMzMzzMzMzDMzMzPMzMzMMzMzM8zMzMwzMzMzzMzMzDMzMzPMzMzMMzMzM8zMzMwzMzMzzMzMzDMzMzPMzMzMMzMzM8zMzMwzMzMzwMDAwAwMDAzAwMDADAwMDMDAwMAMDAwMwMDAwAwMDAzAwMDADAwMDMDAwMAMDAwMwMDAwAwMDAzAwMDADAwMDMDAwMAMDAwMwMDAwAwMDAzAwMDADAwMDMDAwMAMDAwMwMDAwAwMDAzAwMDADAwMDMDAwMAMDAwMwMDAwAwMDAzAwMDADAwMDMDAwMAMDAwMwMDAwAwMDAzAwMDADAwMDMDAwMAMDAwMwMDAwAwMDAzAwMDADAwMDMDAwMAMDAwMwMDAwAwMDAzAwMDADAwMDMDAwMAMDAwMwMDAwAwMDAzAwMDADAwMDMDAwMAMDAwMwMDAwAwMDAzAwMDADAwMDPHxAQEBAQEBHx8QEBAQEBDx8QEBAQEBAR8fEBAQEBAQ8fEBAQEBAQEfHxAQEBAQEPHxAQEBAQEBHx8QEBAQEBDx8QEBAQEBAR8fEBAQEBAQ8fEBAQEBAQEfHxAQEBAQEPHxAQEBAQEBHx8QEBAQEBDx8QEBAQEBAR8fEBAQEBAQ8fEBAQEBAQEfHxAQEBAQEPHxAQEBAQEBHx8QEBAQEBDx8QEBAQEBAR8fEBAQEBAQ8fEBAQEBAQEfHxAQEBAQEPHxAQEBAQEBHx8QEBAQEBDx8QEBAQEBAR8fEBAQEBAQ8fEBAQEBAQEfHxAQEBAQEPHxAQEBAQEBHx8QEBAQEBCqqlVVqqpVVaqqVVWqqlVVqqpVVaqqVVWqqlVVqqpVVaqqVVWqqlVVqqpVVaqqVVWqqlVVqqpVVaqqVVWqqlVVqqpVVaqqVVWqqlVVqqpVVaqqVVWqqlVVqqpVVaqqVVWqqlVVqqpVVaqqVVWqqlVVqqpVVaqqVVWqqlVVqqpVVaqqVVWqqlVVqqpVVaqqVVWqqlVVqqpVVaqqVVWqqlVVqqpVVaqqVVWqqlVVqqpVVaqqVVWqqlVVqqpVVaqqVVWqqlVVqqpVVaqqVVWqqlVVqqpVVaqqVVWqqlVVqqpVVaqqVVWqqlVVqqpVVaqqVVWqqlVVqqpVVaqqVVWqqlUC4XIscAl7InAJInAJInAJInAJInAJInAJInAJInAJInAJInAJInAJInAJInAJInAJInAJLCwly2XIJGjJycnJyeEicAlyLHAJeyJwCSJwCSJwCSJwCSJwCSJwCSJwCSJwCSJwCSJwCSJwCSJwCSJwCSJwCSwsJctlyCRoycnJycnhInAJInAJcixwCXsicAkicAkicAkicAkicAkicAkicAkicAkicAkicAkicAkicAkicAksLCXLZcgkaMnJycnJ4SJwCSJwCSJwCXIscAl7InAJInAJInAJInAJInAJInAJInAJInAJInAJInAJInAJInAJLCwly2XIJGjJycnJyeEicAkicAkicAkicAlyLHAJeyJwCSJwCSJwCSJwCSJwCSJwCSJwCSJwCSJwCSJwCSJwCSwsJctlyCRoycnJycnhInAJInAJInAJInAJInAJcixwCXsicAkicAkicAkicAkicAkicAkicAkicAkicAkicAksLCXLZcgkaMnJycnJ4SJwCSJwCSJwCSJwCSJwCSJwCXIscAl7InAJInAJInAJInAJInAJInAJInAJInAJInAJLCwly2XIJGjJycnJyeEicAkicAkicAkicAkicAkicAkicAlyLHAJeyJwCSJwCSJwCSJwCSJwCSJwCSJwCSJwCSwsJctlyCRoycnJycnhInAJInAJInAJInAJInAJInAJInAJInAJcixwCXsicAkicAkicAkicAkicAkicAkicAksLCXLZcgkaMnJycnJ4SJwCSJwCSJwCSJwCSJwCSJwCSJwCSJwCSJwCXIscAl7InAJInAJInAJInAJInAJInAJLCwly2XIJGjJycnJyeEicAkicAkicAkicAkicAkicAkicAkicAkicAkicAlyLHAJeyJwCSJwCSJwCSJwCSJwCSwsJctlyCRoycnJycnhInAJInAJInAJInAJInAJInAJInAJInAJInAJInAJInAJcixwCXsicAkicAkicAkicAksLCXLZcgkaMnJycnJ4SJwCSJwCSJwCSJwCSJwCSJwCSJwCSJwCSJwCSJwCSJwCSJwCXIscAl7InAJInAJInAJLCwly2XIJGjJycnJyeEicAkicAkicAkicAkicAkicAkicAkicAkicAkicAkicAkicAkicAlyLHAJeyJwCSJwCSwsJctlyCRoycnJycnhInAJInAJInAJInAJInAJInAJInAJInAJInAJInAJInAJInAJInAJInAJcixwCXsicAksLCXLZcgkaMnJycnJ4SJwCSJwCSJwCSJwCSJwCSJwCSJwCSJwCSJwCSJwCSJwCSJwCSJwCSJwCSJwCXIscAl7LCwly2XIJGjJycnJydE+t5LI4IXmB8RSRPCFHx8focjlzTJE4XkicCwicCwicCwicCwicCwicCwicCwicCzJ+ABUXWhHeZAfyx1nATNZCfCCMQCv/qAoAzEAvwH/AOlHPgeQVF1HDjOvyxkwAYAfyxkwAYAfyxkwAYAfyxkwAYAfyxkwAYAfyxkwAYAfyxkwAYAfyxkwAYAfyxlHIbRXCeViaz7/AQ8Ayfoay2/6G8uFZ/4UIAU+/y0YBtbsIAU8LOoby3zqGsvNr2AhlEbNyhDwpMagV/Cjxn9f1SGXRs3KEPCkxqBn8KPGf2/RzTEcKAsf2hhZH9oYWcPERny6OAViV31rX+XNmkbh1Xu90sxFe9ZA4Ih9k0884Il6lF/ghjzgij2RMGvgh3nLPy88g+CF8IIBDwBvVHzWQBfLN6GFZ3rmBxdvGAjwij3KAETgivCJX/CGV/CFGASCHSgLy38g+Ffwh4LghR3NYkUY2nvgifCIg1/l5gf2CG8mB1Z7aB8fHx/LHR/LHeYDxkBnrx7/6XnghpPgh3vLPy88geCF8IIBDwBvVHzWQBfLN6GFZ3rmBxdv8Ilf8IZX8IXLfyAHV/CHgh0YAYLghc1iRfCKPcoAROCKGN171kDgiHuVTzzgiXqUX+CGPOCKPZEwa+CHecs/LzyD4IXwggEPAG9UfNZAF8s3oYVneuYHF28YCPCKPcoAROCK8Ilf8IZX8IUYBIIdKAvLfyD4V/CHguCFHc0qRhjae+CJ8IiTX+XmB/YQbyYHVntoHx8fH8sdH8sd5gPGQGc+/1jpeeCGk+CHe8s/LzyB4IXwggEPAG9UfNZAF8s3oYVneuYHF2/wiV/whlfwhct/IAdX8IeCHRgBguCFzSpG8Io9ygBE4IoY3UYAALoAAHzWQMhPHx8f5h9HeeYHKAsE/gUwBvUhylblBT4PkCHJRoRn5fCCZ69vyfCCZ69vIiIiIiIiIiIiIiIiIiIiIiIiIiIiIiIiIiIiIiIiIiIiIiIiIiIiIiIiIiIiIiIiIiIiIiIiIiIiIiIiIiIiIiIiIiIiIiIiIiIiIiIiIiIiIiIiIiIiIiIiIiIiIiIiIiIiIiIiIiIiIiIiIiIiIiIiIiIiIiIiIiIiIiIiIiIiIiIiIiIiIiIiIiIiIiIiIiIiIiIiIiIiIiIiIiIiIiIiIiIiIiIiIiIiIiIiIiIiIiIiIiIiIiIiIiIiIiIiIiIiIiIiIiIiIiIiIiIiIiIiIiIiIiIiIiIiIiIiIiIiIiIiIiIiIiIiIiIiIiIiIiIiIiIiIiIiIiIiIiIiIiIiIiIiIiIiIiIiIiIiIiIiIiIiIiIiIiIiIiIiIiIiIiIiIiIiIiIiIiIiIiIiIiIiIiIiIiIiIiIiIiIiIiIiIiIiIiIiIiIiIiIiIiIiIiIiIiIiIiIiIiIiIiIiIiIiIiIiIiIiIiIiIiIiIiIiIiIiIiIiIiIiIiIiIiIiIiIiIiIiIiIiIiIiIiIiIiIiIiIiIiIiIiIiIiIiIiIiIiIiIiIiIiIiIiIiIiIiIiIiIiIiIiIiIiIiIiIiIiIiIiIiIiIiIiIiIiIiIiIiIiIiIiIiIiIiIiIiIiIiIiIiIiIiIiIiIiIiIiIiIiIiIiIiIiIiIiIiIiIiIiIiIiIiIiIiIiIiIiIiIiIiIiIiIiIiIiIiIiIiIiIiIiIiIiIiIiIiIiIiIiIiIiIiIiIiIiIiIiIiIiIiIiIiIiIiIiIiIiIiIiIiIiIiIiIiIiIiIiIiIiIiIiIiIiIiIiIiIiIiIiIiIiIiIiIiIiIiIiIiIiIiIiIiIiIiIiIiIiIiIiIiIiIiIiIiIiIiIiIiIiIiIiIiIiIiIiIiIiIiIiIiIiIiIiIiIiIiIiIiIiIiIiIiIiIiIiIiIiIiIiIiIiIiIiIiIiIiIiIiIiIiIiIiIiIiIiIiIiIiIiIiIiIiIiIiIiIiIiIiIiIiIiIiIiIiIiIiIiIiIiIiIiIiIiIiIiIiIiIiIiIiIiIiIiIiIiIiIiIiIiIiIiIiIiIiIiIiIiIiIiIiIiIiIiIiIiIiIiIiIiIiIiIiIiIiIiIiIiIiIiIiIiIiIiIiIiIiIiIiIiIiIiIiIiIiIiIiIiIiIiIiIiIiIiIiIiIiIiIiIiIiIiIiIiIiIiIiIiIiIiIiIiIiIiIiIiIiIiIiIiIiIiIiIiIiIiIiIiIiIiIiIiIiIiIiIiIiIiIiIiIiIiIiIiIiIiIiIiIiIiIiIiIiIiIiIiIiIiIiIiIiIiIiIiIiIiIiIiIiIiIiIiIiIiIiIiIiIiIiIiIiIiIiIiIiIiIiIiIiIiIiIiIiIiIiIiIiIiIiIiIiIiIiIiIiIiIiIiIiIiIiIiIiIiIiIiIiIiIiIiIiIiIiIiIiIiIiIiIiIiIiIiIiIiIiIiIiIiIiIiIiIiIiIiIiIiIiIiIiIiIiIiIiIiIiIiIiIiIiIiIiIiIiIiIiIiIiIiIiIiIiIiIiIiIiIiIiIiIiIiIiIiIiIiIiIiIiIiIiIiIiIiIiIiIiIiIiIiIiIiIiIiIiIiIiIiIiIiIiIiIiIiIiIiIiIiIiIiIiIiIiIiIiIiIiIiIiIiIiIiIiIiIiIiIiIiIiIiIiIiIiIiIiIiIiIiIiIiIiIiIiIiIiIiIiIiIiIiIiIiIiIiIiIiIiIiIiIiIiIiIiIiIiIiIiIiIiIiIiIiIiIiIiIiIiIiIiIiIiIiIiIiIiIiIiIiIiIiIiIiIiIiIiIiIiIiIiIiIiIiIiIiIiIiIiIiIiIiIiIiIiIiIiIiIiIiIiIiIiIiIiIiIiIiIiIiIiIiIiIiIiIiIiIiIiIiIiIiIiIiIiIiIiIiIiIiIiIiIiIiIiIiIiIiIiIiIiIiIiIiIiIiIiIiIiIiIiIiIiIiIiIiIiIiIiIiIiIiIiIiIiIiIiIiIiIiIiIiIiIiIiIiIiIiIiIiIiIiIiIiIiIiIiIiIiIiIiIiIiIiIiIiIiIiIiIiIiIiIiIiIiIiIiIiIiIiIiIiIiIiIiIiIiIiIiIiIiIiIiIiIiIiIiIiIiIiIiIiIiIiIiIiIiIiIiIiIiIiIiIiIiIiIiIiIiIiIiIiIiIiIiIiIiIiIiIiIiIiIiIiIiIiIiIiIiIiIiIiIiIiIiIiIiIiIiIiIiIiIiIiIiIiIiIiIiIiIiIiIiIiIiIiIiIiIiIiIiIiIiIiIiIiIiIiIiIiIiIiIiIiIiIiIiIiIiIiIiIiIiIiIiIiIiIiIiIiIiIiIiIiIiIiIiIiIiIiIiIiIiIiIiIiIiIiIiIiIiIiIiIiIiIiIiIiIiIiIiIiIiIiIiIiIiIiIiIiIiIiIiIiIiIiIiIiIiIiIiIiIiIiIiIiIiIiIiIiIiIiIiIiIiIiIiIiIiIiIiIiIiIiIiIiIiIiIiIiIiIiIiIiIiIiIiIiIiIiIiIiIiIiIiIiIiIiIiIiIiIiIiIiIiIiIiIiIiIiIiIiIiIiIiIiIiIiIiIiIiIiIiIiIiIiIiIiIiIiIiIiIiIiIiIiIiIiIiIiIiIiIiIiIiIiIiIiIiIiIiIiIiIiIiIiIiIiIiIiIiIiIiIiIiIiIiIiIiIiIiIiIiIiIiIiIiIiIiIiIiIiIiIiIiIiIiIiIiIiIiIiIiIiIiIiIiIiIiIiIiIiIiIiIiIiIiIiIiIiIiIiIiIiIiIiIiIiIiIiIiIiIiIiIiIiIiIiIiIiIiIiIiIiIiIiIiIiIiIiIiIiIiIiIiIiIiIiIiIiIiIiIiIiIiIiIiIiIiIiIiIiIiIiIiIiIiIiIiIiIiIiIiIiIiIiIiIiIiIiIiIiIiIiIiIiIiIiIiIiIiIiIiIiIiIiIiIiIiIiIiIiIiIiIiIiIiIiIiIiIiIiIiIiIiIiIiIiIiIiIiIiIiIiIiIiIiIiIiIiIiIiIiIiIiIiIiIiIiIiIiIiIiIiIiIiIiIiIiIiIiIiIiIiIiIiIiIiIiIiIiIiIiIiIiIiIiIiIiIiIiIiIiIiIiIiIiIiIiIiIiIiIiIiIiIiIiIiIiIiIiIiIiIiIiIiIiIiIiIiIiIiIiIiIiIiIiIiIiIiIiIiIiIiIiIiIiIiIiIiIiIiIiIiIiIiIiIiIiIiIiIiIiIiIiIiIiIiIiIiIiIiIiIiIiIiIiIiIiIiIiIiIiIiIiIiIiIiIiIiIiIiIiIiIiIiIiIiIiIiIiIiIiIiIiIiIiIiIiIiIiIiIiIiIiIiIiIiIiIiIiIiIiIiIiIiIiIiIiIiIiIiIiIiIiIiIiIiIiIiIiIiIiIiIiIiIiIiIiIiIiIiIiIiIiIiIiIiIiIiIiIiIiIiIiIiIiIiIiIiIiIiIiIiIiIiIiIiIiIiIiIiIiIiIiIiIiIiIiIiIiIiIiIiIiIiIiIiIiIiIiIiIiIiIiIiIiIiIiIiIiIiIiIiIiIiIiIiIiIiIiIiIiIiIiIiIiIiIiIiIiIiIiIiIiIiIiIiIiIiIiIiIiIiIiIiIiIiIiIiIiIiIiIiIiIiIiIiIiIiIiIiIiIiIiIiIiIiIiIiIiIiIiIiIiIiIiIiIiIiIiIiIiIiIiIiIiIiIiIiIiIiIiIiIiIiIiIiIiIiIiIiIiIiIiIiIiIiIiIiIiIiIiIiIiIiIiIiIiIiIiIiIiIiIiIiIiIiIiIiIiIiIiIiIiIiIiIiIiIiIiIiIiIiIiIiIiIiIiIiIiIiIiIiIiIiIiIiIiIiIiIiIiIiIiIiIiIiIiIiIiIiIiIiIiIiIiIiIiIiIiIiIiIiIiIiIiIiIiIiIiIiIiIiIiIiIiIiIiIiIiIiIiIiIiIiIiIiIiIiIiIiIiIiIiIiIiIiIiIiIiIiIiIiIiIiIiIiIiIiIiIiIiIiIiIiIiIiIiIiIiIiIiIiIiIiIiIiIiIiIiIiIiIiIiIiIiIiIiIiIiIiIiIiIiIiIiIiIiIiIiIiIiIiIiIiIiIiIiIiIiIiIiIiIiIiIiIiIiIiIiIiIiIiIiIiIiIiIiIiIiIiIiIiIiIiIiIiIiIiIiIiIiIiIiIiIiIiIiIiIiIiIiIiIiIiIiIiIiIiIiIiIiIiIiIiIiIiIiIiIiIiIiIiIiIiIiIiIiIiIiIiIiIiIiIiIiIiIiIiIiIiIiIiIiIiIiIiIiIiIiIiIiIiIiIiIiIiIiIiIiIiIiIiIiIiIiIiIiIiIiIiIiIiIiIiIiIiIiIiIiIiIiIiIiIiIiIiIiIiIiIiIiIiIiIiIiIiIiIiIiIiIiIiIiIiIiIiIiIiIiIiIiIiIiIiIiIiIiIiIiIiIiIiIiIiIiIiIiIiIiIiIiIiIiIiIiIiIiIiIiIiIiIiIiIiIiIiIiIiIiIiIiIiIiIiIiIiIiIiIiIiIiIiIiIiIiIiIiIiIiIiIiIiIiIiIiIiIiIiIiIiIiIiIiIiIiIiIiIiIiIiIiIiIiIiIiIiIiIiIiIiIiIiIiIiIiIiIiIiIiIiIiIiIiIiIiIiIiIiIiIiIiIiIiIiIiIiIiIiIiIiIiIiIiIiIiIiIiIiIiIiIiIiIiIiIiIiIiIiIiIiIiIiIiIiIiIiIiIiIiIiIiIiIiIiIiIiIiIiIiIiIiIiIiIiIiIiIiIiIiIiIiIiIiIiIiIiIiIiIiIiIiIiIiIiIiIiIiIiIiIiIiIiIiIiIiIiIiIiIiIiIiIiIiIiIiIiIiIiIiIiIiIiIiIiIiIiIiIiIiIiIiIiIiIiIiIiIiIiIiIiIiIiIiIiIiIiIiIiIiIiIiIiIiIiIiIiIiIiIiIiIiIiIiIiIiIiIiIiIiIiIiIiIiIiIiIiIiIiIiIiIiIiIiIiIiIiIiIiIiIiIiIiIiIiIiIiIiIiIiIiIiIiIiIiIiIiIiIiIiIiIiIiIiIiIiIiIiIiIiIiIiIiIiIiIiIiIiIiIiIiIiIiIiIiIiIiIiIiIiIiIiIiIiIiIiIiIiIiIiIiIiIiIiIiIiIiIiIiIiIiIiIiIiIiIiIiIiIiIiIiIiIiIiIiIiIiIiIiIiIiIiIiIiIiIiIiIiIiIiIiIiIiIiIiIiIiIiIiIiIiIiIiIiIiIiIiIiIiIiIiIiIiIiIiIiIiIiIiIiIiIiIiIiIiIiIiIiIiIiIiIiIiIiIiIiIiIiIiIiIiIiIiIiIiIiIiIiIiIiIiIiIiIiIiIiIiIiIiIiIiIiIiIiIiIiIiIiIiIiIiIiIiIiIiIiIiIiIiIiIiIiIiIiIiIiIiIiIiIiIiIiIiIiIiIiIiIiIiIiIiIiIiIiIiIiIiIiIiIiIiIiIiIiIiIiIiIiIiIiIiIiIiIiIiIiIiIiIiIiIiIiIiIiIiIiIiIiIiIiIiIiIiIiIiIiIiIiIiIiIiIiIiIiIiIiIiIiIiIiIiIiIiIiIiIiIiIiIiIiIiIiIiIiIiIiIiIiIiIiIiIiIiIiIiIiIiIiIiIiIiIiIsnxAQ8APcqEVz0odj0oOj0idwkidwkidwkidwkidwkidwkidwkidwkidwkidwkidwkidwkidwkidwkidwkidwksLCXLZSgCJGgidwkidwkidwkidwkidwkidwkidwkidwkidwkidwkidwkidwkidwkidwkidwkidwksLCXLZSgCJGgidwkidwkidwkidwkidwkidwkidwkidwkidwkidwkidwkidwkidwkidwkidwkidwksLCXLZSgCJGgidwkidwkidwkidwkidwkidwkidwkidwkidwkidwkidwkidwkidwkidwkidwkid8kicAkicAkicAkicAkicAkicAkicAkicAkicAkicAkicAkicAkicAkicAkicAkicAksLCUicAkicAkicAkicAkicAkicAkicAkicAkicAkicAkicAkicAkicAkicAkicAkicAksLCUicAkicAkicAkicAkicAkicAkicAkicAkicAkicAkicAkicAkicAkicAkicAkicAksLCUicAkicAkicAkicAkicAkicAkicAkicAkicAkicAkicAkicAkicAkicAkicAkicAksLCUicAkicAkicAkicAkicAkicAkicAkicAkicAkicAkicAkicAkicAkicAkicAkicAksLCUicAkicAkicAkicAkicAkicAkicAkicAkicAkicAkicAkicAkicAkicAkicAkicAksLCUicAkicAkicAkicAkicAkicAkicAkicAkicAkicAkicAkicAkicAkicAkicAkicAloyfgAVF3wgjEAr/6gKAMxAL8B/wDFxcXFxcXFxcXFxcXFxcXFxcXFxcXFxcXFxcXFxcXFxcXFxcXFxcXFxcXFxcXFxcXFxcXFxcXFxcXFxcXFxcXFxcXFxcXFxcXFxcXFxcXFxcXFxcXFxcXFxcXFxcXFxcXFxcXFxcXFxcXFxcXFxcXFxcXFxcXFxcXFxcXFxcXFxcXFxcXFxcXFxcXFxcXFxcXFxcXFxcXFxcXFxcXFxcXFxcXFxcXFxcXFxcXFxcXFxcXFxcXFxcXFxcXFxcXFxcXFxcXFxcXFxcXFxcXFxcXFxcXFxcXFxcXFxcXFxcXFxcXFxcXFxcXFxcXFxcXFxcXFxcXFxcXFxcXFxcXFxcXFxcXFxcXFxcXFxcXFxcXFxcXFxcXFxcXFxcXFxcXFxcXFxcXFxcXFxcXFxcXFxcXFxcXFxcXFxcXFxcXFxcXFxcXFxcXFxcXFxcXFxcXFxcXFxcXFxcXFxcXFxcXFxcXFxcXFxcXFxcXFxcXFxcXFxcXFxcXFxcXFxcXFxcXFxcXFxcXFxcXFxcXFxcXFxcXFxcXFxcXFxcXFxcXFxcXFxcXFxcXFxcXFxcXFxcXFxcXFxcXFxcXFxcXFxcXFxcXFxcXFxcXFxcXFxcXFxcXFxcXFxcXFxcXFxcXFxcXFxcXFxcXFxcXFxcXFxcXFxcXFxcXFxcXFxcXFxcXFxcXFxcXFxcXFxcXFxcXFxcXFxcXFxcXFxcXFxcXFxcXFxcXFxcXFxcXFxcXFxcXFxcXFxcXFxcXFxcXFxcXFxcXFxcXFxcXFxcXFxcXFxcXFxcXFxcXFxcXFxcXFxcXFxcXFxcXFxcXFxcXFxcXFxcXFxcXFxcXFxcXFxcXFxcXFxcXFxcXFxcXFxcXFxcXFxcXFxcXFxcXFxcXFxcXFxcXFxcXFxcXFxcXFxcXFxcXFxcXFxcXFxcXFxcXFxcXFxcXFxcXFxcXFxcXFxcXFxcXFxcXFxcXFxcXFxcXFxcXFxcXFxcXFxcXFxcXFxcXFxcXFxcXFxcXFxcXFxcXFxcXFxcXFxcXFxcXFxcXFxcXFxcXFxcXFxcXFxcXFxcXFxcXFxcXFxcXFxcXFxcXFxcXFxcXFxcXFxcXFxcXFxcXFxcXFxcXFxcXFxcXFxcXFxcXFxcXFxcXFxcXFxcXFxcXFxcXFxcXFxcXFxcXFxcXFxcXFxcXFxcXFxcXFxcXFxcXFxcXFxcXFxcXFxcXFxcXFxcXFxcXFxcXFxcXFxcXFxcXFxcXFxcXFxcXFxcXFxcXFxcXFxcXFxcXFxcXFxcXFxcXFxcXFxcXFxcXFxcXFxcXFxcXFxcXFxcXFxcXFxcXFxcXFxcXFxcXFxcXFxcXFxcXFxcXFxcXFxcXFxcXFxcXFxcXFxcXFxcXFxcXFxcXFxcXFxcXFxcXFxcXFxcXFxcXFxcXFxcXFxcXFxcXFxcXFxcXFxcXFxcXFxcXFxcXFxcXFxcXFxcXFxcXFxcXFxcXFxcXFxcXFxcXFxcXFxcXFxcXFxcXFxcXFxcXFxcXFxcXFxcXFxcXFxcXFxcXFxcXFxcXFxcXFxcXFxcXFxcXFxcXFxcXFxcXFxcXFxcXFxcXFxcXFxcXFxcXFxcXFxcXFxcXFxcXFxcXFxcXFxcXFxcXFxcXFxcXFxcXFxcXFxcXFxcXFxcXFxcXFxcXFxcXFxcXFxcXFxcXFxcXFxcXFxcXFxcXFxcXFxcXFxcXFxcXFxcXFxcXFxcXFxcXFxcXFxcXFxcXFxcXFxcXFxcXFxcXFxcXFxcXFxcXFxcXFxcXFxcXFxcXFxcXFxcXFxcXFxcXFxcXFxcXFxcXFxcXFxcXFxcXFxcXFxcXFxcXFxcXFxcXFxcXFxcXFxcXFxcXFxcXFxcXFxcXFxcXFxcXFxcXFxcXFxcXFxcXFxcXFxcXFxcXFxcXFxcXFxcXFxcXFxcXFxcXFxcXFxcXFxcXFxcXFxcXFxcXFxcXFxcXFxcXFxcXFxcXFxcXFxcXFxcXFxcXFxcXFxcXFxcXFxcXFxcXFxcXFxcXFxcXFxcXFxcXFxcXFxcXFxcXFxcXFxcXFxcXFxcXFxcXFxcXFxcXFxcXFxcXFxcXFxcXFxcXFxcXFxcXFxcXFxcXFxcXFxcXFxcXFxcXFxcXFxcXFxcXFxcXFxcXFxcXFxcXFxcXFxcXFxcXFxcXFxcXFxcXFxcXFxcXFxcXFxcXFxcXFxcXFxcXFxcXFxcXFxcXFxcXFxcXFxcXFxcXFxcXFxcXFxcXFxcXFxcXFxcXFxcXFxcXFxcXFxcXFxcXFxcXFxcXFxcXFxcXFxcXFxcXFxcXFxcXFxcXFxcXFxcXFxcXFxcXFxcXFxcXFxcXFxcXFxcXFxcXFxcXFxcXFxcXFxcXFxcXFxcXFxcXFxcXFxcXFxcXFxcXFxcXFxcXFxcXFxcXFxcXFxcXFxcXFxcXFxcXFxcXFxcXFxcXFxcXFxcXFxcXFxcXFxcXFxcXFxcXFxcXFxcXFxcXFxcXFxcXFxcXFxcXFxcXFxcXFxcXFxcXFxcXFxcXFxcXFxcXFxcXFxcXFxcXFxcXFxcXFxcXFxcXFxcVia/nJJgJ+4JovPOCYfcZAb37gl+Cbr+CZ4JzgneCePkDgn8n/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////Aw==";
