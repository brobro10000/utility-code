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
            constructedObject[stringKey] = sortedArray
            constructedObject['statistics'] = {
                minVal: ascOrDesc ? object[0][1][0] : object[0][1][object[0][1].length - 1],
                minKey: ascOrDesc ? element[0] : element[0],
                maxVal: ascOrDesc ? object[0][1][object[0][1].length - 1] : object[0][1][0],
                maxKey: ascOrDesc ? element[0] : element[0],
                average: element[1].reduce((prev, next) => prev + next, 0) / element[1].length
            }
            sortedObject[`object${index + 1}`] = constructedObject
            //flag
            sorted = true
        }
    })
    return sorted ? sortedObject : {
        object: keyOrValue ? Object.fromEntries(object.sort((a, b) => {
            return ascOrDesc ? a[1] - b[1] : b[1] - a[1];
        })) : Object.fromEntries(object.sort((a, b) => {
            return ascOrDesc ? a[0] > b[0] ? 1 : -1 : a[0] < b[0] ? 1 : -1
        })), statistics: {
            minVal: ascOrDesc ? object[0][1] : object[object.length - 1][1],
            minKey: ascOrDesc ? object[0][0] : object[object.length - 1][0],
            maxVal: ascOrDesc ? object[object.length - 1][1] : object[0][1],
            maxKey: ascOrDesc ? object[object.length - 1][0] : object[0][0],
            average: object.reduce((prev, next) => prev + next[1], 0) / object.length
        }
    };
}


objectStatistics(userObject)//?
objectStatistics(users)//?
let data = objectStatistics(users, 0, 0)//?
data.statistics.minKey//?

let data2 = objectStatistics(singleUser, 0, 0)//?

for (var i in data2) {
    data2[i]//?
    for (var k in data2[i]) {
        data2[i][k]//?
    }
}