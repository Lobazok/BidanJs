# introducción 

**módulo de JavaScript** para el desarrollo de **inteligencias artificiales** 

enfocado en la **simplicidad** de uso, usa Programación Orientada a Object (POO) y empaqueta todas las funcionalidades necesarias para su uso 

## estructura de la documentación 

la documentación se divide en secciones, Junior para entender cómo usar el módulo, SemiSenior para especializarse, mejorar en el uso del módulo y Senior para entender cómo funciona internamente el módulo. 

 
 

también se divide en artículos, para funciones, algoritmos de aprendizaje, manejo de archivos, entre otros 

## inicialización  

~~~ JavaScript 

const bidan = require("../modules/bidan.js") 

const { relu, sigmoid } = require("../modules/func/Activationfunctions.js") 

~~~ 

se **importa** ***BidanJs*** y las ***funciones de activación*** que se usaran 

~~~ JavaScript 

var lian = new bidan.Neuralnetwork() 

~~~ 

 
 

se crea un nuevo objecto de tipo Neuralnetwork y se configura 

 
 

### configuración 

en BidanJs se utilizan dos maneras con la función config de cada capa o la función general config 

 
 

#### función config de cada capa 

~~~ JavaScript 

lian.LayerInputConfig(2, sigmoid) 

lian.LayersConfig([3,4,2], relu) 

lian.LayerOutputConfig(4, sigmoid) 

~~~ 

de esta manera se usan las funciones 

+ LayerInputConfig para la configuración de capa de entrada, el primer parámetro es la cantidad de neuronas en forma de número y el segundo la función de activación que usa la capa. 

 
 

+ LayersConfig para la configuración de las capas ocultas, el primer parámetro si es un array es la cantidad de neuronas de cada capa, cada elemento del array es una capa y si se recibe como numero será una sola capa con la cantidad de neuronas especificadas, el segundo la función de activación que usa la capa. 

 
 

+ LayerOutputConfig para la configuración de capa de salida, el primer parámetro es la cantidad de neuronas en forma de número y el segundo la función de activación que usa la capa. 

 
 

#### función config  general 

~~~ JavaScript 

lian.config(2, sigmoid, [3,4,2], relu, 4, sigmoid) 

~~~ 

esta función **agrupa** todos los parámetros de las **funciones anteriores** 

 
 
 

#### obtener información de la red 

 
 

~~~ JavaScript 

lian.info() 

~~~ 

se utiliza la función ***info*** para mostrar la información en la terminal 

 
 

## guardar información de la red y replicar otra red 

### guardar información de la red 

~~~ JavaScript 

lian.saveCofig("jinnData") 

~~~ 

***saveCofig*** se usa para guardar la información de la red, el primer parámetro es nombre del archivo **(sin la terminación en .json)** 

 
 
 

### replicar otra red 

~~~ JavaScript 

lian.mirror("jinnData") 

~~~ 

***mirror*** se usa para replicar la configuración de otra red, el primer parámetro es nombre del archivo **(sin la terminación en .json)** 


## pesos, conexiones, entradas y salidas 

 
 

### conexiones 

~~~ JavaScript 

lian.initConnections() 

~~~ 

esta función se utiliza para generar las conexiones entre las neuronas, se puede especificar que no imprima ningún mensaje en consola 

~~~ JavaScript 

lian.initConnections(false) 

~~~ 

 
 

#### reset 

~~~ JavaScript 

lian.reset() 

~~~ 

resetea la IA de los valores anteriores, es obligatorio si la IA se usa múltiples veces en una misma ejecución 

 
 

### pesos 

#### iniciar pesos de manera aleatoria 

~~~ JavaScript 

lian.initWeights() 

~~~ 

esta función inicializa la red de manera aleatoria 

 
 

#### guardar pesos 

~~~ JavaScript 

lian.saveWeigths(`./data/lianPesos${agent}`) 

~~~ 

se usa para guardar el peso actual, el parámetro es la dirección y el nombre en el que el peso se guardara, sí ya existe el archivo se remplazara, la dirección y nombre no deben incluir la terminación *".json"*, porque internamente ya lo agrega 

 
 

#### usar pesos 

~~~ JavaScript 

lian.useWeights(`./data/lianPesos0`) 

~~~ 

se usa para cargar un peso, el parámetro es la dirección y el nombre del archivo json con el peso y nombre no deben incluir la terminación *".json"*, porque internamente ya lo agrega, se usa en **Dev** y en **Produc** 

 
 

### entradas 

~~~ JavaScript 

lian.StartPrediction(dataSet) 

~~~ 

~~~ JavaScript 

lian.StartPrediction(dataSet, false) 

~~~ 

se usa para indicar la predicción de la red, el primer parámetro es la data(información) las entradas, debe ser un array de igual longitud que el número de neuronas de entrada, el segundo parámetro es opcional, indica si se imprime en consola "Start Prediction" 

### Salidas

#### funcion Output
~~~ JavaScript 

lian.Output() 

~~~
esta funcion devuelve la salida de la red neuronal, no requiere ningun parametro

#### funcion OutputLog
~~~ JavaScript 

lian.OutputLog() 

~~~
esta funcion devuelve la salida de la red neuronal y imprime en consola la salida, no requiere ningun parametro y se usa en la etapa de **Dev**

 
 

## funciones de activación 

se proporcionan **5 funciones de activación** 

+ relu (Rectified Linear Unit), da 0 si el resultado es negativo, si no es negativo devuelve el input  

$$
r(x) = 
\begin{cases}
0 & \text{si } x < 0 \\
x & \text{si } x > 0
\end{cases}
$$

+ leaky relu, a relu se le aplicara un sesgo de 0.01 en caso de que la entrada sea negativa 

$$
l(x) = 
\begin{cases}
0.01x & \text{si } x < 0 \\
x & \text{si } x > 0
\end{cases}
$$

+ step si el número es positivo devuelve 1, sí no 0, es binario 

$$
s(x) =
\begin{cases}
0 & \text{si } x < 0 \\
1 & \text{si } x \geq 0
\end{cases}
$$

+ sidmoid

$$
s(x) =\frac{1}{1 + e^{-x}}
$$ 

+ Tangente hiperbólica (TAHN) 

$$
t(x) = \tanh(x) = \frac{e^x - e^{-x}}{e^x + e^{-x}}
$$
