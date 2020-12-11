'use strict'

// Main Tree
const root = {}

//TODO: localStorage


// Main Process
const components = ['Header', 'Category', 'Task', 'Resource']

components.forEach(component => {
  const obj = classFactory(component).renderComponent('#components')
  root[obj.id] = obj
})
