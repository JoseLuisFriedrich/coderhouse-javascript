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
    const parentLastChild = parent.lastChild(true)

    const domParent = get(parentLastChild ? `#${parentLastChild.id}` : `#${parentId}`);
    domParent.parentNode.insertBefore(component.renderProjectComponent(), domParent.nextSibling);
    parent.appendChild(component)
  }

  // console.log(`Added ${component.id} in parent ${parentId}`)
  // console.log(tree)

  saveTree()

  return component
}

const saveTree = () => {
  //Storage
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
