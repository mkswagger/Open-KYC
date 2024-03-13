"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const auth_router_1 = __importDefault(require("./auth/auth.router"));
exports.default = () => {
    const app = (0, express_1.Router)();
    //TODO: add routes here...
    app.use('/auth', (0, auth_router_1.default)());
    return app;
};
//# sourceMappingURL=index.js.map