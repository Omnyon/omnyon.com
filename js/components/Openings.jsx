import React, {Component} from 'react'
import {connect} from 'react-redux'
import Radium from 'radium'
import {Section} from './Section'
import {Wrapper} from './Wrapper'
import {large} from '../styles/mediaQueries'
import {setSubject} from '../actionCreators'
import {scrollToElementForPath} from '../utils'

let style = {
  noWhitespace: {
    whiteSpace: 'nowrap'
  },
  wrapper: {
    innerWrapper: {
      base: {
        margin: 0,
        width: '100%',
        verticalAlign: 'top',
        [large]: {
          display: 'inline-block',
          width: '50%'
        }
      },
      lastChild: {
        margin: '25px 0 0 0',
        [large]: {
          margin: 0
        }
      }
    }
  },
  li: {
    fontSize: '1.5rem',
    padding: '0 0 1em 0'
  },
  h2: {
    fontSize: '2rem',
    margin: '0 0 1em 0'
  }
}

@Radium
class Openings extends Component {
  handleScrollTo (event) {
    let {dispatch} = this.props
    let href = event.target.getAttribute('href')
    let location = event.target.parentNode.parentNode.previousSibling.innerHTML

    event.preventDefault()
    scrollToElementForPath(href, 750)
    dispatch(setSubject(`${location} - ${event.target.innerHTML}`))
  }
  render () {
    return (
      <Section className="js-openings" {...this.props}>
        <Wrapper>
          <h1>Openings</h1>
          <div styles={[
            style.noWhitespace
          ]}>
            <div style={[
              style.wrapper.innerWrapper.base
            ]}>
              <h2 style={[style.h2]}>Maryland</h2>
              <ul>
                <li style={[
                  style.li
                ]}>
                  <a href="/contact" onClick={::this.handleScrollTo}>Linux System Admin</a>
                </li>
                <li style={[
                  style.li
                ]}>
                  <a href="/contact" onClick={::this.handleScrollTo}>Software Engineer</a>
                </li>
                <li style={[
                  style.li
                ]}>
                  <a href="/contact" onClick={::this.handleScrollTo}>Systems Integration Tech</a>
                </li>
                <li style={[
                  style.li
                ]}>
                  <a href="/contact" onClick={::this.handleScrollTo}>Systems Admin</a>
                </li>
                <li style={[
                  style.li
                ]}>
                  <a href="/contact" onClick={::this.handleScrollTo}>Cloud Engineer</a>
                </li>
              </ul>
            </div>
            <div style={[
              style.wrapper.innerWrapper.base,
              style.wrapper.innerWrapper.lastChild
            ]}>
              <h2 style={[style.h2]}>Virginia</h2>
              <ul>
                <li style={[
                  style.li
                ]}>
                  <a href="/contact" onClick={::this.handleScrollTo}>Systems Admin</a>
                </li>
                <li style={[
                  style.li
                ]}>
                  <a href="/contact" onClick={::this.handleScrollTo}>Systems Engineer</a>
                </li>
                <li style={[
                  style.li
                ]}>
                  <a href="/contact" onClick={::this.handleScrollTo}>Software Engineer</a>
                </li>
              </ul>
            </div>
          </div>
        </Wrapper>
      </Section>
    )
  }
}

export default connect()(Openings)