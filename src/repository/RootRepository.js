"use strict";
exports.__esModule = true;
var dynamoose_1 = require("dynamoose");
var ddb = new dynamoose_1["default"].aws.ddb.DynamoDB({
    credentials: {
        accessKeyId: process.env.DYNAMO_DB_ACCESS_KEY_ID,
        secretAccessKey: process.env.DYNAMO_DB_SECRET_ACCESS_KEY
    },
    region: process.env.DYNAMO_DB_REGION
});
dynamoose_1["default"].aws.ddb.set(ddb);
var RootRepository = /** @class */ (function () {
    function RootRepository(model) {
        this.db = model;
    }
    return RootRepository;
}());
exports["default"] = RootRepository;
