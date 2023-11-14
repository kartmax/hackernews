import styles from './index.module.scss';
import { getClassesFromObj } from '../../functions';
import { Button } from "@mui/material";
import ArrowDownwardIcon from '@mui/icons-material/ArrowDownward';

const ButtonSort =({ textButton, onClick, className='' }) => {
   let classes = getClassesFromObj(className, styles);

   return (
      <Button 
            className={classes}
            onClick={onClick}
            endIcon={<ArrowDownwardIcon />}
      >{textButton}</Button>
   )
}

export default ButtonSort;