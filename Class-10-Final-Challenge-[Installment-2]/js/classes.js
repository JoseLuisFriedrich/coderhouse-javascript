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
      tag: 'div', id: this.id, text: this.text, className: 'component',
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
function BaseComponent(text) {
  // Props
  this.id = guid()
  this.text = null //text.toUpperCase()
  this.type = text
  this.duration = 1
  this.startDate = date()
  this.endDate = date(1)
  this.dragAndDropParent = null
  this.children = []

  // Storage
  this.createFrom = (data) => {
    this.id = data.id
    this.text = data.text
    this.type = data.type
    this.duration = data.duration
    this.startDate = data.startDate
    this.endDate = data.endDate
    this.dragAndDropParent = data.dragAndDropParent
  }

  // Setters
  this.setText = (text) => {
    this.text = text
    saveTree()
  }

  this.setDuration = (duration, updateDom = true) => {
    if (duration == -1) {
      this.setDuration(0, true)
      return
    }
    if (duration == 100) {
      this.setDuration(99, true)
      return
    }

    this.duration = duration
    this.setEndDate(date(this.duration, this.startDate))
    if (updateDom) get(`#${this.id}_duration`).value = this.duration
    saveTree()
  }

  this.setStartDate = (date, updateDom = true) => {
    this.startDate = date
    if (updateDom) get(`#${this.id}_startDate`).value = this.startDate
    saveTree()
  }

  this.setEndDate = (date, updateDom = true) => {
    this.endDate = date
    if (updateDom) get(`#${this.id}_endDate`).value = this.endDate
    saveTree()
  }

  // Handlers
  this.handleText = (e) => {
    this.setText(e.target.value)
  }

  this.handleDuration = (e) => {
    this.setDuration(e.target.value, false)
  }

  this.handleStartDate = (e) => {
    this.setStartDate(e.target.value, false)
  }

  this.handleEndDate = (e) => {
    this.setEndDate(e.target.value, false)
  }

  // Children
  this.appendChild = component => {
    this.children.push(component)
    return component
  }

  this.hasChildren = () => {
    return this.children.length > 0;
  }

  this.lastChild = (recursive = false) => {
    if (!this.hasChildren()) return null

    let last = this.children[this.children.length - 1]

    if (recursive) {
      while (last.hasChildren()) {
        last = last.lastChild(recursive)
      }
    }

    return last
  }

  // Render Basic Component
  this.renderBasicComponent = (parentSelector) => {
    return dom(
      {
        tag: 'div', text: this.text, className: 'component',
        attributes: { 'draggable': 'true', 'ondragstart': 'drag(event)', 'data-type': this.type, 'data-parent': this.dragAndDropParent },
      }, parentSelector)
  }

  // Render Project Component
  this.renderProjectComponent = () => {
    return dom(
      {
        tag: 'div', id: this.id, className: `projectComponent ${this.type.toLowerCase()}`,
        attributes: { 'data-type': this.type },
        children: [
          { id: `${this.id}_text`, tag: 'input', type: 'text', value: this.text, placeholder: this.type, event: { 'type': 'input', 'function': this.handleText } },
          { id: `${this.id}_duration`, tag: 'input', type: 'number', value: this.duration, style: 'width: 50px', event: { 'type': 'click', 'function': this.handleDuration } },
          { id: `${this.id}_startDate`, tag: 'input', type: 'date', value: this.startDate, style: 'width: 100px', event: { 'type': 'change', 'function': this.handleStartDate } },
          { id: `${this.id}_endDate`, tag: 'input', type: 'date', value: this.endDate, style: 'width: 100px', event: { 'type': 'change', 'function': this.handleEndDate } },
        ]
      })
  }
}
