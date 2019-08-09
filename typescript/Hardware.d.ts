declare module "react-native-voximplant" {
    namespace Voximplant {
        namespace Hardware {
            /*
             * Enum representing audio devices
             * */
            export enum AudioDevice {
                /*
                 * Bluetooth headset
                 * */
                BLUETOOTH = "Bluetooth",
                /*
                 * Earpiece
                 * */
                EARPIECE = "Earpiece",
                /*
                 * No audio device, generally indicates that something is wrong with audio device selection.
                 * Should not be selected via {$link AudioDeviceManager.selectAudioDevice}
                 * */
                NONE = "None",
                /*
                 * Speaker
                 * */
                SPEAKER = "Speaker",
                /*
                 * Wired headset
                 * */
                WIRED_HEADSET = "WiredHeadset"
            }

            /*
    * Events that may be used to monitor and handle audio device change events
    * */
            export enum AudioDeviceEvents {
                /**
                 * Event is triggered when active audio device or audio device that will be used for a further call is changed.
                 * Handler function receives {@link EventHandlers.DeviceChanged} object as an argument.
                 */
                DeviceChanged = 'DeviceChanged',
                /**
                 * Event is triggered when a new audio device is connected or previously connected audio device is disconnected.
                 * Handler function receives {@link EventHandlers.DeviceListChanged} object as an argument.
                 */
                DeviceListChanged = 'DeviceListChanged'
            }

            /**
             * Camera events listener to be notified about camera events on Android only
             */
            export enum CameraEvents {
                /**
                 * Invoked when camera is disconnected.
                 * Handler function receives {@link EventHandlers.CameraDisconnected} object as an argument.
                 * @remarks ANDROID ONLY.
                 */
                CameraDisconnected = 'CameraDisconnected',
                /**
                 * Invoked when camera can not be opened or any camera exception happens.
                 * Handler function receives {@link EventHandlers.CameraError} object as an argument.
                 * @remarks ANDROID ONLY.
                 */
                CameraError = 'CameraError',
                /**
                 * Invoked when camera switch was successful.
                 * Handler function receives {@link EventHandlers.CameraSwitchDone} object as an argument.
                 * @remarks ANDROID ONLY.
                 */
                CameraSwitchDone = 'CameraSwitchDone',
                /**
                 * Invoked when camera switch is failed, e.g. camera is stopped or only one camera is available.
                 * Handler function receives {@link EventHandlers.CameraSwitchError} object as an argument.
                 * @remarks ANDROID ONLY.
                 */
                CameraSwitchError = 'CameraSwitchError'
            }

            /*
    * Enum representing camera types
    * */
            export enum CameraType {
                /*
                 * The facing of the camera is opposite to that of the screen
                 * */
                FRONT = "front",
                /*
                 * The facing of the camera is the same as that of the screen
                 * */
                BACK = "back"
            }
        }
    }
}
