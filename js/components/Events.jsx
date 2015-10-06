import React, {Component} from 'react'
import {connect} from 'react-redux'
import Radium from 'radium'
import {Section} from './Section'
import {Wrapper} from './Wrapper'

let spinKeyFrames = Radium.keyframes({
  '0%': {
    transform: 'rotate(0deg)'
  },
  '100%': {
    transform: 'rotate(360deg)'
  }
})

let style = {
  loading: {
    animation: `${spinKeyFrames} linear infinite 1s`,
    display: 'inline-block',
    fontSize: '2rem'
  }
}

@Radium
class Events extends Component {
  render () {
    return (
      <Section className="js-events" {...this.props}>
        <Wrapper>
          <h1>Upcoming events</h1>
          <ul>
          {(() => {
            if (this.props.events.isFetching) {
              return (
                <li style={[
                  style.loading
                ]}>
                  <span className="ion-load-c"></span>
                </li>
              )
            }
            return this.props.events.data.map((event) => <li key={event.location}>{event.date} {event.time} @ <a href={event.uri}>{event.location}</a></li>)
          })()}
          </ul>
        </Wrapper>
      </Section>
    )
  }
}

export default connect(state => ({
  events: state.events
}))(Events)