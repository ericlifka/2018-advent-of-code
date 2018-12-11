let input =
require('./input/10')
    .split('\n')
    .map(line => line.split(/[<>,]/))
    .map(parts => ([parts[1], parts[2], parts[4], parts[5]]))
    .map(line => line.map(Number))



function printGrid(data) {

    let xs = data.map(parts => parts[0]),
        ys = data.map(parts => parts[1]),
        maxX = Math.max.apply(null, xs),
        minX = Math.min.apply(null, xs),
        maxY = Math.max.apply(null, ys),
        minY = Math.min.apply(null, ys)

    let grid = []
    for (let y = minY; y <= maxY; y++) {
        grid[y] = []
        for (let x = minX; x <= maxX; x++) {
            grid[y][x] = '.'
        }
    }

    data.forEach(([x, y]) => {
        grid[y][x] = '#'
    })

    for (let y = minY; y <= maxY; y++) {
        let line = ''
        for (let x = minX; x <= maxX; x++) {
            line += grid[y][x]
        }
        console.log(line)
    }
}

function stepGrid(data) {
    data.forEach(point => {
        point[0] += point[2]
        point[1] += point[3]
    })
}

printGrid(input)
stepGrid(input)
printGrid(input)
stepGrid(input)
printGrid(input)
stepGrid(input)
printGrid(input)