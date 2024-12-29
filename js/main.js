import {
  show_popup,
  toogle_height_date,
  toogle_height_intervals,
} from "./modules/popup.js";
import { save_task } from "./modules/storage.js";
import { render_tasks } from "./modules/render.js";

document.addEventListener("DOMContentLoaded", () => {
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

  complete_tasks.addEventListener("click", filter_tasks);
  incomplete_tasks.addEventListener("click", filter_tasks);

  function filter_tasks(el) {
    const container = document.querySelector(".div"); // Substitua pelo container real das tarefas
    const tasks = JSON.parse(localStorage.getItem("tasks")) || [];

    if (
      el.target.innerText === "Completos" ||
      el.target.classList.contains("fa-square-check")
    ) {
      // Filtra tarefas que estão completas
      const completed_tasks = tasks.filter((task) => task.checkbox?.checked);
      render_tasks(container, completed_tasks); // Renderiza as tarefas completas
    } else if (
      (el.target.innerText === "Incompletos",
      el.target.classList.contains("fa-square-xmark"))
    ) {
      // Filtra tarefas que estão incompletas
      const incomplete_tasks = tasks.filter((task) => !task.checkbox?.checked);
      render_tasks(container, incomplete_tasks); // Renderiza as tarefas incompletas
    } else {
      // Renderiza todas as tarefas (sem filtro)
      render_tasks(container);
    }
  }

  /* Configurações iniciais */
  content.style.height = "700px";
  navigation.style.height = "700px";

  add_btn.addEventListener("click", () => {
    if (task_name.value != "") {
      show_popup(box_popup);
    } else {
      alert("Preencha o nome da tarefa!");
    }
  });

  /* Exibe o popup */

  /* Exibe os inputs do popup após evento de click */
  add_date_btn.addEventListener("click", () => toogle_height_date(box_date));
  add_intervals_btn.addEventListener("click", () =>
    toogle_height_intervals(box_intervals)
  );

  /* Salva tarefa no localStorage e renderiza */
  save_btn.addEventListener("click", () => {
    const task_data = {
      task_name: task_name.value,
      task_date: task_date.value,
      task_time: task_time.value,
      task_intervals: task_intervals.value,
      task_times: task_times.value,
    };

    save_task(task_data); // Salva tarefa no localStorage
    render_tasks(document.querySelector(".div")); // Atualiza a lista de tarefas exibida
    show_popup(box_popup); // Fecha o popup
  });

  /* Fecha o popup */
  close_btn.addEventListener("click", () => show_popup(box_popup));

  /* Configurações responsivas para dispositivos móveis */
  if (window.innerWidth <= 750) {
    const nav = document.querySelector(".navigation");

    nav.querySelector(".navigation-title-box").innerHTML =
      '<i class="fa-solid fa-bars"></i>';

    nav
      .querySelectorAll(".navigation-elements-box span")
      .forEach((el) => (el.style.display = "none"));

    document
      .querySelector(".navigation-title-box")
      .addEventListener("click", () => {
        if (nav.style.width !== "90%") {
          nav.style = "width: 90%; height: 700px;";

          content.style =
            "position: absolute; z-index: -1; height: 700px; width: 80%; left: 70px";

          nav
            .querySelectorAll(".navigation-elements-box span")
            .forEach((el) => (el.style.display = "flex"));

          nav.querySelector(".navigation-title-box").innerHTML =
            '<h2>Navegação</h2> <i class="fa-regular fa-circle-xmark"></i>';
        } else {
          nav.style = "width: 60px; height: 700px; position: relative";

          nav
            .querySelectorAll(".navigation-elements-box span")
            .forEach((el) => (el.style.display = "none"));

          nav.querySelector(".navigation-title-box").innerHTML =
            '<i class="fa-solid fa-bars"></i>';
        }
      });
  }

  /* Renderiza tarefas ao carregar a página */
  render_tasks(document.querySelector(".div"));

  // Seleciona todos os itens de tarefa
  const tasks = document.querySelectorAll(".task-item");

  tasks.forEach((task) => {
    // Seleciona o título de cada tarefa
    const taskTitle = task.querySelector("h3");

    // Adiciona evento ao título da tarefa
    taskTitle.addEventListener("click", (event) => {
      const taskContainer = event.target.parentNode.parentNode;

      // Salva o conteúdo original da tarefa
      const originalTaskContent = task.innerHTML;

      // Verifica se já está em modo "popup"
      if (!taskContainer.classList.contains("popup-fullscreen")) {
        // Adiciona a classe de popup fullscreen
        taskContainer.classList.add("popup-fullscreen");

        // Cria o botão "Fechar"
        const closeButton = document.createElement("button");
        closeButton.classList.add("btn-close-task");
        closeButton.innerText = "Fechar";
        taskContainer.append(closeButton);

        // Adiciona evento ao botão "Fechar"
        closeButton.addEventListener("click", () => {
          taskContainer.classList.remove("popup-fullscreen");
          closeButton.remove()
        });
      }

      // Remove a classe "task-title" do título atual, se existir
      const activeTitle = document.querySelector(".task-item h3.task-title");
      if (activeTitle) {
        activeTitle.classList.remove("task-title");
      }

      // Adiciona a classe ao título clicado
      taskTitle.classList.add("task-title");

      // Debug: mostra informações no console
      console.log("Elemento clicado:", event.target);
      console.log("Nó pai:", event.target.parentNode);
      console.log("Nó avô:", taskContainer);
    });
  });
});