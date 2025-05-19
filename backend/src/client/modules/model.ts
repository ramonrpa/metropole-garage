export const loadModel = async (model: number, delay = 250) => {
  if (!IsModelInCdimage(model) || !IsModelValid(model)) {
    return
  }

  RequestModel(model)

  if (!HasModelLoaded(model)) {
    return new Promise((resolve) => {
      const interval = setInterval(() => {
        if (HasModelLoaded(model)) {
          clearInterval(interval)
          resolve(true)
        }
      }, delay)
    })
  }

  return
}
