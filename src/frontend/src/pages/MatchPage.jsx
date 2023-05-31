import { useEffect } from "react";
import { useState } from "react"
import { useParams } from "react-router-dom";
import { MatchDetailCard } from "../component/MatchDetailCard";
import { YearSelector } from "../component/YearSelector";
import './MatchPage.scss';
import PacmanLoader
    from "react-spinners/PacmanLoader";
import { TopTwoTeams } from "./TopTwoTeams";
import { NavBar } from "../component/Navbar";


export const MatchPage = () => {

    const [matches, setMatches] = useState([]);
    const {teamName , year} = useParams();
    const [loading, setLoading] = useState(false);
    useEffect(
        () => {
            setLoading(true)
            setTimeout(() => {
                setLoading(false)
            }, 1000);
            const fetchmatches = async () =>{
                const response = await fetch(`http://localhost:8080/team/${teamName}/matches?year=${year}`);
                const data = await response.json();
                console.log(data);
                setMatches(data);
            };
            fetchmatches();
        },[teamName, year]
    );
    const teamData = [
        {
            year: 2008,
            team1: "Rajasthan Royals",
            team2: " Chennai Super Kings",
            winner: "Rajasthan Royals",
            venue: "DY Patil Stadium , mumbai",
            team1Captain: "Shane Warne",
            team2Captain: "Mahendra Singh Dhoni"
        },
        {
            year: 2009,
            team1: "Deccan Charger",
            team2: "Royal Challengers Bangalore",
            winner: "Deccan Chargers",
            venue: "Wanderers Stadium, Johannesburg",
            team1Captain: "Adam Gilchrist",
            team2Captain: "Anil Kumble"
        },
        {
            year: 2010,
            team1: "Chennai Super Kings",
            team2: "Mumbai Indians",
            winner: "Chennai Super Kings",
            venue: "DY Patil Stadium, Mumbai",
            team1Captain: "Mahendra Singh Dhoni",
            team2Captain: "Sachin Tendulkar"
        },
        {
            year: 2011,
            team1: " Chennai Super Kings",
            team2: "Royal Challengers Bangalore",
            winner: " Chennai Super Kings",
            venue: " M. A. Chidambaram Stadium,Chennai",
            team1Captain: "Mahendra Singh Dhoni",
            team2Captain: "Daniel Vettori"
        },
        {
            year: 2012,
            team1: "Kolkata Knight Riders",
            team2: " Chennai Super Kings",
            winner: "Kolkata Knight Riders",
            venue: "M. A. Chidambaram Stadium,Chennai",
            team1Captain: "Gautam Gambhir",
            team2Captain: "Mahendra Singh Dhoni"
        },
        {
            year: 2013,
            team1: "Mumbai Indians",
            team2: " Chennai Super Kings",
            winner: "Rajasthan Royals",
            venue: "Eden Gardens,Kolkata",
            team1Captain: "Rohit Sharma",
            team2Captain: "Mahendra Singh Dhoni"
        },
        {
            year: 2014,
            team1: "Kolkata Knight Riders",
            team2: " Kings XI Punjab",
            winner: "Kolkata Knight Riders",
            venue: "	M. Chinnaswamy Stadium, Bangalore",
            team1Captain: "Gautam Gambhir",
            team2Captain: "George Bailey"
        },
        {
            year: 2015,
            team1: "Mumbai Indians",
            team2: " Chennai Super Kings",
            winner: "Mumbai Indians",
            venue: "Eden Gardens, Kolkata",
            team1Captain: "Rohit Sharma",
            team2Captain: "Mahendra Singh Dhoni"
        },
        {
            year: 2016,
            team1: "Sunrisers Hyderabad",
            team2: " Royal Challengers Bangalore",
            winner: "Sunrisers Hyderabad",
            venue: "M. Chinnaswamy Stadium, Bangalore",
            team1Captain: "David Warner",
            team2Captain: "Virat Kohli"
        },
        {
            year: 2017,
            team1: "Mumbai Indians",
            team2: "Rising Pune Supergiants",
            winner: "Mumbai Indians",
            venue: "Rajiv Gandhi International Cricket Stadium,Hyderabad",
            team1Captain: "Rohit Sharma",
            team2Captain: "Steve Smith"
        },
        {
            year: 2018,
            team1: "Chennai Super Kings",
            team2: "Sunrisers Hyderabad",
            winner: "Chennai Super Kings",
            venue: "Wankhede Stadium, Mumbai",
            team1Captain: "Mahendra Singh Dhoni",
            team2Captain: "Kane Williamson"
        },
        {
            year: 2019,
            team1: "Mumbai Indians",
            team2: " Chennai Super Kings",
            winner: "Mumbai Indians",
            venue: "Rajiv Gandhi International Cricket Stadium, Hyderabad",
            team1Captain: "Rohit Sharma",
            team2Captain: "Mahendra Singh Dhoni"
        },
        {
            year: 2020,
            team1: "Mumbai Indians",
            team2: "Delhi Capitals",
            winner: "Mumbai Indians",
            venue: "Dubai International Cricket Stadium,Dubai",
            team1Captain: "Rohit Sharma",
            team2Captain: "Shreyas Iyer"
        }
    ]
    return (
        loading ?
            <div className="packman">
                <PacmanLoader
                    size={80}
                    color={"rgba(255, 30, 6, 0.87)"}
                />
            </div>
        :
        <div className="MatchPage">
        <NavBar/>
            <div className="bluebar-header">Year Selector</div>
            <div className="below-match-page">
            <div className="year-selector">
                <h3>select year</h3>
                <YearSelector teamName={teamName}/>
            </div>
            <div>
            <h1 className="page-heading">{teamName} matches in {year}</h1>
            <TopTwoTeams teamData={teamData} year ={year}/>
            {
                matches.map(match =>  <MatchDetailCard key={match.id} teamName={teamName} match={match} />)
            }
            </div>
        </div>
        </div>
    );
}