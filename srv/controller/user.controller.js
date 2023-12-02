const db = require('../db')

class UserController {
    async createUser (req, res) {
        const {username, password, role} = req.body;
        const newUser = await db.query(`insert into userlist (username, password, role)
                                        values ($1, $2, $3) returning *;`, [username, password, role])
        res.json(newUser.rows);
    }
    async getUsers (req, res) {
        const users = await db.query(`select u.id, username, title
                                        from userlist u
                                        join roles r on u."role" = r.id;`);
        res.json(users.rows)
    }
    async getUser (req, res) {
        const id = req.params.id;
        const user = await db.query(`select u.id, username, title
                                    from userlist u
                                    join roles r on u."role" = r.id
                                    where u.id = $1;`, [id])
        res.json(user.rows)
    }
    async updateUser (req, res) {
        const {id, username, password, role} = req.body;
        console.log(req.body);
        const updUser = await db.query(`update userlist
                                        set username = $1,
                                            password = $2,
                                            role     = $3
                                        where id     = $4
                                        returning *;`, [username, password, role, id]);
        res.json(updUser.rows);
    }
    async deleteUser (req, res) {
        const id = req.params.id;
        const user = await db.query(`delete from userlist
                                    where id = $1;`, [id]);

        res.json(user.rows)
    }
    async deleteUsers (req, res) {
        const dropUsers = req.body.dropUsers;
        const users = await db.query(`delete from userlist
                                    where id in (${dropUsers.join(',')});`);

        res.json(users.rows)
    }
}

module.exports = new UserController();