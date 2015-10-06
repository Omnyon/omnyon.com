import React, {Component} from 'react'
import {connect} from 'react-redux'
import Radium, {Style} from 'radium'
import Color from 'color'
import {isScrolled, toggleNav} from '../actionCreators'
import Header from './Header'
import {Sections} from './Sections'
import {Footer} from './Footer'
import {accentColor, body, bodyText} from '../styles/colors'
import {getPath, getTitleFromPath, requestAnimationFrame, scrollToElementForPath, setTitle} from '../utils'

function handleScroll () {
  let {dispatch} = this.props

  dispatch(isScrolled(window.scrollY > 0))
}

function handleResize () {
  let {dispatch} = this.props

  if (window.innerWidth <= 850) {
    return
  }
  dispatch(toggleNav(false))
}

@Radium
class App extends Component {
  constructor () {
    super()
    window.addEventListener('scroll', this::handleScroll)
    window.addEventListener('resize', this::handleResize)
  }
  componentDidMount () {
    if (getPath()) {
      setTitle(getTitleFromPath(getPath()))
      requestAnimationFrame(() => {
        scrollToElementForPath(getPath(), 0)
        this::handleScroll()
      })
    } else {
      this::handleScroll()
    }
  }
  render () {
    return (
      <div>
        <Style rules={{
          html: {
            fontSize: '16px'
          },
          body: {
            background: body,
            boxSizing: 'border-box',
            color: bodyText,
            fontFamily: 'Lato, Arial, serif',
            fontWeight: 200
          },
          'body *': {
            boxSizing: 'inherit',
            color: 'inherit',
            fontFamily: 'inherit',
            fontWeight: 'inherit'
          },
          a: {
            color: accentColor,
            textDecoration: 'none',
            transition: 'color .25s'
          },
          'a:hover': {
            color: Color(accentColor).lighten(0.2).hslString()
          },
          h1: {
            fontSize: '3rem',
            margin: '0 0 1em 0'
          }
        }} />
        <Header />
        <Sections />
        <Footer />
      </div>
    )
  }
}

export default connect()(App)