import './TopTwoTeams.scss';
export const TopTwoTeams = ({teamData,year})=>{
    for(let i=0;i<teamData.length;i++){
        if(teamData[i].year == year){
            let tempMatch = teamData[i];
        return (
            <div className="TopTwoTeams">
                {
                    <div className="finalistBox">
                    <div className="finalistInfoBox">
                        <h2> <span  style={{color : "#fff200"}}>Finalists in {year}:</span> 
                        <br /> 
                        {tempMatch.team1} Vs {tempMatch.team2}</h2><br />
                        <p><span style={{color:"#15ff00",fontFamily:"Orbitron" }}>Winner : {tempMatch.winner}</span></p>
                        <br />
                        <h3>Venue : {tempMatch.venue}</h3><br/>
                        <h4>{tempMatch.team1} captain :  {tempMatch.team1Captain}</h4>
                        <h4>{tempMatch.team2} captain :  {tempMatch.team2Captain}</h4>
                    </div>
                    {/* <div className="finalistTrophyImg">
                        <img src="./assests/" alt="" />
                    </div> */}
                    </div>
                }
            </div>
            )
        }
    }
}