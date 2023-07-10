import { Appointment } from "../entites/appointment";
import { AppointmentRepositorys } from "../repositories/appointment-repositorie";

interface CreateAppoimentRequest {
    customer: string;
    startsAt: Date;
    endsAt: Date;
}
type CreateAppoimentResponse = Appointment;

export class CreateAppoiment {
    constructor(
        private appointmentsRepository: AppointmentRepositorys
    ){}

    async execute({
        customer,
        startsAt,
        endsAt
    }: CreateAppoimentRequest): Promise<CreateAppoimentResponse> {
        const overlappingAppointment = await this.appointmentsRepository.findOvelappingAppointment(
            startsAt
            ,endsAt)

        if(overlappingAppointment){
            throw new Error('vixe deu')
        }
        const appointment = new Appointment({
            customer,
            startsAt,
            endsAt
        })
        await this.appointmentsRepository.create(appointment)

        return appointment;
    }
}