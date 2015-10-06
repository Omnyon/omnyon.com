import React, {Component} from 'react'
import Radium from 'radium'
import {Section} from './Section'
import {Wrapper} from './Wrapper'
import {Value} from './Value'
import {firstChild, lastChild} from '../styles/pseudoElements'

let values = [{
  icon: 'ion-ios-flask',
  description: 'Innovation and efficiency are our focus as we provide domain expertise.'
}, {
  icon: 'ion-ios-people',
  description: 'An employee centric philosophy is our drive to empower employees to be filled with passion.'
}, {
  icon: 'ion-ios-world',
  description: 'Mission and providing value is our philosophy.'
}]

@Radium
export class Values extends Component {
  constructor () {
    super()
    this.state = {values}
  }
  render () {
    return (
      <Section {...this.props} className="js-values">
        <Wrapper>
          <ul>
            {
              this.state.values.map((value, i, array) => {
                return (
                  <Value {...value} isFirstChild={firstChild(i)} isLastChild={lastChild(i, array.length)} key={'value-' + i} />
                )
              })
            }
          </ul>
        </Wrapper>
      </Section>
    )
  }
}
