const express = require("express");
const adminAuth = require("./middlewares/auth");
const app = express();
app.use("/admin", adminAuth);

app.get("/admin/getAllData", (req, res) => {
  res.send({ message: "Data Fetched Successfully" });

  app.get("/admin/deleteAllData", (req, res) => {
    res.send({ message: "Data Deleted Successfully" });
  });
});

app.listen(8080, () => {
  console.log("server is running on port 8080");
});
