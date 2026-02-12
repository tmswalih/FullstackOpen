import { useState } from 'react'


const Notification = ({ message,errorMessage }) => {
  let ClassName='hidden'

  if (message === null&&errorMessage === null) {
    return null
    
  }
  else if (message !== null) {
    ClassName= 'message'
    return (
    <div className={ClassName}>
      {message}
    </div>
    )
    
  }
  else if (errorMessage !== null) {
    ClassName = 'error'
    return (
    <div className={ClassName}>
      {errorMessage}
    </div>
    )
  }
  
}

  

export default Notification