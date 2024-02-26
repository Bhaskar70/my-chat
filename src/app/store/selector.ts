import { createFeatureSelector ,createSelector} from "@ngrx/store";
import { data } from "./reducer";

export const featureDate = createFeatureSelector<data>('data')

export const chatData = createSelector(featureDate , state => state.chatData)