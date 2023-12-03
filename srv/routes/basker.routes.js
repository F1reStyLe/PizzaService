const Router = require('express');
const router = new Router();
const BasketController = require('../controller/basket.controller');

router.get('/', BasketController.getBasket);
router.post('/', BasketController.addItem);
router.delete('/', BasketController.deleteBasket);

module.exports = router;