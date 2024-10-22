export default function Button({ href, text }) {
  return `
    <a href="${href}" class="d-block btn btn-dark" style="width: 300px">
      ${text}
    </a>
  `;
}