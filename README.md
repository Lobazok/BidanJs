# BidanJs
**[UNDER DEVELOPMENT]** 
## introduction
**JavaScript module** for the development of **artificial intelligences**
Focused on **simplicity** of use
~~~ JavaScript
const bidan = require("../modules/bidan.js")
const { relu, logistica } = require("../modules/func/Activationfunctions.js")

var lian = new bidan.Neuralnetwork()
lian.LayerInputConfig(2, logistica)
lian.LayersConfig([3,4,2], relu)
lian.LayerOutputConfig(4, logistica)

lian.saveCofig("jinnData")
lian.info()
~~~

## Use cases
**BidanJs** is focused on the **ease** of use for **novice** developers and on providing **functionalities** for the most **advanced**, uses **JavaScript** technologies **recommended** in services that use JavaScript and can be used with **TypeScript**

## Documentation
in the folder **Documentation** is encorded **all the necessary documentation** **sorted by complexity**, it is in two languages **Spanish** and **English**

## collaboration
We are willing to all collaboration, if you have a contribution contact us

# BidanJs
**[EN DESARROLLO]** 
## introducion
**módulo de JavaScript** para el desarrollo de **inteligencias artificiales**
enfocado en la **simplicidad** de uso
~~~ JavaScript
const bidan = require("../modules/bidan.js")
const { relu, logistica } = require("../modules/func/Activationfunctions.js")

var lian = new bidan.Neuralnetwork()
lian.LayerInputConfig(2, logistica)
lian.LayersConfig([3,4,2], relu)
lian.LayerOutputConfig(4, logistica)

lian.saveCofig("jinnData")
lian.info()
~~~

## casos de uso
**BidanJs** está enfocada en la **facilidad** de uso para desarrolladores **novatos** y en brindar **funcionalidades** para los más **avanzados**, utiliza tecnologías **JavaScript** se **recomienda** en servicios que usan JavaScript y puede ser usado con **TypeScript**

## documentacion
en la carpeta **Documentation** se encuertra **toda la documentacion** necesaria **ordenada por complejidad**, es en dos idiomas **Español** e **Ingles**

## colaboracion
estamos dispuestos a toda colaboración, si tienes un aporte contacte con nosotros