/*
  José Luis Friedrich
*/

'use strict'

const showMessage = (text, url) => {
  Swal.fire({
    title: text,
    width: 600,
    padding: '3em',
    backdrop: `
      rgba(0,0,123,0.4)
      url(${url})
      left top
      no-repeat
    `,
  })
}

const average = (array1, array2) => {
  const totalArray = array1.concat(array2) //[...array1, ...array2]
  let sum = totalArray.reduce((total, current) => (total += current))
  return [totalArray, sum / totalArray.length]
}

const result = average([4, 8, 15], [16, 23, 42])
showMessage(`Average of ${result[0]} is ${result[1]}`, 'https://media1.tenor.com/images/692dd021bb616a9678644a3903e1b247/tenor.gif?itemid=8416367')
