import { InteractionControl } from "../interactionWallApp/InteractionControls";
import { IWallApp } from "./WallApp";

export interface IWallScreenState{
    wallAppsList: IWallApp[],
    currentInteractionControls:InteractionControl[],
    paused:boolean,
    customButtons: string[]|null,
    groups:number;
}