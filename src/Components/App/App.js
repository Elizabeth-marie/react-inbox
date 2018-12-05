import React, { Component } from 'react';
import './App.css';
import MessageList from '../Message-List/Message-List'
import Toolbar from '../Toolbar/Toolbar'
import ComposeForm from '../Compose-Form/Compose-Form'

const API = process.env.API || 'http://localhost:8082/api/messages'

const getMessages = async () => {
  const response = await fetch(`${API}`)
  const json = await response.json()
  return json
}
class App extends Component {
constructor(){
  super()
  this.state = {
    toolBarChecked: false,
    composing: false,
    messages: []
  }
}

async componentDidMount(){
  console.log('component mounted')
  //get data from the API
  const response = await fetch(`${API}`)
  const json = await getMessages()
  this.setState({messages: json})
}


onReadClick = async read => {

  const ids = this.state.messages
  .filter(message => message.selected)
  .map(message => message.id)

  const response = await fetch(`${API}`, {
    method: "PATCH",
    body: JSON.stringify({
      command: "read",
      read: true,
      messageIds: ids
    }),
    headers: {
      "Content-Type": "application/json; charset=utf-8"
    }
  })
    if(response.status === 200) {
      const json = await response.json()
      this.setState({
        ...this.state,
        messages: json
      })
    }
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

onUnreadClick = async read => {
  const ids = this.state.messages
  .filter(message => message.selected)
  .map(message => message.id)

  const response = await fetch(`${API}`, {
    method: "PATCH",
    body: JSON.stringify({
      command: "read",
      read: false,
      messageIds: ids
    }),
    headers: {
      "Content-Type": "application/json; charset=utf-8"
    }
  })
    if(response.status === 200) {
      const json = await response.json()
      this.setState({
        ...this.state,
        messages: json
      })
    }
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

onAddLabelChange = async (e) => {
  const ids = this.state.messages
  .filter(message => message.selected)
  .map(message => message.id)

  const response = await fetch(`${API}`, {
    method: "PATCH",
    body: JSON.stringify({
      command: "addLabel",
      label: e.target.value,
      messageIds: ids
    }),
    headers: {
      "Content-Type": "application/json; charset=utf-8"
    }
  })
    if(response.status === 200) {
      const json = await response.json()
      this.setState({
        ...this.state,
        messages: json
      })
    }
  this.setState({
    ...this.state,
    messages: this.state.messages
    .map(message => {
      if(message.selected && !message.labels.includes(e.target.value)) {
        message.labels.push(e.target.value)
      }
      return message
    })
  })
  }


onRemoveLabelChange = async (e) => {
  const ids = this.state.messages
  .filter(message => message.selected)
  .map(message => message.id)

  const response = await fetch(`${API}`, {
    method: "PATCH",
    body: JSON.stringify({
      command: "removeLabel",
      label: e.target.value,
      messageIds: ids
    }),
    headers: {
      "Content-Type": "application/json; charset=utf-8"
    }
  })
    if(response.status === 200) {
      const json = await response.json()
      this.setState({
        ...this.state,
        messages: json
      })
    }
  this.setState({
    ...this.state,
    messages: this.state.messages
    .map(message => {
      if(message.selected && !message.labels.includes(e.target.value)) {
        message.labels.push(e.target.value)
      }
      return message
    })
  })
}


onDeleteClick = async () => {
  const ids = this.state.messages
  .filter(message => message.selected)
  .map(message => message.id)

  const response = await fetch(`${API}`, {
    method: 'PATCH',
    body: JSON.stringify({
      command: "delete",
      messageIds: ids
    }),
    headers: {
      "Content-Type": "application/json; charset=utf-8"
    }
    })

    if(response.status === 200) {
      const json = await response.json()
      this.setState({
        ...this.state,
        messages: json

      })
    }
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

onSelectAllClick = selected => {
    this.setState({
      ...this.state,
      messages: this.state.messages.map(message => {
        selected < this.state.messages.length
        ? message.selected = true
        : delete message.selected
        return message
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

onStarClick = async id => {

  const response = await fetch(`${API}`, {
    method: 'PATCH',
    body: JSON.stringify({
      command: "star",
      messageIds: [id]
    }),
    headers: {
      "Content-Type": "application/json; charset=utf-8"
    }
  })
  if(response.status === 200){
    const json = await response.json()
    this.setState({
      ...this.state,
      messages: this.state.messages
      .map(message => {
        if(message.id === id){
          message.starred = !message.starred
        }
        return message
      })
    })
  }
}


onComposingClick = (e) => {
  this.setState({
    composing: !this.state.composing
  })
}

async addMessage(message) {
  const response = await fetch(`${API}`, {
    method: 'POST',
    headers: {
      "Content-Type": "application/json; charset=utf-8"
    },
    body: JSON.stringify(message),

  })
  if(response.status === 200) {
    const json = await response.json()
    console.log("POST", json)

    this.setState({ messages: [...this.state.messages, json]})
  }
  else {
    console.error("Could not post", response.statusText)
  }

}

  render() {
    return (
      <div className="App">
        <h1>React Inbox</h1>

          <Toolbar
            onComposingClick={this.onComposingClick}
            onReadClick={this.onReadClick}
            onUnreadClick={this.onUnreadClick}
            onDeleteClick={this.onDeleteClick}
            toolBarChecked={this.state.toolBarChecked}

            onSelectAllClick={ this.onSelectAllClick }
            selected={ this.state.messages.filter(message => message.selected).length }
            unselected={ this.state.messages.filter(message => !message.selected).length }
            unreadCount={this.state.messages.filter(message => !message.read).length}
            onAddLabelChange={this.onAddLabelChange}
            onRemoveLabelChange={this.onRemoveLabelChange}/>
          <MessageList
            messages={this.state.messages}
            checkBox={this.checkBox}
            onStarClick={this.onStarClick}/>
          <ComposeForm
            composing={this.state.composing} addMessage={this.addMessage.bind(this)}/>

      </div>
    );
  }
}

export default App;
