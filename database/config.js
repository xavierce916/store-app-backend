const { mongoose } = require("mongoose");

const dbConnection = async () => {
    
    try {
        
        await mongoose.connect( process.env.DB_CNN );

        console.log('DB online');

    } catch ( error ) {

        console.log(error);
        throw new Error('An error occurred while initializing the database');

    }

}

module.exports = {
    dbConnection
};