import React from 'react';
import Skills from './skills';
import Timeline from './timeline';
class Smallhouse extends React.Component {
    render(){ 
        return(
            <div className="Smallhouse"> 
            <Skills></Skills>
            <Timeline characterList={
                this.props.characterList
            }></Timeline>
            </div>
        );
    }
}
export default Smallhouse