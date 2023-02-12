const bidan = require("../modules/bidan")
const { relu, sigmoid } = require("../modules/func/Activationfunctions.js")
const fs = require("fs")

const colors = require("colors/safe")

var lian = new bidan.Neuralnetwork()
lian.LayerInputConfig(4, sigmoid)
lian.LayersConfig([3, 3], relu)
lian.LayerOutputConfig(1, sigmoid)

//lian.info()

lian.initConnections()

const data = JSON.parse(fs.readFileSync("dataset.json", "utf-8"))

lian.initWeights()
let media = {one: 0, two:0, three:0}
//lian.useWeights("lianPesos.json")
let resulta = [0,0,0]
for (let o = 0; o < 1; o++) {
    for (let i = 0; i < data.length; i++) {
        lian.reset()
    
        let d = [data[i][0], data[i][1], data[i][2], data[i][3]]
        lian.StartPrediction(d, false)
    
        let re = [0]
        if (data[i][4] === "versicolor") {
            re = [1]
            console.log(colors.blue("tipo: versicolor"));
        } else if (data[i][4] === "virginica") {
            re = [0]
            console.log(colors.blue(("tipo: virginica")))
        } else if (data[i][4] === "setosa") {
            re = [0]
            console.log(colors.blue("tipo: setosa"))
        }
        //? lian.Layer[0][0].info()
        console.log(re);
        lian.Backpropagation(re, 0.03)
        let ar = lian.Output()
        let result = ar
        console.log(result);
        lian.OutputLog() 
    }
}
lian.saveWeight("NewLianPesos")
