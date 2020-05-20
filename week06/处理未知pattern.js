function match(pattern, str) {
    let functions = [],
      matchLenArr = getPatternMatchArr(pattern)

    for (let i = 0; i < pattern.length; i++) {
      let matchLen = i == 0 ? 0 : matchLenArr[i - 1]
      let func = createFunc(i, pattern, matchLen)
      functions.push(func)
    }
    functions.push(end)

    let state = functions[0]
    for (let c of str) {
      state = state(c, functions)
      if (state === end) break
    }

    return state === end
  }

  function createFunc(i, pattern, matchLen) {
    let char = pattern[i],
      len = pattern.length
    let functionBody = `
      if('${char}'===c){
         return functions[${i + 1}]
      }
      return ${
        i == 0
          ? `functions[0]`
          : matchLen == 0
          ? `functions[0](c,functions)`
          : `functions[${matchLen}](c,functions)`
      }
    `
    return new Function("c", "functions", functionBody)
  }

  function end() {
    return end
  }

  function getPatternMatchArr(pattern) {
    let arr = []
    for (let i = 0; i < pattern.length; i++) {
      arr.push(getPatternMatchLen(pattern.slice(0, i + 1)))
    }
    return arr
  }

  function getPatternMatchLen(pattern) {
    let startArr = [],
      endArr = []
    for (let i = 0; i < pattern.length - 1; i++) {
      startArr.unshift(pattern.slice(0, i + 1))
      endArr.unshift(pattern.slice(-i - 1))
    }
    for (let i = 0; i < startArr.length; i++) {
      if (startArr[i] === endArr[i]) {
        return startArr.length - i
      }
    }
    return 0
  }

  console.log(match("abc", "abc"))
  console.log(match("abc", "abd"))
  console.log(match("abc", "abcdef"))
  console.log(match("abdabc", "edfsabdabdabc"))
  console.log(match("abccba", "abccbbabccbbabccba"))