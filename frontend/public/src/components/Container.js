export default function Container(children) {
  return `
    <div class="container mx-auto" style="max-width: 600px">
      ${children}
    </div>
  `;
}