var number = 0

const genNumber = () => {
    number = Math.floor(Math.random() * 100 + 1)
}

const getNumber = () => {
    return number
}

const genNumberFromMemory = (memory) => {
    const lower = memory[0]*1+1
    const upper = memory[1]*1-1
    return Math.floor(Math.random() * (upper-lower+1) + lower)
}

export {genNumber, getNumber, genNumberFromMemory}