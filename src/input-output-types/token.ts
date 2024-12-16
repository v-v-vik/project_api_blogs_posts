export type Payload = {
    userId: string,
    deviceId: string,
    iat: number,
    exp: number
}

export type CodePayload = {
    email: string,
    iat: number,
    exp: number
}