export interface LightBullMessage {
    type: string;
    payload: any;
}

export interface LoadingState {
    loading: boolean;
    loaded: boolean;
    failed: boolean;
}