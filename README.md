![banner](./images/Banner.png)
# Discord Embeds Paginator

Discord Embeds Paginator is a customizable pagination module for Discord bots using **Discord.js**. It allows you to display embed pages and navigate through them using buttons.

![version](https://img.shields.io/npm/v/discord-embeds-paginator)
![collaborators](https://img.shields.io/npm/collaborators/discord-embeds-paginator)
![downloads](https://img.shields.io/npm/dw/discord-embeds-paginator)
![licence](https://img.shields.io/npm/l/discord-embeds-paginator)

## Installation

To install Discord Embeds Paginator, use npm:

```bash
npm install discord-embeds-paginator@latest
```

## Usage

```js
const { DiscordEmbedsPaginator } = require("discord-embeds-paginator");

// Create an instance of DiscordEmbedsPaginator
const paginator = new DiscordEmbedsPaginator([], {
  customId: "DiscordEmbedsPaginator",
  customStyle: ButtonStyle.Secondary,
  customEmojis: { previous: "◀️", next: "▶️" },
  customEmbeds: [],
  timeout: 60000,
});

// Create the paginator message
paginator.createPaginatorMessage(channel);
```

## Sponsor Us

Do you use **Discord-Embeds-Paginator** and are you satisfied?
You can support us with a one-time donation to help us improve our work: [Donate here](https://github.com/sponsors/devdeem)

## API Documentation

### Class: DiscordEmbedsPaginator

A class representing a Discord Embeds Paginator.

#### Constructor

```javascript
new DiscordEmbedsPaginator(pages, (options = {}));
```

Creates a new instance of DiscordEmbedsPaginator.

## Methods

- **createPaginatorMessage(channel)**: Creates the paginator message in the specified channel.
- **createPageButtons()**: Creates the navigation buttons for the paginator.
- **createButtonCollector(message)**: Sets up the button collector to handle button interactions.
- **getPageEmbed()**: Retrieves the current page embed.

## Options

- **customId**: The custom ID for the paginator.
- **customStyle**: The custom button style for the paginator.
- **customEmojis**: An object containing custom emojis for the previous and next buttons.
- **customEmbeds**: An array of embeds representing the pages.
- **timeout**: The timeout for the paginator in milliseconds.

## Do you have any issues?

If you have any issues don't hesitate to report it via [GitHub Issues](https://github.com/devdeem/discord-embeds-paginator/issues).

## Support

If you need help or assistance please either ask in my [Discord Server](https://support.roblybot.xyz).

## License

This project is licensed under the [MIT License](https://github.com/devdeem/discord-embeds-paginator/blob/main/LICENSE).

> Developed by @deemdev with ❤️
