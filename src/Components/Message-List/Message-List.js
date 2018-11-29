import React from 'react'
import Message from '../Message/Message'

const MessageList = ({ messages, id, checkBox, onStarClick }) => (
  messages.map((message, id) => (
    <Message
      key={id}
      message={message}
      checkBox={checkBox}
      onStarClick={onStarClick}
      />
  ))
)

export default MessageList
