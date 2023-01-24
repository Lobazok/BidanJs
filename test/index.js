const bidan = require("../modules/bidan.js")
const { relu, sigmoid } = require("../modules/func/Activationfunctions.js")

var lian = new bidan.Neuralnetwork()
lian.LayerInputConfig(1, sigmoid)
lian.LayersConfig([2, 3], relu)
lian.LayerOutputConfig(1, relu)

//lian.info()

lian.initConnections()

lian.useWeights("lianPesos.json")
//lian.initWeights()


for (let index = 0; index < 24; index++) {
    lian.StartPrediction(0, false)
    lian.Backpropagation(1, 0.1)
    lian.Output()
}

lian.saveWeight("lianPesos")


//lian.Layer[0][0].info()
//lian.LayerOutput[0].info()
