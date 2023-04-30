[![★](https://img.shields.io/github/stars/Lobazok/BidanJs/bidan](https://www.npmjs.com/package/bidanjs)
# BidanJs
**[UNDER DEVELOPMENT]** 
## introduction
**JavaScript module** for the development of **artificial intelligences**
Focused on **simplicity** of use


## Use cases
**BidanJs** is focused on the **ease** of use for **novice** developers and on providing **functionalities** for the most **advanced**, uses **JavaScript** technologies **recommended** in services that use JavaScript and can be used with **TypeScript**

## Documentation
in the folder **Documentation** is encorded **all the necessary documentation** **sorted by complexity**, it is in two languages **Spanish** and **English**

## collaboration
We are willing to all collaboration, if you have a contribution contact us


## installation
This module in npm, is instala with

~~~shell
npm i bidanjs
~~~

~~~ JavaScript
const bidan = require("../../modules/bidan")
const { relu, sigmoid } = require("../../modules/func/Activationfunctions.js")
const { MaxValue } = require("../../modules/func/InterpretFunctions")

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
    lian.reset() //reset the previous value

    if (data[i][4] === "versicolor") {
        let re = [1, 0, 0]
    } else if (data[i][4] === "virginica") {
        let re = [0, 1, 0]
    } else if (data[i][4] === "setosa") {
        let re = [0, 0, 1]
    }


    let d = [data[i][0], data[i][1], data[i][2], data[i][3]] //Data is
    lian.StartPrediction(d)

    console.log((MaxValue(re)));
    let ar = lian.Output()
    console.log(MaxValue(ar));
}

~~~

**[EN DESARROLLO]** 
## introducion
**módulo de JavaScript** para el desarrollo de **inteligencias artificiales**
enfocado en la **simplicidad** de uso

## casos de uso
**BidanJs** está enfocada en la **facilidad** de uso para desarrolladores **novatos** y en brindar **funcionalidades** para los más **avanzados**, utiliza tecnologías **JavaScript** se **recomienda** en servicios que usan JavaScript y puede ser usado con **TypeScript**

## documentacion
en la carpeta **Documentation** se encuertra **toda la documentacion** necesaria **ordenada por complejidad**, es en dos idiomas **Español** e **Ingles**

## colaboracion
estamos dispuestos a toda colaboración, si tienes un aporte contacte con nosotros.

## instalación
esta el modulo en npm, se ínstala con

~~~ shell
npm i bidanjs
~~~

~~~ JavaScript
const bidan = require("../../modules/bidan")
const { relu, sigmoid } = require("../../modules/func/Activationfunctions.js")
const { MaxValue } = require("../../modules/func/InterpretFunctions")

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
    lian.reset() //reset the previous value

    if (data[i][4] === "versicolor") {
        let re = [1, 0, 0]
    } else if (data[i][4] === "virginica") {
        let re = [0, 1, 0]
    } else if (data[i][4] === "setosa") {
        let re = [0, 0, 1]
    }


    let d = [data[i][0], data[i][1], data[i][2], data[i][3]] //Data is
    lian.StartPrediction(d)

    console.log((MaxValue(re)));
    let ar = lian.Output()
    console.log(MaxValue(ar));
}

~~~
