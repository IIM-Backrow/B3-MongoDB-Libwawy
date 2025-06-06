# B3-MongoDB-Libwawy

A Node.js REST API for managing a library database using MongoDB and Mongoose.

## Table of Contents

- [Description](#description)
- [Features](#features)
- [Installation](#installation)
- [Usage](#usage)
- [API Endpoints](#api-endpoints)
- [Seeding the Database](#seeding-the-database)
- [Project Structure](#project-structure)
- [Creators](#creators)

## Description

This project provides a RESTful API to manage a collection of books, including advanced search and filtering capabilities. It uses Express.js for the server and MongoDB (with Mongoose) for data storage.

## Features

- CRUD operations for books
- Search by title, author, theme, series, article author/title, and price range
- Text search with weighted fields
- MongoDB schema validation

## Installation

1. Clone the repository.
2. Install dependencies:

   ```sh
   npm install
   ```

3. Create a `.env` file at the root with the following content:

   ```
   PORT=3000
   MONGO_URI="mongodb://localhost:27017/books"
   ```

4. Start the server:

   ```sh
   npm run dev
   ```

   Or for:

   ```sh
   npm start
   ```

## Usage

- The API will be available at `http://localhost:3000` (or the port you set in `.env`).
- Use tools like Postman or curl to interact with the endpoints.

## API Endpoints

### Books Endpoints

- `GET /books` — List all books
- `GET /books/id/:id` — Get a book by its ID
- `GET /books/title/:title` — Search books by title
- `GET /books/author/:author` — Search books by author
- `GET /books/theme/:theme` — Search books by theme
- `GET /books/serie/:serieName` — Search books by series name
- `GET /books/serie/:serieName/:serieNumber` — Search books by series name and number
- `GET /books/article/author/:author` — Search books by article author
- `GET /books/article/title/:title` — Search books by article title
- `POST /books` — Create a new book
- `PUT /books/:id` — Update a book
- `DELETE /books/:id` — Delete a book
- `GET /books/price?minPrice=10&maxPrice=20` — Search books by price range
- `GET /books/search/title?searchText=...` — Text search in titles, series, and article titles
- `GET /books/search/author?searchText=...` — Text search in authors and article authors

### Statistics Endpoints

- `GET /stats` — Get general library statistics (total books, pages, prices, etc.)
- `GET /stats/authors?limit=10` — Get top authors by number of books (default limit: 10)
- `GET /stats/themes?limit=10` — Get top themes by number of books (default limit: 10)
- `GET /stats/publishers?limit=10` — Get top publishers by number of books (default limit: 10)
- `GET /stats/article-authors?limit=10` — Get top article authors by number of articles (default limit: 10)
- `GET /stats/by-year` — Get books statistics grouped by publication year
- `GET /stats/series` — Get series statistics (book count, pages, etc.)
- `GET /stats/price-ranges` — Get book count and statistics by price ranges

## Seeding the Database

To seed the database with sample books, run:

```sh
npm run seed
```

## Project Structure

```
.
├── app.js
├── server.js
├── config/
│   └── db.js
├── controllers/
│   ├── booksController.js
│   └── statsController.js
├── models/
│   └── books.js
├── routes/
│   ├── books.js
│   ├── index.js
│   └── stats.js
├── seed/
│   ├── books.js
│   └── index.js
├── .env
├── package.json
└── README.md
```

## Creators

- **Thomas CANDILLE**
- **Michel MOCCAND JACQUET**

_Groupe B_
