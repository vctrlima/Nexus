import 'module-alias/register'

import env from '@/main/config/env'

const start = async () => {
  const app = (await import('./config/app')).default
  app.listen(env.port, () => {
    console.log(`Server running at http://localhost:${env.port}`)
  })
}

start()
