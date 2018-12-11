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

    console.log(`x: ${minX}-${maxX}, y: ${minY}-${maxY}`)

    let grid = []

    data.forEach(([x, y]) => {
        grid[`${x}.${y}`] = true
    })

    for (let y = minY; y <= maxY; y++) {
        let line = ''
        for (let x = minX; x <= maxX; x++) {
            if (grid[`${x}.${y}`]){
                line += '#'
            } else {
                line += ' '
            }
            
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

function findMinimumStep(data) {

    let minRect = {area: 10000000000000, timeStep: -1}

    for (let i = 0; i < 20000; i++) {
        let xs = data.map(parts => parts[0]),
            ys = data.map(parts => parts[1]),
            maxX = Math.max.apply(null, xs),
            minX = Math.min.apply(null, xs),
            maxY = Math.max.apply(null, ys),
            minY = Math.min.apply(null, ys),
            area = (maxX - minX) * (maxY - minY)

        if (area < minRect.area) {
            minRect.area = area
            minRect.timeStep = i
        }
        else {
            break
        }

        stepGrid(data)
    }

    return minRect
} // found min to be at step 10003

for (let i = 0; i < 10003; i++) {
    stepGrid(input)
}
printGrid(input)