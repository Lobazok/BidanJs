const bidan = require("../modules/bidan.js")
const { relu, logistica } = require("../modules/func/Activationfunctions.js")

var jin = new bidan.Neuralnetwork()
jin.LayerInputConfig(2, logistica)
jin.LayersConfig([3,4,2], relu)
jin.LayerOutputConfig(4, logistica)

jin.saveCofig("jinnData")
jin.info()