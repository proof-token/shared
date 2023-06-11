"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const dynamoose_1 = __importDefault(require("dynamoose"));
const ddb = new dynamoose_1.default.aws.ddb.DynamoDB({
    credentials: {
        accessKeyId: process.env.DYNAMO_DB_ACCESS_KEY_ID,
        secretAccessKey: process.env.DYNAMO_DB_SECRET_ACCESS_KEY
    },
    region: process.env.DYNAMO_DB_REGION
});
dynamoose_1.default.aws.ddb.set(ddb);
class RootRepository {
    constructor(model) {
        this.db = model;
    }
}
exports.default = RootRepository;
