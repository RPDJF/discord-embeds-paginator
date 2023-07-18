const { ActionRowBuilder, ButtonBuilder, ButtonStyle } = require("discord.js");
let colors = require("colors");

class DiscordEmbedsPaginator {
  constructor(pages, options = {}) {
    this.currentPage = 0;

    this.options = Object.assign(
      {
        customId: "DiscordEmbedsPaginator",
        customStyle: ButtonStyle.Secondary,
        customEmojis: { previous: "◀️", next: "▶️" },
        customEmbeds: [],
        timeout: 60000,
      },
      options
    );
  }

  async createPaginatorMessage(channel) {
    const pageEmbed = this.getPageEmbed();

    if (!pageEmbed) {
      return console.log(
        `${`[Discord Embeds Paginator]`.cyan} ${`Error:`.red} ${
          `No embeds available. Please provide at least one embed`.white
        }`
      );
    }

    const message = await channel.send({
      embeds: [pageEmbed],
      components: [this.createPageButtons()],
    });

    this.createButtonCollector(message);
  }

  createPageButtons() {
    if (
      this.options.customEmojis?.next &&
      this.options.customEmojis?.previous
    ) {
      const buttonRow = new ActionRowBuilder();

      const prevButton = new ButtonBuilder()
        .setCustomId(`${this.options.customId}-prev`)
        .setEmoji(this.options.customEmojis.previous)
        .setStyle(this.options.customStyle)
        .setDisabled(this.currentPage == 0);

      const nextButton = new ButtonBuilder()
        .setCustomId(`${this.options.customId}-next`)
        .setEmoji(this.options.customEmojis.next)
        .setStyle(this.options.customStyle)
        .setDisabled(this.currentPage === this.options.customEmbeds.length - 1);

      buttonRow.addComponents(prevButton, nextButton);
      return buttonRow;
    } else {
      const buttonRow = new ActionRowBuilder();

      const prevButton = new ButtonBuilder()
        .setCustomId(`${this.options.customId}-prev`)
        .setEmoji(this.options.customEmojis.previous)
        .setStyle(this.options.customStyle)
        .setDisabled(this.currentPage == 0);

      const nextButton = new ButtonBuilder()
        .setCustomId(`${this.options.customId}-next`)
        .setEmoji(this.options.customEmojis.next)
        .setStyle(this.options.customStyle)
        .setDisabled(this.currentPage === this.options.customEmbeds.length - 1);

      buttonRow.addComponents(prevButton, nextButton);
      return buttonRow;
    }
  }

  createButtonCollector(message) {
    const filter = (inter) => {
      if (!inter.isButton()) return false;
      if (inter.customId.startsWith(`${this.options.customId}-`)) return true;

      return false;
    };

    const collector = message.createMessageComponentCollector({
      filter,
      time: this.options.timeout,
    });

    collector.on("collect", async (interaction) => {
      await interaction.deferUpdate();

      const buttonId = interaction.customId.split("-")[1];

      if (buttonId === "next") {
        this.currentPage++;
      } else if (buttonId === "prev") {
        this.currentPage--;
      }

      const pageEmbed = this.getPageEmbed();
      const buttonRow = this.createPageButtons();

      await interaction.message.edit({
        embeds: [pageEmbed],
        components: [buttonRow],
      });
    });

    collector.on("end", () => {
      message.edit({ components: [] });
    });
  }

  getPageEmbed() {
    if (this.options.customEmbeds.length > 0) {
      return this.options.customEmbeds[this.currentPage];
    }

    return null;
  }
}

module.exports.DiscordEmbedsPaginator = DiscordEmbedsPaginator;
