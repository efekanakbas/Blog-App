import {string, object, ref} from 'yup';

const req = 'You have to fill this area!'
const min = 'You have to type at least 8 characters'

let passwordSchema = object({
  current: string().required(req).min(8,min) ,
  new: string().required(req).min(8,min) ,
  confirm: string().required(req).min(8,min).oneOf([ref('new')], 'Confirm must fit with password!') ,
});


export default passwordSchema