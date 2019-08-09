/// <reference path="Enums.d.ts" />
/// <reference path="Interfaces.d.ts" />
/// <reference path="Hardware.d.ts" />
declare module "react-native-voximplant" {
    import * as React from "react";
    import * as ReactNative from "react-native";
    namespace Voximplant {
        export function getInstance(clientConfig?: ClientConfig): Client;
        export const VideoView: React.ComponentType<VideoViewProps>;
    }

    export interface VideoViewProps extends ReactNative.ViewProps {
        scaleType?: Voximplant.RenderScaleType;
        showOnTop?: boolean;
        videoStreamId?: string;
    }

    interface Client {
    }
}
