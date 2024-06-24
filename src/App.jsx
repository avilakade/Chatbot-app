import React from 'react'
import Chatbox from './Chatbox'
function App() {
 const api_key =  import.meta.env.VITE_API_KEY;

  return (
    <Chatbox api_key={api_key}/>
  )
}

export default App
