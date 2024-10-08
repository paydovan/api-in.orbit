"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.createCompletionRoute = void 0;
const zod_1 = require("zod");
const create_goal_completion_1 = require("../../functions/create-goal-completion");
const createCompletionRoute = async (app) => {
    app.post('/completions', {
        schema: {
            body: zod_1.z.object({
                goalId: zod_1.z.string(),
            }),
        },
    }, async (request) => {
        const { goalId } = request.body;
        await (0, create_goal_completion_1.createGoalCompletion)({
            goalId,
        });
    });
};
exports.createCompletionRoute = createCompletionRoute;
