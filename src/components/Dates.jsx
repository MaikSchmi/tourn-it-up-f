function Dates({children}) {

  const convertDate = (date) => {
    const newDate = date.split("T")[0];
    const newTime = date.split("T")[1];
    return newDate.split("-").reverse().join("-") + " at: " + newTime;
  }

  return (
    <>
      {convertDate(children)}
    </>
  )
}

export default Dates
