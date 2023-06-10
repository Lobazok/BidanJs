const {logError} = require("./colors/bidanColors")
const colors = require("./colors/bidanColors")

class perceptron {
    constructor(name, Activationfunction) {
        this.name = name
        this.Activationfunction = Activationfunction
        this.Input = []
        this.ActivationInput = 0
        this.weight = []
        this.Output = []
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


}

module.exports = {
    perceptron
}
