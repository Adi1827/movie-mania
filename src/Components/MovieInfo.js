import { useParams,Link } from "react-router-dom"
import { useEffect,useState } from "react";
import MovieCard from './Moviecard';

const MovieInfo = () =>{
    const { id } = useParams();
    const [movieDetails,setmovieDetails] = useState();
    const [moreLikeData,setMoreLikeData] = useState([]);
    window.scroll({top:0,left:100,behavior:"instant"});
    useEffect(()=>{
        moreLikeThis();
        fetchId();
    },[id]);

    useEffect(()=>{
        document.title=movieDetails?.title || 'Movie';
    },[movieDetails]);

    async function moreLikeThis() {
        try{
        const response = await fetch(`https://api.themoviedb.org/3/movie/${id}/recommendations?language=en-US&page=1&api_key=44867af4999a85b16e0ca84faa75a376`)
        const json = await response.json();
        setMoreLikeData(json.results);
    }
    catch(err){
        console.error("There was error fetching data\n",err); 
    }
    }

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

        <h2 className="movie-suggestion">You might also like</h2>
        <div className="movieCard-suggestion">
                {
                    moreLikeData?.map((element)=>{
                        let count = 0;
                        if(count<=5){
                            count++;
                        return (<Link to={'/Movies/'+element.id} key = {element.id}><MovieCard {...element} ></MovieCard></Link>);
                    }
                })
                }
        </div>

        </>
    )
}

export default MovieInfo;