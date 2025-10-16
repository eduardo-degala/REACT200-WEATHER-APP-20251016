/* eslint no-console: "off" */
import server from './server.js';

const PORT = process.env.PORT || 5100;

server.listen(PORT, () => console.log(`Server is listening on ${PORT}`));
