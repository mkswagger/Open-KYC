"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.otpSchema = exports.validateRequest = void 0;
const zod_1 = require("zod");
function validateRequest(location, schema) {
    return async (req, res, next) => {
        try {
            const validatedSchema = await schema.parseAsync(req[location]);
            req[location] = validatedSchema;
            next();
        }
        catch (error) {
            return res.status(400).json({ error: error.errors });
        }
    };
}
exports.validateRequest = validateRequest;
exports.otpSchema = zod_1.z.object({
    device: zod_1.z.string().email().or(zod_1.z.string().regex(/^[0-9]{10}$/)) // Email or Phone,
});
//# sourceMappingURL=validator.js.map