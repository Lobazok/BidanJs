# errores


En este artículo se recopilan todos los errores posibles, estos errores son por el mal uso de las funciones.
Se habla de qué funciones dan estos errores y cómo solucionarlos.
## Índice
+ formato
+ Neuralnetwork
   - Abreviaciones


## formato
El formato de errores en Bidanjs es el siguiente.


Nombre de la clase + Número de error + Abreviación de la función que provocó el error + Descripción del error




## Neuralnetwork
Esta sección recopila los errores que se pueden dar en la clase Neuralnetwork(archivo bidan).


> Nombre de la clase: Bidan


### Abreviaciones


+ LaInCo: LayerInputConfig
+ LaHiCo: LayersConfig
+ LaOuCo: LayerOutputConfig
+ rM    : readMirror
+ m     : mirror
+ in    : info
+ iC    : initConnections
+ SP    : StartPrediction
+ rW    : readWeights




### Bidan error 000
Este error indica que se **intento ejecutar la red** pero por ****fallos en su configuración** no se pudo ejecutar.
Este **generalmente va acompañado** de otros errores, generalmente errores **001**, **003**, **004** y **005**.
Para solucionar este error debes introducir una configuración válida de capas.


Funciones que pueden dar este error:
+ info
+ initConnections


#### Posibles variaciones
Las posibles variaciones son 7.
+ *Bidan error 000 in: Configuration error in input layer*  | error en ***info***, fallo en la **capa de entrada**.
+ *Bidan error 000 in: Hidden layers configuration error*   | error en ***info***, fallo en las **capas ocultas**.
+ *Bidan error 000 in: Configuration error in output layer* | error en ***info***, fallo en la **capa de salida**.
+ *Bidan error 000 iC: Configuration error in input layer*  | error en ***initConnections***, las conexiones no se pudieron formar, fallo en la **capa de entrada**.
+ *Bidan error 000 iC: Hidden layers configuration error*  | error en ***initConnections***, las conexiones no se pudieron formar, fallo en las **capa ocultas**.
+ *Bidan error 000 iC: Configuration error in output layer*  | error en ***initConnections***, las conexiones no se pudieron formar, fallo en la **capa de salida**.
+ *Bidan error 000 iC: Multi-layer configuration error"*  | error en ***initConnections***, las conexiones no se pudieron formar, fallo en múltiples capas.


### Bidan error 001
Este error indica que **se intentó configurar** una capa con un **valor no interpretable**, las** funciones de configuración de capas** son aceptan **valores numéricos naturales(Conjunto Natural)** como número de neuronas(**no confundir** con **usar arrays** para indicar múltiples capas).
**Para solucionar** este error debes introducir una **configuración válida** de capas.
Algunos errores **indican la capa oculta** que está mal configurada.


Funciones que pueden dar este error:
+ LayerInputConfig
+ LayersConfig
+ LayerOutputConfig


#### Posibles variaciones
Las posibles variaciones son 8.
+ *Bidan error 001 LaInCo: The input layer was not assigned a number of neurons* | error en ***LayerInputConfig***, **no se asignó** un valor al número de neuronas de la capa de entrada. **asigne un valor numérico natural**
+ *Bidan error 001 LaInCo: An invalid value was assigned to the number of neurons in the input layer* | error en ***LayerInputConfig***, se asignó un **valor invalido** en la capa de entrada. **asigne un valor numérico natural**
+ *Bidan error 001 LaHiCo: No hidden layers were assigned* | error en ***LayersConfig***, **no se asignó** un valor al número de neuronas de la capa oculta. **asigne un valor numérico natural o un array de valores numéricos naturales**
+ *Bidan error 001 LaHiCo: An invalid value was assigned on hidden layers* | error en ***LayersConfig***, se asignó un **valor invalido** al número de neuronas de la capa oculta. **asigne un valor numérico natural o un array de valores numéricos naturales**
+ *Bidan error 001 LaHiCo: In the [Número De Capa(recuerda que se empieza a contar desde el 0 como es un array)] layer is not assigned a number of neurons* | **no se asignó un valor** al número de neuronas de la capa oculta indicada. **asigne un valor numérico natural a la capa indicada**
+ *Bidan error 001 LaHiCo:An invalid value was assigned to the number of neurons in layer [Número De Capa(recuerda que se empieza a contar desde el 0 como es un array)]* | error en ***LayersConfig***, se asignó un **valor invalido** al número de neuronas de la capa oculta indicada **asigne un valor numérico natural a la capa indicada**
+ *Bidan error 001 LaOuCo: The output layer was not assigned a number of neurons* | error en ***LayerOutputConfig***, **no se asignó** un valor al número de neuronas de la capa de salida. **asigne un valor numérico natural**
+ Bidan error 001 LaOuCo: An invalid value was assigned to the number of neurons in the output layer* | error en ***LayerOutputConfig***, se asignó un **valor invalido** en la capa de salida. **asigne un valor numérico natural**


En el caso de la función ***config*** Es especial, esta función llama a las otras funciones, entonces el error es asociado a la función que recibió un valor invalido.


Pero sigue la misma lógica
+ Abreviacion LaInCo, el fallo esta en el primer parámetro
+ Abreviación LaHiCo, el fallo está en el tercer parámetro
+ Abreviación LaOuCo, el fallo está en el sexto parámetro


### Bidan error 003
Cuando se introduce un valor numérico pero que este no es natural como configuración de número de neuronas se provoca este error, puede ser porque se introdujo un número negativo o se introdujo cero.
introduzca un número natural en la configuración de capas.


#### Posibles variaciones
Las posibles variaciones son 8.


+ *"Bidan error 003 LaInCo: The input layer is assigned zero neurons* | error en ***LayerInputConfig***, se asignó cero neuronas a la capa de entrada. **asigne un valor numérico natural**.


+ *Bidan error 003 LaInCo: The input layer is assigned a negative number of neurons* | error en ***LayerInputConfig***, se asignó un número negativo de neuronas en la capa de entrada. **asigne un valor numérico natural**.


+ *Bidan error 003 LaHiCo: The [Número De Capa(recuerda que se empieza a contar desde el 0 como es un array)] layer was assigned zero neurons* | error en ***LayersConfig***, se asignó cero neuronas a la capa oculta indicada. **asigne un valor numérico natural**.


+  *Bidan error 003 LaHiCo: The [Número De Capa(recuerda que se empieza a contar desde el 0 como es un array)] layer was assigned a negative number of neurons* | error en ***LayersConfig***, se asignó cero neuronas a la capa oculta. **asigne un valor numérico natural**


+ *Bidan error 003 LaHiCo: The hidden layer was assigned zero neurons* | error en ***LayersConfig***, se asignó cero neuronas a la capa oculta. **asigne un valor numérico natural**.


+ *Bidan error 003 LaHiCo: The hidden layer was assigned a negative number of neurons | error en ***LayerOutputConfig***, se asignó cero neuronas a la capa de oculta. **asigne un valor numérico natural**


+ *Bidan error 003 LaOuCo: The output layer is assigned a negative number of neurons* | error en ***LayerOutputConfig***, se asignó cero neuronas a la capa de salida. **asigne un valor numérico natural**


+ *Bidan error 003 LaOuCo: The output layer is assigned a negative number of neurons* | error en ***LayerOutputConfig***, se asignó un número negativo de neuronas en la capa de salida. **asigne un valor numérico natural**


En el caso de la función ***config*** Es especial, esta función llama a las otras funciones, entonces el error es asociado a la función que recibió un valor invalido.


Pero sigue la misma lógica
+ Abreviación LaInCo, el fallo está en el primer parámetro
+ Abreviación LaHiCo, el fallo está en el tercer parámetro
+ Abreviación LaOuCo, el fallo está en el sexto parámetro


### Bidan error 004
Cuando se da una ruta incorrecta a una función que lee un archivo se genera este error. Compruebe la ruta introducida.




Funciones que pueden dar este error:
+ readMirror
+ readWeights


#### Posibles variaciones
Las posibles variaciones son 4.
+ *Bidan error 004 rM: In readMirror the file path was not specified* | error en ***readMirror***, la ruta no fue introducida. introduzca una ruta.
+ *Bidan error 004 rM: In readmirror the file path is not a string* | error en ***readMirror***, la ruta no fue introducida como un tipo válido. introduzca una ruta en cadena de texto.
+ *Bidan error 004 rW: In readWeights the file path was not specified* | error en ***readWeights***, la ruta no fue introducida. introduzca una ruta.
+ *Bidan error 004 rW: In readWeights the file path is not a string* | error en ***readWeights***, la ruta no fue introducida como un tipo válido. introduzca una ruta en cadena de texto.


### Bidan error 005
Este error es provocado por que se **intentó reproducir una red** con un **archivo o información corrupta o sin el formato adecuado**. este error es **bastante grave**. se **recomienda** volver a descargar la información o si es posible volver a **generar la información**. puede ser que el archivo se **corrompió**, **fue manipulado**, o se **forzó a generar** información en un estado invalido.


Funciones que pueden dar este error:
+ readMirror
+ mirror


#### Posibles variaciones
Las posibles variaciones son 2.
+ *Bidan error 005 rM: The data on readmirror is corrupt* | este error es provocado por la función ***mirror*** cuando recibe información en un **formato invalido**.
+ *Bidan error 005 rM: The file on readmirror is corrupt* |  este error es provocado por la función ***readMirror*** cuando intenta leer un archivo** sin el formato adecuado**.


### Bidan error 006
Este error es provocado cuando se intenta leer un archivo inexistente. Compruebe que el archivo existe y tiene la terminación correcta.


Funciones que pueden dar este error:
+ readMirror
+ readWeights


#### Posibles variaciones
Las posibles variaciones son e.
+ *Bidan error 006 rM: In readmirror the file does not exist* | se intentó leer un archivo inexistente
+ *Bidan error 006 rW: In readWeights the file does not exist* | se intentó leer un archivo inexistente
### Bidan error 007
Este error indica que se intentó hacer una predicción pero el valor de entrada fue invalido. El valor de entrada puede ser un array pero debe ser de la misma longitud que la capa de entrada. Solo si en la capa de entrada hay una  neurona el valor puede ser un número.
La función que puede dar este error es ***StartPrediction***


#### Posibles variaciones
Las posibles variaciones son 4.
+ *Bidan error 007 SP: in StartPrediction the data is not assigned* | Este error indica que los valores de entrada no fueron definidos o son undefined. **asigne un valor**
+ *Bidan error 007 SP: in StartPrediction the data is neither array nor numbers* | Este error indica que el valor introducido es de un tipo invalido.**comprueba el tipo de dato introducido, valores numéricos y arrays de valores numéricos**
+ *Bidan error 007 SP: in StartPrediction the data is a number but does not fit with the number of input neurons* | Este error indica que se introdujo un número como valor de entrada pero hay más de una neurona en la capa de entrada. **introduzca en su lugar un array que coincida con el número de neuronas**
+ *Bidan error 007 SP: in StartPrediction the data is an array but does not match the number of input layer neurons* Este error indica que se introdujo un array que su longitud no coincide con la cantidad de neuronas en la capa de entrada. **introduzca un array que coincida con el número de neuronas**