const bidan = require("../../modules/bidan")                                   //Motor de IA
const { relu, sigmoid } = require("../../modules/func/Activationfunctions.js") //Funciones de activacion (Relu & Sigmoid)
const { MaxValue } = require("../../modules/func/InterpretFunctions")          //componente de simplificacion
const colors = require("../../colors/colors")                                  //Colores :P

var lian = new bidan.Neuralnetwork() // Lian is a new IA

//Config
lian.LayerInputConfig(4, relu) 
lian.LayersConfig([3, 2, 3], relu)
lian.LayerOutputConfig(3, sigmoid)

lian.initConnections()

lian.useWeights(`./PesosLian_A_0`)

//DataSet
const data = JSON.parse(fs.readFileSync("dataset.json", "utf-8"))


for (let i = 0; i < 100; i++) {

    let re = [0]
    if (data[i][4] === "versicolor") {
        re = [1, 0, 0]
    } else if (data[i][4] === "virginica") {
        re = [0, 1, 0]
    } else if (data[i][4] === "setosa") {
        re = [0, 0, 1]
    }

    lian.reset() //reset the previous value

    let d = [data[i][0], data[i][1], data[i][2], data[i][3]] //Data is
    lian.StartPrediction(d, false)

    console.log((MaxValue(re)));
    let ar = lian.Output()
    console.log(colors.cyan(MaxValue(ar)));
}

lian.info() //Print info