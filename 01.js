let input = require('./input/01')

let frequencies = 
input
    .split('\n')
    .map((n => parseInt(n, 10)))

let answer1 = 
frequencies
    .reduce((accum, curr) => accum + curr, 0)

console.log('answer1', answer1)

let seen = { }
let f = 0
let loop = 0
while (true) {
    for (let i of frequencies) {
        f += i
        if (seen [ f ]) {
            console.log('answer2', f);
            return
        }
        else {
            seen[ f ] = true
        }
    }
    console.log(loop++)
}