import React, { useEffect, useState } from 'react'

function SortArrow({props, value, index, children}) {
  const [upDown, setUpDown] = useState("");
  const [myIndex, setMyIndex] = useState(index)
  const arrows = children.props.children;

  useEffect(() => {
    if (props !== "" && props !== undefined) props.split(" ")[1] === "asc" ? setUpDown("up") : setUpDown("down");
  }, [value, props])

  return (
    <>
      {
      (upDown === "up" && props !== undefined && props.split(" ")[0] === "free" && myIndex === 0)
    ? <>{arrows[0]}</>
    : (upDown === "down" && props !== undefined && props.split(" ")[0] === "free" && myIndex === 0)
    ? <>{arrows[1]}</>
    :  (upDown === "up" && props !== undefined && props.split(" ")[0] === "min" && myIndex === 1)
    ? <>{arrows[0]}</>
    : (upDown === "down" && props !== undefined && props.split(" ")[0] === "min" && myIndex === 1)
    ? <>{arrows[1]}</>
    :  (upDown === "up" && props !== undefined && props.split(" ")[0] === "max" && myIndex === 2)
    ? <>{arrows[0]}</>
    : (upDown === "down" && props !== undefined && props.split(" ")[0] === "max" && myIndex === 2)
    ? <>{arrows[1]}</>
    :  (upDown === "up" && props !== undefined && props.split(" ")[0] === "alph" && myIndex === 3)
    ? <>{arrows[0]}</>
    : (upDown === "down" && props !== undefined && props.split(" ")[0] === "alph" && myIndex === 3)
    ? <>{arrows[1]}</>
    :  (upDown === "up" && props !== undefined && props.split(" ")[0] === "start" && myIndex === 4)
    ? <>{arrows[0]}</>
    : (upDown === "down" && props !== undefined && props.split(" ")[0] === "start" && myIndex === 4)
    ? <>{arrows[1]}</>
    :  (upDown === "up" && props !== undefined && props.split(" ")[0] === "end" && myIndex === 5)
    ? <>{arrows[0]}</>
    : (upDown === "down" && props !== undefined && props.split(" ")[0] === "end" && myIndex === 5)
    ? <>{arrows[1]}</>
    : <></>
      }
    </>
  )
}

export default SortArrow
