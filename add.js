import React, { useState } from 'react'
import '../css/Addpost.css'
import axios from 'axios'
import 'react-toastify/dist/ReactToastify.css';
import { useNavigate } from 'react-router-dom';
import { ToastContainer, toast } from 'react-toastify'

function Addposts() {
   const [file, setFile] = useState('')
   const addItem = (e) => {
     e.preventDefault()
     console.log(file)
    
   }
   
  const [addposts, setAddposts] = useState({

   Title: '',
   Email: '',
   Authorname: '',
   Description: '',
   Image: ''
 })
 console.log(file, addposts);
 const inputChange = (event) => {
   const { name, value } = event.target
   setAddposts({ ...addposts, [name]: value })
 }

 const navigate = useNavigate()

 const [formError, setFormError] = useState({})
  console.log(formError);
  const validate = (values) => {

    var error = {}


    if (!values.Title) {
      error.Title = "Enter Title"
    }
    if (!values.Email) {
      error.Email = "Enter Email"
    }
    if (!values.Authorname) {
      error.Authorname = "Enter Authorname"
    }
    if (!values.Description) {
      error.Description = "Enter Description"
    }
    if (!values.Image) {
      error.Image = "choose profile pic"
    }


    return error
  }
  const submit = (event) => {
   event.preventDefault() //page reload aavathe irikan
   setFormError(validate(addposts))
   if (Object.keys(formError).length == 0) { //errors undo ille check aakan,ethra length undennum



      
       const data = new FormData()
       const filename = file.name
       data.append("filename",filename)
       data.append("file", file)
       data.append("Title", addposts.Title)
       data.append("Email", addposts.Email)
       data.append("Authorname", addposts.Authorname)
       data.append("Description", addposts.Description)
       data.append("Image", addposts.Image)
 
 
     


     // to connect react and node
     axios.post("http://localhost:5000/posts/addpost", data).then((response) => {

       console.log(response);

       toast.success(response, {
         position: "top-right",
         autoClose: 5000,
         hideProgressBar: false,
         closeOnClick: true,
         pauseOnHover: true,
         draggable: true,
         progress: undefined,
         theme: "light",
       });



     }).catch((error) => {

       console.log(error);
       toast.error(error.response, {
         position: "top-center",
         autoClose: 5000,
         hideProgressBar: false,
         closeOnClick: true,
         pauseOnHover: true,
         draggable: true,
         progress: undefined,
         theme: "colored",
       });
     })








   }

 }












    
  return (
    <div>
      <section class="get-in-touch">
   <h1 class="title">Add Post</h1>
   <form class="contact-form row">
      <div class="form-field col-lg-6">
         <input id="name" class="input-text js-input" type="text" name="Title" 
         onChange={inputChange} onClick={() => { setFormError({ ...formError, Title: "" }) }}
          />
         <label class="label" for="name">Title Name</label>
      </div>
      <div class="form-field col-lg-6 ">
         <input id="email" class="input-text js-input" type="email" name="Email" 
         onChange={inputChange} onClick={() => { setFormError({ ...formError, Email: "" }) }}
          />
         <label class="label" for="email">E-mail</label>
      </div>
      <div class="form-field col-lg-6 ">
         <input id="company" class="input-text js-input" type="text" name="Authorname" 
         onChange={inputChange} onClick={() => { setFormError({ ...formError, Authorname: "" }) }}
      />
         <label class="label" for="company">Author Name</label>
      </div>
      <div class="form-field col-lg-12">
        <input type="file" id="myFile" name="Image" onChange={(event) => { console.log(event.target.files); setFile(event.target.files[0]); setAddposts({ ...addposts, 'Image': event.target.files[0].name }) }} onClick={() => { setFormError({ ...formError, Image: "" }) }}></input>

      </div>
      
      <div class="form-field col-lg-12">
         <input id="message" class="input-text js-input" type="text"name="Description" 
         onChange={inputChange} onClick={() => { setFormError({ ...formError, Description: "" }) }}
          />
         <label class="label" for="message">Description</label>
      </div>
      <div class="form-field col-lg-12">
         <input onClick={submit} class="submit-btn" type="submit"/>
      </div>
   </form>
</section>
<ToastContainer/>
    </div>
  )
}

export default Addposts
const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  
    <BrowserRouter>
    <Routes>
      <Route path='/' element={<Home/>}/>
      </Routes>
      </BrowserRouter>
)