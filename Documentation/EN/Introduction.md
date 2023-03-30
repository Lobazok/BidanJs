# introduction

**JavaScript module** for the development of **artificial intelligences**

focused on **simplicity** of use, uses Object-Oriented Programming (OOP) and packages all the necessary functionalities for its use

## Documentation structure

the documentation is divided into sections, Junior to understand how to use the module, SemiSenior to specialize, improve in the use of the module and Senior to understand how the module works internally.

It is also divided into articles, for functions, learning algorithms, file handling, among others

## installation

This module in NPM, it is installed with

~~~
npm i bidanjs
~~~


## initialization

~~~ JavaScript

const bidan = require("bidanjs")

const { relu, sigmoid } = require("bidanjs/Activationfunctions.js")

~~~

**imported** ***BidanJs** *** and ***activation features* that will be used

~~~ JavaScript

var lian = new bidan.Neuralnetwork()

~~~

a new object of type Neuralnetwork is created and configured

### configuration

in BidanJs two ways are used with the config function of each layer or the general config function

#### config function of each layer

~~~ JavaScript

lian.LayerInputConfig(2, sigmoid)

Lian.LayersConfig([3,4,2], relu)

lian.LayerOutputConfig(4, sigmoid)

~~~

This is how the functions are used

+ LayerInputConfig for the input layer configuration, the first parameter is the number of neurons in the form of a number and the second the activation function used by the layer.

+ LayersConfig for the configuration of the hidden layers, the first parameter if it is an array is the number of neurons of each layer, each element of the array is a layer and if it is received as a number it will be a single layer with the number of neurons specified, the second the activation function used by the layer.

+ LayerOutputConfig for output layer configuration, the first parameter is the number of neurons in the form of a number and the second is the activation function used by the layer.

#### general config function

~~~ JavaScript

lian.config(2, sigmoid, [3,4,2], relu, 4, sigmoid)

~~~

This function **groups together** all the parameters of the **previous functions**

#### Get network information

~~~ JavaScript

lian.info()

~~~

function is used The ***info*** to display the information in the terminal

## Save network information and replicate another network

### Save network information

~~~ JavaScript

lian.saveCofig("lianConfig")

~~~

***saveCofig*** is used to save network information, the first parameter is file name **(without ending in .json)**

### replicate another network

~~~ JavaScript

lian.mirror("lianConfig")

~~~

***mirror*** is used to replicate the configuration of another network, the first parameter is file name **(without ending in .json)**

## pesos, connections, inputs and outputs

### connections

~~~ JavaScript

lian.initConnections()

~~~

This function is used to generate connections between neurons, you can specify that you do not print any messages in console

~~~ JavaScript

lian.initConnections(false)

~~~

#### reset

~~~ JavaScript

lian.reset()

~~~

resets the AI of the previous values, it is mandatory if the AI is used multiple times in the same execution

### Weights

#### start weights randomly

~~~ JavaScript

lian.initWeights()

~~~

This function randomly initializes the network

#### saveWeigths

~~~ JavaScript

lian.saveWeigths(`./data/lianPesos${agent}`)

~~~

It is used to save the current weight, the parameter is the address and the name in which the weight will be saved, if the file already exists will be replaced, the address and name should not include the ending *".json"*, because internally you already add it

#### useweights

~~~ JavaScript

lian.useWeights(`./data/lianPesos0`)

~~~

is used to load a weight, the parameter is the address and the name of the json file with the weight and name should not include the ending *".json"*, because internally it already adds it, it is used in **Dev** and in **Produce**

### inputs

~~~ JavaScript

lian.StartPrediction(dataSet)

~~~

~~~ JavaScript
lian.StartPrediction(dataSet, false)

~~~

is used to indicate the prediction of the network, the first parameter is the data (information) the inputs, it must be an array of equal length to the number of input neurons, the second parameter is optional, indicates if it is printed in console "Start Prediction"

### Output

#### Output function

~~~ JavaScript

lian.Output()

~~~

This function returns the output of the neural network, does not require any parameters

#### OutputLog function

~~~ JavaScript

lian.OutputLog()

~~~

this function returns the output of the neural network and prints the output to console, does not require any parameters and is mainly used in the **Dev** stage

## activation functions

are provided **5 activation features**

+ relu (Rectified Linear Unit), gives 0 if the result is negative, if it is not negative returns the input

$$

r(x) =

\begin{cases} 0 & \text{si } x < 0 \\

x & \text{si } x > 0

\end{cases}

$$

+ leaky relu, a relu will be applied a bias of 0.01 in case the entry is negative

$$

l(x) =

\begin{cases} 0.01x & \text{si } x < 0 \\

x & \text{si } x > 0

\end{cases}

$$

+ step if the number is positive returns 1, yes not 0, is binary

$$

s(x) =

\begin{cases} 0 & \text{si } x < 0 \\

1 & \text{si } x \geq 0

\end{cases}

$$

+ sidmoid

+ sidmoid

$$
s(x) =\frac{1}{1 + e^{-x}}
$$ 

+ Hyperbolic tangent (HHN)

$$

t(x) = \frac{e^x - e^{-x}}{e^x + e^{-x}}

$$

## Training algorithms

The *training algorithms* currently available (v0.8.0) in BidanJS is the genetic algorithm

## genetic algorithm

the **genetic algorithm in bidanjs** is implemented using the ***performace Logger Genetic***, ** the ***BidanJs Genetic analysis panel*** and the ***Genetic composer***

### performace Logger Genetic

Logs agent performance, processes it, and saves it

### BidanJs Genetic analysis panel

Terminal application to analyze agent performance, uses descriptive statistics

### Genetic composer

The component that is responsible for creating the weight files of the networks mixes the best genes and adds mutation