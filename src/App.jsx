import { useEffect, useState } from "react";
import { v4 as uuidv4 } from 'uuid';
import "./App.css";
import Navbar from "./components/Navbar";


function App() {
  const [todo, settodo] = useState("");
  const [todos, settodos] = useState([]);
  const [showFinished, setshowFinished] = useState(true)

  useEffect(() => {
    let todoString = localStorage.getItem("todos")
    if(todoString){
      let todos = JSON.parse(localStorage.getItem("todos"))
      settodos(todos)
    }
  }, [])
  

  const saveToLs = (params) => { 
    localStorage.setItem("todos",JSON.stringify(todos))
   }
   const toggleFinished = (e) => {
    setshowFinished(!showFinished)
  }
  const handleEdit = (e,id) => {
    let t = todos.filter(i=>i.id === id)
    settodo(t[0].todo)
    let newtodos = todos.filter(item=>{
      return item.id!==id;
    });
    settodos(newtodos)
    saveToLs()
  };
  const handleDelete = (e,id) => {
let newtodos = todos.filter(item=>{
  return item.id!==id;
});
settodos(newtodos)
saveToLs()
  };
  const handleAdd = () => {
    settodos([...todos, { id:uuidv4(), todo, isCompleted: false }]);
    settodo("");
    console.log(todos)
    saveToLs()
  };
  const handleChange = (e) => {
    settodo(e.target.value);
  };
  const handleCheckbox = (e) => {
    let id = e.target.name;
    let index = todos.findIndex(item=>{
      return item.id === id;
  })
let newtodos = [...todos];
newtodos[index].isCompleted = !newtodos[index].isCompleted;
settodos(newtodos)
saveToLs()
}
  return (
    <>
      <Navbar />
      <div className="container mx-auto flex flex-col h-auto min-h-[80vh] w-[80%] my-8 bg-black bg-opacity-5 shadow-2xl border-opacity-50 border-black">
        <div className="mt-5 p-3 rounded-xl text-xl font-extrabold flex">
          Your Todo List
          <input
            onChange={handleChange}
            value={todo}
            type="text"
            className="you justify-between ml-36 w-[60%] px-2 rounded-xl"
            placeholder="Add your Todo here"
          />
          <button
            onClick={handleAdd} disabled={todo.length<=3}
            className="p-1 ml-16 bg-purple-950 text-white px-6 rounded-xl cursor-pointer"
          >
            Add
          </button>
        </div>
       
        <div className="todos">
          <div className="font-bold text-lg">
        <input className='mx-10' onChange={toggleFinished} type="checkbox" checked={showFinished} />Show Finished</div>
          {todos.length==0 && <div className="text-center m-8">No Todos to Display</div>}
          {todos.map((item) => {
            return (showFinished || !item.isCompleted) && <div key={item.id} className="todo flex px-20 py-2 my-1 gap-5">
              <input onChange={handleCheckbox}
              type="checkbox" checked={item.isCompleted} name={item.id} id="" />
              <div className={item.isCompleted?"task w-[60%] bg-green-400 px-5 rounded-xl":"task w-[60%] bg-white px-5 rounded-xl"}>
              <div className={item.isCompleted?"line-through":""}>{item.todo}</div></div>
              <div className="button">
                <button
                  onClick={(e)=>handleEdit(e,item.id)}
                  className="p-1 mx-5 text-sm  bg-purple-950 text-white px-3 rounded-lg cursor-pointer"
                >
                  Edit
                </button>
                <button
                  onClick={(e)=>{handleDelete(e,item.id)}}
                  className="p-1 text-sm  bg-purple-950 text-white px-3 rounded-lg cursor-pointer"
                >
                  Delete
                </button>
              </div>
            </div>;
          })}
        </div>
      </div>
    </>
  );
}

export default App;
