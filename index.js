const express = require("express");
const mongoose = require("mongoose");
const dotenv = require("dotenv");
const userRouter = require("./routes/user");
const authRouter = require("./routes/auth");
const productRouter = require("./routes/product");
const orderRouter = require("./routes/order");

dotenv.config();

const app = express();

mongoose
    .connect(process.env.MONGO_URL)
    .then(() => console.log("db connect success"))
    .catch((error) => console.log(error));

app.use(express.json());
app.use("/api/user", userRouter);
app.use("/api/auth", authRouter);
app.use("/api/product", productRouter);
app.use("/api/order", orderRouter);

app.listen(process.env.PORT || 8080, () => {
    console.log("backend running");
});
