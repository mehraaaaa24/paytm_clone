const express = require("express");
const mainRouter = require("./routes/index");

const app = express();

app.use("/api/v1", mainRouter);

// User related routes
// api/v1/users/signup
// api/v1/users/signin
// api/v1/users/changePassword ..

// account related routes
// api/v1/accounts/create
// api/v1/accounts/getBalance
// api/v1/accounts/trasferMoney