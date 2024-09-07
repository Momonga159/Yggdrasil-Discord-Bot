
# Yggdrasil-Bot: Discord Bot for Yggdrasil MMORPG Community Server

Welcome to the **Yggdrasil-Bot** repository! This bot is designed to automate various tasks and enhance the experience within the Yggdrasil MMORPG community Discord server.

## Table of Contents

- [Commands Overview](#commands-overview)
  - [Giveaway Commands](#giveaway-commands)
  - [Moderation Commands](#moderation-commands)
  - [Community Commands](#community-commands)

## Commands Overview

### Giveaway Commands

These commands manage giveaways, including starting, ending, pausing, unpausing, and rerolling winners:

- **`/start-giveaway`**  
  Start a new giveaway with duration, prize, and winner count.  
  [Source: `start-giveaway.js`](./start-giveaway.js)

- **`/end-giveaway`**  
  Manually end an ongoing giveaway.  
  [Source: `end-giveaway.js`](./end-giveaway.js)

- **`/pause-giveaway`**  
  Pause an ongoing giveaway.  
  [Source: `pause-giveaway.js`](./pause-giveaway.js)

- **`/unpause-giveaway`**  
  Unpause a paused giveaway.  
  [Source: `unpause-giveaway.js`](./unpause-giveaway.js)

- **`/reroll-giveaway`**  
  Reroll a giveaway to choose a new winner.  
  [Source: `reroll-giveaway.js`](./reroll-giveaway.js)

- **`/drop-giveaway`**  
  Start a drop-style giveaway, where the first to react wins.  
  [Source: `drop-giveaway.js`](./drop-giveaway.js)

### Moderation Commands

Manage your server's members with these moderation tools:

- **`/ban`**  
  Ban a user from the server.  
  [Source: `ban.js`](./ban.js)

- **`/kick`**  
  Kick a user from the server.  
  [Source: `kick.js`](./kick.js)

- **`/unban-request`**  
  Set up or manage unban requests.  
  [Source: `unban-request.js`](./unban-request.js)

### Community Commands

Commands to enhance community interaction and provide users with useful information:

- **`/recruitment`**  
  Set up recruitment messages to allow users to apply for specific roles.  
  [Source: `recruitment.js`](./recruitment.js)

- **`/ticket`**  
  Manage the ticket system, allowing users to create support tickets.  
  [Source: `ticket.js`](./ticket.js)

- **`/suggestion`**  
  Set up a suggestion system for users to provide feedback or ideas.  
  [Source: `suggestion.js`](./suggestion.js)

- **`/help`**  
  Display a help menu with links to key channels, such as recruitment, unban requests, and tickets.  
  [Source: `help.js`](./help.js)

- **`/rules`**  
  Display server rules in an embedded message.  
  [Source: `rules.js`](./rules.js)

- **`/findus`**  
  List all relevant links, including the official website, wiki, social media, and more.  
  [Source: `findus.js`](./findus.js)

### Changelog

Track bot updates and version information:

- **`/changelog`**  
  Set up a changelog system to inform users of bot or server updates.  
  [Source: `changelog.js`](./changelog.js)