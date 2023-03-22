import { useEffect } from "react";
import { useState } from "react"
import { Link } from "react-router-dom";
import "./HomePage.scss";
import PacmanLoader
    from "react-spinners/PacmanLoader";
export const HomePage = () => {

    const [teams, setTeams] = useState([]);
    const [loading, setLoading] = useState(false);
    useEffect(
        () => {
            setLoading(true)
            setTimeout(() => {
                setLoading(false)
            }, 4000);
            const fetchAllMatches = async () => {
                const response = await fetch(`http://localhost:8080/team`);
                const data = await response.json();
                console.log(data);
                setTeams(data);
            };
            fetchAllMatches();
        }, []
    );
    return (
        loading ?
            <div className="packman">
                <PacmanLoader
                    size={80}
                    color={"rgba(255, 30, 6, 0.87)"}
                />
            </div>
            :
            <div className="HomePage">
                <div className="homepage-heading">

                    <h1 className="heading-text">IPL-DASHBOARD </h1>
                </div>
                <div className="teams-grid">
                    {
                        teams.map(match =>
                            <Link className="team-div-individual" to={`/teams/${match.teamName}`} >{match.teamName}</Link>
                        )
                    }
                </div>
            </div>
    );
}