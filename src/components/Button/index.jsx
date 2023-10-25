import styles from './index.module.scss';
import { getClassesFromObj } from '../../functions';

const Button =({textButton, onClick, className='' }) => {
   let classes = getClassesFromObj(className, styles);

   return (
      <div style={{ paddingBlock: '15px' }}>
         <button
            className={classes}
            onClick={onClick}
            type='button'
         >{textButton}</button>
      </div>
   )
}

export default Button;