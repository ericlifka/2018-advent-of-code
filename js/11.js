const GRID_CERIAL_NUMBER = 5468

function getHundredsPlace (x) {
    if (x < 100) return 0
    let str = "" + x
    return Number(str[ str.length - 3 ])
}

let power_cache = { }
function calcPowerLevel(x, y, gridCerial = GRID_CERIAL_NUMBER) {
    let cache_key = `${x}.${y}`
    if ( power_cache[ cache_key ] ) {
        return power_cache[ cache_key ]
    }

    let rackId = x + 10,
        powerLevel = rackId * y 

    powerLevel += gridCerial
    powerLevel *= rackId

    let hundreds = getHundredsPlace(powerLevel)
    let answer = hundreds - 5
    power_cache[ cache_key ] = answer

    return answer
}

let grid_cache = { }
function getGridSum (x, y, size) {
    let cache_key = `${x}.${y}.${size}`
    let answer = null

    if (size == 1) {
        answer = calcPowerLevel(x, y)
    }
    else {
        let answer = grid_cache[ `${x}.${y}.${size - 1}` ]
        // bottom row
        for (let _x = 0; _x < size; _x++) {
            answer += calcPowerLevel(x + _x, y + size - 1)
        }
        // right row
        for (let _y = 0; _y < size - 1; _y++) {
            answer += calcPowerLevel(x + size - 1, y + _y)
        }
    }

    grid_cache[ cache_key ] = answer
    return answer
}

let max = -1,
    coord = [0, 0],
    sums = [ ],
    last = new Date()

for (let s = 1; s <= 1; s++) {
    let now = new Date()
    console.log(`size ${s} - ${now - last}`)
    last = now

    for (let x = 1; x < 302 - s; x++) {
        for (let y = 1; y < 302 - s; y++) {

            let sum = getGridSum(x, y, x)
            sums.push(sum)

            if (sum > max) {
                max = sum
                coord = [ x, y ]
                console.log(`new sum ${max} - ${coord}`)
            }
        }
    }
}
console.log(sums)
console.log(max, coord)
