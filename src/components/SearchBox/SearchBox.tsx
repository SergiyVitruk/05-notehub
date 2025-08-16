import css from "./SearchBox.module.css";

interface SearchBoxProps {
  text: string;
  onSearch: (value: string) => void;
}

export default function SearchBox({ text, onSearch }: SearchBoxProps) {
  return (
    <input
      className={css.input}
      type="text"
      name="search"
      placeholder="Search notes"
      value={text}
      onChange={(e) => onSearch(e.target.value)}
    />
  );
}
