import styles from './index.module.scss';

const Button =({textButton, onClick, className='' }) => {
   let classes = className.split(' ').map(c => styles[c]).join(' ');

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