import {string, object} from 'yup';

const req = 'You have to fill this area!'

let register1Schema = object({
  first: string().required(req),
  last: string().required(req),
  email: string().email('You have to type a valid email').required(req),
  username: string().required(req).lowercase('You have to type lowercase!')
});


export default register1Schema