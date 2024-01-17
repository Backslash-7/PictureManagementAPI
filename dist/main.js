"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const core_1 = require("@nestjs/core");
const app_module_1 = require("./app.module");
const fs = require("fs");
const path = require("path");
async function bootstrap() {
    const app = await core_1.NestFactory.create(app_module_1.AppModule);
    const rootDirectory = path.join(__dirname, 'uploads');
    if (!fs.existsSync(rootDirectory)) {
        fs.mkdirSync(rootDirectory);
    }
    await app.listen(3000);
}
bootstrap();
//# sourceMappingURL=main.js.map