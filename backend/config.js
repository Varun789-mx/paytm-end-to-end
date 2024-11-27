const config = {
  PORT: process.env.PORT || 5000,
  JWT_SECRET: process.env.JWT_SECRET || "Harsh@057",
  MONGOOSE_URI: process.env.MONGOOSE_URI || "mongodb+srv://varunsh153:Harsh057@cluster0.r8d8y.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0",
  ENVIRONMENT: process.env.MODE_ENV || "development",
};

export default config;
