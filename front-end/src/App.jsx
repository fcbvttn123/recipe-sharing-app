import { useEffect, useState } from "react"

function App() {
  const [file, setFile] = useState(null)
  const [title, setTitle] = useState("")
  function handleChange(e) {
    setFile(e.target.files[0])
  }
  function handleSubmit(e) {
    e.preventDefault()
    const formData = new FormData()
    formData.append("title", title)
    formData.append("image", file)
    async function post() {
      let res = await fetch("/api/recipe", {
        method: "POST",
        body: formData,
      })
      let json = await res.json()
      console.log(json)
    }
    post()
  }
  return (
    <div>
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          placeholder="Title"
          required
        />
        <input type="file" name="image" onChange={handleChange} />
        <button>Submit</button>
      </form>
    </div>
  )
}

export default App
