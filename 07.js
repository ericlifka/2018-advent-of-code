let dependencies = 
require('./input/07')
   .split('\n')
   .map( line => line.split(' ') )
   .map( desc => [ desc[ 1 ], desc[ 7 ] ] ) 

let nodes = { }
const newNode = (name) => ({ name, before: [], after: [], visited: false })
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
let unfinished = [ ]

while ( queue.length > 0 ) {
    queue.sort()

    let next = queue.shift(),
        node = nodes[ next ]
    order += next
    node.visited = true

    node.after.forEach( n =>
        nodes[ n ].before.reduce( (accum, parent) => nodes[ parent ].visited && accum, true )
            ? queue.push(n)
            : unfinished.push(n) )
}

console.log('part 1', order)