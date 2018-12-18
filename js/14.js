let start = new Date(),
    TARGET = '846601',
    TARGET_COUNT = TARGET.length,
    elf1 = 0,
    elf2 = 1,
    recipes = [ 3, 7 ],
    index = -1,
    lastN, elf1Value, elf2Value, sum

while ( index == -1 ) {
    elf1Value = recipes[ elf1 ]
    elf2Value = recipes[ elf2 ]
    sum = elf1Value + elf2Value

    if ( sum >= 10 )
        recipes.push( 1 ),
        recipes.push( sum % 10 )
    else
        recipes.push( sum )

    elf1 = (elf1 + elf1Value + 1) % recipes.length
    elf2 = (elf2 + elf2Value + 1) % recipes.length

    lastN = recipes.slice( -TARGET_COUNT - 1 ).join('')
    index = lastN.indexOf( TARGET )
}

console.log( recipes.length - TARGET_COUNT - [ 1, 0 ][ index ] )
console.log( 'time: ', new Date() - start )