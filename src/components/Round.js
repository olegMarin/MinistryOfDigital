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
        return (
            <div 
            className={cn('round', {'round-disappearing': this.props.hw === 4})}
                                                                                
                style={{
                    backgroundColor: (this.props.hw == 4 || this.props.hw == 0) ? '#0000' : ((this.props.hw === 3) ? '#8883' : '#8882'),
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
                }}
                onClick={() => this.props.onClick()}>
                <p
                    style={{
                        color: (this.props.hw == 4 || this.props.hw == 0) ? '#0000' : theme[this.props.theme].text,
                    }}
                >{this.props.item.name}</p>
            </div>
        )
    }
}