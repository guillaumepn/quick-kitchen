function updateActiveDish(dishes) {
    Array.from(document.querySelectorAll('.dish')).filter(function (dish, index) {
        dish.classList.remove('active');
        if (dishes[index].active) dish.classList.add('active');
    });
}

module.exports = {
    updateActiveDish
};