export interface AppointmentProps {
        customer: string;
        startsAt: Date;
        endsAt: Date; 
}


export class Appointment {
    private pros: AppointmentProps

    get customer (){
        return this.pros.customer;
    }
    get startsAt (){
        return this.pros.startsAt;
    }
    get endsAt (){
        return this.pros.endsAt;
    }

    constructor(props: AppointmentProps){

        
        
        this.pros = props;

        if(this.endsAt <= this.startsAt){
            throw new Error("Ta terminando algo que ja acabou?");
        }
        if(this.endsAt <= new Date()){
            throw new Error('ta voltando no passado?');
        }
    }

}