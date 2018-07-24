import request from 'superagent'
import { baseUrl } from '../constants'

export const GET_SERVICES = 'GET_SERVICES'
export const GET_LOCATIONS = 'GET_LOCATIONS'
export const GET_EMPLOYEES = 'GET_EMPLOYEES'
export const GET_TIMES = 'GET_TIMES'

export const getServices = () => (dispatch , getState) =>
 {
  const state = getState()
  request 
  .get (`${baseUrl}/services.json`)
  .then (response => {
    console.log(response.body.services)
    dispatch ({
      type: GET_SERVICES,
      payload: response.body.services
    })
  })
}


export const getLocations = () => (dispatch , getState) =>
 {
  const state = getState()
  request 
  .get (`${baseUrl}/bookings/locations.json`)
  .then (response => {
    console.log(response.body)
    dispatch ({
      type: GET_LOCATIONS,
      payload: response.body.locations
    })
  })
}

export const getEmployees = () => (dispatch , getState) =>
 {
  const state = getState()
  request 
  .get (`${baseUrl}/bookings/resources.json`)
  .then (response => {
    console.log(response.body)
    dispatch ({
      type: GET_EMPLOYEES,
      payload: response.body["resources/employees"]    })
  })
}


export const getTimes = (serviceId, date) => (dispatch , getState) =>
 {
  const state = getState(serviceId, date)
  request 
  .get (`https://codaisseur-booking-widget.salonized.com/bookings/timeslots?service_ids=${serviceId}&date=${date}`)
  .then (response => {
    console.log(response.body)
    dispatch ({
      type: GET_TIMES,
      payload: response.body    })
  })
}


