import * as React from 'react';
import Paper from '@mui/material/Paper';
import InputBase from '@mui/material/InputBase';
import Divider from '@mui/material/Divider';
import IconButton from '@mui/material/IconButton';
import SearchIcon from '@mui/icons-material/Search';

export default function SearchNews({onSearch, onChange, onSubmit, placeholder, isLoading}) {
   return (
      <Paper
         onSubmit={(e)=>onSubmit(e)}
         component="form"
         sx={{ p: '2px 4px', display: 'flex', alignItems: 'center', width: 400 }}
      >
         <InputBase
            sx={{ ml: 1, flex: 1 }}
            placeholder={placeholder}
            onChange={onChange}
            value={onSearch}
            inputProps={{ 'aria-label': 'Search news' }}
         />
         <Divider sx={{ height: 28, m: 0.5 }} orientation="vertical" />
         <IconButton 
            type="submit" 
            sx={{ p: '10px' }} 
            aria-label="search" 
            color="primary" 
            disabled={isLoading}
         >
            <SearchIcon />
         </IconButton>
      </Paper>
   );
}