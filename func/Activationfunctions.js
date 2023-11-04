const logError = require("../colors/bidanColors").logError;

const step = (Input) => {
    if (typeof Input === "number") {
        if (Input >= 0) {
            return 1;
        } else {
            return 0;
        }
    } else {
        logError("Bidan error 003: la función de activación <<Step>> no obtuvo un valor numérico");
    }
};

const stepDerivative = (Input) => {
    if (typeof Input === "number") {
        return 0; // Derivada de Step es 0 en casi todos los puntos
    } else {
        logError("Bidan error 003: la derivada de la función de activación <<Step>> no obtuvo un valor numérico");
    }
};

const relu = (Input) => {
    if (typeof Input === "number") {
        if (Input > 0) {
            return Input;
        } else {
            return 0;
        }
    } else {
        logError("Bidan error 003: la función de activación <<Relu>> no obtuvo un valor numérico");
    }
};

const reluDerivative = (Input) => {
    if (typeof Input === "number") {
        return Input > 0 ? 1 : 0; // Derivada de Relu es 1 si Input > 0, de lo contrario 0
    } else {
        logError("Bidan error 003: la derivada de la función de activación <<Relu>> no obtuvo un valor numérico");
    }
};

const leakyrule = (Input) => {
    if (typeof Input === "number") {
        if (Input > 0) {
            return Input;
        } else {
            return 0.01 * Input;
        }
    } else {
        logError("Bidan error 003: la función de activación <<Leakyrule>> no obtuvo un valor numérico");
    }
};

const leakyruleDerivative = (Input) => {
    if (typeof Input === "number") {
        return Input > 0 ? 1 : 0.01; // Derivada de Leakyrule es 1 si Input > 0, de lo contrario 0.01
    } else {
        logError("Bidan error 003: la derivada de la función de activación <<Leakyrule>> no obtuvo un valor numérico");
    }
};

const sigmoid = (Input) => {
    if (typeof Input === "number") {
        return 1 / (1 + (Math.E ** -Input));
    } else {
        logError("Bidan error 003: la función de activación <<Sigmoid>> no obtuvo un valor numérico");
    }
};

const sigmoidDerivative = (Input) => {
    if (typeof Input === "number") {
        const sigmoidValue = 1 / (1 + (Math.E ** -Input));
        return sigmoidValue * (1 - sigmoidValue); // Derivada de Sigmoid
    } else {
        logError("Bidan error 003: la derivada de la función de activación <<Sigmoid>> no obtuvo un valor numérico");
    }
};

const tanh = (Input) => {
    if (typeof Input === "number") {
        return ((Math.E ** Input) - (Math.E ** -Input)) / ((Math.E ** Input) + (Math.E ** -Input));
    } else {
        logError("Bidan error 003: la función de activación <<Tanh>> no obtuvo un valor numérico");
    }
};

const tanhDerivative = (Input) => {
    if (typeof Input === "number") {
        const tanhValue = ((Math.E ** Input) - (Math.E ** -Input)) / ((Math.E ** Input) + (Math.E ** -Input));
        return 1 - (tanhValue ** 2); // Derivada de Tanh
    } else {
        logError("Bidan error 003: la derivada de la función de activación <<Tanh>> no obtuvo un valor numérico");
    }
};

const NotApplicable = (i) => {
    return i;
};

const NotApplicableDerivative = (i) => {
    return 1; // Derivada de NotApplicable es 1
};


const funcions = [
    step,
    relu,
    leakyrule,
    sigmoid,
    tanh,
    NotApplicable
]

const derivative = [
    stepDerivative,
    reluDerivative, 
    leakyruleDerivative,
    sigmoidDerivative,
    tanhDerivative,
    NotApplicableDerivative,
]

module.exports = {
    funcions,
    step,
    relu,
    leakyrule,
    sigmoid,
    tanh,
    NotApplicable,
    derivative,
    stepDerivative,
    reluDerivative, 
    leakyruleDerivative,
    sigmoidDerivative,
    tanhDerivative,
    NotApplicableDerivative,
}