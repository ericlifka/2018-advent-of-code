let input = require('./input/01')

let answer = input
    .split('\n')
    .map((n => parseInt(n, 10)))
    .reduce((accum, curr) => accum + curr, 0)

console.log(answer)