const config = {
  PORT: process.env.PORT || 5000,
  JWT_SECRET: process.env.JWT_SECRET || "Harsh@057",
<<<<<<< HEAD
  MONGOOSE_URI: process.env.MONGOOSE_URI || "mongodb://localhost:27017/",
=======
  MONGOOSE_URI: process.env.MONGOOSE_URI || "",
>>>>>>> 700d12681f910f671453385999e0848ee7d76503
  ENVIRONMENT: process.env.MODE_ENV || "development",
};

export default config;
