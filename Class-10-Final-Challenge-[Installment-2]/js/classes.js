'use strict'

// Factory Pattern
function classFactory(type) {
  switch (type) {
    case 'Header': return new Header()
    case 'Category': return new Category()
    case 'Task': return new Task()
    case 'Resource': return new Resource()
  }
}

// Components
function Header() {
  BaseComponent.call(this, 'Header')
  this.dragAndDropParent = 'root'
  Object.seal(this)
}

function Category() {
  BaseComponent.call(this, 'Category')
  this.dragAndDropParent = 'Header'
  Object.seal(this)
}

function Task() {
  BaseComponent.call(this, 'Task')
  this.dragAndDropParent = 'Category'
  Object.seal(this)
}

function Resource() {
  BaseComponent.call(this, 'Resource')
  this.dragAndDropParent = 'Task'

  //Custom Basic Render
  this.renderBasicComponent = (parentSelector) => {
    return dom({
      tag: 'div', id: this.id, text: this.name, className: 'component',
      attributes: { 'draggable': 'true', 'ondragstart': 'drag(event)', 'data-parent': this.dragAndDropParent.toLowerCase() },
      children: [
        {
          tag: 'input', placeholder: 'price per hour', type: 'text', style: 'width: 100%',
        }
      ]
    }, parentSelector)
  }

  Object.seal(this)
}

// Base Component
function BaseComponent(name) {
  // Props
  this.id = guid()
  this.name = name.toUpperCase()
  this.type = name
  this.duration = 1
  this.startDate = date()
  this.endDate = date(1)
  this.dragAndDropParent = null
  this.children = []

  // Storage
  this.createFrom = (data) => {
    this.id = data.id
    this.name = data.name
    this.type = data.type
    this.duration = data.duration
    this.startDate = data.startDate
    this.endDate = data.endDate
    this.dragAndDropParent = data.dragAndDropParent
  }

  // Handlers
  this.handleDuration = (e) => {
    let delta = e.target.value - this.duration
    this.duration = e.target.value
    console.log(this.duration, delta, date(0, this.startDate))
    saveTree()
  }

  this.handleName = (e) => {
    this.name = e.target.value
    console.log(this.name)
    saveTree()
  }

  this.handleStartDate = (e) => {
    this.startDate = e.target.value
    console.log(this.startDate)
    saveTree()
  }

  this.handleEndDate = (e) => {
    this.endDate = e.target.value
    console.log(this.endDate)
    saveTree()
  }

  // Children

  this.appendChild = component => {
    this.children.push(component)
    return component
  }

  this.hasChildren = () => {
    return this.children.length > 0;
  }

  this.last = (recursive = false) => {
    if (!this.hasChildren()) return null

    let lastChild = this.children[this.children.length - 1]

    if (recursive) {
      while (lastChild.hasChildren()) {
        lastChild = lastChild.last(recursive)
      }
    }

    return lastChild
  }
  // this.removeChild = component => this.children.pop(component)

  // Render Basic Component
  this.renderBasicComponent = (parentSelector) => {
    return dom({
      tag: 'div', text: this.name, className: 'component',
      attributes: { 'draggable': 'true', 'ondragstart': 'drag(event)', 'data-type': this.type, 'data-parent': this.dragAndDropParent },
    }, parentSelector)
  }

  // Render Project Component
  this.renderProjectComponent = () => {
    return dom({
      tag: 'div', id: this.id, className: `projectComponent ${this.type.toLowerCase()}`,
      attributes: { 'data-type': this.type },
      children: [
        { id: `${this.id}_text`, tag: 'input', type: 'text', value: this.name, placeholder: this.type, event: { 'type': 'input', 'function': this.handleName } },
        { id: `${this.id}_duration`, tag: 'input', type: 'number', value: this.duration, style: 'width: 50px', event: { 'type': 'click', 'function': this.handleDuration } },
        { id: `${this.id}_startDate`, tag: 'input', type: 'date', value: this.startDate, style: 'width: 100px', event: { 'type': 'change', 'function': this.handleStartDate } },
        { id: `${this.id}_endDate`, tag: 'input', type: 'date', value: this.endDate, style: 'width: 100px', event: { 'type': 'change', 'function': this.handleEndDate } },
      ]
    })
  }
}
