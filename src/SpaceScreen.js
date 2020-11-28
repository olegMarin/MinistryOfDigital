import React from "react";
import colors from "./styles/themes"
import Round from "./components/Round"

export default class Space extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            hover: '',
            rounds:[]
        }
    }

    componentDidMount(){
        let rounds = []
        for (let i=0; i<91; i++){
            let r = {
                id: i,
                top: i + "%",
                left: (i%10)*10 + "%",
            }
            rounds=[...rounds, r]
        }
        this.setState({rounds: rounds})
    }

    render(){
        return(
            <div
                style={{
                    wight: "100vw",
                    height: '100vh',
                    zIndex: 1,
                    transition: '1s',
                    overflow: 'hidden'
                }}
            >
                {this.state.rounds.map((item, index)=>{
                    return(
                        <Round
                            theme={this.props.theme}
                            key={index}
                            item={item}
                        />
                    )
                })}

            </div>
        )
    }
}