import React, {Component} from 'react'
import Radium from 'radium'
import {getTitleFromPath, scrollToElementForPath, setPath, setTitle} from '../utils'
import {bodyText} from '../styles/colors'
import {large} from '../styles/mediaQueries'

let style = {
  logo: {
    base: {
      display: 'inline-block',
      fontSize: '2.5rem',
      position: 'relative',
      zIndex: 3,
      [large]: {
        float: 'left'
      }
    },
    a: {
      color: bodyText
    }
  }
}

@Radium
export class Logo extends Component {
  handleClick (event) {
    let href = event.target.getAttribute('href')

    event.preventDefault()
    scrollToElementForPath(href, 750)
    setTitle(getTitleFromPath(href))
    setPath(href)
  }
  render () {
    return (
      <div style={[
        style.logo.base
      ]}>
        <a href="/" onClick={this.handleClick} style={[
          style.logo.a
        ]}>OMNYON</a>
      </div>
    )
  }
}
