import { InteractionKey } from "./InteractionKey";
import { InteractionProperty } from "./InteractionProperty";

export enum InteractionControls {
  SWIPE = "SWIPE",
  DEFAULT = "DEFAULT",
  NAVIGATE = "NAVIGATE",
  MOVEMENT = "MOVEMENT",
  VIDEOCONTROL = "VIDEOCONTROL",
  SELECTION = "SELECTION",
  TEXTINPUT = "TEXTINPUT"
}

export class InteractionType {
  static SWIPE_LEFT = new InteractionType('SWIPE_LEFT', [{ name: InteractionKey.STARTX, value: "0" }, { name: InteractionKey.ENDX, value: "0" }, { name: InteractionKey.STARTY, value: "0" }, { name: InteractionKey.ENDY, value: "0" }] as InteractionProperty[]);
  static SWIPE_RIGHT = new InteractionType('SWIPE_RIGHT', [{ name: InteractionKey.STARTX, value: "0" }, { name: InteractionKey.ENDX, value: "0" }, { name: InteractionKey.STARTY, value: "0" }, { name: InteractionKey.ENDY, value: "0" }] as InteractionProperty[]);
  static SWIPE_DOWN = new InteractionType('SWIPE_DOWN', [{ name: InteractionKey.STARTX, value: "0" }, { name: InteractionKey.ENDX, value: "0" }, { name: InteractionKey.STARTY, value: "0" }, { name: InteractionKey.ENDY, value: "0" }] as InteractionProperty[]);
  static SWIPE_UP = new InteractionType('SWIPE_UP', [{ name: InteractionKey.STARTX, value: "0" }, { name: InteractionKey.ENDX, value: "0" }, { name: InteractionKey.STARTY, value: "0" }, { name: InteractionKey.ENDY, value: "0" }] as InteractionProperty[]);

  static NAVIGATE_UP = new InteractionType("NAVIGATE_UP");
  static NAVIGATE_DOWN = new InteractionType("NAVIGATE_DOWN");
  static NAVIGATE_LEFT = new InteractionType("NAVIGATE_LEFT");
  static NAVIGATE_RIGHT = new InteractionType("NAVIGATE_RIGHT");
  static NAVIGATE_OK = new InteractionType("NAVIGATE_OK");

  static ORIENTATION = new InteractionType('ORIENTATION', [{ name: InteractionKey.ABSOLUTE, value: "0" }, { name: InteractionKey.ALPHA, value: "0" }, { name: InteractionKey.BETA, value: "0" }, { name: InteractionKey.GAMMA, value: "0" }] as InteractionProperty[]);
  static MOVEMENT = new InteractionType('Movement', [{ name: InteractionKey.ACCELERATIONX, value: "0" }, { name: InteractionKey.ACCELERATIONY, value: "0" }, { name: InteractionKey.ACCELERATIONZ, value: "0" }, { name: InteractionKey.ACCELERATIONGRAVITYX, value: "0" }, { name: InteractionKey.ACCELERATIONGRAVITYY, value: "0" }, { name: InteractionKey.ACCELERATIONGRAVITYZ, value: "0" }, { name: InteractionKey.ALPHA, value: "0" }, { name: InteractionKey.BETA, value: "0" }, { name: InteractionKey.GAMMA, value: "0" }, { name: InteractionKey.INTERVAL, value: "0" }] as InteractionProperty[]);

  static VIDEOPROGRESS = new InteractionType('VIDEOPROGRESS', [{ name: InteractionKey.PROGRESSPERCENT, value: "0" }] as InteractionProperty[]);
  static VIDEOPAUSE = new InteractionType('VIDEOPAUSE');
  static VIDEOPLAY = new InteractionType('VIDEOPLAY');
  static VIDEOSTOP = new InteractionType('VIDEOSTOP');
  static VIDEOSPEED = new InteractionType('VIDEOSPEED', [{ name: InteractionKey.SPEED, value: "0" }]);
  static VIDEOBACK = new InteractionType('VIDEOBACK');
  static VIDEONEXT = new InteractionType('VIDEONEXT');

  static SELECTED = new InteractionType('SELECTED', [{ name: InteractionKey.SELECTED, value: "0" }])
  static TEXT = new InteractionType('TEXT', [{ name: InteractionKey.TEXT, value: "" }])
  static CUSTOMBUTTON = new InteractionType('CUSTOMBUTTON', [{ name: InteractionKey.TEXT, value: "" }])

  private constructor(public name: string, public values?: InteractionProperty[]) {
  }
}




