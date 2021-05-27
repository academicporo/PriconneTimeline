import React from 'react';
import Skillbar from './Skillbar'
class Characterbar extends React.Component {
    constructSkillbars(){
        var element=this.props.character
        var timing1=element['skill1']['timings'].length
        var timing2=element['skill2']['timings'].length
        var timing3=element['skill3']['timings'].length
        var skillbar=[]
        if(timing1>0){
            skillbar.push(<Skillbar skill={element['skill1']} key={element['skill1']['name']}></Skillbar>)
        }
        if(timing2>0){
            skillbar.push(<Skillbar skill={element['skill2']} key={element['skill2']['name']}></Skillbar>)
        }
        if(timing3>0){
            skillbar.push(<Skillbar skill={element['skill3']} key={element['skill3']['name']}></Skillbar>)
        }
        return skillbar
    }
    render(){ 
        let list=this.constructSkillbars()
        return(
            <div className="Characterbar">{list}</div>
        );
    }
}
export default Characterbar