import React, { useState } from 'react';
import PropTypes from 'prop-types';

const SearchBar = ({ onSearch }) => {
    const [searchText, setSearchText] = useState('');

    const handleSearchChange = (e) => {
        setSearchText(e.target.value);
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        if (searchText) {
            onSearch(searchText);
        } else {
            alert("Please enter search text!")
        }
    };

    const handleReset = () => {
        setSearchText('');
        onSearch('');
    };

    return (
        <div className="search-bar ">
            <form onSubmit={handleSubmit}>
                <div className="search-bar-row">
                    <input
                        type="text"
                        id="search"
                        value={searchText}
                        onChange={handleSearchChange}
                        placeholder="Search with employee name"
                    />
                </div>
                <button type="submit">Search</button>
                <button type="button" onClick={handleReset}>
                    Reset
                </button>
            </form>
            {searchText && <p>Searching for: {searchText}</p>}
        </div>
    );
};

SearchBar.propTypes = {
    onSearch: PropTypes.func.isRequired,
};

export default SearchBar;
