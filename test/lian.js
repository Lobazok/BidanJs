const bidan = require("../modules/bidan.js")
const { relu, logistica } = require("../modules/func/Activationfunctions.js")

var lian = new bidan.Neuralnetwork()
lian.LayerInputConfig(2, logistica)
lian.LayersConfig([3,4,2], relu)
lian.LayerOutputConfig(4, logistica)

lian.saveCofig("lianDataConfig")
lian.info()