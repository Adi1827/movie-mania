import { useEffect, useState } from "react";

const MovieCard = ({...movieItem}) => {
    const [movieGenre,setMovieGenre] = useState(movieItem?.genre_ids);
    
    useEffect(()=>{
        genreList();
    },[])

    async function genreList() { 
        const response =await fetch("https://api.themoviedb.org/3/genre/movie/list?api_key=44867af4999a85b16e0ca84faa75a376");
        const list_genre = await response.json();
        //list_genre = genres:{0:{id:"0",name:"Action"},...}
        const genreList = list_genre?.genres?.map((item)=>item)
        // MovieGenre Filtering and Setting the names from id
        setMovieGenre(genreList.filter((id)=>movieItem?.genre_ids?.includes(id.id)));
    }
    return(
        <div className="card">
            <img src={"https://image.tmdb.org/t/p/w500/"+movieItem?.poster_path} alt="Not found" />
            <h2 className="movie-name">{movieItem.title?movieItem.title:<p>Not Found</p>}</h2>
            {/* <h2 className="movie-year">{movieItem?.release_date?.split('-')[0]}</h2> */}
            {/* <h4 className="movie-genre">{movieGenre?.map((genre)=>{return genre.name}).join(', ')}</h4> */}
        </div>
    );
}

export default MovieCard;
