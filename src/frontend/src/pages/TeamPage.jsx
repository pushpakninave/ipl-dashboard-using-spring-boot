import { useState } from "react";
import { useEffect } from "react";
import { MatchSmallCard } from "../component/MatchSmallCard";
import { MatchDetailCard } from "../component/MatchDetailCard";
import { useParams, Link } from "react-router-dom";
import { PieChart } from 'react-minimal-pie-chart';
// import LineChart from 'react-linechart';

import './TeamPage.scss';


export const TeamPage = () => {

    const [team, setTeam] = useState({ matches: [] });
    // const teamName  = "Royal Challengers Bangalore";
    const { teamName } = useParams();
    useEffect(
        () => {
            const fetchMatches = async () => {
                const response = await fetch(`http://localhost:8080/team/${teamName}`);
                const data = await response.json();
                console.log(data);
                setTeam(data);
            };
            fetchMatches();
        }, [teamName]
    );

    if (!team || !team.teamName) return <h1>Team not found</h1>
    return (
        <div className="TeamPage">
            <div className="bluebar-header">Versus</div>
            <div className="below-teampage">
            <div className="team-name-section"> 
            <h1 className="team-name">{team.teamName}</h1> 
            </div>

            <div className="win-loss-section">
                Wins / Losses
                <PieChart
                data={[
                    { title: 'Wins', value: team.totalWins, color: '#05fd26'},
                    { title: 'Loss', value: team.totalMatches-team.totalWins, color: 'rgba(255, 30, 6, 0.87)'},
                ]}
                />
            </div>

            <div className="match-detail-section">
                <h3>Latest matches</h3>
                <MatchDetailCard teamName={team.teamName} match={team.matches[0]} /> 
                </div>

            {team.matches?.slice(1).map(match => <MatchSmallCard key={match.id} teamName ={team.teamName} match={match} />)}
            <div className="more-link">
                <Link to={`/teams/${teamName}/matches/${2020}`}>More </Link>
            </div>
        </div>
        </div>
    );
}

