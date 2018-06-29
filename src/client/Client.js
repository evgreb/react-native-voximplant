/*
 * Copyright (c) 2011-2018, Zingaya, Inc. All rights reserved.
 */

'use strict';
import React, { Component } from 'react';
import {
    Platform,
    NativeModules,
	NativeEventEmitter,
	DeviceEventEmitter,
} from 'react-native';
import { LogLevel } from './../Enums';
import ClientEvents from './ClientEvents';
import Call from './../call/Call';

const ClientModule = NativeModules.ClientModule;

const listeners = {};

const EventEmitter = Platform.select({
	ios: new NativeEventEmitter(ClientModule),
	android: DeviceEventEmitter,
});

export default class Client {
    static clientInstance = null;

    constructor(clientConfig) {
        if (Client.clientInstance) {
            throw new Error('Error - use Voximplant.getInstance()');
        }
        if (!clientConfig) clientConfig = {};
        if (Platform.OS === 'android') {
            if (clientConfig.enableVideo === undefined) clientConfig.enableVideo = true;
            if (clientConfig.enableHWAcceleration === undefined) clientConfig.enableHWAcceleration = true;
            if (clientConfig.provideLocalFramesInByteBuffer === undefined) clientConfig.provideLocalFramesInByteBuffer = false;
            if (clientConfig.enableDebugLogging === undefined) clientConfig.enableDebugLogging = false;
            if (clientConfig.enableCameraMirroring === undefined) clientConfig.enableCameraMirroring = true;
            if (clientConfig.enableLogcatLogging === undefined) clientConfig.enableLogcatLogging = true;
            if (clientConfig.H264first === undefined) clientConfig.H264first = false;
            ClientModule.init(clientConfig.enableVideo,
                clientConfig.enableHWAcceleration,
                clientConfig.provideLocalFramesInByteBuffer,
                clientConfig.enableDebugLogging,
                clientConfig.enableCameraMirroring,
                clientConfig.enableLogcatLogging,
                clientConfig.H264first);
        }
        if (Platform.OS === 'ios') {
            if (clientConfig.logLevel === undefined) clientConfig.logLevel = LogLevel.INFO;
            if (clientConfig.saveLogsToFile === undefined) clientConfig.saveLogsToFile = false;
            ClientModule.initWithOptions(clientConfig.logLevel, clientConfig.saveLogsToFile);
        }
        EventEmitter.addListener('VIConnectionEstablished', this._onConnectionEstablished);
        EventEmitter.addListener('VIConnectionClosed', this._onConnectionClosed);
        EventEmitter.addListener('VIConnectionFailed', this._onConnectionFailed);
        EventEmitter.addListener('VIAuthResult', this._onAuthResult);
        EventEmitter.addListener('VIAuthTokenResult', this._onAuthTokenResult);
        EventEmitter.addListener('VIIncomingCall', this._onIncomingCall);
    }

    static getInstance(clientConfig) {
        if (this.clientInstance === null) {
            this.clientInstance = new Client(clientConfig);
        }
        return this.clientInstance;
    }

    on(event, handler) {
        if (!listeners[event]) {
            listeners[event] = new Set();
        }
        listeners[event].add(handler);
    }

    off(event, handler) {
        if (listeners[event]) {
            listeners[event].delete(handler);
        }
    }

    connect(options) {
        return new Promise((resolve, reject) => {
            if (!options) options = {};
            if (options.connectivityCheck === undefined) options.connectivityCheck = false;
            if (options.servers === undefined) options.servers = [];
            let connected = (event) => {
                resolve(event);
                EventEmitter.removeListener('VIConnectionEstablished', connected);
            };
            let failed = (event) => {
                reject(event);
                EventEmitter.removeListener('VIConnectionFailed', failed);
            };
            EventEmitter.addListener('VIConnectionEstablished', connected);
            EventEmitter.addListener('VIConnectionFailed', failed);
            ClientModule.connect(options.connectivityCheck, options.servers, (isValidState) => {
                if (!isValidState) {
                    EventEmitter.removeListener('VIConnectionEstablished', connected);
                    EventEmitter.removeListener('VIConnectionFailed', failed);
                    reject({'name': ClientEvents.ConnectionFailed, 'message': 'ALREADY_CONNECTED_TO_VOXIMPLANT'});
                }
            });
        });
    };

    disconnect() {
        return new Promise((resolve, reject) => {
            let disconnected = (event) => {
                resolve(event);
                EventEmitter.removeListener('VIConnectionClosed', disconnected);
            };
            EventEmitter.addListener('VIConnectionClosed', disconnected);
            ClientModule.disconnect();
        });
    }

    getClientState() {
        return ClientModule.getClientState();
    }

    login(username, password) {
        return new Promise((resolve, reject) => {
            let loginResult = (event) => {
                if (event.result) {
                    resolve(event);
                } else {
                    reject(event);
                }
                EventEmitter.removeListener('VIAuthResult', loginResult);
            };
            EventEmitter.addListener('VIAuthResult', loginResult);
            ClientModule.login(username, password);
        });
    }

    loginWithOneTimeKey(username, hash) {
        return new Promise((resolve, reject) => {
            let loginResult = (event) => {
                if (event.result) {
                    resolve(event);
                } else {
                    reject(event);
                }
                EventEmitter.removeListener('VIAuthResult', loginResult);
            };
            EventEmitter.addListener('VIAuthResult', loginResult);
            ClientModule.loginWithOneTimeKey(username, hash);
        });
    }

    loginWithToken(username, token) {
        return new Promise((resolve, reject) => {
            let loginResult = (event) => {
                if (event.result) {
                    resolve(event);
                } else {
                    reject(event);
                }
                EventEmitter.removeListener('VIAuthResult', loginResult);
            };
            EventEmitter.addListener('VIAuthResult', loginResult);
            ClientModule.loginWithToken(username, token);
        });
    }

    requestOneTimeLoginKey(username) {
        return new Promise((resolve, reject) => {
            let requestResult = (event) => {
                if (event.result) {
                    resolve(event);
                } else {
                    reject(event);
                }
                EventEmitter.removeListener('VIAuthResult', requestResult);
            };
            EventEmitter.addListener('VIAuthResult', requestResult);
            ClientModule.requestOneTimeLoginKey(username);
        });
    }

    tokenRefresh(username, refreshToken) {
        return new Promise((resolve, reject) => {
            let refreshResult = (event) => {
                if (event.result) {
                    resolve(event);
                } else {
                    reject(event);
                }
                EventEmitter.removeListener('VIAuthTokenResult', refreshResult);
            };
            EventEmitter.addListener('VIAuthTokenResult', refreshResult);
            CLientModule.refreshToken(username, refreshToken);
        });
    }

    registerPushNotificationsToken(token) {
        ClientModule.registerPushNotificationsToken(token);
    }

    unregisterPushNotificationsToken(token) {
        ClientModule.unregisterPushNotificationsToken(token);
    }

    handlePushNotification(notification) {
        ClientModule.handlePushNotification(notification);
    }

    /**
     *
     * @param number
     * @param callSettings
     * @returns {Promise<Call>}
     */
    call(number, callSettings) {
        //TODO(yulia): add H264First parameter for ios module call
        if (!callSettings) {
            callSettings = {};
        }
        if (callSettings.H264First === undefined) {
            callSettings.H264First = false;
        }
        if (callSettings.video === undefined) {
            callSettings.video = {};
            callSettings.video.sendVideo = false;
            callSettings.video.receiveVideo = true;
        }
        if (callSettings.customData === undefined) {
            callSettings.customData = null;
        }
        if (callSettings.extraHeaders === undefined) {
            callSettings.extraHeaders = null;
        }
        return new Promise((resolve, reject) => {
            ClientModule.createAndStartCall(number, callSettings.video, callSettings.customData, callSettings.extraHeaders, (callId) => {
                if (callId) {
                    let call = new Call(callId);
                    resolve(call);
                } else {
                    reject();
                }
            });
        });
    }

    _emit(event, ...args) {
        const handlers = listeners[event];
        if (handlers) {
            for (const handler of handlers) {
                handler(...args);
            }
        }
    }

    _onConnectionEstablished = (event) => {
        this._emit(ClientEvents.ConnectionEstablished, event);
    };

    _onConnectionFailed = (event) => {
        this._emit(ClientEvents.ConnectionFailed, event);
    };

    _onConnectionClosed = (event) => {
        this._emit(ClientEvents.ConnectionClosed, event);
    };

    _onAuthResult = (event) => {
        this._emit(ClientEvents.AuthResult, event);
    };
    
    _onAuthTokenResult = (event) => {
        this._emit(ClientEvents.RefreshTokenResult, event);
    };

    _onIncomingCall = (event) => {
        event.call = new Call(event.callId);
        delete event.callId;
        this._emit(ClientEvents.IncomingCall, event);
    };
} 
