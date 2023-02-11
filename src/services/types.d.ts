export interface SocketMessage {
    id: string,
    bits: number,
    subscription: boolean,
    message: string,
    displayName: string,
}