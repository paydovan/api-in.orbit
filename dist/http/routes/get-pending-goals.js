"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.getPendindGoalsRoute = void 0;
const get_week_pending_goals_1 = require("../../functions/get-week-pending-goals");
const getPendindGoalsRoute = async (app) => {
    app.get('/pending-goals', async () => {
        const { pedingGoals } = await (0, get_week_pending_goals_1.getWeekPendingGoals)();
        return { pedingGoals };
    });
};
exports.getPendindGoalsRoute = getPendindGoalsRoute;
