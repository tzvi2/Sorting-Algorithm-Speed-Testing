import { bubbleSort, insertionSort, quickSort, mergeSort } from './algos.js'
import { getRandom, validateString, arrayify, executeXTimes, clearField } from './utilities.js'

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
let randomLoading = false;
let sortAlgo = bubbleSort

// set display of bubble sort info
document.getElementById('bubble_info').style.display = 'initial'

// navigation link listeners (for styling)
$('#testing_page_link').click(styleTesting)
$('#about_page_link').click(styleAbout)

// functions to bold current page's link
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

// display correct text when dropdown menu options are selected
$('#algo_dropdown').change(infoChange)

// random array generator button 
$('#generate_random_btn').click(function() {
    document.getElementById('loader').style.visibility = 'visible'
    setTimeout(function() {
        let length = parseInt($('#randSize').val())
        let min = parseInt($('#randMin').val())
        let max = parseInt($('#randMax').val())
        clearField('array_input')
        document.getElementById('array_input').value = getRandom(length, min, max)
        document.getElementById('loader').style.visibility = 'hidden'
    }, 500)
})

// function to save uploaded array
$('#choose_file').change(uploadArray)

// listener on 'go' button 
$('#sort_btn').click(run)

// clear results area
$('#clear_results_btn').click(clearResults)

// log sorted array button listener
$('#log_sorted').click(logSortedArray)

// set sorting algorithm, and display information about it
function infoChange() {
    sortType = $('#algo_dropdown').val()
    if(sortType === 'Bubble sort') {
        sortAlgo = bubbleSort
    }
    else if(sortType === 'Insertion sort') {
        sortAlgo = insertionSort
    } 
    else if(sortType === 'Quick sort') {
        sortAlgo = quickSort
    }
    else if(sortType === 'Merge sort') {
        sortAlgo = mergeSort
    }

    $('.algo_info > p').each(function() {
        if(this.id.split('_').includes(sortType.toLowerCase().split(' ')[0])) {
            this.style.display = 'initial'
        } else {
            this.style.display = 'none'
        }
    })
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
function run() {
    if(loading){return}

    let arrayField = $('#array_input').val() 
    inputString = (!userUpload) ? arrayField : uploadedArray

    if(validateString(inputString)) {
        numOfGoClicks++
        inputArray = arrayify(inputString)
        setLoading()
        startTimeArray = []
        endTimeArray = []
        timeDifferenceArray = []
        numberOfExecutions = Number($('#num_executions').val())

        // start sorting. 600 ms delay to give time for loading bar to appear
        setTimeout(function(){
            executeXTimes(sortAlgo, inputArray, numberOfExecutions, startTimeArray, endTimeArray, results)
        }, 600)   
    }
}


function setLoading() {
    if(!loading) {
        loading = true
        $('#prog_bar_p').empty()
        $('#prog_bar_p').append('Loading...')
        document.getElementById('progress_bar').style.background = 'linear-gradient(to left, silver 60%, rgb(255, 140, 0))'
        document.getElementById('progress_bar').style.visibility = 'visible'
    } else {
        loading = false
        $('#prog_bar_p').empty()
        $('#prog_bar_p').append('Done')
        document.getElementById('progress_bar').style.background = 'linear-gradient(to right, rgb(202, 199, 199), #348cd2)'
    }
}

function results() {
    for(let i = 0; i < endTimeArray.length; i++) {
        let diff = Number((endTimeArray[i] - startTimeArray[i]))
        timeDifferenceArray.push(diff) 
    }
    setLoading()
    displayResults()
}

function displayResults() {
    let avg = numOfGoClicks + '. ' + sortType + ': average of ' + 
    (timeDifferenceArray.reduce((a,b) => a + b) / timeDifferenceArray.length).toFixed(3) + 
    ' miliseconds.  <em>'+ numberOfExecutions +' execution(s). Array size: ' + (inputArray.length).toLocaleString() + '.</em>'

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