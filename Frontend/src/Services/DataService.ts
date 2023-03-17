import axios from "axios";
import MovieModel from "../Models/MovieModel";
import TheaterModel from "../Models/TheaterModel";
import appConfig from "../Utils/AppConfig";

class DataService {
    
    public async getAllTheaters():Promise<TheaterModel[]>{
        
        const response = await axios.get<TheaterModel[]>(appConfig.getAllTheatersURL);

        const theaters = response.data;

        return theaters;

    }

    public async getMoviesByTheater(theaterId: number):Promise<MovieModel[]>{
        
        const response = await axios.get<MovieModel[]>(appConfig.getMoviesByTheaterURL + theaterId);
        
        const movies = response.data;

        return movies;

    }

    public async addMovie(movie: MovieModel):Promise<void>{
        
        const response = await axios.post<MovieModel>(appConfig.moviesURL , movie);
        
        const addedMovie = response.data;

        console.log(addedMovie); // just for test

    }

    public async deleteMovie(movieId: number):Promise<void>{
        
       await axios.delete<number>(appConfig.moviesURL + movieId);
          
    }

}

const dataService = new DataService();

export default dataService;
