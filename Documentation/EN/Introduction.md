# introduction

**JavaScript module** for the development of**artificial intelligence**

focused on the**simplicity** of use, use**Programming Oriented toObject (POO)** and packs all the necessary functionalities for its use

with**requires nodeJs** to run it

---
## index
+ documentation structure
+ installation and npm
+ initialization
   - setting
+ save network information and replicate another network
   - save network information
   - replicate another network
+ weights, connections, inputs and outputs
   - connections
      * reset
   - pesos
      * start weights randomly
      * save weights
      * use weights
   - Appetizer
   - Departures
      * Output function
      * functionOutputLog
   - activation functions
   - training algorithms
      * Genetic algorithm
        - performance Logger Genetic
        - BidanJs Genetic analysis panel
        - Genetic composer

---
## documentation structure

The documentation is divided into sections, Junior to understand how to use the module,SemiSenior to specialize, improve in the use of the module and Senior to understand how the module works internally.

It is also divided into articles, for functions, learning algorithms, file handling, among others

---

## installation and npm
the module is in npm, it is installed with

~~~
npm i bidanjs
~~~

---

## initialization

~~~ JavaScript
const bidan= require("bidanjs")

const { relu, sigmoid } = require("bidanjs/Activationfunctions.js")
~~~

with**it matters** ***BidanJs*** and the***activation functions*** that will be used

~~~ JavaScript
var lian = new bidan.Neuralnetwork()
~~~

a new one is created object of typeNeuralnetwork and it is configured

### setting

Bidanjs two ways are used with the config function of each layer or the general config function

#### config function of each layer

~~~ JavaScript
lian.LayerInputConfig(2, sigmoid)
lian.LayersConfig([3,4,2], resume)
lian.LayerOutputConfig(4, sigmoid)
~~~

in this way the functions are used

+ LayerInputConfig For the input layer configuration, the first parameter is the number of neurons and the second is the activation function used by the layer.

+ LayersConfig for the configuration of the hidden layers, the first parameter if it is an array is the number of neurons in each layer, each element of the array is a layer and if it is received as a number it will be a single layer with the number of specific neurons, the second the activation function that the layer uses.

+ LayerOutputConfig For the output layer configuration, the first parameter is the number of neurons, and the second is the activation function used by the layer.

#### general config function

~~~ JavaScript
lian.config(2, sigmoid, [3,4,2], relu, 4, sigmoid)
~~~

This function**groups** all the parameters of the**previous features**

#### get network information

~~~ JavaScript
lian.info()
~~~

function is used***info*** to display the information in the terminal

---

## save network information and replicate another network

### save network information

~~~ JavaScript
lian.saveCofig("lianConfig")
~~~

***saveCofig*** it is used to save the network information, the first parameter is file name**(without the ending in .json)**

### replicate another network

~~~ JavaScript
lian.mirror("linkConfig")
~~~

***mirror*** it is used to replicate the configuration of another network, the first parameter is filename**(without the ending in .json)**

## weights, connections, inputs and outputs

### connections

~~~ JavaScript
lian.initConnections()
~~~

this function is used to generate the connections between the neurons, it can be specified that it does not print any message on the console

~~~ JavaScript
lian.initConnections(false)
~~~

#### reset

~~~ JavaScript
lian.reset()
~~~

resets the AI ​​to previous values, required if the AI ​​is used multiple times in a single run

### pesos

#### start weights randomly

~~~ JavaScript
lian.initWeights()
~~~

this function initializes the network randomly

#### save weights

~~~ JavaScript
lian.saveWeigths(`./data/lianPesos${agent}`)
~~~

it is used to save the current weight, the parameter is the address and the name in which the weight will be saved, if it already exists the file will be replaced, the address and name must not include the ending*".json"*, because internally it already adds it

#### use weights

~~~ JavaScript
lian.useWeights(`./data/lianPesos0`)
~~~

used to load a weight, the parameter is the address and the name of the json file with the weight and name must not include the ending*".json"*, because internally it already adds it, it is used in**Dev** and in**Produc**

### Appetizer

~~~ JavaScript
lian.StartPrediction(dataSet)
~~~

~~~ JavaScript
lian.StartPrediction(dataSet, false)
~~~

It is used to indicate the prediction of the network, the first parameter is the data(information) of the inputs, it must be an array of equal length to the number of input neurons, the second parameter is optional, it indicates if it is printed on the console " Start Prediction"

### Outputs

#### Output function
~~~ JavaScript
lian.Output()
~~~
this function returns the output of the neural network, it does not require any parameters

#### functionOutputLog
~~~ JavaScript
lian.OutputLog()
~~~
this function returns the output of the neural network and prints the output to the console, it does not require any parameters and is mainly used in the stage of**Dev**
 
---

## activation functions

are provided**5 activation functions**

+ relu (Rectified Linear Unit), gives 0 if the result is negative, if it is not negative it returns the input

$$
r(x) =
\begin{cases}
0 & \text{si } x <0 \\
x & \text{si } x >0
\end{cases}
$$


+ leaky relu, relu will be biased by 0.01 in case the input is negative


$$
l(x) =
\begin{cases}
0.01x & \text{si } x <0 \\
x & \text{si } x >0
\end{cases}
$$


+ step if the number is positive it returns 1, yes not 0, it is binary


$$
s(x) =
\begin{cases}
0 & \text{si } x <0 \\
1 & \text{si} x \geq0
\end{cases}
$$


+ sigmoid


$$
s(x) =\frac{1}{1 + e^{-x}}
$$


+ Hyperbolic tangent (YEAR)


$$
t(x) = \frac{e^x - e^{-x}}{e^x + e^{-x}}
$$


## training algorithms
the*training algorithms* currently available in BidanJs(v0.8.0) is the genetic algorithm

### Genetic algorithm
he**genetic algorithm in bidanjs** is implemented using the***performance Logger Genetic***, he***BidanJs Genetic analysis panel*** and the***Genetic composer***

#### performance Logger Genetic
records agent performance, processes it, and saves it to files*json*

#### BidanJs Genetic analysis panel
terminal application to analyze agent performance,deer Descriptive statistics

#### Genetic composer
the component that is responsible for creating the weight files of the networks, mixes the best genes and adds mutation