// This file is created by egg-ts-helper@1.35.1
// Do not modify this file!!!!!!!!!
/* eslint-disable */

import 'egg';
type AnyClass = new (...args: any[]) => any;
type AnyFunc<T = any> = (...args: any[]) => T;
type CanExportFunc = AnyFunc<Promise<any>> | AnyFunc<IterableIterator<any>>;
type AutoInstanceType<T, U = T extends CanExportFunc ? T : T extends AnyFunc ? ReturnType<T> : T> = U extends AnyClass ? InstanceType<U> : U;
import ExportAdminGroup from '../../../app/service/adminGroup';
import ExportAdminResource from '../../../app/service/adminResource';
import ExportAdminUser from '../../../app/service/adminUser';
import ExportGeneral from '../../../app/service/general';
import ExportSystemConfig from '../../../app/service/systemConfig';

declare module 'egg' {
  interface IService {
    adminGroup: AutoInstanceType<typeof ExportAdminGroup>;
    adminResource: AutoInstanceType<typeof ExportAdminResource>;
    adminUser: AutoInstanceType<typeof ExportAdminUser>;
    general: AutoInstanceType<typeof ExportGeneral>;
    systemConfig: AutoInstanceType<typeof ExportSystemConfig>;
  }
}
