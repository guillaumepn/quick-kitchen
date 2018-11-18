async function timesUp(timer) {
    return new Promise(resolve => {
        setTimeout(resolve, timer.duration * 1000);
    });
}

String.prototype.interpolate = function (object) {
    //TODO faire l'interpolate / prop_access
    return 'test';
};


module.exports = {
    timesUp,
    interpolate: String.prototype.interpolate,
};