import { systemActionCreator } from '@/modules/system';
import { HddSpaceModel } from '@/modules/system/queries/get-system-infos/get-system-info.schema';

export type GetSystemInfoQueryResult = Promise<HddSpaceModel>;
export const getSystemInfoQuery = systemActionCreator('info', { websocket: true });

export default function makeGetSystemInfo({ queryBus }: Dependencies) {
  return {
    async handler(): GetSystemInfoQueryResult {
      return {
        driveName: 'C:',
        occupiedSpacePercentage: 0.5,
        totalSpaceGb: 100,
        freeSpaceGb: 10,
        usedSpaceGb: 90,
      };
    },
    init() {
      queryBus.register(getSystemInfoQuery.type, this.handler);
    },
  };
}
