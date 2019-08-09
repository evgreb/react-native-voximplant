declare module "react-native-voximplant" {

    /*
    * Configuration either to create a new conversation or restore a previously created conversation.
    * */
    export interface ConversationConfig {

        /*
        * Custom data of the conversation.
        * @remarks (up to 5kb)
        * */
        customData?: object;

        /*
        * Set if the conversation is direct.
        *
        * There can be only 2 participants in a direct conversation which is unique and the only one for these participants.
        * There can't be more than 1 direct conversation for the same 2 users.
        *
        * If one of these users tries to create a new direct conversation with the same participant via {@link Messenger.createConversation}, the method will return the UUID of the already existing direct conversation.
        *
        * A direct conversation can't be uber and/or public.
        * */
        direct?: boolean;

        /*
        * Set the conversation participants.
        *
        * The participants array can be later changed via:
        *
        * {@link Conversation.addParticipants}
        * {@link Conversation.removeParticipants}
        * */
        participants?: Array<ConversationParticipant>;

        /*
        * Set the conversation to be public or not.
        *
        * It can be later changed via Conversation.publicJoin.
        *
        * If true, any user can join the conversation via Messenger.joinConversation by specifying its UUID.
        * Use the {@link Messenger.getPublicConversations} method to retrieve all public conversations' UUIDs.
        *
        * A public conversation can't be direct.
        * */
        publicJoin?: boolean;

        /*
        * Set the conversation title.
        *
        * It can be later changed via {@link Conversation.title}.
        * */
        title?: string;

        /*
        * Set if the conversation is a uber conversation.
        *
        * Users in a uber conversation will not be able to retrieve messages that were posted to the conversation after they quit.
        *
        * A uber conversation can't be direct.
        * */
        uber?: boolean;
    }

    /*
    * Interface that represents a conversation participant and its permissions.
    * */
    export interface ConversationParticipant {

        /*
        * Specify if the participant can edit messages other than its own.
        *
        * It could be set only if the user that calls this method has the {@link ConversationParticipant.canManageParticipants} permission.
        *
        * If the user that calls this method has both canManageParticipants and isOwner permissions, it can edit other owners.
        * */
        canEditAllMessages?: boolean;

        /*
        * Specify if the participant can edit its own messages in the conversation.
        *
        * The permission is given by default.
        *
        * It could be changed only if the user that calls this method has the {@link ConversationParticipant.canManageParticipants} permission.
        *
        * If the user that calls this method has both canManageParticipants and owner permissions, it can edit other owners.
        * */
        canEditMessages?: boolean;

        /*
        * Specify if the conversation participant can manage other participants in the conversation:
        *
        * add, remove and edit permissions
        * add and remove participants
        * It could be set only if the user that calls this method has the {@link ConversationParticipant.canManageParticipants} permission.
        *
        * If the user that calls this method has both canManageParticipants and isOwner permissions, it can edit other owners.
        * */
        canManageParticipants?: boolean;

        /*
        * Specify if the participant can remove messages other than its own.
        *
        * It could be changed only if the user that calls this method has the {@link ConversationParticipant.canManageParticipants} permission.
        *
        * If the user that calls this method has both canManageParticipants and isOwner permissions, it can edit other owners.
        * */
        canRemoveAllMessages?: boolean;

        /*
        * Specify if the participant can remove its own messages in the conversation.
        *
        * The permission is given by default.
        *
        * It could be changed only if the user that calls this method has the {@link ConversationParticipant.canManageParticipants} permission.
        *
        * If the user that calls this method has both canManageParticipants and isOwner permissions, it can edit other owners.
        * */
        canRemoveMessages?: boolean;

        /*
        * Specify if the participant can write in the conversation.
        *
        * The permission is given by default.
        *
        * It could be changed only if the user that calls this method has the {@link ConversationParticipant.canManageParticipants} permission.
        * */
        canWrite?: boolean;

        /*
        * IM User id
        * */
        imUserId: number;

        /*
        * Sequence of the event that was last marked as read or 0, if the participant didn't mark events as read.
        *
        * Participants mark events as read via {@link Conversation.markAsRead}.
        * */
        lastReadEventSequence?: number;

        /*
        * Specify if the conversation participant is the owner.
        *
        * It could be set only if the user that calls this method has the {@link ConversationParticipant.canManageParticipants}
        * and {@link ConversationParticipant.owner} permissions.
        *
        * There could be more than one owner in the conversation.
        *
        * If true, the participant can edit the conversation.
        * If true and canManageParticipants is true, the participant can manage other owners.
        * */
        owner?: boolean;
    }


    /*
    * Interface that represents user information. Voximplant users are created via the Voximplant control panel or HTTP API.
    * */
    export interface User {

        /*
        * Array of UUIDs for the conversations the user currently belongs to. Only available if user queries information about himself.
        * */
        conversationList: string[],

        /*
        * JavaScript object with public custom data, available to all users
        * */
        customData: object,

        /*
        * User's display name which is specified during user creation. The display name is available to all users.
        * */
        displayName: string,

        /*
        * IM unique id that is used to identify users in events and specify in user-related methods
        * */
        imId: number,

        /*
        * Check if the user is deleted or not
        * */
        isDeleted: boolean,

        /*
        * Array of UUIDs for uber conversations that user was joined, but currently is not participating in.
        * */
        leaveConversationList: string[],

        /*
        * Voximplant user identifier, for example 'username@appname.accname'
        * */
        name: string,

        /*
        * Array of messenger notifications that current user is subscribed to
        * */
        notifications: string[],

        /*
        * JavaScript object with private custom data, available only to the user himself
        * */
        privateCustomData: object
    }

    namespace Voximplant {
        namespace Messaging {
            export class Conversation{} //TODO realise class
            export class Message{} //TODO realise

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
        }
    }
}
