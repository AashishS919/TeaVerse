import Fuse from "fuse.js";
import { useAppContext } from "../context/AppContext";
import { useState } from "react";

const FuzzySearch = () => {
  const { products } = useAppContext();
  const [query, setQuery] = useState("");
  const [results, setResults] = useState([]);

  const fuse = new Fuse(products, {
    keys: ["name", "category", "description"], // searchable fields
    threshold: 0.3, // adjust fuzziness (lower = stricter)
  });

  const handleSearch = (e) => {
    const input = e.target.value;
    setQuery(input);
    if (input.trim() === "") {
      setResults([]);
      return;
    }
    const res = fuse.search(input);
    setResults(res.map(result => result.item));
  };

  return (
    <div>
      <input
        type="text"
        value={query}
        onChange={handleSearch}
        placeholder="Search products..."
        className="p-2 border"
      />
      <ul>
        {results.map((p) => (
          <li key={p._id}>{p.name}</li>
        ))}
      </ul>
    </div>
  );
};
