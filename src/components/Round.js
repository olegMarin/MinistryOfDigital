import React from "react";
import cn from 'classnames'

export default class Round extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            search: '',
        }
    }

    handleClick(event) {

    }

    handleClickMap = (value) => {

    }

    render() {
        return (
            <div className={cn('round', {
                'round-disappearing': this.props.hw === 4
            })}
                style={{
                    //backgroundColor: colors[this.props.theme].header,
                    top: this.props.item.top,
                    left: this.props.item.left,
                    borderWight: 1,
                    width: +this.props.hw * 80,
                    height: +this.props.hw * 80,
                    display: 'flex',
                    justifyContent: 'center',
                    alignItems: 'center',
                    overflow: 'hidden',
                }}
                onClick={() => this.props.onClick()}>
                <p>{this.props.item.name}</p>
            </div>
        )
    }
}