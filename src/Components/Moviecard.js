import posterHolder from '../assets/img/poster-holder.jpg';
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
        <div className="w-[250px] h-[600px] mt-5 mr-[6px] shadow-default overflow-hidden rounded-lg ease-in-out hover:shadow-hover hover:[text-shadow:1px_0_10px_#FFF] duration-200">
            <img src={(movieItem.poster_path !== null && movieItem.poster_path !== undefined) ? "https://image.tmdb.org/t/p/w500/"+movieItem?.poster_path : posterHolder} className='w-full h-[400px] m-auto block ease-in-out hover:shadow-card duration-300' alt="Not found" />
            <h2 className="text-center text-[#483C46] p-2.5 text-2xl font-extrabold overflow-clip">{movieItem.title ? movieItem.title : movieItem.name}</h2>
            {/* <h2 className="text-center text-[#483C46] p-2.5 text-2xl font-extrabold overflow-clip">{movieItem?.release_date?.split('-')[0]}</h2>
            <h4 className="text-center text-[#483C46] p-2.5 text-2xl font-extrabold overflow-clip">{movieGenre?.map((genre)=>{return genre.name}).join(', ')}</h4> */}
        </div>
    );
}

export default MovieCard;
