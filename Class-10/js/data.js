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

    if (parentLastChild) {
      const domParent = get(`#${parentLastChild.id}`)
      domParent.parentNode.insertBefore(component.renderProjectComponent(), domParent.nextSibling);
    } else {
      const domParent = get(`#${parentId}`)
      domParent.parentNode.insertBefore(component.renderProjectComponent(), domParent.nextSibling);
    }

    parent.appendChild(component)

    //referenceNode
    //get(`#${parentId}`).appendChild(component.renderProjectComponent())
    //console.log()
  }

  // console.log(`Added ${component.id} in parent ${parentId}`)
  console.log(tree)

  //Storage
  localStorage.setItem('data', JSON.stringify(all))

  return component
}

// const search = (value) => {
//   const stack = [tree[0]]
//   while (stack.length) {
//     const node = stack['shift']()
//     if (node['id'] === value) return node
//     node.children && stack.push(...node.children)
//   }
//   return null
// }

// const getComponent = (componentId) => {
//   console.log(all.filter((c) => c.id === componentId))
//   return all.filter((c) => c.id === componentId)
//   //TODO: treesearch
// }

const clearStorage = () => localStorage.clear()

//TODO: Read localStorage and load

// Attach Events
get('#clearStorage').addEventListener('click', clearStorage)
