'use strict'

///////////
// Gantt //
///////////

const gantt = {}

let startDate = dateParse(0)

gantt._addRow = (id, text, fillId = false, th = false) => {
  const columnType = (th ? 'th' : 'td')
  const columns = [{ tag: columnType, text: text }]

  for (let i = 0; i < 365; i++) {
    columns.push({ tag: columnType, text: fillId ? (i + 1) : '' })
  }

  return createDom({
    id: th ? 'header' : `${id}-gantt`,
    tag: 'tr',
    children: columns
  }, '#gantt')
}

gantt.addHeader = () => {
  gantt._addRow(guid(), '', true, true)
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
  for (let i = startCell; i < endCell; i++) {
    domElement.children[i + 1].classList.add('ganttCell')
  }
}

gantt.delRow = (component) => {
  if (component.type !== 'Task') return

  $(`#${component.id}-gantt`).remove()
}

gantt.addRow = (component) => {
  if (component.type !== 'Task') return

  const domElement = gantt._addRow(component.id, component.text, false)
  gantt.setDate(component, domElement)
}

gantt.clear = () => {
  const rows = $("#gantt tr[id*=-gantt]")
  $.each(rows, function (index, row) {
    row.remove()
  });
}

// Load
$(() => {
  gantt.addHeader()
})
