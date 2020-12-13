'use strict'

// Factory Pattern
function classFactory(type) {
  switch (type) {
    case 'Header':
      return new Header()
    case 'Category':
      return new Category()
    case 'Task':
      return new Task()
    case 'Resource':
      return new Resource()
  }
}

// Components
function Header() {
  BaseComponent.call(this, 'Header')

  // Drag & Drop Restrictions

  // Props
  this.categories = []

  // Add Category
  this.addCategory = category => {
    this.categories.push(category)
  }

  // Remove Category
  this.removeCategory = category => {
    this.categories.pop(category)
  }

  Object.seal(this)
}

function Category() {
  BaseComponent.call(this, 'Category')

  // Drag & Drop Restrictions

  // Props
  this.tasks = []

  // Add Task
  this.addResource = task => {
    this.tasks.push(task)
  }

  // Remove Task
  this.removeResource = task => {
    this.tasks.pop(task)
  }

  Object.seal(this)
}

function Task() {
  BaseComponent.call(this, 'Task')

  // Drag & Drop Restrictions

  // Props
  this.resources = []

  // Add Resource
  this.addResource = resource => {
    this.resources.push(resource)
  }

  // Remove Resource
  this.removeResource = resource => {
    this.resources.pop(resource)
  }
  Object.seal(this)
}

function Resource() {
  BaseComponent.call(this, 'Resource')
  Object.seal(this)
}

// Base Component
function BaseComponent(name) {
  // Props
  this.id = guid()
  this.name = name.toUpperCase()
  this.duration = 0
  this.startDate = new Date()
  this.endDate = new Date()

  // Render Component
  this.renderComponent = (parentSelector) => {
    return dom({
      tag: 'article', id: this.id, text: this.name, className: 'component',
      attributes: { 'draggable': 'true', 'ondragstart': 'drag(event)', 'data-id': this.name.toLowerCase() },
    }, parentSelector)
  }

  // Render Project Component
  this.renderProjectComponent = () => {
    return dom({
      tag: 'article', id: this.id, text: this.name, className: 'projectComponent',
      childs: [
        { tag: 'input', type: 'number', value: 1 },
      ]
    })
  }
}
