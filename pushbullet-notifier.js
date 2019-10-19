/**
 * This Source Code Form is subject to the terms of the Mozilla Public
 * License, v. 2.0. If a copy of the MPL was not distributed with this
 * file, You can obtain one at http://mozilla.org/MPL/2.0/.*
 */

'use strict';

const PushBullet = require('pushbullet');

const {
  Notifier,
  Outlet,
} = require('gateway-addon');

class PushbulletOutlet extends Outlet {
  constructor(notifier, config) {
    super(notifier, PushbulletOutlet.name);
    this.name = 'Pushbullet';
    this.config = config;
    this.pusher = new PushBullet(config.accessToken);
  }

  async notify(title, message) {
    await this.pusher.note({}, title, message);
  }
}

class PushbulletNotifier extends Notifier {
  constructor(addonManager, manifest) {
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

module.exports = PushbulletNotifier;
