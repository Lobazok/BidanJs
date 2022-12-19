const bidan = require('./bidan')
const { relu } = require("./Activationfunctions")

var lian = new bidan.Neuralnetwork()
lian.config(5, relu, [4, 3, 6, 4, 2], relu, 1, relu)
lian.info()
