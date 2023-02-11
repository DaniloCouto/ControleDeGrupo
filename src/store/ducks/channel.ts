const reducerName = 'channel'

export const Types = {
  NAME: `${reducerName}/NAME`
};

interface ChannelState {
  name: string | null;
}

interface ChannelAction {
  type: string;
  payload: string | null;
}
  
const initialState: ChannelState = { name: null };
  
export function reducer(state = initialState, action: ChannelAction): ChannelState {
  switch (action.type) {
    case Types.NAME:
      return { name: action.payload };
    default:
      return state;
  }
}

export const creators = {
  changeName: ( name : string): ChannelAction => ({
    type: Types.NAME,
    payload: name
  }),
  cleanName: ( ): ChannelAction => ({
    type: Types.NAME,
    payload: null
  })
}


export default reducer
  