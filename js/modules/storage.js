export function save_task(
  task_data
) {
  let { task_name, task_date, task_time, task_intervals, task_times } = task_data;
  const saved_tasks = localStorage.getItem("tasks");
  const tasks = saved_tasks ? JSON.parse(saved_tasks) : []; // Parseia ou inicia um array vazio

  // Validação simples para evitar salvar tarefas incompletas
  if (!task_name) {
    alert("Preencha todos os campos obrigatórios!");
    return;
  }

  // Cria uma nova tarefa com um ID único
  if (task_intervals) {
  let i = 1;
    // let [dia, mes, ano] = task_date.split("/")
    let [ano, mes, dia] = task_date.split("-");
    task_date = dia + "/" + mes + "/" + ano;
     while(i <= task_times){
       const task_id = tasks.length ? tasks[tasks.length - 1].task_id + 1 : 1;
       if (i > 1) {
         dia = Number(dia)
         mes = Number(mes)
        if (dia > 30) {
          dia = dia - 30;
          if (mes < mes + 2) { if (mes == 12) { mes = (mes - mes) + 1} else { mes = mes + 1 } }
          task_date = dia + "/" + mes + "/" + ano;
         } else {
          dia = dia + Number(task_intervals);
          task_date = dia + "/" + mes + "/" + ano;
         }
       }
       const new_task = {
        task_name,
        task_date,
        task_time,
        task_id,
      };

      // Adiciona a nova tarefa ao array
      tasks.push(new_task);

      // Atualiza o localStorage
      localStorage.setItem("tasks", JSON.stringify(tasks));

      // Feedback para o usuário
      alert("Tarefa salva com sucesso!");
       console.log("Tarefas salvas:", tasks);
       i++
    }
  } else {
    const task_id = tasks.length ? tasks[tasks.length - 1].task_id + 1 : 1;
    let [ano, mes, dia] = task_date.split("-");
    task_date ? task_date = dia + "/" + mes + "/" + ano : "";
    const new_task = {
        task_name,
        task_date,
        task_time,
        task_intervals,
        task_times,
        task_id
      };

      // Adiciona a nova tarefa ao array
      tasks.push(new_task);

      // Atualiza o localStorage
      localStorage.setItem("tasks", JSON.stringify(tasks));

      // Feedback para o usuário
      alert("Tarefa salva com sucesso!");
      console.log("Tarefas salvas:", tasks);
  }
}    