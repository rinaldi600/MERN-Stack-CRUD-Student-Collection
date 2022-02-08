const mongoose = require("mongoose");

const connectDB = async () => {

    try {
        const dbName = 'kuliah';
        const con = await mongoose.connect(`mongodb://127.0.0.1:27017/${dbName}`);
        console.log(`Database Connected ${con.connection.host}`);
    } catch (e) {
        console.error(`Errors: ${e.message}`);
        process.exit(1)
    }

};

module.exports = connectDB;