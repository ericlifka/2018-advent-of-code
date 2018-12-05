let tokens = 
require('./input/05')
// 'dabAcCaCBAcCcaDA'
    .split('')

let pairs = {
    'a': 'A', 'A': 'a',
    'b': 'B', 'B': 'b',
    'c': 'C', 'C': 'c',
    'd': 'D', 'D': 'd',
    'e': 'E', 'E': 'e',
    'f': 'F', 'F': 'f',
    'g': 'G', 'G': 'g',
    'h': 'H', 'H': 'h',
    'i': 'I', 'I': 'i',
    'j': 'J', 'J': 'j',
    'k': 'K', 'K': 'k',
    'l': 'L', 'L': 'l',
    'm': 'M', 'M': 'm',
    'n': 'N', 'N': 'n',
    'o': 'O', 'O': 'o',
    'p': 'P', 'P': 'p',
    'q': 'Q', 'Q': 'q',
    'r': 'R', 'R': 'r',
    's': 'S', 'S': 's',
    't': 'T', 'T': 't',
    'u': 'U', 'U': 'u',
    'v': 'V', 'V': 'v',
    'w': 'W', 'W': 'w',
    'x': 'X', 'X': 'x',
    'y': 'Y', 'Y': 'y',
    'z': 'Z', 'Z': 'z'
}

let countpass = 0
let reaction = true
while ( reaction ) {
    reaction = false

    for ( let i = 0; i < tokens.length - 1; i++ ) {
        if ( pairs[ tokens[ i ] ] == tokens[ i + 1 ] ) {
            tokens.splice(i, 2)
            reaction = true
            i--
        }
    }
    countpass++
    if (countpass % 100 == 0) {
        console.log(countpass, tokens.length)
    }
}
console.log(tokens.length)