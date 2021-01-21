import React, { Component } from 'react'
import './App.css'
import marked from 'marked'
import { sampleText } from './sampleText'


class App extends Component {
  state = {
    text: sampleText
  }

  componentDidMount () {
    const text = localStorage.getItem('text')
    if (text) {
      this.setState({ text })
    } else {
      this.setState({ text: sampleText })
    }
    
  }

  componentDidUpdate () {
    const { text } = this.state
    localStorage.setItem('text', text )
  }

  handleChange = event => {
    const text = event.target.value
    this.setState({ text })
  }

  renderText = text =>  {
    const __html = marked (text, { sanitize: true })
    return { __html }
  }

  render() {
    return (
      <div className="wrapper">
        <div className="colonne">
          <div>
            <textarea 
              onChange={this.handleChange}
              className='textarea' 
              rows="35"
              value={ this.state.text } />
          </div>
          <div className="result">
            <div dangerouslySetInnerHTML={ this.renderText(this.state.text) } />
          </div>
        </div>
      </div>
      
    );
  }
}

export default App;
