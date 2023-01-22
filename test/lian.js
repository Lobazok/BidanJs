const bidan = require("../modules/bidan.js")
const { relu } = require("../modules/func/Activationfunctions.js")

var lian = new bidan.Neuralnetwork()
//lian.config(5, relu, 4, relu, 1, relu)

lian.mirror("./lianData.json")
lian.info()