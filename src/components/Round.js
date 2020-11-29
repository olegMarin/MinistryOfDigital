import React from "react";
import cn from 'classnames'
import theme from '../styles/themes'
export default class Round extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            past: 0,
        }
    }

    handleClick(event) {

    }

    handleClickMap = (value) => {

    }

    

    render() {
        let label = this.props.item.name.replace(/([а-я])([А-Я])/g, '$1 $2');
        return (
            <div 
            className={cn('round', {'round-disappearing': this.props.hw === 4})}
                                                                                
                style={{
                    backgroundColor: (this.props.hw == 4 || this.props.hw == 0) ? '#0000' : ((this.props.hw === 3) ? '#8886' : '#8882'),
                    top: this.props.item.top,
                    left: this.props.item.left,
                    borderWight: (this.props.hw == 4 || this.props.hw == 0) ? 0 :1,
                    boxShadow: (this.props.hw == 4 || this.props.hw == 0)?'none':'1px 2px 7px 0px black',
                    width: +this.props.hw * 80,
                    height: +this.props.hw * 80,
                    display: 'flex',
                    justifyContent: 'center',
                    alignItems: 'center',
                    overflow: 'hidden',
                    zIndex: this.props.hw,
                }}
                onClick={() => this.props.onClick()}>
                <p
                    style={{
                        textAlign: 'center',
                        color: (this.props.hw == 4 || this.props.hw == 0) ? '#0000' : theme[this.props.theme].text,
                    }}
                >{label}</p>
            </div>
        )
    }
}