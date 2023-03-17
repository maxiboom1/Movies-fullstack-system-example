import dal from "../4-utils/dal";
import { OkPacket } from "mysql";
import TheaterModel from "../2-models/theater-model";
import MovieModel from "../2-models/movie-model";
import { ResourceNotFoundError } from "../2-models/client-errors";


// GET http://localhost:4000/api/theaters 
async function getAllTheaters():Promise<TheaterModel[]> {
    
    const sql = `SELECT * FROM theaters`;
    
    const theaters = await dal.execute(sql);
    
    return theaters;
}


// GET http://localhost:4000/api/movies-per-theaters/3

async function getMoviesByTheaters(theaterId:number):Promise<MovieModel[]> {
    
    const sql = `SELECT * FROM movies WHERE theaterId = ?`;

    const moviesByTheaters = await dal.execute(sql,[theaterId]);

    return moviesByTheaters;
}

// POST http://localhost:4000/api/movies

async function addMovie(movie: MovieModel):Promise<MovieModel>{

    const sql = `INSERT INTO movies VALUES(DEFAULT, ?, ?, ?, ?)`;

    const result:OkPacket = await dal.execute(sql, [movie.theaterId, movie.name, movie.dateAndTime, movie.duration]);

    movie.movieId = result.insertId; // Update our movie with DB assigned id 

    return movie;
}

// DELETE http://localhost:4000/api/movies/3

async function deleteMovie(movieId:number):Promise<void>{

    const sql = `DELETE FROM movies WHERE movieId = ?`;

    const result:OkPacket = await dal.execute(sql, [movieId]);

    if(result.affectedRows === 0){
        throw new ResourceNotFoundError(movieId);
    }

}



export default {
    getAllTheaters,
    getMoviesByTheaters,
    addMovie,
    deleteMovie
};

