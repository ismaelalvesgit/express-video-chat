import { app, httpServer } from './src/app'
import errorHandler from './src/middleware/errorMiddleware';
import env from './src/env'
import logger from './src/logger'

const run = ()=>{
    if(env.server.active){
        httpServer.listen(env.server.port, ()=>{
            app.use(errorHandler)
            import('./src/socket')
            logger.info(`Server on http://localhost:${env.server.port}`)
        })
        
    } 
}

run();