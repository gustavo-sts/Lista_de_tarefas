export function render_tasks(container, tasks_to_render = null) {
  // Limpa o container antes de renderizar as tarefas
  container.innerHTML = "";

  // Recupera as tarefas do localStorage se nenhuma lista for passada
  const saved_tasks = localStorage.getItem("tasks");
  const tasks = tasks_to_render || (saved_tasks ? JSON.parse(saved_tasks) : []);

  // Verifica se há tarefas
  if (tasks.length === 0) {
    container.innerHTML = "<li>Nenhuma tarefa encontrada.</li>";
    return;
  }

  // Renderiza cada tarefa
  tasks.forEach((task) => {
    const task_item = document.createElement("li");
    task_item.classList.add("task-item");

    const isMobile = window.innerWidth <= 750;
    const truncated_task_name = isMobile
      ? task.task_name.split(" ").slice(0, 2).join(" ") + "..."
      : task.task_name;

    task_item.innerHTML = `
      <div class="task-content">
        <div>
          <input type="checkbox" ${
            task.checkbox?.checked ? "checked" : ""
          } data-id="${task.task_id}">
          <h3 class="task-title">${
            task.task_date
              ? isMobile
                ? truncated_task_name
                : task.task_name + " - "
              : task.task_name
          } </h3>
        </div>
        
        <p class="data-view">${task.task_date || ""}</p>
        <p class="time-view">${
          task.task_time ? "<strong>às </strong>" + task.task_time : ""
        }</p>
      </div>
      <button class="delete-btn fa-solid fa-trash" data-id="${
        task.task_id
      }"></button>
    `;

    // Adiciona evento para excluir a tarefa
    const delete_btn = task_item.querySelector(".delete-btn");
    delete_btn.addEventListener("click", () => {
      delete_task(task.task_id);
      render_tasks(container); // Atualiza a lista após exclusão
    });

    // Evento para alternar o status
    const checkbox = task_item.querySelector("input[type='checkbox']");
    checkbox.addEventListener("change", () => {
      toggle_status(task.task_id);
      render_tasks(container);
    });

    container.appendChild(task_item);

    // Evento para exibir o nome completo ao clicar
    task_item.querySelector("h3").addEventListener("click", () => {
      const taskContainer = task_item;
      const taskTitleText = task.task_name; // Nome completo da tarefa

      // Cria ou atualiza o pop-up com o nome completo
      const popupTitle = taskContainer.querySelector(".popup-title");
      if (!popupTitle) {
        const titleElement = document.createElement("h2");
        titleElement.classList.add("popup-title");
        titleElement.innerText = taskTitleText;
        taskContainer.appendChild(titleElement);
      }
    });
  });
}

function delete_task(task_id) {
  const saved_tasks = localStorage.getItem("tasks");
  const tasks = saved_tasks ? JSON.parse(saved_tasks) : [];

  // Filtra as tarefas para remover a tarefa com o ID correspondente
  const updated_tasks = tasks.filter((task) => task.task_id !== task_id);

  // Atualiza o localStorage
  localStorage.setItem("tasks", JSON.stringify(updated_tasks));

  alert("Tarefa excluída com sucesso!");
}

function toggle_status(task_id) {
  const saved_tasks = localStorage.getItem("tasks");
  const tasks = saved_tasks ? JSON.parse(saved_tasks) : [];

  // Atualiza o status da tarefa no array de tarefas
  const updated_tasks = tasks.map((task) => {
    if (task.task_id === task_id) {
      task.checkbox = { checked: !task.checkbox?.checked }; // Inverte o status
    }
    return task;
  });

  // Atualiza o localStorage
  localStorage.setItem("tasks", JSON.stringify(updated_tasks));
}

// export function render_tasks(container, tasks_to_render = null) {
//   // Limpa o container antes de renderizar as tarefas
//   container.innerHTML = "";

//   // Recupera as tarefas do localStorage se nenhuma lista for passada
//   const saved_tasks = localStorage.getItem("tasks");
//   const tasks = tasks_to_render || (saved_tasks ? JSON.parse(saved_tasks) : []);

//   // Verifica se há tarefas
//   if (tasks.length === 0) {
//     container.innerHTML = "<li>Nenhuma tarefa encontrada.</li>";
//     return;
//   }

//   // Renderiza cada tarefa
//   tasks.forEach((task) => {
//     const task_item = document.createElement("li");
//     task_item.classList.add("task-item");

//     const isMobile = window.innerWidth <= 750;
//     const truncated_task_name = isMobile
//       ? task.task_name.split(" ").slice(0, 2).join(" ") + "..."
//       : task.task_name;

//     task_item.innerHTML = `
//       <div class="task-content">
//         <div>
//           <input type="checkbox" ${
//             task.checkbox?.checked ? "checked" : ""
//           } data-id="${task.task_id}">
//           <h3 class="task-title">${
//             task.task_date
//               ? isMobile
//                 ? truncated_task_name
//                 : task.task_name + " - "
//               : isMobile
//               ? truncated_task_name
//               : task.task_name
//           }</h3>
//         </div>
        
//         <p class="data-view">${task.task_date || ""}</p>
//         <p class="time-view">${
//           task.task_time ? "<strong>às </strong>" + task.task_time : ""
//         }</p>
//       </div>
//       <button class="delete-btn fa-solid fa-trash" data-id="${
//         task.task_id
//       }"></button>
//     `;

//     // Adiciona evento para excluir a tarefa
//     const delete_btn = task_item.querySelector(".delete-btn");
//     delete_btn.addEventListener("click", () => {
//       delete_task(task.task_id);
//       render_tasks(container); // Atualiza a lista após exclusão
//     });

//     // Evento para alternar o status
//     const checkbox = task_item.querySelector("input[type='checkbox']");
//     checkbox.addEventListener("change", () => {
//       toggle_status(task.task_id);
//       render_tasks(container);
//     });

//     container.appendChild(task_item);
//   });
// }

// function delete_task(task_id) {
//   const saved_tasks = localStorage.getItem("tasks");
//   const tasks = saved_tasks ? JSON.parse(saved_tasks) : [];

//   // Filtra as tarefas para remover a tarefa com o ID correspondente
//   const updated_tasks = tasks.filter((task) => task.task_id !== task_id);

//   // Atualiza o localStorage
//   localStorage.setItem("tasks", JSON.stringify(updated_tasks));

//   alert("Tarefa excluída com sucesso!");
// }

// function toggle_status(task_id) {
//   const saved_tasks = localStorage.getItem("tasks");
//   const tasks = saved_tasks ? JSON.parse(saved_tasks) : [];

//   // Atualiza o status da tarefa no array de tarefas
//   const updated_tasks = tasks.map((task) => {
//     if (task.task_id === task_id) {
//       task.checkbox = { checked: !task.checkbox?.checked }; // Inverte o status
//     }
//     return task;
//   });

//   // Atualiza o localStorage
//   localStorage.setItem("tasks", JSON.stringify(updated_tasks));
// }
