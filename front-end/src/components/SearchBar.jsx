import "./SearchBar.css"
import searchIcon from "../image/search.png"
function SearchBar() {
  return (
    <div id="search_container">
    <form
        id="search_form"
        action="/"
        method="get"
        autoComplete="off"
       // onSubmit={onSubmit}
    >
        
        <input
          //  value={searchQuery}
          //  onInput={(e) => setSearchQuery(e.target.value)}
            id="search_input"
            type="text"
            placeholder="Search playlists..."
            name="s"
        />
    </form>
    </div>
);
  /*
  return (
  	<form className="search_form" action="/" method="get">
    <button id="submit_button" type="submit"><img id="search_logo" src={searchIcon} alt="search" roundedCircle /></button>
        <input
            type="text"
            id="search_bar_input"
            placeholder="Search playlists"
            name="s" 
        />
    </form>
  )
  */
}
export default SearchBar

