'use strict'

///////////////
// Main Tree //
///////////////

const all = {}
// const tree = []

const addComponent = (component, parentId) => {
  // if (parentId === 'root') {
  //   tree.push(component)
  // } else {
  //   all[parentId].parent = 
  // }

  component.parent = all[parentId]
  all[component.id] = component

  localStorage.setItem('data', JSON.stringify(all))
  return component
}

const getComponent = (componentId) => {
  return all[componentId]
  //TODO: treesearch
}

const clearStorage = () => localStorage.clear()

//TODO: Read localStorage and load

// Attach Events
get('#clearStorage').addEventListener('click', clearStorage)
