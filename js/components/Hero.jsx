import React, {Component} from 'react'
import Radium from 'radium'
import Color from 'color'
import {Section} from './Section'
import {body, bodyText} from '../styles/colors'
import {large} from '../styles/mediaQueries'

let style = {
  base: {
    backgroundImage: 'url(http://irishtechhelp.com/wp-content/uploads/2014/07/dreamstimelarge_22891879.jpg)',
    backgroundPosition: '35% 35%',
    backgroundRepeat: 'no-repeat',
    position: 'relative',
    width: '100%',
    [large]: {
      backgroundPosition: 'center 35%',
      padding: '30vh 25px'
    }
  },
  before: {
    background: Color(body).alpha(0.6).hslString(),
    height: '100%',
    left: 0,
    position: 'absolute',
    top: 0,
    transform: 'none',
    width: '100%'
  },
  text: {
    color: bodyText,
    fontSize: '2rem',
    position: 'relative',
    textAlign: 'center',
    top: '50%',
    zIndex: 1
  }
}

@Radium
export class Hero extends Component {
  render () {
    return (
      <Section className="js-hero" styles={style.base} skewTop={false} overlay={true}>
        <p style={[style.text]}>A small business focused on software/system engineering and IT support.</p>
      </Section>
    )
  }
}
