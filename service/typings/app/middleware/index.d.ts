// This file is created by egg-ts-helper@1.35.1
// Do not modify this file!!!!!!!!!
/* eslint-disable */

import 'egg';
import ExportAuthAdminPower from '../../../app/middleware/authAdminPower';
import ExportAuthAdminToken from '../../../app/middleware/authAdminToken';
import ExportAuthApiToken from '../../../app/middleware/authApiToken';
import ExportAuthPage from '../../../app/middleware/authPage';
import ExportAuthUserToken from '../../../app/middleware/authUserToken';
import ExportCompress from '../../../app/middleware/compress';
import ExportCrossHeader from '../../../app/middleware/crossHeader';
import ExportNotfoundHandler from '../../../app/middleware/notfound_handler';
import ExportStaticHeader from '../../../app/middleware/staticHeader';
import ExportTiaoshi from '../../../app/middleware/tiaoshi';

declare module 'egg' {
  interface IMiddleware {
    authAdminPower: typeof ExportAuthAdminPower;
    authAdminToken: typeof ExportAuthAdminToken;
    authApiToken: typeof ExportAuthApiToken;
    authPage: typeof ExportAuthPage;
    authUserToken: typeof ExportAuthUserToken;
    compress: typeof ExportCompress;
    crossHeader: typeof ExportCrossHeader;
    notfoundHandler: typeof ExportNotfoundHandler;
    staticHeader: typeof ExportStaticHeader;
    tiaoshi: typeof ExportTiaoshi;
  }
}
