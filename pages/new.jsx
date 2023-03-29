import Form from "@/components/Form"
const New = () => {

  const formData = {
    tittle: '',
    plot: ''
  }

  
    

  return (
    <div className="container">
        <h1 className="my-3">Agregar Película</h1>
        <Form formData= {formData}/>
    </div>
  )
}

export default New
