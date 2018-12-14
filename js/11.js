const startTime = new Date()
const GRID_CERIAL_NUMBER = 5468

const empty = size => Array.from(Array(size))
const table = (size, val) =>
    empty(size).map((_, y) => empty(size).map((_, x) =>
        val(x, y)))

const getHundredsPlace = x =>
    x < 100 
        ? 0
        : Number( `${x}`.slice(-3, -2) )

const calcPowerLevel = (x, y, rackId = x + 10) =>
    getHundredsPlace( ( rackId * y  + GRID_CERIAL_NUMBER ) * rackId ) - 5

let powerGrid = table(301, (x, y) => calcPowerLevel(x, y)),
    sumTable = table(301, () => 0)

for ( let y = 1, rowSum = 0; y <= 300; y++, rowSum = 0 )
    for ( let x = 1; x <= 300; x++ )
        sumTable[ y ][ x ] = ( rowSum += powerGrid[ y ][ x ] ) + sumTable[ y - 1 ][ x ]

const dataPrepTime = new Date()

let threeMax = { x: 0, y: 0, s: 3, sum: 0 }
for ( let y = 1; y <= 298; y++ )
    for ( let x = 1; x <= 298; x++ ) {
        let upper = sumTable[ y - 1 ][ x - 1 ],
            lower = sumTable[ y + 2 ][ x + 2 ],
            left = sumTable[ y + 2 ][ x - 1 ],
            top = sumTable[ y - 1 ][ x + 2 ],
            sum = lower + upper - left - top

        if ( sum > threeMax.sum )
            threeMax = { x, y, s: 3, sum }
    }

const part1Time = new Date()

let allMax = threeMax
for ( let y = 1; y <= 297; y++ )
    for ( let x = 1; x <= 297; x++ )
        for ( let s = 3; s + x <= 300 && s + y <= 300; s++ ) {
            let upper = sumTable[ y - 1 ][ x - 1 ],
                lower = sumTable[ y + s ][ x + s ],
                left = sumTable[ y + s ][ x - 1 ],
                top = sumTable[ y - 1 ][ x + s ],
                sum = lower + upper - left - top

            if ( sum > allMax.sum )
                allMax = { x, y, s: s + 1, sum }

            if (sum < 0)
                break
        }

const part2Time = new Date()

console.log(`Data prep: ${dataPrepTime - startTime}ms`)
console.log(`Part 1 time: ${part1Time - dataPrepTime}ms, ${JSON.stringify(threeMax)}`)
console.log(`Part 2 time: ${part2Time - part1Time}ms, ${JSON.stringify(allMax)}`)
console.log(`Total time: ${part2Time - startTime}ms`)
