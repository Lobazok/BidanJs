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

    }

    config = (routeData, print = true) => {
        this.routeData = routeData + ".json"
        this.print = print
    }

    reset = () => {
        this.CurrentAgentName = ""
        this.CurrentAgentPerformance = []
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

    addResult = (result) => {
        if (typeof result == "number") {
            this.PerformaceAgentCurrent += result
        } else logError("Bidan Genetic Error 001: the addResult function did not receive any valid parameters")
    }

    analyzeResult = (fun = (r)=> {return r}, color = colors.performance) => {
        console.log(color(fun(this.PerformaceAgentCurrent)))
        this.PerformanceCurrent.push(fun(this.PerformaceAgentCurrent))
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