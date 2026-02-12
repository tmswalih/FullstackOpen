import { useState } from 'react'


const Notification = ({ message }) => {
  let ClassName='hidden'

  if (message === null) {
    ClassName='hidden'
    
  }
  else {
    ClassName= 'message'
    
  }
  return (
    <div className={ClassName}>
      {message}
    </div>
    )
}

  

export default Notification