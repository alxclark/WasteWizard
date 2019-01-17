export default function htmlDecode(encodedHTML) {
  const tempDiv = document.createElement('div');
  tempDiv.innerHTML = encodedHTML;
  return tempDiv.childNodes.length === 0 ? "" : tempDiv.childNodes[0].nodeValue;
}