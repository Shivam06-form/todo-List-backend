"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const body_parser_1 = __importDefault(require("body-parser"));
const todo_1 = __importDefault(require("./routes/todo"));
const mongoose_1 = __importDefault(require("mongoose"));
const dotenv_1 = __importDefault(require("dotenv"));
dotenv_1.default.config();
const app = (0, express_1.default)();
app.use(body_parser_1.default.json());
// app.use(bodyParser.urlencoded({ extended: false }))
app.use((req, res, next) => {
    res.setHeader("Access-Control-Allow-Origin", "*");
    res.setHeader("Access-Control-Allow-Headers", "Origin, X-Requested-With , Content-Type ,Accept ,Authoriztion");
    res.setHeader("Access-Control-Allow-Methods", "GET, POST, PATCH ,DELETE");
    next();
});
app.use('/api/todos', todo_1.default);
const DB = process.env.DB;
const PORT = process.env.PORT || 4000;
mongoose_1.default
    .connect(DB).then(() => app.listen(PORT, () => {
    console.log(`App running on Port ${PORT}...`);
}))
    .catch((error) => console.log(error));
