export const sendNuiMessage = (name: string, data: unknown = {}) => {
  SendNuiMessage(JSON.stringify({ type: name, data }))
}

export const registerNuiCallback = <T>(
  name: string,
  callback: (data: T) => Promise<void>
) => {
  RegisterNuiCallbackType(name)

  on(`__cfx_nui:${name}`, async (data: T, cb: (response: unknown) => void) => {
    const response = await callback(data)
    cb(response)
  })
}
