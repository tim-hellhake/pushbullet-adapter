/**
 * This Source Code Form is subject to the terms of the Mozilla Public
 * License, v. 2.0. If a copy of the MPL was not distributed with this
 * file, You can obtain one at http://mozilla.org/MPL/2.0/.*
 */

'use strict';

const PushBullet = require('pushbullet');

const {
  Adapter,
  Device,
} = require('gateway-addon');

class PushbulletDevice extends Device {
  constructor(adapter, manifest, device) {
    super(adapter, device.iden);
    this['@context'] = 'https://iot.mozilla.org/schemas/';
    this.name = device.nickname;
    this.description = device.nickname;
    this.callbacks = {};
    const pusher = new PushBullet(manifest.moziot.config.accessToken);

    this.addCallbackAction({
      title: 'push',
      description: 'Push a notification',
      input: {
        type: 'object',
        properties: {
          title: {
            type: 'string'
          },
          body: {
            type: 'string'
          }
        }
      }
    }, async (action) => {
      await pusher.note({}, action.input.title, action.input.body);
    });

    if (manifest.moziot.config.messages) {
      for (const message of manifest.moziot.config.messages) {
        console.log(`Creating action for ${message.name}`);

        this.addCallbackAction({
          title: message.name,
          description: 'Push a notification'
        }, async () => {
          await pusher.note({}, message.title, message.body);
        });
      }
    }
  }

  addCallbackAction(description, callback) {
    this.addAction(description.title, description);
    this.callbacks[description.title] = callback;
  }

  async performAction(action) {
    action.start();

    const callback = this.callbacks[action.name];

    if (callback) {
      await callback(action);
    } else {
      console.warn(`Unknown action ${action.name}`);
    }

    action.finish();
  }
}

class PushbulletAdapter extends Adapter {
  constructor(addonManager, manifest) {
    super(addonManager, PushbulletAdapter.name, manifest.name);
    addonManager.addAdapter(this);
    this.discover(manifest);
  }

  async discover(manifest) {
    const pusher = new PushBullet(manifest.moziot.config.accessToken);
    const result = await pusher.devices();

    for (const deviceInfo of result.devices) {
      const device = new PushbulletDevice(this, manifest, deviceInfo);
      this.handleDeviceAdded(device);
      console.log(`Discovered ${deviceInfo.nickname}`);
    }
  }
}

module.exports = PushbulletAdapter;
