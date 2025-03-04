
use library;


db.createCollection("books");


db.books.insertMany([
  {
    title: "Database managemrnt",
    author: "Emmanuel Lee",
    publishedYear: 1960,
    genre: "Fiction",
    ISBN: "978-0-06-112008-4"
  },
  {
    title: "In Networking",
    author: "George Orao",
    publishedYear: 1949,
    genre: "Dystopian",
    ISBN: "978-0-452-28423-4"
  },
  {
    title: "The Great Gatsby",
    author: "F. Scott Fitzgerald",
    publishedYear: 1925,
    genre: "Classic",
    ISBN: "978-0-7432-7356-5"
  },
  {
    title: "The Da Vinci Code",
    author: "Dan Brown",
    publishedYear: 2003,
    genre: "Mystery",
    ISBN: "978-0-385-50420-1"
  },
  {
    title: "Harry Potter and the Sorcerer’s Stone",
    author: "J.K. Rowling",
    publishedYear: 1997,
    genre: "Fantasy",
    ISBN: "978-0-590-35340-3"
  }
]);

// Retrieve all books
print("All books in the collection:");
printjson(db.books.find().toArray());

// Retrieve books by a specific author
print("Books by George Orao:");
printjson(db.books.find({ author: "George Orao" }).toArray());

// Retrieve books published after the year 2000
print("Books published after the year 2000:");
printjson(db.books.find({ publishedYear: { $gt: 2000 } }).toArray());

// Update a book's published year
db.books.updateOne(
  { ISBN: "978-0-590-35340-3" }, 
  { $set: { publishedYear: 1998 } }
);
print("Updated book's published year: ");
printjson(db.books.find({ ISBN: "978-0-590-35340-3" }).toArray());

// Add a new field 'rating' to all books and set a default value
db.books.updateMany(
  {}, 
  { $set: { rating: 4.5 } }
);
print("All books after adding 'rating' field:");
printjson(db.books.find().toArray());

// Delete a book by ISBN
db.books.deleteOne({ ISBN: "978-0-452-28423-4" });
print("Books after deleting '1984':");
printjson(db.books.find().toArray());

// Remove all books of a particular genre (Mystery)
db.books.deleteMany({ genre: "Mystery" });
print("Books after deleting Mystery genre:");
printjson(db.books.find().toArray());

// Create an index on the 'author' field
db.books.createIndex({ author: 1 });
print("Index created on 'author' field.");

// Aggregation: Find the total number of books per genre
print("Total number of books per genre:");
printjson(db.books.aggregate([{ $group: { _id: "$genre", count: { $sum: 1 } } }]).toArray());

// Aggregation: Calculate the average published year of all books
print("Average published year of all books:");
printjson(db.books.aggregate([{ $group: { _id: null, avgYear: { $avg: "$publishedYear" } } }]).toArray());

// Aggregation: Identify the top-rated book
print("Top-rated book:");
printjson(db.books.find().sort({ rating: -1 }).limit(1).toArray());
