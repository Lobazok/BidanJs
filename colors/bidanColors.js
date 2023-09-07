const Cilan = require("./colors")


const logError = (error) => {
     console.log(Cilan.red(Cilan.italic(Cilan.bold(error))))
}

const warn = (text) => {
    return (Cilan.red(text))
}

const LyInputTitle = (text) => {
    return (Cilan.blue(Cilan.bold(text)))
}

const LyInput = (text) => {
    return (Cilan.blue(text))
}

const Ly = (text) => {
    return (Cilan.cyan(text))
}

const Lymin = (text) => {
    return (Cilan.cyan(Cilan.italic(text)))
}
const LyminTitle = (text) => {
    return (Cilan.cyan(Cilan.dim(Cilan.bold(text))))
}
const LyTitle = (text) => {
    return (Cilan.cyan(Cilan.bold(text)))
}

const LyOutput = (text) => {
    return (Cilan.green(text))
}

const LyTitleOutput = (text) => {
    return (Cilan.green(Cilan.bold(text)))
}

const save = (text) => {
    return (Cilan.inverse(Cilan.green(Cilan.bold(text))))
}

const mirror = (text) => {
    return (Cilan.inverse(Cilan.cyan(Cilan.bold(text))))
}

const initC = (text) => {
    return (Cilan.inverse(Cilan.blue(text)))
}

const resu = (text) => {
    return (Cilan.inverse(Cilan.magenta(Cilan.italic(text))))
}

const expe = (text) => {
    return (Cilan.yellow(Cilan.inverse(Cilan.italic(text))))
}
const update = (text) => {
    return (Cilan.blue(Cilan.inverse(Cilan.italic(text))))
}
const nuevo = (text) => {
    return (Cilan.blue(Cilan.inverse(Cilan.bold(Cilan.italic(text)))))
}
const performance = (PerformaceAgentCurrent, text = "Performace: ") => {
    let red = Math.floor((1 - PerformaceAgentCurrent) * 255);
    let green = Math.floor(PerformaceAgentCurrent * 255);

    return (Cilan.color(text + PerformaceAgentCurrent + "%", red, green, 0));
}
module.exports = {
    logError: logError,
    warn: warn,
    LyInputTitle: LyInputTitle,
    LyInput: LyInput,
    Ly: Ly,
    Lymin: Lymin,
    LyTitle: LyTitle,
    LyOutput: LyOutput,
    LyTitleOutput: LyTitleOutput,
    save: save,
    mirror: mirror,
    initC: initC,
    resu: resu,
    expe: expe,
    update: update,
    new: nuevo,
    performance: performance,
    LyminTitle : LyminTitle
}