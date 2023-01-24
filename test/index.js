const bidan = require("../modules/bidan.js")
const { relu, sigmoid } = require("../modules/func/Activationfunctions.js")

var lian = new bidan.Neuralnetwork()
lian.LayerInputConfig(1, relu)
lian.LayersConfig([2, 3], relu)
lian.LayerOutputConfig(1, relu)

//lian.info()

lian.initConnections()

lian.useWeights("lianPesos.json")
lian.initWeights()


lian.StartPrediction(0)
//lian.Output()
lian.Backpropagation(0, 1)

lian.saveWeight("lianPesos")

lian.LayerOutput[0].info()
lian.Output()