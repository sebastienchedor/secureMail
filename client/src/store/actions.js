export const RESET_SEND_MAIL = 'RESET_SEND_MAIL'
export const UPDATE_SEND_MAIL = 'UPDATE_SEND_MAIL'
export const UPDATE_READ_MAIL = 'UPDATE_READ_MAIL'

export function reset_send_mail(fieldName, value) {
  return {
    type: RESET_SEND_MAIL
  };
}

export function update_send_mail(fieldName, value) {
  return {
    type: UPDATE_SEND_MAIL,
    fieldName,
    value
  };
}

export function update_read_mail(fieldName, value) {
  return {
    type: UPDATE_READ_MAIL,
    fieldName,
    value
  };
}
