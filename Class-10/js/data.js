'use strict'

///////////////
// Main Tree //
///////////////

const all = []
const tree = []

const addComponent = (component, parentId) => {
  //All
  all.push(component)

  //Tree
  if (parentId === 'root') {
    tree.push(component)
    get('#root').appendChild(component.renderProjectComponent())
  } else {
    const parent = all.filter(c => c.id === parentId)[0]
    const parentLastChild = parent.last(true)

    const domParent = get(parentLastChild ? `#${parentLastChild.id}` : `#${parentId}`);
    domParent.parentNode.insertBefore(component.renderProjectComponent(), domParent.nextSibling);
    parent.appendChild(component)
  }

  // console.log(`Added ${component.id} in parent ${parentId}`)
  console.log(tree)

  //Storage
  localStorage.setItem('data', JSON.stringify(all))

  return component
}

const clearStorage = () => localStorage.clear()

// Attach Events
get('#clearStorage').addEventListener('click', clearStorage)

//TODO: Read localStorage and load
