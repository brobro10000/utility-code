function bitMaskConfig(number) {
    var bitMask = 0;
    for (var i = 0; i < number; i++) {
        bitMask = bitMask | (1 << i);
    }
    return bitMask;
}

"15".toString(2)//?

//convert base 10 number to base 2
function convertToBinary(number) {
    return number.toString(2).padStart(31, 0);
}

//convert base 2 number to base 10
function convertToDecimal(number) {
    return parseInt(number, 2);
}

convertToBinary(10)//?

// switch a bit based on the position
function switchBit(number, position) {
    return number ^ (1 << position);
}

convertToBinary(switchBit(10, 1))//?
convertToBinary(switchBit(10, 1))//?

//convert array of boolean
function convertArrayToNumber(array) {
    var number = 0;
    for (var i = 0; i < array.length; i++) {
        number = number | (array[i] << i);
    }
    return number;
}

const x = [true, true, true, true, true, true, true, true, true, true, true, true, true, true, true, true, true, true, true, true, true, true, true, true, true, true, true, true, true, true, true];
convertArrayToNumber(x)//?
convertToBinary(convertArrayToNumber(x))//?
x.length//?
// bitmask against 32 bit number and prepend with 0s
function bitMaskAgainst32BitNumber(number) {
    var bitMask = bitMaskConfig(31);
    return (number & bitMask).toString(2).padStart(32, '0');
}
bitMaskAgainst32BitNumber(8)//?

//subtract base 10 number from base 2 number and return a base 10
function subtractBase10FromBase2(base10, base2) {
    return parseInt(base2, 2) - base10;
}
//generate random object with boolean values
function generateRandomObject() {
    var obj = {};
    for (var i = 0; i < 132; i++) {
        obj[i] = Math.random() >= 0.5;
    }
    return obj;
}

const testOne = generateRandomObject()

Object.keys(testOne).map(key => testOne[key]).length//?

const x1 = Object.keys(testOne).map(key => testOne[key])//?
//slices array into 32 bit chunks
function sliceArrayInto32BitChunks(array) {
    var chunks = [];
    for (var i = 0; i < array.length; i += 31) {
        chunks.push(array.slice(i, i + 31));
    }
    return chunks;
}
const x2 = sliceArrayInto32BitChunks(x1)//?
const testObj = {};
x2.forEach((x, index) => {
    testObj[`objIndex${index}`] = {
        arrayToNumber: convertArrayToNumber(x),
        binary: convertToBinary(convertArrayToNumber(x)),
        decimal: convertToDecimal(convertToBinary(convertArrayToNumber(x))),
        bitMaskAgainst32BitNumber: bitMaskAgainst32BitNumber(convertArrayToNumber(x)),
        subtractBase10FromBase2: subtractBase10FromBase2(convertArrayToNumber(x), bitMaskAgainst32BitNumber(convertArrayToNumber(x)))
    }
});

// function that takes object of booleans and returns bit metadata
function generateBitMetadata(object) {
    const array = Object.keys(object).map(key => object[key]);
    const chunks = sliceArrayInto32BitChunks(array);
    const obj = {};
    chunks.forEach((x, index) => {
        obj[`objIndex${index}`] = {
            arrayToNumber: convertArrayToNumber(x),
            binary: convertToBinary(convertArrayToNumber(x)),
            decimal: convertToDecimal(convertToBinary(convertArrayToNumber(x))),
            bitMaskAgainst32BitNumber: bitMaskAgainst32BitNumber(convertArrayToNumber(x)),
            subtractBase10FromBase2: subtractBase10FromBase2(convertArrayToNumber(x), bitMaskAgainst32BitNumber(convertArrayToNumber(x)))
        }
    });
    return obj;
}
// function that takes a decimal number and returns a bit metadata object
function generateBitMetadataFromDecimal(number) {
    const binary = convertToBinary(number);
    const obj = {};
    obj[`objIndex${number}`] = {
        binary: convertToBinary(number),
        decimal: convertToDecimal(binary),
        bitMaskAgainst32BitNumber: bitMaskAgainst32BitNumber(number),
        subtractBase10FromBase2: subtractBase10FromBase2(convertToBinary(number), bitMaskAgainst32BitNumber(convertToBinary(number)))
    }
    return obj[`objIndex${number}`];
}
let x12 = generateBitMetadata(generateRandomObject())//?
let x11 = generateBitMetadataFromDecimal(31)//?

// converts a bit metadata object to an array of booleans
function convertBitMetadataToArrayOfBooleans(object) {
    let z = object.binary.split('').map(x => x == !!x)//?
    return z
}
convertBitMetadataToArrayOfBooleans(x11)//?
