const bidan = require("../modules/bidan.js")
const { relu, sigmoid } = require("../modules/func/Activationfunctions.js")

var lian = new bidan.Neuralnetwork()
lian.LayerInputConfig(1, relu)
lian.LayersConfig([2, 3, 4, 5, 4, 3,2], relu)
lian.LayerOutputConfig(1, sigmoid)

lian.info()

lian.initConnections()

lian.LayerInput[0].addInput(1);
lian.LayerInput[0].addInput(1);
lian.LayerInput[0].ActivationInput = 2

lian.LayerInput[0].activation()

lian.LayerOutput[0].info()