import { getFutureDate } from "./get-future-date"
import {test,expect} from 'vitest'
test('increses date with years', ()=>{

    const year = new Date().getFullYear()
    expect(getFutureDate(`${year}-06-29`).getFullYear()).toEqual(2024)
})