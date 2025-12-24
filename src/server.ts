import initApp from "./index";
import { swaggerUi, swaggerSpec } from "./swagger";
const port = process.env.PORT;

initApp().then((app) => {
    app.use("/api-docs", swaggerUi.serve, swaggerUi.setup(swaggerSpec));
    app.listen(port, () => {
        console.log(`Example app listening at http://localhost:${port}`);
    });
});
