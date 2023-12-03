const db = require('../db')
let basket = require('../services/basket')

class BasketController {
    async getBasket(req, res) {
        try{
            if (Object.keys(basket.container) == 0) {
                return res.status(200).json({message: 'Корзина пуста'});
            } else {
                res.json(basket);
            }
        } catch (e) {
            console.log(e);
        }
    }
    async addItem(req, res) {
        const {pizza, flag} = req.body;
        if (flag == 1) {
            basket.remove(pizza);
        } else if (flag == 2) {
            basket.removeAll(pizza);
        } else {
            basket.add(pizza);
        }
        res.json(basket)
    }
    async deleteBasket(req, res) {
        if (Object.keys(basket.container) == 0) {
            res.json(basket);
        } else {
            delete basket.container;
            res.json(basket);
        }
    }
}

module.exports = new BasketController();