'use strict'

/////////////////////
// Data Management //
/////////////////////

const flat = []
const tree = []

const getParent = (parentId) => {
  return flat.find(c => c.id === parentId) || null
}

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

const getNext = (index, type = null) => {
  if (index + 1 < flat.length - 1) {
    for (let i = index; flat.length; i++) {
      if (flat[i].type == type || type === null) {
        return flat[i]
      }
    }
  }

  return null
}

const propagate = (component) => {
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
        propagate(nextComponent)
      }

      // Propage Up
      if (component.type === 'Task') {
        while (component.parentId !== 0) {
          component = getParent(component.parentId)
          propagate(component)
        }
      }
      break
  }
}

const addComponent = (component, parentId) => {
  // Add GanttRow
  gantt.addRow(component)

  if (parentId === 'root') {
    // Flat
    flat.push(component)

    // Tree
    tree.push(component)

    // UI
    get('#root').appendChild(component.renderProjectComponent())

    // Propagate
    propagate(component)
  } else {
    // Flat
    const parent = getParent(parentId)
    const parentLastChild = parent.lastChild(true) || parent
    flat.splice(flat.indexOf(parentLastChild) + 1, 0, component) //insert component in flat where in the order where it belongs

    // Tree
    parent.appendChild(component)

    // UI
    const isFirstTask = component.type === 'Task' && getPrevious(flat.indexOf(component), 'Task') === null
    $(component.renderProjectComponent(isFirstTask)).insertAfter(`#${parentLastChild.id}`)

    // Propagate
    propagate(component)
  }

  animation.projectComponent(component.id)

  saveTree()
  return component
}

const delComponent = (component) => {
  const index = flat.indexOf(component) - 1
  const parent = getParent(component.parentId)

  // Flat
  flat.splice(flat.indexOf(component), 1)

  // Tree
  if (parent)
    parent.removeChild(component)

  // UI
  $(`#${component.id}`).remove()

  // Gantt
  gantt.delRow(component)

  // Category / Task
  if (parent !== null) {
    const firstTask = parent.firstChild(true, 'Task')
    if (firstTask) {
      propagate(firstTask)
    } else {
      delComponent(parent)

      // Link next task to previous, if any
      const nextTask = getNext(index, 'Task')
      if (nextTask) {
        propagate(nextTask)
      } else {
        // If last task was delete, update parent endDate
        const previousTask = getPrevious(index, 'Task')
        if (previousTask) {
          propagate(previousTask)
        }
      }
    }
  }

  saveTree()
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

  gantt.clear()

  localStorage.clear()
}

// Attach Events
$(() => {
  get('#clearStorage').addEventListener('click', clearStorage)
})
