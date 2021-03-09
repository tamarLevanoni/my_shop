// import "./Admin.css";
// import React, { useState, useEffect } from "react";

// const Admin = () => {
//     const fetchTodos =  () => fetch("http://localhost:8000/todos")
//     .then((response) => response.json())
//     .then((data) => setTodos(data));
//     // let check = "Hello";
//     useEffect(() => {
//       fetchTodos();
//     }, []);
  
//     const addTodo = async (title) => {
//       const res = await fetch("http://localhost:8000/todos", {
//         method: "POST", // or 'PUT'
//         headers: {
//           "Content-Type": "application/json",
//         },
//         body: JSON.stringify({ title: title }),
//       });
  
//       const todo = await res.json();
      
//       setTodos([todo, ...todos]);
//     };
  
//     return (
//       <div style={{ background: theme.background }}>
//         <AddTodo onAdd={addTodo} />
//         {todos.map((todo) => (
//           <Link
//             to={`/todos/${todo._id}`}
//             key={todo._id}
//             style={{ color: theme.foreground }}
//           >
//             <Todo id={todo._id} title={todo.title} />
//           </Link>
//         ))}
//       </div>
//     );
// };
// export default Admin;
