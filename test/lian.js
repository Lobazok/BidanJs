const bidan = require('../module/bidan')
const { relu } = require("../module/Activationfunctions")

var lian = new bidan.Neuralnetwork()
lian.config(5, relu, 4, relu, 1, relu)
lian.info()