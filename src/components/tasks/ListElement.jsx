import React from 'react'

const ListElement = ({task}) => {
    
    const changeEditTask = async (item) => {
        setFormMode(true)
        setTask(item.name)
        setId(item.id)
      }
      
    const deleteTask = async (id) => {
        try {
            await db.collection('tasks').doc(id).delete()
            const auxTasks = tasks.filter(item => item.id !== id )
            setTasks(auxTasks)
        } catch (error) {
            console.error(error)
        }
    }
    
    return (
        <>
            <li key={task.id} className='list-group-item'>
                {task.name}
                <button className="btn btn-warning float-right mx-2" onClick={ () => changeEditTask(task) } >Edit</button>
                <button className="btn btn-danger float-right" onClick={ () => deleteTask(task.id) } >Delete</button>
            </li>
        </>
    )
}

export default ListElement
