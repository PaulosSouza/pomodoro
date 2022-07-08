import server from "./server";
import { socket } from "./socket";

const app = socket(server);

const PORT = process.env.PORT || 8080;

app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
