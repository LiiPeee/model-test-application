import { Appointment } from "../entites/appointment";

export interface AppointmentRepositorys {
    create(appoiment: Appointment): Promise<void>

    findOvelappingAppointment(startsAt: Date, endsAt: Date): Promise<Appointment | null>
}