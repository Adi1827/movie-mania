// import  useState from "react";

// const Search = () =>{
//     const [searchText,setSearchText] = useState("");

//     const searchData = async() =>{
//         try{
//             console.log("Search Data Fetched");
//             const response = await fetch("https://api.themoviedb.org/3/search/multi?query="+searchText+"&include_adult=false&language=en-US&page="+pageValue+"&api_key=44867af4999a85b16e0ca84faa75a376");
//             const json = await response.json();
//             setFilteredMovie(json.results)
//         }
//         catch(err){
//             console.log(err);
//         }
//     }
//     return(
//         <form action='#'
//         onSubmit = {
//             ()=>
//             {
//                 searchData()
//                 setPageValue(1);
//             }}
//         >
//             <div className="container">
//             <input 
//             type="search" 
//             placeholder='Movies waiting for you...'
//             className="search-btn" 
//             value = {searchText} 
//             onChange={
//             (e)=>{
//                 setSearchText(e.target.value.trimStart());
//             }}
//             />

//          <button type="submit">🔍</button>
//          </div>
//         </form>
//     )
// }

// export default Search;