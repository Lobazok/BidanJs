const bidan = require("../modules/bidan.js")
const { relu, logistica, tanh } = require("../modules/func/Activationfunctions.js")

var ni = new bidan.Neurons("ni", logistica)

ni.addInput(0)
ni.addInput(1)
ni.addInput(0)
ni.pesos = [4,2,1]
ni.activation()

ni.info()
