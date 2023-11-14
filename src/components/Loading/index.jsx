import styles from './index.module.scss'

const Loading = () =>
   <div className={styles.ldsEllipsis}>
      <div className={styles.wrapDot}>
         <div></div>
         <div></div>
         <div></div>
         <div></div>
      </div>
   </div>

export default Loading;