import {string, object} from 'yup';

const req = 'You have to fill this area!'

let loginSchema = object({
  email: string().email('You have to type a valid email').required(req),
  password: string().required(req).min(5,'At least 5 characters')
});


export default loginSchema