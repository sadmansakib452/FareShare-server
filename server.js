require("dotenv").config();
const http = require("http");
const app = require("./app/app");
const server = http.createServer(app);
const connectDB = require("./db/db");

const PORT = process.env.PORT || 8000;
const URI = `mongodb+srv://${process.env.DB_ID}:${process.env.DB_PASS}@cluster0.ytgldn3.mongodb.net/FareShare?retryWrites=true&w=majority`; 

connectDB(URI)
  .then(() => {
    server.listen(PORT, () => {
      console.log("Database Connected ");
      console.log(`Server is listening on PORT ${PORT}`);
    });
  })
  .catch((err) => {
    console.log(err);
  });
