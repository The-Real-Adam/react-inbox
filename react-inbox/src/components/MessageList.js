import React from 'react'

const MessageList = ({messages}) => (
  <ul>
    {messages.map(message => <li key={message.id}>{message.name}</li>)}
  </ul>
)

export default Message
