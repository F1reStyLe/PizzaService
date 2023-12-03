class Basket {
    constructor () {
        this.container = {};
    }
    add(pizza) {
        if (pizza in this.container) {
            this.container[pizza] += 1;
        } else {
            this.container[pizza] = 1;
        }
    }
    remove(pizza) {
        if (pizza in this.container) {
            this.container[pizza] -= 1;
        } else {
            this.container[pizza] = 0;
        }
    }
    removeAll(pizza) {
        if (pizza in this.container) {
            delete this.container[pizza];
        }
    }
}

module.exports = new Basket;