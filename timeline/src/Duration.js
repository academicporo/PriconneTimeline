import React from 'react';
class Duration extends React.Component {
    secondsToTimestamp(input){
        if(input>=60){
            var seconds=input-60
            if(seconds<10){
                return '1:0'+seconds.toString()
            }
            return '1:'+seconds.toString()
        }
        else {
            if(input<10){
                return '0:0'+input.toString()
            }
            return '0:'+input.toString()
        }
    }
    render(){ 
        return(
            <div className="Duration" style={{width: (this.props.info['duration']/90*100).toString()+'%',
                                            left: (100-this.props.info['start']/90*100).toString()+'%'}}>
                                                <p>{this.secondsToTimestamp(this.props.info['start'])}</p>
                                                <p>{this.props.name}</p>
                                                <p>{this.secondsToTimestamp(this.props.info['start']-this.props.info['duration'])}</p>
                                            </div>
        );
    }
}
export default Duration