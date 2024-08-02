
require("dotenv").config();
module.exports = {
	mongoURI: process.env.DB_PRODUCTION,
	// mongoLocal: process.env.DB_LOCAL,
	jwtSecret: process.env.JWT_SECRET,
	jwtExpiresIn: process.env.JWT_EXPIRES_IN,
};
