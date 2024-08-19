import { useParams } from "react-router-dom"
import { useEffect,useState } from "react";
import Shimmer from "./Shimmer";

const MovieInfo = () =>{
    const { id } = useParams();
    const [movieDetails,setmovieDetails] = useState();
    window.scroll({top:0,left:100,behavior:"instant"});
    useEffect(()=>{
        fetchId()
    },[])

    const fetchId = async() => {
        try{
            const response =await fetch("https://api.themoviedb.org/3/movie/"+id+"?api_key=44867af4999a85b16e0ca84faa75a376")
            const json = await response.json()
            setmovieDetails(json)
        }
        catch(err){
            console.log(err);
        }
    }
    // console.log(Object.keys(movieDetails).length);
    // return Object.keys(movieDetails).length<1 ? (
    //     <Shimmer/>
    // ):
    return(
        <>
        <div className="movieDetail-container">
            {/* <div className="backButton">
                <button>Go Back</button>
            </div> */}
            <div className="movieImage">
            <img src={"https://image.tmdb.org/t/p/w500/"+movieDetails?.poster_path} alt="" />
            </div>
            <div className="movieDetails">
                <h1 className="movie-details">{movieDetails?.title}</h1>
                <h3 className="movie-release-date">{movieDetails?.release_date?.split('-')[0]}</h3>
                <p className="movie-overview">{movieDetails?.overview}</p>
            </div>
        </div>
        </>
    )
}

export default MovieInfo;