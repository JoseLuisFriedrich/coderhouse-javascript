/*
  José Luis Friedrich
*/

const alert = (text, icon = '') => {
  Swal.fire({
    text: text,
    icon: icon,
    confirmButtonText: 'OK',
  })
}

const average = (num1, num2) => {
  return (num1 + num2) / 2
}

let num1 = Number(prompt('Enter Number 1: '))
let num2 = Number(prompt('Enter Number 2: '))
const avg = average(num1, num2)

alert(`the average of ${num1} and ${num2} is ${avg}`)
