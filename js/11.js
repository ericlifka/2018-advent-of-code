const startTime = new Date()
const GRID_CERIAL_NUMBER = 5468

const empty = size => Array.from(Array(size))
const table = (size, val = () => 0) => 
    empty(size).map((_, y) => empty(size).map((_, x) =>
        val(x, y)))

const getHundredsPlace = x =>
    x < 100 
        ? 0
        : Number( `${x}`.slice(-3, -2) )

function calcPowerLevel(x, y, gridCerial = GRID_CERIAL_NUMBER) {
    let rackId = x + 10,
        powerLevel = rackId * y 

    powerLevel += gridCerial
    powerLevel *= rackId

    return getHundredsPlace(powerLevel) - 5
}

let powerGrid = table(301, (x, y) => 
    (x == 0 || y == 0)
        ? 0
        : calcPowerLevel(x, y))

let sumTable = table(301)

for ( let y = 1; y <= 300; y++ ) {
    let rowSum = 0

    for ( let x = 1; x <= 300; x++ ) {
        rowSum += powerGrid[ y ][ x ]

        sumTable[ y ][ x ] = rowSum + sumTable[ y - 1 ][ x ]
    }
}

let max = { x: 0, y: 0, s: 1, sum: 0 }
for ( let y = 1; y <= 300; y++ ) {
    for ( let x = 1; x <= 300; x++ ) {
        let upper = sumTable[ y - 1 ][ x - 1 ]
        for ( let s = 0; s + x <= 300 && s + y <= 300; s++ ) {
            let lower = sumTable[ y + s ][ x + s ],
                
                left = sumTable[ y + s ][ x - 1 ],
                top = sumTable[ y - 1 ][ x + s ],
                sum = lower + upper - left - top

            if ( sum > max.sum ) {
                max = { x, y, s: s + 1, sum }
            }
        }
    }
}

console.log('part 2', max)
console.log('time: ', new Date() - startTime)
