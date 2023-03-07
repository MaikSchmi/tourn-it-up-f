import React, { useEffect, useState } from 'react'
import { v4 } from 'uuid';

function InputField() {
    const [text, setText] = useState("");

    useEffect(() => {
        console.log(text);
    }, [text])
    
  return (
    <li key={v4()}>
      <input value={text} onChange={(e) => setText(e.target.value)}/>
    </li>
  )
}

export default InputField
