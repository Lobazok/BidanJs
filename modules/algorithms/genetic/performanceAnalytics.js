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
        console.log(colors.red("Min: " + this.min()));
        console.log(colors.green("Max: " + this.max()));
        console.log("Range: " + this.range());
        console.log(colors.red("Min") + " - " + colors.green("Max") + " : " + colors.red(this.min(Generation)) + " --- " + colors.green(this.max(Generation)) + "   -   " + colors.gray("Range: " + this.range(Generation)));
        console.log(colors.cyan("Median: " + this.median(Generation)) + " -- " + colors.yellow("average: " + this.average(Generation)));
        console.log(colors.magenta("Q1: " + this.Q1(Generation)) + " -- " + colors.blue("Q3: " + this.Q3(Generation)));

    }


    print = {
        min: (generation) => {
            console.log(colors.red("  > Min: " + this.min(generation)))
        },
        max: (generation) => {
            console.log(colors.green("  > Max: " + this.max(generation)))
        },
        Q1: (generation) => {
            console.log(colors.magenta("  > Q1: " + this.Q1(generation)))
        },
        Q3: (generation) => {
            console.log(colors.blue("  > Q3: " + this.Q3(generation)))
        },
        median: (generation) => {
            console.log(colors.cyan("  > median: " + this.median(generation)))
        },
        average: (generation, bool = false) => {
            if (bool) {
                console.log(colors.black("  > average: " + this.average(generation)))
            } else console.log(colors.black("  > average: " + this.average(generation) + " Number of agents: " + this.data[generation].length))

        },
        range: (generation, bool = false) => {
            if (bool) {
                console.log(colors.yellow("  > Range: " + this.range(generation)))
            } else console.log(colors.yellow("  > Range: " + this.range(generation)) + " | " + colors.red("Min: " + this.min(generation)) + " -- " + colors.green("Max: " + this.max(generation)))
        },

        all: (generation, rangeBool = true, averageBool = false) => {
            this.print.min(generation)
            this.print.max(generation)
            this.print.range(generation, rangeBool)
            this.print.average(generation, averageBool)
            this.print.median(generation)
            this.print.Q1(generation)
            this.print.Q3(generation)
        },



        minComparation: (G1, G2) => {
            let min = [this.min(G1), this.min(G2)]
            console.log((colors.red(" :> Min") + ": " + colors.red(min[0]) + (min[0] < min[1] ? colors.green("  ==>  ") : colors.red("  ==>  ")) + colors.red(min[1])) + " | " + (min[0] < min[1] ? colors.green(min[1] - min[0]) : colors.red(min[1] - min[0])));
        },
        maxComparation: (G1, G2) => {
            let max = [this.max(G1), this.max(G2)]
            console.log((colors.green(" :> Max") + ": " + colors.green(max[0]) + (max[0] < max[1] ? colors.green("  ==>  ") : colors.red("  ==>  ")) + colors.green(max[1])) + " | " + (max[0] < max[1] ? colors.green(max[1] - max[0]) : colors.red(max[1] - max[0])));
        },

        Q1Comparation: (G1, G2) => {
            let Q1 = [this.Q1(G1), this.Q1(G2)]
            console.log((colors.magenta(" :> Q1") + ": " + colors.magenta(Q1[0]) + (Q1[0] < Q1[1] ? colors.green("  ==>  ") : colors.red("  ==>  ")) + colors.magenta(Q1[1])) + " | " + (Q1[0] < Q1[1] ? colors.green(Q1[1] - Q1[0]) : colors.red(Q1[1] - Q1[0])));
        },
        Q3Comparation: (G1, G2) => {
            let Q3 = [this.Q3(G1), this.Q3(G2)]
            console.log((colors.blue(" :> Q3") + ": " + colors.blue(Q3[0]) + (Q3[0] < Q3[1] ? colors.green("  ==>  ") : colors.red("  ==>  ")) + colors.blue(Q3[1])) + " | " + (Q3[0] < Q3[1] ? colors.green(Q3[1] - Q3[0]) : colors.red(Q3[1] - Q3[0])));
        },
        medianComparation: (G1, G2) => {
            let median = [this.median(G1), this.median(G2)]
            console.log((colors.cyan(" :> median") + ": " + colors.cyan(median[0]) + (median[0] < median[1] ? colors.green("  ==>  ") : colors.red("  ==>  ")) + colors.cyan(median[1])) + " | " + (median[0] < median[1] ? colors.green(median[1] - median[0]) : colors.red(median[1] - median[0])));
        },
        averageComparation: (G1, G2, bold = false) => {
            let average = [this.average(G1), this.average(G2)]
            console.log((colors.black(" :> average") + ": " + colors.black(average[0]) + (average[0] < average[1] ? colors.green("  ==>  ") : colors.red("  ==>  ")) + colors.black(average[1])) + " | " + (average[0] < average[1] ? colors.green(average[1] - average[0]) : colors.red(average[1] - average[0])));
        },
        rangeComparation: (G1, G2, bool = false) => {
            let range = [this.range(G1), this.range(G2)]
            console.log((colors.yellow(" :> range") + ": " + colors.yellow(range[0]) + (range[0] < range[1] ? colors.green("  ==>  ") : colors.red("  ==>  ")) + colors.yellow(range[1])) + " | " + (range[0] < range[1] ? colors.green(range[1] - range[0]) : colors.red(range[1] - range[0])));
            if (bool) {
                this.print.minComparation(G1, G2)
                this.print.maxComparation(G1, G2)
            }
        },
        allComparation: (G1, G2) => {
            this.print.minComparation(G1, G2)
            this.print.maxComparation(G1, G2)
            this.print.rangeComparation(G1, G2)
            this.print.averageComparation(G1, G2)
            this.print.medianComparation(G1, G2)
            this.print.Q1Comparation(G1, G2)
            this.print.Q3Comparation(G1, G2)
        }
    }

    Terminal = {
        min: (t, generation, bool = true) => {
            if (typeof generation == "number") {
                this.print.min(generation)
                this.Terminal.index(t)
            } else {
                t.question(colors.italic(" ^ generation: "), (g) => {
                    this.print.min(g)
                    this.Terminal.index(t)
                })
            }
        },
        max: (t, generation) => {
            if (typeof generation == "number") {
                this.print.max(generation)
                this.Terminal.index(t)
            } else {
                t.question(colors.italic(" ^ generation: "), (g) => {
                    this.print.max(g)
                    this.Terminal.index(t)
                })
            }


        },
        Q1: (t, generation) => {
            if (typeof generation == "number") {
                if (this.data[generation]) {
                    this.print.Q1(generation)
                } else console.log(colors.magenta("  Q1: null"))
                this.Terminal.index(t)
            } else {
                t.question(colors.italic(" ^ generation: "), (g) => {
                    if (this.data[g]) {
                        this.print.Q1(g)
                    } else console.log(colors.magenta("  Q1: null"))
                    this.Terminal.index(t)
                })
            }


        },
        Q3: (t, generation) => {
            if (typeof generation == "number") {
                if (this.data[generation]) {
                    this.print.Q3(generation)
                } else console.log(colors.magenta("  Q3: null"))
                this.Terminal.index(t)
            } else {
                t.question(colors.italic(" ^ generation: "), (g) => {
                    if (this.data[g]) {
                        this.print.Q3(g)
                    } else console.log(colors.magenta("  Q3: null"))
                    this.Terminal.index(t)
                })
            }


        },
        median: (t, generation) => {
            if (typeof generation == "number") {
                if (this.data[generation]) {
                    this.print.median(generation)
                } else console.log(colors.cyan("  median: null"))
                this.Terminal.index(t)
            } else {
                t.question(colors.italic(" ^ generation: "), (g) => {
                    if (this.data[g]) {
                        this.print.median(g)
                    } else console.log(colors.cyan("  median: null"))
                    this.Terminal.index(t)
                })
            }
        },
        average: (t, limit = false, generation) => {
            if (limit) {
                if (typeof generation == "number") {
                    this.print.average(generation, limit)
                    this.Terminal.index(t)
                } else {
                    t.question(colors.italic(" ^ generation: "), (g) => {
                        this.print.average(g, limit)
                        this.Terminal.index(t)
                    })
                }
            } else {
                if (typeof generation == "number") {
                    if (this.data[generation]) {
                        this.print.average(generation, limit)
                    } else console.log(colors.yellow("  average: null"));
                    this.Terminal.index(t)
                } else {
                    t.question(colors.italic(" ^ generation: "), (g) => {
                        if (this.data[g]) {
                            this.print.average(g, limit)
                            this.Terminal.index(t)
                        } else {
                            console.log(colors.yellow("  average: null"));
                            this.Terminal.index(t)
                        }
                    })
                }
            }



        },
        range: (t, limit = false, generation) => {
            if (limit == false) {
                if (typeof generation == "number") {
                    this.print.range(generation, limit)
                    this.Terminal.index(t)
                } else {
                    t.question(colors.italic(" ^ generation: "), (g) => {
                        this.print.range(g, limit)
                        this.Terminal.index(t)
                    })
                }
            } else {
                if (typeof generation == "number") {
                    this.print.range(generation, limit)
                    this.Terminal.index(t)
                } else {
                    t.question(colors.italic(" ^ generation: "), (g) => {
                        this.print.range(g, limit)
                        this.Terminal.index(t)
                    })
                }
            }


        },
        all: (t, generation) => {
            if (typeof generation == "number") {
                if (this.data[generation]) {
                    this.print.all(generation)
                } else console.log(colors.red(colors.bold(" null")))
                this.Terminal.index(t)
            } else {
                t.question(colors.italic(" ^ generation: "), (g) => {
                    if (this.data[g]) {
                        this.print.all(g)
                    } else console.log(colors.red(colors.bold(" null")))
                    this.Terminal.index(t)
                })
            }
        },
        minComparation: (t, G1, G2) => {
            if (typeof G1 == "number") {
                if (this.data[generation]) {
                    this.print.minComparation(G1, G2)
                } else console.log(colors.red(colors.bold(" null")))
                this.Terminal.index(t)
            } else {
                let gs = [0, 0]
                t.question(colors.italic(" ^ generation 1: "), (g0) => {
                    if (this.data[g0]) {
                        gs[0] = g0
                    } else console.log(colors.red(colors.bold(" null")))

                    t.question(colors.italic(" ^ generation 2: "), (g1) => {
                        if (this.data[g1]) {
                            gs[1] = g1
                            this.print.minComparation(gs[0], gs[1])
                        } else console.log(colors.red(colors.bold(" null")))
                        this.Terminal.index(t)
                    })

                })


            }
        },
        maxComparation: (t, G1, G2) => {
            if (typeof G1 == "number") {
                if (this.data[generation]) {
                    this.print.maxComparation(G1, G2)
                } else console.log(colors.red(colors.bold(" null")))
                this.Terminal.index(t)
            } else {
                let gs = [0, 0]
                t.question(colors.italic(" ^ generation 1: "), (g0) => {
                    if (this.data[g0]) {
                        gs[0] = g0
                    } else console.log(colors.red(colors.bold(" null")))

                    t.question(colors.italic(" ^ generation 2: "), (g1) => {
                        if (this.data[g1]) {
                            gs[1] = g1
                            this.print.maxComparation(gs[0], gs[1])
                        } else console.log(colors.red(colors.bold(" null")))
                        this.Terminal.index(t)
                    })

                })


            }
        },
        Q1Comparation: (t, G1, G2) => {
            if (typeof G1 == "number") {
                if (this.data[generation]) {
                    this.print.Q1Comparation(G1, G2)
                } else console.log(colors.red(colors.bold(" null")))
                this.Terminal.index(t)
            } else {
                let gs = [0, 0]
                t.question(colors.italic(" ^ generation 1: "), (g0) => {
                    if (this.data[g0]) {
                        gs[0] = g0
                    } else console.log(colors.red(colors.bold(" null")))

                    t.question(colors.italic(" ^ generation 2: "), (g1) => {
                        if (this.data[g1]) {
                            gs[1] = g1
                            this.print.Q1Comparation(gs[0], gs[1])
                        } else console.log(colors.red(colors.bold(" null")))
                        this.Terminal.index(t)
                    })

                })


            }
        },
        Q3Comparation: (t, G1, G2) => {
            if (typeof G1 == "number") {
                if (this.data[generation]) {
                    this.print.Q3Comparation(G1, G2)
                } else console.log(colors.red(colors.bold(" null")))
                this.Terminal.index(t)
            } else {
                let gs = [0, 0]
                t.question(colors.italic(" ^ generation 1: "), (g0) => {
                    if (this.data[g0]) {
                        gs[0] = g0
                    } else console.log(colors.red(colors.bold(" null")))

                    t.question(colors.italic(" ^ generation 2: "), (g1) => {
                        if (this.data[g1]) {
                            gs[1] = g1
                            this.print.Q3Comparation(gs[0], gs[1])
                        } else console.log(colors.red(colors.bold(" null")))
                        this.Terminal.index(t)
                    })

                })


            }
        },
        medianComparation: (t, G1, G2) => {
            if (typeof G1 == "number") {
                if (this.data[generation]) {
                    this.print.medianComparation(G1, G2)
                } else console.log(colors.red(colors.bold(" null")))
                this.Terminal.index(t)
            } else {
                let gs = [0, 0]
                t.question(colors.italic(" ^ generation 1: "), (g0) => {
                    if (this.data[g0]) {
                        gs[0] = g0
                    } else console.log(colors.red(colors.bold(" null")))

                    t.question(colors.italic(" ^ generation 2: "), (g1) => {
                        if (this.data[g1]) {
                            gs[1] = g1
                            this.print.medianComparation(gs[0], gs[1])
                        } else console.log(colors.red(colors.bold(" null")))
                        this.Terminal.index(t)
                    })

                })


            }
        },
        averageComparation: (t, G1, G2) => {
            if (typeof G1 == "number") {
                if (this.data[generation]) {
                    this.print.averageComparation(G1, G2)
                } else console.log(colors.red(colors.bold(" null")))
                this.Terminal.index(t)
            } else {
                let gs = [0, 0]
                t.question(colors.italic(" ^ generation 1: "), (g0) => {
                    if (this.data[g0]) {
                        gs[0] = g0
                    } else console.log(colors.red(colors.bold(" null")))

                    t.question(colors.italic(" ^ generation 2: "), (g1) => {
                        if (this.data[g1]) {
                            gs[1] = g1
                            this.print.averageComparation(gs[0], gs[1])
                        } else console.log(colors.red(colors.bold(" null")))
                        this.Terminal.index(t)
                    })

                })


            }
        },
        rangeComparation: (t, G1, G2) => {
            if (typeof G1 == "number") {
                if (this.data[generation]) {
                    this.print.rangeComparation(G1, G2)
                } else console.log(colors.red(colors.bold(" null")))
                this.Terminal.index(t)
            } else {
                let gs = [0, 0]
                t.question(colors.italic(" ^ generation 1: "), (g0) => {
                    if (this.data[g0]) {
                        gs[0] = g0
                    } else console.log(colors.red(colors.bold(" null")))

                    t.question(colors.italic(" ^ generation 2: "), (g1) => {
                        if (this.data[g1]) {
                            gs[1] = g1
                            this.print.rangeComparation(gs[0], gs[1])
                        } else console.log(colors.red(colors.bold(" null")))
                        this.Terminal.index(t)
                    })

                })


            }
        },
        allComparation: (t, G1, G2) => {
            if (typeof G1 == "number") {
                if (this.data[generation]) {
                    this.print.allComparation(G1, G2)
                } else console.log(colors.red(colors.bold(" null")))
                this.Terminal.index(t)
            } else {
                let gs = [0, 0]
                t.question(colors.italic(" ^ generation 1: "), (g0) => {
                    if (this.data[g0]) {
                        gs[0] = g0
                    } else console.log(colors.red(colors.bold(" null")))

                    t.question(colors.italic(" ^ generation 2: "), (g1) => {
                        if (this.data[g1]) {
                            gs[1] = g1
                            this.print.allComparation(gs[0], gs[1])
                        } else console.log(colors.red(colors.bold(" null")))
                        this.Terminal.index(t)
                    })

                })


            }
        },
        indexComparation: (t, type)=>{
            if (type == "all") {
                this.Terminal.allComparation(t)
            }else if (type == "min") {
                this.Terminal.minComparation(t)
            }else if (type == "max") {
                this.Terminal.maxComparation(t)
            }else if (type == "Q1" | type == "q1") {
                this.Terminal.Q1Comparation(t)
            }else if (type == "Q3" | type == "q3") {
                this.Terminal.Q3Comparation(t)
            }else if (type == "average") {
                this.Terminal.averageComparation(t)
            }else if (type == "range") {
                this.Terminal.rangeComparation(t)
            }else if (type == "median" | type == "Q2" | type == "q2") {
                this.Terminal.medianComparation(t)
            }else if (type == "exit") {
                this.Terminal.index(t)
            }else {
                console.log(colors.red(colors.bold("Invalid data type")));
                this.Terminal.index(t)
            }
        },
        Comparation: (t, type) => {
            if (type) {
                this.Terminal.indexComparation(t, type)
            } else {
                t.question("type: ", (answer) =>{
                    this.Terminal.indexComparation(t, answer)
                })
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
                } else if (answer == "median" | answer == "Q2" | answer == "q2") {
                    this.Terminal.median(t)
                } else if (answer == "Q1" | answer == "q1") {
                    this.Terminal.Q1(t)
                } else if (answer == "Q3" | answer == "q3") {
                    this.Terminal.Q3(t)
                } else if (answer == "Q3" | answer == "q3") {
                    this.Terminal.Q3(t)
                } else if (answer == "comparation" | answer == "com") {
                    this.Terminal.Comparation(t)
                    this.Terminal.index(t)
                } else if (answer == "all") {
                    this.Terminal.all(t)
                    this.Terminal.index(t)
                } else if (answer == "cls" | answer == "clear") {
                    console.clear()
                    this.Terminal.index(t)
                } else if (answer == "exit") {
                    t.close()
                } else if (answer == "help") {
                    console.log(colors.blue(colors.bold("  Basic")));
                    console.log(colors.blue("  ~> cls         : Clean the panel | equivalent with clear"));
                    console.log(colors.blue("  ~> help        : Gives information about available commands"));
                    console.log(colors.blue("  ~> exit        : Finishes running the dashboard"));
                    console.log();
                    console.log(colors.magenta(colors.bold("  Performance Analysis")));
                    console.log(colors.magenta("  ~> min         : Minimum value, 1 parameter, the generation to be analyzed, can be entered with: -g generation"));
                    console.log(colors.magenta("  ~> max         : Maximum value, 1 parameter, the generation to be analyzed, can be entered with: -g generation"));
                    console.log(colors.magenta("  ~> range       : The range between the values of a generation, 2 parameters, if you want it to only show the range and not the max & min uses -l, the generation to be analyzed, can be entered with: -g"));
                    console.log(colors.magenta("  ~> average     : The average between all the values, 2 parameters, with -l the number of elements is hidden and with -g the generation to be analyzed is indicated"));
                    console.log(colors.magenta("  ~> median      : Central value of all data, 1 parameter, the generation to be analyzed, can be entered with: -g generation  | equivalent with Q2"));
                    console.log(colors.magenta("  ~> Q1          : Quartile 1, 1 parameter, the generation to be analyzed, can be entered with: -g generation"));
                    console.log(colors.magenta("  ~> Q3          : Quartile 3, 1 parameter, the generation to be analyzed, can be entered with: -g generation"));
                    console.log(colors.magenta("  ~> all         : It shows all the available information, 1 parameters, the generation to be analyzed, can be entered with: -g generation"));
                    console.log();
                    console.log(colors.yellow(colors.bold("  Performance Comparation")));
                    console.log(colors.yellow("  ~> comparation : Start a comparison between two generations, 1 parameter, the type of comparison, can be entered with: -type & -t, | equivalent with com"));
                    console.log(colors.yellow("   ^~>  all      : Compare all data, 2 parameters, generations to compare"));
                    console.log(colors.yellow("   ^~>  min      : Minimum value, 2 parameters, the generations to compare"));
                    console.log(colors.yellow("   ^~>  max      : Maximum value, 2 parameters, the generations to compare"));
                    console.log(colors.yellow("   ^~>  range    : The range between the values of a generation, 2 parameters, the generations to compare"));
                    console.log(colors.yellow("   ^~>  average  : The average between all the values,, the generations to compare"));
                    console.log(colors.yellow("   ^~>  median   : Central value of all data, the generations to compare"));
                    console.log(colors.yellow("   ^~>  Q1       : Quartile 1, 2 parameters, the generations to compare"));
                    console.log(colors.yellow("   ^~>  Q3       : Quartile 3, the generations to compare"));
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
                } else if (answer.startsWith("median -g ") | answer.startsWith("Q2 -g ") | answer.startsWith("q2 -g ")) {
                    let g = parseInt(answer.substring(answer.lastIndexOf(" ") + 1))
                    this.Terminal.median(t, g)
                } else if (answer.startsWith("Q1 -g ") | answer.startsWith("q1 -g ")) {
                    let g = parseInt(answer.substring(answer.lastIndexOf(" ") + 1))
                    this.Terminal.Q1(t, g)
                } else if (answer.startsWith("Q3 -g ") | answer.startsWith("q3 -g ")) {
                    let g = parseInt(answer.substring(answer.lastIndexOf(" ") + 1))
                    this.Terminal.Q3(t, g)
                } else if (answer.startsWith("all -g ") | answer.startsWith("q3 -g ")) {
                    let g = parseInt(answer.substring(answer.lastIndexOf(" ") + 1))
                    this.Terminal.all(t, g)
                } else if (answer.startsWith("average -g ")) {
                    let g = parseInt(answer.substring(answer.lastIndexOf(" ") + 1))
                    this.Terminal.average(t, false, g)
                } else if (answer.startsWith("range -l -g ")) {
                    let g = parseInt(answer.substring(answer.lastIndexOf(" ") + 1))
                    this.Terminal.range(t, true, g)
                } else if (answer.startsWith("range -l")) {
                    this.Terminal.range(t, true)
                } else if (answer.startsWith("average -l -g ")) {
                    let g = parseInt(answer.substring(answer.lastIndexOf(" ") + 1))
                    this.Terminal.average(t, true, g)
                } else if (answer.startsWith("average -l")) {
                    let g = parseInt(answer.substring(answer.lastIndexOf(" ") + 1))
                    this.Terminal.average(t, true)
                } else if (answer.startsWith("comparation -type ") | answer.startsWith("comparation -t ") | answer.startsWith("com -type ") | answer.startsWith("com -t ")) {
                    let type = answer.substring(answer.lastIndexOf(" ") + 1)
                    this.Terminal.Comparation(t, type)
                } else {
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