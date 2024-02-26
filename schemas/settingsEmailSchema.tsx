import {string, object, ref} from 'yup';

const req = 'You have to fill this area!'
const email = 'You have to type a valid email!'

  const emailSchema = object({
  email: string().required(req).email(email) ,
  confirm: string().required(req).email(email).oneOf([ref('email')], 'Confirm must fit with email!') ,
});

export default emailSchema

