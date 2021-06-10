const shuffleArray = (array) => {
  var currentIndex = array.length,
    randomIndex

  // While there remain elements to shuffle...
  while (0 !== currentIndex) {
    // Pick a remaining element...
    randomIndex = Math.floor(Math.random() * currentIndex)
    currentIndex--

    // And swap it with the current element.
    ;[array[currentIndex], array[randomIndex]] = [
      array[randomIndex],
      array[currentIndex],
    ]
  }

  return array
}

const splitArray = (arr) => {
  const shuffledArr = shuffleArray(arr)
  let chunked = []
  Array.from({ length: Math.ceil(shuffledArr.length / 5) }, (val, i) => {
    return chunked.push(shuffledArr.slice(i * 5, i * 5 + 5))
  })

  return chunked
}

export { shuffleArray, splitArray }
