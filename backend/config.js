const config = {
  PORT: process.env.PORT || 5000,
  JWT_SECRET: process.env.JWT_SECRET || "Harsh@057",
  MONGOOSE_URI: process.env.MONGOOSE_URI || "",
  ENVIRONMENT: process.env.MODE_ENV || "development",
};

export default config;
