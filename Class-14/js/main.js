'use strict'

//////////
// Main //
//////////

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
const triggers = [{ elementId: '#sampleData', 'trigger': loadProject }]
const sections = ['intro', 'tutorial', 'sample', 'troubleshooting', 'development']

sections.forEach(section => {
  triggers.push({ elementId: `#${section}Title`, 'trigger': textAnimation })
  triggers.push({ elementId: `#${section}Description`, 'trigger': textAnimation })
})

$(() => {
  $(window).bind('scroll', triggerAnimations)
  triggerAnimations()

  // Gantt
  const columns = [{ tag: 'td', text: 'Task' }]
  for (let i = 0; i < 100; i++) {
    columns.push({ tag: 'td', text: (i + 1) })
  }

  createDom({
    tag: 'tr',
    children: columns
  }, '#gantt')
})
