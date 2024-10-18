import { useEffect, useState } from 'react';
import { Link } from "react-router-dom";
import MovieCard from './Moviecard';
import Shimmer from './Shimmer';

const Body = () =>{
    const [searchText,setSearchText] = useState("");
    const [movieList,setMovieList] = useState([]);
    const [filteredMovie, setFilteredMovie ] = useState([]);
    const [sortButton,setSortButton] = useState("visible");
    let [pageValue,setPageValue] = useState(1);
    let [sortMovies, setSortMovies] = useState("popularity")

useEffect(()=>{
    if(searchText === ""){
        setSortButton("visible")
        setFilteredMovie(movieList)}
    else
        setSortButton("hidden")
},[searchText])

useEffect(()=>{
    if(searchText === "")
        fetchData();
    else   
        searchData();
    document.title = "MovieMania";
    window.scroll({top:0,left:100,behavior:"smooth"}) 
},[pageValue,sortMovies])

const searchData = async() =>{
    try{
        console.log("Search Data Fetched");
        const response = await fetch("https://api.themoviedb.org/3/search/multi?query="+searchText+"&include_adult=false&language=en-US&page="+pageValue+"&api_key=44867af4999a85b16e0ca84faa75a376");
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
        const response = await fetch("https://api.themoviedb.org/3/discover/movie?include_adult=false&language=en-US&page="+pageValue+"&region=US&sort_by="+sortMovies+".desc&api_key=44867af4999a85b16e0ca84faa75a376");
    const json = await response.json();
    setMovieList(json.results);
    setFilteredMovie(json.results);
    }
    catch(err){
        console.log(err);
    }
}

return movieList?.length<1 ? (
    // Shimmer UI #Loading
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
            <select value={sortMovies} name="sortBy" id="sortByOptions" onChange={(event) => {setSortMovies(event.target.value)}} style={{visibility:sortButton}}>
            <option value="" disabled>Select Your Mood</option>
            <option value={"popularity"}>Popularity</option>
            <option value={"primary_release_date"}>Release Date</option>
            <option value={"vote_count"}>Average Rating</option>
            <option value={"revenue"}>Revenue</option>
        </select>
         <button type="submit">🔎</button>
        </div>
        </form>
    <Shimmer/>
    </>
) : 
(
        <>
    <form onSubmit = {
            (e)=>
            {
                e.preventDefault();
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
            <select value={sortMovies} name="sortBy" id="sortByOptions" onChange={(event) => {
                setSortMovies(event.target.value)
                }} style={{visibility:sortButton}}>
            <option value="" disabled>Select Your Mood</option>
            <option value={"popularity"}>Popularity</option>
            <option value={"primary_release_date"}>Release Date</option>
            <option value={"vote_count"}>Average Rating</option>
            <option value={"revenue"}>Revenue</option>
        </select>
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
        }}
        style = {{visibility: pageValue === 1 ? "hidden" : 'visible'}}
            >Previous</button>
                <h1 className = "pageNumber">Page {pageValue}</h1>
            <button onClick={()=>{setPageValue(++pageValue)}}>Next</button>
    </nav>
</div>
</>
)
}

export default Body;