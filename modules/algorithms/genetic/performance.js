const colors = require("colors/safe")
const fs = require("fs")


colors.setTheme({
    error: ["red", "italic", "bold"],
    warn: "red",
    LyInputTitle: ["blue", "bold"],
    LyInput: "blue",
    Ly: "cyan",
    Lymin: ["cyan", "dim", "reset"],
    LyTitle: ["cyan", "bold"],
    LyOutput: "green",
    LyTitleOutput: ["green", "bold"],
    save: ["bgGreen", "bold"],
    mirror: ["bgCyan", "bold"],
    initC: ["bgBlue"],
    resu: ["brightMagenta", "italic"],
    expe: ["brightYellow", "italic"]
})

function logError(error) {
    console.log(colors.error(error))
}

class PerformanceLogger {
    constructor() {

        this.routeData = ""
        this.GenerationTotal = 0
        this.print = true

        //Current Generation
        this.GenerationCurrent = 0
        this.PerformanceCurrent = []
        this.PerformanceAverageCurrent = 0


        //Current Agent
        this.CurrentAgentName = ""
        this.cambiaEsteNombrePor = 0
        this.CurrentAgentPerformance = []
        this.CurrentAgentExperienced = []

        this.data = {

        }
    }

    config = (print) => {
        this.print = print
    }

    reset = () => {
        this.CurrentAgentName = ""
        this.CurrentAgentPerformance = []
        this.CurrentAgentExperienced = []
    }

    addGeneraction = (Generation) => {
        if (typeof Generation == "number") {
            if (Generation >= 0) {
                this.GenerationTotal += 1
                this.GenerationCurrent = Generation
            } else logError("Bidan Genetic Error 000: addGeneraction did not receive a valid numeric value")
        } else logError("Bidan Genetic Error 000: addGeneraction did not receive a valid numeric value")
    }

    initAgent = (Generation, name) => {
        this.reset()

        if (typeof Generation == "number" & typeof name == "number") {
            this.CurrentAgentName = "Generation_" + Generation + "_Agent_" + name
        } else if (typeof Generation == "number") {
            logError("Bidan Genetic Error 001: initAgent did not receive a valid value in Generation")
        } else if (typeof name == "number") {
            logError("Bidan Genetic Error 001: initAgent did not receive a valid value in Agent")
        } else logError("Bidan Genetic Error 001: initAgent did not receive a valid value in Generation and Agent")
    }

    addResult = (Array = [], Experienced = [], fun = (ar) => { return ar }) => {
        if (typeof Array == "object" & typeof Experienced == "object" & typeof fun == "function") {
            this.CurrentAgentPerformance.push(fun(Array))
            this.CurrentAgentExperienced.push(Experienced)

        } else if (typeof Experienced == "object" & typeof fun == "function") {

            logError("Bidan Genetic Error 001: the addResult function did not receive an Array as a parameter in Array")
        } else if (typeof Array == "object" & typeof fun == "function") {

            logError("Bidan Genetic Error 001: the addResult function did not receive an Array as a parameter in Experienced")
        } else if (typeof Array == "object" & typeof Experienced == "object") {

            logError("Bidan Genetic Error 001: the addResult function did not receive an function as a parameter in fun")
        } else if (typeof fun == "function") {

            logError("Bidan Genetic Error 001: the addResult function did not receive an Array as a parameter in Array and Experienced")
        } else if (typeof Array == "object") {

            logError("Bidan Genetic Error 001: the addResult function did not receive an Array as a parameter in Experienced and did not receive a function in fun")
        } else if (typeof Experienced == "object") {

            logError("Bidan Genetic Error 001: the addResult function did not receive an Array as a parameter in Array and did not receive a function in fun")

        } else logError("Bidan Genetic Error 001: the addResult function did not receive any valid parameters")
    }

    analyzeResult = (margin = 0) => {
        if (typeof margin == "number") {
            for (let i = 0; i < this.CurrentAgentPerformance.length; i++) {
                if (JSON.stringify(this.CurrentAgentPerformance[i]) == JSON.stringify(this.CurrentAgentExperienced[i])) this.cambiaEsteNombrePor += 1

            }
            this.cambiaEsteNombrePor = this.cambiaEsteNombrePor / this.CurrentAgentPerformance.length
            if (this.cambiaEsteNombrePor < 0.09) {
                console.log(colors.bgRed("Rendimiento: " + this.cambiaEsteNombrePor + "%"));
            } else if (this.cambiaEsteNombrePor < 0.2) {
                console.log(colors.red("Rendimiento: " + this.cambiaEsteNombrePor + "%"));
            } else if (this.cambiaEsteNombrePor < 0.3) {
                console.log(colors.yellow("Rendimiento: " + this.cambiaEsteNombrePor + "%"));
            } else if (this.cambiaEsteNombrePor < 0.4) {
                console.log(colors.magenta("Rendimiento: " + this.cambiaEsteNombrePor + "%"));
            } else if (this.cambiaEsteNombrePor < 0.6) {
                console.log(colors.cyan("Rendimiento: " + this.cambiaEsteNombrePor + "%"));
            } else if (this.cambiaEsteNombrePor < 0.8) {
                console.log(colors.blue("Rendimiento: " + this.cambiaEsteNombrePor + "%"));
            } else if (this.cambiaEsteNombrePor < 0.95) {
                console.log(colors.green("Rendimiento: " + this.cambiaEsteNombrePor + "%"));
            } else console.log(colors.bgGreen("Rendimiento: " + this.cambiaEsteNombrePor + "%"));
            
        } else logError("Bidan Genetic Error 002: [Insterte data]")
    }
}

module.exports = {
    PerformanceLogger
}