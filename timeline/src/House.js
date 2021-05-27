import React from 'react';
import Bottombar from './Bottombar';
import Smallhouse from './Smallhouse';
class House extends React.Component {
    constructor(props){
        super(props)
        this.setCharacterList=this.setCharacterList.bind(this)
        this.state={
            characterList:[]
        }
    }
    setCharacterList(characters){
        console.log(characters)
        this.setState({characterList: characters})
    }   
    render(){ 
        return(
            <div className="House"> 
                <Smallhouse characterList={
                    this.state.characterList
                }></Smallhouse>
                <Bottombar setCharacterList={
                    this.setCharacterList
                }></Bottombar>
            </div>
        )
    }
}
export default House