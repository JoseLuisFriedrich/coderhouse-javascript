'use strict'

//////////
// Main //
//////////

// Add Main Components
const components = ['Header', 'Category', 'Task']

let resourceId = 1
let duration = 1000

const loadProject = () => {
  components.forEach(componentName => {
    const component = classFactory(componentName)
    component.text = (componentName === 'Resource' ? `RESOURCE ${resourceId++}` : componentName.toUpperCase())
    component.renderBasicComponent('#components')

    animation.basicComponent(component.id, duration)
    duration += 1000
  })

  // Load Storage
  loadDataFromStorage()
}

// Animation Triggers
const triggers = [{ elementId: '#sampleData', 'trigger': loadProject }]
const sections = ['intro', 'tutorial', 'sample', 'troubleshooting', 'development']

sections.forEach(section => {
  triggers.push({ elementId: `#${section}Title`, 'trigger': animation.text })
  triggers.push({ elementId: `#${section}Description`, 'trigger': animation.text })
})

// Load
$(() => {
  $(window).bind('scroll', animation.triggers)

  animation.triggers()
})
