import request from 'superagent'
import { baseUrl } from '../constants'

export const GET_SERVICES = 'GET_SERVICES'
export const GET_LOCATIONS = 'GET_LOCATIONS'
export const GET_EMPLOYEES = 'GET_EMPLOYEES'
export const GET_TIMES = 'GET_TIMES'
export const GET_DATES = 'GET_DATES'
export const ADD_BOOKING = 'ADD_BOOKING'

export const getServices = () => (dispatch) =>
 {
  request 
  .get (`${baseUrl}/services.json`)
  .then (response => {
    // console.log(response.body.services)
    dispatch ({
      type: GET_SERVICES,
      payload: response.body.services
    })
  })
}


export const getLocations = () => (dispatch) =>
 {
  request 
  .get (`${baseUrl}/bookings/locations.json`)
  // .get (`https://codaisseur-booking-widget.salonized.com/bookings/locations.json`)
  .then (response => {
    // console.log(response.body)
    dispatch ({
      type: GET_LOCATIONS,
      payload: response.body.locations
    })
  })
}

export const getEmployees = () => (dispatch) =>
 {
  request 
  .get (`${baseUrl}/bookings/resources.json`)
  .then (response => {
    // console.log(response.body)
    dispatch ({
      type: GET_EMPLOYEES,
      payload: response.body["resources/employees"]    })
  })
}


export const getTimes = (serviceId, date) => (dispatch) =>
 {
  request 
  .get (`${baseUrl}/bookings/timeslots?service_ids=${serviceId}&date=${date}`)
  .then (response => {
    // console.log(response.body)
    dispatch ({
      type: GET_TIMES,
      payload: response.body    })
  })
}

export const getDates = (serviceId, date,resourceId) => (dispatch) =>
 {
  request 
  .get (`${baseUrl}/bookings/available_days?service_ids=${serviceId}&date=${date}&resource_id=${(resourceId)}`)
  .then (response => {
    // console.log(response.body)
    dispatch ({
      type: GET_DATES,
      payload: response.body.days    })
  })
}

// function post_to_url(url, params) {
//   var form = document.createElement('form');
//   form.action = url;
//   form.method = 'POST';

//   for (var i in params) {
//       if (params.hasOwnProperty(i)) {
//         if (i==='service_ids') {
//           var input = document.createElement('input');
//           input.type = 'hidden';
//           input.name = 'booking['+i+'][]';
//           input.value = params[i];
//           form.appendChild(input);
//         }
//         else {
//           var input = document.createElement('input');
//           input.type = 'hidden';
//           input.name = 'booking['+i+']';
//           input.value = params[i];
//           form.appendChild(input);
//         }
//       }
//   }
//   console.log(form,'form')

//   form.submit();
// }

function post(path, params, method) {
  method = method || "post"; // Set method to post by default if not specified.

  // The rest of this code assumes you are not using a library.
  // It can be made less wordy if you use one.
  var form = document.createElement("form");
  form.setAttribute("method", method);
  form.setAttribute("action", path);

  // for(var key in params) {
  //     if(params.hasOwnProperty(key)) {
  //         var hiddenField = document.createElement("input");
  //         hiddenField.setAttribute("type", "hidden");
  //         hiddenField.setAttribute("name", key);
  //         hiddenField.setAttribute("value", params[key]);

  //         form.appendChild(hiddenField);
  //     }
  // }

  for (var i in params) {
    if (params.hasOwnProperty(i)) {
      if (i==='service_ids') {
        var input = document.createElement('input');
        input.type = 'hidden';
        input.name = 'booking['+i+'][]';
        input.value = params[i];
        form.appendChild(input);
      }
      else {
        var input = document.createElement('input');
        input.type = 'hidden';
        input.name = 'booking['+i+']';
        input.value = params[i];
        form.appendChild(input);
      }
    }
  }

  document.body.appendChild(form);
  console.log(form,'form')
  form.submit();
}

export const addBooking = (booking) => (dispatch) => {
  console.log(booking,'booking')
  post(`${baseUrl}/bookings`,booking)
  return
  request
    .post(`${baseUrl}/bookings`)
    .send(booking)
    .then(response => {
      dispatch({
        type: ADD_BOOKING,
        payload: response.body
      })
    })
    .catch(err => console.log(err))
}