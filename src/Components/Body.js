import { useEffect, useState } from 'react';
import { Link } from "react-router-dom";
import MovieCard from './Moviecard';
import Shimmer from './Shimmer';

const Body = () =>{
    const [searchText,setSearchText] = useState("");
    const [movieList,setMovieList] = useState("");
    const [filteredMovie, setFilteredMovie ] = useState([]);
    let [pageValue,setPageValue] = useState(1)

useEffect(()=>{
    if(searchText === "")
        setFilteredMovie(movieList)  
},[searchText])

useEffect(()=>{
    if(searchText === "")
        fetchData();
    else   
        searchData();
    window.scroll({top:0,left:100,behavior:"smooth"}) 
},[pageValue])

const searchData = async() =>{
    try{
        console.log("Search Data Fetched");
        const response = await fetch("https://api.themoviedb.org/3/search/multi?query="+searchText+"&include_adult=true&language=en-US&page="+pageValue+"&api_key=44867af4999a85b16e0ca84faa75a376");
        const json = await response.json();
        setFilteredMovie(json.results);
    }
    catch(err){
        console.log(err);
    }
}

const fetchData = async () =>{
    try{
        console.log("Movie Data Fetched");
        const response = await fetch("https://api.themoviedb.org/3/discover/movie?include_adult=true&language=en-US&page="+pageValue+"&region=US&sort_by=vote_count.desc&api_key=44867af4999a85b16e0ca84faa75a376");
    const json = await response.json();
    setMovieList(json.results);
    setFilteredMovie(json.results);
    }
    catch(err){
        console.log(err);
    }
}
    
return movieList?.length<1 ? (
    <Shimmer/>
) : 
(
        <>
        <form action='#'
        onSubmit = {
            ()=>
            {
                searchData();
                setPageValue(1);
            }}
        className="searchForm--1"
        >
            <div className="container">
            <input 
            type="search" 
            className="search-btn" 
            value = {searchText} 
            onChange={
            (e)=>{
                setSearchText(e.target.value.trimStart());
            }} 
            required
            />

         <button type="submit">🔎</button>
        </div>
        </form>
    <div className="movieList">
    {
        filteredMovie?.length<1 ?
        ( <h1>Not found...</h1> )
        :
        (filteredMovie?.map((movieItem)=>
            {
                return (<Link to={'/Movies/'+movieItem.id} key = {movieItem.id}><MovieCard {...movieItem} ></MovieCard></Link>); 
            })
        )
    }
</div>
<div className="headingContents">
    <p className="infoPara">Refresh yourself to see new movies everytime</p>
    <nav className='page-navigation'>
            <button onClick={()=>{
                if(pageValue>1){
                setPageValue(--pageValue)
            }
        }
            }>Previous</button>
                <h1 className = "pageNumber">Page {pageValue}</h1>
            <button onClick={()=>{setPageValue(++pageValue)}}>Next</button>
    </nav>
</div>
</>
)
}

export default Body;
