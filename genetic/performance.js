const { logError } = require("../colors/bidanColors")
const colors = require("../colors/bidanColors")
const cilan = require("../colors/colors")

const fs = require("fs")


class PerformanceLogger {
    constructor() {

        this.routeData = ""
        this.GenerationTotal = 0
        this.print = true

        //Current Generation
        this.GenerationCurrent = 0
        this.CurrentAgrentTotal = 0
        this.PerformanceCurrent = []


        //Current Agent
        this.CurrentAgentName = ""
        this.PerformaceAgentCurrent = 0
        this.CurrentAgentPerformance = []
        this.CurrentAgentExperienced = []

    }

    config = (routeData, print = true) => {
        this.routeData = routeData + ".json"
        this.print = print
    }

    reset = () => {
        this.CurrentAgentName = ""
        this.CurrentAgentPerformance = []
        this.CurrentAgentExperienced = []
    }

    initGeneraction = (Generation) => {
        if (typeof Generation == "number") {
            if (Generation >= 0 & Generation >= this.GenerationTotal) {
                this.GenerationTotal = 0
                this.GenerationCurrent = Generation
            } else logError("Bidan Genetic Error 000: addGeneraction did not receive a valid numeric value")
        } else logError("Bidan Genetic Error 000: addGeneraction did not receive a valid numeric value")
    }

    initAgent = (Generation, name) => {
        this.reset()
        this.CurrentAgrentTotal += 1
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

    analyzeResult = (fun = (a, b) => { return a / b.length }) => {
        if (typeof fun == "function") {
            for (let i = 0; i < this.CurrentAgentPerformance.length; i++) {
                if (JSON.stringify(this.CurrentAgentPerformance[i]) == JSON.stringify(this.CurrentAgentExperienced[i])) this.PerformaceAgentCurrent += 1

            }
            this.PerformaceAgentCurrent = fun(this.PerformaceAgentCurrent, this.CurrentAgentPerformance.length)

            console.log(colors.performance(this.PerformaceAgentCurrent))
            this.PerformanceCurrent.push(this.PerformaceAgentCurrent)
        } else logError("Bidan Genetic Error 002: Margin is not a number")
    }

    saveData = () => {
        if (fs.existsSync(this.routeData)) {

            let file = JSON.parse(fs.readFileSync(this.routeData, "utf-8"))

            let data = file
            data.numGenerations = this.GenerationTotal
            data.numAgentGenerations.push(this.CurrentAgrentTotal)
            data.performanceGenerations.push(this.PerformanceCurrent)

            const json = JSON.stringify(data, null, 2)
            fs.writeFileSync(this.routeData, json)
            console.log(colors.update("updated performance file"));
        } else {

            let data = {
                numGenerations: this.GenerationTotal,
                numAgentGenerations: [this.CurrentAgrentTotal],
                performanceGenerations: [this.PerformanceCurrent],
            }

            const json = JSON.stringify(data, null, 2)
            fs.writeFileSync(this.routeData, json)

            console.log(colors.new("performance file created"));
        }
    }
}

module.exports = {
    PerformanceLogger
}