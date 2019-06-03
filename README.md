# Pushbullet Adapter

[![Build Status](https://travis-ci.org/tim-hellhake/pushbullet-adapter.svg?branch=master)](https://travis-ci.org/tim-hellhake/pushbullet-adapter)
[![dependencies](https://david-dm.org/tim-hellhake/pushbullet-adapter.svg)](https://david-dm.org/tim-hellhake/pushbullet-adapter)
[![devDependencies](https://david-dm.org/tim-hellhake/pushbullet-adapter/dev-status.svg)](https://david-dm.org/tim-hellhake/pushbullet-adapter?type=dev)
[![optionalDependencies](https://david-dm.org/tim-hellhake/pushbullet-adapter/optional-status.svg)](https://david-dm.org/tim-hellhake/pushbullet-adapter?type=optional)
[![license](https://img.shields.io/badge/license-MPL--2.0-blue.svg)](LICENSE)

Send notifications to your devices.

## Configuration
1. Go to https://www.pushbullet.com/#settings/account
2. Click `Create Access Token`
3. Add access token to config

## Usage
The addon registers every Pushbullet device with a `push(title, body)` action.

Currently, a rule can only trigger parameterless actions.

To send Pushbullet messages from a rule, you have to register an action with a predefined message.

Go to the settings of the addon and add an action with a name, a title and a body of your choice.

The Pushbullet devices now provide a new action with the specified name you can use in a rule.
