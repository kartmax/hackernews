import React from 'react';
import './index.scss';
import { Badge, ButtonGroup, Grid, IconButton } from '@mui/material';
import Card from '@mui/material/Card';
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import TextsmsIcon from '@mui/icons-material/Textsms';
import FavoriteIcon from '@mui/icons-material/Favorite';
import DeleteIcon from '@mui/icons-material/Delete';

import Sort, { SORTS_METHODS, SORTS_KEYS } from "../Sort";
import { Component } from 'react';

class Table extends Component {
   constructor(props) {
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
      this.setState({ sortKey, isSortReverse, sortActive: sortKey });
   }

   render() {

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
            <Grid item sm={6} md={4} key={item.objectID} style={{width: '100%'}}>
               <Card style={{height: '100%', display: 'flex', flexDirection: 'column', justifyContent: 'space-between'}}>
                  <CardContent style={{position: 'relative'}}>
                     <Typography sx={{ fontSize: 14 }} color="text.secondary" gutterBottom>
                        Author: {item.author}
                     </Typography>
                     <Typography variant="h5" component="div" style={{marginBlock: '10px 20px'}}>
                        {item.title}
                     </Typography>
                     <div className='indicators'>
                        <Badge badgeContent={item.num_comments} max={999} color="primary">
                           <TextsmsIcon color="action" />
                        </Badge>
                        <Badge badgeContent={item.points} max={999} color="primary">
                           <FavoriteIcon color="action" />
                        </Badge>
                     </div>
                  </CardContent>
                  <CardActions>
                     <div className='card-footer'>
                        <Button href={item.url} target="_blank">READE MORE</Button>
                        <IconButton color='inherit' onClick={() => onDismised(item.objectID)}>
                           <DeleteIcon color='action' />
                        </IconButton>
                     </div>
                  </CardActions>
               </Card>
            </Grid>
         );

      return (
         <>
            <ButtonGroup style={{paddingBottom: '20px', overflowX: 'auto', maxWidth: '100%'}}>{listSortBtn}</ButtonGroup>
            <Grid container spacing={4}>{listNews}</Grid>
            {(list.length === 0 && !isLoading) && <Typography textAlign={'center'} marginBlock={'20px'} variant='h6'>Not found</Typography>}
         </>
      )
   }
}

export default Table;