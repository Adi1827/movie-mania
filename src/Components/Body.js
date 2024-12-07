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
    const [sortMovies, setSortMovies] = useState("popularity")
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
    <form className='w-full'>
             <div className="flex justify-center space-x-2 pb-5">
            <input className='w-[300px] h-[45px] border-solid border-[5px] border-[#DFD0B8] bg-transparent rounded-[10px]'
            value = {searchText} 
            onChange={
            (e)=>{
                setSearchText(e.target.value.trimStart());
            }}
            required
            />
            <select
                className='w-[200px] h-[45px] px-2 border-solid border-[5px] border-[#DFD0B8] bg-transparent rounded-[10px] font-medium' 
                value={sortMovies} name="sortBy" id="sortByOptions">
                <option value="" disabled>Select Your Mood</option>
                <option value={"popularity"}>Popularity</option>
                <option value={"primary_release_date"}>Release Date</option>
                <option value={"vote_count"}>Average Rating</option>
                <option value={"revenue"}>Revenue</option>
            </select>
            <button type="submit" className="text-2xl flex items-center justify-center rounded-full hover:bg-[#DFD0B8] transition-all duration-300">
                🔎
            </button>

        </div>
        </form>
    <Shimmer/>
    </> ) :  (
        <>
    <form onSubmit = {
            (e)=>
            {
                e.preventDefault();
                searchData();
                setPageValue(1);
            }}
        className="w-full"
        >
            <div className="flex justify-center space-x-2 pb-5">
            <input className='w-[300px] h-[45px] border-solid border-[5px] border-[#DFD0B8] bg-transparent rounded-[10px]'
            type="search"
            value = {searchText} 
            onChange={
            (e)=>{
                setSearchText(e.target.value.trimStart());
            }}
            required
            />
            <select
                className='w-[200px] h-[45px] px-2 border-solid border-[5px] border-[#DFD0B8] bg-transparent rounded-[10px] font-medium' 
                value={sortMovies} name="sortBy" id="sortByOptions" onChange={(event) => {
                setSortMovies(event.target.value)
                }} style={{visibility:sortButton}}>
            <option className="bg-[#DFD0B8]" value="" disabled>Select Your Mood</option>
            <option className="bg-[#948979]" value={"popularity"}>Popularity</option>
            <option className="bg-[#948979]" value={"primary_release_date"}>Release Date</option>
            <option className="bg-[#948979]" value={"vote_count"}>Average Rating</option>
            <option className="bg-[#948979]" value={"revenue"}>Revenue</option>
        </select>
        <button type="submit" className="text-2xl flex items-center justify-center rounded-full hover:bg-[#DFD0B8] transition-all duration-300">
                🔎
            </button>
        </div>
    </form>
        
    <div className="flex flex-wrap justify-around">
    {
        filteredMovie?.length<1 ?
        ( <h1>Not found...</h1> )
        :
        (filteredMovie?.map((movieItem)=>
            {
                
            if(movieItem?.poster_path === null){
                return null;
            }
            else
                return (<Link to={'/Movies/'+movieItem.id} key = {movieItem.id}><MovieCard {...movieItem} ></MovieCard></Link>); 
            })
        )
    }
</div>
    <div className="text-lg p-[50px] text-black">
    <p className="text-center">Refresh yourself to see new movies everytime</p>
        <nav className='flex justify-center pt-5'>
            <button
            className="relative px-5 py-2.5 text-sm text-white bg-[#4caf50] border-none shadow-md cursor-pointer transition-all duration-300 ease-in-out hover:shadow-[0_10px_25px_rgba(0,0,0,0.3)]"
            onClick={()=>{
                if(pageValue>1){
                setPageValue(--pageValue)
            }
        }}
        style = {{visibility: pageValue === 1 ? "hidden" : 'visible'}}
            >Previous</button>
                <h1 className = "px-4 text-2xl font-bold">Page {pageValue}</h1>
            <button className="relative px-5 py-2.5 text-sm text-white bg-[#4caf50] border-none shadow-md cursor-pointer transition-all duration-300 ease-in-out hover:shadow-[0_10px_25px_rgba(0,0,0,0.3)]" onClick={()=>{setPageValue(++pageValue)}}>
           Next
           </button>
    </nav>
    </div>

</>
)
}

export default Body;