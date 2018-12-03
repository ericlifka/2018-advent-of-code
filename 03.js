let fabric =
Array.from(Array(1000))
    .map(() => Array.from(Array(1000))
                    .map(() => 0))

let instructions =
require('./input/03')
    .split('\n')
    .map(line => line.split(/[@,:x ]+/))
    .map(([id, ...data]) => [id, ...data.map(i => parseInt(i, 10))])

instructions
.forEach(([id, left, top, width, height]) => {
    for(let x = left; x < left + width; x++)
        for (let y = top; y < top + height; y++)
            fabric[x][y]++
})

let squaresOverlapped =
fabric.reduce((count, row) => 
    count + row.reduce((count, square) => 
        square > 1 ? count + 1 : count
    , 0)
, 0)

console.log('answer1', squaresOverlapped)

let [id] =
instructions.find(([id, left, top, width, height]) => {
    for(let x = left; x < left + width; x++)
        for (let y = top; y < top + height; y++)
            if (fabric[x][y] > 1)
                return false
    return true
})

console.log('answer2', id)