'use strict'

///////////////
// Main Tree //
///////////////
const root = {}

const addComponent = (component, parentId) => {
  if (parentId) {
    //TODO: Do
  } else {
    root[component.id] = component
  }

  //TODO: save changes in localStorage

  return component
}

const getComponent = (componentId) => {
  return root[componentId]
  //TODO: treesearch
}

/////////////////
// Aux methods //
/////////////////

// DOM helper
const dom = (data, parent) => {
  const element = document.createElement(data.tag)

  //State
  if (data.id) element.setAttribute('id', data.id)
  if (data.type) element.setAttribute('type', data.type)
  if (data.className) element.className = data.className
  if (data.style) element.style.cssText = data.style
  if (data.text) element.appendChild(document.createTextNode(data.text))
  if (data.value) element.value = data.value
  if (data.html !== undefined) element.innerHTML = data.html
  Object.keys(data.attributes || []).forEach(attr => element.setAttribute(attr, data.attributes[attr]))

  //Childs
  if (data.childs) {
    data.childs.forEach(c => dom(c, element))
  }

  //Parent
  if (parent)
    (typeof parent === 'string' ? get(parent) : parent).appendChild(element)

  return element
}

// Selector
const get = selector => document.querySelector(selector)

// Selector Array
const getAll = selector => document.querySelectorAll(selector)

// Guid
const guid = () => 'x' + ([1e7] + 1e3 + 4e3 + 8e3 + 1e11).replace(/[018]/g, c => (c ^ (crypto.getRandomValues(new Uint8Array(1))[0] & (15 >> (c / 4)))).toString(16))

/////////////////
// Drag & Drop //
/////////////////

const drag = event => {
  const componentId = event.currentTarget
  event.dataTransfer.setData('id', event.currentTarget.id)
}
const dragEnter = event => {
  console.log(event)
  event.currentTarget.classList.add('drop')
}
const dragLeave = event => event.currentTarget.classList.remove('drop')
const allowDrop = event => event.preventDefault()

const drop = event => {
  get('#project').classList.remove('drop')
  const component = getComponent(event.dataTransfer.getData('id'))
  event.currentTarget.appendChild(component.renderProjectComponent())
}
