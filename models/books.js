import mongoose from 'mongoose';

const BooksScheme = new mongoose.schema({
    title: {
        type: String,
        required: true,
    },
    illustration: {
        type: Buffer,
        required: false,
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
        required: true,
    },
    summary: {
        type: String,
        required: false,
    },
    price: {
        type: Number,
        required: false,
    },
    serie: {
        name: {
            type: String,
            required: false,
        },
        number: {
            type: Number,
            required: false,
        }
    },
    articles: [{
        title: {
            type: String,
            required: false,
        },
        authors: {
            type: [String],
            required: false,
        }
    }]
},)

BooksScheme.index({ _id:1})
BooksScheme.index({title:1})
BooksScheme.index({authors:1})
BooksScheme.index({themes:1})
BooksScheme.index({release_date:1})
BooksScheme.index({summary:1})
BooksScheme.index({ 'serie.name': 1})
BooksScheme.index({ 'serie.name': 1, 'serie.number': 1 })
BooksScheme.index({ 'articles.authors': 1 })
BooksScheme.index({ 'articles.title': 1 })

const Books = mongoose.model('Books', BooksScheme);

export default Books;