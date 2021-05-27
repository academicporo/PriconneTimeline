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
                                        name={skill['name']}></Duration>)
        }
        return durations
    }
    render(){ 
        let list=this.constructDurations()
        return(
            <div className="Skillbar">{list}</div>
        );
    }
}
export default Skillbar