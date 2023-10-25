import './index.scss';

import Button from "../Button";
import Sort, { SORTS_METHODS, SORTS_KEYS } from "../Sort";
import { Component } from 'react';

class Table extends Component {
   constructor (props) {
      super(props);

      this.state = {
         sortKey: 'NONE',
         isSortReverse: false,
         sortActive: 'NONE'
      }

      this.changeSort = this.changeSort.bind(this);
   }

   changeSort(sortKey) {
      const isSortReverse = this.state.sortKey === sortKey && !this.state.isSortReverse;
      this.setState({ sortKey, isSortReverse, sortActive : sortKey });
   }

   render () {

      const {
         list, 
         onDismised,
         isLoading
      } = this.props;

      const {
         sortKey, 
         isSortReverse, 
         sortActive
      } = this.state;

      const listSortBtn = SORTS_KEYS.map((itemKey, idx) => 
         <Sort key={idx} 
            textSort={itemKey} 
            sortKey={itemKey} 
            onSort={this.changeSort} 
            sortActive={sortActive} 
            isSortReverse={isSortReverse}
         />);
   
      const sortedList = SORTS_METHODS[sortKey](list),
            reverseSortedList = isSortReverse ? sortedList.reverse() : sortedList;
   
      const listNews = 
         reverseSortedList.map(item =>
            <div className='list-news__item' key={item.objectID}>
               <p>Title: {item.title}</p>
               <p>Author: {item.author}</p>
               <a href={item.url}>{item.url}</a>
               <p>Comments: {item.num_comments}</p>
               <p>Points: {item.points}</p>
   
               <Button
                  textButton='Hide'
                  onClick={() => onDismised(item.objectID)}
                  className='btn'
               />
            </div>
      );

      return (
         <>
            <div className='tableHeader'>{listSortBtn}</div>
            <div className='list-news'>{listNews}</div>
            {(list.length === 0 && !isLoading) && <p>Not found</p>}
         </>
      )
   }
}

export default Table;