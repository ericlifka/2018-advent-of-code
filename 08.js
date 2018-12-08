let numbers =
require('./input/08.js')
// `2 3 0 3 10 11 12 1 1 0 1 99 2 1 1 2`
    .split(' ')
    .map(i => parseInt(i, 10))

let metadata_collection = [ ]

function processNode(numbers, index) {
    let children = numbers[ index++ ],
        metadata = numbers[ index++ ],
        childValues = [ 0 ],
        metaDataValues = [ ],
        value = 0

    for (let i = 1; i <= children; i++) {
        [ index, childValues[ i ] ] = processNode(numbers, index)
    }

    for (let j = 0; j < metadata; j++) {
        metaDataValues.push( numbers[ index++ ] )
    }
    console.log(childValues, metaDataValues)

    metadata_collection = metadata_collection.concat( metaDataValues )

    if (children == 0) {
        value = metaDataValues.reduce( (sum, i) => sum + i, 0 )
    } else {
        value = metaDataValues.reduce( (sum, m) => {
            if ( m < childValues.length ) {
                return sum + childValues[ m ]
            } else {
                return sum
            }
        }, 0 )
    }

    // console.log([index, value])
    return [ index, value ]
}

let [ _, parentValue ] =
processNode(numbers, 0)

let sum =
metadata_collection.reduce( (accum, i) => accum + i, 0 )
console.log('part 1', sum)
console.log('part 2', parentValue)