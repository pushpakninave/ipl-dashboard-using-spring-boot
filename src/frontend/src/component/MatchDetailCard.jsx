
import './MatchDetailCard.scss';
import { Link } from 'react-router-dom';
export const MatchDetailCard = ({match,teamName}) => {
  if(!match) {
    return ( 
    <div> 
      <h2> No match found </h2> 
      </div> 
      );
  }else{
  const otherTeam = match.team1 === teamName ? match.team2 : match.team1;
  const otherTeamRoute = `/teams/${otherTeam}`;
  const isMatchWon = teamName === match.matchWinner;
  return (
    
    <div className={isMatchWon ? "MatchDetailCard won-card" : "MatchDetailCard lost-card" }>
      <div>
      <span className='vs'>Vs</span>
      <h1><Link to={otherTeamRoute}> {otherTeam} </Link></h1>
      <h2 className='match-date'>{match.date}</h2>
      <h3 className='match-venue'>venue: {match.venue}</h3>
      <h3 className='match-result'>{match.matchWinner} won by {match.resultMargin} {match.result}</h3>
      <p>Team-Name : {teamName} <br /> <br /> <span style={{color:"#15ff00",fontFamily:"Orbitron" }}> Winner : {match.matchWinner}</span> </p>
      </div>
      <div className='additional-detail'> 
      <h3>First Innings</h3>
      <p>{match.team1}</p>
      <h3>Second Innings</h3>
      <p>{match.team2}</p>
      <h3>City</h3>
      <p>{match.city}</p>
      <h3>Umpires</h3>
      <p>{match.umpire1}, {match.umpire2}</p>
      </div>

    </div>
  );}
}

