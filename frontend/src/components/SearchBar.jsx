function SearchBar({ searchText, onSearchChange }) {
  return (
    <div className="search-bar">
      <label htmlFor="product-search">Search products</label>
      <input
        id="product-search"
        type="search"
        value={searchText}
        onChange={(event) => onSearchChange(event.target.value)}
        placeholder="Enter product name"
      />
    </div>
  )
}

export default SearchBar
