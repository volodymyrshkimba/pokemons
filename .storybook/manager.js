import { addons } from "@storybook/manager-api";
import { create } from "@storybook/theming";

const theme = create({
  base: "dark",
  brandTitle: "Pokemons Storybook",
  brandUrl: "https://example.com",
  brandImage: "../src/assets/logos/LunaEdgeLogo.svg",
  brandTarget: "_self",
});

addons.setConfig({
  theme,
});
