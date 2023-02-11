export interface SendCommandReturn {
    success: boolean
    message: string
}

export const sendCommand = async ( key : string ) : Promise<SendCommandReturn> => {
    const result = await fetch(`http://localhost:3000/run-command?key=${key}`)
    const json = await result.json()
    return json as SendCommandReturn
}

export default {
    sendCommand
}