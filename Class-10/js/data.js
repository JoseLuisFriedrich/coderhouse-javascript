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

  //console.log(tree)
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
