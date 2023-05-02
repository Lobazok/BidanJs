const analytic = require("./performanceAnalytics")
const readline = require('readline');

const terminal = readline.createInterface({
    input: process.stdin,
    output: process.stdout
});

let file;

const panel = () => {
    let analisis = new analytic(file, 0)

    analisis.openTerminal()
}

terminal.question("file: ", (name) => {
    file = name;
    terminal.close()
    panel()
})

