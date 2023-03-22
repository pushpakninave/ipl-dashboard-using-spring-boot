import { useEffect } from "react";
import { useState } from "react"
import { useParams } from "react-router-dom";
import { MatchDetailCard } from "../component/MatchDetailCard";
import { YearSelector } from "../component/YearSelector";
import './MatchPage.scss';

export const MatchPage = () => {

    const [matches, setMatches] = useState([]);
    const {teamName , year} = useParams();

    useEffect(
        () => {
            const fetchmatches = async () =>{
                const response = await fetch(`http://localhost:8080/team/${teamName}/matches?year=${year}`);
                const data = await response.json();
                console.log(data);
                setMatches(data);
            };
            fetchmatches();
        },[teamName, year]
    );
    return (
        <div className="MatchPage">
            <div className="bluebar-header">Year Selector</div>
            <div className="below-match-page">
            <div className="year-selector">
                <h3>select year</h3>
                <YearSelector teamName={teamName}/>
            </div>
            <div>
            <h1 className="page-heading">{teamName} matches in {year}</h1>
            {
                matches.map(match =>  <MatchDetailCard key={match.id} teamName={teamName} match={match} />)
            }
            </div>
        </div>
        </div>
    );
}