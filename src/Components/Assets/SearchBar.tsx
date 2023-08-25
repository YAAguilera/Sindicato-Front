import React from "react";
import {FaMagnifyingGlass} from 'react-icons/fa6'
interface searchProps {
    searchTerm: string;
    onSearch: any;
  }
const SearchBar: React.FC<searchProps> = ({ searchTerm, onSearch }) => {
  return (
    <div className="relative w-[20em] flex items-center justify-center">
      <span className="absolute inset-y-0 left-0 pl-2 flex items-center">
        <FaMagnifyingGlass/>
      </span>
      <input
        type="text"
        value={searchTerm}
        onChange={onSearch}
        className="pl-8 pr-2 py-2 w-full rounded-full outline-none"
      />
    </div>
  );
};

export default SearchBar;
