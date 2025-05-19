export const createPreviewCamera = (vehicle: number) => {
  const previewCam = CreateCam('DEFAULT_SCRIPTED_CAMERA', true)

  const modelHash = GetEntityModel(vehicle)

  const [[, minY], [, maxY]] = GetModelDimensions(modelHash)
  const vehicleLength = maxY - minY

  const calculatedCameraDistance = Math.max(5, vehicleLength)

  const cameraHeightOffset = 2
  const cameraSideOffset = 5

  const vehicleCoords = GetEntityCoords(vehicle, false)
  const vehicleHeading = GetEntityHeading(vehicle)
  const headingRad = (vehicleHeading * Math.PI) / 180
  const camX =
    vehicleCoords[0] -
    Math.sin(headingRad) * calculatedCameraDistance +
    Math.cos(headingRad) * cameraSideOffset
  const camY =
    vehicleCoords[1] +
    Math.cos(headingRad) * calculatedCameraDistance +
    Math.sin(headingRad) * cameraSideOffset
  const camZ = vehicleCoords[2] + cameraHeightOffset

  SetCamCoord(previewCam, camX, camY, camZ)
  PointCamAtEntity(previewCam, vehicle, 0, 0, 0, true)

  RenderScriptCams(true, true, 0, true, false)

  return previewCam
}
