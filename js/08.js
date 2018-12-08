let numbers =
require('./input/08.js')
// `2 3 0 3 10 11 12 1 1 0 1 99 2 1 1 2`
    .split(' ')
    .map(Number)

let metadataSum = 0

function processNode(index = 0) {
    let children = numbers[ index++ ],
        metadata = numbers[ index++ ],
        childValues = [ 0 ],
        metadataValues = [ ]

    for (let i = 1; i <= children; i++)
        [ index, childValues[ i ] ] = processNode(index)

    for (let j = 0; j < metadata; j++)
        metadataValues.push( numbers[ index++ ] )

    metadataSum += metadataValues.reduce( (sum, i) => sum + i, 0 )

    return [ index,
            !children ? metadataValues.reduce( (sum, i) => sum + i, 0 )
                      : metadataValues.reduce( (sum, m) =>
                            m < childValues.length
                                ? sum + childValues[ m ]
                                : sum
                        , 0 ) ]
}

let [ _, parentValue ] = processNode()

console.log('part 1', metadataSum)
console.log('part 2', parentValue)