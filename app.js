

let sortType;
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

document.getElementById('bubble_info').style.display = 'block'

$('#algo_dropdown').change(showInfo)
$('#sort_btn').click(sort)

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

// show array on webpage and save it to var inputArray
// function uploadArray() {
//     inputArray = ($('#array_input').val()).split(',').map(a => parseInt(a))
//     console.log(inputArray)
//     //$('#array_display').append('[ ' + $('#array_input').val() + ' ]')
// }

// identify and run selected sorting algorithm
function sort() {

    if($('#array_input').val() === '') {
        alert('Please input an array.')
        return
    }

    loading = true;
    spinner()
    // clear times from previous execution
    startTimeArray = []
    endTimeArray = []
    timeDifferenceArray = []

    inputArray = ($('#array_input').val()).split(',').map(a => parseInt(a))
    
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
        // if(i === 0) {
        //     console.log('sorted array: ',arr)
        // }
        endTimeArray.push(performance.now()) 
    }
   
    console.log(arr)
    results()
    //return arr
    
}
// for each number find the right place for it and when place is found, shift everthing to the right and put it in.
// for each number, check each number to the left, if greater - shift it right, if less, put current number after it.
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
    console.log(arr)
    return arr
}

function quickSort(arr) {
    for(let e = 0; e < numberOfExecutions; e++) {
        startTimeArray.push(performance.now())
        qs(arr, 0, arr.length - 1)
        endTimeArray.push(performance.now())
    }
    results()
    console.log(arr)
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
    //console.log(startTimeArray, endTimeArray)
    for(let i = 0; i < endTimeArray.length; i++) {
        //looping through endtimearray and adding diff between curelem and start time elem in same index to timediff arr
        let diff = Number((endTimeArray[i] - startTimeArray[i]))
        
        timeDifferenceArray.push(diff) 
    }

    loading = false
    setTimeout(spinner, 600)
    setTimeout(displayResults, 700)

    //console.log('start time array',startTimeArray)
    //console.log('end time array',endTimeArray)
    //console.log('diff',diff)
    //console.log('time diff array',timeDifferenceArray)

}

function displayResults() {

    document.getElementById('result_text').style.display = 'block'

    let avg = numOfGoClicks + '. ' + sortType + ': average of ' + (timeDifferenceArray.reduce((a,b) => a + b) / timeDifferenceArray.length).toFixed(3) + ' miliseconds.  <em>'+ numberOfExecutions +' execution(s).</em>'
    numOfGoClicks++

    console.log(avg)

    $('#result_text').append('<p>'+avg+'</p>')
}