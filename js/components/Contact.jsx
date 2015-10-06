import React, {Component} from 'react'
import {findDOMNode} from 'react-dom'
import {connect} from 'react-redux'
import Radium from 'radium'
import {toggleFileInput, setFormValid, setSubject} from '../actionCreators'
import {body} from '../styles/colors'
import {medium} from '../styles/mediaQueries'
import {Section} from './Section'
import {Wrapper} from './Wrapper'

let style = {
  base: {
    display: 'block',
    width: '100%'
  },
  button: {
    base: {
      background: 'none',
      border: '2px solid white',
      cursor: 'pointer',
      fontSize: '1.5rem',
      margin: '25px 0 0 0',
      padding: '5px 20px'
    },
    disabled: {
      cursor: 'default',
      opacity: 0.4
    }
  },
  input: {
    background: 'none',
    borderTop: 'none',
    borderRight: 'none',
    borderBottom: `2px solid ${body}`,
    borderLeft: 'none',
    borderRadius: 0,
    display: 'block',
    fontSize: '1.5rem',
    margin: '25px 0 0 0',
    padding: '10px',
    width: '100%'
  },
  select: {
    base: {
      borderRadius: 0,
      display: 'block',
      fontSize: '1.5rem',
      padding: '10px',
      appearance: 'none',
      background: 'none',
      borderTop: 'none',
      borderRight: 'none',
      borderBottom: `2px solid ${body}`,
      borderLeft: 'none',
      position: 'relative',
      zIndex: 1,
      width: '100%'
    },
    wrapper: {
      display: 'inline-block',
      position: 'relative',
      width: '100%',
      [medium]: {
        width: 'auto'
      }
    },
    arrow: {
      fontSize: '2rem',
      position: 'absolute',
      right: 0,
      top: '50%',
      transform: 'translate(-50%, -50%)',
      zIndex: 0
    }
  },
  textarea: {
    background: 'none',
    borderTop: 'none',
    borderRight: 'none',
    borderBottom: `2px solid ${body}`,
    borderLeft: 'none',
    borderRadius: 0,
    display: 'block',
    fontSize: '1.5rem',
    margin: '25px 0 0 0',
    padding: '10px',
    resize: 'none',
    width: '100%'
  },
  fileInput: {
    base: {
      background: 'none',
      borderTop: 'none',
      borderRight: 'none',
      borderBottom: `2px solid ${body}`,
      borderLeft: 'none',
      borderRadius: 0,
      display: 'block',
      fontSize: '1.5rem',
      margin: '25px 0 0 0',
      padding: '10px',
      width: '100%'
    },
    wrapper: {
      hidden: {
        display: 'none'
      }
    },
    input: {
      border: 'none',
      height: 0,
      margin: 0,
      opacity: 0,
      padding: 0,
      width: 0
    }
  }
}

@Radium
class Contact extends Component {
  handleSelectSelect (event) {
    let {dispatch} = this.props
    dispatch(toggleFileInput(event.target.value === 'Staffing'))
  }
  handleFormChange (event) {
    let {dispatch} = this.props
    if (event.target.name === 'subject') {
      dispatch(setSubject(event.target.value))
    }
    dispatch(setFormValid(findDOMNode(this.refs.form).checkValidity()))
  }
  render () {
    return (
      <Section className="js-contact" {...this.props}>
        <Wrapper>
          <form ref="form">
            <h1>We would love to hear from you!</h1>
            <div style={[
              style.select.wrapper
            ]}>
              <select name="to" onChange={::this.handleSelectSelect} required style={[
                style.select.base
              ]}>
                <option>Staffing</option>
                <option>HR</option>
                <option>Contracts</option>
                <option>Business Development</option>
                <option>General</option>
              </select>
              <span className="ion-ios-arrow-down" style={[style.select.arrow]}></span>
            </div>
            <label style={[
              !this.props.showFileInput && style.fileInput.wrapper.hidden
            ]}>
              <input type="file" onChange={::this.handleFormChange} style={[
                style.fileInput.input
              ]} />
              <span style={[
                style.fileInput.base
              ]}>Resume</span>
            </label>
            <input type="email" name="email" placeholder="Email*" required onChange={::this.handleFormChange} style={[
              style.input
            ]} />
            <input name="subject" placeholder="Subject*" required onChange={::this.handleFormChange} style={[
              style.input
            ]} value={this.props.subject} />
            <textarea name="message" placeholder="Talk to us!*" required onChange={::this.handleFormChange}style={[
              style.textarea
            ]}></textarea>
            <button type="submit" disabled={!this.props.formIsValid} style={[
              style.button.base,
              !this.props.formIsValid && style.button.disabled
            ]}>Send</button>
          </form>
        </Wrapper>
      </Section>
    )
  }
}

export default connect(state => ({
  formIsValid: state.formIsValid,
  showFileInput: state.showFileInput,
  subject: state.subject
}))(Contact)