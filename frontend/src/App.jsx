import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'
import { Button} from './components'

function App() {
  const [inputText, setInputText] = useState("")

  return (
    <div>
      <Input placeholder="" label={'holaa'} value={inputText} onChange={(value) => { setInputText(value.target.value) }} name='pepito' />
      <Dropdown label="age" options={[
        { value: "1", label: '1' },
        { value: "2", label: '2' },
        { value: "3", label: '3' },
        { value: "4", label: '4' },
      ]} value="1" onChange={() => { }} name="hola" />
      <Button label="hol" onClick={() => { }} />


    </div>
  )
}

export default App
