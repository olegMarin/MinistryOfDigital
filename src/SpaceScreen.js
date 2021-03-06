import React from "react";
import Round from "./components/Round"
import coords from "./styles/coords"
import coordsArr from "./styles/coordsArr"
import colors from "./styles/themes"
import Lottie from 'react-lottie';
import animationArrow from './svg/arrow.json'
import cn from 'classnames'

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
    'Результат'
    ].reduce((o, v) => ({ ...o, [v]: { name: v, parents: {}, children: {} } }), {})


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
            isStopped: false, 
            isPaused: false
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

    getHw = (item,index) => {
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

    getHwa = (item, index) => {
        if (this.state.currentNode === item.node) {
            return 0
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
        const defaultOptions = {
            loop: true,
            autoplay: true,
            animationData: animationArrow,
            rendererSettings: {
                preserveAspectRatio: 'xMidYMid slice'
            }
        };

    if(this.props.onSearch.length>3){
        Object.keys(nodes).map((key, index)=>{
        if (key.toLowerCase().includes(this.props.onSearch.toLowerCase())) {
            this.props.onSearchAdd('')
        
            this.onNodeClick(nodes[key])
        }})
    }

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
                    let hwa = this.getHwa(item, index)
                    return (
                        <div className={cn('arrow', { 'round-disappearing': this.props.hw === 4 })}   
                        style={{
                            top: coordsArr[index].top,
                            left: coordsArr[index].left,
                            transform: "rotate(" + coordsArr[index].transform+"deg)" ,
                        }}
                        key={index}
                        >
                        <Lottie
                         options={defaultOptions}
                            height={(hwa === 0) ? 0 :25}
                            width={(hwa===0)?0:coordsArr[index].width}
                            isStopped={this.state.isStopped}
                            isPaused={this.state.isPaused} 

                            />
                    </div>)})
                }          
                {this.state.rounds.map((item, index) => {
                    return (
                        <Round
                            theme={this.props.theme}
                            key={index}
                            item={item}
                            hw={this.getHw(item,index)}
                            onClick={() => this.onNodeClick(item.node)}
                        />
                    )
                })}
                <div className='history'
                style={{ 
                    backgroundColor: colors[this.props.theme].backgroundHover,
                    width: ((this.state.history.slice(0, this.state.history.length - 1).length)>0)?200:0,
                    height: (this.state.history.slice(0, this.state.history.length - 1).length)*28
                         }}>
                    {this.state.history.slice(0, this.state.history.length - 1).map((node) => {
                        let n = node.name.replace(/([а-я])([А-Я])/g, '$1 $2')
                        return(
                        <a href="#" onClick={(e) => { e.preventDefault(); this.onNodeClick(node) }}>{n}</a>
                    )})}
                </div>
            </div>
        )
    }
}