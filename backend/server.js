const app = require("./app");
const { connectDatabase } = require("./config/database");
const cloudinary = require("cloudinary");
connectDatabase();


cloudinary.config({
  cloud_name: 'dxa3titlk',
  api_key: '919272357646448',
  api_secret: "fjCsxJtF329pLWORVGuY0dI2-Sk"
});

app.listen(process.env.PORT, () => {
  console.log(`Server is running on port ${process.env.PORT}`);
});
