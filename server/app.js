const express = require("express");
const cors = require("cors");
const path = require("path");
const logger = require("morgan");
const app = express();
const busboy = require("connect-busboy");
app.disable("etag");
const port = process.env.PORT || "8000";
app.listen(port, function () {
  console.log(`server running at port: ${port}`);
});
// view engine setup
app.set("views", "./views");
app.set("view engine", "ejs");
app.set("port", port);

app.use(logger("dev"));
app.use(express.json());
app.use(cors());
app.use(express.urlencoded({ extended: false }));
app.use(express.static(path.join(__dirname, "public")));
app.use(busboy());

require("./routes/user.route")(app);
require("./routes/product.route")(app);
require("./routes/category.route")(app);
require("./routes/order.route")(app);
require("./routes/orderDetail.route")(app);

module.exports = app;
