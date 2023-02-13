const bidan = require("../modules/bidan")
const { relu, sigmoid } = require("../modules/func/Activationfunctions.js")

const { PerformanceLogger } = require("../modules/algorithms/genetic/performance.js")
const { MaxValue } = require("../modules/func/InterpretFunctions")
const fs = require("fs")

const colors = require("colors/safe")

var lian = new bidan.Neuralnetwork()
lian.LayerInputConfig(4, relu)
lian.LayersConfig([3, 2, 3], relu)
lian.LayerOutputConfig(3, sigmoid)



lian.initConnections()
const data = JSON.parse(fs.readFileSync("dataset.json", "utf-8"))

//lian.useWeights("lianPesos")

let Logger = new PerformanceLogger()

Logger.config("lianPerformace")
Logger.initGeneraction(0)

for (let o = 0; o < 500; o++) {
    lian.initWeights()
    Logger.initAgent(1, o)

    for (let i = 0; i < 100; i++) {

        let re = [0]
        if (data[i][4] === "versicolor") {
            re = [1, 0, 0]
            //console.log(colors.blue("tipo: versicolor"));
        } else if (data[i][4] === "virginica") {
            re = [0, 1, 0]
            //console.log(colors.blue(("tipo: virginica")))
        } else if (data[i][4] === "setosa") {
            re = [0, 0, 1]
            //console.log(colors.blue("tipo: setosa"))
        }

        //console.log(colors.inverse(i));
        lian.reset()

        let d = [data[i][0], data[i][1], data[i][2], data[i][3]]
        lian.StartPrediction(d, false)

        let ar = lian.Output()
        Logger.addResult(ar, re, MaxValue)
    }

   // lian.saveWeight("src/PesosLian_G" + 1 + "_A_" + o)
    Logger.analyzeResult(0.001)
    
}
lian.info()
Logger.saveData()
