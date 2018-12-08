module.exports = function (list) {
    return {
        [ Symbol.iterator ]() {
            let step = -1

            return {
                next() {
                    step++
                    if (step === list.length) 
                        step = 0

                    return { value: list[ step ], done: false }
                }
            }
        }
    }
}