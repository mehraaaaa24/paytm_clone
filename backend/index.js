const express = require("express");
const cors = require("cors");
const mainRouter = require("./routes/index");

const app = express();
app.use(cors());

app.use(express.json());

app.use("/api/v1", mainRouter);

app.listen(3000);
// User related routes
// api/v1/users/signup
// api/v1/users/signin
// api/v1/users/changePassword ..

// account related routes
// api/v1/accounts/create
// api/v1/accounts/getBalance
// api/v1/accounts/trasferMoney

