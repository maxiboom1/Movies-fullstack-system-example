import "./Home.css";
import img from "../../../Assets/images/theater.jpg";

function Home(): JSX.Element {
    
    return (
        
        <div className="Home">
			
            <img src={img} alt="Here we should see theater img" />
            
        </div>
    );

}

export default Home;
