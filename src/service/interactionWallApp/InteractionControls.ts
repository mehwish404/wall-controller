//Interface for Wall-Controllers
import { useWallController } from "../WallControllerService";
import { InteractionControls, InteractionType} from "./InteractionToWallApp";
import { InteractionWallAppType } from "./InteractionFromWallApp";

const { sendInteractionToWallServer} = useWallController()

export class InteractionControl {
  name: InteractionControls;
  component: any;
  interactionTypes: InteractionType[];
  onInteraction?: (interaction: InteractionWallAppType) => void;

  constructor(name: InteractionControls, component: any, interactionTypes: InteractionType[]) {
    this.name = name;
    this.component = component;
    this.interactionTypes = interactionTypes;
  }

  setOnInteraction(onInteraction: (interaction: InteractionWallAppType) => void){
    this.onInteraction=onInteraction;
  }

  sendInteraction(interaction: InteractionType) {
    sendInteractionToWallServer(JSON.stringify(interaction),"interaction");
  }
}

//Swipe
import Swipe from "/src/components/Swipe.vue";
export const SwipeInteractionControl = new InteractionControl(InteractionControls.SWIPE, Swipe, [InteractionType.SWIPE_DOWN, InteractionType.SWIPE_LEFT, InteractionType.SWIPE_RIGHT, InteractionType.SWIPE_UP]);

//Default
import Default from "/src/components/Default.vue";
export const DefaultInteractionControl = new InteractionControl(InteractionControls.DEFAULT, Default, []);

//Navigate
import Navigate from "/src/components/Navigate.vue";
export const NavigateInteractionControl = new InteractionControl(InteractionControls.NAVIGATE, Navigate, [InteractionType.NAVIGATE_DOWN, InteractionType.NAVIGATE_LEFT, InteractionType.NAVIGATE_RIGHT, InteractionType.NAVIGATE_OK, InteractionType.NAVIGATE_UP]);

//MovementInteractionControl
import Movement from "/src/components/Movement.vue";
export const MovementInteractionControl = new InteractionControl(InteractionControls.MOVEMENT, Movement, [InteractionType.ORIENTATION, InteractionType.MOVEMENT]);

//VideoInteractionControl
import VideoControl from "/src/components/VideoControl.vue";
export const VideoInteractionControl = new InteractionControl(InteractionControls.VIDEOCONTROL, VideoControl, [InteractionType.VIDEOPROGRESS,InteractionType.VIDEOBACK, InteractionType.VIDEONEXT, InteractionType.VIDEOPAUSE, InteractionType.VIDEOPLAY, InteractionType.VIDEOSTOP, InteractionType.VIDEOSPEED]);

//SelectionInteractionControl
import Selection from "/src/components/Selection.vue";
export const SelectionInteractionControl = new InteractionControl(InteractionControls.SELECTION, Selection, [InteractionType.SELECTED]);

//TextInputInteractionControl
import TextInput from "/src/components/TextInput.vue";
export const TextInputInteractionControl = new InteractionControl(InteractionControls.TEXTINPUT, TextInput, [InteractionType.TEXT]);

//all InteractionControls for WallController in a list
export const allInteractionControls = [SwipeInteractionControl,DefaultInteractionControl,NavigateInteractionControl,MovementInteractionControl,VideoInteractionControl,SelectionInteractionControl,TextInputInteractionControl]
