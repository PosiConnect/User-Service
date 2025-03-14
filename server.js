const dotenv = require("dotenv");
const connectDatabase = require("./config/database");
const path = require("path");
const app = require("./app");

dotenv.config({ path: path.join(__dirname, "config/.env") });

const PORT = process.env.PORT || 3001;

connectDatabase();

app.listen(PORT, (req, res) => {
  console.log(`Hey I am from user - Service port number ${PORT}`);
});
