import { setupServer } from 'msw/node';
import { handlers } from './handlers';

// Setup server with all handlers
const server = setupServer(...handlers);

export default server;
