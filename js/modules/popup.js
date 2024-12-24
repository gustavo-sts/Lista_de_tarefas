/* Função de exibir popup */

export function show_popup(box_popup) {
  box_popup.style.display == "none"
    ? (box_popup.style.display = "flex")
    : (box_popup.style.display = "none");
}

/* Função para exibir popups do input */

export function toogle_height_date(element) {
  element.style.height == "29.2px"
    ? (element.style.height = "160px")
    : (element.style.height = "29.2px");
  if (element.style.height == "160px") {
    element.querySelector("#add-date").innerHTML = "Salvar data";
  } else {
    if (element.querySelector("#date").value != "") {
      element.querySelector("#add-date").innerHTML = "Data adicionada";
    } else {
      element.querySelector("#add-date").innerHTML = "Adicionar data";
    }
  }
}

export function toogle_height_intervals(element) {
  element.style.height == "29.2px"
    ? (element.style.height = "180px")
    : (element.style.height = "29.2px");
  if (element.style.height == "180px") {
    element.querySelector("#add-intervals").innerHTML = "Salvar intervalo";
  } else {
    if (element.querySelector("#intervals").value != "") {
      element.querySelector("#add-intervals").innerHTML = "Intervalo adicionado";
    } else {
      element.querySelector("#add-intervals").innerHTML = "Adicionar intervalo";
    }
    
  }
}
