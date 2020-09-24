let sortType = 'Bubble sort';
let startTime;
let endTime;
let startTimeArray = []
let endTimeArray = []
let timeDifference;
let timeDifferenceArray = []
let uploadedArray;
let inputArray;
let numberOfExecutions = 1;
let loading = false;
let numOfGoClicks = 1
let sortedArrayVisible = false;
let userUpload = false;
let inputString;

// TO DO - run algorithm on array before showing results to take off the first run which is different than subsequent runs

// document shows bubble sort text by default
document.getElementById('bubble_info').style.display = 'initial'

// display correct text when dropdown menu options are selected
$('#algo_dropdown').change(showInfo)

// random array generator button 
$('#generate_random_btn').click(getRandom)

$('#array_upload').change(uploadArray)

// run sort function on 'go' click 
$('#sort_btn').click(sort)

// show sorted array button - allows user to hide and display sorted array
$('#showSortedArrayBtn').click(displaySortedArray)

// display information about selected sorting algorithm
function showInfo() {

    sortType = $('#algo_dropdown').val()
    $('.algo_info > p').each(function() {
        if(this.id.split('_').includes(sortType.toLowerCase().split(' ')[0])) {
            this.style.display = 'initial'
        } else {
            this.style.display = 'none'
        }
    })
}

// generate random array
function getRandom() {
    document.getElementById('array_input').value = ''
    let str = ''
    let length = parseInt($('#randSize').val())
    let min = parseInt($('#randMin').val())
    let max = parseInt($('#randMax').val())
    for(let i = 0; i < length; i++) {
        str += (i < length - 1) ? (Math.floor(Math.random() * max) + min + ',') : Math.floor(Math.random() * max) + min
    }
    document.getElementById('array_input').value = str
}

function uploadArray() {
    console.log('change')
    userUpload = true
    let reader = new FileReader()
    reader.readAsText(this.files[0])
    reader.onload = () => {
        uploadedArray = reader.result
        //console.log(uploadedArray)
    }  
}


// identify and run selected sorting algorithm
function sort() {

    let arrayField = $('#array_input').val() 
    inputString = (!userUpload) ? arrayField : uploadedArray

    if(validateString(inputString)) {
        // convert inputString to array
        arrayify(inputString)
        loading = true;
        //spinner()

        // clear times from previous execution
        startTimeArray = []
        endTimeArray = []
        timeDifferenceArray = []
    
        numberOfExecutions = Number($('#num_executions').val())
        
        setTimeout(function() {

            if(sortType === 'Bubble sort') {
                bubbleSort(inputArray)
            }
            else if(sortType === 'Insertion sort') {
                insertionSort(inputArray)
            }
            else if(sortType === 'Quick sort') {
                quickSort(inputArray)
            }
        }, 300)
    }
}

function arrayify(str) {
    // remove trailing comma 
    if(str[str.length-1] === ',') {
        str = str.substring(0, str.length - 1)
    }
    // filter out brackets, then convert string to array of numbers
    inputArray = str.split('').filter(a => a!= '[' && a != ']').join('').split(',').map(a => parseInt(a))
}

// function spinner() {
//     if(loading === true) {
//         document.getElementById('spinner').style.display = 'initial'
//     }
//     else if(loading === false) {
//         document.getElementById('spinner').style.display = 'none'
//     }
// }

function validateString(str) {
    if(str === '') {
        alert('Input is empty.')
        return false
    }
    if(str.match(/[a-zA-Z][!@#$%&*()]/gm)) {
        alert('Array should contain only numbers and commas.')
        return false
    }
    return true
}

function bubbleSort(arr) {

    for(let e = 0; e < numberOfExecutions; e++) {
        startTimeArray.push(performance.now())
        let sorted = false;
        let runs = 0;
        while(!sorted) {
            sorted = true
            for(let i = 0; i < arr.length - 1 - runs; i++) {
                if(arr[i] > arr[i+1]) {
                    let tmp = arr[i]
                    arr[i] = arr[i+1]
                    arr[i+1] = tmp
                    sorted = false;
                }
            }
            runs++
        }
        endTimeArray.push(performance.now())
        //return arr
    }
    results()
}

function insertionSort(arr) {
    for(let e = 0; e < numberOfExecutions; e++) {
        startTimeArray.push(performance.now())
            for(let i = 1; i < arr.length; i++) {
                let current = arr[i]
                let finder = i - 1;
                while(finder >= 0 && arr[finder] > current) {
                    arr[finder + 1] = arr[finder]
                    finder--
                }
                arr[finder + 1] = current;
            }
            endTimeArray.push(performance.now())
        }
    results()
    return arr
}

function quickSort(arr) {
    for(let e = 0; e < numberOfExecutions; e++) {
        startTimeArray.push(performance.now())
        qs(arr, 0, arr.length - 1)
        endTimeArray.push(performance.now())
    }
    results()
}

function qs(arr, left, right) {
    let i;
    if (arr.length > 1) {
        i = partition(arr, left, right); 
        if (left < i - 1) { 
            qs(arr, left, i - 1);
        }
        if (i < right) { 
            qs(arr, i, right);
        }
    }
    return arr;
}

function partition(arr, start, end) {
    let pivot = arr[Math.floor((end + start) / 2)] 
    let l = start
    let r = end
    while (l <= r) {
        while (arr[l] < pivot) {
            l++;
        }
        while (arr[r] > pivot) {
            r--;
        }
        if (l <= r) {
            swap(arr, l, r); 
            l++;
            r--;
        }
    }
    return l;
}

function swap(arr, i1, i2){
    let tmp = arr[i1];
    arr[i1] = arr[i2];
    arr[i2] = tmp;
}

function results() {
    
    for(let i = 0; i < endTimeArray.length; i++) {
        
        let diff = Number((endTimeArray[i] - startTimeArray[i]))
        
        timeDifferenceArray.push(diff) 
    }

    loading = false
    // console.log(inputArray)
    //setTimeout(spinner, 600)
    setTimeout(displayResults, 700)
}

function displayResults() {

    document.getElementById('result_text').style.display = 'initial'

    let avg = numOfGoClicks + '. ' + sortType + ': average of ' + (timeDifferenceArray.reduce((a,b) => a + b) / timeDifferenceArray.length).toFixed(3) + ' miliseconds.  <em>'+ numberOfExecutions +' execution(s). Array size: ' + (inputArray.length) + '.</em>'
    numOfGoClicks++

    $('#result_text').append('<p>'+avg+'</p>')

    console.log(inputArray)
    document.getElementById('showSortedArrayBtn').style.display = 'initial'
    $('#sorted_array_display').append(inputArray)
    
}

function displaySortedArray() {
    if(!sortedArrayVisible) {
        document.getElementById('sorted_array_display').style.visibility = 'visible'
        sortedArrayVisible = true
    } else {
        document.getElementById('sorted_array_display').style.visibility = 'hidden'
        sortedArrayVisible = false
    }
}