// eslint-disable-next-line @typescript-eslint/no-extra-semi
export function isKeyboardEvent(event: any): event is React.KeyboardEvent {
    return !!event.key;
}
