import React from 'react';
import RusSVG from './svg/rus'
import russia from './svg/russia.json'
import colors from './styles/themes'
import Header from './components/Header'

export default class App extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      theme: 'light',
      droped: [], //тут будут лежать все регионы, в которые дропнуты сущности данных
      clicked: '', //тут лежит регион, по которому кликнули последний раз
      regionsBackground: {}
    }
  }

componentDidMount(){
  this.changeRegionsBackground()
}

setTheme=(theme)=>{
  this.changeRegionsBackground()
  this.setState({theme: theme})
}

  changeRegionsBackground=()=>{
    let newRegionsBackground = {}
    let keyOfRegion = 0
    while (russia.layers[keyOfRegion]){
      let colorObj = {[russia.layers[keyOfRegion].id]: colors[this.state.theme].background}
      newRegionsBackground = {...newRegionsBackground, ...colorObj}

      keyOfRegion++
    }
    this.setState({ regionsBackground: newRegionsBackground})
  }


  handlerOnDropDataToRegion=(region)=>{
    console.log(region)
  }
  handlerOnClickToRegion = (region) => {
    this.setState({clicked: region})
  }

  render() {
  let allActiveColors ={
    background: this.state.regionsBackground,
    whiteStroke: colors[this.state.theme].whiteStroke,
    maneStroke: colors[this.state.theme].maneStroke,
    backgroundHover: colors[this.state.theme].backgroundHover,
    dragBackgrount: colors[this.state.theme].dragBackgrount,
    dragStroke: colors[this.state.theme].dragStroke,
    coastColor: colors[this.state.theme].coast,
    backgroundClicked: colors[this.state.theme].backgroundClicked,
    }
    return (
    <div {...this.props} style={{width: '100vw', height: '100vh'}}>
        <Header {...this.state} />
        <RusSVG 
          {...this.state} 
          isOnDrop={(region)=>this.handlerOnDropDataToRegion(region)}
          isOnClick={(region) => this.handlerOnClickToRegion(region)}
          allActiveColors={allActiveColors}
          />
    </div>
    )
  }
}
