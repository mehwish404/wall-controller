import { reactive } from "vue";
import { useWallController } from "./WallControllerService";
import { InteractionControls } from "./interactionWallApp/InteractionToWallApp";
import axios from "axios";

const { setReminder, wallScreenState, wallControllerState } = useWallController();

/**
 * watches Acivity to keep Session alive
 * Sends Ping to Wall-Server to keep Session active
 * if current Interaction-Control watches DeviceMotion or DeviceOrientation
 * these events are considered as Activity
 */
export class Inactivity {
    state = reactive({
        reminder: 0,
        sendPing: true,
    });
    startChecking() {
        this.resetTimer();
        window.onload = this.resetTimer.bind(this);
        document.ontouchstart = this.resetTimer.bind(this);
        document.ontouchend = this.resetTimer.bind(this);
        window.ontouchstart = this.resetTimer.bind(this);
        document.onscroll = this.resetTimer.bind(this);
        window.ondevicemotion = this.checkBeforeResetTimer.bind(this);
        window.ondeviceorientation = this.checkBeforeResetTimer.bind(this);
    }

    stopChecking() {
        if (this.state.reminder) {
            clearTimeout(this.state.reminder);
            this.state.reminder = 0;
        }
    }

    resetTimer() {
        setReminder(false);
        if (this.state.reminder) {
            clearTimeout(this.state.reminder);
            this.state.reminder = 0;
        }
        this.state.reminder = setTimeout(() => setReminder(true), 1000 * wallControllerState.value.config.inactivetimeRemind);
        if (this.state.sendPing) {
            this.sendPing();
            this.state.sendPing = false;
            setTimeout(() => { this.state.sendPing = true }, 1000 * (wallControllerState.value.config.inactivetimeRemind / 3));
        }
    }
    checkBeforeResetTimer() {
        wallScreenState.value.currentInteractionControls.forEach(interaction => {
            if (interaction.name == InteractionControls.MOVEMENT) {
                this.resetTimer();
            }
        })
    }
    disconnect() {
        useWallController().clearStore(false);
    }
    sendPing() {
        const apiClient = axios.create({
            withCredentials: true,
        });
        apiClient
            .put("/wallcontroller/ping")
    }

}
