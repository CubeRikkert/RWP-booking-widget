import request from 'superagent';
import { baseUrl } from '../constants';

export const GET_SERVICES = 'GET_SERVICES';
export const GET_LOCATIONS = 'GET_LOCATIONS';
export const GET_EMPLOYEES = 'GET_EMPLOYEES';
export const GET_TIMES = 'GET_TIMES';
export const GET_DATES = 'GET_DATES';
export const ADD_BOOKING = 'ADD_BOOKING';
export const GET_CONF = 'GET_CONF';

export const getServices = () => dispatch => {
  request.get(`${baseUrl}/services.json`).then(response => {
    dispatch({
      type: GET_SERVICES,
      payload: response.body.services,
    });
  });
};

export const getLocations = () => dispatch => {
  request
    .get(`${baseUrl}/bookings/locations.json`)
    // .get (`https://codaisseur-booking-widget.salonized.com/bookings/locations.json`)
    .then(response => {
      dispatch({
        type: GET_LOCATIONS,
        payload: response.body.locations,
      });
    });
};

export const getEmployees = () => dispatch => {
  request.get(`${baseUrl}/bookings/resources.json`).then(response => {
    dispatch({
      type: GET_EMPLOYEES,
      payload: response.body['resources/employees'],
    });
  });
};

export const getTimes = (
  serviceIds,
  date,
  resourceId,
  locationId,
) => dispatch => {
  request
    .get(
      `${baseUrl}/bookings/timeslots?${serviceIds}&date=${date}&
                                     resource_id=${resourceId}&
                                     location_id=${locationId}`,
    )
    .then(response => {
      dispatch({
        type: GET_TIMES,
        payload: response.body,
      });
    });
};

export const getDates = (
  serviceIds,
  date,
  resourceId,
  locationId,
) => dispatch => {
  request
    .get(
      `${baseUrl}/bookings/available_days?${serviceIds}&date=${date}&
                                          resource_id=${resourceId}&
                                          location_id=${locationId}`,
    )
    .then(response => {
      dispatch({
        type: GET_DATES,
        payload: response.body.days,
      });
    });
};

function postForm(path, params, method) {
  method = method || 'post';

  var form = document.createElement('form');
  form.setAttribute('method', method);
  form.setAttribute('action', path);

  for (var i in params) {
    if (params.hasOwnProperty(i)) {
      if (i === 'service_ids') {
        for (let p = 0; p < params[i].length; p++) {
          var input = document.createElement('input');
          input.type = 'hidden';
          input.name = 'booking[' + i + '][]';
          input.value = params[i][p];
          form.appendChild(input);
        }
      } else {
        var input = document.createElement('input');
        input.type = 'hidden';
        input.name = 'booking[' + i + ']';
        input.value = params[i];
        form.appendChild(input);
      }
    }
  }
  document.body.appendChild(form);
  form.submit();
}

export const addBooking = booking => dispatch => {
  request
    .post(`${baseUrl}/bookings`)
    .send(postForm(`${baseUrl}/bookings`, booking))
    .then(response => {
      dispatch({
        type: ADD_BOOKING,
        payload: response.body,
      });
    })
    .catch(err => console.log(err));
};
