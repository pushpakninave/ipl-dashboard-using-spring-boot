import { useEffect } from "react";
import { useState } from "react"
import { Link } from "react-router-dom";
import "./HomePage.scss";
export const HomePage = () => {

    const [teams,setTeams] = useState([]);

    useEffect(
        () => {
            const fetchAllMatches = async () =>{
                const response = await fetch(`http://localhost:8080/team`);
                const data = await response.json();
                console.log(data);
                setTeams(data);
            };
            fetchAllMatches();
        },[]
    );
    return (
        <div className="HomePage">
        <div className="homepage-heading">
        <h1>IPL-DASHBOARD </h1>
        </div>
        <div className="teams-grid">
            {
                teams.map(match => 
                    <Link className="team-div-individual" to ={`/teams/${match.teamName}`} >{match.teamName}</Link>   
                )
            }  
        </div>
        </div>
    );
}