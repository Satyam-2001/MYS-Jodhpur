const mongoose = require("mongoose")

const databaseName = `mysjodhpur`;
const url = `mongodb+srv://Satyam2001:${encodeURIComponent(process.env.DATABASE_PASSWORD)}@cluster0.3bctm.mongodb.net/${databaseName}?retryWrites=true&w=majority`;
const options = {
    useNewUrlParser: true,
};
mongoose.connect(url, options).then(() => {
    console.log('Connected to MongoDb')
})