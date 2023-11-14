import classNames from "classnames";
import ButtonSort from "../Button";
import { sortBy } from "lodash";

export const SORTS_KEYS = [
   'TITLE', 'AUTHOR', 'COMMENTS', 'POINTS'
]

export const SORTS_METHODS = {
   NONE: list => list,
   [SORTS_KEYS[0]]: list => sortBy(list, 'title'),
   [SORTS_KEYS[1]]: list => sortBy(list, 'author'),
   [SORTS_KEYS[2]]: list => sortBy(list, 'num_comments'),
   [SORTS_KEYS[3]]: list => sortBy(list, 'points'),
};

const Sort = ({ textSort, sortKey, onSort, sortActive, isSortReverse }) => {
   
   const listClass = classNames (
      'btn',
      {
         'active' : sortActive === sortKey,
         'reverse' : isSortReverse && (sortActive === sortKey)
      }
   )

   return (
      <span className="">
         <ButtonSort
            textButton={textSort}
            className={listClass}
            onClick={()=>onSort(sortKey)}
         />
      </span>
   )
}


export default Sort;
