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
constructor(props){
  super(props)
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

  //filter messageIds
  // const filteredIds = this.state.messages.filter(message => message.selected).map(message => message.id)
  //plug in filteredIds to the patch
  //issue PATCH
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

// async addMessage(message) {
//   console.log('addMessage', message)
//   //do POST
//   const response = await fetch(`${API}`, {
//     method: 'POST',
//     headers: {
//       "Content-Type": "application/json; charset=utf-8"
//     },
//     body: JSON.stringify(message),
//
//   })
//   if(response.status === 200) {
//     const json = await response.json()
//     console.log("POST", json)
//
//     this.setState({ messages: [...this.state.messages, json]})
//   }
//   else {
//     console.error("Could not post", response.statusText)
//   }
//
// }

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



onComposingClick = (e) => {
  console.log('where you at?')
  this.setState({
    composing: !this.state.composing
  })
}

async addMessage(message) {
  console.log('addMessage', message)
  //do POST
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
            onToolbarCheckBoxClick={this.onToolbarCheckBoxClick}
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
