export type SnackbarMessageVariant = 'success' | 'information' | 'warning' | 'error';

export interface SnackbarMessage {
    text: string;
    variant: SnackbarMessageVariant;
}

export interface SnackbarMessageWithId extends SnackbarMessage {
    id: string;
}