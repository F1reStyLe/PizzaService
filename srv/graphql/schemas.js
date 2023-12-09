const { GraphQLObjectType, GraphQLSchema, GraphQLID, GraphQLList } = require("graphql");
const { PizzaType, PizzasType, TechMapType, IngredientsType, StockType, UsersType, RolesType } = require('./objects')
const db = require('../db');

const Query = new GraphQLObjectType({
    name: 'Query',
    fields: {
        pizza: {
            type: PizzaType,
            args: {
                id: { type: GraphQLID } },
            async resolve(parent, args) {
                const result = await db.query(`select * from pizza where id = $1`,[args.id]);
                return result.rows[0];
            },
        },
        techmap: {
            type: TechMapType,
            args: {
                id: { type: GraphQLID } },
            async resolve(parent, args) {
                const result = await db.query(`select * from techmap where id = $1`, [args.id]);
                return result.rows[0];
            },
        },
        ingredient: {
            type: IngredientsType,
            args: {
                id: { type: GraphQLID } },
            async resolve(parent, args) {
                const result = await db.query(`select * from ingredient where id = $1`, [args.id]);
                return result.rows[0];
            },
        },
        stock: {
            type: StockType,
            args: {
                id: { type: GraphQLID } },
            async resolve(parent, args) {
                const result = await db.query(`select * from stock where id = $1`, [args.id]);
                return result.rows[0];
            },
        },
        pizzas: {
            type: new GraphQLList(PizzasType),
            resolve: async () => {
                const result = await db.query(`select * from pizza`);
                return result.rows;
            }
        },
        roles: {
            type: new GraphQLList(RolesType),
            resolve: async () => {
                const result = await db.query(`select * from roles`);
                return result.rows;
            }
        },
        users: {
            type: new GraphQLList(UsersType),
            resolve: async () => {
                const result = await db.query(`select * from userlist`);
                return result.rows;
            }
        }
    }
});

module.exports = new GraphQLSchema({
    query: Query,
})