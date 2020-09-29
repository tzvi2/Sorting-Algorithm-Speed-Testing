



// generate random array
function getRandom(size, min, max) {
    let str = ''
    for(let i = 0; i < size; i++) {
        str += (i < size - 1) ? (Math.floor(Math.random() * max) + min + ',') : Math.floor(Math.random() * max) + min
    }
    return str
}

// validate input string
function validateString(str) {
    // empty input
    if(str === '') {
        alert('Input is empty.')
        return false
    }
    // input contains letters or symbols
    if(str.match(/[a-zA-Z][!@#$%&*()]/gm)) {
        alert('Array should contain only numbers and commas.')
        return false
    }
    return true
}

// convert input string to array
function arrayify(str) {
    // remove trailing comma 
    if(str[str.length-1] === ',') {
        str = str.substring(0, str.length - 1)
    }
    // filter out any brackets, then convert string to array of numbers
    return str.split('').filter(a => a!= '[' && a != ']').join('').split(',').map(a => parseInt(a))

}

function executeXTimes(algo, arr, num, startArr, endArr, callback) {
    console.log('executing x times')
    for(let i = 0; i < num; i++) {
        startArr.push(performance.now())
        algo(arr)
        endArr.push(performance.now())
    }
    callback()
}

function clearField(id_string) {
    document.getElementById(id_string).value = ''
}

export { getRandom, validateString, arrayify, executeXTimes, clearField}