import mongoose from 'mongoose';

const BooksScheme = new mongoose.Schema({
    id: {
        type: String,
        required: true,
        validate: {
            validator: function (v) {
                return /^(ISBN|ISSN|UNKN)\:[0-9]+$/.test(v);
            },
            message: props => `${props.value} is not a valid ID format! Must be 'ISBN', 'ISSN', or 'UNKN' followed by numbers`
        }
    },
    title: {
        type: String,
        required: true,
    },
    illustration: {
        type: String,
        required: true,
    },
    authors: {
        type: [String],
        required: true,
    },
    themes: {
        type: [String],
        required: true,
    },
    page_count: {
        type: Number,
        required: true,
    },
    release_date: {
        type: Date,
        required: true,
    },
    publisher: {
        type: String,
    },
    summary: {
        type: String,

    },
    price: {
        type: Number,

    },
    serie: {
        name: {
            type: String,

        },
        number: {
            type: Number,

        }
    },
    articles: [{
        title: {
            type: String,

        },
        authors: {
            type: [String],

        }
    }]
})

BooksScheme.index({ id: 1 })
BooksScheme.index({ title: 1 })
BooksScheme.index({ authors: 1 })
BooksScheme.index({ themes: 1 })
BooksScheme.index({ release_date: 1 })
BooksScheme.index({ summary: 1 })
BooksScheme.index({ 'serie.name': 1 })
BooksScheme.index({ 'serie.name': 1, 'serie.number': 1 })
BooksScheme.index({ 'articles.authors': 1 })
BooksScheme.index({ 'articles.title': 1 })
BooksScheme.index(
    {
        title: 'text',
        'serie.name': 'text',
        'articles.title': 'text'
    },
    {
        weights: {
            title: 10,
            'serie.name': 2,
            'articles.title': 5
        }
    }
);

const Books = mongoose.model('Books', BooksScheme);

export default Books;