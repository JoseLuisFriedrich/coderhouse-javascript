'use strict'

// Add Main Components
const components = ['Header', 'Category', 'Task'] //, 'Resource', 'Resource', 'Resource'

let resourceId = 1
let duration = 1000

const loadProject = () => {
  components.forEach(componentName => {
    const component = classFactory(componentName)
    component.text = (componentName === 'Resource' ? `RESOURCE ${resourceId++}` : componentName.toUpperCase())
    component.renderBasicComponent('#components')

    basicComponentAnimation(component.id, duration)
    duration += 1000
  })

  // Load Storage
  loadDataFromStorage()
}


// Animation Triggers
const triggers = [
  { element: 'sampleData', 'trigger': loadProject, 'status': false }
]

$(() => {
  // Animations
  $(window).bind('scroll', triggerAnimations)

  triggerAnimations()
})


