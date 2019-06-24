const express = require('express');
const graphqlHTTP = require('express-graphql');

const { buildSchema } = require('graphql');

const app = express();

let customSchema = buildSchema(`
	type Query {
		serverVersion: String,
	}
`);

let rootResolver = {
	serverVersion: () => {
		return "0.1-alpha";
	},
};

app.use('/apiv1', graphqlHTTP({
	schema: customSchema,
	rootValue: rootResolver,
	graphiql: true,
}));

app.listen(4000);
