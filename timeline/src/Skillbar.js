import React from 'react';
import Duration from './Duration'
class Skillbar extends React.Component {
    constructDurations(){
        var skill=this.props.skill
        var skillTimings=skill['timings']
        var durations=[]
        for (let index = 0; index < skillTimings.length; index++) {
            const element = skillTimings[index];
            durations.push(<Duration info={element} 
                                        key={element['start']+element['duration'].toString()}
                                        name={skill['name']} characterName={this.props.characterName} type={this.props.type}></Duration>)
        }
        return durations
    }
    getCharacterIcon(){
        var baseurl='https://priconneimageapi.herokuapp.com/'+this.props.characterName+'/'+'icon'
        return baseurl
    }
    render(){ 
        let list=this.constructDurations()
        console.log(this.getCharacterIcon())
        return(
            <div className="Skillbar">
                <img src={this.getCharacterIcon()} alt='Character Icon'></img>
                {list}
            </div>
        );
    }
}
export default Skillbar