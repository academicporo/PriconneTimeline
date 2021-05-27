import React from 'react';
import Topbar from './Topbar';
import Verticallines from './Verticallines';
import Bars from './Bars'
class Timeline extends React.Component {
    render(){ 
        return(
            <div className="Timeline">
                <Topbar></Topbar>
                <Verticallines></Verticallines>
                <Bars characterList={this.props.characterList}></Bars>
            </div>
        );
    }
}
export default Timeline