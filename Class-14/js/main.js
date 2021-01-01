'use strict'

// Add Main Components
const components = ['Header', 'Category', 'Task'] //, 'Resource', 'Resource', 'Resource'

let resourceId = 1
let duration = 1000

const loadProject = (dummy) => {
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
  { elementId: '#sampleData', 'trigger': loadProject },
  { elementId: '#introTitle', 'trigger': textAnimation },
  { elementId: '#introDescription', 'trigger': textAnimation },
  { elementId: '#tutorialTitle', 'trigger': textAnimation },
  { elementId: '#tutorialDescription', 'trigger': textAnimation },
  { elementId: '#sampleTitle', 'trigger': textAnimation },
  { elementId: '#sampleDescription', 'trigger': textAnimation },
  { elementId: '#troubleshootingTitle', 'trigger': textAnimation },
  { elementId: '#troubleshootingDescription', 'trigger': textAnimation },
  { elementId: '#developmentTitle', 'trigger': textAnimation },
  { elementId: '#developmentDescription', 'trigger': textAnimation },
]

$(() => {
  // Animations
  $(window).bind('scroll', triggerAnimations)

  triggerAnimations()
})


