import { useState } from "react";
import "./App.css";
import { TaskType, Todolist } from "./Todolist";
import { v1 } from "uuid";

export type FilterValuesType = "all" | "active" | "completed";
type TodolistType = { id: string; title: string };
type TasksType = {
  [key: string]: DataFilterType;
};
type DataFilterType = {
  data: TaskType[];
  filter: FilterValuesType;
};

export const App = () => {
  let todolistId1 = v1();
  let todolistId2 = v1();

  let [todolists, setTodolists] = useState<Array<TodolistType>>([
    { id: todolistId1, title: "What to learn" },
    { id: todolistId2, title: "What to buy" },
  ]);

  let [tasks, setTasks] = useState<TasksType>({
    [todolistId1]: {
      data: [
        { id: v1(), title: "HTML&CSS1111", isDone: true },
        { id: v1(), title: "JS1111", isDone: true },
      ],
      filter: "all",
    },
    [todolistId2]: {
      data: [
        { id: v1(), title: "HTML&CSS22222", isDone: true },
        { id: v1(), title: "JS2222", isDone: true },
      ],
      filter: "all",
    },
  });

  const removeTodolist = (todolistId: string) => {
    setTodolists(todolists.filter((el) => el.id !== todolistId));
    delete tasks[todolistId];
    console.log(tasks);
  };

  function removeTask(todolistId: string, taskId: string) {
    setTasks({
      ...tasks,
      [todolistId]: {
        ...tasks[todolistId],
        data: tasks[todolistId].data.filter((el) => el.id !== taskId),
      },
    });
  }

  function addTask(todolistId: string, title: string) {
    let newTask: TaskType = { id: v1(), title: title, isDone: false };
    setTasks({
      ...tasks,
      [todolistId]: {
        ...tasks[todolistId],
        data: [...tasks[todolistId].data, newTask],
      },
    });
  }

  function changeStatus(
    todolistId: string,
    taskId: string,
    newIsDone: boolean
  ) {
    setTasks({
      ...tasks,
      [todolistId]: {
        ...tasks[todolistId],
        data: tasks[todolistId].data.map((el) =>
          el.id === taskId ? { ...el, isDone: newIsDone } : el
        ),
      },
    });
  }

  function changeFilter(todolistId: string, value: FilterValuesType) {
    setTasks({
      ...tasks,
      [todolistId]: { ...tasks[todolistId], filter: value },
    });
  }

  return (
    <div className="App">
      {todolists.map((el) => {
        let tasksForTodolist = tasks[el.id].data;
        if (tasks[el.id].filter === "active") {
          tasksForTodolist = tasks[el.id].data.filter(
            (t) => t.isDone === false
          );
        }
        if (tasks[el.id].filter === "completed") {
          tasksForTodolist = tasks[el.id].data.filter((t) => t.isDone === true);
        }
        return (
          <Todolist
            key={el.id}
            todolistId={el.id}
            title={el.title}
            tasks={tasksForTodolist}
            removeTask={removeTask}
            changeFilter={changeFilter}
            addTask={addTask}
            changeTaskStatus={changeStatus}
            filter={tasks[el.id].filter}
            removeTodolist={removeTodolist}
          />
        );
      })}
    </div>
  );
};
