import { SendCommandReturn } from "./command"

interface GetChannelReturn {
    channel: string
}

export const getChannel = async ( ) : Promise<GetChannelReturn> => {
    const result = await fetch("http://localhost:3000/channel")
    const json = await result.json()
    return json as GetChannelReturn
}

export const setChannel = async ( channel : string) : Promise<SendCommandReturn> => {
  const result = await fetch("http://localhost:3000/channel", {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({
      channel
    })
  });
  const json = await result.json()
  return json as SendCommandReturn
}

export default {
    getChannel,
    setChannel
}