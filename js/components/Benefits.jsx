import React, {Component} from 'react'
import Radium from 'radium'
import {Section} from './Section'
import {Wrapper} from './Wrapper'
import {xLarge} from '../styles/mediaQueries'
import {firstChild, lastChild} from '../styles/pseudoElements'

let styles = {
  outing: {
    width: '100%',
    [xLarge]: {
      maxHeight: '304px',
      width: '58%'
    }
  },
  ul: {
    margin: '0 auto',
    padding: '2em 0 0 0',
    width: '285px',
    [xLarge]: {
      display: 'inline-block',
      padding: '0',
      verticalAlign: 'top'
    }
  },
  li: {
    base: {
      padding: '.5em 0'
    },
    firstChild: {
      padding: '0 0 .5em 0'
    },
    lastChild: {
      padding: '.5em 0 0 0'
    }
  },
  icon: {
    display: 'inline-block',
    fontSize: '3rem',
    textAlign: 'center',
    verticalAlign: 'middle',
    width: '2em'
  }
}

let benefits = [{
  icon: 'ion-social-usd-outline',
  text: 'Competitive Salaray'
}, {
  icon: 'ion-ios-time-outline',
  text: '5 weeks PTO'
}, {
  icon: 'ion-ios-heart-outline',
  text: '100% Medical Coverage'
}, {
  icon: 'ion-ios-medkit-outline',
  text: 'Short/Long term disability'
}, {
  icon: 'ion-arrow-graph-up-right',
  text: 'Level up with paid training'
}]

@Radium
export class Benefits extends Component {
  render () {
    return (
      <Section className="js-benefits" {...this.props}>
        <Wrapper>
          <h1>Who we are</h1>
          <img src="http://www.eventhuse.co.uk/sites/default/files/Corporate%20outing.jpg" style={styles.outing} />
          <ul style={styles.ul}>
            {benefits.map(function (benefit, i, array) {
              return (
                <li style={[
                  styles.li.base,
                  firstChild(i) && styles.li.firstChild,
                  lastChild(i, array.length) && styles.li.lastChild
                ]} key={'benefit-' + i}>
                  <span className={benefit.icon} style={styles.icon}></span>{benefit.text}
                </li>
              )
            })}
          </ul>
        </Wrapper>
      </Section>
    )
  }
}
