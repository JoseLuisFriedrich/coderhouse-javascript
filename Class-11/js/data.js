'use strict'

///////////////
// Main Tree //
///////////////

const flat = []
const tree = []

const linkDates = (component) => {
  const index = flat.indexOf(component)

  // Calculate Start Date
  let startDate = dateParse(0, component.startDate)
  if (index > 0) {
    startDate = dateParse(1, flat[index - 1].endDate)
  }

  // Calculate End Date
  let endDate = dateParse(component.duration, startDate)

  // Set Start Date
  if (component.startDate != startDate) {
    // debugger
    // component.startDate = dateParse(0, startDate)
    component.setStartDate(dateParse(0, startDate), true, false)
  }

  // Set End Date
  if (component.endDate != endDate) {
    // debugger
    // component.endDate = dateParse(0, endDate)
    component.setEndDate(dateParse(0, endDate), true, false)
  }

  // Propagate
  // console.clear()

  //console.log(component.type, startDate, endDate)
  for (let i = index + 1; i < flat.length; i++) {
    linkDates(flat[i])
  }
}
const addComponent = (component, parentId) => {
  if (parentId === 'root') {
    // Flat
    flat.push(component)

    // Tree
    tree.push(component)

    // UI
    get('#root').appendChild(component.renderProjectComponent())

    // Propagate
    linkDates(component)
  } else {
    // Flat
    const parent = flat.filter(c => c.id === parentId)[0]
    const parentLastChild = parent.lastChild(true) || parent
    flat.splice(flat.indexOf(parentLastChild) + 1, 0, component) //insert component in flat where in the order where it belongs

    // Tree
    parent.appendChild(component)

    // UI
    $(component.renderProjectComponent()).insertAfter(`#${parentLastChild.id}`)

    // Propagate
    linkDates(component)
  }

  $(`#${component.id}`)
    .delay(200)
    .css("display", "flex")
    .hide()
    .slideDown(500);

  saveTree()
  return component
}

const saveTree = () => {
  // Storage
  localStorage.setItem('treeData', JSON.stringify(tree))
}

const loadDataFromStorage = () => {
  // Attach Events
  get('#clearStorage').addEventListener('click', clearStorage)

  // Load from Storage
  const reloadComponents = (dataArray, parentId) => {
    dataArray.forEach(componentData => {
      const component = classFactory(componentData.type)
      component.set(componentData)

      addComponent(component, parentId)
      reloadComponents(componentData.children, component.id)
    })
  }

  reloadComponents(JSON.parse(localStorage.getItem('treeData') || '[]'), 'root')
}

const clearStorage = () => {
  $("#root div").remove()

  flat.splice(0, flat.length);
  tree.splice(0, tree.length);

  localStorage.clear()
}
