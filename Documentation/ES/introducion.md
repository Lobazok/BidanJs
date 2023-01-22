# introducion
**módulo de JavaScript** para el desarrollo de **inteligencias artificiales**
enfocado en la **simplicidad** de uso, usa Programacion Orientada a Object (POO) y empaqueta todas las funcionalidades necesarias para su facilidad de uso

## inicialización 
~~~ JavaScript
const bidan = require("../modules/bidan.js")
const { relu, logistica } = require("../modules/func/Activationfunctions.js")
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
lian.LayerInputConfig(2, logistica)
lian.LayersConfig([3,4,2], relu)
lian.LayerOutputConfig(4, logistica)
~~~
de esta manera se usan las funciones
+ LayerInputConfig para la configuración de capa de entrada, el primer parámetro es la cantidad de neuronas en forma de número y el segundo la función de activación que usa la capa.

+ LayersConfig para la configuracion de las capas ocultas, el primer parametro si es un array es la cantidad de neuronas de cada capa, cada elemento del aarray es una capa y si se resive como numero sera una sola capa con la cantidad de neuranas especificadas, el segundo la funcion de activacion que usa la capa.

+ LayerOutputConfig para la configuración de capa de salida, el primer parámetro es la cantidad de neuronas en forma de número y el segundo la función de activación que usa la capa.

## obtener  información de la  red

~~~ JavaScript
lian.info()
~~~
se utiliza la funcion ***info*** para mostrar la informacion en la terminal

## guardar información de la red y replicar otra red
### guardar información de la red
~~~ JavaScript
lian.saveCofig("jinnData")
~~~
***saveCofig*** se usa para guardar la información de la red, el primer parámetro es nombre del archivo **(sin la terminación en .json)**


## replicar otra red
~~~ JavaScript
lian.mirror("jinnData")
~~~
***mirror*** se usa para replicar la configuración de otra red, el primer parámetro es nombre del archivo **(sin la terminación en .json)**

## funciones de activación
se proporcionan **5 funciones de activación**
+ relu, da 0 si el resultado es negativo, si no es negativo devuelve el input
+ leaky relu, a relu se le aplicara un sesgo de 0.01 en caso de que la entrada sea negativa
+ step si el número es positivo devuelve 1, sí no 0, es binario
+ logistica
+ Tangente hiperbólica (TAHN)