const colors = require("colors/safe")
const fs = require("fs")
const readline = require('readline');

colors.setTheme({
    error: ["red", "italic", "bold"],
    warn: "red",
    new: ["green", "italic"],
    update: ["green"]
})

function logError(error) {
    console.log(colors.error(error))
}


class genetic {
    constructor(routeData, Generation) {
        this.data,
            this.Generation = 0
        this.route;

        this.route = routeData + ".json"

        if (fs.existsSync(this.route)) {

            if (typeof Generation == "number") {
                let file = JSON.parse(fs.readFileSync(this.route, "utf-8"));
                this.data = file.performanceGenerations;
                this.Generation = Generation;
            }

        } else logError(`Bidan Genetic Analytic Error 000: in the configuration the specified file(${this.route}) does not exist`);
    }
    config = (routeData, Generation) => {
        this.route = routeData + ".json";

        if (fs.existsSync(this.route)) {

            if (typeof Generation == "number") {
                let file = JSON.parse(fs.readFileSync(this.route, "utf-8"));
                this.data = file.performanceGenerations;
                this.Generation = Generation;
            };

        } else logError(`Bidan Genetic Analytic Error 000: in the configuration the specified file(${this.route}) does not exist`);
    }

    orderBy = ( limit = 25, Generation = this.Generation) => {
        const agents = this.data[Generation];
        const sortedAgents = agents
            .map((value, index) => ({ value, index }))
            .sort((a, b) => b.value - a.value);
        const maxAgents = sortedAgents
            .slice(0, limit)
            .map(({ index, value }) => ({ index, value }));
        return maxAgents;
    }

}

module.exports = genetic