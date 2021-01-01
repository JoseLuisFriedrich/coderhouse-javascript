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
        // if (component.type == 'Category') {
        //   const header = flat.find(c => c.id === component.parentId)
        //   const child = parent.lastChild(true)
        //   if(child.type !== 'Task') {

        //   }

        //   // if (parent.hasChildren()) {
        //   //   console.log('ok')
        //   // } else {
        //   //   console.log('empty')
        //   // }
        // }

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
          component = flat.find(c => c.id === component.parentId)
          propagate(component)
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
    propagate(component)
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
    propagate(component)
  }

  $(`#${component.id}`)
    .delay(200)
    .css("display", "flex")
    .hide()
    .slideDown(500);

  saveTree()
  return component
}

const delComponent = (component) => {
  // Flat
  const currentIndex = flat.indexOf(component) - 1
  const category = flat.find(c => c.id === component.parentId)
  flat.splice(flat.indexOf(component), 1)

  // Tree
  category.removeChild(component)

  // UI
  $(`#${component.id}`).remove()

  // Get remaining children
  const categoryLastChild = category.lastChild(true)

  // If category has no children, I set the current category to 0, then find next component (if any) to link the date of the previous
  if (categoryLastChild == null) {
    // debugger
    propagate(category)

    // const previousTask = getPrevious(currentIndex, 'Task')

    // // Reset dates since it has no children tasks
    // parent.setDuration(0, true, true)
    // parent.setStartDate(dateParse(0, previousTask.endDate), true, false)
    // parent.setEndDate(dateParse(0, previousTask.endDate), true, false)

    // // Link the next task to the previous one
    // const next = getNext(currentIndex, 'Task')
    // if (previousTask && next) {
    //   next.setStartDate(dateParse(1, previousTask.endDate))
    //   //propagate(next)
    // }

    // // Refresh header
    // const header = flat.find(c => c.id === parent.parentId)
    // propagate(header)
  } else {
    // Propagate
    //console.log(parentLastChild.startDate, parentLastChild.endDate)
    propagate(categoryLastChild)
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

  localStorage.clear()
}

// Attach Events
get('#clearStorage').addEventListener('click', clearStorage)
