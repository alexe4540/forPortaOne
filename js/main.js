function startRead() {
    const file = document.querySelector('#file').files[0];

    if (file) {
        getAsText(file);
    }
}

async function getAsText(readFile) {
    const reader = new FileReader();

    let promise = new Promise((resolve, reject) => {
        reader.readAsText(readFile, "UTF-8");

        reader.onload = function () {
            resolve(reader.result);
        };

        reader.onerror = function () {
            console.log(reader.error);
        };
    });

    let promiseResult = await promise;

    let fileValues = promiseResult.replace(/\r?\n/g, " ").trim().split(" ");

    let minValue = min(fileValues);
    let maxValue = max(fileValues);
    let medianValue = medianFunction(fileValues);
    let averageValue = averageFunction(fileValues);

    let minBlock = document.querySelector("#min");
    minBlock.textContent += minValue;

    let maxBlock = document.querySelector("#max");
    maxBlock.textContent += maxValue;

    let medianBlock = document.querySelector("#median");  
    medianBlock.textContent += medianValue;
    
    let averageBlock = document.querySelector("#average");
    averageBlock.textContent += averageValue;

}

//минимальное число в файле
function min(arr) {
    return arr.reduce(function (min, curr) {
        return +min > +curr ? curr : min;
    });
}

//максимальное число в файле
function max(arr) {
    return arr.reduce(function (max, curr) {
        return +max < +curr ? curr : max;
    });
}

//медиана
function medianFunction(arr) {
    let sortedArr = arr.slice().sort(function (a, b) {
        return a - b;
    });
    const mid = Math.floor(arr.length / 2);
    return sortedArr.length % 2 !== 0 ? sortedArr[mid] : (sortedArr[mid - 1] + sortedArr[mid]) / 2;
}

//среднее арифметическое значение
function averageFunction(arr) {
    return arr.reduce((acc, curr) => +acc + +curr) / arr.length;
}

//наибольшая последовательность идущих подряд чисел, которая увеличивается
function fromSmallerToLarger(arr) {
    let curSequence = [arr[0]],
        bestSequence = [];

    for (let i = 1; i < arr.length; i++) {
        if (+arr[i] > +arr[i - 1]) {
            curSequence.push(arr[i]);
        } else {
            curSequence = [arr[i]];
        }
        if (curSequence.length > bestSequence.length) {
            bestSequence = [...curSequence];
        }
    }
    return bestSequence;
}


//наибольшая последовательность идущих подряд чисел, которая уменьшается
function fromLargerToSmaller(arr) {
    let curSequence = [arr[0]],
        bestSequence = [];

    for (let i = 1; i < arr.length; i++) {
        if (+arr[i] < +arr[i - 1]) {
            curSequence.push(arr[i]);
        } else {
            curSequence = [arr[i]];
        }
        if (curSequence.length > bestSequence.length) {
            bestSequence = [...curSequence];
        }
    }
    return bestSequence;
}