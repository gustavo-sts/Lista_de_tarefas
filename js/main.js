import {
  show_popup,
  toogle_height_date,
  toogle_height_intervals,
} from "./modules/popup.js";
import { save_task } from "./modules/storage.js";
import { render_tasks } from "./modules/render.js";

const setStyles = (element, styles) => {
  Object.entries(styles).forEach(([key, value]) => {
    element.style[key] = value;
  });
};

const addEvent = (element, event, handler) =>
  element.addEventListener(event, handler);

const initializeApp = () => {
  const navigation = document.querySelector(".navigation");
  const content = document.querySelector(".content");
  const add_btn = document.querySelector("#plus");
  const box_popup = document.querySelector(".popup");

  const add_date_btn = document.querySelector("#add-date");
  const add_intervals_btn = document.querySelector("#add-intervals");
  const box_date = document.querySelector("#date-box");
  const box_intervals = document.querySelector("#intervals-box");

  const save_btn = document.querySelector("#save-btn");
  const close_btn = document.querySelector("#close-btn");

  const task_name = document.querySelector("#task-name");
  const task_date = document.querySelector("#date");
  const task_time = document.querySelector("#time");
  const task_intervals = document.querySelector("#intervals");
  const task_times = document.querySelector("#until");

  const complete_tasks = document.querySelector("#complete");
  const incomplete_tasks = document.querySelector("#incomplete");

  const filterTasks = (tasks, condition) => tasks.filter(condition);

  const handleFilterTasks = (el) => {
    const container = document.querySelector(".div");
    const tasks = JSON.parse(localStorage.getItem("tasks")) || [];

    const isCompleteFilter =
      el.target.innerText === "Completos" ||
      el.target.classList.contains("fa-square-check");
    const isIncompleteFilter =
      el.target.innerText === "Incompletos" ||
      el.target.classList.contains("fa-square-xmark");

    const filteredTasks = isCompleteFilter
      ? filterTasks(tasks, (task) => task.checkbox?.checked)
      : isIncompleteFilter
      ? filterTasks(tasks, (task) => !task.checkbox?.checked)
      : tasks;

    render_tasks(container, filteredTasks);
  };

  const enableTaskPopup = () => {
    const tasks = document.querySelectorAll(".task-item");
    tasks.forEach((task) => {
      const taskTitle = task.querySelector("h3");

      addEvent(taskTitle, "click", (event) => {
        const taskContainer = event.target.parentNode.parentNode.parentNode;

        if (!taskContainer.classList.contains("popup-fullscreen")) {
          taskContainer.classList.add("popup-fullscreen");

          const closeButton = document.createElement("button");
          closeButton.classList.add("btn-close-task");
          closeButton.innerText = "Fechar";
          taskContainer.append(closeButton);

          addEvent(closeButton, "click", () => {
            taskContainer.classList.remove("popup-fullscreen");
            closeButton.remove();
          });
        }

        const activeTitle = document.querySelector(".task-item h3.task-title");
        if (activeTitle) activeTitle.classList.remove("task-title");

        taskTitle.classList.add("task-title");
      });
    });
  };

  // Configuração inicial de estilos
  setStyles(content, { height: "700px" });
  setStyles(navigation, { height: "700px" });

  // Configuração de eventos principais
  addEvent(add_btn, "click", () => {
    task_name.value
      ? show_popup(box_popup)
      : alert("Preencha o nome da tarefa!");
  });

  addEvent(add_date_btn, "click", () => toogle_height_date(box_date));
  addEvent(add_intervals_btn, "click", () =>
    toogle_height_intervals(box_intervals)
  );

  addEvent(save_btn, "click", () => {
    const task_data = {
      task_name: task_name.value,
      task_date: task_date.value,
      task_time: task_time.value,
      task_intervals: task_intervals.value,
      task_times: task_times.value,
    };

    save_task(task_data);
    render_tasks(document.querySelector(".div"));
    enableTaskPopup(); // Reaplica os eventos às tarefas
    show_popup(box_popup);
  });

  addEvent(close_btn, "click", () => show_popup(box_popup));

  addEvent(complete_tasks, "click", handleFilterTasks);
  addEvent(incomplete_tasks, "click", handleFilterTasks);

  // Configurações responsivas
  if (window.innerWidth <= 750) {
    
    const nav = document.querySelector(".navigation");

    nav.querySelector(".navigation-title-box").innerHTML =
      '<i class="fa-solid fa-bars"></i>';
    
          nav
            .querySelectorAll(".navigation-elements-box span")
            .forEach((el) => {
              el.style.display = "none";
            });
    
    const toggleNavigation = () => {
      const isExpanded = nav.style.width == "90%";

      setStyles(nav, {
        width: isExpanded ? "60px" : "90%",
        height: "700px",
        position: isExpanded ? "relative" : "",
      });

      const contentStyles = isExpanded
        ? {}
        : {
            position: "absolute",
            zIndex: "-1",
            height: "700px",
            width: "80%",
            left: "70px",
          };
      setStyles(content, contentStyles);

      nav.querySelectorAll(".navigation-elements-box span").forEach((el) => {
        el.style.display = isExpanded ? "none" : "flex";
      });

      nav.querySelector(".navigation-title-box").innerHTML = isExpanded
        ? '<i class="fa-solid fa-bars"></i>'
        : '<h2>Navegação</h2> <i class="fa-regular fa-circle-xmark"></i>';
    };

    addEvent(
      nav.querySelector(".navigation-title-box "),
      "click",
      toggleNavigation
    );
  }

  // Renderizar tarefas ao carregar
  render_tasks(document.querySelector(".div"));
  enableTaskPopup(); // Reaplica eventos às tarefas
};

document.addEventListener("DOMContentLoaded", initializeApp);
