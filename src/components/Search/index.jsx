const Search = ({onSearch, onChange, onSubmit, placeholder, isLoading}) => 
   <form onSubmit={(e)=>onSubmit(e)}>
      <input
         type="text"
         placeholder={placeholder}
         onChange={onChange}
         value={onSearch}
      />
      <button 
         type="submit" 
         disabled={isLoading}>Search</button>
   </form>;

export default Search;