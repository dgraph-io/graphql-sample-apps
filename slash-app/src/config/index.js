const env = process.env.NODE_ENV || "development";

const config = require( `./environments/${ env.toLowerCase( ) }` );

module.exports = config;
