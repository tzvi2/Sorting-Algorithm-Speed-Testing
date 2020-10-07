function bubbleSort(arr) {
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
    return arr  
}

function insertionSort(arr) {
    for(let i = 1; i < arr.length; i++) {
        let current = arr[i]
        let finder = i - 1;
        while(finder >= 0 && arr[finder] > current) {
            arr[finder + 1] = arr[finder]
            finder--
        }
        arr[finder + 1] = current;
    }
    return arr
}

// with thanks to guru99.com
// https://www.guru99.com/quicksort-in-javascript.html
function quickSort(arr, left=0, right=arr.length-1) {
    let i;
    if (arr.length > 1) {
        i = partition(arr, left, right); 
        if (left < i - 1) { 
            quickSort(arr, left, i - 1);
        }
        if (i < right) { 
            quickSort(arr, i, right);
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

export { bubbleSort, insertionSort, quickSort }