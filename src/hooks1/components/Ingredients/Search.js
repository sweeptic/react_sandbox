import React from 'react';

import Card from '../UI/Card';
import style from './Search.module.css';

const Search = React.memo(props => {
  return (
    <section className={style.search}>
      <Card>
        <div className={style.searchInput}>
          <label>Filter by Title</label>
          <input type="text" />
        </div>
      </Card>
    </section>
  );
});

export default Search;
