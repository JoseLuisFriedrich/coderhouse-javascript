'use strict'

///////////
// Gantt //
///////////

const gantt = {}

let startDate = dateParse(0)

gantt._addRow = (id, text, previousComponent, fillId = false, th = false) => {
  const columnType = (th ? 'th' : 'td')
  const columns = [{ tag: columnType, text: text }]

  for (let i = 0; i < 365; i++) {
    columns.push({ tag: columnType, text: fillId ? '' : '' })
  }

  const domElement = createDom({
    id: th ? 'header' : `${id}-gantt`,
    tag: 'tr',
    children: columns
  })

  if (previousComponent) {
    $(domElement).insertAfter(`#${previousComponent.id}-gantt`)
  } else {
    get('#gantt').appendChild(domElement)
  }
}

gantt.addHeader = () => {
  gantt._addRow(guid(), '', null, true, true)
}

gantt.setText = (component) => {
  if (component.type !== 'Task') return

  get(`#${component.id}-gantt > td`).innerText = component.text
}

gantt.setDate = (component, element = null) => {
  if (component.type !== 'Task') return

  if (component.isFirstTask) {
    startDate = component.startDate
  }

  const startCell = dateDiff(startDate, component.startDate)
  const endCell = startCell + component.duration

  const domElement = element || get(`#${component.id}-gantt`)

  // Clean
  const previous = $(`#${component.id}-gantt td[class*=ganttCell]`)
  $.each(previous, function (index, row) {
    row.classList.remove('ganttCell')
  })

  // Add
  console.log(startCell, endCell)
  for (let i = startCell; i < endCell; i++) {
    domElement.children[i + 1].classList.add('ganttCell')
  }
}

gantt.delRow = (component) => {
  if (component.type !== 'Task') return

  $(`#${component.id}-gantt`).remove()
}

gantt.addRow = (component, previousComponent) => {
  if (component.type !== 'Task') return

  if (previousComponent === null) { // Is First Task
    $("table").css('visibility', 'visible')
  }

  const domElement = gantt._addRow(component.id, component.text || 'Tarea', previousComponent, false)
  gantt.setDate(component, domElement)
}

gantt.clear = () => {
  $("table").css('visibility', 'hidden')

  const rows = $("#gantt tr[id*=-gantt]")
  $.each(rows, function (index, row) {
    row.remove()
  });
}

// Load
$(() => {
  gantt.addHeader()
})
