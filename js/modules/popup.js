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
}

export function toogle_height_intervals(element) {
  element.style.height == "29.2px"
    ? (element.style.height = "180px")
    : (element.style.height = "29.2px");
}
