
require("dotenv").config()
const fetch = require('isomorphic-fetch');
const createHttpLink = require('apollo-link-http').createHttpLink
module.exports = {
  /* Your site config here */
  plugins: [
{
  resolve: 'gatsby-source-graphql',
  options: {
    typeName: 'hasura',
    fieldName: 'blog',
    createLink: () => {
      return createHttpLink({
        uri: process.env.HASURA_GRAPHQL_ENDPOINT,
        headers: {
          'x-hasura-admin-secret' : process.env.HASURA_ADMIN_SECRET
        },
        fetch,
      })
    }
  }
}
  ],
}
