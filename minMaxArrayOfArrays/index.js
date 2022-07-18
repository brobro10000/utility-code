const users = [
    ['Nicole', 31],
    ['Chris', 33],
    ['Yaatree', 2],
    ['Sanne', 29],
    ['Saane', 26]
];
let userObject = Object.fromEntries(users);//?
const singleUser = {
    'Nicole': [31, 56, 24, 67, 89],
    'Bobby': [2556, 54, 37, 289]
}



function objectStatistics(object, keyOrValue = 1, ascOrDesc = 1) {
    //validation of array of arrays, else create one from entries
    Array.isArray(object) && Array.isArray(object[0]) && object[0].length == 2 ? true : object = Object.entries(object);

    //Begin if key value has is array of values
    let sortedObject = {}
    let sorted = false;
    object.forEach((element, index) => {
        //check if object value is array
        if (Array.isArray(element[1])) {
            //sort
            let sortedArray = element[1].sort((a, b) => {
                return ascOrDesc ? a - b : b - a;
            })
            //define key
            let stringKey = element[0]
            //create sorted object and statistics
            let constructedObject = {}
            element[1]//?
            constructedObject[stringKey] = sortedArray
            constructedObject['statistics'] = {
                minVal: ascOrDesc ? object[index][1][0] : object[index][1][object[index][1].length - 1],
                minKey: element[0],
                maxVal: ascOrDesc ? object[index][1][object[index][1].length - 1] : object[index][1][0],
                maxKey: element[0],
                average: average(element[1]),
                variance: variance(element[1], average(element[1])),
                standardDeviation: Math.sqrt(variance(element[1], average(element[1])).underestimate),
                bell: bellCurve(element[1], average(element[1]))
            }
            sortedObject[`object${index + 1}`] = constructedObject
            //flag
            sorted = true
        }
    })
    return sorted ? sortedObject : {
        object: keyOrValue ?
            Object.fromEntries(object.sort((a, b) => {
                return ascOrDesc ?
                    a[1] - b[1] :
                    b[1] - a[1];
            })) :
            Object.fromEntries(object.sort((a, b) => {
                return ascOrDesc ?
                    a[0] > b[0] ? 1 : -1 :
                    a[0] < b[0] ? 1 : -1
            })), statistics: {
                minVal: ascOrDesc ?
                    object[object.length - 1][1] :
                    object[0][1],
                minKey: ascOrDesc ?
                    object[object.length - 1][0] :
                    object[0][0],
                maxVal: ascOrDesc ?
                    object[0][1] :
                    object[object.length - 1][1],
                maxKey: ascOrDesc ?
                    object[0][0] :
                    object[object.length - 1][0],
                average: average(object, 0),
                variance: variance(object, average(object, 0), 0),
                standardDeviation: Math.sqrt(variance(object, average(object, 0), 0).underestimate),
                bell: bellCurve(object, average(object, 0), 0)
            }
    };
}

function average(array, isArray = 1) {
    return isArray ?
        array.reduce((prev, curr) => prev + curr, 0) / array.length :
        array.reduce((prev, curr) => prev + curr[1], 0) / array.length;
}

function variance(array, average, isArray = 1) {
    return isArray ?
        {
            underestimate: array.reduce((prev, curr) => prev + Math.pow(curr - average, 2)) / array.length,
            overestimate: array.reduce((prev, curr) => prev + Math.pow(curr - average, 2)) / (array.length - 1)
        } :
        {
            underestimate: array.reduce((prev, curr) => prev + Math.pow(curr[1] - average, 2), 0) / array.length,
            overestimate: array.reduce((prev, curr) => prev + Math.pow(curr[1] - average, 2), 0) / (array.length - 1)
        };
}

function bellCurve(arrays, average, isArray = 1) {
    return {
        neg3: average - (3 * Math.sqrt(variance(arrays, average, isArray).underestimate)),
        neg2: average - (2 * Math.sqrt(variance(arrays, average, isArray).underestimate)),
        neg1: average - (Math.sqrt(variance(arrays, average, isArray).underestimate)),
        mean: average,
        pos1: average + (Math.sqrt(variance(arrays, average, isArray).underestimate)),
        pos2: average + (2 * Math.sqrt(variance(arrays, average, isArray).underestimate)),
        pos3: average + (3 * Math.sqrt(variance(arrays, average, isArray).underestimate)),
    }
}

// objectStatistics(userObject)//?
// objectStatistics(users)//?
// let data = objectStatistics(users, 0, 0)//?
// data.statistics.minKey//?

let data2 = objectStatistics(singleUser, 1, 0)//?
data2//?
for (var i in data2) {
    data2[i]//?
    for (var k in data2[i]) {
        data2[i][k]//?
    }
}