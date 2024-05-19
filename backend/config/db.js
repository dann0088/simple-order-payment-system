const { default: mongoose } = require("mongoose")
mongoose.set("strictQuery", false);

const connectDB = async() => {
    try {
        await mongoose.connect(process.env.DB_CONNECTION);
        console.log('connection to mongoDB!')
    } catch (error) {
        console.error(`Error: ${error.message}`);
        process.exit(1)
    }
};

module.exports = connectDB;