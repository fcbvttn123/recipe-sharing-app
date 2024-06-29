export function Avatar({ children }) {
  return (
    <div
      className={`grid place-content-center w-10 h-10 rounded-full ${getRandomBackgroundColor()}`}
    >
      {children}
    </div>
  )
}

function getRandomBackgroundColor() {
  let bgColorClassName = null
  const bgColorList = ["red", "green", "orange", "pink"]
  const randomIndex = Math.floor(Math.random() * bgColorList.length)
  if (bgColorList[randomIndex] == "red") {
    bgColorClassName = "bg-red-300"
  } else if (bgColorList[randomIndex] == "green") {
    bgColorClassName = "bg-green-300"
  } else if (bgColorList[randomIndex] == "orange") {
    bgColorClassName = "bg-orange-300"
  } else if (bgColorList[randomIndex] == "pink") {
    bgColorClassName = "bg-pink-300"
  }
  return bgColorClassName
}
