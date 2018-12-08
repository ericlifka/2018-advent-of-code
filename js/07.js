let dependencies = 
require('./input/07')
   .split('\n')
   .map( line => line.split(' ') )
   .map( desc => [ desc[ 1 ], desc[ 7 ] ] ) 

let nodes = { }
const newNode = (name) => ({ name, before: [], after: [] })
const getNode = (name) =>
    nodes[ name ]
        ? nodes[ name ]
        : nodes[ name ] = newNode( name )

dependencies
.forEach( ([ left, right ]) => {
    let parent = getNode(left),
        child = getNode(right)

    parent.after.push(child.name)
    child.before.push(parent.name)
})

let order = ''
let queue = Object.keys(nodes).filter( n => nodes[ n ].before.length == 0 )

while ( queue.length > 0 ) {
    queue.sort()

    let next = queue.shift(),
        node = nodes[ next ]
    order += next
    node.visited = true

    node.after.forEach( n =>
        nodes[ n ].before.reduce( (accum, parent) => nodes[ parent ].visited && accum, true )
            ? queue.push(n)
            : null )
}

console.log('part 1', order)

const PROCESSING_ORDER = '_ABCDEFGHIJKLMNOPQRSTUVWXYZ', 
      HELPERS = 5
let finished = [],
    active = [],
    second = 0,
    pending = Object.keys(nodes).filter( n => nodes[ n ].before.length == 0 )

Object.keys(nodes).forEach(n => nodes[n].processingLeft = 60 + PROCESSING_ORDER.indexOf(n))

while ( active.length > 0 || pending.length > 0 ) {
    pending.sort()

    while ( active.length < HELPERS && pending.length > 0 )
        active.push( pending.shift() )

    finished = active.filter( n => --nodes[ n ].processingLeft <= 0 )
    active = active.filter( n => nodes[ n ].processingLeft > 0 )

    finished.forEach( n => (
        nodes[ n ].finished = true,
        nodes[ n ].after.forEach( n =>
            nodes[ n ].before.reduce( (accum, parent) => nodes[ parent ].finished && accum, true )
                ? pending.push(n)
                : null )))

    second++
}

console.log(`part 2 ${second} seconds`)