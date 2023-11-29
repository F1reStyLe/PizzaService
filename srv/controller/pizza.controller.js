const db = require('../db')

class PizzaController {
    async createUser (req, res) {
        const {name, pass, role} = req.body;
        const newUser = await db.query(`insert into userlist (username, password, role)
                                        values ($1, $2, $3) returning *;`, [name, pass, role])
        res.json(newUser.rows);
    }
    async getMenu (req, res) {
        const menu = await db.query(`select title
                                     from pizza;`)
        res.json(menu.rows)
    }
    async getPizza (req, res) {
        const id = req.params.id;
        const pizza = await db.query(`select distinct p.title pizzName, sum(i.amount * s.price) over() ingredientPrice, t.cookingprice, t.cookingtime
                                        from techmap t
                                        join ingredient i on t.ingredients = i.techmap_id
                                        join pizza p on p.id = t.pizza_id
                                        join stock s on s.id = i."name"
                                        where p.id = $1;`, [id])
        res.json(pizza.rows)
    }
    async updatePizza (req, res) {
        const {id, title, comp} = req.body;
        const updUser = await db.query(`update pizza
                                        set title = $1,
                                            composition = $2,
                                        where id     = $3
                                        returning *;`, [title, comp, id]);
        res.json(updUser.rows);
    }
    async deletePizza (req, res) {
        const id = req.params.id;
        const user = await db.query(`delete from pizza
                                    where id = $1;`, [id]);

        res.json(user.rows);
    }
}

module.exports = new PizzaController();