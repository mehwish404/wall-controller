import { InteractionKey } from "./InteractionKey"
import { InteractionProperty } from "./InteractionProperty"

export class InteractionWallAppType {
    static SOUND = new InteractionWallAppType('SOUND', false, [{ name: InteractionKey.SOUND, value: "0" }])
    static VIBRATION = new InteractionWallAppType('VIBRATION', false)
    static NOTIFICATION = new InteractionWallAppType('NOTIFICATION', false, [{ name: InteractionKey.TEXT, value: "" }])
    static PROGRESS = new InteractionWallAppType('PROGRESS', true, [{ name: InteractionKey.PROGRESSPERCENT, value: "" }])
    static OPTIONS = new InteractionWallAppType('OPTIONS', true, [{ name: InteractionKey.OPTIONS, value: "" }, { name: InteractionKey.MULTIPLE, value: "" }])
    static VIDEOPAUSE = new InteractionWallAppType('VIDEOPAUSE', true);
    static VIDEOPLAY = new InteractionWallAppType('VIDEOPLAY', true);
    static VIDEOSPEED = new InteractionWallAppType('VIDEOSPEED', true, [{ name: InteractionKey.SPEED, value: "0" }]);

    private constructor(public name: string, public forInteractionControl: boolean, public values?: InteractionProperty[]) {
    }

}

export enum SOUNDS{
    PONG="PONG",
    BALLON="BALLON"
}