export const SELECT_LOCATION = 'SELECT_LOCATION';
export const SELECT_SERVICES = 'SELECT_SERVICES';
export const SELECT_EMPLOYEES = 'SELECT_EMPLOYEES';
export const SELECT_DATE = 'SELECT_DATE';
export const SELECT_TIME = 'SELECT_TIME';
export const RESET_TIME = 'RESET_TIME';
export const RESET_DATE = 'RESET_DATE';
export const RESET_FORM = 'RESET_FORM';
export const RESET_EMPLOYEE = 'RESET_EMPLOYEE';
export const RESET_LOCATION = 'RESET_LOCATION';
export const RESET_DATES = 'RESET_DATES';
export const RESET_TIMES = 'RESET_TIMES';

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

export function resetDate() {
  return {
    type: RESET_DATE,
  };
}

export function resetEmployee() {
  return {
    type: RESET_EMPLOYEE,
  };
}

export function resetLocation() {
  return {
    type: RESET_LOCATION,
  };
}

export function resetDates() {
  return {
    type: RESET_DATES,
  };
}

export function resetTimes() {
  return {
    type: RESET_TIMES,
  };
}
