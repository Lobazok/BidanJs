const bidan = require("../../modules/bidan")
const { relu, sigmoid } = require("../../modules/func/Activationfunctions.js")

const { PerformanceLogger } = require("../../modules/genetic/performance.js")
const { MaxValue } = require("../../modules/func/InterpretFunctions")
const fs = require("fs")


var lian = new bidan.Neuralnetwork()
lian.LayerInputConfig(4, relu)
lian.LayersConfig([3, 2, 3], relu)
lian.LayerOutputConfig(3, sigmoid)

lian.initConnections()
const data = JSON.parse(fs.readFileSync("dataset.json", "utf-8"))

let Logger = new PerformanceLogger()

Logger.config("data/lianPerformace")


let generation = 16  //TODO: esta es la generacion que se esta creando(la actual)
Logger.initGeneraction(generation)

for (let o = 0; o < 100; o++) {
    lian.useWeights(`data/gen${generation}/PesosLian_A_${o}`)

    Logger.initAgent(generation, o)

    for (let i = 0; i < 100; i++) {

        let re = [0]
        if (data[i][4] === "versicolor") {
            re = [1, 0, 0]
        } else if (data[i][4] === "virginica") {
            re = [0, 1, 0]
        } else if (data[i][4] === "setosa") {
            re = [0, 0, 1]
        }

        lian.reset()

        let d = [data[i][0], data[i][1], data[i][2], data[i][3]]
        lian.StartPrediction(d, false)

        let ar = lian.Output()
        Logger.addResult(ar, re, MaxValue)
    }

   Logger.analyzeResult(0.001)
    
}
lian.info()
Logger.saveData()
