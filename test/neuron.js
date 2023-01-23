const bidan = require("../modules/bidan.js")
const { relu, logistica } = require("../modules/func/Activationfunctions.js")

var ni = new bidan.Neurons("nix", relu)

ni.Input = [1,1,1]
let result = ni.cal()
console.log(result);