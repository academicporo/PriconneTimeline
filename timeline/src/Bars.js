import React from 'react';
import Characterbar from './Characterbar'
class Bars extends React.Component {
    constructCharacterBars(){
        var characters=this.props.characterList;
        console.log (characters)
        var characterBars=[]
        for (let index = 0; index < characters.length; index++) {
            const element = characters[index];
            var timing1=element['skill1']['timings'].length
            var timing2=element['skill2']['timings'].length
            var timing3=element['skill3']['timings'].length
            if(timing1>0 || timing2>0 || timing3>0){
                characterBars.push(<Characterbar character={element} key={element['name']}></Characterbar>)
            }
        }
        return characterBars
    }
    render(){
        let list=this.constructCharacterBars()
        return(
            <div className="Bars"> 
            {list}
            </div>
        );
    }
}
export default Bars