'use client'

import { useFormState } from 'react-dom'
import { login } from './action'

export default function Pagee() {
  const initState = {
    message: ''
  }
  const [state, formAction]= useFormState(login, initState)
  // console.log('state: ',state.messsage)
   return (
    <form action={formAction}>
      <div>
        Email <input type="text" name="email" />        
      </div>
      <div>
        Password <input type="password" name="password" />        
      </div>
      <div>
        Message: {state.message}
      </div>
      <button>Login</button>
    </form>
   )
}