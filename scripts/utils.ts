import * as fs from 'fs'

export const writeFile = (
  folder: string,
  fileName: string,
  content: string
): void => {
  fs.mkdir(folder, { recursive: true }, (err) => {
    if (err) throw err
    const path = `${folder}/${fileName}`
    fs.writeFile(path, content, 'utf8', (err) =>
      // eslint-disable-next-line
      console.log(err ? err : `Write file ${path}`)
    )
  })
}
