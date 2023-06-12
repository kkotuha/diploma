
import { getExpress } from './src/express.js';

async function main() {
  const app = await getExpress();
  app.listen(3000, () => {
    console.log('Listening on port http://localhost:3000/api');
  });
}

main().catch(err => console.error(err));
