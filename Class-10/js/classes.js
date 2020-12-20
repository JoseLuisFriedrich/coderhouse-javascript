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
      childs: [
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
  this.parent = null
  this.duration = 0
  this.startDate = new Date()
  this.endDate = new Date()

  // Handlers
  const handleDuration = (e) => {
    this.duration = e.target.value
    console.log(this.duration)
  }

  const handleName = (e) => {
    this.name = e.target.value
    console.log(this.name)
  }

  const handleStartDate = (e) => {
    this.startDate = e.target.value
    console.log(this.startDate)
  }

  const handleEndDate = (e) => {
    this.endDate = e.target.value
    console.log(this.endDate)
  }

  // Childs
  // this.childs = []
  // this.appendChild = component => {
  //   this.childs.push(component)
  //   console.log(component)
  // }
  // this.removeChild = component => this.childs.pop(component)

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
      childs: [
        { tag: 'input', type: 'text', placeholder: this.name, event: { 'type': 'input', 'function': handleName } },
        { tag: 'input', type: 'number', value: 1, style: 'width: 50px', event: { 'type': 'click', 'function': handleDuration } },
        { tag: 'input', type: 'date', value: new Date().toISOString().split('T')[0], style: 'width: 100px', event: { 'type': 'change', 'function': handleStartDate } },
        { tag: 'input', type: 'date', value: new Date().toISOString().split('T')[0], style: 'width: 100px', event: { 'type': 'change', 'function': handleEndDate } },
      ]
    })
  }
}
