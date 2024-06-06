"use client";

import SpendingPie, {
  SpendingPieLoading,
} from "@/components/shared/spendingPie";
import AppointmentCalendar from "@/components/shared/appointmentCalendar";
import { useGetSummary } from "@/hooks/summary/api/use-Get-Summary";
import Chart, { ChartLoading } from "@/components/shared/chart";

const DataCharts = () => {
  const { data, isLoading } = useGetSummary();

  if (isLoading) {
    return (
      <div className="grid grid-cols-1 gap-8 lg:grid-cols-6">
        <div className="col-span-1 lg:col-span-3 xl:col-span-4">
          <ChartLoading />
        </div>

        <div className="col-span-1 lg:col-span-3 xl:col-span-2">
          <SpendingPieLoading />
        </div>
      </div>
    );
  }

  return (
    <div className="grid grid-cols-1 gap-8 lg:grid-cols-8">
      <div className="col-span-1 lg:col-span-3 xl:col-span-3">
        <Chart data={data?.days} />
      </div>

      <div className="col-span-1 lg:col-span-3 xl:col-span-3">
        <SpendingPie data={data?.categories} />
      </div>

      <div className="col-span-1 lg:col-span-3 xl:col-span-2">
        <AppointmentCalendar />
      </div>
    </div>
  );
};

export default DataCharts;
