import { Appointment } from "../../entites/appointment";
import { AppointmentRepositorys } from "../appointment-repositorie";
import{areIntervalsOverlapping} from 'date-fns'

export class InMemoryAppointment implements AppointmentRepositorys{
    

    public items: Appointment[] = [] 


    async create(appoiment: Appointment): Promise<void> {
        this.items.push(appoiment)
    }
    
    async findOvelappingAppointment(startsAt: Date, endsAt: Date): Promise<Appointment | null> {

        const overlappingAppointment = this.items.find(appointment =>{
            return areIntervalsOverlapping(
                {start: startsAt, end: endsAt},
                {start: appointment.startsAt, end: appointment.endsAt},
                {inclusive: true}   
            )
        })
        if(!overlappingAppointment){
            return null
        }
        return overlappingAppointment;
    }
}