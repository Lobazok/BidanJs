const bidan = require("../modules/bidan.js")
const { relu, sigmoid } = require("../modules/func/Activationfunctions.js")

var lian = new bidan.Neuralnetwork()
lian.LayerInputConfig(1, relu)
lian.LayersConfig([7, 2,1], [relu, relu, sigmoid])
lian.LayerOutputConfig(1, sigmoid)

lian.saveCofig("lianDataConfig")
//lian.info()
lian.initConnections()

lian.LayerInput[0].addInput(1)
lian.LayerInput[0].activation()

lian.LayerOutput[0].info()