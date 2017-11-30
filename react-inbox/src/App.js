import React, { Component } from 'react';
import Toolbar from './components/Toolbar'
import Messages from './components/Messages'
import './App.css';

class App extends Component {

  constructor(props) {
    super(props)
    this.state = { messages: props.messages }
  }

  toggleProperty(message, property) {
    this.setState((prevState) => {
      const index = prevState.messages.indexOf(message)
      return {
        messages: [
          ...prevState.messages.slice(0, index),
          { ...message, [property]: !message[property] },
          ...prevState.messages.slice(index + 1),
        ]
      };
    })
  }

  toggleSelect(message) {
    this.toggleProperty(message, 'selected')
  }

  toggleStar(message) {
    this.toggleProperty(message, 'starred')
  }

  markAsRead() {
    this.setState((prevState) => {
      return {
        messages: prevState.messages.map(message => (
          message.selected ? { ...message, read: true } : message
        ))
      }
    })
  }

  markAsUnread() {
    this.setState((prevState) => {
      return {
        messages: prevState.messages.map(message => (
          message.selected ? { ...message, read: false } : message
        ))
      }
    })
  }

  deleteMessages() {
    this.setState((prevState) => {
      const messages = prevState.messages.filter(message => !message.selected)
      return { messages };
    })
  }

  toggleSelectAll() {
    this.setState((prevState) => {
      const selectedMessages = prevState.messages.filter(message => message.selected)
      const selected = selectedMessages.length !== prevState.messages.length
      return {
        messages: prevState.messages.map(message => (
          message.selected !== selected ? { ...message, selected } : message
        ))
      };
    })
  }

  applyLabel(label) {
    this.setState((prevState) => {
      const messages = prevState.messages.map(message => (
        message.selected && !message.labels.includes(label) ?
          { ...message, labels: [...message.labels, label].sort() } :
          message
      ))
      return { messages };
    })
  }

  removeLabel(label) {
    this.setState((prevState) => {
      const messages = prevState.messages.map(message => {
        const index = message.labels.indexOf(label)
        if (message.selected && index > -1) {
          return {
            ...message,
            labels: [
              ...message.labels.slice(0, index),
              ...message.labels.slice(index + 1)
            ]
          }
        }
        return message
      })
      return { messages };
    })
  }

  render() {
    return (
      <div>
        <div className="navbar navbar-default" role="navigation">
          <div className="container">
            <div className="navbar-header">
              <button type="button" className="navbar-toggle collapsed" data-toggle="collapse" data-target=".navbar-collapse">
                <span className="sr-only">Toggle navigation</span>
                <span className="icon-bar"></span>
                <span className="icon-bar"></span>
                <span className="icon-bar"></span>
              </button>
              <a className="navbar-brand" href="/">React Inbox</a>
            </div>
          </div>
        </div>

        <div className="container">
          <Toolbar
            messages={this.state.messages}
            markAsRead={this.markAsRead.bind(this)}
            markAsUnread={this.markAsUnread.bind(this)}
            deleteMessages={this.deleteMessages.bind(this)}
            toggleSelectAll={this.toggleSelectAll.bind(this)}
            applyLabel={this.applyLabel.bind(this)}
            removeLabel={this.removeLabel.bind(this)}
            />
          <Messages
            messages={this.state.messages}
            toggleSelect={this.toggleSelect.bind(this)}
            toggleStar={this.toggleStar.bind(this)}
            />
        </div>
      </div>
    );
  }
}

export default App;
