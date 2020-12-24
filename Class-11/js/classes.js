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
    return createDom({
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
  this.text = null
  this.type = text
  this.duration = 1
  this.startDate = dateParse()
  this.endDate = dateParse(1)
  this.dragAndDropParent = null
  this.children = []

  // When I read data from storage
  this.set = (data) => {
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
    // State
    this.text = text

    // Persist
    saveTree()
  }

  this.setDuration = (duration, updateDom = true) => {
    // Validations
    if (duration == -1 || duration == 100) {
      this.setDuration(duration == -1 ? 0 : 99, true)
      return
    }

    // State
    this.duration = duration

    // Triggers
    this.setEndDate(dateParse(this.duration, this.startDate))

    // Dom
    if (updateDom) get(`#${this.id}-duration`).value = this.duration

    // Propagate update
    linkDates(this)

    // Persist
    saveTree()
  }

  this.setStartDate = (date, updateDom = true, trigger = true) => {
    // Validations
    // if (dateParse(0, date, true) >= dateParse(0, this.endDate, true)) {
    //   this.setStartDate(dateParse(-1, this.endDate), true)
    //   return
    // }

    // State
    this.startDate = date

    // Triggers
    if (trigger) {
      const duration = dateDiff(this.startDate, this.endDate)
      if (duration != this.duration) {
        this.setDuration(duration, true)
      }
    }

    // Dom
    if (updateDom) get(`#${this.id}-startDate`).value = this.startDate

    // Persist
    saveTree()
  }

  this.setEndDate = (date, updateDom = true, trigger = true) => {
    // Validations
    if (dateParse(0, date, true) <= dateParse(0, this.startDate, true)) {
      this.setEndDate(dateParse(1, this.startDate), true)
      return
    }

    // State
    this.endDate = date

    // Triggers
    if (trigger) {
      const duration = dateDiff(this.startDate, this.endDate)
      if (duration != this.duration) {
        this.setDuration(duration, true)
      }
    }

    // Dom
    if (updateDom) get(`#${this.id}-endDate`).value = this.endDate

    // Persist
    saveTree()
  }

  // Handlers
  this.handleChange = (e) => {
    const value = e.target.value

    switch (e.target.dataset.name) {
      case 'text':
        this.setText(value)
        break
      case 'duration':
        this.setDuration(value, false)
        break
      case 'startDate':
        this.setStartDate(value, false)
        break
      case 'endDate':
        this.setEndDate(value, false)
        break
    }
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
    return createDom(
      {
        tag: 'div', id: this.id, text: this.text, className: 'component',
        attributes: { 'draggable': 'true', 'ondragstart': 'drag(event)', 'data-type': this.type, 'data-parent': this.dragAndDropParent },
      }, parentSelector)
  }

  // Render Project Component
  this.renderProjectComponent = () => {
    const readOnly = (this.type !== 'Task')

    return createDom(
      {
        tag: 'div', id: this.id, className: `projectComponent ${this.type.toLowerCase()}`,
        attributes: { 'data-type': this.type },
        children: [
          { id: `${this.id}-text`, tag: 'input', type: 'text', value: this.text, placeholder: this.type, attributes: { 'data-name': 'text' }, event: { 'type': 'input', 'function': this.handleChange } },
          { id: `${this.id}-duration`, tag: 'input', type: 'number', readOnly: readOnly, value: this.duration, style: 'width: 50px', attributes: { 'data-name': 'duration' }, event: { 'type': 'click', 'function': this.handleChange } },
          { id: `${this.id}-startDate`, tag: 'input', type: 'date', readOnly: readOnly, value: this.startDate, style: 'width: 100px', attributes: { 'data-name': 'startDate' }, event: { 'type': 'change', 'function': this.handleChange } },
          { id: `${this.id}-endDate`, tag: 'input', type: 'date', readOnly: readOnly, value: this.endDate, style: 'width: 100px', attributes: { 'data-name': 'endDate' }, event: { 'type': 'change', 'function': this.handleChange } },
        ]
      })
  }
}
