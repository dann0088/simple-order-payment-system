const { default: mongoose } = require("mongoose")
mongoose.set("strictQuery", false);

const connectDB = async() => {
    try {
        await mongoose.connect(process.env.DB_CONNECTION);
        console.log('connection to mongoDB!')
    } catch (error) {
        console.error(`Error: ${error.message}`);
        // process.exit(1)
    }
};

mongoose.connection.on('error', (err) => {
    console.error('connection error:', err);
});

mongoose.connection.on('disconnected', () => {
    console.error('connection disconnected!');
    // reconnectDB(); // start trying to reconnect when disconnected (disable if testing disconnect response)
})


const reconnectDB = () => {
    setInterval( async() => {
        if (mongoose.connection.readyState === 0) {
            console.log('Attempting to reconnect MongoDB...');
            try {
                await connectDB();
            } catch (error) {
                console.err('Error reconnecting to MongoDB', err);
            }
        }
    }, 5000) // try to connect every 5 seconds
};

module.exports = connectDB;