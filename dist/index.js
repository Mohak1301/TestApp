"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const dotenv_1 = __importDefault(require("dotenv"));
const db_1 = __importDefault(require("./config/db"));
const authRoute_1 = __importDefault(require("./routes/authRoute"));
const questionRoute_1 = __importDefault(require("./routes/questionRoute"));
const testRoute_1 = __importDefault(require("./routes/testRoute"));
dotenv_1.default.config();
const app = (0, express_1.default)();
(0, db_1.default)();
app.use(express_1.default.json());
app.use('/api/auth', authRoute_1.default);
app.use('/api/questions', questionRoute_1.default);
app.use('/api/test', testRoute_1.default);
app.get('/', (req, res) => {
    res.send('Hello World from ES6 + TypeScript!');
});
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});
