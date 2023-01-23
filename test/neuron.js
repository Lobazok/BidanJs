const bidan = require("../modules/bidan.js")
const { relu, tanh } = require("../modules/func/Activationfunctions.js")

 var ni = new bidan.Neurons("ni", relu)

ni.addInput(0)
ni.addInput(1)
ni.addInput(0)
ni.ActivationInput = 3
ni.pesos = [4,2,1]
//console.log(ni.cal());

relu(ni.cal())

//ni.activation()

/* ni.info() */
