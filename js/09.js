const circularNode = number => 
    ({ number, right: null, left: null })

const newList = (number = 0, node = circularNode(number)) => 
    ( node.left = node,
      node.right = node )

const insertAfter = (head, number, node = circularNode(number)) =>  
    ( node.left = head,
      node.right = head.right,
      head.right.left = node,
      head.right = node )

const removeBefore = (head, removed = head.left) => 
    ( head.left = removed.left,
      head.left.right = head,
      removed.number )

const moveRight = (head, number = 1) => 
    number == 0
        ? head
        : moveRight(head.right, number - 1)

const moveLeft = (head, number = 1) =>
    number == 0
        ? head
        : moveLeft(head.left, number -1)

let start = new Date(),
    list = newList(),
    input = require('./input/09').split(' '),
    player = 1,
    players = parseInt(input[ 0 ], 10) + 1,
    scores = Array.from(Array(players)).map(i => 0),
    lastMarble = parseInt(input[ 6 ], 10) * 100

for (let i = 1; i <= lastMarble; i++) {
    if (i % 23 == 0) {
        list = moveLeft(list, 6)
        scores[ player ] += i + removeBefore(list)
    }
    else list = insertAfter(moveRight(list), i)

    if ( ++player >= players ) 
        player = 1
}

console.log(lastMarble)
console.log('part 2', Math.max.apply(null, scores))
console.log('time elapsed', new Date() - start)