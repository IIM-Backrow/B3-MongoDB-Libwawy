import express from "express";
import {
  getGeneralStats,
  getTopAuthors,
  getTopThemes,
  getTopPublishers,
  getBooksByYear,
  getSeriesStats,
  getArticleAuthorsStats,
  getPriceRangeStats,
} from "../controllers/statsController.js";

const router = express.Router();

// General library statistics
router.get("/", getGeneralStats);

// Top entities statistics (with optional limit query parameter)
router.get("/authors", getTopAuthors);
router.get("/themes", getTopThemes);
router.get("/publishers", getTopPublishers);
router.get("/article-authors", getArticleAuthorsStats);

// Time-based statistics
router.get("/by-year", getBooksByYear);

// Series statistics
router.get("/series", getSeriesStats);

// Price range statistics
router.get("/price-ranges", getPriceRangeStats);

export default router;
