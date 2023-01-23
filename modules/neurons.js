const colors = require("colors/safe")

colors.setTheme({
    error: ["red", "italic", "bold"],
    warn: "red",
    LyInputTitle: ["blue", "bold"],
    LyInput: "blue",
    Ly: "cyan",
    Lymin: ["cyan", "dim", "reset"],
    LyTitle: ["cyan", "bold"],
    LyOutput: "green",
    LyTitleOutput: ["green", "bold"],
})

function logError(error) {
    console.log(colors.error(error))
}

class perceptron {
    constructor(name, Activationfunction) {
        this.name = name
        this.Activationfunction = Activationfunction
        this.Input = []
        this.pesos = []
        this.sesgo = 0
        this.Output = []
    }

    addInput = (num) => {
        this.Input.push(num)
    }
    cal = () => {
        if (typeof this.Input == "object") {
            let r = 0;
            for (let i = 0; i < this.Input.length; i++) {
                if (this.pesos.length != 0) {
                    r += Input[i] * peso[i];
                } else r += Input[i]
            }
            r += this.sesgo;
            return r;
        } else logError("Bidan error 004: la neurona: " + this.name + " no risivio un array de numeros como input");
    }
    activation = () => {
        if (typeof this.Input == "object") {
            if (typeof this.Activationfunction == "function") {
                let result = this.Activationfunction(this.cal());
                for (let index = 0; index < this.Output.length; index++) {
                    this.Output[index].addInput(result);
                }
            } else {
                logError("Bidan error 002: la funcion de activacion de la nueronas:" + this.name + " no es una funcion");
            }

        } else logError("Bidan error 004: la neurona: " + this.name + " no risivio un array de numeros como input");
    }

    info = () => {
        console.log("Neuron: " + this.name);
        console.log(" Activation function: " + this.Activationfunction.name);
        console.log(" result bruto: " + this.cal());
        console.log(" result: " + this.Activationfunction(this.cal()));
    }
}

module.exports = {
    perceptron
}