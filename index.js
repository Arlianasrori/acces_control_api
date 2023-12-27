import { logger } from "./src/config/logger.js"
import { app } from "./src/application/app.js"
app.listen(3000,() => {
    logger.info("server is running on port 3000")
})