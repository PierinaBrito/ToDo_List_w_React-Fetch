import React, { useState, useEffect } from "react";

export const Home = () => {
  const [listArray, setListArray] = useState([]);
  const [isShown, setIsShown] = useState({ state: false, index: 0 });

  const apiURL = "https://assets.4GeeksAcademy/apis/fake/todos/user/PierinaBrito";

  useEffect(() => {
    const initList = async () => {
      const response = await fetch(apiURL);
      try {
        const data = await response.json();
        setListArray(data);
      } catch (error) {
        throw new Error(error);
      }
    };
    initList();
  }, []);

  useEffect(() => {
    const updateList = async () => {
      const response = await fetch(apiURL, {
        method: "PUT", // or 'POST'
        body: JSON.stringify(listArray), // data can be `string` or {object}!
        headers: {
          "Content-Type": "application/json",
        },
      });
      try {
        const data = await response.json();
        console.log("Success:", JSON.stringify(data));
      } catch (error) {
        throw new Error(error);
      }
    };
    updateList();
  }, []);

  const addItem = (event) => {
    if (event.keyCode === 13) {
      let userInput = { label: event.target.value, done: false };
      const newTodo = [...listArray, userInput];
      setListArray(newTodo);
      console.log(newTodo);
      event.target.value = "";
    }
  };

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
    setListArray(newArray);
  };

  let createdList = listArray.map((item, i) => {
    return (
      <li
        className="list-group-item"
        key={i}
        onMouseEnter={() => setIsShown({ state: true, index: i })}
        onMouseLeave={() => setIsShown({ state: false, index: 0 })}
      >
        <span className={`py-4 mt-2 ${item.done && "doneTask"}`}>
          {item.label}
        </span>

        {isShown.state === true && isShown.index === i ? (
          <>
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
          </>
        ) : (
          ""
        )}
      </li>
    );
  });

  return (
    <div className="col-8 mx-auto p-2">
      <h1 className="text-center">To Do List</h1>
      <input
        className="w-100 mb-2 rounded"
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
          {listArray.length}
          {listArray.length === 1 ? " item" : " items"} left
        </li>
      </ul>
    </div>
  );
};