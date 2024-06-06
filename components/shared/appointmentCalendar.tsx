"use client";

import {
  Tooltip,
  TooltipContent,
  TooltipTrigger,
} from "@/components/ui/tooltip";

import { useGetSummary } from "@/hooks/summary/api/use-Get-Summary";
import { useEffect, useState } from "react";
import "react-calendar/dist/Calendar.css";
import Calendar from "react-calendar";

type Appointment = {
  id: string;
  name: string;
  date: string;
};

const AppointmentCalendar = () => {
  const { data, isLoading, isError } = useGetSummary();
  const [appointments, setAppointments] = useState<Appointment[]>([]);
  const [hoveredAppointment, setHoveredAppointment] =
    useState<Appointment | null>(null);

  useEffect(() => {
    if (data) {
      const fetchedAppointments: Appointment[] = data.appointments.map(
        (appointment: any) => ({
          id: appointment.id,
          name: appointment.name,
          date: appointment.date,
        }),
      );
      setAppointments(fetchedAppointments);
    }
  }, [data]);

  const tileContent = ({ date, view }: { date: Date; view: string }) => {
    if (view === "month") {
      const formattedDate = date.toISOString().split("T")[0];

      // Find the appointment for the current day
      const appointmentIndex = appointments.findIndex((app) => {
        const appointmentDate = new Date(app.date).toISOString().split("T")[0];
        return appointmentDate === formattedDate;
      });

      if (appointmentIndex !== -1) {
        const appointment = appointments[appointmentIndex];

        return (
          <Tooltip>
            <TooltipTrigger>
              {/* Only display the appointment index number */}
              <div className="rounded bg-green-600 p-1">
                <span className="over-hidden line-clamp-1 text-center text-xs text-white">
                  <strong>{appointment.name}</strong>
                </span>
              </div>
            </TooltipTrigger>
            <TooltipContent>
              <div>
                <strong>{appointment.name}</strong>
              </div>
              <div>{formattedDate}</div>
            </TooltipContent>
          </Tooltip>
        );
      }
      // If there is no appointment, render nothing for this day
      else {
        return null;
      }
    }
    return null;
  };

  if (isLoading) {
    return <div>Loading...</div>;
  }

  if (isError) {
    return <div>Error loading appointments</div>;
  }

  return (
    <div className="relative">
      <h2 className="mb-4 text-xl font-bold">Appointment Calendar</h2>
      <Calendar tileContent={tileContent} className="w-full" />
    </div>
  );
};

export default AppointmentCalendar;
