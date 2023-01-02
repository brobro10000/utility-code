const { v4: uuid6 } = require('uuid');
uuid6()//? 
//uuid generator AI generated
function uuid() {
    var d = Date.now();
    var uuid = 'xxxx-xxxx-xxxx-xxxx'.replace(/[x]/g, function (c) {
        var r = (d + Math.random() * 16) % 16 | 0;
        d = Math.floor(d / 16);
        return (c === 'x' ? r : (r)).toString(16);
    });
    return uuid;
}
//Self created recursive function
function uuid4(length, delineation = 4, value = '',) {
    if (length === 0) {
        return value.split('').map((x, index) => (index + 1) % delineation === 0 && value[index + 1] ? `${x}-` : x).join('')
    }
    var r = (Date.now() + Math.random() * 16) % 16 | 0;
    return uuid4(length - 1, delineation, `${value}${(r).toString(16)}`)
}
// Using classes with personalized uuid
class Uuid {
    constructor() {
        this.value = ((Date.now() + Math.random() * 16) % 16 | 0).toString(16);
    }
}

function uuid2(length, delineation = 4) {
    let x = ''
    for (var i = 0; i < length; i++) {
        x += i % delineation === 0 && x.length ? `-${new Uuid().value}` : new Uuid().value
    }
    return x
}
// no classes involved
function uuid3(length, delineation = 4) {
    let x = ''
    for (var i = 0; i < length; i++) {
        x += i % delineation === 0 && x.length ? `-${((Date.now() + Math.random() * 16) % 16 | 0).toString(16)}` : ((Date.now() + Math.random() * 16) % 16 | 0).toString(16)
    }
    return x
}

//optimized ai generated
function uuid5() {
    return 'xxxx-xxxx-xxxx-xxxx'.replace(/[x]/g, () => ((Date.now() + Math.random() * 16) % 16 | 0).toString(16));
}
// default uuid package
uuid6()
//int to base 16 in hex 4 increments
function uuid7() {
    return ((Math.random() * 65536 % 65536 | 0).toString(16)).padStart(4, 0) + ((Math.random() * 65536 % 65536 | 0).toString(16)).padStart(4, 0) + ((Math.random() * 65536 % 65536 | 0).toString(16)).padStart(4, 0) + ((Math.random() * 65536 % 65536 | 0).toString(16)).padStart(4, 0)
}
// reusing the same function to create a uuid
function uuid8(results = '') {
    let x = (Math.random() * 65536 % 65536 | 0);
    let xF = Math.floor(x.toString(10) / 2) > 65536 / 2 ? (x.toString(10) << 1).toString(16).padStart(4, 0) : (x.toString(10) >> 1).toString(16).padStart(4, 0)
    let y = (Math.random() * 65536 % 65536 | 0);
    let yF = Math.floor(y.toString(10) / 2) > 65536 / 2 ? (y.toString(10) << 1).toString(16).padStart(4, 0) : (y.toString(10) >> 1).toString(16).padStart(4, 0)
    return y.toString(16).padStart(4, 0) + x.toString(16).padStart(4, 0) + yF + xF
}
uuid8()
console.time('uuid')
for (var i = 0; i < 1000000; i++) {
    uuid()
}
console.timeEnd('uuid')
console.time('uuid2')
for (var i = 0; i < 1000000; i++) {
    uuid2(16)
}
console.timeEnd('uuid2')
console.time('uuid3')
for (var i = 0; i < 1000000; i++) {
    uuid3(16)
}
console.timeEnd('uuid3')
console.time('uuid4')
for (var i = 0; i < 1000000; i++) {
    uuid4(16, 4)
}
console.timeEnd('uuid4')
console.time('uuid5')
for (var i = 0; i < 1000000; i++) {
    uuid5()
}
console.timeEnd('uuid5')
console.time('uuid7')
let y = ''
for (var x = 0; x < 1000000; x++) {
    uuid7()
}
console.timeEnd('uuid7')
console.time('uuid8')
for (var x = 0; x < 1000000; x++) {
    uuid8()
}
console.timeEnd('uuid8')
console.time('uuid6')
for (var i = 0; i < 1000000; i++) {
    uuid6()
}
console.timeEnd('uuid6')
