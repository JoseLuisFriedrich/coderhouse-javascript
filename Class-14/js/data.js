'use strict'

///////////////
// Main Tree //
///////////////

const flat = []
const tree = []

const getPrevious = (index, type = null) => {
  if (index > 0) {
    for (let i = index - 1; i >= 0; i--) {
      if (flat[i].type == type || type === null) {
        return flat[i]
      }
    }
  }

  return null
}

const linkDates = (component) => {
  const index = flat.indexOf(component)

  // Previous
  switch (component.type) {
    case 'Header':
    case 'Category':
      if (component.hasChildren()) {
        component.setStartDate(component.firstChild().startDate, true, false)
        component.setEndDate(component.lastChild(component.type === 'Category').endDate, true, false)
        component.setDuration(dateDiff(component.startDate, component.endDate), true, false)
      } else {
        const previous = getPrevious(index)
        if (previous !== null) {
          component.setStartDate(previous.endDate, true, false)
          component.setEndDate(previous.endDate, true, false)
        }
      }
      break
    case 'Task':
      //Previous Task
      const previousTask = getPrevious(index, 'Task')

      // Calculate Start Date
      let startDate = dateParse(0, component.startDate)

      if (previousTask !== null) {
        startDate = dateParse(1, previousTask.endDate)
      }

      if (component.startDate != startDate) {
        component.setStartDate(dateParse(0, startDate), true, false)
      }

      // Calculate End Date
      const endDate = dateParse(component.duration, startDate)

      if (component.endDate != endDate) {
        component.setEndDate(dateParse(0, endDate), true, false)
      }

      // Propagate Down
      for (let i = index + 1; i < flat.length; i++) {
        const nextComponent = flat[i]
        linkDates(nextComponent)
      }

      // Propage Up
      if (component.type === 'Task') {
        while (component.parentId !== 0) {
          component = flat.find(c => c.id === component.parentId)
          linkDates(component)
        }
      }
      break
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
    const parent = flat.find(c => c.id === parentId)
    const parentLastChild = parent.lastChild(true) || parent
    flat.splice(flat.indexOf(parentLastChild) + 1, 0, component) //insert component in flat where in the order where it belongs

    // Tree
    parent.appendChild(component)

    // UI
    const isFirstTask = component.type === 'Task' && getPrevious(flat.indexOf(component), 'Task') === null
    $(component.renderProjectComponent(isFirstTask)).insertAfter(`#${parentLastChild.id}`)

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

const loadComponents = (data, parentId) => {
  data.forEach(componentData => {
    const component = classFactory(componentData.type)
    component.set(componentData)

    addComponent(component, parentId)
    loadComponents(componentData.children, component.id)
  })
}

const loadDataFromStorage = () => {
  // Load from Storage
  loadComponents(JSON.parse(localStorage.getItem('treeData') || '[]'), 'root')
}

const clearStorage = () => {
  $("#root div").remove()

  flat.splice(0, flat.length);
  tree.splice(0, tree.length);

  localStorage.clear()
}

// Attach Events
get('#clearStorage').addEventListener('click', clearStorage)
