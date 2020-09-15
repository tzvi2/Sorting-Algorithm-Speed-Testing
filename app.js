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
   
    //console.log(arr)
    results()
    return arr
    
}

function quickSort(arr) {
    qs(arr, 0, arr.length - 1);
    console.log(arr)
    return arr;


    function qs(arr, start, end) {
        if(start >= end) return;
        const pivot = start;
        let l = start + 1;
        let r = end;
        while (r >= l) {
            if (arr[l] > arr[pivot] && arr[r] < arr[pivot]) {
                swap(l, r, arr);
            }
            if (arr[l] <= arr[pivot]) l++;
            if (arr[r] >= arr[pivot]) r--;
        }
        swap(pivot, r, arr);
        qs(arr, start, r - 1)
        qs(arr, r + 1, end)
    } 

    function swap(i, j, arr) {
        let temp = arr[j];
        arr[j] = arr[i];
        arr[i] = temp;
    }
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

    let avg = sortType + ': average of ' + (timeDifferenceArray.reduce((a,b) => a + b) / timeDifferenceArray.length).toFixed(3) + ' miliseconds.'

    console.log(avg)

    $('#result_text').append('<p>'+avg+'</p>')

}

