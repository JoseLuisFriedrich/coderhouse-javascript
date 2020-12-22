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

// console.log(date(0, '2020-12-22'))
// console.log(date(1, '2020-12-22'))
// console.log(date(2, '2020-12-22'))
// console.log(date(3, '2020-12-22'))
