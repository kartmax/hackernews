import { Component } from 'react';
import './App.scss';

import '@fontsource/roboto/300.css';
import '@fontsource/roboto/400.css';
import '@fontsource/roboto/500.css';
import '@fontsource/roboto/700.css';


import { NewsAPI } from './api/api';

import TopBar from './components/TopBar';
import Counter from './components/Counter';
import Loading from './components/Loading';

import { WithErrorTable } from './hoc/WithError';
import { Container, Stack } from '@mui/material';
import { LoadingButton } from '@mui/lab';

const updateSearchTopStoriesState = (hits, page) => (prevState) => {
   const { searchKey, results } = prevState;

   const oldHits = results && results[searchKey]
      ? results[searchKey].hits
      : [];

   const updateHits = [...oldHits, ...hits];

   return {
      results: {
         ...results,
         [searchKey]: {
            hits: updateHits,
            page,
            count: updateHits.length
         },
      },
      isLoading: false,
   };
};


class App extends Component {
   _isMounted = false;

   constructor(props) {
      super(props);

      this.state = {
         results: null,
         onSearch: 'redux',
         searchKey: '',
         error: null,
         isLoading: false,
      };

      this.onDismised = this.onDismised.bind(this);
      this.onSearchChange = this.onSearchChange.bind(this);
      this.setSearchTopStories = this.setSearchTopStories.bind(this);
      this.onSearchSubmit = this.onSearchSubmit.bind(this);
      this.fetchSearchTopStories = this.fetchSearchTopStories.bind(this);
      this.needToSearchTopStories = this.needToSearchTopStories.bind(this);
   };

   onDismised(id) {
      const { searchKey, results } = this.state;
      const { hits, page } = results[searchKey];

      const filterIsNotId = item => item.objectID !== id,
         updatedList = hits.filter(filterIsNotId);

      this.setState({
         results: {
            ...results,
            [searchKey]: {
               hits: updatedList,
               page,
               count: updatedList.length
            }
         }
      })
   };

   onSearchChange(e) {
      this.setState({ onSearch: e.target.value });
   }

   setSearchTopStories(result) {
      const { hits, page } = result;
      this.setState(updateSearchTopStoriesState(hits, page));
   };

   fetchSearchTopStories(onSearch, page = 0) {
      this.setState({ isLoading: true });

      NewsAPI.getNews(onSearch, page)
         .then(data => this._isMounted && this.setSearchTopStories(data))
         .catch(error => {
            this.setState({isLoading: false});
            this._isMounted && this.setState({ error });
         });
   };

   needToSearchTopStories(onSearch) {
      if (this.state.results) {
         return !this.state.results[onSearch];
      }
   };

   onSearchSubmit(event) {
      const { onSearch } = this.state;
      this.setState({ searchKey: onSearch });

      if (event) { // for search btn
         this.needToSearchTopStories(onSearch) && this.fetchSearchTopStories(onSearch);
         event && event.preventDefault();
      } else { // for add new news btn
         this.fetchSearchTopStories(onSearch);
      }
   };

   componentDidMount() {
      this._isMounted = true;
      this.onSearchSubmit()
   };

   componentWillUnmount() {
      this._isMounted = false;
   }

   render() {
      const {
         onSearch,
         searchKey,
         results,
         error,
         isLoading
      } = this.state;

      const count = (
         results &&
         results[searchKey] &&
         results[searchKey].count
      ) || 0;

      const page = (
         results &&
         results[searchKey] &&
         results[searchKey].page
      ) || 0;

      const list = (
         results &&
         results[searchKey] &&
         results[searchKey].hits
      ) || [];

      return (
         <div className='App'>
            <TopBar 
               onChange={this.onSearchChange} 
               onSubmit={this.onSearchSubmit} 
               onSearch={onSearch} 
               isLoading={isLoading} 
            />

            {
            (isLoading && !this.state.results) || (isLoading && this.state.results && !this.state.results[this.state.searchKey]) 
            ? <Loading/>
            : <Container style={{ paddingBlock: '30px' }}>
               <WithErrorTable
                  error={error}
                  list={list}
                  onDismised={this.onDismised}
                  isLoading={isLoading}
               />
               <Counter count={count} />
               <Stack direction={'row'} justifyContent={'center'}>
                  <LoadingButton 
                     onClick={() => this.fetchSearchTopStories(onSearch, page + 1)} 
                     loading={isLoading} 
                     variant="outlined">
                        More news
                  </LoadingButton>
               </Stack>
            </Container>
            }
            
         </div>
      )
   };
};

export default App;
