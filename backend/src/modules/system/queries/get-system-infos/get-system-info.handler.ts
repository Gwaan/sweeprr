import { systemActionCreator } from '@/modules/system';
import { HddSpaceModel } from '@/modules/system/queries/get-system-infos/get-system-info.schema';
import { NotFoundException } from '@/shared/exceptions/exceptions';
import { formatBytesToGB } from '@/shared/utils/number.util';
import si, { Systeminformation } from 'systeminformation';
import FsSizeData = Systeminformation.FsSizeData;
import MemData = Systeminformation.MemData;

export type GetSystemInfoQueryResult = Promise<HddSpaceModel>;
export const getSystemInfoQuery = systemActionCreator('info', {
  websocket: true,
});

export default function makeGetSystemInfo({ queryBus }: Dependencies) {
  return {
    async handler(): GetSystemInfoQueryResult {
      const drives: FsSizeData[] = await si.fsSize();
      console.log(drives);
      const fs: FsSizeData | undefined = drives.find(
        (d) => d.mount === '/config' || d.mount === 'C:',
      );
      if (!fs) {
        throw new NotFoundException('Drive not found');
      }
      const mem: MemData | undefined = await si.mem();
      return {
        driveName: fs!.fs,
        occupiedSpacePercentage: fs!.use,
        totalSpaceGb: formatBytesToGB(fs!.size),
        freeSpaceGb: formatBytesToGB(fs!.size - fs!.used),
        usedSpaceGb: formatBytesToGB(fs!.used),
        usedMemoryGb: formatBytesToGB(mem.used),
        freeMemoryGb: formatBytesToGB(mem.total - mem.used),
        totalMemoryGb: formatBytesToGB(mem.total),
      };
    },
    init() {
      queryBus.register(getSystemInfoQuery.type, this.handler);
    },
  };
}
