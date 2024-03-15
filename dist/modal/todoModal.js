"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = __importDefault(require("mongoose"));
const Add = new mongoose_1.default.Schema({
    title: { type: "string", required: true },
    image: { type: "string", required: true },
    release_date: { type: "string", required: true },
});
const todoModal = mongoose_1.default.model("Todos", Add);
exports.default = todoModal;
