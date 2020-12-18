'use strict'

///////////////
// Main Tree //
///////////////

const all = {}

const addComponent = (component, parentId = 'root') => {
  // if (parentId == 'root') {
  //   tree.push(component)
  // } else {
  //   all[component.id].push(component)
  // }

  all[component.id] = component

  //TODO: save changes in localStorage

  return component
}

const getComponent = (componentId) => {
  return all[componentId]
  //TODO: treesearch
}


//TODO: load Storage


const clearStorage = () => localStorage.clear()

// Attach Events
get('#clearStorage').addEventListener('click', clearStorage)
