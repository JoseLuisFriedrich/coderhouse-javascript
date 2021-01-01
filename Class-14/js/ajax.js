'use strict'

//////////
// Ajax //
//////////

const endpoint = 'https://my-json-server.typicode.com/JoseLuisFriedrich/coderhouse-javascript/sampleData'

const getSampleDataFromServer = () => {

  set('#message', 'Cargando...')

  $.ajax({
    url: endpoint,
    dataType: 'json',
    success: function (data) {
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
$('#sampleData').on('click', getSampleDataFromServer)
