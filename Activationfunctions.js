const colors = require("colors/safe")
colors.setTheme({
    error: ["red", "italic", "bold"],
    warn: "red",
    LyInput: "blue",
    LyInputTitle: ["blue", "bold"],
    Ly: "cyan",
    LyTitle: ["cyan", "bold"],
    LyOutput: "green",
    LyTitleOutput: ["green", "bold"],
})

function logError(error) {
    console.log(colors.error(error))
}

const relu = (Input)=>{
    if(typeof Input == "number"){
        if(Input > 0){
            return Input
        }else return 0
    }else logError("Bidan error 003: la funcion de activacion <<Relu>> no obtuvo un valor numerico")
}

module.exports = {
    relu
}
