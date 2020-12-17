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
  this.dragAndDropParent = 'root'

  // Seal
  Object.seal(this)
}

function Category() {
  BaseComponent.call(this, 'Category')

  // Drag & Drop Restrictions
  this.dragAndDropParent = 'Header'

  // Seal
  Object.seal(this)
}

function Task() {
  BaseComponent.call(this, 'Task')

  // Drag & Drop Restrictions
  this.dragAndDropParent = 'Category'

  // Seal
  Object.seal(this)
}

function Resource() {
  BaseComponent.call(this, 'Resource')

  // Drag & Drop Restrictions
  this.dragAndDropParent = 'Task'

  this.renderBasicComponent = (parentSelector) => {
    return dom({
      tag: 'article', id: this.id, text: this.name, className: 'component',
      attributes: { 'draggable': 'true', 'ondragstart': 'drag(event)', 'data-parent': this.dragAndDropParent },
      childs: [
        {
          tag: 'input', type: 'text', style: 'width: 100%',
          attributes: { 'placeholder': 'price per hour' }
        }
      ]
    }, parentSelector)
  }

  // Seal
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

  // Add Child
  this.addChild = component => {
    this.childs.push(component)
  }

  // Remove Child
  this.removeChild = component => {
    this.childs.pop(component)
  }

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
      childs: [
        { tag: 'input', type: 'number', value: 1 },
      ]
    })
  }
}
