import { Static, Type } from '@sinclair/typebox';

export const getSystemInfoDtoSchema = Type.Object({
  driveName: Type.String(),
  occupiedSpacePercentage: Type.Number(),
  totalSpaceGb: Type.Number(),
  freeSpaceGb: Type.Number(),
  usedSpaceGb: Type.Number(),
  usedMemoryGb: Type.Number(),
  freeMemoryGb: Type.Number(),
  totalMemoryGb: Type.Number(),
});

export type HddSpaceModel = Static<typeof getSystemInfoDtoSchema>;
