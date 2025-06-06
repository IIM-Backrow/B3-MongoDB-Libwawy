import Books from "../models/books.js";

export const getBooks = async (req, res) => {
    try {
        const books = await Books.find();
        res.status(200).json(books);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
}

export const getBookById = async (req, res) => {
    try {
        const idPattern = /^(ISBN|ISSN|UNKN)\:[0-9]+$/;
        if (!idPattern.test(req.params.id)) {
            return res.status(400).json({ message: "Format d'ID invalide" });
        }

        const book = await Books.findOne({ id: req.params.id });
        if (!book) {
            return res.status(404).json({ message: "Aucun livre ne correspond à cet Id" });
        }
        res.status(200).json(book);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
}

export const getBooksByTitle = async (req, res) => {
    try {
        const books = await Books.find({
            title: { $regex: req.params.title, $options: 'i' }
        });
        if (books.length === 0) {
            return res.status(404).json({ message: "Aucun livre ne correspond à ce titre" });
        }
        res.status(200).json(books);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
}

export const getBooksByAuthor = async (req, res) => {
    try {
        const books = await Books.find({ authors: { $in: [req.params.author] } });
        if (books.length === 0) {
            return res.status(404).json({ message: "Aucun livre ne correspond à cet auteur" });
        }
        res.status(200).json(books);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
}

export const getBooksByTheme = async (req, res) => {
    try {
        const books = await Books.find({ themes: { $in: [req.params.theme] } });
        if (books.length === 0) {
            return res.status(404).json({ message: "Aucun livre ne correspond à ce thème" });
        }
        res.status(200).json(books);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
}

export const getBookBySerieName = async (req, res) => {
    try {
        const books = await Books.find({ 'serie.name': { $regex: req.params.serieName, $options: 'i' } });
        if (books.length === 0) {
            return res.status(404).json({ message: "Aucun livre ne correspond à cette série" });
        }
        res.status(200).json(books);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
}

export const getBooksBySerieNameAndNumber = async (req, res) => {
    try {
        const books = await Books.find({ 'serie.name': { $regex: req.params.serieName, $options: 'i' }, 'serie.number': req.params.serieNumber });
        if (books.length === 0) {
            return res.status(404).json({ message: "Aucun livre ne correspond à cette série et ce numéro" });
        }
        res.status(200).json(books);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
}

export const getBooksByArticleAuthor = async (req, res) => {
    try {
        const books = await Books.find({ 'articles.authors': { $in: [req.params.author] } });
        if (books.length === 0) {
            return res.status(404).json({ message: "Aucun livre ne correspond à cet auteur d'article" });
        }
        res.status(200).json(books);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
}

export const getBooksByArticleTitle = async (req, res) => {
    try {
        const books = await Books.find({ 'articles.title': { $regex: req.params.title, $options: 'i' } });
        if (books.length === 0) {
            return res.status(404).json({ message: "Aucun livre ne correspond à ce titre d'article" });
        }
        res.status(200).json(books);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
}

export const createBook = async (req, res) => {
    try {
        const { id, title, illustration, authors, themes, page_count, release_date, publisher } = req.body;

        if (!id || !title || !illustration || !authors || !themes || !page_count ||
            !release_date || !publisher) {
            const missingFields = [];
            if (!id) missingFields.push('id');
            if (!title) missingFields.push('title');
            if (!illustration) missingFields.push('illustration');
            if (!authors) missingFields.push('authors');
            if (!themes) missingFields.push('themes');
            if (!page_count) missingFields.push('page_count');
            if (!release_date) missingFields.push('release_date');
            if (!publisher) missingFields.push('publisher');

            return res.status(400).json({
                message: "Champs obligatoires manquants",
                missingFields
            });
        }

        const idPattern = /^(ISBN|ISSN|UNKN)\:[0-9]+$/;
        if (!idPattern.test(id)) {
            return res.status(400).json({ message: "Format d'ID invalide" });
        }

        const book = new Books(req.body);
        const savedBook = await book.save();
        res.status(201).json(savedBook);
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
}


export const updateBook = async (req, res) => {
    try {
        const updatedBook = await Books.findByIdAndUpdate(req.params.id, req.body, { new: true });
        if (!updatedBook) {
            return res.status(404).json({ message: "Aucun livre ne correspond à cet Id" });
        }
        res.status(200).json(updatedBook);
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
}

export const deleteBook = async (req, res) => {
    try {
        const deletedBook = await Books.findByIdAndDelete(req.params.id);
        if (!deletedBook) {
            return res.status(404).json({ message: "Aucun livre ne correspond à cet Id" });
        }
        res.status(200).json({ message: "Livre supprimé avec succès" });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
}

export const getBooksByPriceRange = async (req, res) => {
    try {
        const { minPrice, maxPrice } = req.query;

        if (!minPrice && !maxPrice) {
            return res.status(400).json({ message: "Les paramètres minPrice et maxPrice sont requis" });
        } else if (!minPrice) {
            return res.status(400).json({ message: "Le paramètre minPrice est requis" });
        } else if (!maxPrice) {
            return res.status(400).json({ message: "Le paramètre maxPrice est requis" });
        }

        const books = await Books.find({
            price: { $gte: parseFloat(minPrice), $lte: parseFloat(maxPrice) }
        });

        if (books.length === 0) {
            return res.status(404).json({ message: "Aucun livre ne correspond à cette plage de prix" });
        }

        res.status(200).json(books);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
}

export const getBooksTitlesByTextSearch = async (req, res) => {
    try {
        const searchText = req.query.searchText;
        if (!searchText) {
            return res.status(400).json({ message: "Le paramètre de recherche est requis" });
        }

        const books = await Books.find({
            $text: { $search: searchText}
        }, {
            score: { $meta: "textScore" }
        }).sort({
            score: { $meta: "textScore" }
        });

        if (books.length === 0) {
            return res.status(404).json({ message: "Aucun livre ne correspond à cette recherche" });
        }

        res.status(200).json(books);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
}

export const getBooksAuthorByTextSearch = async (req, res) => {
    try {
        const searchText = req.query.searchText;
        if (!searchText) {
            return res.status(400).json({ message: "Le paramètre de recherche est requis" });
        }

        const books = await Books.find({
            $or: [
                { authors: { $elemMatch: { $regex: searchText, $options: 'i' } } },
                { 'articles.authors': { $elemMatch: { $regex: searchText, $options: 'i' } } }
            ]

        });

        if (books.length === 0) {
            return res.status(404).json({ message: "Aucun livre ne correspond à cette recherche" });
        }

        res.status(200).json(books);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
}