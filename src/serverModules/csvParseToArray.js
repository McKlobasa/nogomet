const fs = require('fs')

const readCsv = async (path) => {
  let arr = []
  try {
  await fs.createReadStream(path)
    .pipe(csv())
    .on('data', (data) => arr.push(data))
    .on('end', () => {
      console.log(arr);
    });
  } catch (err) {
    console.log(err)
  }
  return arr
}

module.exports = readCsv
