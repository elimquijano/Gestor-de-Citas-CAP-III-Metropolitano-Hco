
import { createServer, rest } from 'msw';

const server = createServer();

// Define tus manejadores (handlers) de rutas y respuestas falsas
const handlers = [
  rest.get('/api/ruta-en-react', (req, res, ctx) => {
    return res(
      ctx.json({ ejemplo: 'Datos desde React' })
    );
  }),
];

// Agrega los manejadores al servidor
server.use(...handlers);

// Inicia el servidor
server.listen();