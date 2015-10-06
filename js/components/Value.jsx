import React, {Component} from 'react'
import Radium, {Style} from 'radium'
import {large} from '../styles/mediaQueries'
import {accentColor, body} from '../styles/colors'

let style = {
  base: {
    display: 'inline-block',
    width: '100%',
    textAlign: 'center',
    verticalAlign: 'top',
    [large]: {
      width: '32.9%'
    }
  },
  image: {
    wrapper: {
      base: {
        background: `linear-gradient(145deg, ${accentColor}, hsl(176, 69%, 42%))`,
        borderRadius: '50%',
        color: body,
        display: 'inline-block',
        fontSize: '8rem',
        height: '1.5em',
        lineHeight: '1.5em',
        margin: '0 0 .5em 0',
        width: '1.5em',
        [large]: {
          transform: 'scale(1.2)'
        }
      },
      firstChild: {
        [large]: {
          transform: 'scale(.9)'
        }
      },
      lastChild: {
        [large]: {
          transform: 'scale(.9)'
        }
      }
    },
    icon: {
      before: {
        lineHeight: 'inherit'
      }
    }
  },
  description: {
    base: {
      fontSize: '1.2rem',
      margin: '0 0 3em 0',
      textAlign: 'center',
      [large]: {
        margin: 0
      }
    },
    lastChild: {
      margin: 0
    }
  }
}

@Radium
export class Value extends Component {
  render () {
    return (
      <li className="value" style={[
        style.base
      ]}>
        <span style={[
          style.image.wrapper.base,
          this.props.isFirstChild && style.image.wrapper.firstChild,
          this.props.isLastChild && style.image.wrapper.lastChild
        ]}>
          <Style scopeSelector=".value" rules={{
            '.icon:before': {
              lineHeight: 'inherit'
            }
          }} />
          <span className={'icon ' + this.props.icon}></span>
        </span>
        <p style={[
          style.description.base,
          this.props.isLastChild && style.description.lastChild
        ]}>{this.props.description}</p>
      </li>
    )
  }
}