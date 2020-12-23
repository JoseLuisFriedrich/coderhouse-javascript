'use strict'

///////////////
// Main Tree //
///////////////

const flat = []
const tree = []

const addComponent = (component, parentId) => {
  if (parentId === 'root') {
    // Tree
    tree.push(component)

    // Flat
    flat.push(component)

    // UI
    get('#root').appendChild(component.renderProjectComponent())
  } else {
    // Flat
    const parent = flat.filter(c => c.id === parentId)[0]
    const parentLastChild = parent.lastChild(true) || parent
    flat.splice(flat.indexOf(parentLastChild) + 1, 0, component) //insert, in order, component in flat, in order

    //update UI
    const domParent = get(`#${parentLastChild.id}`);
    domParent.parentNode.insertBefore(component.renderProjectComponent(), domParent.nextSibling)

    // Tree
    parent.appendChild(component)
  }
  //console.log(flat)

  saveTree()
  return component
}

const saveTree = () => {
  // Storage
  localStorage.setItem('treeData', JSON.stringify(tree))
}

const loadFromStorage = () => {
  // Attach Events
  get('#clearStorage').addEventListener('click', clearStorage)

  // Load from Storage
  const reloadComponents = (dataArray, parentId) => {
    dataArray.forEach(componentData => {
      const component = classFactory(componentData.type)
      component.createFrom(componentData)

      addComponent(component, parentId)
      reloadComponents(componentData.children, component.id)
    })
  }

  reloadComponents(JSON.parse(localStorage.getItem('treeData') || '[]'), 'root')
}

const clearStorage = () => {
  localStorage.clear()
  location.reload()
}
