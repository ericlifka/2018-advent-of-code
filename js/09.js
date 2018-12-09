
const circularNode = number => ({ number, right: null, left: null })

const newList = (number = 0, node = circularNode(number)) => (
    node.left = node,
    node.right = node)

const insertAfter = (head, number, node = circularNode(number)) =>  (
    node.left = head,
    node.right = head.right,
    head.right.left = node,
    head.right = node)

const removeBefore = (head, removed = head.left) => (
    head.left = removed.left,
    head.left.right = head,
    removed.number)

const moveRight = (head, number = 1) => 
    number == 0
        ? head
        : moveRight(head.right, number - 1)

const moveLeft = (head, number = 1) =>
    number == 0
        ? head
        : moveLeft(head.left, number -1)

function printList(index, head) {
    let str = `${head.number} `
    for (let n = head.right; n != head; n = n.right) {
        str += n.number + ' '
    }
    console.log(`[${index}] ${str}`)
}
let list = newList(),
    head = list,
    input = require('./input/09').split(' '),
    lastMarble = parseInt(input[ 6 ], 10) * 100,
    player = 1,
    players = parseInt(input[ 0 ], 10) + 1,
    scores = Array.from(Array(players)).map(i => 0),
    removed

for (let i = 1; i <= lastMarble; i++) {
    if (i % 23 == 0) {
        list = moveLeft(list, 6)
        removed = removeBefore(list)
        scores[ player ] += i + removed
    }
    else {
        list = insertAfter(moveRight(list), i)
    }

    if ( ++player >= players ) 
        player = 1
}

console.log(Math.max.apply(null, scores))