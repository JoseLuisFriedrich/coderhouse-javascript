'use strict'

//////////
// Ajax //
//////////

const ajax = {}

const endpoint = 'https://my-json-server.typicode.com/JoseLuisFriedrich/coderhouse-javascript/sampleData'

ajax.getSampleData = () => {
  set('#message', 'Cargando...')

  $.ajax({
    url: endpoint,
    dataType: 'json',
    success: (data) => {
      // Clear storage
      clearStorage()

      // Load Components
      loadComponents(data, 'root')
      set('#message', '&nbsp;')
    },
    error: function (xhr) {
      set('#message', xhr.statusText)
    }
  })
}

// Attach Listener to sample data button
$('#sampleData').on('click', ajax.getSampleData)
