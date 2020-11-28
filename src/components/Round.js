import React from "react";
import colors from "../styles/themes"

export default class Header extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            search: '',
            placeholder: 'введите любую сущность'
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
                width: 50,
                height: 50,
                }}>
                <p>{this.props.name}</p>
            </div>
        )
    }
}