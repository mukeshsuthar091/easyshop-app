import { Address } from './address.entity';
import { AppToken } from './app_token.entity';
import { Business } from './business.entity';
import { User } from './user.entity';

export const db = {
    User,
    Business,
    AppToken,
    Address,
    AllModels: [User, Business, AppToken, Address]
}