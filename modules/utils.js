async function timesUp(timer) {
    return new Promise(resolve => {
        setTimeout(resolve, timer.duration * 1000);
    });
}


module.exports = {
    timesUp,
};