import React, { useEffect, useState } from 'react'

function InputField() {
    const [text, setText] = useState("");

    useEffect(() => {
        console.log(text);
    }, [text])
    
  return (
    <input value={text} onChange={(e) => setText(e.target.value)}/>
  )
}

export default InputField
