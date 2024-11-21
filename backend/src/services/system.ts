/*import si, { Systeminformation } from 'systeminformation';

import DockerContainerStatsData = Systeminformation.DockerContainerStatsData;
import FsSizeData = Systeminformation.FsSizeData;

const systemService = () => {
  return {
    getSystemData: async () => {
      const test: FsSizeData[] = await si.fsSize();
      const dockerInfo: DockerContainerStatsData[] =
        await si.dockerContainerStats('');
      const mountInfo: FsSizeData | undefined = test.find(
        (mi) => mi.mount === '/host',
      );
      return {
        memory: formatBytesToGB(dockerInfo[0].memPercent),
        freemem: formatBytesToGB(dockerInfo[0].memPercent),
        stats: formatBytesToGB(mountInfo?.size!),
      };
    },
  };
};

const formatBytesToGB = (bytes: number) => (bytes / 1024 ** 3).toFixed(2);*/
