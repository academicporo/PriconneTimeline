import React from 'react';
import Form from 'react-bootstrap/Form';
class Bottombar extends React.Component {
    constructor(props){
        super(props)
        this.state={file:''}
        this.handlefile=this.handlefile.bind(this)
        this.savefile=this.savefile.bind(this)
        this.processfile=this.processfile.bind(this)
        this.scanLine=this.scanLine.bind(this)
        this.convertSeconds=this.convertSeconds.bind(this)
    }
    savefile(input){
        this.processfile(input.target.result)
        this.setState({file: input.target.result})
    }
    processfile(input){
        var lines=input.split('\n')
        var characters=[]
        for (let index = 3; index <= 15; index+=3) {
            const line1 = lines[index-2].split(',');
            const line2 = lines[index-1].split(',');
            const line3 = lines[index].split(',');

            var character={
                name: line1[0],
                skill1: this.scanLine(line1),
                skill2: this.scanLine(line2),
                skill3: this.scanLine(line3)
            }
            characters.push(character)
        }
        this.props.setCharacterList(characters)
    }
    handlefile(input){
        for (const file of input) {
            var fr=new FileReader();
            fr.onload= this.savefile            
              
            fr.readAsText(file); 
        }
    }
    render(){ 
        return(
            <div className="Bottombar"> 
            <Form style={{width: '30%'}}>
                <Form.File onChange={(e) => {this.handlefile(e.target.files)}}
                    id="custom-file"
                    label="Custom file input"
                    custom
                />
            </Form>
            </div>
        );
    }
    scanLine(line){
        var skillTimings=[]
        var startDuration=''
        var startIndex=-1
        var pattern=/[0-9]:[0-9][0-9]/
        for (let index = 0; index < line.length; index++) {
            const element = line[index];
            var time=element.match(pattern)
            if (time!=null){
                var duration=time[0]
                if (startDuration===''){
                    startDuration=duration
                    startIndex=index
                }
                else{
                    if(index===(startIndex+1)){
                        var skillTiming={
                            start:this.convertSeconds(startDuration),
                            duration:this.convertSeconds(startDuration)-this.convertSeconds(duration)
                        }
                        skillTimings.push(skillTiming)
                        startDuration=''
                        startIndex=-1
                    }
                    else{
                        startDuration=''
                        startIndex=-1
                    }
                }
            }         
        }
        var skill={
            name: line[1],
            timings: skillTimings
        }
        return skill

    }
    convertSeconds(timestamp){
        var digitOne=parseInt(timestamp.charAt(0))
        var digitTwo=parseInt(timestamp.charAt(2))
        var digitThree=parseInt(timestamp.charAt(3))
        return digitOne*60+digitTwo*10+digitThree
    }
}
export default Bottombar