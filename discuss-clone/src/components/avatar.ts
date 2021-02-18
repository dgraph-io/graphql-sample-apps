export function avatar(img: string | null | undefined) {
  return img ?? "/" + Math.floor(Math.random() * (9 - 1) + 1) + ".svg"
}
