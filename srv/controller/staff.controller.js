const db = require('../db')

class StaffController {
    async createEmployee (req, res) {
        const {firstname, lastname, position, salary, hiredate} = req.body;
        const newEmployee = await db.query(`insert into employees (first_name, last_name, position, salary, hire_date)
                                            values ($1, $2, $3, $4, $5) returning *;`,
                                            [firstname, lastname, position, salary, hiredate])
        res.json(newEmployee.rows);
    }
    async getEmployees (req, res) {
        const employees = await db.query(`select first_name, last_name, position, hire_date
                                        from employees;`)
        res.json(employees.rows)
    }
    async getEmployee (req, res) {
        const id = req.params.id;
        const employee = await db.query(`select first_name, last_name, position, hire_date
                                        from employees
                                        where id = $1;`, [id])
        res.json(employee.rows)
    }
    async updateEmployee (req, res) {
        const id = req.params.id;
        const {firstname, lastname, position, salary} = req.body;
        const updEmployee = await db.query(`update employees
                                            set first_name = $1,
                                                last_name = $2,
                                                position = $3
                                                salary = $4
                                            where id     = $5
                                            returning *;`, [firstname, lastname, position, salary, id]);
        res.json(updEmployee.rows);
    }
    async deleteEmployee (req, res) {
        const id = req.params.id;
        const delEmployee = await db.query(`delete from employees
                                            where id = $1
                                            returning *;`, [id]);

        res.json(delEmployee.rows);
    }
}

module.exports = new StaffController();