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

    newWights = (learnigRate, spontaneity)=>{

    }

}

module.exports = genetic