import React from 'react'

const message = ({messages}) => (
  <ul>
    {messages.map(message => <li key={message.id}>{message.name}</li>)}
  </ul>
)

export default Message
