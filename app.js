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
let numOfGoClicks = 0
let sortedArrayVisible = false;
let userUpload = false;
let inputString;
let loading = false;
let loadingBar = document.getElementById('progress_bar')


// phone check
if (navigator.userAgent.match(/mobi/mi)) {
    alert('Please note: this site is not designed for mobile use.')
}

// nav link listeners
$('#testing_page_link').click(styleTesting)
$('#about_page_link').click(styleAbout)

// bold current page
function styleTesting() {
    if($('#testing_page_link').hasClass('active')) {
        return
    } else {
        $('#testing_page_link').toggleClass('active')
    }
}

function styleAbout() {
    if($('#about_page_link').hasClass('active')) {
        return
    } else {
        $('#about_page_link').toggleClass('active')
    }
}

// set display of bubble sort info
document.getElementById('bubble_info').style.display = 'initial'

// hide bubble sort info by default
document.getElementById('bubble_info').style.visibility = 'visible'

// display correct text when dropdown menu options are selected
$('#algo_dropdown').change(getType)

// random array generator button 
$('#generate_random_btn').click(getRandom)

$('#choose_file').change(uploadArray)

// run sort function on 'go' click 
$('#sort_btn').click(sort)

$('#clear_results_btn').click(clearResults)

// log sorted array button listener
$('#log_sorted').click(logSortedArray)

// display information about selected sorting algorithm
function getType() {
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
    userUpload = true
    let reader = new FileReader()
    reader.readAsText(this.files[0])
    reader.onload = () => {
        uploadedArray = reader.result
    }  
}

// identify and run selected sorting algorithm
function sort() {

    if(loading){return}

    numOfGoClicks++

    let arrayField = $('#array_input').val() 
    inputString = (!userUpload) ? arrayField : uploadedArray

    if(validateString(inputString)) {
        // convert inputString to array
        arrayify(inputString)
        //loading = true;
        //spinner()
        setLoading()

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
        }, 1000)
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

function setLoading() {
    if(!loading) {
        loading = true
        document.getElementById('progress_bar').innerText = ''
        document.getElementById('progress_bar').append('Loading...')
        document.getElementById('progress_bar').style.visibility = 'visible'
    } else {
        loading = false
        document.getElementById('progress_bar').style.visibility = 'hidden'
        document.getElementById('progress_bar_background').innerText = 'Done'
        document.getElementById('progress_bar_background').style.background = 'linear-gradient(to right, rgb(202, 199, 199), #348cd2)'
    }
}

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

    // console.log(inputArray)
    setTimeout(setLoading, 300)
    setTimeout(displayResults, 100)
}

function displayResults() {

    let avg = numOfGoClicks + '. ' + sortType + ': average of ' + (timeDifferenceArray.reduce((a,b) => a + b) / timeDifferenceArray.length).toFixed(3) + ' miliseconds.  <em>'+ numberOfExecutions +' execution(s). Array size: ' + (inputArray.length).toLocaleString() + '.</em>'

    $('.results_field').append('<p id=result'+ numOfGoClicks +'>' + avg + "</p>")
    document.getElementById('result'+numOfGoClicks).scrollIntoView()
}

function clearResults() {
    $(".results_field").empty()
    numOfGoClicks = 0
}

function logSortedArray() {
    console.log( 
        (!inputArray) ? 'You haven\'t sorted an array.' : inputArray
    )
}