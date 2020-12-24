'use strict'

// Add Main Components
let resourceId = 1
let duration = 1000

const components = ['Header', 'Category', 'Task'] //, 'Resource', 'Resource', 'Resource'

$(() => {
  components.forEach(componentName => {
    const component = classFactory(componentName)
    component.text = (componentName === 'Resource' ? `RESOURCE ${resourceId++}` : componentName.toUpperCase())
    component.renderBasicComponent('#components')
    $(`#${component.id}`).delay(2000).slideDown(duration)
    duration += 1000
  })

  loadDataFromStorage()
})


