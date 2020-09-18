let sortType = 'Bubble sort';
let startTime;
let endTime;
let startTimeArray = []
let endTimeArray = []
let timeDifference;
let timeDifferenceArray = []
let inputArray;
let numberOfExecutions = 1;
let loading = false;
let numOfGoClicks = 1
let sortedArrayVisible = false;

// TO DO - run algorithm on array before showing results to take off the first run which is different than subsequent runs

// document shows bubble sort text by default
document.getElementById('bubble_info').style.display = 'block'

// display correct text when dropdown menu options are selected
$('#algo_dropdown').change(showInfo)

// run sort function on 'go' click 
$('#sort_btn').click(sort)

// event listener on show sorted array button
$('#showSortedArrayBtn').click(function() {

    let sortedArrayArea = $('#sorted_array')

    if(sortedArrayVisible === false) {

    }
})

function showInfo() {

    sortType = $('#algo_dropdown').val()

    $('#algo_info > p').each(function() {
        if(this.id.split('_').includes(sortType.toLowerCase().split(' ')[0])) {
            this.style.display = 'block'
        } else {
            this.style.display = 'none'
        }
    })
}

// generate random array
function getRandom() {
    
}


// identify and run selected sorting algorithm
function sort() {

    let arrayField = $('#array_input').val()

    if(arrayField === '') {
        alert('Please input an array.')
        return
    }
    if(arrayField.match(/[^,0-9]/gm)) {
        alert('Enter only numbers and commas in the array field.')
        return
    }

    loading = true;
    spinner()

    // clear times from previous execution
    startTimeArray = []
    endTimeArray = []
    timeDifferenceArray = []

    inputArray = arrayField.split(',').map(a => parseInt(a))
    
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

function spinner() {
    if(loading === true) {
        document.getElementById('spinner').style.display = 'block'
    }
    else if(loading === false) {
        document.getElementById('spinner').style.display = 'none'
    }
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
    setTimeout(spinner, 600)
    setTimeout(displayResults, 700)
}

function displayResults() {

    document.getElementById('result_text').style.display = 'block'

    let avg = numOfGoClicks + '. ' + sortType + ': average of ' + (timeDifferenceArray.reduce((a,b) => a + b) / timeDifferenceArray.length).toFixed(3) + ' miliseconds.  <em>'+ numberOfExecutions +' execution(s).</em>'
    numOfGoClicks++

    $('#result_text').append('<p>'+avg+'</p>')
}