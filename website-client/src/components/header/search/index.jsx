import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';

export default function Search(props) {
  let [pSearch, setPSearch] = useState();

  return (
    <>
      <div className={props.propsActive ? 'search-container display-flex' : 'search-container'}>
        <input
          type="search"
          name="search"
          id="search"
          className="search"
          placeholder="Nhập tìm kiếm ..."
          value={pSearch}
          onChange={(e) => setPSearch(e.target.value)}
        />
        <Link to={`search/${pSearch}`}>
          <i className="icon-search fa-solid fa-magnifying-glass"></i>
        </Link>
      </div>
    </>
  );
}
