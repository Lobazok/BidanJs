const color = (text, r  = 255,  g  = 255 , b = 255 ) => {
    return`\x1b[38;2;${r};${g};${b}m${text}\x1b[0m`;
}

const black = (text) => {
    return `\x1b[30m${text}\x1b[0m`
}

const red = (text) => {
    return `\x1b[31m${text}\x1b[0m`
}

const green = (text) => {
    return `\x1b[32m${text}\x1b[0m`
}

const yellow = (text) => {
    return `\x1b[33m${text}\x1b[0m`
}

const blue = (text) => {
    return `\x1b[34m${text}\x1b[0m`
}

const magenta = (text) => {
    return `\x1b[35m${text}\x1b[0m`
}

const cyan = (text) => {
    return `\x1b[36m${text}\x1b[0m`
}

const white = (text) => {
    return `\x1b[37m${text}\x1b[0m`
}

const bold = (text) => {
    return `\x1b[1m${text}\x1b[0m`
}
const dim = (text) => {
    return `\x1b[2m${text}\x1b[0m`
}
const italic = (text) => {
    return `\x1b[3m${text}\x1b[0m`
}
const underline = (text) => {
    return `\x1b[4m${text}\x1b[0m`
}
const blink = (text) => {
    return `\x1b[5m${text}\x1b[0m`
}
const inverse = (text) => {
    return `\x1b[7m${text}\x1b[0m`
}
const grey = (text ) => {
    return`\x1b[38;2;${217};${200};${214}m${text}\x1b[0m`;
}
const gray = (text ) => {
    return`\x1b[38;2;${80};${80};${150}m${text}\x1b[0m`;
}
Cilan = {
    color     : color    ,
    black     : black    ,
    red       : red      , 
    green     : green    ,
    yellow    : yellow   ,
    blue      : blue     ,  
    magenta   : magenta  ,
    cyan      : cyan     ,
    white     : white    ,
    bold      : bold     ,
    dim       : dim      ,
    italic    : italic   ,
    underline : underline,
    blink     : blink    ,
    inverse   : inverse  ,
    grey      : grey     ,
    gray      : gray     ,
}

module.exports = Cilan;