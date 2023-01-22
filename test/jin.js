const bidan = require('../module/bidan')
const { relu, logistica } = require("../module/Activationfunctions")

var jin = new bidan.Neuralnetwork()
jin.LayerInputConfig(2, logistica)
jin.LayersConfig(2, relu)
jin.LayerOutputConfig(4, logistica)

jin.info()