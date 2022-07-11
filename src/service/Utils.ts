import { InteractionWallAppType } from "./interactionWallApp/InteractionFromWallApp";
import { InteractionControls } from "./interactionWallApp/InteractionToWallApp";
import {allInteractionControls} from "./interactionWallApp/InteractionControls";

function isInteractionControlArray(type: Array<InteractionControls>): type is Array<InteractionControls> {
    const m = allInteractionControls.filter(i => i.name == (<Array<InteractionControls>>type)[0]);
    return m.length > 0
}

function isInteractionType(type: InteractionWallAppType): type is InteractionWallAppType {
    return (<InteractionWallAppType>type).name !== undefined;
}

export function useUtils(){
    return{
        isInteractionControlArray,
        isInteractionType
    }
}