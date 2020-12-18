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
  this.dragAndDropParent = 'Root'
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
      tag: 'article', id: this.id, text: this.name, className: 'component',
      attributes: { 'draggable': 'true', 'ondragstart': 'drag(event)', 'data-parent': this.dragAndDropParent.toLowerCase() },
      childs: [
        {
          tag: 'input', type: 'text', style: 'width: 100%',
          attributes: { 'placeholder': 'price per hour' }
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
  this.duration = 0
  this.startDate = new Date()
  this.endDate = new Date()

  // Childs
  this.childs = []
  this.appendChild = component => this.childs.push(component)
  this.removeChild = component => this.childs.pop(component)

  // TODO: Drag and Drop
  this.showControls = () => { }
  this.hideControls = () => { }

  // Render Basic Component
  this.renderBasicComponent = (parentSelector) => {
    return dom({
      tag: 'article', id: this.id, text: this.name, className: 'component',
      attributes: { 'draggable': 'true', 'ondragstart': 'drag(event)', 'data-parent': this.dragAndDropParent.toLowerCase() },
    }, parentSelector)
  }

  // Render Project Component
  this.renderProjectComponent = () => {
    return dom({
      tag: 'article', id: this.id, text: this.name, className: 'projectComponent',
      attributes: { 'data-type': this.name.toLowerCase() },
      childs: [
        { tag: 'input', type: 'number', value: 1, style: 'width: 50px' },
      ]
    })
  }
}
