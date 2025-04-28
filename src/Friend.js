import { useState } from "react";
import { Button } from "./Button";

export function Friend({ friend, onLendingToFriend }) {
  const [isOpen, setIsOpen] = useState(false);
  function handleToggle() {
    setIsOpen((isOpen) => !isOpen);
  }

  return (
    <li className="item">
      <div className="name-row">
        <h3>{`${friend.firstNmae} ${friend.lastNmae}`}</h3>
      </div>
      {friend.borrowedBooks?.length > 0 && (
        <div className="info-row">
          <p className="info-text">
            Currently borrowing {friend.borrowedBooks?.length} books
          </p>

          <span
            className={`icon ${isOpen ? "open" : ""}`}
            onClick={handleToggle}
          >
            {isOpen ? "-" : "+"}
          </span>
        </div>
      )}

      {isOpen && (
        <div className="content-box">
          <ul>
            {friend.borrowedBooks.map((book) => (
              <li key={book.id}>{book.title}</li>
            ))}
          </ul>
        </div>
      )}
      <Button onClick={() => onLendingToFriend(friend)}>Lend</Button>
    </li>
  );
}
