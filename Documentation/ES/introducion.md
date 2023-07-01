# introducción


**Módulo de JavaScript** para el desarrollo de **inteligencias artificiales**.


Enfocado en la **simplicidad** de uso, usa **Programación Orientada a Object (POO)** y empaqueta todas las funcionalidades necesarias para su uso.


Se **requiere de nodeJs** para ejecutarlo

---

## Índice
+ Estructura de la documentación
+ Instalación y NPM
+ Inicialización
   - Configuración
+ Guardar información de la red y replicar otra red
   - Guardar información de la red
   - Replicar otra red
+ Pesos, conexiones, entradas y salidas
   - Conexiones
      * Reset
   - Pesos
      * Iniciar pesos de manera aleatoria
      * Guardar pesos
      * Usar pesos
   - Entradas
   - Salidas
      * Función Output
      * Función OutputLog
   - Funciones de activación
   - Algoritmos de entrenamiento
      * Algoritmo evolutivo
        - Performace Logger Genetic
        - BidanJs Genetic analysis panel
        - Genetic composer

---
## estructura de la documentación
La documentación se divide en secciones, Junior para entender cómo usar el módulo, SemiSenior para especializarse, mejorar en el uso del módulo y Senior para entender cómo funciona internamente el módulo.

También se divide en artículos, para funciones, algoritmos de aprendizaje, manejo de archivos, entre otros

---

## instalación y NPM
Está el módulo en npm, se instala con

~~~
npm i bidanjs
~~~

---

## inicialización  

Para inicializar el **archivo en el cual se trabajara**, se debe **importar** todos los **módulos y archivos necesarios**, **necesariamente se deben** importar el **modulo de NPM** y las funciones de activación que se usaran
~~~ JavaScript
const bidan = require("bidanjs")

const { relu, sigmoid } = require("bidanjs/Activationfunctions.js")
~~~

Se **importa** ***BidanJs*** y las ***funciones de activación*** que se usarán.



~~~ JavaScript
var lian = new bidan.Neuralnetwork()
~~~

Se crea un nuevo objecto de tipo Neuralnetwork y se configura

### configuración de capas

En ***BidanJs*** se **configuran las capas** con **funciones**, se configura el **numero de neuronas** y las **funciones de activación**.
#### función config de cada capa

~~~ JavaScript
lian.LayerInputConfig(2, sigmoid)
lian.LayersConfig([3,4,2], relu)
lian.LayerOutputConfig(4, sigmoid)
~~~


+ LayerInputConfig para la configuración de capa de entrada, el primer parámetro es la cantidad de neuronas en forma de número y el segundo la función de activación que usa la capa.

+ LayersConfig para la configuración de las capas ocultas, el primer parámetro si es un array es la cantidad de neuronas de cada capa, cada elemento del array es una capa y si se recibe como número será una sola capa con la cantidad de neuronas específicas, el segundo la función de activación que usa la capa.

+ LayerOutputConfig para la configuración de capa de salida, el primer parámetro es la cantidad de neuronas en forma de número y el segundo la función de activación que usa la capa.

#### función config  general
Alternativamente a configurar las capas con funciones por separado, se puede configurar todas las capas con una misma función llamada ***config***.

~~~ JavaScript
lian.config(2, sigmoid, [3,4,2], relu, 4, sigmoid)
~~~


#### obtener información de la red
Para obtener la información de la configuración de la red se utiliza ***info***, imprime la información en la terminal.
~~~ JavaScript
lian.info()
~~~

---

## guardar información de la red y replicar otra red
En esta sección se muestran las funciones relacionadas con guardar y leer configuración.

### guardar información de la red

#### saveCofig
Esta función se utiliza para guardar directamente la configuración de la red. necesita el nombre del archivo **(sin la terminación de .json)**.
Un único parámetro
~~~ JavaScript
lian.saveCofig("lianConfig")
~~~

#### readCofig
Alternativamente se puede utilizar ***readConfig*** que devuelve un **JSON** no acepta parámetros, solo **devuelve la configuración**
~~~ JavaScript
lian.readCofig()
~~~


### replicar otra red

#### readMirror
Para **leer directamente** una **configuración de otro red** y **replicarla** se utiliza ***readMirror***, requiere la ruta del archivo **(sin la terminación de .json)**.
~~~ JavaScript
lian.readMirror("lianConfig")
~~~

#### mirror
Alternativamente para replicar otra red sin leer el archivo directamente se utiliza ***mirror*** , requiere la información en **formato JSON**
~~~ JavaScript
lian.mirror(data)
~~~


## pesos, conexiones, entradas y salidas

### conexiones
Para **trasar las conexiones entre neuronas** se **requiere** de usar una funcion.
La función para **iniciar las conexiones** entre las neuronas es ***initConnections***. la función **puede aceptar un parámetro** para **imprimir o no** un mensaje que **informe de la inicialización** de las conexiones, **por defecto** se imprime.
~~~ JavaScript
lian.initConnections()
// Se imprime el mensaje
~~~

~~~ JavaScript
lian.initConnections(false)
//No se imprime el mensaje
~~~

#### reset
Por la naturaleza de ***BidanJs*** se almacenan los valores que se fueron dados como Input, para poder recordar el OutPut conseguido, para eliminar esos remanentes de información se debe usar una función para limpiar la memoria interna. esta función es ***reset***.
~~~ JavaScript
lian.reset()
~~~

### pesos
Los pesos o parámetros son fundamentales para el funcionamiento del modelo
#### iniciar pesos de manera aleatoria
Para iniciar los pesos de manera aleatoria se utiliza la función ***initWeights***, esta función no requiere de ningún parámetro. esta función se usa en las primeras fases del entrenamiento, cuando se necesitan modelos aleatorios para perfeccionarlos.Para iniciar los pesos de manera aleatoria se utiliza la función ***initWeights***, esta función no requiere de ningún parámetro. esta función se usa en las primeras fases del entrenamiento, cuando se necesitan modelos aleatorios para perfeccionarlos.

~~~ JavaScript
lian.initWeights()
~~~


#### guardar pesos

##### saveWeigths
Para guardar directamente la configuración de pesos del modelo se usa la función ***saveWeigths***, requiere la ruta donde se guardara, el nombre del archivo **no debe tener la terminación de .json**. si el archivo ya existe se remplaza el archivo.
~~~ JavaScript
lian.saveWeigths(`./data/lianPesos${0}`)
~~~

##### getWeigths
Alterativamente se puede **obtener la configuración** en **formato JSON**, se usa para guardar los pesos sin la necesidad de necesariamente guardar un archivo, se usa la función ***getWeigths*** que no acepta ningún parámetro.
~~~ JavaScript
lian.getWeigths()
~~~

#### usar pesos
Estas funciones se usan para **leer la configuración de pesos**.
##### readWeights
Para leer directamente la configuración de pesos se utiliza la función ***readWeights***, esta función **requiere de la ruta del archivo, sin la terminación .json**. es una función multifase se puede utilizar cuando se entrena y en producción.
~~~ JavaScript
lian.readWeights(`./data/lianPesos0`)
~~~


##### useWeights
Alternativamente se puede usar la función ***useWeights*** que requiere de la información en formato **JSON**
~~~ JavaScript
lian.useWeights(data)
~~~

### entradas
Para **iniciar la predicción** y dar el input se utiliza la función ***StartPrediction***, el **input debe ser un array**, **su longitud** debe ser igual a la cantidad de **neuronas de la capa de entrada**, **todos sus datos deben ser números**, ya que **cada parámetro del array** será la **entrada de una neurona**, también tiene un **segundo parámetro** que indica si se **imprime un mensaje avisando** que se **inicia la predicción**, **por defecto se imprime**.
~~~ JavaScript
lian.StartPrediction(input)
// Se imprime el mensaje
~~~

~~~ JavaScript
lian.StartPrediction(input, false)
//No se imprime el mensaje
~~~


### Salidas
Despues de la predicion se almacena el OutPut, para acceder u obtener el OutPut se debe usar funciones 
#### función Output
La función ***Output***  funciona para obtener el OutPut, devuelve un array que son las salidas de todas las neuronas de la capa de salida, no requiere de ningún parámetro.
~~~ JavaScript
lian.Output()
~~~

#### función OutputLog
La única diferencia de la función ***OutputLog*** con la función ***Output** es que la función ***OutputLog** imprime en la terminal el **Output**.
~~~ JavaScript
lian.OutputLog()
// Se imprime el Output
~~~
 
---

## funciones de activación

se proporcionan **5 funciones de activación**

+ relu (Rectified Linear Unit), da 0 si el resultado es negativo, si no es negativo devuelve el input  

$$
r(x) =
\begin{cases}
0 & \text{si } x <= 0 \\
x & \text{si } x > 0
\end{cases}
$$


+ leaky relu, a relu se le aplicará un sesgo de 0.01 en caso de que la entrada sea negativa


$$
l(x) =
\begin{cases}
0.01x & \text{si } x <= 0 \\
x & \text{si } x > 0
\end{cases}
$$


+ step si el número es positivo devuelve 1, sí no 0, es binario


$$
s(x) =
\begin{cases}
0 & \text{si } x <= 0 \\
1 & \text{si } x > 0
\end{cases}
$$


+ sigmoid


$$
s(x) =\frac{1}{1 + e^{-x}}
$$


+ Tangente hiperbólica (TAHN)


$$
t(x) = \frac{e^x - e^{-x}}{e^x + e^{-x}}
$$

## algoritmos de entrenamiento
los *algoritmos de entrenamiento* disponibles actualmente(v0.9.0) en bidanjs es el algoritmo genético, en futuras actualizaciones se añadirán  mas algoritmos de entrenamiento


### algoritmo evolutivo
el **algoritmo genético en bidanjs** se implementa usando el ***performace Logger Genetic***, el ***BidanJs Genetic analysis panel*** y el ***Genetic composer***

#### performace Logger Genetic
registra el rendimiento de los agentes, lo procesa y lo guarda en archivos *json*

#### BidanJs Genetic analysis panel
aplicación  de terminal para analizar el rendimiento de los agentes, usa estadística  descriptiva

#### Genetic composer
el componente que se encarga de crear los archivos de pesos de las redes, mezcla los mejores genes y le agrega mutación