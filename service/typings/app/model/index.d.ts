// This file is created by egg-ts-helper@1.35.1
// Do not modify this file!!!!!!!!!
/* eslint-disable */

import 'egg';
import ExportAdminGroup from '../../../app/model/adminGroup';
import ExportAdminResource from '../../../app/model/adminResource';
import ExportAdminUser from '../../../app/model/adminUser';
import ExportSystemConfig from '../../../app/model/systemConfig';

declare module 'egg' {
  interface IModel {
    AdminGroup: ReturnType<typeof ExportAdminGroup>;
    AdminResource: ReturnType<typeof ExportAdminResource>;
    AdminUser: ReturnType<typeof ExportAdminUser>;
    SystemConfig: ReturnType<typeof ExportSystemConfig>;
  }
}
