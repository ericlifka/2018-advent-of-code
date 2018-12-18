const start = new Date()
const TARGET = `846601`
const TARGET_COUNT = TARGET.length

function generateRecipes (val1, val2) {
    return `${val1 + val2}`.split('').map(char =>
        parseInt(char, 10))
}

let elf1 = 0,
    elf2 = 1,
    recipes = [3, 7]

while (true) {
    let elf1Value = recipes[ elf1 ],
        elf2Value = recipes[ elf2 ],
        newRecipes = generateRecipes( elf1Value, elf2Value )

    newRecipes.forEach( recipe => recipes.push(recipe) )

    elf1 = (elf1 + elf1Value + 1) % recipes.length
    elf2 = (elf2 + elf2Value + 1) % recipes.length

    let last = recipes.slice(-TARGET_COUNT).join('')
    let last2 = recipes.slice(-TARGET_COUNT - 1, -1).join('')
    
    if ( last == TARGET ) {
        console.log( recipes.length - TARGET_COUNT )
        break
    } else if ( last2 == TARGET  ) {
        console.log( recipes.length - TARGET_COUNT - 1 )
        break
    }
}

console.log('time: ', new Date() - start)