/**
 * - Creates a shortcut for creating new Vector objects with optional x, y, z, and w coordinates.
 * 
 * - If no coordinates are provided, returns a function that creates a new Vector with the specified number of dimensions and an optional value for each coordinate.
 * 
 * - `V(x, y, z, w)` returns a Vector with the given values **(e.g. V(1, 2) => (1, 2))**.
 * 
 * - `V()(dimensions, standardVal)` returns a Vector with the given dimensions and standard value **(e.g. V()(2, 1) => (1, 1))**.
 * 
 * @param {number | undefined} x - The x coordinate of the vector.
 * @param {number} y - The y coordinate of the vector.
 * @param {number} z - The z coordinate of the vector.
 * @param {number} w - The w coordinate of the vector.
 * @param {number | undefined} dimensions - The dimensions of the vector.
 * @param {any | undefined} standardVal - The standard value of the vector for each dimension **(0 is the normal value)**.
 * @returns {Vector & (dimensions, standardVal = 0) => Vector}
 */
function VecCreateShortcut(x, y, z, w) {
    if(x === undefined) return (dimensions, standardVal = 0) => {
        if(dimensions !== undefined) return new Vector(
                dimensions > 0 ? standardVal : undefined,
                dimensions > 1 ? standardVal : undefined,
                dimensions > 2 ? standardVal : undefined,
                dimensions > 3 ? standardVal : undefined
        );
        return new Vector();
    };
    return new Vector(x, y, z, w);
}

class Vector {

    constructor(x, y, z, w) {
        if(x !== undefined) this.x = x;
        if(y !== undefined) this.y = y;
        if(z !== undefined) this.z = z;
        if(w !== undefined) this.w = w;
    }

    inputToVector(vec_or_x, y, z, w) {

        return (typeof(vec_or_x) === "object") ?
        (new Vector(vec_or_x.x, vec_or_x.y, vec_or_x.z, vec_or_x.w)) :
        (new Vector(vec_or_x, y, z, w));
        
    }

    operation(vector) {

        return new Vector(
            isNaN(vector.x) ? this.x : vector.x,
            isNaN(vector.y) ? this.y : vector.y,
            isNaN(vector.z) ? this.z : vector.z,
            isNaN(vector.w) ? this.w : vector.w
        );
    }

    "copy>"(vec_or_x, y, z, w) {

        const vector = this.inputToVector(vec_or_x, y, z, w);

        if(this.x !== undefined) vector.x = this.x;
        if(this.y !== undefined) vector.y = this.y;
        if(this.z !== undefined) vector.z = this.z;
        if(this.w !== undefined) vector.w = this.w;

        return vector;

    }

    "copy<"(vec_or_x, y, z, w) {

        const vector = this.inputToVector(vec_or_x, y, z, w);

        if(vector.x !== undefined) this.x = vector.x;
        if(vector.y !== undefined) this.y = vector.y;
        if(vector.z !== undefined) this.z = vector.z;
        if(vector.w !== undefined) this.w = vector.w;

        return this;

    }

    "search"(object, prefix, suffix) {

        function hasKeyStartingWith(prefix) {
            return Object.keys(object).some(key => key.startsWith(prefix));
        }

        function hasKeyEndingWith(suffix) {
            return Object.keys(object).some(key => key.endsWith(suffix));
        }

        function globalSearch() {
            if(object.x) return new Vector(object.x, object.y);
            if(object.clientX) return new Vector(object.clientX, object.clientY);
            console.warn(
                `Vector.js function: 'search' \nVector has no know values.`
            );
        }

        if(typeof prefix === "string") {// suffix: 0 -> XY ; 1 -> WwidthHeight ; 2 -> LeftTop
            if(suffix === false) {

            }
            if(hasKeyStartingWith(prefix) && hasKeyEndingWith("X") && hasKeyEndingWith("Y") && (suffix === undefined)) {
                return new Vector(object[prefix + "X"], object[prefix + "Y"]);
            }
            if(hasKeyStartingWith(prefix) && hasKeyEndingWith("Width") && hasKeyEndingWith("Height") && suffix === true) {
                return new Vector(object[prefix + "Width"], object[prefix + "Height"]);
            }
            return globalSearch();
        }
        return globalSearch();

    }

    "="(vec_or_x, y, z, w) {

        return this ["copy<"] (vec_or_x, y, z, w)

    }

    "+="(vec_or_x, y, z, w) {

        const vector = this.inputToVector(vec_or_x, y, z, w);

        return (isScalar) => {
            
            if(isScalar === true) {
                const newVec = this.operation(new Vector(
                    vector.x + this.x,
                    vector.x + this.y,
                    vector.x + this.z,
                    vector.x + this.w
                ));
                return this ["copy<"] (newVec);
            }
            
            const newVec = this.operation(new Vector(
                vector.x + this.x,
                vector.y + this.y,
                vector.z + this.z,
                vector.w + this.w
            ));
            return this ["copy<"] (newVec);
        }
    }

    "+"(vec_or_x, y, z, w) {

        const vector = this.inputToVector(vec_or_x, y, z, w);

        return (isScalar) => {
            
            if(isScalar === true) 
                return this.operation(new Vector(
                    vector.x + this.x,
                    vector.x + this.y,
                    vector.x + this.z,
                    vector.x + this.w
                ));
            
            return this.operation(new Vector(
                vector.x + this.x,
                vector.y + this.y,
                vector.z + this.z,
                vector.w + this.w
            ));
        }
    }

    "-="(vec_or_x, y, z, w) {

        const vector = this.inputToVector(vec_or_x, y, z, w);

        return (isScalar) => {
            
            if(isScalar === true) {
                const newVec = this.operation(new Vector(
                    vector.x - this.x,
                    vector.x - this.y,
                    vector.x - this.z,
                    vector.x - this.w
                ));
                return this ["copy<"] (newVec);
            }
            
            const newVec = this.operation(new Vector(
                vector.x - this.x,
                vector.y - this.y,
                vector.z - this.z,
                vector.w - this.w
            ));
            return this ["copy<"] (newVec);
        }
    }

    "-"(vec_or_x, y, z, w) {

        const vector = this.inputToVector(vec_or_x, y, z, w);

        return (isScalar) => {
            
            if(isScalar === true) 
                return this.operation(new Vector(
                    vector.x - this.x,
                    vector.x - this.y,
                    vector.x - this.z,
                    vector.x - this.w
                ));
            
            return this.operation(new Vector(
                vector.x - this.x,
                vector.y - this.y,
                vector.z - this.z,
                vector.w - this.w
            ));
        }
    }

    "*="(vec_or_x, y, z, w) {

        const vector = this.inputToVector(vec_or_x, y, z, w);

        return (isScalar) => {
            
            if(isScalar === true) {
                const newVec = this.operation(new Vector(
                    vector.x * this.x,
                    vector.x * this.y,
                    vector.x * this.z,
                    vector.x * this.w
                ));
                return this ["copy<"] (newVec);
            }
            
            const newVec = this.operation(new Vector(
                vector.x * this.x,
                vector.y * this.y,
                vector.z * this.z,
                vector.w * this.w
            ));
            return this ["copy<"] (newVec);
        }
    }

    "*"(vec_or_x, y, z, w) {

        const vector = this.inputToVector(vec_or_x, y, z, w);

        return (isScalar) => {
            
            if(isScalar === true) 
                return this.operation(new Vector(
                    vector.x * this.x,
                    vector.x * this.y,
                    vector.x * this.z,
                    vector.x * this.w
                ));
            
            return this.operation(new Vector(
                vector.x * this.x,
                vector.y * this.y,
                vector.z * this.z,
                vector.w * this.w
            ));
        }
    }

    "/="(vec_or_x, y, z, w) {

        const vector = this.inputToVector(vec_or_x, y, z, w);

        return (isScalar) => {
            
            if(isScalar === true) {
                const newVec = this.operation(new Vector(
                    vector.x / this.x,
                    vector.x / this.y,
                    vector.x / this.z,
                    vector.x / this.w
                ));
                return this ["copy<"] (newVec);
            }
            
            const newVec = this.operation(new Vector(
                vector.x / this.x,
                vector.y / this.y,
                vector.z / this.z,
                vector.w / this.w
            ));
            return this ["copy<"] (newVec);
        }
    }

    "/"(vec_or_x, y, z, w) {

        const vector = this.inputToVector(vec_or_x, y, z, w);

        return (isScalar) => {
            
            if(isScalar === true) 
                return this.operation(new Vector(
                    vector.x / this.x,
                    vector.x / this.y,
                    vector.x / this.z,
                    vector.x / this.w
                ));
            
            return this.operation(new Vector(
                vector.x / this.x,
                vector.y / this.y,
                vector.z / this.z,
                vector.w / this.w
            ));
        }
    }

    get "^2"() {
        return this ["*"] (this) ();
    }

    get "²"() {
        return this ["^2"];
    }

    "lerp"(vec_or_x, y, z, w) {

        const vector = this.inputToVector(vec_or_x, y, z, w);

        return (t) => {
            return this.operation(new Vector(
                this.x + (vector.x - this.x) * t,
                this.y + (vector.y - this.y) * t,
                this.z + (vector.z - this.z) * t,
                this.w + (vector.w - this.w) * t
            ));
        }

    }
}