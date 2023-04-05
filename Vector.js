function VecCreateShortcut(x, y, z, w) {
    if(x === undefined) 
        return (dimensions, value = 0) => {
            if(dimensions !== undefined)
                return new Vector(
                    dimensions > 0 ? value : undefined,
                    dimensions > 1 ? value : undefined,
                    dimensions > 2 ? value : undefined,
                    dimensions > 3 ? value : undefined
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