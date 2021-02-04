'use strict'

// Main Tree
const root = {}

// Add
const add = (parentId, obj) => {
  get(parentId).innerHTML += obj.renderBasic()
  root[obj.id] = obj
}

// Main Process
const components = ['Header', 'Category', 'Task', 'Resource']
components.forEach((component) => {
  add('#components', classFactory(component))
})
