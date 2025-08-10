import { v4 as uuidv4 } from 'uuid';

export const generateTicketCode = () => {
  return uuidv4();
};
