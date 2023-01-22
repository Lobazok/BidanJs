# introduction
**JavaScript module** for the development of **artificial intelligences**
focused on **simplicity** of use, uses Object-Oriented Programming (OOP) and packages all the necessary functionalities for ease of use

## inicialización 
~~~ JavaScript
const bidan = require("../modules/bidan.js")
const { relu, logistica } = require("../modules/func/Activationfunctions.js")
~~~
**imports** ***BidanJs*** and the ***activation features*** that will be used
~~~ JavaScript
var lian = new bidan.Neuralnetwork()
~~~


a new object of type Neuralnetwork is created and configured

### configuration
in BidanJs two ways are used with the config function of each layer or the general config function

#### config function of each layer
~~~ JavaScript
lian.LayerInputConfig(2, logistica)
lian.LayersConfig([3,4,2], relu)
lian.LayerOutputConfig(4, logistica)
~~~
This is how the functions are used
+ LayerInputConfig for the input layer configuration, the first parameter is the number of neurons in the form of a number and the second the activation function used by the layer.

+ LayersConfig for the configuration of the hidden layers, the first parameter if it is an array is the number of neurons of each layer, each element of the aarray is a layer and if it is resive as a number it will be a single layer with the number of neuranas specified, the second the activation function that the layer uses.

+ LayerOutputConfig for output layer configuration, the first parameter is the number of neurons in the form of a number and the second is the activation function used by the layer.

## Get network information
~~~ JavaScript
lian.info()
~~~
The ***info*** function is used to display the information in the terminal

## Save network information and replicate another network
### Save network information
~~~ JavaScript
lian.saveCofig("jinnData")
~~~
***saveCofig*** is used to save network information, the first parameter is file name **(without ending in .json)**
## replicate another network
~~~ JavaScript
lian.mirror("jinnData")
~~~
mirror*** is used to replicate the configuration of another network, the first parameter is file name **(without ending in .json)**

## activation functions
**5 activation features** are provided
+ relu, gives 0 if the result is negative, if it is not negative returns the input
+ leaky relu, a relu will be applied a bias of 0.01 in case the entry is negative
+ step if the number is positive returns 1, yes not 0, is binary
+ logistics
+ Hyperbolic tangent (HHN)