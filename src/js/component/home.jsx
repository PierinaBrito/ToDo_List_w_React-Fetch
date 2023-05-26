import React, { useState, useEffect } from "react";

export const Home = () => {
  const [listArray, setListArray] = useState([]);
  const [isShown, setIsShown] = useState({ state: false, index: 0 });

  const apiURL = "https://assets.breatheco.de/apis/fake/todos/user/pierinabrito";

  const createUser = async () => {
    
    try {
      const response = await fetch(apiURL, {
        method: "POST", 
        body: JSON.stringify([]),
        headers: {
          "Content-Type": "application/json",
        },
      });
      
      if (response.ok) {
      initList()}
    } catch (error) {
      throw new Error(error);
    }
  };

  const initList = async () => {
    try {
      const response = await fetch(apiURL);
      const data = await response.json();
      if (response.status == 404) {
        createUser()
      }
      else {setListArray(data)}
    } catch (error) {
      throw new Error(error);
    }
  };

  const updateList = async (listArray) => {
    const response = await fetch(apiURL, {
      method: "PUT", // or 'POST'
      body: JSON.stringify(listArray), // data can be `string` or {object}!
      headers: {
        "Content-Type": "application/json",
      },
    });
    try {
      const data = await response.json();
      initList()
      console.log("Success:", JSON.stringify(data));
    } catch (error) {
      throw new Error(error);
    }
  };

  const addItem = (event) => {
    if (event.keyCode === 13) {
      let userInput = { label: event.target.value, done: false };
      const newTodo = [...listArray, userInput];
      updateList(newTodo);
      console.log(newTodo);
      event.target.value = "";
    }
  };

  const deleteAllTask = async () => {
    
    try {
      const response = await fetch(apiURL, {
        method: "DELETE", 
        headers: {
          "Content-Type": "application/json",
        },
      });
      
      if (response.ok) {
      initList()}
    } catch (error) {
      throw new Error(error);
    }
  };


  useEffect(() => {
    initList();
  }, []);


  const doneItem = (index) => {
    let newArray = listArray.map((item, i) => {
      if (i === index) {
        item.done = !item.done;
      }
      return item;
    });
    setListArray(newArray);
  };

  const removeItem = (index) => {
    const newArray = listArray.filter((item, i) => i !== index);
    if (newArray.length == 0) { deleteAllTask ()
    }
    else {updateList(newArray);}
    
  };

  let createdList = listArray.map((item, i) => {
    
    return (

      <li
        className="list-group-item"
        key={i}
        onMouseEnter={() => setIsShown({ state: true, index: i })}
        onMouseLeave={() => setIsShown({ state: false, index: 0 })}
      >
        <div className="d-flex justify-content-between align-items-center">
        <span className={` ${item.done && "doneTask"}`}>
          {item.label}
        </span>

        {isShown.state === true && isShown.index === i ? (
          <div>
            <button
              className="btn btn-danger float-right ml-1"
              onClick={() => removeItem(i)}
            >
              <i className="fas fa-trash-alt"></i>
            </button>
            <button
              className="btn btn-success float-right" 
              onClick={() => doneItem(i)}
            >
              <i className="fas fa-check"></i>
            </button>{" "}
          </div>
        ) : (
          ""
        )}
        </div>
      </li>
    );
  });

  return (
    <div className="col-8 mx-auto p-2">
      <h1 className="text-center">To Do List</h1>
      <input
        className="w-100 mb-2 rounded p-2"
        placeholder="Add a task here"
        type="text"
        onKeyDown={addItem}
      />
      <ul className="list-group">
        {listArray.length >= 1 ? (
          createdList
        ) : (
          <li className="list-group-item">No tasks, add a task</li>
        )}
        <li className="list-group-item p-1">
          {listArray.length -1}
          {listArray.length === 1 ? " item" : " items"} left
        </li>
      </ul>
      <button className="deleteAllTask btn btn-success float-right"
        onClick={deleteAllTask}>
        Delete All Task
      </button>
    </div>
  );
};