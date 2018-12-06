let ids = 'abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ'
let coordinates =
require('./input/06')
    .split('\n')
    .map(line => line.split(', '))
    .map(([x, y], i) => ({id: ids[ i ], x: parseInt(x, 10), y: parseInt(y, 10)}))



function closestCoord(point, coordinates) {
    let distances = 
    coordinates.map(({x, y}) => 
        Math.abs(x - point.x) + Math.abs(y - point.y))

    let closest =
    distances.reduce((accum, current) => 
        current < accum ? current : accum
    , 5000)

    let index =
    distances.reduce((accum, current, index) => 
        current === closest 
            ? accum === ''
                ? index
                : '.'
            : accum
    , '')

    return index == '.' ? 
        index : 
        coordinates[ index ].id
}

let counts1 = { }
for (var x = 0; x < 400; x++) {
    for (var y = 0; y < 400; y++) {
        let closest = closestCoord({x, y}, coordinates)
        counts1[ closest ] = ( counts1[ closest ] || 0 ) + 1
    }
}

let counts2 = { }
for (var x = -50; x < 450; x++) {
    for (var y = -50; y < 450; y++) {
        let closest = closestCoord({x, y}, coordinates)
        counts2[ closest ] = ( counts2[ closest ] || 0 ) + 1
    }
}

let consistent = []
for (let key in counts2)
    if (counts2[ key ] == counts1[ key ]) 
        consistent.push(counts2[ key ])

console.log('Part 1', Math.max.apply(null, consistent))


function inSafe(point, coordinates) {
    let distances = 
    coordinates.map(({x, y}) => 
        Math.abs(x - point.x) + Math.abs(y - point.y))

    let sum =
    distances.reduce((sum, d) => sum + d, 0)

    return sum < 10000
}

let safeCount = 0
for (var x = 0; x < 400; x++)
    for (var y = 0; y < 400; y++)
        if (inSafe({x, y}, coordinates))
            safeCount++

console.log('part 2', safeCount)