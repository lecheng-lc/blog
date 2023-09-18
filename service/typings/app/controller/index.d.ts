// This file is created by egg-ts-helper@1.35.1
// Do not modify this file!!!!!!!!!
/* eslint-disable */

import 'egg';
import ExportHome from '../../../app/controller/home';
import ExportApiAdmin from '../../../app/controller/api/admin';
import ExportApiSystemConfig from '../../../app/controller/api/systemConfig';
import ExportManageAdminGroup from '../../../app/controller/manage/adminGroup';
import ExportManageAdminResource from '../../../app/controller/manage/adminResource';
import ExportManageAdminUser from '../../../app/controller/manage/adminUser';
import ExportManageSystemConfig from '../../../app/controller/manage/systemConfig';
import ExportPageHome from '../../../app/controller/page/home';
import ExportPageUser = require('../../../app/controller/page/user');

declare module 'egg' {
  interface IController {
    home: ExportHome;
    api: {
      admin: ExportApiAdmin;
      systemConfig: ExportApiSystemConfig;
    }
    manage: {
      adminGroup: ExportManageAdminGroup;
      adminResource: ExportManageAdminResource;
      adminUser: ExportManageAdminUser;
      systemConfig: ExportManageSystemConfig;
    }
    page: {
      home: ExportPageHome;
      user: ExportPageUser;
    }
  }
}
