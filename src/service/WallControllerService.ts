import axios from "axios";
import { Client } from "@stomp/stompjs";
import { computed, reactive } from "vue";
import { VueCookieNext } from "vue-cookie-next";
import { Inactivity } from "./Inactivity";
import { WallScreenControl } from "./interactionWallScreen/WallScreenControl";
import { Connection } from "./interactionWallScreen/Connection";
import { useUtils } from "./Utils";
import { allInteractionControls } from "./interactionWallApp/InteractionControls";
import { InteractionControls } from "./interactionWallApp/InteractionToWallApp";
import { InteractionWallAppType } from "./interactionWallApp/InteractionFromWallApp";
import { WallControllerConfig } from "./models/WallControllerConfig";
import { useSounds } from "./interactionWallApp/Sounds";
import { IWallState } from "./models/WallState";
import { IUserSessionData } from "./models/UserSessionData";

const { isInteractionControlArray, isInteractionType } = useUtils();
const { setAudioOnFirstInteraction, playAudio } = useSounds();

const inactivity = new Inactivity();

const wallControllerState = reactive({
  allowed: false,
  remindInactivity: false,
  showNotification: false,
  notificationText: "",
  movementPermissionNeeded: true,
  config: {} as WallControllerConfig,
  userSessionData: {} as IUserSessionData,
  wallState: {} as IWallState,
})


//for axios request
const apiClient = axios.create({
  withCredentials: true,
});

//for STOMP communication
const wsurl = "ws://192.168.178.28:8080/thewall";
const stompclient = new Client({ brokerURL: wsurl });

/**
 * asks Wall-Server to check token for validity
 * if token is valid user-session-data is set
 * and config and state data is asked from Wall-Server
 * @param token 
 */
async function checkToken(token: string) {
  const url = "/wallcontroller/checktoken";

  apiClient
    .get(url + "/" + token + "/")
    .then((response) => {
      wallControllerState.userSessionData = response.data;
      wallControllerState.allowed = true

      //get current Wall-Screen-State and Configs
      getWallState();
      getConfig();

      // get cookie from request and start tracking inactivity of session
      VueCookieNext.setCookie("JSESSIONID", wallControllerState.userSessionData.session);
      subscribeToWallServer();
      //setting audio on first touch so that html allows sounds afterwards
      setAudioOnFirstInteraction();
    })
    .catch((error) => {
      console.log(error);
    });
}

/**
 * gets Wall-State from Wall-Server to know if Wall-Scrren is paused
 * or which Interaction-Controls are currently needed
 */
async function getWallState() {
  apiClient
    .get("/wallcontroller/wallstate/" + wallControllerState.userSessionData.id)
    .then((response) => {
      wallControllerState.wallState = response.data;
      const interactionControls = response.data.currentInteractionControls as InteractionControls[];
      changeInteractionControls(interactionControls)
      wallControllerState.wallState.customButtons = response.data.currentWallApp.customButtons;
    })
    .catch((error) => {
      console.log(error);
    });
}

/**
 * gets Wall-Config relevant for Wall-Controller from Wall-Server
 */
async function getConfig() {
  apiClient
    .get("/wallcontroller/wallconfig")
    .then((response) => {
      wallControllerState.config = response.data;
      inactivity.startChecking();
    })
    .catch((error) => {
      console.log(error);
    });
}

/**
 * sends given changed name to Wall-Server
 * @param name
 */
function sendName(name: string) {
  apiClient
    .post("/wallcontroller/name/" + wallControllerState.userSessionData.id, name)
    .then((response) => {
      wallControllerState.userSessionData = response.data;
    })
    .catch((error) => {
      console.log(error);
    });
}

/**
 * connects to Wall-Server tvia STOMP to receive Interactions from Wall-Server
 * sent by Wall-Screen (Wall-Apps)
 */
function subscribeToWallServer() {
  stompclient.onConnect = () => {
    stompclient.subscribe("/wallcontroller/" + wallControllerState.userSessionData.id, message => {

      //got info about groups amount of current Wall-App
      if (!isNaN(+message.body)) {
        wallControllerState.wallState.groups = Number(message.body);
      }
      //got Info about WallScreenControl
      else if (JSON.parse(message.body) in WallScreenControl) {
        setWallScreenControl(JSON.parse(message.body));
      }
      //got Disconnected
      else if (JSON.parse(message.body) === Connection.DISCONNECT) {
        clearStore(false);
      }

      //change interactionControls
      else if (isInteractionControlArray(JSON.parse(message.body))) {
        changeInteractionControls(JSON.parse(message.body))

        //WallApp sent interaction
      } else if (isInteractionType(JSON.parse(message.body))) {
        const interaction = JSON.parse(message.body) as InteractionWallAppType;
        interaction.forInteractionControl ? interactionFromWallServer(interaction) : interactionForWallController(interaction);

      }//Wall-App has Custom-Buttons
      else if (Array.isArray(JSON.parse(message.body))) {
        setCustomButtons(message.body)
      }
    });

  };
  stompclient.activate();
}

/**
 * sets CustomButton for Wall-Controller-Footer if reguired by Wall-App
 * @param buttons
 */
function setCustomButtons(buttons: string) {
  wallControllerState.wallState.customButtons = [];
  const array = JSON.parse(buttons) as string[]
  if (array.length == 1 && array[0] == "null") {
    wallControllerState.wallState.customButtons = null;
  } else {
    wallControllerState.wallState.customButtons = array;
  }
}

/**
 * sends giveninteraction to Wall-Server via STOMP
 * @param body 
 * @param path 
 */
function sendInteractionToWallServer(body: string, path: string) {
  stompclient.publish({
    destination: "/wallcontroller/" + path + "/" + wallControllerState.userSessionData.id,
    body: body
  });
}

/**
 * forwards received interaction to Interaction-Control
 * @param interaction 
 */
function interactionFromWallServer(interaction: InteractionWallAppType) {
  wallControllerState.wallState.currentInteractionControls.forEach(i => {
    if (i.onInteraction !== undefined) {
      i.onInteraction(interaction);
    }
  })

}

/**
 * executes received interaction in case not for Interaction-Control
 * @param interaction 
 */
function interactionForWallController(interaction: InteractionWallAppType) {
  switch (interaction.name) {
    case InteractionWallAppType.VIBRATION.name: {
      if ("vibrate" in navigator) {
        navigator.vibrate(200);
      } else {
        showNotification("VIBRATE");
      }
      break;
    }
    case InteractionWallAppType.NOTIFICATION.name: {
      showNotification(interaction.values![0].value);
      break;
    }
    case InteractionWallAppType.SOUND.name: {
      playAudio(interaction.values![0].value);
      break;
    }
  }

}

/**
 * sets alowwence for Wall-Control or WallScreen-State of Paused
 * @param wallScreenControl 
 */
function setWallScreenControl(wallScreenControl: WallScreenControl) {
  switch (wallScreenControl) {
    case WallScreenControl.PAUSE: {
      wallControllerState.wallState.paused = true;
      break;
    }
    case WallScreenControl.PLAY: {
      wallControllerState.wallState.paused = false;
      break;
    }
    case WallScreenControl.ALLOW: {
      wallControllerState.userSessionData.wallControl = true;
      break;
    }
    case WallScreenControl.DISALLOW: {
      wallControllerState.userSessionData.wallControl = false;
      break;
    }
  }
}

/**
 * removes Cookie and Data to end Session
 * if session ended by Wall-Controller informs Wall-Server
 * @param inform 
 */
function clearStore(inform: boolean) {
  inactivity.stopChecking();
  wallControllerState.allowed = false;
  if (inform) {
    const id = wallControllerState.userSessionData.id
    apiClient
      .put("/wallcontroller/endSession/" + id)
      .catch((error) => {
        console.log(error);
      });
  }
  VueCookieNext.removeCookie("JSESSIONID");
  wallControllerState.userSessionData = {} as IUserSessionData;
}

/**
 * sets Notification for Wall-Controller to be shown for 
 * confugred time
 * @param text 
 */
function showNotification(text: string) {
  wallControllerState.notificationText = text;
  wallControllerState.showNotification = true;
  setTimeout(() => {
    wallControllerState.showNotification = false,
      wallControllerState.notificationText = ""
  }, wallControllerState.config.notificationTime)

}

/**
 *  changes current Interaction-Controls to given Interaction-Controls
 * @param interactionControl
 */
function changeInteractionControls(interactionControl: Array<InteractionControls>) {
  wallControllerState.wallState.currentInteractionControls = [];
  allInteractionControls.forEach((interactioncontrol) => {
    interactionControl.forEach(i => {
      if (interactioncontrol.name == i) {
        wallControllerState.wallState.currentInteractionControls.push(interactioncontrol);
      }
    })

  })
}
function setReminder(show: boolean) {
  wallControllerState.remindInactivity = show;
}
function setPermission(needed: boolean) {
  wallControllerState.movementPermissionNeeded = needed;
}

export function useWallController() {
  return {
    checkToken,
    sendInteractionToWallServer,
    clearStore,
    setReminder,
    setPermission,
    sendName,
    wallControllerState: computed(() => wallControllerState),
    userSessionData: computed(() => wallControllerState.userSessionData),
    wallState: computed(() => wallControllerState.wallState)
  }
}