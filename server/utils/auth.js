const { GraphQLError } = require("graphql");
const apiKey = require("../config/connection");
const jwt = require("jsonwebtoken");
const secretKey = "secretsecret"; // Replace with your actual secret key
const expiration = "1h"; // Token expiration time

module.exports = {
  AuthenticationError: new GraphQLError("Could not authenticate user", {
    extension: { code: "UNAUTHENTICATED" },
  }),
  authMiddleware: function ({ req }) {
    let token = req.body.token || req.query.token || req.headers.authorization;
    if (req.headers.authorization) {
      token = token.split(" ").pop().trim();
    }
    if (!token) {
      return req;
    }
    try {
      const { data } = jwt.verify(token, secretKey, { maxAge: expiration });
      req.user = data;
    } catch (error) {
      console.log(error);
    }
    return req;
  },
  signToken: function ({ email, username, _id }) {
    const payload = { email, username, _id };
    return jwt.sign({ data: payload }, secretKey, { expiresIn: expiration });
  },
};
