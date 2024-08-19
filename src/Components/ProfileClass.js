import React from 'react'

class Profile extends React.Component{
    constructor(props){
        super(props);
        this.state = {
            count : 1
        }
    }
    
    render(){
        return(
            <>
            <div className="">
                <p>Div <i>{this.state.count}</i></p>
                <button></button>
            </div>
            </>
        )
    }

}

export default Profile;