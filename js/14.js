const TARGET = 846601 + 10

function generateRecipes (val1, val2) {
    return `${val1 + val2}`.split('').map(char =>
        parseInt(char, 10))
}

let elf1 = 0,
    elf2 = 1,
    recipes = [3, 7]

while (recipes.length < TARGET) {
    let elf1Value = recipes[ elf1 ],
        elf2Value = recipes[ elf2 ],
        newRecipes = generateRecipes( elf1Value, elf2Value )

    newRecipes.forEach( recipe => recipes.push(recipe) )

    elf1 = (elf1 + elf1Value + 1) % recipes.length
    elf2 = (elf2 + elf2Value + 1) % recipes.length
}

console.log( recipes.slice(-10).join('') )