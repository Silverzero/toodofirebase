import React from 'react'
import {db, auth} from '../firebase'
import { withRouter } from "react-router-dom";

const TasksPage = (props) => {
    
    const {session} = props

    // Hooks
    const [tasks, setTasks] = React.useState([])
    const [task, setTask] = React.useState('')
    const [formMode, setFormMode] = React.useState(false)
    const [id, setId] = React.useState('');
    
    // Functions
    const getTasks = async () => {
        try {
            const data = await db.collection(session.uid).get()
            const dataArray = data.docs.map( doc => ({id: doc.id, ...doc.data() }))
            setTasks(dataArray)
        } catch (error) {
            console.error(error);
        }
    }

    // Crud
    const addTask = async (e) => {
        e.preventDefault()
        try {
            const newTask = {name:task, date: Date.now(), deleted: false}
            const data = await db.collection(session.uid).add(newTask)
            const item = {...newTask, id: data.id}
            setTasks([
                ...tasks, 
                item
            ])
        } catch (error) {
            console.error(error);
        }
    }
  
    const changeEditTask = async (item) => {
        setFormMode(true)
        setTask(item.name)
        setId(item.id)
    }
  
    const deleteTask = async (id) => {
        try {
            await db.collection(session.uid).doc(id).delete()
            const auxTasks = tasks.filter(item => item.id !== id )
            setTasks(auxTasks)
        } catch (error) {
            console.error(error)
        }
    }

    const editTask = async (e) => {

        e.preventDefault()

        try {
            await db.collection(session.uid).doc(id).update({ name: task })
            const auxTasks = tasks.map(item => (item.id === id ? {...item, name: task} : item) )
            setTasks(auxTasks)
        } catch (error) {
            console.error(error)
        }
        setTask('')
        setId('')
        setFormMode(false)
    }

    React.useEffect( () => {
        session ? getTasks() : props.history.push('/login')
    },[session, props.history])
    
    return (
        <div className="container mt-5">
            <div className="row">
                <div className="col-md-6">
                    <h3>Lista de Tareas</h3>
                    <ul className='list-group' >
                        {
                        tasks.map((task) => (
                            <li key={task.id} className='list-group-item'>
                            {task.name}
                            <button className="btn btn-warning float-right mx-2" onClick={ () => changeEditTask(task) } >Edit</button>
                            <button className="btn btn-danger float-right" onClick={ () => deleteTask(task.id) } >Delete</button>
                            </li>
                        ))
                        }
                    </ul>
                    </div>
                    <div className="col-md-6">
                    <h3>{ formMode ? 'Edit Task' : 'Add Task' }</h3>
                    <form onSubmit={ formMode ? editTask : addTask } >
                        <input type="text" placeholder="Insert name" value={task} onChange={e => setTask(e.target.value)} className="form-control mb-2"/>
                        { formMode ?
                            <button className="btn btn-warning btn-block">Edit</button> :
                            <button className="btn btn-dark btn-block">Add</button>
                        }
                    </form>
                </div>
            </div>
        </div>
    )
}

export default withRouter(TasksPage)
