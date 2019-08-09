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
            CameraDisconnected ='CameraDisconnected',
            /**
             * Invoked when camera can not be opened or any camera exception happens.
             * Handler function receives {@link EventHandlers.CameraError} object as an argument.
             * @remarks ANDROID ONLY.
             */
            CameraError ='CameraError',
            /**
             * Invoked when camera switch was successful.
             * Handler function receives {@link EventHandlers.CameraSwitchDone} object as an argument.
             * @remarks ANDROID ONLY.
             */
            CameraSwitchDone ='CameraSwitchDone',
            /**
             * Invoked when camera switch is failed, e.g. camera is stopped or only one camera is available.
             * Handler function receives {@link EventHandlers.CameraSwitchError} object as an argument.
             * @remarks ANDROID ONLY.
             */
            CameraSwitchError ='CameraSwitchError'
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

        /**
         * Enum that represents types of messenger events.
         */
        export enum MessengerEventTypes {
            /**
             * Event is triggered when a conversation is created via {@link Voximplant.Messaging.Messenger#createConversation}
             * or analogous methods from other Voximplant SDKs and Messaging API.
             *
             * Triggered only for participants that belong to the conversation.
             *
             * Handler function receives {@link Voximplant.EventHandlers.ConversationEvent} object as an argument.
             */
            CreateConversation = 'CreateConversation',
            /**
             * Event is triggered when the conversation properties were modified as the result of:
             * - {@link Voximplant.Messaging.Messenger#joinConversation}
             * - {@link Voximplant.Messaging.Messenger#leaveConversation}
             * - {@link Voximplant.Messaging.Conversation#update}
             * - {@link Voximplant.Messaging.Conversation#addParticipants}
             * - {@link Voximplant.Messaging.Conversation#removeParticipants}
             * - {@link Voximplant.Messaging.Conversation#editParticipants}
             * - or analogous methods from other Voximplant SDKs and Messaging API
             *
             * Triggered only for participants that belong to the conversation.
             *
             * Handler function receives {@link Voximplant.EventHandlers.ConversationEvent} object as an argument.
             */
            EditConversation = 'EditConversation',
            /**
             * Event is triggered when a message was edited via {@link Voximplant.Messaging.Message#update} or analogous methods
             * from other Voximplant SDKs and Messaging API.
             *
             * Triggered only for participants that belong to the conversation with the changed message.
             *
             * Handler function receives {@link Voximplant.EventHandlers.MessageEvent} object as an argument.
             */
            EditMessage = 'EditMessage',
            /**
             * Event is triggered as the result of {@link Voximplant.Messaging.Messenger#editUser} or analogous methods from other Voximplant SDKs and Messaging API.
             *
             * Triggered only for the subscribers of the changed user. Use {@link Voximplant.Messaging.Messenger#subscribe} to subscribe for user's changes.
             *
             * Handler function receives {@link Voximplant.EventHandlers.UserEvent} object as an argument.
             */
            EditUser = 'EditUser',
            /**
             * Type of the event the promises of the Voximplant React Native Messaging methods are rejected with.
             *
             * Subscription to this event via {@link Voximplant.Messaging.Messenger#on} will never cause the execution of the specified
             * handler function.
             */
            Error = 'Error',
            /**
             * Type of the event the promises of the following methods are resolved with:
             * - {@link Voximplant.Messaging.Messenger#getConversation}
             * - {@link Voximplant.Messaging.Messenger#getConversations}
             *
             * Subscription to this event via {@link Voximplant.Messaging.Messenger#on} will never cause the execution of the specified
             * handler function.
             */
            GetConversation = 'GetConversation',
            /**
             * Type of the event the promise of {@link Voximplant.Messaging.Messenger#getPublicConversations} is resolved with.
             *
             * Subscription to this event via {@link Voximplant.Messaging.Messenger#on} will never cause the execution of the specified
             * handler function.
             */
            GetPublicConversations = 'GetPublicConversations',
            /**
             * Type of the event the promise of {@link Voximplant.Messaging.Messenger#getSubscriptions} is resolved with.
             *
             * Subscription to this event via {@link Voximplant.Messaging.Messenger#on} will never cause the execution of the specified
             * handler function.
             */
            GetSubscriptions = 'GetSubscriptions',
            /**
             * Type of the event the promises of the following methods are resolved with:
             * - {@link Voximplant.Messaging.Messenger#getUserByIMId}
             * - {@link Voximplant.Messaging.Messenger#getUserByName}
             * - {@link Voximplant.Messaging.Messenger#getUsersByIMId}
             * - {@link Voximplant.Messaging.Messenger#getUsersByName}
             *
             * Subscription to this event via {@link Voximplant.Messaging.Messenger#on} will never cause the execution of the specified
             * handler function.
             */
            GetUser = 'GetUser',
            /**
             * Event is triggered for all clients in the conversation as the result of {@link Voximplant.Messaging.Conversation#markAsRead}
             * or analogous methods from other Voximplant SDKs and Messaging API.
             *
             * Handler function receives {@link Voximplant.EventHandlers.ConversationServiceEvent} object as an argument.
             */
            Read = 'Read',
            /**
             * Event is triggered when a conversation was removed.
             *
             * Note that removing is possible via Voximplant Messaging API only.
             *
             * Triggered only for participants that belong to the conversation.
             *
             * Handler function receives {@link Voximplant.EventHandlers.ConversationEvent} object as an argument.
             */
            RemoveConversation = 'RemoveConversation',
            /**
             * Event is triggered when a message was removed from a conversation via {@link Voximplant.Messaging.Message#remove}
             * or analogous methods from other Voximplant SDKs and Messaging API.
             *
             * Triggered only for participants that belong to the conversation with the deleted message.
             *
             * Handler function receives {@link Voximplant.EventHandlers.MessageEvent} object as an argument.
             */
            RemoveMessage = 'RemoveMessage',
            /**
             * Type of the event the promises of the following methods are resolved with:
             * - {@link Voximplant.Messaging.Conversation#retransmitEvents}
             * - {@link Voximplant.Messaging.Conversation#retransmitEventsFrom}
             * - {@link Voximplant.Messaging.Conversation#retransmitEventsTo}
             *
             * Subscription to this event via {@link Voximplant.Messaging.Messenger#on} will never cause the execution of the specified
             * handler function.
             */
            RetransmitEvents = 'RetransmitEvents',
            /**
             * Event is triggered when a new message was sent to a conversation via {@link Voximplant.Messaging.Conversation#sendMessage}
             * or analogous methods from other Voximplant SDKs and Messaging API.
             *
             * Triggered only for participants that belong to the conversation.
             *
             * Handler function receives {@link Voximplant.EventHandlers.MessageEvent} object as an argument.
             */
            SendMessage = 'SendMessage',
            /**
             * Event is triggered after a user status was changed via {@link Voximplant.Messaging.Messenger#setStatus}
             * or analogous methods from other Voximplant SDKs and Messaging API.
             *
             * Triggered only for the subscribers of the changed user. Use @link Voximplant.Messaging.Messenger#subscribe} to subscribe for a user's changes.
             *
             * Handler function receives {@link Voximplant.EventHandlers.UserEvent} object as an argument.
             */
            SetStatus = 'SetStatus',
            /**
             * Event is triggered as the result of {@link Voximplant.Messaging.Messenger#subscribe} or analogous methods from other Voximplant SDKs and Messaging API.
             *
             * Triggered on all logged in clients of the current user.
             *
             * Handler function receives {@link Voximplant.EventHandlers.SubscriptionEvent} object as an argument.
             */
            Subscribe = 'Subscribe',
            /**
             * Event is triggered when some user is typing text in a conversation. Information about typing is received via
             * {@link Voximplant.Messaging.Conversation#typing} or analogous methods from other Voximplant SDKs and Messaging API.
             *
             * Triggered only for participants that belong to the conversation where typing is performing.
             *
             * Handler function receives {@link Voximplant.EventHandlers.ConversationServiceEvent} object as an argument.
             */
            Typing = 'Typing',
            /**
             * Invoked as the result of {@link Voximplant.Messaging.Messenger#unsubscribe}, {@link Voximplant.Messaging.Messenger#unsubscribeFromAll}
             * or analogous methods from other Voximplant SDKs and Messaging API.
             *
             * Triggered on all logged in clients of the current user.
             *
             * Handler function receives {@link Voximplant.EventHandlers.SubscriptionEvent} object as an argument.
             */
            Unsubscribe = 'Unsubscribe'
        }

        /*
* Enum that represents events available for push notification subscriptions.
* */
        export enum MessengerNotification {
            EditMessage = "EditMessage",
            SendMessage = "SendMessage"
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

        /**
         * The events that are triggered by {@link Call} instance.
         * Use {@link Call#on} to subscribe on any of these events.
         */
        export enum CallEvents {
            /**
             * Event is triggered when a realible connection is established for the call.
             * Depending on network conditions there can be a 2-3 seconds delay between first audio data and this event.
             * Handler function receives {@link EventHandlers.CallEventWithHeaders} object as an argument.
             */
            Connected= 'Connected',
            /**
             * Event is triggered when a call was disconnected.
             * Handler function receives {@link EventHandlers.Disconnected} object as an argument.
             */
            Disconnected = 'Disconnected',
            /**
             * Event is triggered when a new Endpoint is created. {@link Voximplant.Endpoint} represents an another participant in your call or conference.
             * Handler function receives {@link EventHandlers.EndpointAdded} object as an argument.
             */
            EndpointAdded = 'EndpointAdded',
            /**
             * Event is triggered due to a call failure.
             * Handler function receives {@link EventHandlers.Failed} object as an argument.
             */
            Failed = 'Failed',
            /**
             * Event is triggered when ICE connection is complete.
             * Handler function receives {@link EventHandlers.CallEvent} object as an argument.
             */
            ICECompleted = 'ICECompleted',
            /**
             * Event is triggered when connection was not established due to a network connection problem between 2 peers.
             * Handler function receives {@link EventHandlers.CallEvent} object as an argument
             */
            ICETimeout = 'ICETimeout',
            /**
             * Event is triggered when INFO message is received.
             * Handler function receives {@link EventHandlers.InfoReceived} object as an argument.
             */
            InfoReceived = 'InfoReceived',
            /**
             * Event is triggered when local video is added to the call.
             * Handler function receives {@link EventHandlers.LocalVideoStreamAdded} object as an argument.
             */
            LocalVideoStreamAdded = 'LocalVideoStreamAdded',
            /**
             * Event is triggered when local video is removed from the call.
             * Handler function receives {@link EventHandlers.LocalVideoStreamRemoved} object as an argument.
             */
            LocalVideoStreamRemoved = 'LocalVideoStreamRemoved',
            /**
             * Event is triggered when a text message is received.
             * Handler function receives {@link EventHandlers.MessageReceived} object as an argument.
             */
            MessageReceived = 'MessageReceived',
            /**
             * Event is triggered when a progress tone playback starts.
             * Handler function receives {@link EventHandlers.CallEventWithHeaders} object as an argument.
             */
            ProgressToneStart = 'ProgressToneStart',
            /**
             * Event is triggered when a progress tone playback stops.
             * Handler function receives {@link EventHandlers.CallEvent} object as an argument.
             */
            ProgressToneStop = 'ProgressToneStop'
        }

        /**
         * The events that are triggered by Client instance. See {@link Voximplant#getInstance}.
         */
        export enum ClientEvents {
            /**
             * The event is triggered after connection to the Voximplant Cloud was established successfully.
             * See {@link Client#connect} method.
             * Handler function receives no arguments.
             */
            ConnectionEstablished = 'ConnectionEstablished',
            /**
             * The event is triggered if a connection to the Voximplant Cloud couldn't be established.
             * See {@link Client#connect} method.
             * Handler function receives {@link EventHandlers.ConnectionFailed} object as an argument.
             */
            ConnectionFailed = 'ConnectionFailed',
            /**
             * The event is triggered if a connection to the Voximplant Cloud was closed because of network problems.
             * See {@link Client#connect} method.
             * Handler function receives no arguments.
             */
            ConnectionClosed = 'ConnectionClosed',
            /**
             * Event is triggered after
             * {@link Client#login},
             * {@link Client#loginWithOneTimeKey},
             * {@link Client#requestOneTimeLoginKey},
             * {@link Client#loginWithToken} methods.
             * Handler function receives {@link EventHandlers.AuthResult} object as an argument.
             */
            AuthResult = 'AuthResult',
            /**
             * The event is triggered after the {@link Client#tokenRefresh} method call.
             * Handler function receives {@link EventHandlers.AuthTokenResult} object as an argument.
             */
            RefreshTokenResult = 'RefreshTokenResult',
            /**
             * The event is triggered when there is a new incoming call to current user.
             * Handler function receives {@link EventHandlers.IncomingCall} object as an argument.
             */
            IncomingCall = 'IncomingCall'
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

        /**
         * Events that are triggered when Endpoint is updated/edited, removed or started/stopped to receive stream from another Endpoint.
        */
        export enum EndpointEvents {
            /**
             * Event is triggered when endpoint information such as display name, user name and sip uri is updated.
             * Handler function receives {@link EventHandlers.InfoUpdated} object as an argument.
             */
            InfoUpdated = 'InfoUpdated',
            /**
             * Event is triggered after endpoint added video stream to the call.
             * Handler function receives {@link EventHandlers.RemoteVideoStreamAdded} object as an argument.
             */
            RemoteVideoStreamAdded = 'RemoteVideoStreamAdded',
            /**
             * Event is triggered after endpoint removed video stream from the call. Event is not triggered on call end.
             * Handler function receives {@link EventHandlers.RemoteVideoStreamRemoved} object as an argument.
             */
            RemoteVideoStreamRemoved = 'RemoteVideoStreamRemoved',
            /**
             * Event is triggered when an Endpoint is removed.
             * Handler function receives {@link EventHandlers.Removed} object as an argument.
             */
            Removed = 'Removed'
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
    }
}
