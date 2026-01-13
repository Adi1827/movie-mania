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
            const response =await fetch("https://api.themoviedb.org/3/movie/"+id+"?api_key=44867af4999a85b16e0ca84faa75a376");
            const json = await response.json();
            setmovieDetails(json);
        }
        catch(err){
            console.log(err);
        }
    }
    
    return(
        <>
       <div className="flex shadow-xl shadow-[#dfd0b8]">
        <div className="text-center w-[550px] h-[550px]">
          <img src={`https://image.tmdb.org/t/p/w500/${movieDetails?.poster_path}`} alt="" className="w-[350px] h-[500px] m-[10%] rounded-xl"/>
        </div>
        <div className="m-[100px] w-full h-full">
          <h1 className="font-bold text-[300%] text-[#483c46] [text-shadow:2px_1px_#f5f5f5]">{movieDetails?.title}</h1>
          <h3 className="text-[200%] font-bold text-[#dfd0b8] pt-5 [text-shadow:2px_1px_#000]">{movieDetails?.release_date?.split('-')[0]}</h3>
          <p className="text-sm text-[#dfd0b8] pt-[30px] font-bold [text-shadow:2px_1px_#000]">{movieDetails?.overview}</p>
        </div>
      </div>

      <h2 className="text-3xl font-bold text-[#483c46] text-center mt-10 [text-shadow:2px_1px_#f5f5f5]">You might also like</h2>
      <div className="flex flex-wrap justify-around mt-5">
        {moreLikeData?.map((element) => {
          return (
            <Link to={'/Movies/' + element.id} key={element.id}>
              <MovieCard {...element}></MovieCard>
            </Link>
          );
        })}
      </div>
    </>
    )
}

export default MovieInfo;