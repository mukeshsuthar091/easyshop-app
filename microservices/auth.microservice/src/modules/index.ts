import { User } from "./user.entity";
import { AppToken } from "./app_token.entity";
import { RewardPoint } from "./reward_point.entity";
import { Follow } from "./follow.entity";
import { Business } from "./business.entity";

const model: any = {
    User,
    Business,
    AppToken,
    Follow,
    RewardPoint
}

model.AllModels = Object.values(model);

export const db = model;