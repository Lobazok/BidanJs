const colors = require("colors/safe")
colors.setTheme({
    error: ["red", "italic", "bold"],
    warn: "red",
    LyInput: "blue",
    LyInputTitle: ["blue", "bold"],
    Ly: "cyan",
    Lymin: ["cyan", "dim", "reset"],
    LyTitle: ["cyan", "bold"],
    LyOutput: "green",
    LyTitleOutput: ["green", "bold"],
})

function logError(error) {
    console.log(colors.error(error))
}

function Neurons(name, Activationfunction) {
    this.name = name
    this.Activationfunction = Activationfunction
    this.Inputs = 0

    this.activation = () => {
        if (typeof this.Inputs == "number") {
            if (typeof this.Activationfunction == "function") {
                //aqui le pasamos a las siguientes neuronaas los resultados
            } else {
                logError("Bidan error 002: la funcion de activacion de la nueronas:" + this.name + " no es una funcion")
            }

        }
    }
}

function Neuralnetwork() {
    this.LayerInput = []
    this.Layer = []
    this.LayerOutput = []
    this.LayerInputActivationfunction = undefined
    this.LayerActivationfunction = []
    this.LayerOutputActivationfunction = undefined
    //funcion para configurar las capas de entrada
    this.LayerInputConfig = (Input, Activationfunction) => {
        if (typeof Activationfunction == "function") {
            //comprobamos si Input es un numero
            if (typeof Input == "number") {
                //Input es un numero
                //agregamos las neuronas a LayerInput
                this.LayerInputActivationfunction = Activationfunction
                for (let index = 0; index < Input; index++) {
                    this.LayerInput.push(new Neurons("LayerInput" + index, Activationfunction))
                }
            } else {
                //Input no es un numero
                logError("Bidan error 001: el valor de LayerInputConfig no es un numero")
            }
        } else if (typeof Activationfunction == "undefined") {
            logError("Bidan error 002: la funcion de activacion de la capa de entrada no fue espe")
        } else logError("Bidan error 002: la funcion de activacion de la capa de entrada no es una funcion")
    }

    //funcion para configurar las capas
    this.LayersConfig = (ArrayInput, Activationfunction) => {
        //comprobamos si Input es un array
        if (typeof Activationfunction == "function") {
            if (typeof ArrayInput == "object") {
                //Input es un array
                //agregamos las neuronas a LayerInput
                for (let index = 0; index < ArrayInput.length; index++) {
                    this.LayerActivationfunction[index] = Activationfunction
                    let layer = []
                    for (let o = 0; o < ArrayInput[index]; o++) {
                        layer.push(new Neurons("Layer" + index + "Neuron" + o, Activationfunction))
                    }
                    this.Layer.push(layer)
                }
            } else if (typeof ArrayInput == "number") {
                //Input es un numero
                let layer = []
                for (let o = 0; o < ArrayInput; o++) {
                    this.LayerActivationfunction[0] = Activationfunction
                    layer.push(new Neurons("Layer" + o + "Neuron" + o))
                }
                this.Layer.push(layer)
            } else logError("Bidan error 001: el valor de NewLayers no es un array")
        } else if (typeof Activationfunction == "undefined") {
            logError("Bidan error 002: la funcion de activacion de la capa no fue especificada")
        } else logError("Bidan error 002: la funcion de activacion de la capa no es una funcion")
    }

    //funcion para configurar las capas de salida
    this.LayerOutputConfig = (Output, Activationfunction) => {
        if (typeof Activationfunction == "function") {
            //comprobamos si Input es un numero
            if (typeof Output == "number") {
                //Input es un numero
                this.LayerOutputActivationfunction = Activationfunction
                //agregamos las neuronas a LayerInput
                for (let index = 0; index < Output; index++) {
                    this.LayerOutput.push(new Neurons("LayerOutput" + index, Activationfunction))
                }
            } else logError("Bidan error 001: el valor de LayerOutputConfig no es un numero")
        } else if (typeof Activationfunction == "undefined") {
            logError("Bidan error 002: la funcion de activacion de la capa de salida no fue especificada")
        } else logError("Bidan error 002: la funcion de activacion de la capa de salida no es una funcion")
    }

    //funcion para obtener informacion de la red nueronal
    this.info = () => {
        if (this.LayerInput.length != 0) {
            console.log(colors.LyInputTitle("Number of neurons in the input layer: " + this.LayerInput.length))
            console.log(colors.LyInput(" Input layer activation function: " + this.LayerInputActivationfunction.name))
        } else {
            console.log(colors.warn("Bidan error 000: error de configuracion en capa de entrada"))
        }

        if (this.Layer.length != 0) {
            console.log(colors.LyTitle("Number of hidden Layers: " + this.Layer.length))
            for (let index = 0; index < this.Layer.length; index++) {
                console.log(colors.Ly(" Number of neurons in the layer " + index + ": " + this.Layer[index].length))
                console.log(colors.Lymin("  Input layer activation function: " + this.LayerActivationfunction[index].name))
            }
        } else {
            console.log(colors.warn("Bidan error 000: error de configuracion de capas ocultas"))
        }

        if (this.LayerOutput.length != 0) {
            console.log(colors.LyTitleOutput("Number of neurons in the output layer: " + this.LayerOutput.length))
            console.log(colors.LyOutput(" Input layer activation function: " + this.LayerOutputActivationfunction.name))
        } else {
            console.log(colors.warn("Bidan error 000: error de configuracion en capa de salida"))
        }
    }

    //funcion para configurar la red neuronal, llama a todas las funciones anteriores
    this.config = (LayerInputConfig, LayerInputActivationfunction, LayersConfig, LayersActivationfunction, LayerOutputConfig, LayerOutputActivationfunction) => {
        this.LayerInputConfig(LayerInputConfig, LayerInputActivationfunction)
        this.LayersConfig(LayersConfig, LayersActivationfunction)
        this.LayerOutputConfig(LayerOutputConfig, LayerOutputActivationfunction)
    }
}

module.exports = {
    Neuralnetwork,
    Neurons
}
