'use strict'

//////////////////
// Core Classes //
//////////////////

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
  BaseComponent.call(this, 'Cabecera', 'Header')
  this.parentType = 'root'
  Object.seal(this)
}

function Category() {
  BaseComponent.call(this, 'Categoría', 'Category')
  this.parentType = 'Header'
  Object.seal(this)
}

function Task() {
  BaseComponent.call(this, 'Tarea', 'Task')
  this.parentType = 'Category'
  Object.seal(this)
}

// Base Component
function BaseComponent(placeholder, type) {
  // Props
  this.id = guid()
  this.text = this.placeholder
  this.type = type
  this.duration = (this.type == 'Task' ? 1 : 0)
  this.startDate = dateParse()
  this.endDate = dateParse()
  this.parentType = null
  this.children = []
  this.parentId = 0
  this.isFirstTask = false

  // When I read data from storage
  this.set = (data) => {
    this.id = data.id
    this.text = data.text
    this.type = data.type
    this.duration = Number(data.duration)
    this.startDate = data.startDate
    this.endDate = data.endDate
    this.parentType = data.parentType
  }

  // Setters
  this.setText = (text) => {
    // State
    this.text = text

    // Gantt
    gantt.setText(this)

    // Persist
    saveTree()
  }

  this.setDuration = (duration, updateDom = true, trigger = true) => {
    // Validations
    if (duration == -1 || duration == 100) {
      this.setDuration(duration == -1 ? 0 : 99, true)
      return
    }

    // State
    this.duration = Number(duration)

    // Triggers
    if (trigger) {
      this.setEndDate(dateParse(this.duration, this.startDate))
    }

    // Dom
    if (updateDom) {
      const domValue = get(`#${this.id}-duration`)
      if (domValue.value !== this.duration) {
        domValue.value = this.duration
      }
    }

    // Propagate update
    if (trigger) {
      propagate(this)
    }

    // Persist
    saveTree()
  }

  this.setStartDate = (date, updateDom = true, trigger = true) => {
    // State
    this.startDate = date

    //When First Start Date Change
    if (!updateDom) {
      trigger = false

      this.setEndDate(dateParse(this.duration, this.startDate), true, false)
      propagate(this)
    }

    // Triggers
    if (trigger) {
      const duration = dateDiff(this.startDate, this.endDate)
      if (duration != this.duration) {
        this.setDuration(duration, true)
      }
    }

    // Dom
    if (updateDom) {
      const domValue = get(`#${this.id}-startDate`)
      if (domValue.value !== this.startDate) {
        domValue.value = this.startDate
      }
    }

    // Persist
    saveTree()
  }

  this.setEndDate = (date, updateDom = true, trigger = true) => {
    // Validations
    if (dateParse(0, date, true) < dateParse(0, this.startDate, true)) {
      this.setEndDate(this.startDate, true)
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

    // Gantt
    gantt.setDate(this)

    // Dom
    if (updateDom) {
      const domValue = get(`#${this.id}-endDate`)
      if (domValue.value !== this.endDate) {
        domValue.value = this.endDate
      }
    }

    // Persist
    saveTree()
  }

  this.deleteTask = () => {
    delComponent(this)
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
      case 'delete':
        this.deleteTask()
        break
    }
  }

  // Children
  this.appendChild = component => {
    component.parentId = this.id
    this.children.push(component)
    return component
  }

  // Children
  this.removeChild = component => {
    const index = this.children.indexOf(component);
    this.children.splice(index, 1);
    return component
  }

  this.hasChildren = () => {
    return this.children.length > 0;
  }

  this.firstChild = () => {
    if (!this.hasChildren()) return null

    return this.children[0]
  }

  this.lastChild = (recursive = false, type = null) => {
    if (!this.hasChildren()) return null

    let last = this.children[this.children.length - 1]

    if (recursive) {
      while (last.hasChildren()) {
        last = last.lastChild()
      }
    }

    if (type === null || last.type === type)
      return last
  }

  // Render Basic Component
  this.renderBasicComponent = (parentSelector) => {
    return createDom(
      {
        tag: 'div', id: this.id, text: placeholder, className: 'component',
        attributes: { 'draggable': 'true', 'ondragstart': 'dragdrop.drag(event)', 'data-type': this.type, 'data-parent': this.parentType },
      }, parentSelector)
  }

  // Render Project Component
  this.renderProjectComponent = (isFirstTask) => {
    this.isFirstTask = isFirstTask

    const isTask = (this.type === 'Task')
    const readOnlyStartDate = !isFirstTask
    const readOnlyEndDate = !isTask

    return createDom(
      {
        tag: 'div', id: this.id, className: `projectComponent ${this.type.toLowerCase()}`,
        attributes: { 'data-type': this.type },
        children: [
          { id: `${this.id}-text`, tag: 'input', type: 'text', value: this.text, placeholder: placeholder, attributes: { 'data-name': 'text' }, event: { 'type': 'input', 'function': this.handleChange } },
          { id: `${this.id}-duration`, tag: 'input', type: 'number', readOnly: readOnlyEndDate, value: this.duration, style: 'width: 50px', attributes: { 'data-name': 'duration' }, event: { 'type': 'click', 'function': this.handleChange } },
          { id: `${this.id}-startDate`, tag: 'input', type: 'date', readOnly: readOnlyStartDate, value: this.startDate, style: 'width: 100px', attributes: { 'data-name': 'startDate' }, event: { 'type': 'change', 'function': this.handleChange } },
          { id: `${this.id}-endDate`, tag: 'input', type: 'date', readOnly: readOnlyEndDate, value: this.endDate, style: 'width: 100px', attributes: { 'data-name': 'endDate' }, event: { 'type': 'change', 'function': this.handleChange } },
          { id: `${this.id}-delete`, tag: 'img', style: 'width: 20px', attributes: { 'data-name': 'delete', 'src': (!isFirstTask && isTask ? 'images/delete.png' : '') }, event: { 'type': 'click', 'function': this.handleChange } },
        ]
      })
  }
}
