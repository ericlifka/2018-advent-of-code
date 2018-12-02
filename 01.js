let input = require('./input/01')
let circular = require('./util/circular')

let frequencies = 
input
    .split('\n')
    .map((n => parseInt(n, 10)))

let answer1 = 
frequencies
    .reduce((accum, curr) => accum + curr, 0)

console.log('answer1', answer1)

let frequencyList = circular(frequencies)
let frequency = 0
let seen = { }
for (let f of frequencyList) {
    frequency += f
    if (seen [ frequency ]){
        console.log('answer2', frequency)
        return
    }
    seen[ frequency ] = true
}