import { useState } from "react";
import "./App.css";
import { BookList } from "./BookList";
import { FriendsList } from "./FriendsList";

export const booksList = [
  {
    id: 1,
    title: "Wicked",
    author: "Gregory Maguire",
    image: "./wicked.jpg",
    isBorrowed: true,
    borrowerNmae: "Noam",
  },
  {
    id: 2,
    title: "Stardust",
    author: "Neil Gaiman",
    image: "./stardust.jpg",
    isBorrowed: false,
    borrowerNmae: "",
  },
  {
    id: 3,
    title: "The Book of Dust: The Secret Commonwealth",
    author: "Philip Pullman",
    image: "./the-book-of-dust-2.jpg",
    isBorrowed: false,
    borrowerNmae: "",
  },
  {
    id: 4,
    title: "A Wizard of Earthsea",
    author: "Ursula K. Le Guin",
    image: "./a-wizard-of-earthsea.jpg",
    isBorrowed: false,
    borrowerNmae: "",
  },
  {
    id: 5,
    title: "A Midsummer Night's Dream",
    author: "William Shakespeare",
    image: "./a-midsummer-nights-dream.jpg",
    isBorrowed: true,
    borrowerNmae: "Tal",
  },
  {
    id: 6,
    title: "Harry Potter and the Order of the Phoenix",
    author: "J.K. Rowlimg",
    image: "./harry-potter.jpg",
    isBorrowed: false,
    borrowerNmae: "",
  },
  {
    id: 7,
    title: "The Golden Compass",
    author: "Philip Pullman",
    image: "./the-golden-compass.jpg",
    isBorrowed: false,
    borrowerNmae: "",
  },
  {
    id: 8,
    title: "Little Women",
    author: "Louisa May Alcott",
    image: "./little-women.jpg",
    isBorrowed: false,
    borrowerNmae: "",
  },
];

export const friendsList = [
  {
    id: 1,
    firstNmae: "Andy",
    lastNmae: "Feldbau",
    borrowedBooks: [],
  },
  {
    id: 2,
    firstNmae: "Meirav",
    lastNmae: "Katziri",
    borrowedBooks: [],
  },
  {
    id: 3,
    firstNmae: "Noam",
    lastNmae: "Bitzur",
    borrowedBooks: [{ bookId: 1, title: "Wicked" }],
  },
  {
    id: 4,
    firstNmae: "Tal",
    lastNmae: "Brener",
    borrowedBooks: [{ bookId: 5, title: "A Midsummer Night's Dream" }],
  },
];

function App() {
  const [showFriends, setShowFriends] = useState(false);
  const [selectedBook, setSelectedBook] = useState(null);
  const [books, setBooks] = useState(booksList);
  const [friends, setFriends] = useState(friendsList);

  function handleShowFriends(value) {
    if (showFriends === value) return;
    setShowFriends((show) => (show = value));
    if (!value) setSelectedBook(null);
  }

  function handleSelectedbook(selected) {
    if (!showFriends) setShowFriends(true);
    setSelectedBook(selected);
  }

  function handleReturnABook(returnedBook) {
    setBooks((books) =>
      books.map((b) => (b.id === returnedBook.id ? returnedBook : b))
    );
    const friendToUpdate = friends.find((f) =>
      f.borrowedBooks?.some((b) => b?.bookId === returnedBook.id)
    );
    friendToUpdate.borrowedBooks = friendToUpdate.borrowedBooks.filter(
      (b) => b.bookId !== returnedBook.id
    );
    setFriends((friends) =>
      friends.map((friend) =>
        friend.id === friendToUpdate.id ? friendToUpdate : friend
      )
    );
  }

  function handleBorrowing(borrower) {
    setBooks(
      books.map((book) =>
        book.id === selectedBook.id
          ? { ...book, isBorrowed: true, borrowerNmae: borrower.firstNmae }
          : book
      )
    );

    const borrowedBooksList = [
      ...borrower.borrowedBooks,
      { bookId: selectedBook.id, title: selectedBook.title },
    ];

    setFriends((friends) =>
      friends.map((friend) =>
        friend.id === borrower.id
          ? { ...friend, borrowedBooks: borrowedBooksList }
          : friend
      )
    );
    setSelectedBook(null);
    setShowFriends(false);
  }

  return (
    <div className="container">
      <BookList
        onLendingAbook={handleSelectedbook}
        books={books}
        onReturningABook={handleReturnABook}
      />
      {showFriends && (
        <FriendsList
          onClose={handleShowFriends}
          selected={selectedBook}
          friends={friends}
          onBorrowing={handleBorrowing}
        />
      )}
    </div>
  );
}

export default App;
