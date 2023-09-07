const { logError } = require("./colors/bidanColors")
const colors = require("./colors/bidanColors")
const { relu } = require("./func/Activationfunctions")

class Perceptron {
    constructor(config) {
        this.name = "";
        this.Activationfunction = config.Activationfunction || config.fun || relu;
        this.Input = [];
        this.ActivationInput = 0;
        this.weight = [];
        this.Output = [];
    }

    addInput = (num) => {
        if (typeof num === "number") {
            this.Input.push(num)
        }
    }

    cal = () => {
        if (typeof this.Input == "object") {
            let r = 0;
            for (let i = 0; i < this.Input.length; i++) {
                r += (this.Input[i] * this.weight[i])
            }
            r += this.weight[this.weight.length - 1];
            return r;
        } else logError("Bidan error 004: la neurona: " + this.name + " no risivio un array de numeros como input");
    }

    activation = () => {
        if (typeof this.Activationfunction == "function") {
            if (this.ActivationInput === this.Input.length) {
                let r = this.cal()

                let result = this.Activationfunction(r);

                for (let index = 0; index < this.Output.length; index++) {
                    this.Output[index].addInput(result);
                    this.Output[index].activation()
                }
            }
        } else {
            logError("Bidan error 002: la funcion de activacion de la nueronas:" + this.name + " no es una funcion");
        }

    }
    info = () => {
        console.log({ Name: this.name });
        console.log({ Activationfunction: this.Activationfunction });
        console.log({ Input: this.Input });
        console.log({ ActivationInput: this.ActivationInput });
        console.log({ weight: this.weight });
        console.log({ Output: this.Output });
        console.log();
    }

}

class Convu2D {
    constructor(config) {
        this.name = ""
        this.Activationfunction = config.Activationfunction || config.fun || relu;
        this.Input = []
        this.size = config.size || [3, 3];
        this.ActivationInput = 0
        this.kerlen = [[1 / 9, 1 / 9, 1 / 9], [1 / 9, 1 / 9, 1 / 9], [1 / 9, 1 / 9, 1 / 9]]
        this.Output = []
        this.weight = [];
    }

    addInput = (i) => {
        this.Input.push(i)
    }
    toKerlen = () => {
        let weights = []
        for (let i = 0; i < this.size[0]; i++) {
            const subarray = [];
            for (let j = 0; j < this.size[1]; j++) {
                const indice = i * this.size[1] + j;
                subarray.push(this.weight[indice]);
            }
            weights.push(subarray);
        }
        this.weight = weights
    }
    convu = () => {
        if (this.kerlen.length == this.size[0] & this.kerlen[0].length == this.size[1]) {
            const imagen = [];
            const halfSizeX = Math.floor(this.size[0] / 2);
            const halfSizeY = Math.floor(this.size[1] / 2);
            const kerlenY = this.kerlen.length;
            const kerlenX = this.kerlen[0].length;

            for (let index = 0; index < this.Input.length; index++) {
                for (let y = 0; y < this.Input[index].length; y++) {
                    const capa = [];
                    for (let x = 0; x < this.Input[index][y].length; x++) {
                        const pixel = { x: x, y: y, r: 0, g: 0, b: 0, a: 255 };

                        for (let a = 0; a < kerlenY; a++) {
                            for (let b = 0; b < kerlenX; b++) {
                                const pixelY = y + b - halfSizeY;
                                const pixelX = x + a - halfSizeX;

                                if (pixelX >= 0 && pixelX < this.Input[index][y].length && pixelY >= 0 && pixelY < this.Input[index].length) {
                                    const kernelValue = this.kerlen[a][b];
                                    const pixelData = this.Input[index][pixelY][pixelX] || { r: 0, g: 0, b: 0 };

                                    pixel.r += pixelData.r * kernelValue;
                                    pixel.g += pixelData.g * kernelValue;
                                    pixel.b += pixelData.b * kernelValue;
                                }
                            }
                        }

                        capa.push(pixel);
                    }
                    imagen.push(capa);
                }
            }
            return imagen;
        } else logError("Bidan error 007: kerlen and kerlen size do not coinsiden in " + this.name);
    };

    activation = () => {
        
        if (typeof this.Activationfunction == "function") {
            if (this.ActivationInput === this.Input.length) {
                this.toKerlen()
                let r = this.convu()
                let result = r

                for (let index = 0; index < this.Output.length; index++) {
                    this.Output[index].addInput(result);
                    this.Output[index].activation()
                }
            }
        } else {
            console.log(); ("Bidan error 002: la funcion de activacion de la nueronas:" + this.name + " no es una funcion");
        }

    }
    info = () => {
        console.log(this.name);
        console.log(this.Activationfunction);
        console.log(this.size);
        console.log(this.ActivationInput);
        console.log(this.kerlen);
        console.log(this.Output);
    }
}

class MaxPooling2D {
    constructor(config) {
        this.name = ""
        this.zancada = config.strike
        this.Input = []
        this.size = config.size
        this.ActivationInput = 0
        this.Output = []
        this.Activationfunction = (i) => {
            var name = "N/A"
            return i
        }
    }

    addInput = (i) => {
        this.Input.push(i)
    }

    agrupar = () => {
        const imagen = [];

        let ydef = 0
        let xdef = 0
        for (let index = 0; index < this.Input.length; index++) {
            for (let y = 0; y < this.Input[index].length; y = y + this.zancada[0]) {
                const capa = [];
                ydef++;
                for (let x = 0; x < this.Input[index][y].length; x = x + this.zancada[1]) {
                    let pixels = []
                    xdef++;
                    for (let a = 0; a < this.size[0]; a++) {
                        for (let b = 0; b < this.size[1]; b++) {
                            if (this.Input[index][y + a]) {
                                if (this.Input[index][y + a][x + b]) {
                                    pixels.push(this.Input[index][y + a][x + b])
                                }
                            }
                        }

                    }
                    const pixel = {
                        x: xdef,
                        y: ydef,
                        r: Math.max(...pixels.map(obj => obj.r)),
                        g: Math.max(...pixels.map(obj => obj.g)),
                        b: Math.max(...pixels.map(obj => obj.b)),
                        a: Math.max(...pixels.map(obj => obj.a)),
                    };
                    capa.push(pixel);
                }
                xdef = 0;
                imagen.push(capa);
            }
        }

        return imagen;
    };

    activation = () => {
        if (typeof this.Activationfunction == "function") {
            if (this.ActivationInput === this.Input.length) {
                let r = this.agrupar()
                let result = r

                for (let index = 0; index < this.Output.length; index++) {
                    this.Output[index].addInput(result);
                    // this.Output[index].activation()
                }
            }
        } else {
            console.log(); ("Bidan error 002: la funcion de activacion de la nueronas:" + this.name + " no es una funcion");
        }

    }
    info = () => {
        console.log(this.name);
        console.log(this.Activationfunction);
        console.log(this.size);
        console.log(this.ActivationInput);
        console.log(this.kerlen);
        console.log(this.Output);
    }
}

class Flatter {
    constructor(config) {
        this.name = ""
        this.Input = []
        this.ActivationInput = 0
        this.Output = []
        this.weight = [];
        this.Activationfunction = (i) => {
            var name = "N/A"
            return i
        }
    }

    addInput = (i) => {
        this.Input.push(i)
    }

    flatter = (matriz2D) => {
        const vect = [];

        for (let y = 0; y < matriz2D.length; y++) {
            for (let x = 0; x < matriz2D[y].length; x++) {
                matriz2D[y][x].r ? vect.push(matriz2D[y][x].r) : 0
                matriz2D[y][x].g ? vect.push(matriz2D[y][x].g) : 0
                matriz2D[y][x].b ? vect.push(matriz2D[y][x].b) : 0
                matriz2D[y][x].a ? vect.push(matriz2D[y][x].a) : 0
            }
        }

        return vect;
    }

    activation = () => {
        if (typeof this.Activationfunction == "function") {
            if (this.ActivationInput === this.Input.length) {
                let result = this.flatter()

                for (let index = 0; index < this.Output.length; index++) {
                    this.Output[index].addInput(result);
                    // this.Output[index].activation()
                }
            }
        } else {
            console.log(); ("Bidan error 002: la funcion de activacion de la nueronas:" + this.name + " no es una funcion");
        }

    }
    info = () => {
        console.log(this.name);
        console.log(this.Activationfunction);
        console.log(this.size);
        console.log(this.ActivationInput);
        console.log(this.kerlen);
        console.log(this.Output);
    }

}

module.exports = {
    Perceptron,
    Convu2D,
    MaxPooling2D,
    Flatter
}
