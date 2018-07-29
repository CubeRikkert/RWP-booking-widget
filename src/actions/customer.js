export const FIRST_NAME = 'FIRST_NAME';
export const LAST_NAME = 'LAST_NAME';
export const ADDRESS = 'ADDRESS';
export const POSTAL_CODE = 'POSTAL_CODE';
export const CITY = 'CITY';
export const PHONE = 'PHONE';
export const EMAIL = 'EMAIL';
export const NOTES = 'NOTES';

export function firstName(firstName) {
  return {
    type: FIRST_NAME,
    payload: firstName,
  };
}

export function lastName(lastName) {
  return {
    type: LAST_NAME,
    payload: lastName,
  };
}

export function address(address) {
  return {
    type: ADDRESS,
    payload: address,
  };
}

export function postalCode(postalCode) {
  return {
    type: POSTAL_CODE,
    payload: postalCode,
  };
}

export function city(city) {
  return {
    type: CITY,
    payload: city,
  };
}

export function phone(phone) {
  return {
    type: PHONE,
    payload: phone,
  };
}

export function email(email) {
  return {
    type: EMAIL,
    payload: email,
  };
}

export function notes(notes) {
  return {
    type: NOTES,
    payload: notes,
  };
}
