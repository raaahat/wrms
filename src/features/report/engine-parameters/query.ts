'use server';
import { db } from '@/lib/prisma';

export const getEngineDataForDate = async (date: string) => {
  const engineData = await db.engineData.findMany({
    where: { date: new Date(date) },
    include: { engine: true },
    orderBy: { engineId: 'asc' },
  });

  if (engineData.length === 0) return null;

  // Define parameter names
  const parameters = [
    'loadSetpoint',
    'fuelRackControl',
    'foFlowRate',
    'tcSpeedA',
    'tcSpeedB',
    'exhGasTempTCAInlet',
    'exhGasTempTCBInlet',
    'avgExhaustTemp',
    'crankcasePress',
    'maxMainBearingTemp',
    'maxBigEndBearingTemp',
    'maxLinerTemp',
    'maxAlternatorBearingTemp',
    'maxWindingTemp',
    'torsionalVib',
    'cleanLeakPumpRuns',
    'fuelConsumption',
    'heatRate',
  ];

  // Transform data into table format
  const tableData = parameters.map((param) => ({
    name: param,
    values: engineData.map(
      (entry) => entry[param as keyof typeof entry] ?? '—'
    ),
  }));

  return { headers: engineData.map((e) => e.engine.name), rows: tableData };
};
