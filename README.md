# Visa Slots Notification Telegram Bot

This bot collects data using the popular "Check US Visa Slots" chrome extension's api and notify's the same on Telegram.

## Setup

1. create a `.evn` file and add the following variables:
   - BOT_TOKEN
   - MESSAGE_ID
   - EXTENSION_ACCESS_CODE
   - NOTIFY_INTERVAL_IN_MIN
2. run `npm start`

## Pointers

- The node server must continue to run in order for the visa updates to continue to flow.

- Also, keep an eye out that there are enough "Remaining Sessions" for the given EXTENSION_ACCESS_CODE of the "Check US Visa Slots" extension.
