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
    },
    {
        id: "UNKN:00000001",
        title: "Le Meilleur des mondes",
        illustration: "https://example.com/images/meilleur-monde.jpg",
        authors: ["Aldous Huxley"],
        themes: ["Dystopie", "Science-fiction"],
        page_count: 268,
        release_date: new Date("1932-08-18"),
        publisher: "Chatto & Windus",
        summary: "Dans un futur où la société est contrôlée par la technologie et le conditionnement, Bernard Marx remet en question l'ordre établi.",
        price: 12.75,
        serie: {
            name: "Dystopies classiques",
            number: 2
        },
        articles: []
    },
    {
        id: "ISBN:9780140449136",
        title: "Crime et Châtiment",
        illustration: "https://example.com/images/crime-chatiment.jpg",
        authors: ["Fiodor Dostoïevski"],
        themes: ["Psychologie", "Philosophie"],
        page_count: 430,
        release_date: new Date("1866-01-01"),
        publisher: "The Russian Messenger",
        summary: "Raskolnikov, un étudiant pauvre, commet un meurtre pour prouver sa théorie sur les hommes extraordinaires.",
        price: 14.99,
        serie: {
            name: "Classiques russes",
            number: 1
        },
        articles: []
    },
    {
        id: "ISBN:9780140449266",
        title: "Guerre et Paix",
        illustration: "https://example.com/images/guerre-paix.jpg",
        authors: ["Léon Tolstoï"],
        themes: ["Histoire", "Philosophie"],
        page_count: 1225,
        release_date: new Date("1869-01-01"),
        publisher: "The Russian Messenger",
        summary: "Un vaste panorama de la société russe pendant les guerres napoléoniennes, explorant les thèmes de la guerre, de la paix et de l'amour.",
        price: 19.99,
        serie: {
            name: "Classiques russes",
            number: 2
        },
        articles: []
    },
    {
        id: "ISBN:9780140449242",
        title: "Anna Karénine",
        illustration: "https://example.com/images/anna-karenine.jpg",
        authors: ["Léon Tolstoï"],
        themes: ["Amour", "Société"],
        page_count: 864,
        release_date: new Date("1877-01-01"),
        publisher: "The Russian Messenger",
        summary: "L'histoire tragique d'Anna Karénine, une femme de la haute société russe qui tombe amoureuse d'un jeune officier.",
        price: 17.50,
        serie: {
            name: "Classiques russes",
            number: 3
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