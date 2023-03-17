import express, { Request, Response, NextFunction } from "express";
import MovieModel from "../2-models/movie-model";
import dataService from "../5-services/data-service";

const router = express.Router();

router.get("/theaters", async (request: Request, response: Response, next: NextFunction) => {
    
    try {
        
        const theaters = await dataService.getAllTheaters();

        response.json(theaters);

    }

    catch(err: any) {

        next(err);

    }

});

router.get("/movies-per-theaters/:theaterId", async (request: Request, response: Response, next: NextFunction) => {
    
    try {

        const theaterId = +request.params.theaterId;

        const moviesByTheater = await dataService.getMoviesByTheaters(theaterId);

        response.json(moviesByTheater);
    }
    
    catch(err: any) {

        next(err);
    }

});


router.post("/movies", async (request: Request, response: Response, next: NextFunction) => {
    
    try{
        
        const movieToAdd = new MovieModel(request.body);

        const addedMovie = await dataService.addMovie(movieToAdd);

        response.status(201).json(addedMovie);

    }
    
    catch(err:any){
        next(err);
    }

});

router.delete("/movies/:movieId([0-9]+)", async (request: Request, response: Response, next: NextFunction) => {
    
    try{ 
        const movieId = +request.params.movieId;

        await dataService.deleteMovie(movieId);

        response.sendStatus(204);   
    }
    
    catch(err:any){
        next(err);
    }

});


export default router;
