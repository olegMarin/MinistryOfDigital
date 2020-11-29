import React from "react";
import colors from "../styles/themes"
import { AiOutlineSearch } from 'react-icons/ai'; 

export default class Header extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            search: '',
            placeholder: 'введите любую сущность'
        }
    }

    onSearch=()=>{
        this.props.onSearchAdd(this.state.search)
    }

    handleKeyPress=(event) =>{
        if (event.key == 'Enter') {
            this.onSearch()
        }

    }
    changeSearch=(value)=>{
    
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
                    <div 
                    className='button' 
                    style={{marginLeft: 16}}
                        onClick={() => { this.onSearch()}}
                    >
                        <AiOutlineSearch name="search1" size={24} color={colors[this.props.theme].whiteStroke} />
                    </div>
                </div>
            </div>
        )   
    }
}