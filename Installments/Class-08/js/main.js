'use strict'

// Add Components
const components = ['Header', 'Category', 'Task', 'Resource']
components.forEach(component => addComponent(classFactory(component)).renderComponent('#components'))

// Drag format
get('#project').addEventListener('dragenter', dragEnter);
get('#project').addEventListener('dragleave', dragLeave);
