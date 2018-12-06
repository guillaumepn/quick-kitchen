async function timesUp(timer) {
    return new Promise(resolve => {
        setTimeout(resolve, timer.duration * 1000);
    });
}

function prop_access(object, string) {
    let props = string.split('.');
    let res = object;
    props.map(prop => {
        res = res[prop]
    });
    return res || string
}

String.prototype.interpolate = function (object) {
    let prop = this
        .replace('{{', '')
        .replace('}}', '')
        .trim();

    return prop_access(object, prop);
};


module.exports = {
    timesUp,
    interpolate: String.prototype.interpolate,
};