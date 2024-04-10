import { useCallback, useState, useEffect, useRef } from 'react'
import './App.css'

function App() {
  const [length, setLength] = useState(8);
  const [numberAllowed, setNumberAllowed] = useState(false);
  const [charAllowed, setCharAllowed] = useState(false);
  const [password, setPassword] = useState("");

  // useRef Hooks

  const passwordRef = useRef(null)

  // to create a password generator and useCallback Hooks

  const passwordGenerator = useCallback(() => {
    let pass = "";
    let str = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxy";
    if (numberAllowed) str += "0123456789";
    if (charAllowed) str += "@%&*!<%>:}-<_?"
    for (let i = 0; i <= length; i++) {
      let char = Math.floor(Math.random() * str.length + 1);
      pass += str.charAt(char);
    }
    setPassword(pass);
  }, [length, numberAllowed, charAllowed, setPassword])

  const copyPassword = useCallback(()=>{
    passwordRef.current ?.select();
    // passwordRef.current ?.setSelectionRange(0,99);
      window.navigator.clipboard.writeText(password)
  },[password])

    // useEffect Hooks

  useEffect(() => {
    passwordGenerator()
  }, [length, numberAllowed, charAllowed, passwordGenerator])


  return (
    <div className='w-full mx-w-md mx-auto shadow-md rounded-lg px-4 py-3 my-8 text-black bg-gray-800'>
      <h1 className='text-white text-center my-3'>Password Generator</h1>
      <div className='flex shadow rounded-lg overflow-hidden mb-4'>
        <input
          type="text"
          value={password}
          className='outline-non w-full py-1 px-3'
          placeholder='Enter password'
          readOnly
          ref={passwordRef}
        />
        <button onClick={copyPassword} className='outline-non bg-blue-700 text-white px-3 py-0.5 shrink-0'>copy</button>
      </div>
      <div className='flex text-sm gap-x-2'>
        <div className='flex items-center gap-x-1'>
          <input
            type="range"
            min={8}
            max={100}
            value={length}
            className='cursor-pointer'
            onChange={(e) => { setLength(e.target.value); }}
          />
          <label className='text-white'>Length :{length}</label>
        </div>
        <div className='flex items-center gap-x-1'>
          <input
            type="checkbox"
            defaultChecked={numberAllowed}
            id='numberInput'
            onChange={() => {
              setCharAllowed((prev => !prev));
            }}
          />
          <label className='text-white'>Numbers</label>
        </div>
        <div className='flex items-center gap-x-1'>
          <input
            type="checkbox"
            defaultChecked={charAllowed}
            id='characterInput'
            onChange={() => {
              setCharAllowed((prev => !prev));
            }}
          />
          <label className='text-white'>Character</label>
        </div>
      </div>
    </div>
  )
}

export default App
