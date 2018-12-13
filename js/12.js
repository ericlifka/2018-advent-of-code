let rules = 
require('./input/12')
    .split('\n')
    .map(rule => rule.split(' => ')) // [ [ '#.#..', '#' ], ... ]
    .reduce( (collection, [ key, value ]) => 
        (collection[ key ] = value, collection), { } ) // { '#.#..': '#', ... }

let state = `..........##.##.##..#..#.#.#.#...#...#####.###...#####.##..#####.#..#.##..#..#.#...#...##.##...#.##......####...........`
let index_offset = 10

function next_generation(last_gen) {
    let next = '..'
    for (let i = 2; i < last_gen.length - 2; i++) {
        let substate = last_gen.slice( i - 2, i + 3 )
        next += rules[ substate ]
    }
    if (next[ next.length - 1 ] == '#')
        next += '.....'

    next += '..'

    return next
}

const score_of_generation = gen => 
    gen.split('')
    .reduce( (sum, char, i) => 
        char == '#'
            ? sum + i - index_offset
            : sum
    , 0 )

let new_score, i, step
    old_score = score_of_generation(state)

for (i = 1; i <= 120; i++) {
    state = next_generation(state)
    new_score = score_of_generation(state)
    step = new_score - old_score
    old_score = new_score

    if (i == 20)
        console.log('part 1', new_score)
}

console.log('part 2', (50000000000 - i + 1) * step + old_score)