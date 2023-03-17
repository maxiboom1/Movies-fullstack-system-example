class MovieModel{
    public movieId: number;
    public theaterId: number;
    public name: string;
    public dateAndTime: string;
    public duration: number;

    public constructor(movie: MovieModel){
        this.movieId = movie.movieId;
        this.theaterId = movie.theaterId;
        this.name = movie.name;
        this.dateAndTime = movie.dateAndTime;
        this.duration = movie.duration;
    }
}

export default MovieModel;