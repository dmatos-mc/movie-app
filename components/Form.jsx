import Link from "next/link"
import { useRouter } from "next/router"
import { useState } from "react"

const Form = ({formData, forNewMovie = true}) => {

    const router = useRouter()

    const [form, setForm] = useState({
        tittle: formData.tittle,
        plot: formData.plot,
    })



    const handleChange = e => {
        const {value, name} = e.target
        setForm({
            ...form,
            [name]: value
        })
    }


    const handleSubmit = e => {
        e.preventDefault()
        if(forNewMovie){
            postData(form)
        }else{
            putData(form)
        }
        
    };

    const putData = async (form) => {
        const { id } = router.query;
        try {
            const res = await fetch(`/api/movie/${id}`, {
                method: 'PUT',
                headers: {
                    "Content-type": "application/json"
                },
                body: JSON.stringify(form),
            });

            const data = await res.json();
            console.log(data);
            if(data.success){
                router.push("/")
            }
            
        } catch (error) {
            console.log(error)
        }
    }

    const postData = async (form) =>{
        try {
            console.log(form)
            const res = await fetch('/api/movie', {
                method: 'POST',
                headers: {
                    "Content-type": "application/json"
                },
                body: JSON.stringify(form),
            });

            const data = await res.json();
            console.log(data);
            if(data.success){
                router.push("/")
            }
        } catch (error) {
            console.log(error)
        }
    }

  return (
    <form onSubmit={handleSubmit}>
            <input 
              className="form-control my-2"
              type="text" 
              placeholder="Title"
              autoComplete="off"
              name="tittle"
              value={form.tittle}
              onChange={handleChange}
            />
            <input 
              className="form-control my-2"
              type="text" 
              placeholder="Plot"
              autoComplete="off"
              name="plot"
              value={form.plot}
              onChange={handleChange}
            />
            <button className="btn btn-primary w-100">
                {forNewMovie ? 'Agregar' : 'Editar'}
            </button>
            <Link legacyBehavior href="/">
              <a className="btn btn-warning w-100 my-2">Volver...</a>
            </Link>
          
        </form>
  )
}

export default Form
