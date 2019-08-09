declare module "react-native-voximplant" {
    namespace Voximplant {
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
            DeviceChanged     = 'DeviceChanged',
            /**
             * Event is triggered when a new audio device is connected or previously connected audio device is disconnected.
             * Handler function receives {@link EventHandlers.DeviceListChanged} object as an argument.
             */
            DeviceListChanged = 'DeviceListChanged'
        }

        /*
         * Enum of log levels.
         * @remarks IOS ONLY
         * @default {@link LogLevel.INFO}
         * */
        export enum LogLevel {
            /*
             * Log verbosity level to include debug messages
             * */
            ERROR = "error",
            /*
             * Log verbosity level, to include only error messages
             * */
            WARNING = "warning",
            /*
             * Default log verbosity level, to include informational messages
             * */
            INFO = "info",
            /*
             * Log verbosity level to include verbose messages
             * */
            DEBUG = "debug",
            /*
             * Log verbosity level to include warning messages
             * */
            VERBOSE = "verbose"
        }

        /*
         * The client states
         * */
        export enum ClientState {
            /*
             * The client is currently connected
             * */
            DISCONNECTED = "disconnected",
            /*
             * The client is currently connecting
             * */
            CONNECTING = "connecting",
            /*
             * The client is currently disconnected
             * */
            CONNECTED = "connected",
            /*
             * The client is currently logged in
             * */
            LOGGING_IN = "logging_in",
            /*
             * The client is currently logging in
             * */
            LOGGED_IN = "logged_in"
        }

        /*
         * Types of video rendering scaling
         * */
        export enum RenderScaleType {
            /*
             * Video frame is scaled to fill the size of the view by maintaining the aspect ratio.
             * Some portion of the video frame may be clipped.
             * */
            SCALE_FILL = "fill",
            /*
             * Video frame is scaled to be fit the size of the view by maintaining the aspect ratio
             * (black borders may be displayed).
             * */
            SCALE_FIT = "fit"
        }

        /*
         * Call related errors
         * */
        export enum CallError {
            /*
             * The call is already in requested state
             * */
            ALREADY_IN_THIS_STATE = "ALREADY_IN_THIS_STATE",
            /*
             * Requested functionality is disabled
             * */
            FUNCTIONALITY_IS_DISABLED = "FUNCTIONALITY_IS_DISABLED",
            /*
             * Operation is incorrect, for example reject outgoing call
             * */
            INCORRECT_OPERATION = "INCORRECT_OPERATION",
            /*
             * Internal error occurred
             * */
            INTERNAL_ERROR = "INTERNAL_ERROR",
            /*
             * Operation can't be performed due to the call is on hold. Unhold the call and repeat the operation
             * */
            MEDIA_IS_ON_HOLD = "MEDIA_IS_ON_HOLD",
            /*
             * Operation can't be performed due to missing permission
             * */
            MISSING_PERMISSION = "MISSING_PERMISSION",
            /*
             * Operation can't be performed due to the client is not logged in
             * */
            NOT_LOGGED_IN = "NOT_LOGGED_IN",
            /*
             * Operation is rejected
             * */
            REJECTED = "REJECTED",
            /*
             * Operation is not completed in time
             * */
            TIMEOUT = "TIMEOUT"
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

        /*
         * Enum representing supported video codecs
         * */
        export enum VideoCodec {
            /*
             * Video codec for call will be chosen automatically
             * */
            VP8 = "VP8",
            /*
             * H264 video codec
             * */
            H264 = "H264",
            /*
             * VP8 video codec
             * */
            AUTO = "AUTO"
        }

        /*
         * Request audio focus modes.
         * */
        export enum RequestAudioFocusMode {
            /*
             * Request of audio focus is performed when a call is established.
             * */
            REQUEST_ON_CALL_START = "REQUEST_ON_CALL_START",
            /*
             * Request of audio focus is performed when a call is started.
             * */
            REQUEST_ON_CALL_CONNECTED = "REQUEST_ON_CALL_CONNECTED"
        }

        /*
        * Enum that represents actions that trigger messenger events. Each action is the reason for every triggered event.
        * */
        export enum MessengerAction {
            addParticipants = "addParticipants",
            createConversation = "createConversation",
            editConversation = "editConversation",
            editMessage = "editMessage",
            editParticipants = "editParticipants",
            editUser = "editUser",
            getConversation = "getConversation",
            getConversations = "getConversations",
            getPublicConversations = "getPublicConversations",
            getSubscriptions = "getSubscriptions",
            getUser = "getUser",
            getUsers = "getUsers",
            joinConversation = "joinConversation",
            leaveConversation = "leaveConversation",
            manageNotifications = "manageNotifications",
            read = "read",
            removeConversation = "removeConversation",
            removeMessage = "removeMessage",
            removeParticipants = "removeParticipants",
            retransmitEvents = "retransmitEvents",
            sendMessage = "sendMessage",
            setStatus = "setStatus",
            subscribe = "subscribe",
            typing = "typing",
            unsubscribe = "unsubscribe"
        }

        /*
        * Enum that represents events available for push notification subscriptions.
        * */
        export enum MessengerNotification {
            EditMessage = "EditMessage",
            SendMessage = "SendMessage"
        }
    }
}
