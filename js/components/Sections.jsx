import React, {Component} from 'react'
import Radium from 'radium'
import {Hero} from './Hero'
import {Values} from './Values'
import {Benefits} from './Benefits'
import Openings from './Openings'
import {Expertise} from './Expertise'
import Events from './Events'
import Contact from './Contact'

let style = {
  display: 'flex',
  flexDirection: 'column'
}

let sections = [
  'Hero',
  'Values',
  'Benefits',
  'Openings',
  'Expertise',
  'Events',
  'Contact'
]

function render (name) {
  switch (name) {
    case 'Hero':
      return <Hero key={name} />
    case 'Values':
      return <Values key={name} />
    case 'Benefits':
      return <Benefits isOdd={true} key={name} />
    case 'Openings':
      return <Openings key={name} />
    case 'Expertise':
      return <Expertise isOdd={true} key={name} />
    case 'Events':
      return <Events key={name} />
    case 'Contact':
      return <Contact isOdd={true} key={name} />
    default:
      return ''
  }
}

@Radium
export class Sections extends Component {
  render () {
    return (
      <div style={[style]}>
        {sections.map((section) => this::render(section))}
      </div>
    )
  }
}