import React from "react";
import Round from "./components/Round"

const nodes = [
    'ФизЛицо', 
    'Государство', 
    'ЦифровойРесурс', 
    'ЮрЛицо', 
    'Организация', 
    'МедОрганизация', 
    'МедРаботник', 
    'Дом', 
    'ЗемельныйУчасток', 
    'ГосОбразование', 
    'Заболевание', 
    'НасПункт',
    'Объект', 
    'ИндивидуальныйПредприниматель',
    'СтраховаяМедОрганизация', 
    'ОрганизацияКультуры', 
    'ФинОрганизация',
    'СубъектМалогоСреднегоПредпринимательства', 
    'ЖилойДом', 
    'ОбъектКапСтроительства',
    'ОбъектСтроительства', 
    'ФинИнструмент', 
    'КартаВызоваСкоройМедПомощи',
    'МедУслуга', 
    'Услуга', 
    'Документ', 
    'Договор', 
    'КредитныйДоговор', 
    'Кредит', 
    'Проект',
    'Цель', 
    'ФедеральныйПроект', 
    'УчастникФедПроекта', 
    'НациональныйПроект',
    'Финансирование',
    'Задача', 
    'ДолжностноеЛицо', 
    'Показатель', 
    'МуниципальноеОбразование', 
    'Результат']
    .reduce((o, v) => ({ ...o, [v]: { name: v, parents: {}, children: {} } }), {})

const coords=[
    { top: "42%", left: "37%" },
    { top: "47%", left: "22%" },
    { top: "17%", left: "26%" },
    { top: "12%", left: "44%" },
    { top: "35%", left: "59%" },
    { top: "64%", left: "65%" },
    { top: "75%", left: "84%" },
    { top: "73%", left: "27%" },
    { top: "70%", left: "52%" },
    { top: "75%", left: "37%" },
    { top: "41%", left: "72%" },
    { top: "25%", left: "27%" },
    { top: "35%", left: "37%" },
    { top: "46%", left: "77%" },
    { top: "70%", left: "13%" },
    { top: "19%", left: "13%" },
    { top: "35%", left: "87%" },
    { top: "45%", left: "37%" },
    { top: "75%", left: "37%" },
    { top: "75%", left: "37%" },
    { top: "75%", left: "37%" },
    { top: "74%", left: "40%" },
    { top: "35%", left: "67%" },
    { top: "42%", left: "82%" },

    { top: "75%", left: "37%" },
    { top: "75%", left: "37%" },
    { top: "75%", left: "37%" },
    { top: "75%", left: "37%" },
    { top: "75%", left: "37%" },
    { top: "75%", left: "37%" },
    { top: "75%", left: "37%" },
    { top: "75%", left: "37%" },
    { top: "75%", left: "37%" },
    { top: "75%", left: "37%" },
    { top: "75%", left: "37%" },
    { top: "75%", left: "37%" },
    { top: "75%", left: "37%" },
    { top: "75%", left: "37%" },
    { top: "75%", left: "37%" },
    { top: "75%", left: "37%" },
]

// Connect parent to children with relation
const connect = (parent, child, type) => {
    parent.children[child.name] = { type, node: child }
    child.parents[parent.name] = { type, node: parent }
}

// Connect as subtypes
const connectSubtype = (superclass, subclass) => {
    superclass.subclasses[subclass.name] = subclass
    subclass.superclasses[superclass.name] = superclass
}

connect(nodes.ФизЛицо, nodes.Государство, 'может жить в')
connect(nodes.ФизЛицо, nodes.ЦифровойРесурс, 'может иметь')
connect(nodes.ФизЛицо, nodes.ЮрЛицо, 'может зарегистрировать')
connect(nodes.ФизЛицо, nodes.ЮрЛицо, 'может работать')
connect(nodes.ФизЛицо, nodes.Организация, 'может посетить')
connect(nodes.ФизЛицо, nodes.МедОрганизация, 'может обратиться в')
connect(nodes.ФизЛицо, nodes.Дом, 'может владеть')
connect(nodes.ФизЛицо, nodes.ЗемельныйУчасток, 'может владеть')
connect(nodes.ФизЛицо, nodes.СтраховаяМедОрганизация, 'может обратиться')
connect(nodes.ФизЛицо, nodes.ОрганизацияКультуры, 'может посетить')
connect(nodes.ФизЛицо, nodes.Заболевание, 'может')

connect(nodes.ЮрЛицо, nodes.ЦифровойРесурс, 'может иметь')
connect(nodes.ЮрЛицо, nodes.Государство, 'регистрируется в')
connect(nodes.ЮрЛицо, nodes.ЗемельныйУчасток, 'может владеть')
connect(nodes.ЮрЛицо, nodes.Дом, 'может владеть')
connect(nodes.ЮрЛицо, nodes.СубъектМалогоСреднегоПредпринимательства, 'может быть')
connect(nodes.ЮрЛицо, nodes.ФинИнструмент, 'может иметь')

connect(nodes.МедОрганизация, nodes.МедРаботник, 'имеет')
connect(nodes.МедОрганизация, nodes.МедУслуга, 'предоставляет')
connect(nodes.МедОрганизация, nodes.КартаВызоваСкоройМедПомощи, 'имеет')
connect(nodes.ФедеральныйПроект, nodes.УчастникФедПроекта, 'имеет')
connect(nodes.ФедеральныйПроект, nodes.ДолжностноеЛицо, 'управляет')
connect(nodes.ФедеральныйПроект, nodes.Цель, 'имеет')
connect(nodes.ФедеральныйПроект, nodes.Финансирование, 'получает')
connect(nodes.ФедеральныйПроект, nodes.Задача, 'состоит из')


connect(nodes.НациональныйПроект, nodes.ФедеральныйПроект, 'включает')
connect(nodes.НациональныйПроект, nodes.Цель, 'имеет')
connect(nodes.НациональныйПроект, nodes.ДолжностноеЛицо, 'управляет')

connect(nodes.ГосОбразование, nodes.НасПункт, 'может иметь')
connect(nodes.ГосОбразование, nodes.МуниципальноеОбразование, 'может иметь')

connect(nodes.Государство, nodes.ГосОбразование, 'может иметь')

connect(nodes.Кредит, nodes.КредитныйДоговор, 'имеет')

connect(nodes.Задача, nodes.Результат, 'имеет')

connect(nodes.Цель, nodes.Показатель, 'состоит из')

connect(nodes.Показатель, nodes.ГосОбразование, 'рассчитывается по')

connect(nodes.Финансирование, nodes.ГосОбразование, 'осуществляется по')

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
                /* 
                top: i * 10 + "%",
                left: (i % 10) * 10 + "%",
                 */
                top: coords[i].top,
                left: coords[i].left,
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