'use strict'

///////////////
// Main Tree //
///////////////

const all = []
const tree = []

const addComponent = (component, parentId) => {
  //Tree
  if (parentId === 'root') {
    all.push(component)
    tree.push(component)
    get('#root').appendChild(component.renderProjectComponent())
  } else {
    const parent = all.filter(c => c.id === parentId)[0]
    const parentLast = parent.lastChild(true) || parent
    all.splice(all.indexOf(parentLast) + 1, 0, component) //insert, in order, component in all, in order

    //update UI
    const domParent = get(`#${parentLast.id}`);
    domParent.parentNode.insertBefore(component.renderProjectComponent(), domParent.nextSibling)
    parent.appendChild(component)
  }
  //console.log(all)

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
