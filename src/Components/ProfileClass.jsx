import React from 'react'

class Profile extends React.Component {
    constructor(props) {
        super(props);
        // Creating Variable
        this.state = {
            count: 1
        }
    }

    render() {
        return (
            <>
                <div className="">
                    <p>Div <i>{this.state.count}</i></p>
                    <button onClick={() => this.setState({
                        count: ++this.state.count
                    })}>SetCount</button>
                </div>
                <div>

                </div>
            </>
        )
    }

}

export default Profile;