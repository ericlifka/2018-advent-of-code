let fabric =
Array.from(Array(1000))
    .map(() => Array.from(Array(1000))
                    .map(() => 0))

require('./input/03')
    .split('\n')
    .map(line => line.split(/[@,:x ]+/))
    .map(data => data.map(i => parseInt(i, 10)))
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
