'use strict'

// Add Main Components
let resourceId = 1

const components = ['Header', 'Category', 'Task', 'Resource', 'Resource', 'Resource']

components.forEach(componentName => {
  const component = classFactory(componentName)
  component.text = (componentName === 'Resource' ? `RESOURCE ${resourceId++}` : componentName.toUpperCase())
  component.renderBasicComponent('#components')
})

loadFromStorage()




const xxx = new Header()
console.log(xxx.xx())
