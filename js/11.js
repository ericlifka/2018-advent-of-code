const GRID_CERIAL_NUMBER = 5468

function getHundredsPlace (x) {
    if (x < 100) return 0
    let str = "" + x
    return Number(str[ str.length - 3 ])
}

let cache = { }
function calcPowerLevel(x, y, gridCerial) {
    if ( cache[ `${x}.${y}` ] ) {
        return cache[ `${x}.${y}` ]
    }

    let rackId = x + 10,
        powerLevel = rackId * y 

    powerLevel += gridCerial
    powerLevel *= rackId

    let hundreds = getHundredsPlace(powerLevel)

    return hundreds - 5
}

function getGrid (x, y, size) {

}

let max = -1,
    coord = [0, 0],
    sums = [ ],
    last = new Date()

for (let s = 1; s <= 300; s++) {
    let now = new Date()
    console.log(`size ${s} - ${now - last}`)
    last = now

    for (let x = 1; x < 302 - s; x++) {
        for (let y = 1; y < 302 - s; y++) {

            let sum = 0

            for (let _x = 0; _x < s; _x++) {
                for (let _y = 0; _y < s; _y++) {
                    sum += calcPowerLevel( x + _x, y + _y, GRID_CERIAL_NUMBER )
                }
            }

            if (sum > max) {
                max = sum
                coord = [ x, y ]
                console.log(`new sum ${max} - ${coord}`)
            }
        }
    }
}

console.log(max, coord)
