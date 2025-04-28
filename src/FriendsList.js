import { BookToLend } from "./BookToLend";
import { Friend } from "./Friend";

export function FriendsList({ onClose, selected, friends, onBorrowing }) {
  function handleLendingToFriend(borrower) {
    onBorrowing(borrower);
  }

  return (
    <div className="right-column">
      <button className="close" onClick={() => onClose(false)}>
        &times;
      </button>
      <BookToLend selected={selected}>{selected.title}</BookToLend>
      <ul className="accordion">
        {friends.map((f) => (
          <Friend
            friend={f}
            onLendingToFriend={handleLendingToFriend}
            key={f.id}
          />
        ))}
      </ul>
    </div>
  );
}
