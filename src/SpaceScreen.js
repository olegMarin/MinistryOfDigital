import React from "react";
import colors from "./styles/themes"
import Round from "./components/Round"

let gr={
    1: {
        "45": 4,
        "33": 4,
        "84": 4,
        "68": 3,
        "42": 2,
        "25": 2,
    },
    2: {
        "45": 5,
        "33": 5,
        "84": 5,
        "68": 4,
        "42": 3,
        "25": 4,
    }
}

export default class Space extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            hover: '',
            rounds:[],
            step: 0,
            graph:{
                "45": 3,
                "33": 2,
                "84":2,
                "68":2,
                "42":1,
                "25":1,
            }
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
                    width: '100vw',
                    height: '100vh',
                    zIndex: 1,
                    transition: '1s',
                    overflow: 'hidden',
                    position: 'absolute'
                }}
            >
                {this.state.rounds.map((item, index)=>{
                    return(
                        <Round
                            theme={this.props.theme}
                            key={index}
                            item={item}
                            hw={(!!this.state.graph[index]) ? this.state.graph[index]:0}
                            onClick={() => { 
                                this.setState({step: this.state.step++, graph: gr[this.state.step]})

                                }}
                        />
                    )
                })}

            </div>
        )
    }
}