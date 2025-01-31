'use client';
import { Button } from '@/components/ui/button';
import { format } from 'date-fns';
import { createEntry } from '../actions';

export const AddDataButton = () => {
  const currentDate = new Date();
  const normalizedDate = new Date(
    Date.UTC(
      currentDate.getUTCFullYear(),
      currentDate.getUTCMonth(),
      currentDate.getUTCDate()
    )
  );

  async function handleCreateEntry() {
    const { success, message } = await createEntry(normalizedDate);
    console.log({ success, message });
  }

  return (
    <Button onClick={handleCreateEntry}>
      Add data for date: {format(currentDate, 'dd-MMM-yy')}
    </Button>
  );
};

[
  {
    id: 'cm6jdtwff0000zinadkdaqwt1',
    engineId: 'cm6jcabkr0000toy0n6qy5ztm',
    date: '2025-01-30T00:00:00.000Z',
    status: 'RUNNING',
    loadSetpoint: null,
    fuelRackControl: null,
    foFlowRate: null,
    tcSpeedA: null,
    tcSpeedB: null,
    exhGasTempTCAInlet: null,
    exhGasTempTCBInlet: null,
    avgExhaustTemp: null,
    crankcasePress: null,
    maxMainBearingTemp: null,
    maxBigEndBearingTemp: null,
    maxLinerTemp: null,
    maxAlternatorBearingTemp: null,
    maxWindingTemp: null,
    torsionalVib: null,
    cleanLeakPumpRuns: null,
    fuelConsumption: null,
    heatRate: null,
    engine: { number: 1 },
  },
  {
    id: 'cm6jdtwff0001zina1fs1nbup',
    engineId: 'cm6jcatpk0001toy06umgmg3v',
    date: '2025-01-30T00:00:00.000Z',
    status: 'RUNNING',
    loadSetpoint: null,
    fuelRackControl: null,
    foFlowRate: null,
    tcSpeedA: null,
    tcSpeedB: null,
    exhGasTempTCAInlet: null,
    exhGasTempTCBInlet: null,
    avgExhaustTemp: null,
    crankcasePress: null,
    maxMainBearingTemp: null,
    maxBigEndBearingTemp: null,
    maxLinerTemp: null,
    maxAlternatorBearingTemp: null,
    maxWindingTemp: null,
    torsionalVib: null,
    cleanLeakPumpRuns: null,
    fuelConsumption: null,
    heatRate: null,
    engine: { number: 2 },
  },
  {
    id: 'cm6jdtwff0002zinajgpye6tq',
    engineId: 'cm6jcbcia0002toy0ts3u6a16',
    date: '2025-01-30T00:00:00.000Z',
    status: 'RUNNING',
    loadSetpoint: null,
    fuelRackControl: null,
    foFlowRate: null,
    tcSpeedA: null,
    tcSpeedB: null,
    exhGasTempTCAInlet: null,
    exhGasTempTCBInlet: null,
    avgExhaustTemp: null,
    crankcasePress: null,
    maxMainBearingTemp: null,
    maxBigEndBearingTemp: null,
    maxLinerTemp: null,
    maxAlternatorBearingTemp: null,
    maxWindingTemp: null,
    torsionalVib: null,
    cleanLeakPumpRuns: null,
    fuelConsumption: null,
    heatRate: null,
    engine: { number: 3 },
  },
  {
    id: 'cm6jdtwff0003zina8iniac7k',
    engineId: 'cm6jcbqir0003toy0bwzz9bu6',
    date: '2025-01-30T00:00:00.000Z',
    status: 'RUNNING',
    loadSetpoint: null,
    fuelRackControl: null,
    foFlowRate: null,
    tcSpeedA: null,
    tcSpeedB: null,
    exhGasTempTCAInlet: null,
    exhGasTempTCBInlet: null,
    avgExhaustTemp: null,
    crankcasePress: null,
    maxMainBearingTemp: null,
    maxBigEndBearingTemp: null,
    maxLinerTemp: null,
    maxAlternatorBearingTemp: null,
    maxWindingTemp: null,
    torsionalVib: null,
    cleanLeakPumpRuns: null,
    fuelConsumption: null,
    heatRate: null,
    engine: { number: 4 },
  },
  {
    id: 'cm6jdtwff0004zinadl9kznhh',
    engineId: 'cm6jcc0vu0004toy0fsxrvbpm',
    date: '2025-01-30T00:00:00.000Z',
    status: 'RUNNING',
    loadSetpoint: null,
    fuelRackControl: null,
    foFlowRate: null,
    tcSpeedA: null,
    tcSpeedB: null,
    exhGasTempTCAInlet: null,
    exhGasTempTCBInlet: null,
    avgExhaustTemp: null,
    crankcasePress: null,
    maxMainBearingTemp: null,
    maxBigEndBearingTemp: null,
    maxLinerTemp: null,
    maxAlternatorBearingTemp: null,
    maxWindingTemp: null,
    torsionalVib: null,
    cleanLeakPumpRuns: null,
    fuelConsumption: null,
    heatRate: null,
    engine: { number: 5 },
  },
  {
    id: 'cm6jdtwff0005zinag8em75hi',
    engineId: 'cm6jccbae0005toy00fs8ainq',
    date: '2025-01-30T00:00:00.000Z',
    status: 'RUNNING',
    loadSetpoint: null,
    fuelRackControl: null,
    foFlowRate: null,
    tcSpeedA: null,
    tcSpeedB: null,
    exhGasTempTCAInlet: null,
    exhGasTempTCBInlet: null,
    avgExhaustTemp: null,
    crankcasePress: null,
    maxMainBearingTemp: null,
    maxBigEndBearingTemp: null,
    maxLinerTemp: null,
    maxAlternatorBearingTemp: null,
    maxWindingTemp: null,
    torsionalVib: null,
    cleanLeakPumpRuns: null,
    fuelConsumption: null,
    heatRate: null,
    engine: { number: 6 },
  },
];
