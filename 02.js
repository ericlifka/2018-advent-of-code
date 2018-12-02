let ids = 
require('./input/02')
    .split('\n')

buckets = ids
    .map(id => id.split(''))
    .map(idarr => idarr.sort())
    .map(idarr => idarr.join(''))
    .map(id => bucket(id))

let twos = buckets.reduce((accum, id) => isTwo(id) ? accum + 1 : accum, 0)
let threes = buckets.reduce((accum, id) => isThree(id) ? accum + 1 : accum, 0)

console.log(`twos(${twos}) * threes(${threes}) = ${twos * threes}`)
console.log('answer2', findSimilar(ids))

function isTwo(bucket) {
    for (let l in bucket)
        if (bucket[ l ] == 2)
            return true
    
    return false
}

function isThree(bucket) {
    for (let l in bucket)
        if (bucket[ l ] == 3)
            return true

    return false
}

function bucket(str) {
    let bucket = { }
    for (s of str) {
        if (bucket[ s ]) 
            bucket[ s ]++
        else
            bucket[ s ] = 1
    }
    return bucket
}

function compare(id1, id2) {
    let mismatches = 0
    for (let i in id1)
        if (id1[ i ] != id2[ i ])
            mismatches++

    return mismatches == 1
}

function findSimilar(ids) {
    for (let id1 of ids)
        for (let id2 of ids)
            if (compare(id1, id2))
                return removeDissimilar(id1, id2)
}

function removeDissimilar(id1, id2) {
    let accum = ''
    for (let i in id1)
        if (id1[ i ] == id2[ i ])
            accum += id1[ i ]
    
    return accum
}