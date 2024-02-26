import { createAction, props } from "@ngrx/store";


export const loadChatId = createAction('load chat based on Id' , props<{id :string}>())
export const loadChatSucess = createAction('load chat success' , props<{chatData :any}>())
