const bidan = require("../modules/bidan.js")
const { relu, sigmoid } = require("../modules/func/Activationfunctions.js")

var lian = new bidan.Neuralnetwork()
lian.LayerInputConfig(1, relu)
lian.LayersConfig([2, 3], relu)
lian.LayerOutputConfig(1, sigmoid)

lian.info()

lian.initConnections()

lian.saveWeight("pesosLian")