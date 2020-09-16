//$('#upload_array_btn').click(uploadArray)
$('#sort_btn').click(sort)

let sortType;
let startTime;
let endTime;
let startTimeArray = []
let endTimeArray = []
let timeDifference;
let timeDifferenceArray = []
let inputArray;
let numberOfExecutions = 1;

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

    // clear times from previous execution
    startTimeArray = []
    endTimeArray = []
    timeDifferenceArray = []

    inputArray = ($('#array_input').val()).split(',').map(a => parseInt(a))
    
    sortType = $('#algo_dropdown').val() 
    numberOfExecutions = Number($('#num_executions').val())
    
    if(sortType === 'Bubble sort') {
        bubbleSort(inputArray)
    }
    else if(sortType === 'Insertion sort') {
        insertionSort(inputArray)
    }
    else if(sortType === 'Quick sort') {
        quickSort(inputArray)
    }
}

function bubbleSort(arr) {

    for(let i = 0; i < numberOfExecutions; i++) {
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

function quickSort(arr) {
    for(let i = 0; i < numberOfExecutions; i++) {
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

    //console.log('start time array',startTimeArray)
    //console.log('end time array',endTimeArray)
    //console.log('diff',diff)
    //console.log('time diff array',timeDifferenceArray)

    let avg = sortType + ': average of ' + (timeDifferenceArray.reduce((a,b) => a + b) / timeDifferenceArray.length).toFixed(3) + ' miliseconds. ('+ numberOfExecutions +' execution(s))'

    console.log(avg)

    $('#result_text').append('<p>'+avg+'</p>')

}

