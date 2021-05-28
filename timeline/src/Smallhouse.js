import React from 'react';
import Leftbar from './Leftbar';
import Timeline from './timeline';
class Smallhouse extends React.Component {
    render(){ 
        return(
            <div className="Smallhouse"> 
            <Leftbar characterList={
                this.props.characterList
            }></Leftbar>
            <Timeline characterList={
                this.props.characterList
            }></Timeline>
            </div>
        );
    }
}
export default Smallhouse