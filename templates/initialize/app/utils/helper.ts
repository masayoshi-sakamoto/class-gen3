export function textColor(hexcolor: string) {
  const r = parseInt(hexcolor.substr(1, 2), 16)
  const g = parseInt(hexcolor.substr(3, 2), 16)
  const b = parseInt(hexcolor.substr(5, 2), 16)

  return (r * 299 + g * 587 + b * 114) / 1000 < 128 ? 'white--text' : 'black--text'
}
