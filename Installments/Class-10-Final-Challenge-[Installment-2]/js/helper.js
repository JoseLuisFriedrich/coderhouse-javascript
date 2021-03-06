'use strict'

/////////////////
// Aux methods //
/////////////////

// DOM helper
const createDom = (data, parent) => {
  const element = document.createElement(data.tag)

  //State
  if (data.id) element.setAttribute('id', data.id)
  if (data.type) element.setAttribute('type', data.type)
  if (data.className) element.className = data.className
  if (data.style) element.style.cssText = data.style
  if (data.text) element.appendChild(document.createTextNode(data.text))
  if (data.placeholder) element.setAttribute('placeholder', data.placeholder)
  if (data.value) element.value = data.value
  if (data.html !== undefined) element.innerHTML = data.html
  if (data.event) element.addEventListener(data.event.type, data.event.function)
  Object.keys(data.attributes || []).forEach(attr => element.setAttribute(attr, data.attributes[attr]))

  //Children
  if (data.children) {
    data.children.forEach(child => createDom(child, element))
  }

  //Parent
  if (parent)
    (typeof parent === 'string' ? get(parent) : parent).appendChild(element)

  return element
}

// Selector
const get = selector => {
  return document.querySelector(selector)
}

// Guid
const guid = () => 'c' + ([1e7] + 1e3 + 4e3 + 8e3 + 1e11).replace(/[018]/g, c => (c ^ (crypto.getRandomValues(new Uint8Array(1))[0] & (15 >> (c / 4)))).toString(16))

// Date
const date = (days = 0, date = new Date()) => {
  if (typeof date === 'string') {
    date = new Date(date.substr(0, 10))
  }

  date.setDate(date.getDate() + Number(days))
  return date.toISOString().substr(0, 10)
}
