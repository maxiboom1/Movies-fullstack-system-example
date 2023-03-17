import { useEffect, useState } from "react";
import MovieModel from "../../../Models/MovieModel";
import TheaterModel from "../../../Models/TheaterModel";
import dataService from "../../../Services/DataService";
import notifyService from "../../../Services/NotifyService";
import "./List.css";

function List(): JSX.Element {
    
    const [theaters,setTheaters] = useState<TheaterModel[]>([]);
    
    useEffect(() => {
        
        dataService.getAllTheaters()
        .then(
            (response)=>{setTheaters(response)}
        )
        .catch((err) => notifyService.error(err));
    
    }, []);
    
    return (
        <div className="List">
			<h2>Movies list</h2>
            <label>Please select theater:</label>
            <select defaultValue="">
                <option value="" disabled>Please select theater</option>
                {theaters.map(theater => <option key={theater.theaterId} value={theater.theaterId}>{theater.theaterName}</option>)}
            </select>
        </div>
    );
}

export default List;

// {audience.map(a => <option key={a.audienceId} value={a.audienceId}>{a.audienceName}</option>)}