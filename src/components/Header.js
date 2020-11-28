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

    handleKeyPress(event) {
        if (event.key == 'Enter') {
            console.log('enter press here! ')
        }
    }
    changeSearch=(value)=>{
        //тут прокидываем наверх найденные варианты, чтобы предлагались новые экземпляры
        this.setState({search: value})
    }

    render(){
        return(
            <div className='headerContainer' style={{ backgroundColor: colors[this.props.theme].header}}>
                <div className='inputContainer'>
                    <input className='headerSearchInput' 
                        style={{ 
                            background: colors[this.props.theme].backgroundColor,
                            fontColor: colors[this.props.theme].maneStroke,
                            }}
                        onKeyPress={this.handleKeyPress}  
                        onChange={(e)=>this.changeSearch(e.target.value)}   
                        value={this.state.search}
                        placeholder={this.state.placeholder}
                         />
                </div>
            </div>
        )
    }
}