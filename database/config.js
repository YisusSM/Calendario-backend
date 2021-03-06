const mongoose = require('mongoose');


const dbConnection = async () => {
    try {
        await mongoose.connect(process.env.DB_CNN);
        console.log("db online")
    } catch (err) {
        console.log(err);
        throw new Error('Error a la hora de conectarse a la base de datos...');
    }
}


module.exports = {
    dbConnection
}