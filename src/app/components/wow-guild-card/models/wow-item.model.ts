import { WowDataItem } from './wow-item-data.model';

export interface WowItem {
  name: string;
  realmName: string;
  data?: WowDataItem;
}
