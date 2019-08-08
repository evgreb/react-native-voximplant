declare module "react-native-voximplant" {
    namespace Voximplant {
        export enum LogLevel {
            ERROR = "error",
            WARNING = "warning",
            INFO = "info",
            DEBUG = "debug",
            VERBOSE = "verbose"
        }

        export enum ClientState {
            DISCONNECTED = "disconnected",
            CONNECTING = "connecting",
            CONNECTED = "connected",
            LOGGING_IN = "logging_in",
            LOGGED_IN = "logged_in"
        }

        export enum RenderScaleType {
            SCALE_FILL = 'fill',
            SCALE_FIT = 'fit'
        }

        export enum CallError {
            ALREADY_IN_THIS_STATE = 'ALREADY_IN_THIS_STATE',
            FUNCTIONALITY_IS_DISABLED = 'FUNCTIONALITY_IS_DISABLED',
            INCORRECT_OPERATION = 'INCORRECT_OPERATION',
            INTERNAL_ERROR = 'INTERNAL_ERROR',
            MEDIA_IS_ON_HOLD = 'MEDIA_IS_ON_HOLD',
            MISSING_PERMISSION = 'MISSING_PERMISSION',
            NOT_LOGGED_IN = 'NOT_LOGGED_IN',
            REJECTED = 'REJECTED',
            TIMEOUT = 'TIMEOUT'
        }

        export enum AudioDevice {
            BLUETOOTH = 'Bluetooth',
            EARPIECE = 'Earpiece',
            NONE = 'None',
            SPEAKER = 'Speaker',
            WIRED_HEADSET = 'WiredHeadset'
        }

        export enum CameraType {
            FRONT = 'front',
            BACK = 'back'
        }

        export enum VideoCodec {
            VP8 = 'VP8',
            H264 = 'H264',
            AUTO = 'AUTO'
        }

        export enum RequestAudioFocusMode {
            REQUEST_ON_CALL_START = 'REQUEST_ON_CALL_START',
            REQUEST_ON_CALL_CONNECTED = 'REQUEST_ON_CALL_CONNECTED'
        }

        export enum MessengerAction {
            addParticipants = 'addParticipants',
            createConversation = 'createConversation',
            editConversation = 'editConversation',
            editMessage = 'editMessage',
            editParticipants = 'editParticipants',
            editUser = 'editUser',
            getConversation = 'getConversation',
            getConversations = 'getConversations',
            getPublicConversations = 'getPublicConversations',
            getSubscriptions = 'getSubscriptions',
            getUser = 'getUser',
            getUsers = 'getUsers',
            joinConversation = 'joinConversation',
            leaveConversation = 'leaveConversation',
            manageNotifications = 'manageNotifications',
            read = 'read',
            removeConversation = 'removeConversation',
            removeMessage = 'removeMessage',
            removeParticipants = 'removeParticipants',
            retransmitEvents = 'retransmitEvents',
            sendMessage = 'sendMessage',
            setStatus = 'setStatus',
            subscribe = 'subscribe',
            typing = 'typing',
            unsubscribe = 'unsubscribe'
        }

        export enum MessengerNotification {
            EditMessage = 'EditMessage',
            SendMessage = 'SendMessage'
        }
    }
}
