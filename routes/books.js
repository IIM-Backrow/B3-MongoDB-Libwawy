import express from 'express';
import {
getBooks,
getBookById,
getBooksByTitle,
getBooksByAuthor,
getBooksByTheme,
getBookBySerieName,
getBooksBySerieNameAndNumber,
getBooksByArticleAuthor,
getBooksByArticleTitle,
createBook,
updateBook,
deleteBook,
getBooksByPriceRange,
getBooksTitlesByTextSearch,
getBooksAuthorByTextSearch
} from '../controllers/booksController.js';

const router = express.Router();

router.get('/', getBooks);
router.get('/id/:id', getBookById);
router.get('/title/:title', getBooksByTitle);
router.get('/author/:author', getBooksByAuthor);
router.get('/theme/:theme', getBooksByTheme);
router.get('/serie/:serieName', getBookBySerieName);
router.get('/serie/:serieName/:serieNumber', getBooksBySerieNameAndNumber);
router.get('/article/author/:author', getBooksByArticleAuthor);
router.get('/article/title/:title', getBooksByArticleTitle);
router.post('/', createBook);
router.put('/:id', updateBook);
router.delete('/:id', deleteBook);

router.get('/price', getBooksByPriceRange);
router.get('/search/title', getBooksTitlesByTextSearch);
router.get('/search/author', getBooksAuthorByTextSearch);

export default router;
