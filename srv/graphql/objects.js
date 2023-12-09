const { GraphQLObjectType, GraphQLString, GraphQLID,
        GraphQLInt, GraphQLFloat,
        GraphQLList } = require("graphql");
const db = require('../db');

const PizzaType = new GraphQLObjectType({
    name: 'Pizza',
    fields: () => ({
        id: { type: GraphQLID },
        title: { type: GraphQLString },
        composition: {
            type: TechMapType,
            async resolve(parent, args) {
                const result = await db.query(`select * from techmap where pizza_id  = $1`, [parent.id]);
                return result.rows[0];
            }
        },
    }),
});

const TechMapType = new GraphQLObjectType({
    name: 'TechMap',
    fields: () => ({
        id: { type: GraphQLID },
        cookingtime: { type: GraphQLInt },
        cookingprice: { type: GraphQLInt },
        ingredients: {
            type: new GraphQLList(IngredientsType),
            async resolve(parent, args) {
                const result = await db.query(`select * from ingredient where techmap_id  = $1`, [parent.id]);
                return result.rows;
            }
        }
    }),
});

const IngredientsType = new GraphQLObjectType({
    name: 'Ingredient',
    fields: () => ({
        id: { type: GraphQLID },
        amount: { type: GraphQLInt },
        name: {
            type: new GraphQLList(StockType),
            async resolve(parent, args) {
                const result = await db.query(`select * from stock where id  = $1`, [parent.name]);
                return result.rows;
            }
        }
    }),
});

const StockType = new GraphQLObjectType({
    name: 'Stock',
    fields: () => ({
        id: { type: GraphQLID },
        title: { type: GraphQLString },
        amount: { type: GraphQLInt },
        price: { type: GraphQLFloat },
        units: { type: GraphQLString },
    }),
});

const PizzasType = new GraphQLObjectType({
    name: 'Pizzas',
    fields: {
        id: { type: GraphQLID },
        title: { type: GraphQLString },
        composition: { type: GraphQLInt }
    }
});

const RolesType = new GraphQLObjectType({
    name: 'Roles',
    fields: {
        id: { type: GraphQLID },
        title: { type: GraphQLString }
    }
});

const UsersType = new GraphQLObjectType({
    name: 'Users',
    fields: {
        id: { type: GraphQLID },
        username: { type: GraphQLString },
        password: { type: GraphQLInt },
        role: {
            type: new GraphQLList(RolesType),
            async resolve(parent, args) {
                const result = await db.query(`select * from roles where id = $1`, [parent.role]);
                return result.rows;
            }
         }

    }
});

module.exports = { PizzaType, TechMapType, IngredientsType, StockType, PizzasType, UsersType, RolesType }