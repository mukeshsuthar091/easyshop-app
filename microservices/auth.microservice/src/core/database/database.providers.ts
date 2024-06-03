import { SEQUELIZE, DEVELOPMENT, TEST, PRODUCTION } from '../constants';
import { databaseConfig } from './database.config';
import { AddRelationship } from './database.relations';

export const databaseProviders = [
   {
      provide: SEQUELIZE,
      useFactory: async () => {

         let config: any;

         switch (process.env.NODE_ENV) {

            case DEVELOPMENT:
               config = databaseConfig.development;
               break;

            case TEST:
               config = databaseConfig.test;
               break;

            case PRODUCTION:
               config = databaseConfig.production;
               break;

            default:
               config = databaseConfig.development;
         }

         return AddRelationship(config);
      },
   }
];