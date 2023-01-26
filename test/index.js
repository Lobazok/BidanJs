const bidan = require("../modules/bidan.js")
const { relu, sigmoid } = require("../modules/func/Activationfunctions.js")
const fs = require("fs")

var lian = new bidan.Neuralnetwork()
lian.LayerInputConfig(4, relu)
lian.LayersConfig([3, 2, 3, 4], relu)
lian.LayerOutputConfig(3, sigmoid)

//lian.info()

lian.initConnections()

const data = JSON.parse(fs.readFileSync("dataset.json", "utf-8"))

//lian.useWeights("lianPesos.json")
lian.initWeights()
const logmax = (r) => {

    var max = Math.max.apply(null, r);
    let i = r.findIndex((m) => m === max)
    let retu = []
    if (i == 0) {
        retu = [1,0,0]
    } else if (i == 1) {
        retu = [0,1,0]
    } else if (i == 2) {
        retu = [0,0,1]
    }
    return retu
}


 let p = 0
//for (let u = 0; u < 10; u++) {
    for (let i = 0; i < data.length; i++) {
        let d = [data[i][0], data[i][1], data[i][2], data[i][3]]
        lian.StartPrediction(d, false)
        let re = [0, 0, 0]
        if (data[i][4] === "versicolor") {
            re = [1, 0, 0]
        } else if (data[i][4] === "virginica") {
            re = [0, 1, 0]
        } else if (data[i][4] === "setosa") {
            re = [1, 0, 0]
        }
        lian.Backpropagation(re, 0.000000001)
        console.log("E: " + re);
        let reS = logmax(lian.Output())
        console.log(reS);
        if(reS === [re]){
            p += 1
        }
        lian.OutputLog()
    }
//}
let por = (p / 10) * 100
console.log(por + "%");
lian.saveWeight("lianPesos")


lian.Layer[1][0].info()
//lian.LayerOutput[0].info()
