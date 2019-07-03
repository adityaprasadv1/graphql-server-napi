const system = require('../napi-system-module/build/Release/system.node');

const express = require('express');
const graphqlHTTP = require('express-graphql');

const { buildSchema } = require('graphql');

const app = express();

let customSchema = buildSchema(`
	type Query {
		serverVersion: String,
		moduleVersion: String,
		moduleVersion1: String,
	}
`);

let rootResolver = {
	serverVersion: () => {
		return "0.1-alpha";
	},
	moduleVersion: () => {
		return system.moduleVersion();
	},
	moduleVersion1: () => {
		return system.moduleVersion1();
	},
};

app.use('/apiv1', graphqlHTTP({
	schema: customSchema,
	rootValue: rootResolver,
	graphiql: true,
}));

app.listen(4000);
