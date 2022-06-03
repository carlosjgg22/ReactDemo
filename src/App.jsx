import React, { Fragment, useState, useRef, useEffect } from 'react'; 
import { v4 as uuidv4 } from 'uuid';
import { TodoList } from './components/TodoList';

const KEY = 'todoApp.todos'
export function App(){
    const todoTaskRef = useRef(null);

    const toggleTodo=(id)=>{
        //hacer una copia de un arreglo 
        const newTodos=[...todos];
        //buscar el todo por el ID
        const todo= newTodos.find((todo)=>todo.id===id);
        todo.completed=!todo.completed; 
        setTodos(newTodos);
    };

    const [todos, setTodos] = useState([
        {id:1, task:"Tarea 1", completed:false}
    ]);

    //usar el local storage para almacenar tareas cuando ya otras estan almacenadas
    useEffect(()=> {
        const storedTodos =JSON.parse(localStorage.getItem(KEY)); 
        if(storedTodos){
            setTodos(storedTodos);
        }
    },[]);

    //Usar el local storage para almacenar las tareas 
        useEffect(()=>{
            localStorage.setItem(KEY, JSON.stringify(todos))
        },[todos]);

    const handleTodoAdd = () =>{
        const task = todoTaskRef.current.value;
        if(task ==='')return;
        setTodos((prevTodos)=>{
            return [...prevTodos, {id:uuidv4(), task,completed:false}]
        })
        todoTaskRef.current.value=null;
    };

    const handleClearAll = ()=>{
        const newTodos= todos.filter((todo)=>!todo.completed);
        setTodos(newTodos);
    }

    return (
        <Fragment>
            <TodoList todos={todos} toggleTodo={toggleTodo}/>
            <input type="text"  ref= {todoTaskRef} placeholder='Nueva Tarea' />
            <button onClick={handleTodoAdd}>Agregar</button>
            <button onClick={handleClearAll}>Eliminar</button>
            <div>Te quedan {todos.filter((todo)=>!todo.completed).length} tareas por completar</div>
        </Fragment>
    );
}