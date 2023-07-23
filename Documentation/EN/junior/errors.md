# errors


All possible errors are collected in this article, these errors are due to misuse of functions.
It talks about what functions give these errors and how to fix them.
## Index
+ Format
+ Neuralnetwork
   - abbreviations


## Format
The format of errors in Bidanjs is as follows.


Class name + Error number + Abbreviation of the function that caused the error + Description of the error




## Neuralnetwork
This section collects the errors that can occur in the classNeuralnetwork(bidan file).


> Class Name: Bidan


### Abbreviations


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
This error indicates that**try to run the network** but for****failures in your configuration** could not be executed.
It is**usually accompanied** of other errors, usually errors**001**, **003**, **004** and**005**.
To fix this error you must enter a valid layer configuration.


Functions that can give this error:
+ info
+ initConnections


#### Possible Variations
The possible variations are 7.
+ *Bidan error 000 in: Configuration error in input layer*  | error in***info***, failure in the**input layer**.
+ *Bidan error 000 in: Hidden layers configuration error*   | error in***info***, failure in the**hidden layers**.
+ *Bidan error 000 in: Configuration error in output layer* | error in***info***, failure in the**output layer**.
+ *Bidan error 000 iC: Configuration error in input layer*  | error in***initConnections***, connections could not be formed, failed**input layer**.
+ *Bidan error 000 iC: Hidden layers configuration error*  | error in***initConnections***, connections could not be formed, failed connections**hidden layer**.
+ *Bidan error 000 iC: Configuration error in output layer*  | error in***initConnections***, connections could not be formed, failed**output layer**.
+ *Bidan error 000 iC: Multi-layer configuration error"*  | error in***initConnections***, connections could not be formed, multilayer failure.


### Bidan error 001
This error indicates that**attempted to configure** a cape with a**valor no interpretable**, the ** layer configuration functions ** are accepted**Natural Numerical Values(Natural Set)** as number of neurons(**don't confuse** with**use arrays** to indicate multiple layers).
**To solve** this error you must enter a**valid configuration** of layers.
Some errors**indicates the hidden layer** which is misconfigured.


Functions that can give this error:
+ LayerInputConfig
+ LayersConfig
+ LayerOutputConfig


#### Possible Variations
The possible variations are 8.
+ *Bidan error 001 LaInCo: The input layer was not assigned a number of neurons* | error in***LayerInputConfig***, **not assigned** a value to the number of neurons in the input layer.**assign a natural numerical value**
+ *Bidan error 001 LaInCo: An invalid value was assigned to the number of neurons in the input layer* | error in***LayerInputConfig***, was assigned a**invalid value** in the input layer.**assign a natural numerical value**
+ *Bidan error 001 LaHiCo: No hidden layers were assigned* | error in***LayersConfig***, **not assigned** a value to the number of neurons in the hidden layer.**assign a natural numeric value or an array of natural numeric values**
+ *Bidan error 001 LaHiCo: An invalid value was assigned on hidden layers* | error in***LayersConfig***, was assigned a**invalid value** to the number of neurons in the hidden layer.**assign a natural numeric value or an array of natural numeric values**
+ *Bidan error 001lahico: In the [Layer Number (remember that it starts counting from 0 as it is an array)] layer is not assigned a number of neurons* | **no value assigned** to the number of neurons in the indicated hidden layer.**assign a natural numerical value to the indicated layer**
+ *Bidan error 001lahico:An invalid value was assigned to the number of neurons in layer [Layer Number (remember that it starts counting from 0 as it is an array)]* | error in***LayersConfig***, was assigned a**invalid value** to the number of neurons in the indicated hidden layer**assign a natural numerical value to the indicated layer**
+ *Bidan error 001 LaOuCo: The output layer was not assigned a number of neurons* | error in***LayerOutputConfig***, **not assigned** a value to the number of neurons in the output layer.**assign a natural numerical value**
+ Bidan error 001 LaOuCo: An invalid value was assigned to the number of neurons in the output layer* | error en ***LayerOutputConfig***, was assigned a**invalid value** in the output layer.**assign a natural numerical value**


In the case of the function***config*** It is special, this function calls the other functions, so the error is associated with the function that received an invalid value.


But follow the same logic
+ Abbreviation LaInCo, the fault is in the first parameter
+ Abbreviationlahico, the error is in the third parameter
+ AbbreviationLaOuCo, the error is in the sixth parameter


### Bidan error 003
When a numerical value is entered but it is not natural as a configuration of the number of neurons, this error is caused, it may be because a negative number was entered or zero was entered.
enter a natural number in the layer settings.


#### Possible Variations
The possible variations are 8.


+ *"Bidan error 003 LaInCo: The input layer is assigned zero neurons* | error in***LayerInputConfig***, zero neurons were assigned to the input layer.**assign a natural numerical value**.


+ *Bidan error 003 LaInCo: The input layer is assigned a negative number of neurons* | error in***LayerInputConfig***, a negative number of neurons was assigned in the input layer.**assign a natural numerical value**.


+ *Bidan error 003lahico: The [Layer Number (remember that it starts counting from 0 as it is an array)] layer was assigned zero neurons* | error in***LayersConfig***, zero neurons were assigned to the indicated hidden layer.**assign a natural numerical value**.


+  *Bidan error 003lahico: The [Layer Number (remember that it starts counting from 0 as it is an array)] layer was assigned a negative number of neurons* | error in***LayersConfig***, zero neurons were assigned to the hidden layer.**assign a natural numerical value**


+ *Bidan error 003 LaHiCo: The hidden layer was assigned zero neurons* | error in***LayersConfig***, zero neurons were assigned to the hidden layer.**assign a natural numerical value**.


+ *Bidan error 003 LaHiCo: The hidden layer was assigned a negative number of neurons | error en ***LayerOutputConfig***, zero neurons were assigned to the hidden layer.**assign a natural numerical value**


+ *Bidan error 003 LaOuCo: The output layer is assigned a negative number of neurons* | error in***LayerOutputConfig***, zero neurons were assigned to the output layer.**assign a natural numerical value**


+ *Bidan error 003 LaOuCo: The output layer is assigned a negative number of neurons* | error in***LayerOutputConfig***, a negative number of neurons was assigned in the output layer.**assign a natural numerical value**


In the case of the function***config*** It is special, this function calls the other functions, so the error is associated with the function that received an invalid value.


But follow the same logic
+ Abbreviation LaInCo, the fault is in the first parameter
+ Abbreviation Lahico, the error is in the third parameter
+ Abbreviation LaOuCo, the error is in the sixth parameter


### Bidan error 004
When a function that reads a file is given an incorrect path, this error is generated. Check the entered path.




Functions that can give this error:
+ readMirror
+ readWeights


#### Possible Variations
The possible variations are 4.
+ *Bidan error 004 rM: In readMirror the file path was not specified* | error in***readMirror***, the path was not entered. enter a path.
+ *Bidan error 004 rM: In readmirror the file path is not a string* | error in***readMirror***, path was not entered as a valid type. enter a string path.
+ *Bidan error 004 rW: In readWeights the file path was not specified* | error in***readWeights***, the path was not entered. enter a path.
+ *Bidan error 004 rW: In readWeights the file path is not a string* | error in***readWeights***, path was not entered as a valid type. enter a string path.


### Bidan error 005
This error is caused by**tried to play a network** with a**corrupted or improperly formatted file or data**. this error is**pretty serious**. with**recommends** re-download the information or if possible re-download**generate the information**. it may be that the file is**corrupted**, **was tampered with**, o se**forced to spawn** information in an invalid state.


Functions that can give this error:
+ readMirror
+ mirror


#### Possible Variations
The possible variations are 2.
+ *Bidan error 005 rM: The data on readmirror is corrupt* | this error is caused by the function***mirror*** when you receive information in a**invalid format**.
+ *Bidan error 005 rM: The file on readmirror is corrupt* | this error is caused by the function***readMirror*** when trying to read a file** without the proper format**.


### Bidan error 006
This error is caused when trying to read a non-existent file. Check that the file exists and has the correct ending.


Functions that can give this error:
+ readMirror
+ readWeights


#### Possible Variations
Possible variations are e.
+ *Bidan error 006 rM: In readmirror the file does not exist* | an attempt was made to read a non-existent file
+ *Bidan error 006 rW: In readWeights the file does not exist* | an attempt was made to read a non-existent file
### Bidan error 007
This error indicates that an attempt was made to make a prediction but the input value was invalid. The input value can be an array but it must be the same length as the input layer. Only if there is a neuron in the input layer can the value be a number.
The function that can give this error is***StartPrediction***


#### Possible Variations
The possible variations are 4.
+ *Bidan error 007 SP: in StartPrediction the data is not assigned* | This error indicates that the input values ​​were not defined or areundefined. **assign a value**
+ *Bidan error 007 SP: in StartPrediction the data is neither array nor numbers* | This error indicates that the entered value is of an invalid type.**checks the type of data entered, numeric values ​​and arrays of numeric values**
+ *Bidan error 007 SP: in StartPrediction the data is a number but does not fit with the number of input neurons* | This error indicates that a number was entered as an input value but there is more than one neuron in the input layer.**enter an array that matches the number of neurons instead**
+ *Bidan error 007 SP: in StartPrediction the data is an array but does not match the number of input layer neurons* This error indicates that aarray what its length does not match the number of neurons in the input layer.**enter an array that matches the number of neurons**


