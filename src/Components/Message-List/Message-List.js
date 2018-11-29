import React from 'react'
import Message from '../Message/Message'

const MessageList = ({ messages, id, checkBox }) => (
  messages.map((message, id) => (
    <Message key={id} message={message} checkBox={checkBox} />
  ))
)

export default MessageList
