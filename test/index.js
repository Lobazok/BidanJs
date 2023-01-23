const bidan = require("../modules/bidan.js")
const { relu, logistica } = require("../modules/func/Activationfunctions.js")

var lian = new bidan.Neuralnetwork()
lian.LayerInputConfig(1, logistica)
lian.LayersConfig([2,3], relu)
lian.LayerOutputConfig(4, logistica)

lian.saveCofig("lianDataConfig")
lian.info()
lian.initConnections()
lian.Layer[1][0].info()
lian.LayerOutput[0].info()