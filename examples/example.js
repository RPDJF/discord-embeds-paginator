/*
   This bot is an one-file and all-in-one example bot, 
   that shows the main things that you can do with Discord-Embeds-Paginator.

   - This example is made on discord.js v14!
   - The bot is 100% works but it's recommended to remake it!
   - This bot's code can be used in your code in any way without any restrictions!
     That's all. Enjoy!

    Contacts:
    Discord : @deemdev
    Support Server : https://discord.gg/UdKSrxBXyd
 */

// Import necessary modules
const {
  Client,
  GatewayIntentBits,
  Events,
  Routes,
  ButtonStyle,
} = require("discord.js");
const { EmbedBuilder } = require("@discordjs/builders");
const { DiscordEmbedsPaginator } = require("../main");
const { REST } = require("@discordjs/rest");
const { Logger } = require("term-logger");

// Your Discord bot token
const TOKEN = "YOUR_BOT_TOKEN";

// Create a new instance of the Discord Client
const client = new Client({
  intents: [GatewayIntentBits.Guilds],
});

// Slash Commands configuration
const commands = [
  {
    name: "paginator",
    description: "This is an example of how Discord-Embed-Paginator works",
  },
];

// REST API for Slash Commands
const rest = new REST({ version: "10" }).setToken(TOKEN);

// Client Ready Event
client.on(Events.ClientReady, async () => {
  // Refresh Slash Commands
  (async () => {
    try {
      Logger.debug(`Started refreshing [ / ] commands`);

      await rest.put(Routes.applicationCommands("YOUR_CLIENT_ID"), {
        body: commands,
      });

      Logger.info(`Successfully reloaded [ / ] commands`);
    } catch (e) {
      return Logger.error(e);
    }
  })();

  Logger.ready(`Logged in as ${client.user.username}`);
});

// Embeds for the paginator
const embeds = [
  new EmbedBuilder()
    .setTitle("Page 1")
    .setDescription("This is the **first** embed"),
  new EmbedBuilder()
    .setTitle("Page 2")
    .setDescription("This is the **second** embed"),
  new EmbedBuilder()
    .setTitle("Page 3")
    .setDescription("This is the **third** embed"),
  new EmbedBuilder()
    .setTitle("Page 4")
    .setDescription("This is the **fourth** embed"),
];

// Interaction Create Event
client.on(Events.InteractionCreate, async (i) => {
  if (!i.isChatInputCommand()) return;

  if (i.commandName === "paginator") {
    // Create a DiscordEmbedsPaginator instance
    const paginator = new DiscordEmbedsPaginator([], {
      // This sets the custom ID for the paginator buttons. REQUIRED: False
      customId: "pages_paginator",
      // This sets the style of the paginator buttons. REQUIRED: False
      customStyle: ButtonStyle.Success,
      // This specifies the custom emojis to use for the previous and next buttons. REQUIRED: False
      customEmojis: {
        previous: "👈🏻",
        next: "👉🏻",
      },
      // This is an array of EmbedBuilder instances representing the pages of the paginator. REQUIRED: True
      customEmbeds: embeds,
      // This sets the timeout duration for the paginator in milliseconds. REQUIRED: False
      timeout: 60000,
    });

    // Create the paginator message
    paginator.createPaginatorMessage(i.channel);

    // Send a reply to the interaction
    await i.reply({
      content: `:white_check_mark: Page paginator was been sent to the channel ${i.channel}`,
      ephemeral: true,
    });
  }
});

// Login the client with your bot token
client.login(TOKEN);
