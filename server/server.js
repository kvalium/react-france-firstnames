const express = require('express');
const graphqlHTTP = require('express-graphql');
const cors = require('cors');
const graphQlData = require('./config/graphql');
const app = express();

const GRAPHQL_PORT = process.env.GRAPHQL_PORT || 4000;

app.use('/graphql', cors(), graphqlHTTP(graphQlData));

app.listen(GRAPHQL_PORT, () => {
    console.log('✅ A GraphQL API running on port ' + GRAPHQL_PORT);
});
