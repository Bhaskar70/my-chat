import { createReducer, on } from "@ngrx/store";
import { loadChatSucess } from "./actions";
export interface data {
    chatData: any
}

const initialState: data = {
    chatData: []
}

export const chatReducer = createReducer(
    initialState,
    on(loadChatSucess, (state: data, { chatData }) => ({ ...state, chatData: chatData }))
)