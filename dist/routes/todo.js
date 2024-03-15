"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const todoModal_1 = __importDefault(require("../modal/todoModal"));
const ErrorHandler_1 = require("../middleware/ErrorHandler");
const router = (0, express_1.Router)();
////get All Todos //////
router.get('/', (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    let AllTodos;
    try {
        AllTodos = yield todoModal_1.default.find({});
    }
    catch (error) {
        return next((0, ErrorHandler_1.ErrorHandler)('Cannot Get the TODOS', "Error", 404));
    }
    res.status(200).json({
        Name: "SUCCESS",
        Todos: AllTodos
    });
}));
//// Post a new Todo //////
router.post('/post', (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    console.log((req.body), 'name');
    const { title, release_date, image } = req.body;
    const getTodo = yield todoModal_1.default.findOne({ title: title });
    if (getTodo) {
        res.status(404).json({ NAME: "Title Already Exists" });
        return next((0, ErrorHandler_1.ErrorHandler)("Title Already Exists", "Error", 404));
    }
    if (title === '' || release_date === '' || image === '') {
        res.status(404).json({ NAME: "Something is not Enter Properly" });
        return next((0, ErrorHandler_1.ErrorHandler)("Something is not Enter Properly", "Error", 404));
    }
    try {
        const NEWTODO = new todoModal_1.default({
            title: title,
            release_date: release_date,
            image: image
        });
        yield NEWTODO.save();
        res.status(200).json({ NAME: "SUCCESS", NEWTODO });
    }
    catch (error) {
        return next((0, ErrorHandler_1.ErrorHandler)(error.message, "Error", 404));
    }
}));
/// Delete a Todo //////      
router.delete('/:id', (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    const getTodo = yield todoModal_1.default.findById(req.params.id);
    if (!getTodo) {
        return res.status(409).json({
            Message: "Fail to Delete",
        });
    }
    try {
        yield todoModal_1.default.deleteOne({ _id: req.params.id });
    }
    catch (error) {
        res.status(409).json({
            Message: "Fail to Delete",
        });
        return next((0, ErrorHandler_1.ErrorHandler)("Fail to Delete , Please try Again", "error", 409));
    }
    res.status(202).json({
        Message: "Delete Success",
    });
}));
/// Edit a Todo //////          
router.patch('/:id', (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    let EditTodo;
    try {
        EditTodo = yield todoModal_1.default.findByIdAndUpdate(req.params.id, {
            title: req.body.title,
            release_date: req.body.release_date,
            image: req.body.image,
        });
    }
    catch (error) {
        return next((0, ErrorHandler_1.ErrorHandler)("Fail To Update", "error", 202));
    }
    res.status(202).json({
        Message: "Update Success",
    });
}));
exports.default = router;
