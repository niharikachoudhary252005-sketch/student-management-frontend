// import { useEffect, useState } from 'react'
// import './App.css'
// import axios from 'axios'

// function App() {

//   // hook fucntion
//   const BASE_URL = 'http://127.0.0.1:8000'
//   const [id, setId] =useState('')
//   const [name, setName] = useState('')
//   const [course, setCourse] = useState('')

//   function handleId(event) {
//     setId(event.target.value)
//     // console.log(event.target.value)
//     // console.log('Input is changed')
//   }

//   function handleName(event) {
//     setName(event.target.value)
    
//   }
//   function handleCourse(event) {
//     setCourse(event.target.value)
    
//   }

//   console.log(id, name, course)

//   async function fetchStudentData(){
//     const response=await axios.get(BASE_URL + '/students')
//     // console.log(response.data)
//     // id :id,
//     // name: name,
//     // course: course
//   }

// useEffect(() => {
//   fetchStudentData()
// }, [])

//   return (
//     <div className='container'>
//        <h1>Student Management System</h1>
//        <form className='student-form'>
//         <input type="number" placeholder='Student ID' onChange={handleId}/>
//         <input type="Char" placeholder='Student Name' onChange={handleName}/>
//         <input type="Char" placeholder='Student Course' onChange={handleCourse}/>
//         <button>Submit</button>
//        </form>
//        <table>
//         <thead>
//           <tr>
//             <th>ID</th>
//             <th>Name</th>
//             <th>Course</th>
//             <th>Edit</th>
//             <th>Delete</th>
//           </tr>
//         </thead>
//         <tbody></tbody>
//        </table>
      
//     </div>
   
//   )
// }

// export default App


import { useEffect, useState } from 'react'
import './App.css'
import axios from 'axios'
function App(){
  const BASE_URL ='http://127.0.0.1:8000'

  const [id,setId] = useState('')
  const [name,setName] = useState('')
  const [course,setCourse] = useState('')
  const[student,setStudents] = useState([])
  const [isEdit, setIsEdit] = useState(false)
  const [editId , setEditId] = useState('')

  function handleId(event){
    setId(event.target.value)
  }

  function handleName(event){
    setName(event.target.value)
  }

  function handleCourse(event){
    setCourse(event.target.value)
  }
  async function fetchStudentData(){
    const response = await axios.get(BASE_URL + '/students')
    setStudents(response.data)
  }
  useEffect(() => {
    fetchStudentData()
  },[])

  async function sendData(){
    if(isEdit === true){
      const response = await axios.put(BASE_URL + '/students/' + editId, {
      id: id,
      name: name,
      course: course
    })
    window.alert(response.data.message)
    } else {

    const response = await axios.post(BASE_URL + '/students', {
      id: id,
      name: name,
      course: course
    })
    window.alert(response.data.message)
  }
}

function editStudent(student) {
  setId(student.id)
  setName(student.name)
  setCourse(student.course)
  setIsEdit(true)
  setEditId(student.id)

}

async function deleteStudent(student) {
  const response =  await axios.delete(BASE_URL + '/students/' + student.id)
  window.alert(response.data.message)
}

  return(
    <div className='container'>
      <h1>Student Management System</h1>
      <form className='student-form'>
        <input type="number" placeholder='Student ID' onChange={handleId} value={id}/>
        <input type="text" placeholder='Student Name' onChange={handleName} value={name}/>
        <input type="text" placeholder='Student Course' onChange={handleCourse} value={course}/>
        <button onClick={sendData}>{isEdit ? 'Update' : 'Submit'}</button>
      </form>
      <table>
        <thead>
          <tr>
            <th>ID</th>
            <th>Name</th>
            <th>Course</th>
            <th>Edit</th>
            <th>Delete</th>
          </tr>
        </thead>
        <tbody>
          { student.map((student) => {
            return(
              <tr key={student.id}>
                <td>{student.id}</td>
                <td>{student.name}</td>
                <td>{student.course}</td>
                <td><button className='edit-btn' onClick={() => {editStudent(student)}}>Edit</button></td>
                <td><button className='delete-btn'onClick={()=>(deleteStudent(student))}>Delete</button></td>
                
            
              </tr>
            )
          })}
          
          
        </tbody>
      </table>
    </div>
  )
}

export default App