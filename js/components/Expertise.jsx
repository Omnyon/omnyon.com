import React, {Component} from 'react'
import Radium from 'radium'
import {Section} from './Section'
import {Wrapper} from './Wrapper'

@Radium
export class Expertise extends Component {
  render () {
    return (
      <Section className="js-expertise" {...this.props}>
        <Wrapper>
          <h1>Expertise</h1>
        </Wrapper>
      </Section>
    )
  }
}
