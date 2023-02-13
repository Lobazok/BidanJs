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

class analytic {
    constructor(routeData, Generation) {
        this.data,
            this.GenerationDefault = 0
        this.route

        this.result = {
            max: 0,
            min: 0,
            range: 0,
            media: 0,
            mediana: 0,
            cuartiles: [0, 0],
            moda: 0
        }

        this.route = routeData + ".json"

        if (fs.existsSync(this.route)) {

            if (typeof Generation == "number") {
                let file = JSON.parse(fs.readFileSync(this.route, "utf-8"))
                this.data = file.performanceGenerations
                this.GenerationDefault = Generation
            }

        } else logError(`Bidan Genetic Analytic Error 000: in the configuration the specified file(${this.route}) does not exist`)
    }

    config = (routeData, Generation) => {
        this.route = routeData + ".json"

        if (fs.existsSync(this.route)) {

            if (typeof Generation == "number") {
                let file = JSON.parse(fs.readFileSync(this.route, "utf-8"))
                this.data = file.performanceGenerations
                this.GenerationDefault = Generation
            }

        } else logError(`Bidan Genetic Analytic Error 000: in the configuration the specified file(${this.route}) does not exist`)
    }

    max = (Generation = this.GenerationDefault) => {
        let max = Math.max.apply(null, this.data[Generation]);
        this.result.max = max
        return max
    }

    min = (Generation = this.GenerationDefault) => {
        let min = Math.min.apply(null, this.data[Generation]);
        this.result.min = min
        return min
    }

    range = (Generation = this.GenerationDefault) => {
        let range = this.max(Generation) - this.min(Generation)
        this.result.range = range
        return range
    }
    median = (Generation = this.GenerationDefault) => {
        let arr = this.data[Generation]
        arr.sort(function (a, b) { return a - b });
        let n = arr.length;
        let median;

        if (n % 2 !== 0) {
            median = arr[Math.floor(n / 2)];
        } else {

            median = (arr[n / 2 - 1] + arr[n / 2]) / 2;
        }
        return median;
    }

    average = (Generation = this.GenerationDefault) => {
        let sum = 0;

        for (let i = 0; i < this.data[Generation].length; i++) {
            sum += this.data[Generation][i];
        }

        return sum / this.data[Generation].length;
    }

    Q1 = (Generation = this.GenerationDefault) => {
        let arr = this.data[Generation]
        arr.sort((a, b) => a - b);
        let n = arr.length;

        let index = Math.floor((n + 1) / 4) - 1;

        if (n % 2 === 0) {
            return (arr[index] + arr[index + 1]) / 2;
        } else {
            return arr[index];
        }
    }

    Q3 = (Generation = this.GenerationDefault) => {
        let arr = this.data[Generation];
        arr.sort((a, b) => a - b);
        let n = arr.length;

        let index = Math.floor((3 * n + 1) / 4) - 1;

        if (n % 2 === 0) {
            return (arr[index] + arr[index + 1]) / 2;
        } else {
            return arr[index];
        }
    };


    log = (Generation = this.GenerationDefault) => {
        /* console.log(colors.red("Min: " + this.min()));
        console.log(colors.green("Max: " + this.max()));
        console.log("Range: " + this.range()); */
        console.log(colors.red("Min") + " - " + colors.green("Max") + " : " + colors.red(this.min(Generation)) + " --- " + colors.green(this.max(Generation)) + "   -   " + colors.gray("Range: " + this.range(Generation)));
        console.log(colors.cyan("Median: " + this.median(Generation)) + " -- " + colors.yellow("average: " + this.average(Generation)));
        console.log(colors.magenta("Q1: " + this.Q1(Generation)) + " -- " + colors.blue("Q3: " + this.Q3(Generation)));

    }

    comparation = (G1, G2) => {
        let min = [this.min(G1), this.min(G2)]
        console.log(colors.red("Min") + ": " + colors.red(min[0]) + (min[0] < min[1] ? colors.green("  ==>  ") : colors.red("  ==>  ")) + colors.red(min[1]) + " | " + (min[0] < min[1] ? colors.green(min[1] - min[0]) : colors.red(min[1] - min[0])));

        let max = [this.max(G1), this.max(G2)]
        console.log(colors.green("Max") + ": " + colors.green(max[0]) + (max[0] < max[1] ? colors.green("  ==>  ") : colors.red("  ==>  ")) + colors.green(max[1]) + " | " + (max[0] < max[1] ? colors.green(max[1] - max[0]) : colors.red(max[1] - max[0])));

        let average = [this.average(G1), this.average(G2)]
        console.log(colors.yellow("average") + ": " + colors.yellow(average[0]) + (average[0] < average[1] ? colors.green("  ==>  ") : colors.red("  ==>  ")) + colors.yellow(average[1]) + " | " + (average[0] < average[1] ? colors.green(average[1] - average[0]) : colors.red(average[1] - average[0])));

        let median = [this.median(G1), this.median(G2)]
        console.log(colors.cyan("median") + ": " + colors.cyan(median[0]) + (median[0] < median[1] ? colors.green("  ==>  ") : colors.red("  ==>  ")) + colors.cyan(median[1]) + " | " + (median[0] < median[1] ? colors.green(median[1] - median[0]) : colors.red(median[1] - median[0])));

        let Q1 = [this.Q1(G1), this.Q1(G2)]
        console.log(colors.magenta("Q1") + ": " + colors.magenta(Q1[0]) + (Q1[0] < Q1[1] ? colors.green("  ==>  ") : colors.red("  ==>  ")) + colors.magenta(Q1[1]) + " | " + (Q1[0] < Q1[1] ? colors.green(Q1[1] - Q1[0]) : colors.red(Q1[1] - Q1[0])));

        let Q3 = [this.Q3(G1), this.Q3(G2)]
        console.log(colors.blue("Q3") + ": " + colors.blue(Q3[0]) + (Q3[0] < Q3[1] ? colors.green("  ==>  ") : colors.red("  ==>  ")) + colors.blue(Q3[1]) + " | " + (Q3[0] < Q3[1] ? colors.green(Q3[1] - Q3[0]) : colors.red(Q3[1] - Q3[0])));

    }

    Terminal = {
        min: (t, generation) => {
            if (generation) {
                console.log(colors.red("  Min: " + this.min(generation)))
                this.Terminal.index(t)
            } else {
                t.question(colors.italic(" ^ generation: "), (g) => {
                    console.log(colors.red("  Min: " + this.min(g)))
                    this.Terminal.index(t)
                })
            }
        },
        max: (t, generation) => {
            if (generation) {
                console.log(colors.green("  Max: " + this.max(generation)))
                this.Terminal.index(t)
            } else {
                t.question(colors.italic(" ^ generation: "), (g) => {
                    console.log(colors.green("  Max: " + this.max(g)))
                    this.Terminal.index(t)
                })
            }


        },
        average: (t, limit = false, generation) => {
            if (limit) {
                if (generation) {
                    console.log(colors.yellow("  average: " + this.max(generation)))
                    this.Terminal.index(t)
                } else {
                    t.question(colors.italic(" ^ generation: "), (g) => {
                        console.log(colors.yellow("  average: " + this.max(g)))
                        this.Terminal.index(t)
                    })
                }
            } else {
                if (generation) {
                    if (this.data[generation]) {
                        console.log(colors.yellow("  average: " + this.max(generation) + " Number of items: " + this.data[generation].length))
                    } else console.log(colors.yellow("  average: null"));
                    this.Terminal.index(t)
                } else {
                    t.question(colors.italic(" ^ generation: "), (g) => {
                        if (this.data[g]) {
                            console.log(colors.yellow("  average: " + this.max(g) + " Number of items: " + this.data[g].length))
                        } else console.log(colors.yellow("  average: null"));
                        this.Terminal.index(t)
                    })
                }
            }



        },
        range: (t, limit = false, generation) => {
            if (limit == false) {
                if (generation) {
                    console.log(colors.yellow("Range: " + this.range(generation)) + " | " + colors.red("Min: " + this.min(generation)) + " -- " + colors.green("Max: " + this.max(generation)))
                    this.Terminal.index(t)
                } else {
                    t.question(colors.italic(" ^ generation: "), (g) => {
                        console.log(colors.yellow("Range: " + this.range(g)) + " | " + colors.red("Min: " + this.min(g)) + " -- " + colors.green("Max: " + this.max(g)))
                        this.Terminal.index(t)
                    })
                }
            } else {
                if (generation) {
                    console.log(colors.yellow("Range: " + this.range(generation)))
                    this.Terminal.index(t)
                } else {
                    t.question(colors.italic(" ^ generation: "), (g) => {
                        console.log(colors.yellow("Range: " + this.range(g)))
                        this.Terminal.index(t)
                    })
                }
            }


        },
        index: (t) => {
            t.question('~ ', (answer) => {
                if (answer == "min") {
                    this.Terminal.min(t)
                } else if (answer == "max") {
                    this.Terminal.max(t)
                } else if (answer == "range") {
                    this.Terminal.range(t)
                } else if (answer == "average") {
                    this.Terminal.average(t)
                } else if (answer == "cls" | answer == "clear") {
                    console.clear()
                    this.Terminal.index(t)
                } else if (answer == "exit") {
                    t.close()
                } else if (answer == "help") {
                    console.log(colors.blue(colors.bold("  Basic")));
                    console.log(colors.blue("   > cls    : Clean the panel | equivalent with clear"));
                    console.log(colors.blue("   > help   : Gives information about available commands"));
                    console.log(colors.blue("   > exit   : Finishes running the dashboard"));
                    console.log();
                    console.log(colors.magenta(colors.bold("  Performance Analysis")));
                    console.log(colors.magenta("   > min     : Minimum value, 1 parameter, the generation to be analyzed, can be entered with: -g generation"));
                    console.log(colors.magenta("   > max     : Maximum value, 1 parameter, the generation to be analyzed, can be entered with: -g generation"));
                    console.log(colors.magenta("   > range   : The range between the values of a generation, 2 parameters, if you want it to only show the range and not the max & min uses -l, the generation to be analyzed, can be entered with: -g"));
                    console.log(colors.magenta("   > average : The average between all the values, 2 parameters, with -l the number of elements is hidden and with -g the generation to be analyzed is indicated"));
                    this.Terminal.index(t)
                } else if (answer.startsWith("min -g ")) {
                    let g = parseInt(answer.substring(answer.lastIndexOf(" ") + 1))
                    this.Terminal.min(t, g)
                } else if (answer.startsWith("max -g ")) {
                    let g = parseInt(answer.substring(answer.lastIndexOf(" ") + 1))
                    this.Terminal.max(t, g)
                } else if (answer.startsWith("range -g ")) {
                    let g = parseInt(answer.substring(answer.lastIndexOf(" ") + 1))
                    this.Terminal.range(t, false, g)
                } else if (answer.startsWith("average -g ")) {
                    let g = parseInt(answer.substring(answer.lastIndexOf(" ") + 1))
                    this.Terminal.average(t, false, g)
                } else  if (answer.startsWith("range -l -g ")) {
                    let g = parseInt(answer.substring(answer.lastIndexOf(" ") + 1))
                    this.Terminal.range(t, true, g)
                } else if (answer.startsWith("range -l")) {
                    this.Terminal.range(t, true)
                } else if (answer.startsWith("average -l -g ")) {
                    let g = parseInt(answer.substring(answer.lastIndexOf(" ") + 1))
                    this.Terminal.average(t, true, g)
                } else  if (answer.startsWith("average -l")) {
                    let g = parseInt(answer.substring(answer.lastIndexOf(" ") + 1))
                    this.Terminal.average(t, true)
                } else{
                    console.log(colors.red(`  the "${answer}" command is not a recognized or valid command use the`) + colors.green(" help command") + colors.red(" to get information about available commands"));
                    this.Terminal.index(t)
                }

            });
        }
    }
    openTerminal = () => {
        const terminal = readline.createInterface({
            input: process.stdin,
            output: process.stdout
        });

        console.log(colors.green("  Welcome to the BidanJs Genetic analysis panel!"));
        console.log(colors.green("  use the help command to get information about available commands"));
        this.Terminal.index(terminal)
    }
}

module.exports = analytic