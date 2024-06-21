function App() {
  function handleChange(e) {
    console.log(e.target.files[0])
  }
  function handleSubmit(e) {
    e.preventDefault()
  }
  return (
    <div>
      <form onSubmit={handleSubmit}>
        <input type="file" name="file" id="file" onChange={handleChange} />
        <button>Submit</button>
      </form>
    </div>
  )
}

export default App
