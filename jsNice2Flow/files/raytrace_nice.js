var RayTrace = new BenchmarkSuite("RayTrace", [739989], [new Benchmark("RayTrace", true, false, 600, renderScene)]);
var checkNumber;
var Class = {
    /**
     * @return {?}
     */
    create : function() {
        return function() {
            this.initialize.apply(this, arguments);
        };
    }
};
/**
 * @param {?} a
 * @param {?} b
 * @return {?}
 */
Object.extend = function(a, b) {
    var prop;
    for (prop in b) {
        a[prop] = b[prop];
    }
    return a;
};
if (typeof Flog == "undefined") {
    var Flog = {}
}
if (typeof Flog.RayTracer == "undefined") {
    Flog.RayTracer = {};
}
Flog.RayTracer.Color = Class.create();
Flog.RayTracer.Color.prototype = {
    red : 0,
    green : 0,
    blue : 0,
    /**
     * @param {number} r
     * @param {number} g
     * @param {number} b
     * @return {undefined}
     */
    initialize : function(r, g, b) {
        if (!r) {
            /** @type {number} */
            r = 0;
        }
        if (!g) {
            /** @type {number} */
            g = 0;
        }
        if (!b) {
            /** @type {number} */
            b = 0;
        }
        /** @type {number} */
        this.red = r;
        /** @type {number} */
        this.green = g;
        /** @type {number} */
        this.blue = b;
    },
    /**
     * @param {string} c1
     * @param {string} c2
     * @return {?}
     */
    add : function(c1, c2) {
        var result = new Flog.RayTracer.Color(0, 0, 0);
        result.red = c1.red + c2.red;
        result.green = c1.green + c2.green;
        result.blue = c1.blue + c2.blue;
        return result;
    },
    /**
     * @param {string} c1
     * @param {?} s
     * @return {?}
     */
    addScalar : function(c1, s) {
        var result = new Flog.RayTracer.Color(0, 0, 0);
        result.red = c1.red + s;
        result.green = c1.green + s;
        result.blue = c1.blue + s;
        result.limit();
        return result;
    },
    /**
     * @param {?} c1
     * @param {?} c2
     * @return {?}
     */
    subtract : function(c1, c2) {
        var result = new Flog.RayTracer.Color(0, 0, 0);
        /** @type {number} */
        result.red = c1.red - c2.red;
        /** @type {number} */
        result.green = c1.green - c2.green;
        /** @type {number} */
        result.blue = c1.blue - c2.blue;
        return result;
    },
    /**
     * @param {string} c1
     * @param {string} c2
     * @return {?}
     */
    multiply : function(c1, c2) {
        var result = new Flog.RayTracer.Color(0, 0, 0);
        /** @type {number} */
        result.red = c1.red * c2.red;
        /** @type {number} */
        result.green = c1.green * c2.green;
        /** @type {number} */
        result.blue = c1.blue * c2.blue;
        return result;
    },
    /**
     * @param {?} c1
     * @param {number} f
     * @return {?}
     */
    multiplyScalar : function(c1, f) {
        var result = new Flog.RayTracer.Color(0, 0, 0);
        /** @type {number} */
        result.red = c1.red * f;
        /** @type {number} */
        result.green = c1.green * f;
        /** @type {number} */
        result.blue = c1.blue * f;
        return result;
    },
    /**
     * @param {string} c1
     * @param {?} f
     * @return {?}
     */
    divideFactor : function(c1, f) {
        var result = new Flog.RayTracer.Color(0, 0, 0);
        /** @type {number} */
        result.red = c1.red / f;
        /** @type {number} */
        result.green = c1.green / f;
        /** @type {number} */
        result.blue = c1.blue / f;
        return result;
    },
    /**
     * @return {undefined}
     */
    limit : function() {
        this.red = this.red > 0 ? this.red > 1 ? 1 : this.red : 0;
        this.green = this.green > 0 ? this.green > 1 ? 1 : this.green : 0;
        this.blue = this.blue > 0 ? this.blue > 1 ? 1 : this.blue : 0;
    },
    /**
     * @param {string} color
     * @return {?}
     */
    distance : function(color) {
        /** @type {number} */
        var d = Math.abs(this.red - color.red) + Math.abs(this.green - color.green) + Math.abs(this.blue - color.blue);
        return d;
    },
    /**
     * @param {?} c1
     * @param {?} c2
     * @param {number} w
     * @return {?}
     */
    blend : function(c1, c2, w) {
        var result = new Flog.RayTracer.Color(0, 0, 0);
        result = Flog.RayTracer.Color.prototype.add(Flog.RayTracer.Color.prototype.multiplyScalar(c1, 1 - w), Flog.RayTracer.Color.prototype.multiplyScalar(c2, w));
        return result;
    },
    /**
     * @return {?}
     */
    brightness : function() {
        /** @type {number} */
        var m20 = Math.floor(this.red * 255);
        /** @type {number} */
        var m21 = Math.floor(this.green * 255);
        /** @type {number} */
        var b = Math.floor(this.blue * 255);
        return m20 * 77 + m21 * 150 + b * 29 >> 8;
    },
    /**
     * @return {?}
     */
    toString : function() {
        /** @type {number} */
        var r = Math.floor(this.red * 255);
        /** @type {number} */
        var g = Math.floor(this.green * 255);
        /** @type {number} */
        var b = Math.floor(this.blue * 255);
        return "rgb(" + r + "," + g + "," + b + ")";
    }
};
if (typeof Flog == "undefined") {
    Flog = {};
}
if (typeof Flog.RayTracer == "undefined") {
    Flog.RayTracer = {};
}
Flog.RayTracer.Light = Class.create();
Flog.RayTracer.Light.prototype = {
    position : null,
    color : null,
    intensity : 10,
    /**
     * @param {number} pos
     * @param {?} color
     * @param {number} intensity
     * @return {undefined}
     */
    initialize : function(pos, color, intensity) {
        /** @type {number} */
        this.position = pos;
        this.color = color;
        this.intensity = intensity ? intensity : 10;
    },
    /**
     * @return {?}
     */
    toString : function() {
        return "Light [" + this.position.x + "," + this.position.y + "," + this.position.z + "]";
    }
};
if (typeof Flog == "undefined") {
    Flog = {};
}
if (typeof Flog.RayTracer == "undefined") {
    Flog.RayTracer = {};
}
Flog.RayTracer.Vector = Class.create();
Flog.RayTracer.Vector.prototype = {
    x : 0,
    y : 0,
    z : 0,
    /**
     * @param {?} x
     * @param {number} y
     * @param {?} z
     * @return {undefined}
     */
    initialize : function(x, y, z) {
        this.x = x ? x : 0;
        this.y = y ? y : 0;
        this.z = z ? z : 0;
    },
    /**
     * @param {?} vector
     * @return {undefined}
     */
    copy : function(vector) {
        this.x = vector.x;
        this.y = vector.y;
        this.z = vector.z;
    },
    /**
     * @return {?}
     */
    normalize : function() {
        var m = this.magnitude();
        return new Flog.RayTracer.Vector(this.x / m, this.y / m, this.z / m);
    },
    /**
     * @return {?}
     */
    magnitude : function() {
        return Math.sqrt(this.x * this.x + this.y * this.y + this.z * this.z);
    },
    /**
     * @param {?} w
     * @return {?}
     */
    cross : function(w) {
        return new Flog.RayTracer.Vector(-this.z * w.y + this.y * w.z, this.z * w.x - this.x * w.z, -this.y * w.x + this.x * w.y);
    },
    /**
     * @param {?} w
     * @return {?}
     */
    dot : function(w) {
        return this.x * w.x + this.y * w.y + this.z * w.z;
    },
    /**
     * @param {?} v
     * @param {Object} w
     * @return {?}
     */
    add : function(v, w) {
        return new Flog.RayTracer.Vector(w.x + v.x, w.y + v.y, w.z + v.z);
    },
    /**
     * @param {?} v
     * @param {?} w
     * @return {?}
     */
    subtract : function(v, w) {
        if (!w || !v) {
            throw "Vectors must be defined [" + v + "," + w + "]";
        }
        return new Flog.RayTracer.Vector(v.x - w.x, v.y - w.y, v.z - w.z);
    },
    /**
     * @param {?} v
     * @param {?} w
     * @return {?}
     */
    multiplyVector : function(v, w) {
        return new Flog.RayTracer.Vector(v.x * w.x, v.y * w.y, v.z * w.z);
    },
    /**
     * @param {?} v
     * @param {number} w
     * @return {?}
     */
    multiplyScalar : function(v, w) {
        return new Flog.RayTracer.Vector(v.x * w, v.y * w, v.z * w);
    },
    /**
     * @return {?}
     */
    toString : function() {
        return "Vector [" + this.x + "," + this.y + "," + this.z + "]";
    }
};
if (typeof Flog == "undefined") {
    Flog = {};
}
if (typeof Flog.RayTracer == "undefined") {
    Flog.RayTracer = {};
}
Flog.RayTracer.Ray = Class.create();
Flog.RayTracer.Ray.prototype = {
    position : null,
    direction : null,
    /**
     * @param {?} pos
     * @param {string} dir
     * @return {undefined}
     */
    initialize : function(pos, dir) {
        this.position = pos;
        /** @type {string} */
        this.direction = dir;
    },
    /**
     * @return {?}
     */
    toString : function() {
        return "Ray [" + this.position + "," + this.direction + "]";
    }
};
if (typeof Flog == "undefined") {
    Flog = {};
}
if (typeof Flog.RayTracer == "undefined") {
    Flog.RayTracer = {};
}
Flog.RayTracer.Scene = Class.create();
Flog.RayTracer.Scene.prototype = {
    camera : null,
    shapes : [],
    lights : [],
    background : null,
    /**
     * @return {undefined}
     */
    initialize : function() {
        this.camera = new Flog.RayTracer.Camera(new Flog.RayTracer.Vector(0, 0, -5), new Flog.RayTracer.Vector(0, 0, 1), new Flog.RayTracer.Vector(0, 1, 0));
        /** @type {Array} */
        this.shapes = new Array;
        /** @type {Array} */
        this.lights = new Array;
        this.background = new Flog.RayTracer.Background(new Flog.RayTracer.Color(0, 0, 0.5), 0.2);
    }
};
if (typeof Flog == "undefined") {
    Flog = {};
}
if (typeof Flog.RayTracer == "undefined") {
    Flog.RayTracer = {};
}
if (typeof Flog.RayTracer.Material == "undefined") {
    Flog.RayTracer.Material = {};
}
Flog.RayTracer.Material.BaseMaterial = Class.create();
Flog.RayTracer.Material.BaseMaterial.prototype = {
    gloss : 2,
    transparency : 0,
    reflection : 0,
    refraction : 0.5,
    hasTexture : false,
    /**
     * @return {undefined}
     */
    initialize : function() {
    },
    /**
     * @param {number} u
     * @param {number} v
     * @return {undefined}
     */
    getColor : function(u, v) {
    },
    /**
     * @param {number} t
     * @return {?}
     */
    wrapUp : function(t) {
        /** @type {number} */
        t = t % 2;
        if (t < -1) {
            t += 2;
        }
        if (t >= 1) {
            t -= 2;
        }
        return t;
    },
    /**
     * @return {?}
     */
    toString : function() {
        return "Material [gloss=" + this.gloss + ", transparency=" + this.transparency + ", hasTexture=" + this.hasTexture + "]";
    }
};
if (typeof Flog == "undefined") {
    Flog = {};
}
if (typeof Flog.RayTracer == "undefined") {
    Flog.RayTracer = {};
}
Flog.RayTracer.Material.Solid = Class.create();
Flog.RayTracer.Material.Solid.prototype = Object.extend(new Flog.RayTracer.Material.BaseMaterial, {
    /**
     * @param {?} color
     * @param {Array} reflection
     * @param {?} contentHTML
     * @param {string} transparency
     * @param {number} gloss
     * @return {undefined}
     */
    initialize : function(color, reflection, contentHTML, transparency, gloss) {
        this.color = color;
        /** @type {Array} */
        this.reflection = reflection;
        /** @type {string} */
        this.transparency = transparency;
        /** @type {number} */
        this.gloss = gloss;
        /** @type {boolean} */
        this.hasTexture = false;
    },
    /**
     * @param {number} u
     * @param {number} v
     * @return {?}
     */
    getColor : function(u, v) {
        return this.color;
    },
    /**
     * @return {?}
     */
    toString : function() {
        return "SolidMaterial [gloss=" + this.gloss + ", transparency=" + this.transparency + ", hasTexture=" + this.hasTexture + "]";
    }
});
if (typeof Flog == "undefined") {
    Flog = {};
}
if (typeof Flog.RayTracer == "undefined") {
    Flog.RayTracer = {};
}
Flog.RayTracer.Material.Chessboard = Class.create();
Flog.RayTracer.Material.Chessboard.prototype = Object.extend(new Flog.RayTracer.Material.BaseMaterial, {
    colorEven : null,
    colorOdd : null,
    density : 0.5,
    /**
     * @param {?} colorEven
     * @param {?} colorOdd
     * @param {Array} reflection
     * @param {string} transparency
     * @param {number} gloss
     * @param {number} density
     * @return {undefined}
     */
    initialize : function(colorEven, colorOdd, reflection, transparency, gloss, density) {
        this.colorEven = colorEven;
        this.colorOdd = colorOdd;
        /** @type {Array} */
        this.reflection = reflection;
        /** @type {string} */
        this.transparency = transparency;
        /** @type {number} */
        this.gloss = gloss;
        /** @type {number} */
        this.density = density;
        /** @type {boolean} */
        this.hasTexture = true;
    },
    /**
     * @param {number} u
     * @param {number} v
     * @return {?}
     */
    getColor : function(u, v) {
        /** @type {number} */
        var t = this.wrapUp(u * this.density) * this.wrapUp(v * this.density);
        if (t < 0) {
            return this.colorEven;
        } else {
            return this.colorOdd;
        }
    },
    /**
     * @return {?}
     */
    toString : function() {
        return "ChessMaterial [gloss=" + this.gloss + ", transparency=" + this.transparency + ", hasTexture=" + this.hasTexture + "]";
    }
});
if (typeof Flog == "undefined") {
    Flog = {};
}
if (typeof Flog.RayTracer == "undefined") {
    Flog.RayTracer = {};
}
if (typeof Flog.RayTracer.Shape == "undefined") {
    Flog.RayTracer.Shape = {};
}
Flog.RayTracer.Shape.Sphere = Class.create();
Flog.RayTracer.Shape.Sphere.prototype = {
    /**
     * @param {number} pos
     * @param {?} radius
     * @param {?} material
     * @return {undefined}
     */
    initialize : function(pos, radius, material) {
        this.radius = radius;
        /** @type {number} */
        this.position = pos;
        this.material = material;
    },
    /**
     * @param {Object} ray
     * @return {?}
     */
    intersect : function(ray) {
        var info = new Flog.RayTracer.IntersectionInfo;
        info.shape = this;
        var dst = Flog.RayTracer.Vector.prototype.subtract(ray.position, this.position);
        var B = dst.dot(ray.direction);
        /** @type {number} */
        var C = dst.dot(dst) - this.radius * this.radius;
        /** @type {number} */
        var D = B * B - C;
        if (D > 0) {
            /** @type {boolean} */
            info.isHit = true;
            /** @type {number} */
            info.distance = -B - Math.sqrt(D);
            info.position = Flog.RayTracer.Vector.prototype.add(ray.position, Flog.RayTracer.Vector.prototype.multiplyScalar(ray.direction, info.distance));
            info.normal = Flog.RayTracer.Vector.prototype.subtract(info.position, this.position).normalize();
            info.color = this.material.getColor(0, 0);
        } else {
            /** @type {boolean} */
            info.isHit = false;
        }
        return info;
    },
    /**
     * @return {?}
     */
    toString : function() {
        return "Sphere [position=" + this.position + ", radius=" + this.radius + "]";
    }
};
if (typeof Flog == "undefined") {
    Flog = {};
}
if (typeof Flog.RayTracer == "undefined") {
    Flog.RayTracer = {};
}
if (typeof Flog.RayTracer.Shape == "undefined") {
    Flog.RayTracer.Shape = {};
}
Flog.RayTracer.Shape.Plane = Class.create();
Flog.RayTracer.Shape.Plane.prototype = {
    d : 0,
    /**
     * @param {number} pos
     * @param {string} d
     * @param {?} material
     * @return {undefined}
     */
    initialize : function(pos, d, material) {
        /** @type {number} */
        this.position = pos;
        /** @type {string} */
        this.d = d;
        this.material = material;
    },
    /**
     * @param {Object} ray
     * @return {?}
     */
    intersect : function(ray) {
        var info = new Flog.RayTracer.IntersectionInfo;
        var Vd = this.position.dot(ray.direction);
        if (Vd == 0) {
            return info;
        }
        /** @type {number} */
        var t = -(this.position.dot(ray.position) + this.d) / Vd;
        if (t <= 0) {
            return info;
        }
        info.shape = this;
        /** @type {boolean} */
        info.isHit = true;
        info.position = Flog.RayTracer.Vector.prototype.add(ray.position, Flog.RayTracer.Vector.prototype.multiplyScalar(ray.direction, t));
        info.normal = this.position;
        /** @type {number} */
        info.distance = t;
        if (this.material.hasTexture) {
            var vU = new Flog.RayTracer.Vector(this.position.y, this.position.z, -this.position.x);
            var vV = vU.cross(this.position);
            var u = info.position.dot(vU);
            var v = info.position.dot(vV);
            info.color = this.material.getColor(u, v);
        } else {
            info.color = this.material.getColor(0, 0);
        }
        return info;
    },
    /**
     * @return {?}
     */
    toString : function() {
        return "Plane [" + this.position + ", d=" + this.d + "]";
    }
};
if (typeof Flog == "undefined") {
    Flog = {};
}
if (typeof Flog.RayTracer == "undefined") {
    Flog.RayTracer = {};
}
Flog.RayTracer.IntersectionInfo = Class.create();
Flog.RayTracer.IntersectionInfo.prototype = {
    isHit : false,
    hitCount : 0,
    shape : null,
    position : null,
    normal : null,
    color : null,
    distance : null,
    /**
     * @return {undefined}
     */
    initialize : function() {
        this.color = new Flog.RayTracer.Color(0, 0, 0);
    },
    /**
     * @return {?}
     */
    toString : function() {
        return "Intersection [" + this.position + "]";
    }
};
if (typeof Flog == "undefined") {
    Flog = {};
}
if (typeof Flog.RayTracer == "undefined") {
    Flog.RayTracer = {};
}
Flog.RayTracer.Camera = Class.create();
Flog.RayTracer.Camera.prototype = {
    position : null,
    lookAt : null,
    equator : null,
    up : null,
    screen : null,
    /**
     * @param {number} pos
     * @param {?} lookAt
     * @param {?} up
     * @return {undefined}
     */
    initialize : function(pos, lookAt, up) {
        /** @type {number} */
        this.position = pos;
        this.lookAt = lookAt;
        this.up = up;
        this.equator = lookAt.normalize().cross(this.up);
        this.screen = Flog.RayTracer.Vector.prototype.add(this.position, this.lookAt);
    },
    /**
     * @param {number} vx
     * @param {number} vy
     * @return {?}
     */
    getRay : function(vx, vy) {
        var pos = Flog.RayTracer.Vector.prototype.subtract(this.screen, Flog.RayTracer.Vector.prototype.subtract(Flog.RayTracer.Vector.prototype.multiplyScalar(this.equator, vx), Flog.RayTracer.Vector.prototype.multiplyScalar(this.up, vy)));
        /** @type {number} */
        pos.y = pos.y * -1;
        var dir = Flog.RayTracer.Vector.prototype.subtract(pos, this.position);
        var ray = new Flog.RayTracer.Ray(pos, dir.normalize());
        return ray;
    },
    /**
     * @return {?}
     */
    toString : function() {
        return "Ray []";
    }
};
if (typeof Flog == "undefined") {
    Flog = {};
}
if (typeof Flog.RayTracer == "undefined") {
    Flog.RayTracer = {};
}
Flog.RayTracer.Background = Class.create();
Flog.RayTracer.Background.prototype = {
    color : null,
    ambience : 0,
    /**
     * @param {?} color
     * @param {?} ambience
     * @return {undefined}
     */
    initialize : function(color, ambience) {
        this.color = color;
        this.ambience = ambience;
    }
};
if (typeof Flog == "undefined") {
    Flog = {};
}
if (typeof Flog.RayTracer == "undefined") {
    Flog.RayTracer = {};
}
Flog.RayTracer.Engine = Class.create();
Flog.RayTracer.Engine.prototype = {
    canvas : null,
    /**
     * @param {Object} options
     * @return {undefined}
     */
    initialize : function(options) {
        this.options = Object.extend({
            canvasHeight : 100,
            canvasWidth : 100,
            pixelWidth : 2,
            pixelHeight : 2,
            renderDiffuse : false,
            renderShadows : false,
            renderHighlights : false,
            renderReflections : false,
            rayDepth : 2
        }, options || {});
        this.options.canvasHeight /= this.options.pixelHeight;
        this.options.canvasWidth /= this.options.pixelWidth;
    },
    /**
     * @param {number} x
     * @param {number} y
     * @param {Object} color
     * @return {undefined}
     */
    setPixel : function(x, y, color) {
        var pxW;
        var pxH;
        pxW = this.options.pixelWidth;
        pxH = this.options.pixelHeight;
        if (this.canvas) {
            this.canvas.fillStyle = color.toString();
            this.canvas.fillRect(x * pxW, y * pxH, pxW, pxH);
        } else {
            if (x === y) {
                checkNumber += color.brightness();
            }
        }
    },
    /**
     * @param {Object} scene
     * @param {Object} canvas
     * @return {undefined}
     */
    renderScene : function(scene, canvas) {
        /** @type {number} */
        checkNumber = 0;
        if (canvas) {
            this.canvas = canvas.getContext("2d");
        } else {
            /** @type {null} */
            this.canvas = null;
        }
        var canvasHeight = this.options.canvasHeight;
        var canvasWidth = this.options.canvasWidth;
        /** @type {number} */
        var y = 0;
        for (;y < canvasHeight;y++) {
            /** @type {number} */
            var x = 0;
            for (;x < canvasWidth;x++) {
                /** @type {number} */
                var yp = y * 1 / canvasHeight * 2 - 1;
                /** @type {number} */
                var xp = x * 1 / canvasWidth * 2 - 1;
                var ray = scene.camera.getRay(xp, yp);
                var color = this.getPixelColor(ray, scene);
                this.setPixel(x, y, color);
            }
        }
        if (checkNumber !== 2321) {
            throw new Error("Scene rendered incorrectly");
        }
    },
    /**
     * @param {?} ray
     * @param {Object} scene
     * @return {?}
     */
    getPixelColor : function(ray, scene) {
        var info = this.testIntersection(ray, scene, null);
        if (info.isHit) {
            var color = this.rayTrace(info, ray, scene, 0);
            return color;
        }
        return scene.background.color;
    },
    /**
     * @param {?} ray
     * @param {Object} scene
     * @param {?} exclude
     * @return {?}
     */
    testIntersection : function(ray, scene, exclude) {
        /** @type {number} */
        var hits = 0;
        var best = new Flog.RayTracer.IntersectionInfo;
        /** @type {number} */
        best.distance = 2E3;
        /** @type {number} */
        var i = 0;
        for (;i < scene.shapes.length;i++) {
            var shape = scene.shapes[i];
            if (shape != exclude) {
                var info = shape.intersect(ray);
                if (info.isHit && (info.distance >= 0 && info.distance < best.distance)) {
                    best = info;
                    hits++;
                }
            }
        }
        /** @type {number} */
        best.hitCount = hits;
        return best;
    },
    /**
     * @param {?} P
     * @param {?} N
     * @param {string} V
     * @return {?}
     */
    getReflectionRay : function(P, N, V) {
        /** @type {number} */
        var c1 = -N.dot(V);
        var R1 = Flog.RayTracer.Vector.prototype.add(Flog.RayTracer.Vector.prototype.multiplyScalar(N, 2 * c1), V);
        return new Flog.RayTracer.Ray(P, R1);
    },
    /**
     * @param {Object} info
     * @param {?} ray
     * @param {Object} scene
     * @param {number} depth
     * @return {?}
     */
    rayTrace : function(info, ray, scene, depth) {
        var color = Flog.RayTracer.Color.prototype.multiplyScalar(info.color, scene.background.ambience);
        var oldColor = color;
        /** @type {number} */
        var shininess = Math.pow(10, info.shape.material.gloss + 1);
        /** @type {number} */
        var l = 0;
        for (;l < scene.lights.length;l++) {
            var light = scene.lights[l];
            var v = Flog.RayTracer.Vector.prototype.subtract(light.position, info.position).normalize();
            if (this.options.renderDiffuse) {
                var L = v.dot(info.normal);
                if (L > 0) {
                    color = Flog.RayTracer.Color.prototype.add(color, Flog.RayTracer.Color.prototype.multiply(info.color, Flog.RayTracer.Color.prototype.multiplyScalar(light.color, L)));
                }
            }
            if (depth <= this.options.rayDepth) {
                if (this.options.renderReflections && info.shape.material.reflection > 0) {
                    var reflectionRay = this.getReflectionRay(info.position, info.normal, ray.direction);
                    var refl = this.testIntersection(reflectionRay, scene, info.shape);
                    if (refl.isHit && refl.distance > 0) {
                        refl.color = this.rayTrace(refl, reflectionRay, scene, depth + 1);
                    } else {
                        refl.color = scene.background.color;
                    }
                    color = Flog.RayTracer.Color.prototype.blend(color, refl.color, info.shape.material.reflection);
                }
            }
            var shadowInfo = new Flog.RayTracer.IntersectionInfo;
            if (this.options.renderShadows) {
                var shadowRay = new Flog.RayTracer.Ray(info.position, v);
                shadowInfo = this.testIntersection(shadowRay, scene, info.shape);
                if (shadowInfo.isHit && shadowInfo.shape != info.shape) {
                    var vA = Flog.RayTracer.Color.prototype.multiplyScalar(color, 0.5);
                    /** @type {number} */
                    var dB = 0.5 * Math.pow(shadowInfo.shape.material.transparency, 0.5);
                    color = Flog.RayTracer.Color.prototype.addScalar(vA, dB);
                }
            }
            if (this.options.renderHighlights && (!shadowInfo.isHit && info.shape.material.gloss > 0)) {
                var Lv = Flog.RayTracer.Vector.prototype.subtract(info.shape.position, light.position).normalize();
                var E = Flog.RayTracer.Vector.prototype.subtract(scene.camera.position, info.shape.position).normalize();
                var H = Flog.RayTracer.Vector.prototype.subtract(E, Lv).normalize();
                /** @type {number} */
                var glossWeight = Math.pow(Math.max(info.normal.dot(H), 0), shininess);
                color = Flog.RayTracer.Color.prototype.add(Flog.RayTracer.Color.prototype.multiplyScalar(light.color, glossWeight), color);
            }
        }
        color.limit();
        return color;
    }
};
/**
 * @return {undefined}
 */
function renderScene() {
    var scene = new Flog.RayTracer.Scene;
    scene.camera = new Flog.RayTracer.Camera(new Flog.RayTracer.Vector(0, 0, -15), new Flog.RayTracer.Vector(-0.2, 0, 5), new Flog.RayTracer.Vector(0, 1, 0));
    scene.background = new Flog.RayTracer.Background(new Flog.RayTracer.Color(0.5, 0.5, 0.5), 0.4);
    var copies = new Flog.RayTracer.Shape.Sphere(new Flog.RayTracer.Vector(-1.5, 1.5, 2), 1.5, new Flog.RayTracer.Material.Solid(new Flog.RayTracer.Color(0, 0.5, 0.5), 0.3, 0, 0, 2));
    var templatePromise = new Flog.RayTracer.Shape.Sphere(new Flog.RayTracer.Vector(1, 0.25, 1), 0.5, new Flog.RayTracer.Material.Solid(new Flog.RayTracer.Color(0.9, 0.9, 0.9), 0.1, 0, 0, 1.5));
    var modId = new Flog.RayTracer.Shape.Plane((new Flog.RayTracer.Vector(0.1, 0.9, -0.5)).normalize(), 1.2, new Flog.RayTracer.Material.Chessboard(new Flog.RayTracer.Color(1, 1, 1), new Flog.RayTracer.Color(0, 0, 0), 0.2, 0, 1, 0.7));
    scene.shapes.push(modId);
    scene.shapes.push(copies);
    scene.shapes.push(templatePromise);
    var vvar = new Flog.RayTracer.Light(new Flog.RayTracer.Vector(5, 10, -1), new Flog.RayTracer.Color(0.8, 0.8, 0.8));
    var toPush = new Flog.RayTracer.Light(new Flog.RayTracer.Vector(-3, 5, -15), new Flog.RayTracer.Color(0.8, 0.8, 0.8), 100);
    scene.lights.push(vvar);
    scene.lights.push(toPush);
    /** @type {number} */
    var imageWidth = 100;
    /** @type {number} */
    var imageHeight = 100;
    /** @type {Array.<string>} */
    var pixelSize = "5,5".split(",");
    /** @type {boolean} */
    var renderDiffuse = true;
    /** @type {boolean} */
    var renderShadows = true;
    /** @type {boolean} */
    var renderHighlights = true;
    /** @type {boolean} */
    var renderReflections = true;
    /** @type {number} */
    var rayDepth = 2;
    var raytracer = new Flog.RayTracer.Engine({
        canvasWidth : imageWidth,
        canvasHeight : imageHeight,
        pixelWidth : pixelSize[0],
        pixelHeight : pixelSize[1],
        "renderDiffuse" : renderDiffuse,
        "renderHighlights" : renderHighlights,
        "renderShadows" : renderShadows,
        "renderReflections" : renderReflections,
        "rayDepth" : rayDepth
    });
    raytracer.renderScene(scene, null, 0);
}
;