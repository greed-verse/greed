declare module "@azesmway/react-native-unity" {
  import { Component } from "react";
  import { NativeSyntheticEvent, ViewStyle } from "react-native";

  export interface UnityMessage {
    message: string;
  }

  export interface UnityViewProps {
    style?: ViewStyle;
    onUnityMessage?: (event: NativeSyntheticEvent<UnityMessage>) => void;
    androidKeepPlayerMounted?: boolean;
    fullScreen?: boolean;
  }

  export default class UnityView extends Component<UnityViewProps> {
    postMessage(gameObject: string, methodName: string, message: string): void;
    unloadUnity(): void;
    pauseUnity(pause: boolean): void;
    windowFocusChanged(hasFocus?: boolean): void;
  }
}
