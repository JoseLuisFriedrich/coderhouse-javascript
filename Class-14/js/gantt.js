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
  get(`#${component.id}-gantt > td`).innerText = component.text
}

gantt.delRow = (component) => {
  $(`#${component.id}-gantt`).remove()
}

gantt.addRow = (component) => {
  if (component.type !== 'Task') return

  if (component.isFirstTask) {
    startDate = component.startDate
  }

  const startCell = dateDiff(startDate, component.startDate)
  const endCell = startCell + component.duration

  const dom = gantt._addRow(component.id, component.text, false)
  for (let i = startCell; i < endCell; i++) {
    dom.children[i + 1].classList.add('ganttCell')
  }
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
