"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
// vendor dependencies
const core_1 = require("@ngx-translate/core");
// app
const shared_1 = require("../shared");
const common_1 = require("../common");
classifiedModuleName %  > Routes;
from;
'./dashboard.routes';
classifiedModuleName %  > Component;
from;
'./dashboard/dashboard.component';
exports.SHARED_MODULES = [
    shared_1.SharedModule,
    common_1.RouterModule.forChild(, classifiedModuleName %  > Routes),
    core_1.TranslateModule.forChild(),
];
exports.COMPONENT_DECLARATIONS = [
    , classifiedModuleName %  > Component
];
//# sourceMappingURL=__name__.common.js.map