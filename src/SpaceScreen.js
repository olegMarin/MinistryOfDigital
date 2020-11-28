import React from "react";
import Round from "./components/Round"

const nodes = ['ФизЛицо', 'Государство', 'ЦифровойРесурс', 'ЮрЛицо', 'Организация', 'МедОрганизация', 'МедРаботник', 'Дом']
    .reduce((o, v) => ({ ...o, [v]: { name: v, parents: {}, children: {} } }), {})
const connect = (parent, child, type) => {
    parent.children[child.name] = { type, node: child }
    child.parents[parent.name] = { type, node: parent }
}
connect(nodes.ФизЛицо, nodes.Государство, 'может жить в')
connect(nodes.ФизЛицо, nodes.ЦифровойРесурс, 'может иметь')
connect(nodes.ЮрЛицо, nodes.ЦифровойРесурс, 'может иметь')
connect(nodes.ФизЛицо, nodes.ЮрЛицо, 'может зарегистрировать')
connect(nodes.ФизЛицо, nodes.Организация, 'может посетить')
connect(nodes.ФизЛицо, nodes.МедОрганизация, 'может обратиться в')
connect(nodes.МедОрганизация, nodes.МедРаботник, 'имеет')
connect(nodes.ЮрЛицо, nodes.Государство, 'регистрируется в')
connect(nodes.ЮрЛицо, nodes.Дом, 'может владеть')
connect(nodes.ФизЛицо, nodes.Дом, 'может владеть')

export default class Space extends React.Component {
    constructor(props) {
        super(props)
        const currentNode = nodes.ФизЛицо
        this.state = {
            history: [currentNode],
            currentNode,
            hover: '',
            rounds: [],
        }
    }

    componentDidMount() {
        let rounds = []
        const nodeValues = Object.values(nodes)
        for (let i = 0; i < nodeValues.length; i++) {
            let r = {
                id: i,
                top: i * 10 + "%",
                left: (i % 10) * 10 + "%",
                node: nodeValues[i],
                name: nodeValues[i].name
            }
            rounds = [...rounds, r]
        }
        this.setState({ rounds: rounds })
    }

    getHw = (item) => {
        if (this.state.currentNode === item.node) {
            return 3
        }
        if (Object.values(this.state.currentNode.children).map(({ node }) => node).includes(item.node)) {
            return 2
        }
        if (Object.values(this.state.currentNode.parents).map(({ node }) => node).includes(item.node)) {
            return 4
        }
        return 0
    }

    onNodeClick = (node) => {
        if (this.state.currentNode !== node) {
            this.setState({
                currentNode: node,
                history: [...this.state.history, node]
            })
        } else {
            if (this.state.history.length >= 2) {
                this.setState(({ history }) => ({
                    currentNode: history[history.length - 2],
                    history: history.slice(0, history.length - 1)
                }))
            }
        }
    }

    render() {
        return (
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
                {this.state.rounds.map((item, index) => {
                    return (
                        <Round
                            theme={this.props.theme}
                            key={index}
                            item={item}
                            hw={this.getHw(item)}
                            onClick={() => this.onNodeClick(item.node)}
                        />
                    )
                })}
                <div style={{ position: 'absolute', right: 0, top: 200, display: 'flex', flexDirection: 'column' }}>
                    {this.state.history.slice(0, this.state.history.length - 1).map((node) => (
                        <a href="#" onClick={(e) => { e.preventDefault(); this.onNodeClick(node) }}>{node.name}</a>
                    ))}
                </div>
            </div>
        )
    }
}