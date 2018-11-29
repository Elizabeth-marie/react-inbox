import React, { Component } from 'react';
import './App.css';
import MessageList from '../Message-List/Message-List'
import Toolbar from '../Toolbar/Toolbar'

class App extends Component {
constructor(){
  super()
  this.state = {
    toolBarChecked: false,
    messages: [
  {
    "id": 1,
    "subject": "You can't input the protocol without calculating the mobile RSS protocol!",
    "read": false,
    "starred": true,
    "labels": ["dev", "personal"]
  },
  {
    "id": 2,
    "subject": "connecting the system won't do anything, we need to input the mobile AI panel!",
    "read": false,
    "starred": false,
    "selected": true,
    "labels": []
  },
  {
    "id": 3,
    "subject": "Use the 1080p HTTP feed, then you can parse the cross-platform hard drive!",
    "read": false,
    "starred": true,
    "labels": ["dev"]
  },
  {
    "id": 4,
    "subject": "We need to program the primary TCP hard drive!",
    "read": true,
    "starred": false,
    "selected": true,
    "labels": []
  },
  {
    "id": 5,
    "subject": "If we override the interface, we can get to the HTTP feed through the virtual EXE interface!",
    "read": false,
    "starred": false,
    "labels": ["personal"]
  },
  {
    "id": 6,
    "subject": "We need to back up the wireless GB driver!",
    "read": true,
    "starred": true,
    "labels": []
  },
  {
    "id": 7,
    "subject": "We need to index the mobile PCI bus!",
    "read": true,
    "starred": false,
    "labels": ["dev", "personal"]
  },
  {
    "id": 8,
    "subject": "If we connect the sensor, we can get to the HDD port through the redundant IB firewall!",
    "read": true,
    "starred": true,
    "labels": []
  }
]
  }
}

onReadClick = (e) => {
  this.setState({
    ...this.state,
    messages: this.state.messages
    .map(message => {
      if(message.selected) message.read = true
      message.selected = false
      return message
    })
  })
}

onAddLabelChange = (e) => {
  this.setState({
    ...this.state,
    messages: this.state.messages
    .map(message => {
      if(message.selected && !message.labels.includes(e.target.value)){
        message.labels.push(e.target.value)
        return message
      } else {
        return message
      }

    })
  })
}

onRemoveLabelChange = (e) => {
  this.setState({
    ...this.state,
    messages: this.state.messages
    .map(message => {
      if(message.selected && message.labels.includes(e.target.value)) {
        message.labels.splice(message.labels.indexOf(e.target.value, 1))
        return message
      } else {
        return message
      }
    })
  })
}

onDeleteClick = (e) => {
  this.setState({
    ...this.state,
    messages: this.state.messages
    .filter(message => !message.selected),
    toolBarChecked: false
})
}

onUnreadCount = () => {

  this.setState({
    ...this.state,
    messages: this.state.messages
    .map(message => {
      if(!message.read){
        this.state.unreadCount ++
      }
    })
  })
}

onToolbarCheckBoxClick = (e) => {
  this.setState({
    ...this.state,
    toolBarChecked: !this.state.toolBarChecked,
    messages: this.state.messages
    .map(message => {
      if(!this.state.toolBarChecked) {
        message.selected = true
      } else {
        message.selected = false
      } return message
    })
  })
}

  checkBox = (id) => (e) => {
    this.setState({
      ...this.state,
      messages: this.state.messages
      .map(message => {
        if(message.id === id){
          if(!message.selected){
            message.selected = true
            } else {
                message.selected = false
            }
      } return message
    })
  })
}

onStarClick = (id) => {
  this.setState({
    ...this.state,
    messages: this.state.messages
    .map(message => {
      if(message.id === id){
        message.starred = !message.starred
      } return message
    })
  })
}

  render() {
    return (
      <div className="App">
        <h1>React Inbox</h1>
          <Toolbar
            onReadClick={this.onReadClick}
            onUnreadClick={this.onUnreadClick}
            onDeleteClick={this.onDeleteClick}
            toolBarChecked={this.state.toolBarChecked}
            onToolbarCheckBoxClick={this.onToolbarCheckBoxClick}
            unreadCount={this.state.messages.filter(message => !message.read).length}
            onAddLabelChange={this.onAddLabelChange}
            onRemoveLabelChange={this.onRemoveLabelChange}/>
        <MessageList
          messages={this.state.messages}
          checkBox={this.checkBox}
          onStarClick={this.onStarClick}/>
      </div>
    );
  }
}

export default App;
