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

            type MessengerEventTypesMap = {
                [MessengerEventTypes.CreateConversation]: ConversationEvent,
                [MessengerEventTypes.EditConversation]: ConversationEvent,
                [MessengerEventTypes.EditMessage]: MessageEvent,
                [MessengerEventTypes.EditUser]: UserEvent,
                // [MessengerEventTypes.Error]: void, // Subscription to this event via Messenger.on will never cause the execution of the specified handler function.
                // [MessengerEventTypes.GetConversation]: void,
                // [MessengerEventTypes.GetPublicConversations]: void,
                // [MessengerEventTypes.GetSubscriptions]: void,
                // [MessengerEventTypes.GetUser]: void,
                [MessengerEventTypes.Read]: ConversationServiceEvent,
                [MessengerEventTypes.RemoveConversation]: ConversationEvent,
                [MessengerEventTypes.RemoveMessage]: MessageEvent,
                // [MessengerEventTypes.RetransmitEvents]: void,
                [MessengerEventTypes.SendMessage]: MessageEvent,
                [MessengerEventTypes.SetStatus]: UserEvent,
                [MessengerEventTypes.Subscribe]: SubscriptionEvent,
                [MessengerEventTypes.Typing]: ConversationServiceEvent,
                [MessengerEventTypes.Unsubscribe]: SubscriptionEvent,
            }

            export class Conversation {
            } //TODO realise class

            /*
            * Interface that represents a message within a conversation.
            * */
            export class Message {

                /*
                * The UUID of the conversation this message belongs to. The message can belong to the one conversation only.
                * */
                conversation: string;

                /*
                * The array of payload objects associated with the message.
                * */
                payload: any[];

                /*
                * The message sequence number in the conversation.
                * */
                sequence: number;

                /*
                * The text of this message.
                * */
                text: string;

                /*
                * The universally unique identifier (UUID) of the message.
                * */
                uuid: string;

                /*
                * Remove the message from the conversation.
                *
                * The participant that calls this method should have:
                * - the {@link Voximplant.Messaging.ConversationParticipant#canRemoveMessages} permission to remove its own messages
                * - the {@link Voximplant.Messaging.ConversationParticipant#canRemoveAllMessages} permission to remove other participants' messages
                *
                * Other parties of the conversation (online participants and logged in clients) can be informed about
                * the message removing via the {@link Voximplant.Messaging.MessengerEventTypes.RemoveMessage} event.
                *
                * */
                remove(): Promise<MessageEvent | ErrorEvent>;

                /*
                * Send text and payload changes to the cloud.
                *
                * The participant that calls this method should have:
                * - the {@link Voximplant.Messaging.ConversationParticipant#canEditMessages} permission to update its own messages
                * - the {@link Voximplant.Messaging.ConversationParticipant#canEditAllMessages} permission to update other participants' messages
                *
                * Other parties of the conversation (online participants and logged in clients) can be informed about the message
                * updating via the {@link Voximplant.Messaging.MessengerEventTypes.EditMessage} event.
                *
                * To be informed about the message updating while being offline, participants can subscribe
                * to the {@link Voximplant.Messaging.MessengerNotification.EditMessage} messenger push notification.
                *
                * @param {string} text - New text of this message, maximum 5000 characters. If null, message text will not be updated.
                * @param {Array<object>} payload - New payload of this message. If null, message payload will not be updated.
                * */
                update(text: string, payload: Array<object>): Promise<MessageEvent | ErrorEvent>
            }


            /*
            * Messenger class used to control messaging functions.
            * */
            export class Messenger {

                /**
                 * Create a new conversation with the extended configuration.
                 *
                 * Other parties of the conversation (online participants and logged in clients) can be informed about
                 * the conversation creation via the {@link Voximplant.Messaging.MessengerEventTypes.CreateConversation}.
                 *
                 * @param {Voximplant.Messaging.ConversationConfig} [conversationConfig] - ConversationConfig instance with extended conversation parameters
                 */
                createConversation(conversationConfig: ConversationConfig): Promise<ConversationEvent | ErrorEvent>;

                /**
                 * Edit current user information.
                 *
                 * Other users that are subscribed to the user can be informed about the editing via the
                 * {@link Voximplant.Messaging.MessengerEventTypes.EditUser} event.
                 *
                 * @param {object} customData - New custom data.
                 * If null, previously set custom data will not be changed. If empty object, previously set custom data will be removed.
                 * @param {object} privateCustomData - New private custom data.
                 * If null, previously set private custom data will not be changed. If empty object, previously set private custom data will be removed.
                 */
                editUser(customData: object, privateCustomData: object): Promise<UserEvent | ErrorEvent>;

                /**
                 * Get a conversation by its UUID.
                 *
                 * It's possible if:
                 * - the user that calls the method is/was a participant of this conversation
                 * - the conversation is an available public conversation (see {@link Voximplant.Messaging.Messenger#getPublicConversations})
                 *
                 * Only the client that called the method can be informed about getting conversation.
                 *
                 * @param {string} uuid - Conversation UUID
                 */
                getConversation(uuid: string): Promise<ConversationEvent | ErrorEvent>;

                /**
                 * Get the multiple conversations by the list of UUIDs. Maximum 30 conversations.
                 *
                 * It's possible if:
                 * - the user that calls the method is/was a participant of this conversation
                 * - the conversation is an available public conversation (see {@link Voximplant.Messaging.Messenger#getPublicConversations})
                 *
                 * Only the client that called the method can be informed about getting conversations.
                 *
                 * @param {Array<string>} uuids - Array of UUIDs. Maximum 30 conversations.
                 */
                getConversations(uuids: Array<string>): Promise<Array<ConversationEvent> | ErrorEvent>;

                /**
                 * Get the full Voximplant user identifier, for example 'username@appname.accname', for the current user
                 */
                getMe(): string;

                /**
                 * Get all public conversations ({@link Voximplant.Messaging.Conversation#publicJoin} is true).
                 *
                 * It's possible to get all public conversations (UUIDs) that were created by:
                 * - the current user
                 * - other users of the same child account
                 * - users of the main Voximplant developer account
                 *
                 * Only the client that called the method can be informed about getting public conversations UUIDs.
                 */
                getPublicConversations(): Promise<ConversationListEvent | ErrorEvent>;

                /**
                 * Get all current subscriptions, i.e., the array of users the current user is subscribed to.
                 *
                 * Only the client that called the method can be informed about getting subscriptions.
                 */
                getSubscriptions(): Promise<SubscriptionEvent | ErrorEvent>;

                /**
                 * Get information for the user specified by the IM user id.
                 *
                 * It's possible to get any user of the main Voximplant developer account or its child accounts.
                 *
                 * Only the client that called the method can be informed about getting user information.
                 *
                 * @param {number} userId -  IM User id
                 */
                getUserByIMId(userId: number): Promise<UserEvent | ErrorEvent>;

                /**
                 * Get information for the user specified by the Voximplant user name, e.g., 'username@appname.accname'.
                 *
                 * It's possible to get any user of the main Voximplant developer account or its child accounts.
                 *
                 * Only the client that called the method can be informed about getting user information.
                 *
                 * @param {string} username - Voximplant user identifier
                 */
                getUserByName(username: string): Promise<UserEvent | ErrorEvent>;

                /**
                 * Get information for the users specified by the array of the IM user ids. Maximum 50 users.
                 *
                 * It's possible to get any users of the main Voximplant developer account or its child accounts.
                 *
                 * Only the client that called the method can be informed about getting users information.
                 * @param {Array<number>} users - Array of IM user ids
                 */
                getUsersByIMId(users: Array<number>): Promise<Array<UserEvent> | ErrorEvent>;

                /**
                 * Get information for the users specified by the array of the Voximplant user names. Maximum 50 users.
                 *
                 * It's possible to get any users of the main Voximplant developer account or its child accounts.
                 *
                 * Only the client that called the method can be informed about getting users information.
                 *
                 * @param {Array<string>} users - Array of Voximplant user identifiers
                 */
                getUsersByName(users: Array<string>): Promise<Array<UserEvent> | ErrorEvent>;

                /**
                 * Join the current user to any conversation specified by the UUID.
                 *
                 * It's possible only on the following conditions:
                 * - a conversation is created by a user of the main Voximplant developer account or its child accounts
                 * - public join is enabled ({@link Voximplant.Messaging.Conversation#publicJoin} is true)
                 * - the conversation is not a direct one ({@link Voximplant.Messaging.Conversation#direct} is false)
                 *
                 * Other parties of the conversation (online participants and logged in clients) can be informed
                 * about joining to the conversation via the {@link Voximplant.Messaging.MessengerEventTypes.EditConversation} event.
                 *
                 * @param {string} uuid - Conversation UUID
                 */
                joinConversation(uuid: string): Promise<ConversationListEvent | ErrorEvent>;

                /**
                 * Make the current user leave a conversation specified by the UUID.
                 *
                 * It's possible only if the conversation is not a direct one ({@link Voximplant.Messaging.Conversation#direct} is false).
                 *
                 * After a successful method call the conversation's UUID will be added to {@link Voximplant.Messaging.User#leaveConversationList}.
                 *
                 * Other parties of the conversation (online participants and logged in clients) can be informed
                 * about leaving the conversation via the {@link Voximplant.Messaging.MessengerEventTypes.EditConversation} event.
                 *
                 * @param {string} uuid - Conversation UUID
                 */
                leaveConversation(uuid: string): Promise<ConversationListEvent | ErrorEvent>;

                /**
                 * Manage messenger push notification subscriptions for the current user.
                 *
                 * Other logged in clients (of the current user) can be informed about managing push notifications via
                 * {@link Voximplant.Messaging.MessengerEventTypes.EditUser}
                 *
                 * @param {Array<Voximplant.Messaging.MessengerNotification>} notifications - Array of messenger notification types
                 */
                managePushNotifications(notifications: Array<MessengerNotification>): Promise<UserEvent | ErrorEvent>;

                /**
                 * Remove handler for specified event
                 *
                 * @param {Voximplant.Messaging.MessengerEventTypes} eventType
                 * @param {function} handler - Handler function. If not specified, all handlers for the event type will be removed.
                 */
                off<T extends keyof MessengerEventTypesMap>(eventType: T, handler: (event: MessengerEventTypesMap[T]) => void): void;

                /**
                 * Register handler for specified messenger event.
                 * Use {@link Voximplant.Messaging.Messenger.off} method to delete a handler.
                 *
                 * @param {Voximplant.Messaging.MessengerEventTypes} eventType
                 * @param {function} handler
                 */
                on<T extends keyof MessengerEventTypesMap>(eventType: T, handler: (event: MessengerEventTypesMap[T]) => void): void;

                /**
                 * Set the current user status.
                 *
                 * Other users (that are subscribed to the user) and other clients (of the current user) can be informed about
                 * the status changing via the {@link Voximplant.Messaging.MessengerEventTypes.SetStatus} event.
                 *
                 * @param {boolean} online - True if user is available for messaging, false otherwise
                 */
                setStatus(online: boolean): Promise<StatusEvent | ErrorEvent>;

                /**
                 * Subscribe for other user(s) information and status changes.
                 *
                 * It's possible to subscribe for any user of the main Voximplant developer account or its child accounts.
                 *
                 * Other logged in clients (of the current user) can be informed about the subscription via
                 * the {@link Voximplant.Messaging.MessengerEventTypes.Subscribe} event.
                 *
                 * User(s) specified in the 'users' parameter aren't informed about the subscription.
                 *
                 * @param {Array<number>} users - Array of IM user ids
                 */
                subscribe(users: Array<number>): Promise<SubscriptionEvent | ErrorEvent>;

                /**
                 * Unsubscribe from other user(s) information and status changes.
                 *
                 * Other logged in clients (of the current user) can be informed about the unsubscription via
                 * the {@link Voximplant.Messaging.MessengerEventTypes.Unsubscribe} event.
                 *
                 * User(s) specified in the 'users' parameter aren't informed about the unsubscription.
                 *
                 * @param {Array<number>} users - Array of IM user ids
                 */
                unsubscribe(users: Array<number>): Promise<SubscriptionEvent | ErrorEvent>;

                /**
                 * Unsubscribe from all subscriptions.
                 *
                 * Other logged in clients (of the current user) can be informed about the unsubscription via
                 * the {@link Voximplant.Messaging.MessengerEventTypes.Unsubscribe} event.
                 *
                 * Other users aren't informed about the unsubscription.
                 */
                unsubscribeFromAll(): Promise<SubscriptionEvent | ErrorEvent>;
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
        }
    }
}
