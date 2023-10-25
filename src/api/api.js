import axios from 'axios';

const PATH_BASE = 'https://hn.algolia.com/api/v1',
      PATH_SEARCH = '/search',
      PARAM_SEARCH = 'query=',
      PARAM_PAGE = 'page=',
      PARAM_HPP = 'hitsPerPage=',
      DEFAULT_HPP = '5';

const instansAxios = axios.create({
   baseURL : PATH_BASE,
});

export const NewsAPI = {
   getNews : (valueSearch, page) => {
      const url = `${PATH_SEARCH}?${PARAM_SEARCH}${valueSearch}&${PARAM_PAGE}${page}&${PARAM_HPP}${DEFAULT_HPP}`;
      
      return instansAxios
         .get(url)
         .then(response => response.data)
   },
};