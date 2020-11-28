import React from "react";
import colors from "../styles/themes"

export default class Round extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            search: '',
        }
    }

    handleClick(event) {

    }

    handleClickMap=(value)=>{

    }

    render(){
        return(
            <div className='round' 
            style={{ 
                //backgroundColor: colors[this.props.theme].header,
                top: this.props.item.top,
                left: this.props.item.left,
                borderWight: 1,
                width: +this.props.hw*80,
                height: +this.props.hw*80,
                
                }}
                onClick={()=>this.props.onClick()}>
                <p>{this.props.name}</p>
            </div>
        )
    }
}