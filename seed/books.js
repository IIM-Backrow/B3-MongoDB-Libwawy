import Books from "../models/books.js";
import dotenv from "dotenv";



dotenv.config();

const books = [
    {
        id: "ISBN:9783161484100",
        title: "Le Petit Prince",
        illustration: "https://example.com/images/petit-prince.jpg",
        authors: ["Antoine de Saint-Exupéry"],
        themes: ["Fiction", "Philosophie"],
        page_count: 96,
        release_date: new Date("1943-04-06"),
        publisher: "Reynal & Hitchcock",
        summary: "Un pilote se retrouve dans le désert du Sahara et rencontre un jeune prince venu d'une autre planète.",
        price: 10.99,
        serie: {
            name: "Classiques de la littérature",
            number: 1
        },
        articles: []
    },
    {
        id: "ISSN:12345678",
        title: "1984",
        illustration: "https://example.com/images/1984.jpg",
        authors: ["George Orwell"],
        themes: ["Dystopie", "Science-fiction"],
        page_count: 328,
        release_date: new Date("1949-06-08"),
        publisher: "Secker & Warburg",
        summary: "Dans une société totalitaire, Winston Smith lutte contre la surveillance omniprésente du Parti.",
        price: 15.50,
        serie: {
            name: "Dystopies classiques",
            number: 1
        },
        articles: []
    }
];

const seedBooks = async () => {
    try {
        await Books.deleteMany({});
        const createdBooks = await Books.insertMany(books);
        console.log(`${createdBooks.length} livres créés avec succès`);
    } catch (error) {
        console.error("Erreur lors de la création des livres :", error);
    }
};

export default seedBooks;