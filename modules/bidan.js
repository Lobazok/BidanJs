const colors = require("colors/safe")
const { error } = require("console")
const { perceptron } = require("./neuron")
const fs = require("fs")
const { funcions } = require("./func/Activationfunctions")

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
    save: ["bgGreen", "bold"],
    mirror: ["bgCyan", "bold"],
    initC: ["bgBlue"],
    resu: ["brightMagenta", "italic"],
    expe: ["brightYellow", "italic"]
})

function logError(error) {
    console.log(colors.error(error))
}


class Neuralnetwork {
    constructor() {
        this.LayerInput = []
        this.Layer = []
        this.LayerOutput = []
        this.LayerInputActivationfunction = undefined
        this.LayerActivationfunction = []
        this.LayerOutputActivationfunction = undefined
        //aqui va la configuracion
        this.data = {
            "LayerInputConfig": [],
            "LayersConfig": [],
            "LayerOutputConfig": []
        }
    }
    //funcion para configurar las capas de entrada
    LayerInputConfig = (Input, Activationfunction) => {
        if (typeof Activationfunction == "function") {
            //comprobamos si Input es un numero
            if (typeof Input == "number") {
                //Input es un numero
                this.data.LayerInputConfig = [Input, Activationfunction.name]
                //comprobamos si input es un numero valido(mayor a 0)
                if (Input > 0) {
                    //input es valido
                    //agregamos las neuronas a LayerInput
                    this.LayerInputActivationfunction = Activationfunction
                    for (let index = 0; index < Input; index++) {
                        this.LayerInput.push(new perceptron("LayerInput" + index, Activationfunction))
                    }
                } else if (Input == 0) {
                    logError("Bidan error 003: una capa no puede tener cero neuronas")
                } else logError("Bidan error 003: una capa no puede tener un numero negativo de neuronas")
            } else {
                //Input no es un numero
                logError("Bidan error 001: el valor de LayerInputConfig no es un numero")
            }
        } else if (typeof Activationfunction == "undefined") {
            logError("Bidan error 002: la funcion de activacion de la capa de entrada no fue espe")
        } else logError("Bidan error 002: la funcion de activacion de la capa de entrada no es una funcion")
    }

    //funcion para configurar las capas
    LayersConfig = (ArrayInput, Activationfunction) => {
        //comprobamos si Input es un array
        if (typeof Activationfunction == "function" || typeof Activationfunction == "object") {
            if (typeof ArrayInput == "object") {
                this.data.LayersConfig = [ArrayInput, Activationfunction.name]
                //Input es un array
                for (let index = 0; index < ArrayInput.length; index++) {
                    if (typeof ArrayInput[index] == "number") {
                        if (ArrayInput[index] > 0) {
                            //agregamos las neuronas a LayerInput
                            this.LayerActivationfunction[index] = Activationfunction
                            let layer = []
                            if (typeof Activationfunction == "function") {
                                for (let o = 0; o < ArrayInput[index]; o++) {
                                    layer.push(new perceptron("Layer" + index + "Neuron" + o, Activationfunction))
                                }
                            } else if (typeof Activationfunction == "object" && Activationfunction.length === ArrayInput.length) {
                                for (let o = 0; o < ArrayInput[index]; o++) {
                                    layer.push(new perceptron("Layer" + index + "Neuron" + o, Activationfunction[index]))
                                }
                            } else if (typeof Activationfunction == "object") {
                                logError("Bidan error 002: la funcion de activacion fue especifica como array pero no coinside con el ArrayInput")
                            } else logError("Bidan error 002: la funcion de activacion de la capa no fue especificada")
                            this.Layer.push(layer)
                        } else if (Input == 0) {
                            logError("Bidan error 003: una capa no puede tener cero neuronas")
                        } else logError("Bidan error 003: una capa no puede tener un numero negativo de neuronas")
                    } else logError("Bidan error 001: el valor de NewLayers no es un array")
                }

            } else if (typeof ArrayInput == "number") {
                //Input es un numero
                if (ArrayInput > 0) {
                    let layer = []
                    for (let o = 0; o < ArrayInput; o++) {
                        layer.push(new perceptron("Layer" + o + "Neuron" + o, Activationfunction))
                    }
                    this.LayerActivationfunction[0] = Activationfunction
                    this.Layer.push(layer)
                } else if (Input == 0) {
                    logError("Bidan error 003: una capa no puede tener cero neuronas")
                } else logError("Bidan error 003: una capa no puede tener un numero negativo de neuronas")

            } else logError("Bidan error 001: el valor de NewLayers no es un array")
        } else if (typeof Activationfunction == "undefined") {
            logError("Bidan error 002: la funcion de activacion de la capa no fue especificada")
        } else logError("Bidan error 002: la funcion de activacion de la capa no es una funcion")
    }

    //funcion para configurar las capas de salida
    LayerOutputConfig = (Output, Activationfunction) => {
        if (typeof Activationfunction == "function") {
            //comprobamos si Input es un numero
            if (typeof Output == "number") {
                this.data.LayerOutputConfig = [Output, Activationfunction.name]
                //Input es un numero
                this.LayerOutputActivationfunction = Activationfunction
                //agregamos las neuronas a LayerInput
                for (let index = 0; index < Output; index++) {
                    this.LayerOutput.push(new perceptron("LayerOutput" + index, Activationfunction))
                }
            } else logError("Bidan error 001: el valor de LayerOutputConfig no es un numero")
        } else if (typeof Activationfunction == "undefined") {
            logError("Bidan error 002: la funcion de activacion de la capa de salida no fue especificada")
        } else logError("Bidan error 002: la funcion de activacion de la capa de salida no es una funcion")
    }



    //funcion para configurar la red neuronal, llama a todas las funciones anteriores
    config = (LayerInputConfig, LayerInputActivationfunction, LayersConfig, LayersActivationfunction, LayerOutputConfig, LayerOutputActivationfunction) => {
        this.LayerInputConfig(LayerInputConfig, LayerInputActivationfunction)
        this.LayersConfig(LayersConfig, LayersActivationfunction)
        this.LayerOutputConfig(LayerOutputConfig, LayerOutputActivationfunction)
    }

    //funcion que replica la configuracion de una red
    mirror = (direction) => {
        //obtenemos la configuracion y la transformamos en un array
        const data = Object.values(JSON.parse(fs.readFileSync(direction, "utf-8")))
        let configuration = [];
        for (var i = 0; i < data.length; i++) {
            configuration.push(data[i][0], data[i][1])
        }
        const findFunction = (functionName) => {
            return funcions.find((f) => f.name === functionName)
        }

        this.config(configuration[0], findFunction(configuration[1]), configuration[2], findFunction(configuration[3]), configuration[4], findFunction(configuration[5]))
        console.log(colors.mirror("mirror Neuralnetwork"));
    }

    //funcion para obtener informacion de la red nueronal
    info = () => {
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
                console.log(colors.Lymin("  layer activation function: " + this.LayerActivationfunction[index].name))
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

    //funcion para guardar una configuracion
    saveCofig = (name) => {
        console.log(colors.save("Config of Neuralnetwork save"));
        const json = JSON.stringify(this.data)
        fs.writeFileSync(name + ".json", json)
    }

    //funcion para iniciar las conexiones entre neuronas
    initConnections = () => {
        if (this.LayerInput.length != 0 && this.Layer.length != 0 && this.LayerOutput.length != 0) {
            for (let i = 0; i < this.LayerInput.length; i++) {
                this.LayerInput[i].Output = this.Layer[0]
                this.LayerInput[i].ActivationInput = 1
            }

            for (let o = 0; o < this.Layer.length; o++) {

                for (let u = 0; u < this.Layer[o].length; u++) {
                    if (this.Layer[o + 1]) {
                        this.Layer[o][u].Output = this.Layer[o + 1]
                    } else {
                        this.Layer[o][u].Output = this.LayerOutput
                    }
                    if (this.Layer[o - 1]) {

                        this.Layer[o][u].ActivationInput = this.Layer[o - 1].length
                    } else {
                        this.Layer[o][u].ActivationInput = this.LayerInput.length
                    }
                }
            }

            for (let i = 0; i < this.LayerOutput.length; i++) {
                //this.LayerOutput[i].info()
                let weight = []
                for (let index = 0; index < this.Layer[this.Layer.length - 1].length; index++) {
                    weight.push(Math.random())
                }
                this.LayerOutput[i].weight = weight
            }
            console.log(colors.initC("init Connections of Neuralnetwork"));

        } else if (this.Layer.length != 0 && this.LayerOutput.length != 0) {
            console.log(colors.warn("Bidan error 000: error de configuracion en capa de entrada"));
        } else if (this.LayerInput.length != 0 && this.LayerOutput.length != 0) {
            console.log(colors.warn("Bidan error 000: error de configuracion de capas ocultas"))
        } else if (this.LayerInput.length != 0 && this.Layer.length != 0) {
            console.log(colors.warn("Bidan error 000: error de configuracion en capa de salida"))
        } else console.log(colors.warn("Bidan error 000: error de configuracion en multiples capas"))

    }


    initWeights = () => {
        for (let o = 0; o < this.Layer.length; o++) {

            for (let u = 0; u < this.Layer[o].length; u++) {

                if (this.Layer[o - 1]) {
                    let weight = []
                    for (let index = 0; index < this.Layer[o - 1].length; index++) {
                        weight.push(Math.random())
                    }
                    this.Layer[o][u].weight = weight
                } else {
                    let weight = []
                    for (let index = 0; index < this.LayerInput.length; index++) {
                        weight.push(Math.random())
                    }
                    this.Layer[o][u].weight = weight
                }
            }
        }

        for (let i = 0; i < this.LayerOutput.length; i++) {
            //this.LayerOutput[i].info()
            let weight = []
            for (let index = 0; index < this.Layer[this.Layer.length - 1].length; index++) {
                weight.push(Math.random())
            }
            this.LayerOutput[i].weight = weight
        }

        for (let i = 0; i < this.LayerInput.length; i++) {
            //this.LayerOutput[i].info()
            let weight = []
            for (let index = 0; index < this.Layer[this.Layer.length - 1].length; index++) {
                weight.push(Math.random())

            }
            this.LayerInput[i].weight = weight
        }
    }

    StartPrediction = (DataSet, bool = true) => {
        if (typeof DataSet === "object") {
            for (let i = 0; i < DataSet.length; i++) {
                this.LayerInput[i].addInput(DataSet[i])
                this.LayerInput[i].activation()
            }

            if (bool === true) {
                console.log(colors.initC("Start Prediction"));
            }
        } else if (typeof DataSet === "number" && this.LayerInput.length === 1) {
            this.LayerInput[0].addInput(DataSet)
            this.LayerInput[0].activation()

            if (bool === true) {
                console.log(colors.initC("Start Prediction"));
            }
        } else logError("error 005: en StartPrediction los datos no son ni array ni numeros")
    }

    //funcion para guardar una configuracion
    saveWeight = (name) => {
        let data = {
            config: this.data,
            weight: {
                LayerInput: [],
                Layer: [],
                LayerOutput: []
            }
        }

        for (let i = 0; i < this.LayerInput.length; i++) {
            data.weight.LayerInput.push(this.LayerInput[i].weight)
        }
        for (let i = 0; i < this.LayerOutput.length; i++) {
            data.weight.LayerOutput.push(this.LayerOutput[i].weight)
        }
        for (let o = 0; o < this.Layer.length; o++) {
            let layer = []
            for (let u = 0; u < this.Layer[o].length; u++) {
                let a = []
                for (let i = 0; i < this.Layer[o][u].weight.length; i++) {
                    a.push(this.Layer[o][u].weight[i])
                }
                layer.push(a)
            }
            data.weight.Layer.push(layer)
        }

        const json = JSON.stringify(data)
        fs.writeFileSync(name + ".json", json)
    }

    useWeights = (direction) => {
        const data = JSON.parse(fs.readFileSync(direction, "utf-8"))

        for (let i = 0; i < this.LayerInput.length; i++) {

            this.LayerInput[i].weight = data.weight.LayerInput[i]
        }

        for (let i = 0; i < this.LayerOutput.length; i++) {

            this.LayerOutput[i].weight = data.weight.LayerOutput[i]
        }

        for (let o = 0; o < this.Layer.length; o++) {
            for (let u = 0; u < this.Layer[o].length; u++) {
                this.Layer[o][u].weight = data.weight.Layer[o][u]
            }
        }
    }

    Output = () => {
        let r = []
        for (let i = 0; i < this.LayerOutput.length; i++) {
            r.push(this.LayerOutput[i].Activationfunction(this.LayerOutput[i].cal()))
        }
        return r
    }

    OutputLog = () => {
        let r = []
        for (let i = 0; i < this.LayerOutput.length; i++) {
            r.push(this.LayerOutput[i].Activationfunction(this.LayerOutput[i].cal()))
        }
        console.log(colors.resu("r: " + r));
        return r
    }
    reset = () => {
        for (let o = 0; o < this.Layer.length; o++) {

            for (let u = 0; u < this.Layer[o].length; u++) {

                this.Layer[o][u].Input = []
            }
        }

        for (let i = 0; i < this.LayerOutput.length; i++) {
            this.LayerOutput[i].Input = []
        }

        for (let i = 0; i < this.LayerInput.length; i++) {
            this.LayerInput[i].Input = []
        }
    }
}
module.exports = {
    Neuralnetwork
}
