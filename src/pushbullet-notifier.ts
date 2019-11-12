/**
 * This Source Code Form is subject to the terms of the Mozilla Public
 * License, v. 2.0. If a copy of the MPL was not distributed with this
 * file, You can obtain one at http://mozilla.org/MPL/2.0/.*
 */

'use strict';

import { Notifier, Outlet } from "gateway-addon";

const PushBullet = require('pushbullet');

class PushbulletOutlet extends Outlet {
  private pusher: any;

  constructor(notifier: Notifier, config: any) {
    super(notifier, PushbulletOutlet.name);
    this.name = 'Pushbullet';
    this.pusher = new PushBullet(config.accessToken);
  }

  async notify(title: string, message: string) {
    await this.pusher.note({}, title, message);
  }
}

export class PushbulletNotifier extends Notifier {
  outlets: any;
  constructor(addonManager: any, manifest: any) {
    super(addonManager, PushbulletNotifier.name, manifest.name);

    addonManager.addNotifier(this);

    if (!this.outlets[PushbulletNotifier.name]) {
      this.handleOutletAdded(
        // eslint-disable-next-line max-len
        new PushbulletOutlet(this, manifest.moziot.config)
      );
    }
  }
}
