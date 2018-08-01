export const GO_BACK = 'GO_BACK';
export const GO_FORWARD = 'GO_FORWARD';

export function goBack() {
  return {
    type: GO_BACK,
  };
}

export function goForward() {
  return {
    type: GO_FORWARD,
  };
}
