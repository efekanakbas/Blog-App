import {string, object, ref} from 'yup';

const req = 'You have to fill this area!'
const min = 'You have to type at least 5 characters'

let register2Schema = object({
  password: string().required(req).min(5,min) ,
  confirm: string().required(req).min(5,min).oneOf([ref('password')], 'Confirm must fit with password!') ,
});


export default register2Schema