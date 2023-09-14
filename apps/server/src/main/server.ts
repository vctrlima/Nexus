import 'module-alias/register';

import env from '@server/main/config/env';
import appConfig from '@server/main/config/app';

const start = async () => {
  const app = appConfig;
  app.listen(env.port, () => {
    console.log(`Server running at http://localhost:${env.port}`);
  });
};

start();
