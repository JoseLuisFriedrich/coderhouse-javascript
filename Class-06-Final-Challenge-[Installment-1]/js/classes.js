'use strict'

// Factory
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
  Core.call(this, 'Header')

  // Drag & Drop Rules

  // Props
  this.categories = []

  // Add Category
  this.addCategory = (category) => {
    this.categories.push(category)
  }

  // Remove Category
  this.removeCategory = (category) => {
    this.categories.pop(category)
  }
}

function Category() {
  Core.call(this, 'Category')

  // Drag & Drop Rules

  // Props
  this.tasks = []

  // Add Task
  this.addResource = (task) => {
    this.tasks.push(task)
  }

  // Remove Task
  this.removeResource = (task) => {
    this.tasks.pop(task)
  }
}

function Task() {
  Core.call(this, 'Task')

  // Drag & Drop Rules

  // Props
  this.resources = []

  // Add Resource
  this.addResource = (resource) => {
    this.resources.push(resource)
  }

  // Remove Resource
  this.removeResource = (resource) => {
    this.resources.pop(resource)
  }
}

function Resource() {
  Core.call(this, 'Resource')
}

// Core
function Core(name) {
  // Props
  this.id = guid()
  this.name = name.toUpperCase()
  this.duration = 0
  this.startDate = new Date()
  this.endDate = new Date()

  // Render
  this.renderBasic = () => {
    return basicRender(this.id, this.name)
  }
}

// Aux
const basicRender = (id, name) => `
  <article id="${id}" class="component" draggable="true" ondragstart="drag(event)" data-id="header">
    <input type="text" style="width: 100%" oninput="handleChange('${id}', 'name', this)" value="${name}">
  </article>
  `
