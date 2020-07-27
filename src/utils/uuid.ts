let id = 0;

export function genUuid() {
  return ++id;
}

export function getCurrentUuid() {
  return id;
}
