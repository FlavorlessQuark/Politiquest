import { Router } from "express";
import { KJUR } from 'jsrsasign'
import { inNumberArray, isBetween, isRequiredAllOrNone, validateRequest } from './validation'
const router = Router();

const propValidations = {
  role: inNumberArray([0, 1]),
  expirationSeconds: isBetween(1800, 172800)
}

const coerceRequestBody = (body: any) => ({
  ...body,
  ...['role', 'expirationSeconds'].reduce(
    (acc, cur) => ({ ...acc, [cur]: typeof body[cur] === 'string' ? parseInt(body[cur]) : body[cur] }),
    {}
  )
})

const schemaValidations = [isRequiredAllOrNone(['meetingNumber', 'role'])]

router.post('/get-signature', (req, res) => {
//   const requestBody = coerceRequestBody(req.body)
//   const validationErrors = validateRequest(requestBody, propValidations, schemaValidations)

//   if (validationErrors.length > 0) {
//     return res.status(400).json({ errors: validationErrors })
//   }

  const { meetNumber, role, expirationSeconds } = req.body;
  const iat = Math.floor(Date.now() / 1000)
  const exp = expirationSeconds ? iat + expirationSeconds : iat + 60 * 60 * 2
  const oHeader = { alg: 'HS256', typ: 'JWT' }

    console.log("got meeting no", meetNumber, req.body)
  const oPayload = {
    appKey: process.env.ZOOM_SDK_KEY,
    sdkKey: process.env.ZOOM_SDK_KEY,
    mn: meetNumber,
    role,
    iat,
    exp,
    tokenExp: exp
  }

  const sHeader = JSON.stringify(oHeader)
  const sPayload = JSON.stringify(oPayload)
  const sdkJWT = KJUR.jws.JWS.sign('HS256', sHeader, sPayload, process.env.ZOOM_SDK_SECRET)
  return res.json({ signature: sdkJWT })
})

export default router;
