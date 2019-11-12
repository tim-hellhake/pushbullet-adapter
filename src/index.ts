/**
 * This Source Code Form is subject to the terms of the Mozilla Public
 * License, v. 2.0. If a copy of the MPL was not distributed with this
 * file, You can obtain one at http://mozilla.org/MPL/2.0/.*
 */

'use strict';

import { PushbulletAdapter } from './pushbullet-adapter';

export = (addonManager: any, manifest: any) => {
  new PushbulletAdapter(addonManager, manifest);

  try {
    const { PushbulletNotifier } = require('./pushbullet-notifier');
    new PushbulletNotifier(addonManager, manifest);
  } catch (e) {
    console.error(e);
  }
}
