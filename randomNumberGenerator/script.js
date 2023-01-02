//Just a typical random number generator I tend to use
var randomNumber = function (min, max) {
    return Math.floor(Math.random() * (max - min + 1) + min);
};

randomNumber(1, 10);//?
randomNumber(-100, 100)//?
randomNumber(0, 1000000)//?
randomNumber(1, 1)//?