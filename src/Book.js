import { Button } from "./Button";

export function Book({ book, onReturn, onLend, children }) {
  function handleLendingABook() {
    const borrowedBook = { ...book, isBorrowed: !book.isBorrowed };
    onLend(borrowedBook);
  }

  function handleReturnBook() {
    const returnedBook = {
      ...book,
      isBorrowed: !book.isBorrowed,
      borrowerNmae: "",
    };
    onReturn(returnedBook);
  }

  return (
    <li className={`${book.isBorrowed ? "borrowed" : "book"}`}>
      <img
        src={book.image}
        alt={book.title}
        onClick={
          book.isBorrowed
            ? () => {
                alert(`${book.title} is already borrowed`);
              }
            : handleLendingABook
        }
      />
      <label>{children}</label>
      {book.isBorrowed ? (
        <Button onClick={handleReturnBook}>
          Return from {book.borrowerNmae}
        </Button>
      ) : (
        <Button onClick={handleLendingABook}>Lend to friend</Button>
      )}
    </li>
  );
}
