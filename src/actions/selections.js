export const SELECT_LOCATION = 'SELECT_LOCATION';
export const SELECT_SERVICES = 'SELECT_SERVICES';
export const SELECT_EMPLOYEES = 'SELECT_EMPLOYEES';
export const SELECT_DATE = 'SELECT_DATE';
export const SELECT_TIME = 'SELECT_TIME';
export const RESET_TIME = 'RESET_TIME';
export const RESET_FORM = 'RESET_FORM';

export function selectLocation(location) {
  return {
    type: SELECT_LOCATION,
    payload: location,
  };
}

export function selectServices(services) {
  return {
    type: SELECT_SERVICES,
    payload: services,
  };
}

export function selectEmployees(employees) {
  return {
    type: SELECT_EMPLOYEES,
    payload: employees,
  };
}

export function selectDate(date) {
  return {
    type: SELECT_DATE,
    payload: date,
  };
}

export function selectTime(time) {
  return {
    type: SELECT_TIME,
    payload: time,
  };
}

export function resetForm() {
  return {
    type: RESET_FORM,
  };
}

export function resetTime() {
  return {
    type: RESET_TIME,
  };
}
