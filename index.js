
const chroma = require('chroma-js')
const hello = require('hello-color').default

const getBase = () => {
  let base = chroma.random()
  while (chroma(base).hsl()[1] > 1 / 3) {
    base = chroma(base).desaturate(1 / 8).hex()
  }
  return base
}

exports.decorateConfig = config => {
  const base = getBase()
  const {
    color,
    scale,
    hues
  } = hello(base, {
    hues: 5,
    contrast: 5,
  })

  const foregroundColor = color
  const backgroundColor = base
  const borderColor = scale[1]

  const colors = [
    backgroundColor,
    scale[7],
    scale[7],
    scale[7],
    scale[6],
    scale[5],
    scale[5],
    scale[5],
    scale[6],
    scale[7],
    scale[7],
    scale[6],
    scale[5],
    scale[5],
    scale[5],
    foregroundColor,
    foregroundColor
  ]

  return Object.assign({}, config, {
    foregroundColor,
    backgroundColor,
    borderColor,
    colors,
    termCSS: `${config.termCSS || ''} .cursor-node{mix-blend-mode:difference;}`
  })
}

