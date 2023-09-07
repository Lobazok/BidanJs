const {logError} = require("../colors/bidanColors")

const step = (Input) => {
    if (typeof Input == "number") {
        if (Input >= 0) {
            return 1
        } else return 0
    } else logError("Bidan error 003: la funcion de activacion <<Step>> no obtuvo un valor numerico")
}

const relu = (Input) => {
    if (typeof Input == "number") {
        if (Input > 0) {
            return Input
        } else return 0
    } else logError("Bidan error 003: la funcion de activacion <<Relu>> no obtuvo un valor numerico")
}

const leakyrule = (Input) => {
    if (typeof Input == "number") {
        if (Input > 0) {
            return Input
        } else return 0.01 * Input
    } else logError("Bidan error 003: la funcion de activacion <<leakyrule>> no obtuvo un valor numerico")
}


const sigmoid = (Input) => {
    if (typeof Input == "number") {
        return 1 / (1 + (Math.E ** -Input))
    } else logError("Bidan error 003: la funcion de activacion <<sigmoid>> no obtuvo un valor numerico")
}

const tanh = (Input) => {
    if (typeof Input == "number") {
        return ((Math.E ** Input) - (Math.E ** -Input)) / ((Math.E ** Input) + (Math.E ** -Input))
    } else logError("Bidan error 003: la funcion de activacion <<tanh>> no obtuvo un valor numerico")
}

const NotApplicable = (i) => {
    return i;
}

const funcions = [
    step,
    relu,
    leakyrule,
    sigmoid,
    tanh,
    NotApplicable
]

module.exports = {
    funcions,
    step,
    relu,
    leakyrule,
    sigmoid,
    tanh,
    NotApplicable
}