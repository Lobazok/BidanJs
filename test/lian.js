const bidan = require("../modules/bidan.js")
const { relu, sigmoid  } = require("../modules/func/Activationfunctions.js")

var lian = new bidan.Neuralnetwork()
lian.LayerInputConfig(2, sigmoid)
lian.LayersConfig([3,4,2], relu)
lian.LayerOutputConfig(4, sigmoid)

lian.initConnections()

lian.info()
lian.saveWeight("pesosLian")