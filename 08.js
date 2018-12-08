let numbers =
require('./input/08.js')
    .split(' ')
    .map(i => parseInt(i, 10))

let metadata_collection = [ ]

function processNode(numbers, index) {
    let children = numbers[ index++ ],
        metadata = numbers[ index++ ]

    for (let i = 0; i < children; i++) {
        index = processNode(numbers, index)
    }

    for (let j = 0; j < metadata; j++) {
        metadata_collection.push( numbers[ index ] )
        index++
    }

    return index
}

processNode(numbers, 0)

let sum =
metadata_collection.reduce( (accum, i) => accum + i, 0 )
console.log(sum)
