export function handleFormChange(event, setFormData) {
  const { name, value, type, checked } = event.target
  setFormData((prevFormData) => {
    return {
      ...prevFormData,
      [name]: type === "checkbox" ? checked : value,
    }
  })
}
