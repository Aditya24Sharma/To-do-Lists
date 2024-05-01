import React,{useState, useRef} from 'react'
import {BiCheckSquare, BiSolidTrash, BiPlayCircle, BiPauseCircle} from "react-icons/bi"


function Tasks(){
    // const [task, setTask] = useState('');
    const [tasksList, setTaskLists] = useState([]);
    // const [taskcomplete, setTaskComplete] = useState([]);
    const inputRef = useRef(null);

    const handleTaskChange = (event) => {
        event.preventDefault();
        const newTask = inputRef.current.value;
        // setTask(newTask);
        if(newTask !== ''){
            setTaskLists(prevTasks =>[...prevTasks, {task: newTask, completed:false, started:false}]);
        }
        inputRef.current.value='';
    }

    const removeTask = (index) =>{
        setTaskLists(prevTasks => prevTasks.filter((_, i) => i !== index));
    }

    const taskTimer =(index) =>{
        console.log('Timer Clicked')
        setTaskLists(prevTasks=>{
            return prevTasks.map((task, i) =>{
                if(i===index){
                    return{...task, started: !task.started};
                }
                return task;
            })
        })
    }

    const completedTask = (index) =>{
        console.log('Task Completed')
        setTaskLists(prevTasks=>{
            return prevTasks.map((task,i)=>{
                if (i===index){
                    return {...task, completed: !task.completed, started: false};
                }
                return task;
            })
        })

    }

    return(
        <div className='container'>
            <div className='input-container'>
                <form onSubmit={handleTaskChange}>
                    <input 
                    ref={inputRef}
                    type='text' 
                    placeholder='Enter your task'/>
                    <button type='submit'>Add Tasks</button>
                </form>
            </div>
            <div className='bar'></div>
            <div className='output-container'>
                <ul>
                    {tasksList.map((task, taskindex)=>(
                        <li 
                        key={taskindex}
                        className = {`userTask ${task.completed ? 'completedTask' : ''}`}>
                            <div className='userTask'>{task.task}</div>
                            <div className='taskButtons'>
                                <div className='startTask' onClickCapture={()=>taskTimer(taskindex)}>
                                    {task.started ? <BiPauseCircle/> : <BiPlayCircle/>}
                                </div>
                                <div className='delete' onClick={() => removeTask(taskindex)}>
                                    <BiSolidTrash/>                                
                                </div>
                                <div className='completed' onClick={() => completedTask(taskindex)}>
                                    <BiCheckSquare/>
                                </div>
                            </div>
                        </li>
                    ))}
                </ul>
            </div>
        </div>
    )
}

export default Tasks;