/// <reference path="Interfaces.d.ts" />
declare module "react-native-voximplant" {
    namespace EventHandlers {
        export interface AuthResult {
            /*
            * Auth result error code
            * */
            code: number,
            /*
            * Authorized user's display name
            * */
            displayName: string,
            /*
            * This parameter is used to calculate hash parameter for {@link Voximplant.Client.loginWithOneTimeKey} method.
            * AuthResult with the key dispatched after {@link Voximplant.Client.requestOneTimeLoginKey} method was called.
            * */
            key: string,
            /*
            * Name of the event
            * */
            name: string,
            /*
            * True in case of success, false - otherwise
            * */
            result: boolean,
            /*
            * New tokens structure
            * */
            tokens: LoginTokens
        }
    }
}
