/// <reference path="EventHandlers.d.ts" />
declare module "react-native-voximplant" {
    namespace Voximplant {
        namespace Hardware {

            type AudioDeviceEventsMap = {
                [AudioDeviceEvents.DeviceChanged]: DeviceChanged,
                [AudioDeviceEvents.DeviceListChanged]: DeviceListChanged
            }

            type CameraEventsMap = {
                [CameraEvents.CameraDisconnected]: CameraDisconnected,
                [CameraEvents.CameraError]: CameraError,
                [CameraEvents.CameraSwitchDone]: CameraSwitchDone,
                [CameraEvents.CameraSwitchError]: CameraSwitchError
            }

            /**
             * Class may be used to manage audio devices, i.e. see current active device,
             * select another active device and get the list of available devices.
             */
            export class AudioDeviceManager {
                /**
                 *
                 * Initialize AVAudioSession if the application uses CallKit.
                 *
                 * Should be called when:
                 * 1. the provider performs [the specified start call action](https://developer.apple.com/documentation/callkit/cxproviderdelegate/1648260-provider?language=objc)
                 * 2. the provider performs [the specified answer call action](https://developer.apple.com/documentation/callkit/cxproviderdelegate/1648270-provider?language=objc)
                 * @remarks IOS ONLY. Required for the correct CallKit integration only. Otherwise don't use this method.
                 */
                callKitConfigureAudioSession(): void;

                /**
                 *
                 * Restores default AVAudioSession initialization routines, MUST be called if CallKit becomes disabled.
                 * @remarks IOS ONLY. Required for the correct CallKit integration only. Otherwise don't use this method.
                 */
                callKitReleaseAudioSession(): void;

                /**
                 *
                 * Starts AVAudioSession.
                 *
                 * Should be called when:
                 * 1. the provider’s audio session is [activated](https://developer.apple.com/documentation/callkit/cxproviderdelegate/1833281-provider?language=objc)
                 * 2. the provider performs [the specified set held call action](https://developer.apple.com/documentation/callkit/cxproviderdelegate/1648256-provider?language=objc)
                 *
                 * @remarks IOS ONLY. Required for the correct CallKit integration only. Otherwise don't use this method.
                 */
                callKitStartAudio(): void;

                /**
                 *
                 * Stops AVAudioSession.
                 *
                 * Should be called when:
                 * 1. the provider performs [the specified end call action](https://developer.apple.com/documentation/callkit/cxproviderdelegate/1648264-provider?language=objc)
                 * 2. the provider performs [the specified set held call action](https://developer.apple.com/documentation/callkit/cxproviderdelegate/1648256-provider?language=objc)
                 *
                 * @remarks IOS ONLY. Required for the correct CallKit integration only. Otherwise don't use this method.
                 */
                callKitStopAudio(): void;

                /**
                 * Returns active audio device during the call or audio device that will be used for a call if there is no calls at this moment.
                 */
                getActiveDevice(): Promise<AudioDevice>;

                /**
                 * Returns the list of available audio devices.
                 */
                getAudioDevices(): Promise<Array<AudioDevice>>;

                /**
                 * Get AudioDeviceManager instance to control audio hardware settings
                 */
                static getInstance(): AudioDeviceManager;

                /**
                 * Remove a handler for the specified AudioDeviceManager event.
                 * @param {Voximplant.Hardware.AudioDeviceEvents} event
                 * @param {function} handler - Handler function. If not specified, all handlers for the event will be removed.
                 */
                off<T extends keyof AudioDeviceEventsMap>(event: T, handler: (event: AudioDeviceEventsMap[T]) => void): void;

                /**
                 * Register a handler for the specified AudioDeviceManager event.
                 * One event can have more than one handler.
                 * Use the {@link Voximplant.Hardware.AudioDeviceManager#off} method to delete a handler.
                 * @param {Voximplant.Hardware.AudioDeviceEvents} event
                 * @param {function} handler
                 */
                on<T extends keyof AudioDeviceEventsMap>(event: T, handler: (event: AudioDeviceEventsMap[T]) => void): void;

                /**
                 * Changes selection of the current active audio device. Please see {@link https://voximplant.com/docs/references/androidsdk/iaudiodevicemanager Android}
                 * and {@link https://voximplant.com/docs/references/iossdk/viaudiomanager#selectaudiodevice iOS} documentation for platform specific.
                 * @param {Voximplant.Hardware.AudioDevice} audioDevice - Preferred audio device to use.
                 */
                selectAudioDevice(audioDevice: AudioDevice): void;
            }

            /**
             * Class that may be used to manage cameras on a device.
             */
            export class CameraManager {

                /**
                 * Get CameraManager instance to control camera hardware settings
                 */
                static getInstance(): CameraManager;

                /**
                 * Remove a handler for the specified camera event.
                 * @param {Voximplant.Hardware.CameraEvents} event
                 * @param {function} handler - Handler function. If not specified, all handlers for the event will be removed.
                 * @remarks ANDROID ONLY
                 */
                off<T extends keyof CameraEventsMap>(event: T, handler: (event: CameraEventsMap[T]) => void): void;

                /**
                 * Register a handler for the specified camera event.
                 * One event can have more than one handler.
                 * Use the {@link CameraManager#off} method to delete a handler. ANDROID ONLY.
                 * @param {Voximplant.Hardware.CameraEvents} event
                 * @param {function} handler
                 *
                 */
                on<T extends keyof CameraEventsMap>(event: T, handler: (event: CameraEventsMap[T]) => void): void;

                /**
                 * Set a local camera resolution
                 * @param {number} width - Camera resolution width
                 * @param {number} height - Camera resolution height
                 */
                setCameraResolution(width: number, height: number): void;

                /**
                 * Select camera
                 * @param {Voximplant.Hardware.CameraType} cameraType - Preferred video camera
                 */
                switchCamera(cameraType: CameraType): void;
            }

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
