import { Injectable } from "@angular/core";
import { Actions, createEffect, ofType } from "@ngrx/effects";
import { ChatService } from "../services/chat/chat.service";
import { loadChatId, loadChatSucess } from "./actions";
import { map, mergeMap, of } from "rxjs";
import { groupMessagesByDate, messagesGroupedByDate } from "../utilities/formatMessage";

@Injectable()
export class ChatEffects {
    loadChats$ = createEffect(() => this.actions$.pipe(
        ofType(loadChatId),
        mergeMap(({ id }) => {
            return this.getChatData(id).pipe(
                map((chatData) => {
                    return loadChatSucess({ chatData })
                })
            )
        })
    ))
    getChatData(id: string) {
        return this.chatservice.get(`getchats/${id}`).pipe(map((res: any) => {
            if(res?.chats){
                return messagesGroupedByDate(res?.chats)
            }else{
                return []
            }
        }))
    }
    constructor(private chatservice: ChatService, private actions$: Actions) {

    }
}