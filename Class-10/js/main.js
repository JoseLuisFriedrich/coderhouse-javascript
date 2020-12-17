'use strict'

// Add Components
const components = ['Header', 'Category', 'Task', 'Resource', 'Resource', 'Resource']
components.forEach(component => addComponent(classFactory(component)).renderBasicComponent('#components'))

// Drag format
get('#project').addEventListener('dragenter', dragEnter)
get('#project').addEventListener('dragleave', dragLeave)
