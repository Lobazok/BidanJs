const bidan = require("../modules/bidan.js")
const { relu, logistica, tanh } = require("../modules/func/Activationfunctions.js")

var ni = new bidan.Neurons("ni", tanh)
var nix = new bidan.Neurons("nix", tanh)

ni.Output = [nix]

ni.addInput(1)
ni.activation()

ni.info()
nix.info()