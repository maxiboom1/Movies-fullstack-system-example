import { ChangeEvent, useEffect, useState } from "react";
import MovieModel from "../../../Models/MovieModel";
import TheaterModel from "../../../Models/TheaterModel";
import dataService from "../../../Services/DataService";
import notifyService from "../../../Services/NotifyService";
import "./List.css";

// MUI elements
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import { TableHead } from "@mui/material";


function List(): JSX.Element {
    
    const [theaters,setTheaters] = useState<TheaterModel[]>([]);
    const [movies,setMovies] = useState<MovieModel[]>([]);
    const [currentTheater,setCurrentTheater] = useState<string>(''); // This state used to store current theater name
    
    useEffect(() => {
        
        dataService.getAllTheaters()
        .then(
            (response)=>{setTheaters(response)}
        )
        .catch((err) => notifyService.error(err));
    
    }, []);
    
    async function showMoviesByTheater(args:ChangeEvent<HTMLSelectElement>){
        const theaterId = +args.target.value;
        const theaterName = args.target.options[theaterId].text;
        const movies: MovieModel[] = await dataService.getMoviesByTheater(theaterId);
        setCurrentTheater(theaterName);
        setMovies(movies);
    }

    return (
        <div className="List">
			<h2>Movies list</h2>
            <label>Please select theater:</label>
            <select defaultValue="" onChange={showMoviesByTheater}>
                <option value="" disabled>Please select theater</option>
                {theaters.map(theater => <option key={theater.theaterId} value={theater.theaterId}>{theater.theaterName}</option>)}
            </select>

            <hr />

            <h3>Available Movies in {currentTheater} theatre:</h3>

            <TableContainer component={Paper} className="movies_table">
                <Table sx={{ minWidth: 100 }} size="medium">
                    
                    <TableHead>
                        <TableRow>
                            <TableCell>Name: </TableCell>
                            <TableCell >Duration:</TableCell>
                            <TableCell >Screen time: </TableCell>
                        </TableRow>
                    </TableHead>
                    
                    <TableBody>
                        {movies?.map((movie) => (
                        <TableRow hover key={movie.movieId}>
                            <TableCell component="th" scope="row" >{movie.name} </TableCell>
                            <TableCell component="th" scope="row" >{movie.duration} </TableCell>
                            <TableCell component="th" scope="row" >{movie.dateAndTime} </TableCell>
                        </TableRow>
                        ))}

                    </TableBody>
                </Table>
            </TableContainer>
        </div>


    );
}

export default List;