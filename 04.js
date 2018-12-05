// [1518-04-11 00:46] falls asleep
// [1518-03-28 00:04] Guard #2663 begins shift

let current,
    guards = 
require('./input/04')
    .split('\n')
    .sort()
    .map(line => line.split(/[- :\[\]]/))
    .reduce((guards, [_, year, month, day, hour, minute, __, ___, command]) =>
        (command == "asleep" || command == "up" 
         ? current.naps.push(parseInt(minute, 10))
         : (guards[command] = current = guards[command] || { id: command, naps: [], minutes: 0 })
        , guards)
    , {})

for (let g in guards) {
    let start, stop, 
        guard = guards[ g ],
        naps = guard.naps
    while ([start, stop, ...naps] = naps, start !== undefined)
        guard.minutes += stop - start
}

let maxGuard =
Object.keys(guards).reduce((max, g) => 
    guards[ g ].minutes > max.minutes ? guards[ g ] : max
, { minutes: -1 })

let start, stop,
    naps = maxGuard.naps,
    minutes = Array.from(Array(60)).map(() => 0)
while ([start, stop, ...naps] = naps, start !== undefined)
    for (let i = start; i < stop; i++)
        minutes[i]++

let max =
minutes.reduce((max, _, current) => 
    minutes[ current ] > minutes[ max ] 
        ? current
        : max
, 0)

console.log(`Strategy 1: Guard: ${ maxGuard.id } * Minute: ${ max }(${minutes[max]}) = ${ parseInt(maxGuard.id.slice(1)) * max }`)

for (let g in guards) {
    let start, stop,
        guard = guards[ g ],
        naps = guard.naps,
        minutes = Array.from(Array(60)).map(() => 0)
    while ([start, stop, ...naps] = naps, start !== undefined)
        for (let i = start; i < stop; i++)
            minutes[i]++
    
    guard.common =
    minutes.reduce((max, _, current) => 
        minutes[ current ] > minutes[ max ] 
            ? current
            : max
    , 0)
    guard.count = minutes[ guard.common ]
}

let mostCommon =
Object.keys(guards).reduce((max, g) => 
    guards[ g ].count > max.count ? guards[ g ] : max
, { count: -1 })

console.log(`Strategy 2: Guard: ${ mostCommon.id } * Minute: ${ mostCommon.common }(${ mostCommon.count }) = ${ parseInt(mostCommon.id.slice(1)) * mostCommon.common }`)