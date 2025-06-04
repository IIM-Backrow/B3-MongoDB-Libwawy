import mongoose from 'mongoose';
import seedBooks from './books.js';

const seed = async () => {
    try {
        await mongoose.connect(process.env.MONGO_URI)
        console.log("Connexion à la base de données réussie");
        await seedBooks();
        process.exit(0);
    }
    catch (error) {
        console.error("Erreur lors de la connexion à la base de données :", error);
        process.exit(1);
    }
}

seed()