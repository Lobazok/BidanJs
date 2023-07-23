const { logError } = require("./colors/bidanColors")
const colors = require("./colors/bidanColors")


const { perceptron } = require("./neuron")
const fs = require("fs")
const { funcions } = require("./func/Activationfunctions")




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
                    logError("Bidan error 003 LaInCo: The input layer is assigned zero neurons")
                } else logError("Bidan error 003 LaInCo: The input layer is assigned a negative number of neurons")
            } else if (typeof Input == "undefined") {
                //Input no es un numero
                logError("Bidan error 001 LaInCo: The input layer was not assigned a number of neurons")
            } else logError("Bidan error 001 LaInCo: An invalid value was assigned to the number of neurons in the input layer")
        } else if (typeof Activationfunction == "undefined") {
            logError("Bidan error 002 LaInCo: The input layer activation function was not specified")
        } else logError("Bidan error 002 LaInCo: The input layer activation function is not a function")
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
                                logError("Bidan error 002 LaHiCo: An array of activation functions was specified but it does not match the array of layers")
                            } else logError("Bidan error 002 LaHiCo: The " + index + " layer activation function was not specified")
                            this.Layer.push(layer)
                        } else if (ArrayInput[index] == 0) {
                            logError("Bidan error 003 LaHiCo: The " + index + " layer was assigned zero neurons")
                        } else logError("Bidan error 003 LaHiCo: The " + index + " layer was assigned a negative number of neurons")
                    } else if (typeof ArrayInput[index] == "undefined") {
                        logError("Bidan error 001 LaHiCo: In the " + index + " layer is not assigned a number of neurons")
                    } else logError("Bidan error 001 LaHiCo:An invalid value was assigned to the number of neurons in layer " + index)
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
                    logError("Bidan error 003 LaHiCo: The hidden layer was assigned zero neurons")
                } else logError("Bidan error 003 LaHiCo: The hidden layer was assigned a negative number of neurons")

            } else if (typeof ArrayInput == "undefined") {
                logError("Bidan error 001 LaHiCo: No hidden layers were assigned")
            } else logError("Bidan error 001 LaHiCo: An invalid value was assigned on hidden layers")
        } else if (typeof Activationfunction == "undefined") {
            logError("Bidan error 002 LaHiCo: The function of activation of the hidden layers was not specified")
        } else logError("Bidan error 002 LaHiCo: The hidden layer activation function was assigned an invalid value")
    }

    //funcion para configurar las capas de salida
    LayerOutputConfig = (Output, Activationfunction) => {
        if (typeof Activationfunction == "function") {
            //comprobamos si Input es un numero
            if (typeof Output == "number") {
                //Input es un numero
                this.data.LayerOutputConfig = [Output, Activationfunction.name]
                //comprobamos si input es un numero valido(mayor a 0)
                if (Output > 0) {
                    //input es valido
                    //agregamos las neuronas a LayerInput
                    this.LayerOutputActivationfunction = Activationfunction
                    for (let index = 0; index < Output; index++) {
                        this.LayerOutput.push(new perceptron("LayerOutput" + index, Activationfunction))
                    }
                } else if (Output == 0) {
                    logError("Bidan error 003 LaOuCo: The output layer is assigned zero neurons")
                } else logError("Bidan error 003 LaOuCo: The output layer is assigned a negative number of neurons")
            } else if (typeof Output == "undefined") {
                //Input no es un numero
                logError("Bidan error 001 LaOuCo: The output layer was not assigned a number of neurons")
            } else logError("Bidan error 001 LaOuCo: An invalid value was assigned to the number of neurons in the output layer")
        } else if (typeof Activationfunction == "undefined") {
            logError("Bidan error 002 LaOuCo: The output layer activation function was not specified")
        } else logError("Bidan error 002 LaOuCo: The output layer activation function is not a function")
    }

    //funcion para configurar la red neuronal, llama a todas las funciones anteriores
    config = (LayerInputConfig, LayerInputActivationfunction, LayersConfig, LayersActivationfunction, LayerOutputConfig, LayerOutputActivationfunction) => {
        this.LayerInputConfig(LayerInputConfig, LayerInputActivationfunction)
        this.LayersConfig(LayersConfig, LayersActivationfunction)
        this.LayerOutputConfig(LayerOutputConfig, LayerOutputActivationfunction)
    }

    //funcion que replica la configuracion de una red
    readMirror = (direction) => {
        if (typeof direction == "string") {
            if (fs.existsSync(direction + ".json")) {
                //obtenemos la configuracion y la transformamos en un array
                const data = Object.values(JSON.parse(fs.readFileSync(direction + ".json", "utf-8")))
                const keys = Object.keys(JSON.parse(fs.readFileSync(direction + ".json", "utf-8")))
                if (keys[0] == 'LayerInputConfig' & keys[1] == 'LayersConfig' & keys[2] == 'LayerOutputConfig') {
                    let configuration = [];
                    for (var i = 0; i < data.length; i++) {
                        configuration.push(data[i][0], data[i][1])
                    }
                    const findFunction = (functionName) => {
                        return funcions.find((f) => f.name === functionName)
                    }

                    this.config(configuration[0], findFunction(configuration[1]), configuration[2], findFunction(configuration[3]), configuration[4], findFunction(configuration[5]))
                    console.log(colors.mirror("mirror Neuralnetwork"));
                } else logError("Bidan error 005 rM: The file on readmirror is corrupt")

            } else logError("Bidan error 006 rM: In readmirror the file does not exist")

        } else if (typeof direction == "undefined") {
            logError("Bidan error 004 rM: In readMirror the file path was not specified")
        } else logError("Bidan error 004 rM: In readmirror the file path is not a string")

    }

    //funcion que replica la configuracion de una red
    mirror = (d) => {
        //obtenemos la configuracion y la transformamos en un array
        const data = Object.values(JSON.parse(fs.readFileSync(direction + ".json", "utf-8")))
        const keys = Object.keys(JSON.parse(fs.readFileSync(direction + ".json", "utf-8")))
        if (keys[0] == 'LayerInputConfig' & keys[1] == 'LayersConfig' & keys[2] == 'LayerOutputConfig') {
            let configuration = [];
            for (var i = 0; i < data.length; i++) {
                configuration.push(data[i][0], data[i][1])
            }
            const findFunction = (functionName) => {
                return funcions.find((f) => f.name === functionName)
            }

            this.config(configuration[0], findFunction(configuration[1]), configuration[2], findFunction(configuration[3]), configuration[4], findFunction(configuration[5]))
            console.log(colors.mirror("mirror Neuralnetwork"));
        } else logError("Bidan error 005 m: The data on readmirror is corrupt")
    }

    //funcion para obtener informacion de la red nueronal
    info = () => {
        if (this.LayerInput.length != 0) {
            console.log(colors.LyInputTitle("Number of neurons in the input layer: " + this.LayerInput.length))
            console.log(colors.LyInput(" Input layer activation function: " + this.LayerInputActivationfunction.name))
        } else {
            console.log(colors.warn("Bidan error 000 in: Configuration error in input layer"))
        }

        if (this.Layer.length != 0) {
            console.log(colors.LyTitle("Number of hidden Layers: " + this.Layer.length))
            for (let index = 0; index < this.Layer.length; index++) {
                console.log(colors.Ly(" Number of neurons in the layer " + index + ": " + this.Layer[index].length))
                console.log(colors.Lymin("  layer activation function: " + this.LayerActivationfunction[index].name))
            }
        } else {
            console.log(colors.warn("Bidan error 000 in: Hidden layers configuration error"))
        }

        if (this.LayerOutput.length != 0) {
            console.log(colors.LyTitleOutput("Number of neurons in the output layer: " + this.LayerOutput.length))
            console.log(colors.LyOutput(" Input layer activation function: " + this.LayerOutputActivationfunction.name))
        } else {
            console.log(colors.warn("Bidan error 000 in: Configuration error in output layer"))
        }
    }

    //funcion para guardar una configuracion
    saveCofig = (name) => {
        console.log(colors.save("Config of Neuralnetwork save"));
        const json = JSON.stringify(this.data)
        if (name.substring(name.length - 5) == ".json") {
            fs.writeFileSync(name, json)
        } else fs.writeFileSync(name + ".json", json)
    }
    //funcion para leer una configuracion
    readCofig = () => {
        return this.data
    }

    //funcion para iniciar las conexiones entre neuronas
    initConnections = (bool = true) => {
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
            if (bool) console.log(colors.initC("init Connections of Neuralnetwork"));

        } else if (this.Layer.length != 0 && this.LayerOutput.length != 0) {
            console.log(colors.warn("Bidan error 000 iC: Configuration error in input layer"));
        } else if (this.LayerInput.length != 0 && this.LayerOutput.length != 0) {
            console.log(colors.warn("Bidan error 000 iC: Hidden layers configuration error"))
        } else if (this.LayerInput.length != 0 && this.Layer.length != 0) {
            console.log(colors.warn("Bidan error 000 iC: Configuration error in output layer"))
        } else console.log(colors.warn("Bidan error 000 iC: Multi-layer configuration error"))

    }


    initWeights = () => {
        // Initialize weights for hidden layers
        for (let o = 0; o < this.Layer.length; o++) {
            const prevLayerLength = o > 0 ? this.Layer[o - 1].length : this.LayerInput.length;
            const weight = Array.from({ length: prevLayerLength }, () => Math.random());
            weight.push(Math.random());
    
            for (let u = 0; u < this.Layer[o].length; u++) {
                this.Layer[o][u].weight = weight;
            }
        }
    
        // Initialize weights for output layer
        const outputWeight = Array.from({ length: this.Layer[this.Layer.length - 1].length }, () => 0);
        outputWeight.push(0);
    
        for (let i = 0; i < this.LayerOutput.length; i++) {
            this.LayerOutput[i].weight = outputWeight;
        }
    
        // Initialize weights for input layer
        const inputWeight = Array.from({ length: this.Layer[this.Layer.length - 1].length }, () => Math.random());
        inputWeight.push(Math.random());
    
        for (let i = 0; i < this.LayerInput.length; i++) {
            this.LayerInput[i].weight = inputWeight;
        }
    }
    

    StartPrediction = (DataSet, bool = true) => {
        if (typeof DataSet === "object") {
            if(DataSet.length === this.LayerInput.length){
                for (let i = 0; i < DataSet.length; i++) {
                    this.LayerInput[i].addInput(DataSet[i])
                    this.LayerInput[i].activation()
                }
    
                if (bool === true) {
                    console.log(colors.initC("Start Prediction"));
                }
            }else  logError("Bidan error 007 SP: in StartPrediction the data is an array but does not match the number of input layer neurons")
        } else if (typeof DataSet === "number" && this.LayerInput.length === 1) {
            this.LayerInput[0].addInput(DataSet)
            this.LayerInput[0].activation()

            if (bool === true) {
                console.log(colors.initC("Start Prediction"));
            }
        }else if (typeof DataSet === "number" && this.LayerInput.length != 1) {
            logError("Bidan error 007 SP: in StartPrediction the data is a number but does not fit with the number of input neurons")
        } else if (typeof DataSet === "undefined") {
            logError("Bidan error 007 SP: in StartPrediction the data is not assigned")
        } else logError("Bidan error 007 SP: in StartPrediction the data is neither array nor numbers")
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
        if (name.substring(name.length - 5) == ".json") {
            fs.writeFileSync(name, json)
        } else fs.writeFileSync(name + ".json", json)

    }

    //funcion para guardar una configuracion
    getWeight = () => {
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

        return data
    }


    readWeights = (direction) => {
        let ruta = ""
        if (direction.substring(direction.length - 5) == ".json") {
            ruta = direction
        } else ruta = direction + ".json"
        if (typeof direction == "string") {
            if (fs.existsSync(ruta)) {
                let data = JSON.parse(fs.readFileSync(direction + ".json", "utf-8"))
    
    
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
            }else logError("Bidan error 006 rW: In readWeights the file does not exist")
        } else if (typeof direction == "undefined") {
            logError("Bidan error 004 rW: In readWeights the file path was not specified")
        } else logError("Bidan error 004 rW: In readWeights the file path is not a string")

    }

    useWeights = (data) => {
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
