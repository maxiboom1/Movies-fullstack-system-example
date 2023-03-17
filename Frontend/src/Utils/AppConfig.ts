class AppConfig {
    
    public getAllTheatersURL = "http://localhost:4000/api/theaters/";
    
    public getMoviesByTheaterURL = "http://localhost:4000/api/movies-per-theaters/"// + theaterId

    public moviesURL = "http://localhost:4000/api/movies/";

}   

const appConfig = new AppConfig();

export default appConfig;
