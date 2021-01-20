const mongoose = require("mongoose");
const mongodb = "mongodb://localhost/dbsms";

mongoose
  .connect(mongodb, { useUnifiedTopology: true, useNewUrlParser: true })
  .then((connection) => console.log(`Database connected`));
