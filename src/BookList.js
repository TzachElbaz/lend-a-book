import { Book } from "./Book";

export function BookList({ onLendingAbook, books, onReturningABook }) {
  function handleLendingABook(borrowedBook) {
    onLendingAbook(borrowedBook);
  }

  return (
    <div className="left-column">
      <ul className="book-gallery">
        {books.map((b) => (
          <Book
            book={b}
            key={b.id}
            onReturn={onReturningABook}
            onLend={handleLendingABook}
          >
            {b.title}
          </Book>
        ))}
      </ul>
    </div>
  );
}
