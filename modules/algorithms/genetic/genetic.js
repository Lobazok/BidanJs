const { logError } = require("../../../colors/bidanColors")
const colors = require("../../../colors/bidanColors")

const fs = require("fs")
const readline = require('readline');


class genetic {
    constructor(routeData, Generation) {
        this.data
        this.weights = []
        this.Generation = 0
        this.route;
        this.agentsCofig

        this.route = routeData + ".json"
        this.status;

        if (fs.existsSync(this.route)) {

            if (typeof Generation == "number") {
                let file = JSON.parse(fs.readFileSync(this.route, "utf-8"));
                if (file.performanceGenerations) {
                    if (file.performanceGenerations[Generation]) {
                        this.data = file.performanceGenerations;
                        this.Generation = Generation;
                        this.status = true;
                    } else {
                        logError(`Bidan Genetic Error 000: in the configuration the generation ${Generation} does not exist`)
                        this.status = false;
                    }

                } else {
                    logError(`Bidan Genetic Error 000: in the configuration the specified file(${this.route}) does not exist`);
                    this.status = false;
                }

            } else {
                logError(`Bidan Genetic Error 000: in the configuration the parameter ${Generation} no is a number`);
                this.status = false;
            }

        } else {
            logError(`Bidan Genetic Error 000: in the configuration the specified file(${this.route}) does not exist`);
            this.status = false;
        }
    }
    config = (routeData, Generation) => {
        this.route = routeData + ".json";

        if (fs.existsSync(this.route)) {

            if (typeof Generation == "number") {
                let file = JSON.parse(fs.readFileSync(this.route, "utf-8"));
                if (file.performanceGenerations) {
                    if (file.performanceGenerations[Generation]) {
                        this.data = file.performanceGenerations;
                        this.Generation = Generation;
                        this.status = true;
                    } else {
                        logError(`Bidan Genetic Error 000: in the configuration the generation ${Generation} does not exist`)
                        this.status = false;
                    }

                } else {
                    logError(`Bidan Genetic Error 000: in the configuration the specified file(${this.route}) does not exist`);
                    this.status = false;
                }

            } else {
                logError(`Bidan Genetic Error 000: in the configuration the parameter ${Generation} no is a number`);
                this.status = false;
            }

        } else {
            logError(`Bidan Genetic Error 000: in the configuration the specified file(${this.route}) does not exist`);
            this.status = false;
        }
    }

    orderBy = (limit = 25, Generation = this.Generation) => {
        if (this.status == true) {
            const agents = this.data[Generation];
            const sortedAgents = agents.map((value, index) => ({ value, index })).sort((a, b) => b.value - a.value);
            const maxAgents = sortedAgents.slice(0, limit).map(({ index, value }) => ({ index, value }));
            return maxAgents;
        }
    }

    findRoutes = (Generation = this.Generation, agents = [], estandar) => {
        let routes = []
        if (this.status == true) {
            if (agents.length > 0) {
                for (let i = 0; i < agents.length; i++) {
                    if (agents[i].index) {
                        routes.push(estandar(Generation, agents[i].index));
                    } else {
                        routes.push(estandar(Generation, agents[i]));
                    }
                }
            } else {
                logError(`Bidan genetic error 001: in findRoutes files were not specific`);
                this.status = false;
            }

        }
        return routes;
    }

    findAgent = (routes = [],) => {
        if (this.status == true) {
            if (routes.length > 0) {

                if (fs.existsSync(routes[0] + ".json", "utf-8")) {
                    let fileAgentZero = JSON.parse(fs.readFileSync(routes[0] + ".json", "utf-8"));
                    if (fileAgentZero.config) {
                        this.agentsCofig = fileAgentZero.config
                    } else {
                        logError(`Bidan genetic error 002: findAgent error in management for files, the file went manipulated inapropiety`)
                        this.status = false;
                    }
                } else {
                    logError(`Bidan genetic error 001: in findAgent file ${routes[0]} does exist`)
                    this.status = false;
                }
                for (let i = 0; i < routes.length; i++) {

                    if (fs.existsSync(routes[i] + ".json", "utf-8")) {
                        let file = JSON.parse(fs.readFileSync(routes[i] + ".json", "utf-8"));
                        if (file.weight) {
                            this.weights.push(file.weight)
                        } else {
                            logError(`Bidan genetic error 002: findAgent error in management for files, the file went manipulated inapropiety`)
                            this.status = false;
                        }
                    } else {
                        logError(`Bidan genetic error 001: in findAgent file ${routes[i]} does exist`)
                        this.status = false;
                    }
                }

            } else {
                logError(`Bidan genetic error 001: in findAgent files were not specific`)
                this.status = false;
            }
        }
    }

    newWights = (learnigRate, spontaneity) => {
        let newWight = {
            LayerInput: [],
            Layer: [],
            LayerOutput: []
        }
        for (let i = 0; i < this.agentsCofig.LayerInputConfig[0]; i++) {
            let tem = []
            for (let o = 0; o < this.agentsCofig.LayersConfig[0][0]; o++) {
                let w = this.weights[Math.floor(Math.random() * this.weights.length)].LayerInput[i][o]
                if (Math.random() > spontaneity) {
                    w += Math.floor(Math.random() * (learnigRate - -learnigRate + 1)) - learnigRate
                }
                tem.push(w)
            }
            newWight.LayerInput.push(tem)
        }

        for (let i = 0; i < this.agentsCofig.LayersConfig[0].length; i++) {
            let tamLayer = []
            for (let o = 0; o < this.agentsCofig.LayersConfig[0][i]; o++) {
                let tem = []
                if (this.agentsCofig.LayersConfig[0][i + 1]) {
                    for (let u = 0; u < this.agentsCofig.LayersConfig[0][i + 1]; u++) {
                        let w = this.weights[Math.floor(Math.random() * this.weights.length)].Layer[i][o][0]
                        if (Math.random() > spontaneity) {
                            w += Math.floor(Math.random() * (learnigRate - -learnigRate + 1)) - learnigRate
                        }

                        tem.push(w)
                    }
                } else {
                    for (let u = 0; u < this.agentsCofig.LayerOutputConfig[0]; u++) {
                        let w = this.weights[Math.floor(Math.random() * this.weights.length)].Layer[i][o][0]
                        if (Math.random() > spontaneity) {
                            w += Math.floor(Math.random() * (learnigRate - -learnigRate + 1)) - learnigRate
                        }

                        tem.push(w)
                    }
                }

                tamLayer.push(tem)
            }
            newWight.Layer.push(tamLayer)
        }

        for (let i = 0; i < this.agentsCofig.LayerOutputConfig[0]; i++) {
            let w = this.weights[Math.floor(Math.random() * this.weights.length)].LayerOutput[i]
            if (Math.random() > spontaneity) {
                w += Math.floor(Math.random() * (learnigRate - -learnigRate + 1)) - learnigRate
            }

             newWight.LayerOutput.push(w)
        }
        return newWight
    }
    saveWeight = (name, weights) => {
        let data = {
            config: this.agentsCofig,
            weight: weights
        }

        const json = JSON.stringify(data)
        fs.writeFileSync(name + ".json", json)
    }
}

module.exports = genetic