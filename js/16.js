const splitter = seq => str => str.split(seq)
const logger = str => console.log(str)
const len = entity => entity.length
const update = (registers, reg, val, 
                clone = registers.slice(0)) => (
                    clone[ reg ] = val, 
                    clone)
const compare = ([a1, ...a_rest], [b1, ...b_rest]) =>
                    a1 === undefined && b1 === undefined
                        ? true
                        : a1 === b1 && compare(a_rest, b_rest)
const addInto = (key, value, collection) => (
                    (collection[ key ]
                        ? collection[ key ].push( value )
                        : collection[ key ] = [ value ]),
                    collection)
const bucket = (get, [item, ...rest]) =>
                    item === undefined
                        ? {}
                        : addInto( get(item), item, bucket(get, rest) )

const addr = (regs, [op, r_a, r_b, r_c]) => update(regs, r_c, regs[ r_a ] + regs[ r_b ])
const addi = (regs, [op, r_a, v_b, r_c]) => update(regs, r_c, regs[ r_a ] + v_b)
const mulr = (regs, [op, r_a, r_b, r_c]) => update(regs, r_c, regs[ r_a ] * regs[ r_b ])
const muli = (regs, [op, r_a, v_b, r_c]) => update(regs, r_c, regs[ r_a ] * v_b)
const banr = (regs, [op, r_a, r_b, r_c]) => update(regs, r_c, regs[ r_a ] & regs[ r_b ])
const bani = (regs, [op, r_a, v_b, r_c]) => update(regs, r_c, regs[ r_a ] & v_b)
const borr = (regs, [op, r_a, r_b, r_c]) => update(regs, r_c, regs[ r_a ] | regs[ r_b ])
const bori = (regs, [op, r_a, v_b, r_c]) => update(regs, r_c, regs[ r_a ] | v_b)
const setr = (regs, [op, r_a, ___, r_c]) => update(regs, r_c, regs[ r_a ])
const seti = (regs, [op, v_a, ___, r_c]) => update(regs, r_c, v_a)
const gtir = (regs, [op, v_a, r_b, r_c]) => update(regs, r_c, v_a > regs[ r_b ] ? 1 : 0)
const gtri = (regs, [op, r_a, v_b, r_c]) => update(regs, r_c, regs[ r_a ] > v_b ? 1 : 0)
const gtrr = (regs, [op, r_a, r_b, r_c]) => update(regs, r_c, regs[ r_a ] > regs[ r_b ] ? 1 : 0)
const eqir = (regs, [op, v_a, r_b, r_c]) => update(regs, r_c, v_a == regs[ r_b ] ? 1 : 0)
const eqri = (regs, [op, r_a, v_b, r_c]) => update(regs, r_c, regs[ r_a ] == v_b ? 1 : 0)
const eqrr = (regs, [op, r_a, r_b, r_c]) => update(regs, r_c, regs[ r_a ] == regs[ r_b ] ? 1 : 0)

const opcodes = [ gtrr, borr, gtir, eqri, addr, seti, eqrr, gtri, 
                  banr, addi, setr, mulr, bori, muli, eqir, bani ]
const runTestCase = ({ before, instruction, after }) =>
    1 == len( operations.filter( operation => 
                                    compare( after, operation(before, instruction))))

let [ p1input, p2input ] = require('./input/16').split('\n\n\n\n')

let p1_test_cases =
p1input.split('\n\n')
    .map(splitter('\n'))
    .map(([before, instruction, after]) => ({
        before: eval( before.split(': ')[ 1 ] ),
        instruction: eval( `[${instruction.split(' ').join(', ')}]` ),
        after: eval( after.split(': ')[ 1 ] )
    }))

let registers = [ 0, 0, 0, 0 ]
p2input.split('\n')
    .map(line => eval( `[${line.split(' ').join(', ')}]` ))
    .forEach(instruction => (
        registers = opcodes[ instruction[ 0 ] ](registers, instruction)))

console.log(registers)