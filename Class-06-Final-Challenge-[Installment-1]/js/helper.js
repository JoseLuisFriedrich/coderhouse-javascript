'use strict'

/////////////////
// Aux methods //
/////////////////

// Selector
const get = (selector) => document.querySelector(selector)

// Selector Array
const getAll = (selector) => document.querySelectorAll(selector) || []

// Guid
const guid = () => 'x' + ([1e7] + 1e3 + 4e3 + 8e3 + 1e11).replace(/[018]/g, (c) => (c ^ (crypto.getRandomValues(new Uint8Array(1))[0] & (15 >> (c / 4)))).toString(16))

// String to Element
const element = (element) => {
  dummy = document.createElement('template')
  dummy.innerHTML = element.trim()
  return dummy.content.childNodes[0]
}
