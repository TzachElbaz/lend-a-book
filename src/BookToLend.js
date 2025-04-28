export function BookToLend({ selected, children }) {
  return (
    <div className="selected-book">
      <img src={selected.image} alt={selected.title} />
      <label>{children}</label>
    </div>
  );
}
