import Books from "../models/books.js";

// Get general statistics about the library
export const getGeneralStats = async (req, res) => {
  try {
    const stats = await Books.aggregate([
      {
        $group: {
          _id: null,
          totalBooks: { $sum: 1 },
          totalPages: { $sum: "$page_count" },
          averagePages: { $avg: "$page_count" },
          totalPrice: { $sum: "$price" },
          averagePrice: { $avg: "$price" },
          minPrice: { $min: "$price" },
          maxPrice: { $max: "$price" },
        },
      },
      {
        $project: {
          _id: 0,
          totalBooks: 1,
          totalPages: 1,
          averagePages: { $round: ["$averagePages", 2] },
          totalPrice: { $round: ["$totalPrice", 2] },
          averagePrice: { $round: ["$averagePrice", 2] },
          minPrice: 1,
          maxPrice: 1,
        },
      },
    ]);

    if (stats.length === 0) {
      return res.status(404).json({ message: "Aucune donnée disponible" });
    }

    res.status(200).json(stats[0]);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Get top 10 authors by number of books
export const getTopAuthors = async (req, res) => {
  try {
    const limit = parseInt(req.query.limit) || 10;

    const topAuthors = await Books.aggregate([
      { $unwind: "$authors" },
      {
        $group: {
          _id: "$authors",
          bookCount: { $sum: 1 },
          totalPages: { $sum: "$page_count" },
          averagePages: { $avg: "$page_count" },
        },
      },
      { $sort: { bookCount: -1 } },
      { $limit: limit },
      {
        $project: {
          _id: 0,
          author: "$_id",
          bookCount: 1,
          totalPages: 1,
          averagePages: { $round: ["$averagePages", 2] },
        },
      },
    ]);

    if (topAuthors.length === 0) {
      return res.status(404).json({ message: "Aucun auteur trouvé" });
    }

    res.status(200).json(topAuthors);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Get top themes by number of books
export const getTopThemes = async (req, res) => {
  try {
    const limit = parseInt(req.query.limit) || 10;

    const topThemes = await Books.aggregate([
      { $unwind: "$themes" },
      {
        $group: {
          _id: "$themes",
          bookCount: { $sum: 1 },
          totalPages: { $sum: "$page_count" },
          averagePages: { $avg: "$page_count" },
        },
      },
      { $sort: { bookCount: -1 } },
      { $limit: limit },
      {
        $project: {
          _id: 0,
          theme: "$_id",
          bookCount: 1,
          totalPages: 1,
          averagePages: { $round: ["$averagePages", 2] },
        },
      },
    ]);

    if (topThemes.length === 0) {
      return res.status(404).json({ message: "Aucun thème trouvé" });
    }

    res.status(200).json(topThemes);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Get top publishers by number of books
export const getTopPublishers = async (req, res) => {
  try {
    const limit = parseInt(req.query.limit) || 10;

    const topPublishers = await Books.aggregate([
      { $match: { publisher: { $ne: null, $ne: "" } } },
      {
        $group: {
          _id: "$publisher",
          bookCount: { $sum: 1 },
          totalPages: { $sum: "$page_count" },
          averagePages: { $avg: "$page_count" },
          averagePrice: { $avg: "$price" },
        },
      },
      { $sort: { bookCount: -1 } },
      { $limit: limit },
      {
        $project: {
          _id: 0,
          publisher: "$_id",
          bookCount: 1,
          totalPages: 1,
          averagePages: { $round: ["$averagePages", 2] },
          averagePrice: { $round: ["$averagePrice", 2] },
        },
      },
    ]);

    if (topPublishers.length === 0) {
      return res.status(404).json({ message: "Aucun éditeur trouvé" });
    }

    res.status(200).json(topPublishers);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Get books statistics by year
export const getBooksByYear = async (req, res) => {
  try {
    const booksByYear = await Books.aggregate([
      {
        $group: {
          _id: { $year: "$release_date" },
          bookCount: { $sum: 1 },
          totalPages: { $sum: "$page_count" },
          averagePages: { $avg: "$page_count" },
          averagePrice: { $avg: "$price" },
        },
      },
      { $sort: { _id: -1 } },
      {
        $project: {
          _id: 0,
          year: "$_id",
          bookCount: 1,
          totalPages: 1,
          averagePages: { $round: ["$averagePages", 2] },
          averagePrice: { $round: ["$averagePrice", 2] },
        },
      },
    ]);

    if (booksByYear.length === 0) {
      return res
        .status(404)
        .json({ message: "Aucune donnée par année trouvée" });
    }

    res.status(200).json(booksByYear);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Get series statistics
export const getSeriesStats = async (req, res) => {
  try {
    const seriesStats = await Books.aggregate([
      { $match: { "serie.name": { $ne: null, $ne: "" } } },
      {
        $group: {
          _id: "$serie.name",
          bookCount: { $sum: 1 },
          totalPages: { $sum: "$page_count" },
          averagePages: { $avg: "$page_count" },
          minNumber: { $min: "$serie.number" },
          maxNumber: { $max: "$serie.number" },
        },
      },
      { $sort: { bookCount: -1 } },
      {
        $project: {
          _id: 0,
          serieName: "$_id",
          bookCount: 1,
          totalPages: 1,
          averagePages: { $round: ["$averagePages", 2] },
          minNumber: 1,
          maxNumber: 1,
        },
      },
    ]);

    if (seriesStats.length === 0) {
      return res.status(404).json({ message: "Aucune série trouvée" });
    }

    res.status(200).json(seriesStats);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Get article authors statistics
export const getArticleAuthorsStats = async (req, res) => {
  try {
    const limit = parseInt(req.query.limit) || 10;

    const articleAuthorsStats = await Books.aggregate([
      { $unwind: "$articles" },
      { $unwind: "$articles.authors" },
      {
        $group: {
          _id: "$articles.authors",
          articleCount: { $sum: 1 },
          bookCount: { $addToSet: "$_id" },
        },
      },
      {
        $project: {
          _id: 0,
          author: "$_id",
          articleCount: 1,
          bookCount: { $size: "$bookCount" },
        },
      },
      { $sort: { articleCount: -1 } },
      { $limit: limit },
    ]);

    if (articleAuthorsStats.length === 0) {
      return res.status(404).json({ message: "Aucun auteur d'article trouvé" });
    }

    res.status(200).json(articleAuthorsStats);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Get price range statistics
export const getPriceRangeStats = async (req, res) => {
  try {
    const priceRanges = await Books.aggregate([
      { $match: { price: { $ne: null, $gt: 0 } } },
      {
        $bucket: {
          groupBy: "$price",
          boundaries: [0, 10, 20, 30, 50, 100, 200, Infinity],
          default: "Other",
          output: {
            count: { $sum: 1 },
            totalPages: { $sum: "$page_count" },
            averagePages: { $avg: "$page_count" },
            minPrice: { $min: "$price" },
            maxPrice: { $max: "$price" },
          },
        },
      },
      {
        $project: {
          _id: 0,
          priceRange: {
            $switch: {
              branches: [
                { case: { $eq: ["$_id", 0] }, then: "0-10€" },
                { case: { $eq: ["$_id", 10] }, then: "10-20€" },
                { case: { $eq: ["$_id", 20] }, then: "20-30€" },
                { case: { $eq: ["$_id", 30] }, then: "30-50€" },
                { case: { $eq: ["$_id", 50] }, then: "50-100€" },
                { case: { $eq: ["$_id", 100] }, then: "100-200€" },
                { case: { $eq: ["$_id", 200] }, then: "200€+" },
              ],
              default: "Other",
            },
          },
          count: 1,
          totalPages: 1,
          averagePages: { $round: ["$averagePages", 2] },
          minPrice: 1,
          maxPrice: 1,
        },
      },
    ]);

    if (priceRanges.length === 0) {
      return res.status(404).json({ message: "Aucune donnée de prix trouvée" });
    }

    res.status(200).json(priceRanges);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
