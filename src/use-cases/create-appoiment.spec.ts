import { Appointment } from '../entites/appointment';
import { InMemoryAppointment } from '../repositories/inMemory/in-memory-appointment';
import { getFutureDate } from '../tests/utils/get-future-date';
import { CreateAppoiment } from './create-appoiment';
import { expect,it, describe } from 'vitest';


describe('crete news appointments',()=>{
    it('should be able create an Appoinment',()=>{


        const appointmentRepository = new InMemoryAppointment();

        
        const createNew = new CreateAppoiment(appointmentRepository);

        const startsAt = getFutureDate('2021-05-07');
        const endsAt = getFutureDate('2021-06-07')

        endsAt.setDate(endsAt.getDate() + 1);


        expect(createNew.execute({
        customer: "John Due",
        startsAt,
        endsAt,
    })).resolves.toBeInstanceOf(Appointment)

    })
    it('should not be able create an Appoinment overlapping dates',async ()=>{


        const appointmentRepository = new InMemoryAppointment();
        const createNew = new CreateAppoiment(appointmentRepository);

        const startsAt = getFutureDate('2021-05-18');
        const endsAt = getFutureDate('2021-06-07')

        await createNew.execute({
            customer: 'John Doe',
            startsAt,
            endsAt
    })

        expect(createNew.execute({
        customer: "John Due",
        startsAt: getFutureDate('2022-05-14'),
        endsAt: getFutureDate('2022-05-18')
    })).rejects.toBeInstanceOf(Error)
    expect(createNew.execute({
        customer: "John Due",
        startsAt: getFutureDate('2022-05-12'),
        endsAt: getFutureDate('2022-05-18')
    })).rejects.toBeInstanceOf(Error)


    })
})