import React from 'react';
import MapleTree from './MapleTree.png'
class Leftbar extends React.Component {
    getAllFullArt(){
        var art=[]
        var characters=this.props.characterList
        for (let index = 0; index < characters.length; index++) {
            const element = characters[index];
            var URL='https://priconneimageapi.herokuapp.com/'+element['name']    
            art.push(<img src={URL} alt='full art' key={URL}></img>)
        }
        return art
    }
    render(){ 
        var art=this.getAllFullArt()
        return(
            <div className="Leftbar">
                <div className="Logobar"><img src={MapleTree} alt='Maple Tree'></img>
                <p>Made by Poro and Itsa</p>
                </div>
                {art} 
            </div>
        );
    }
}
export default Leftbar