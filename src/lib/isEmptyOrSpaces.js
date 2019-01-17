export default function isEmptyOrSpaces(string) {
  return string === null || string.match(/^ *$/) !== null;
}