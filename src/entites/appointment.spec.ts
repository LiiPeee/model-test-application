import { expect, test } from 'vitest';
import { Appointment } from './appointment';
import { getFutureDate } from '../tests/utils/get-future-date'

test('create an appointment', () => {

    const startsAt = getFutureDate('2022-03-21')
    const endsAt = getFutureDate('2022-04-15')

    endsAt.setDate(endsAt.getDate()+ 1 )
    const appointment = new Appointment({
        customer: 'John Doe',
        startsAt,
        endsAt,
    })


    expect(appointment).not.toBeNull();
    expect(appointment.customer).toEqual('John Doe')
})


test('not create appointment its endsAt before now',()=> {
    const startsAt = new Date();
    const endsAt = new Date();

    endsAt.setDate(endsAt.getDate()- 1);

    expect(()=>{
        return new Appointment({
            customer: 'John Doe',
            endsAt,
            startsAt
        })
    }).toThrow()
})
test('not create appointments before starts date now',()=> {
    const startsAt = new Date();
    const endsAt = new Date();

    endsAt.setDate(endsAt.getDate()+ 1);
    startsAt.setDate(startsAt.getDate()+2 )

    expect(()=>{
        return new Appointment({
            customer: 'John Doe',
            endsAt,
            startsAt
        })
    }).toThrow()
})