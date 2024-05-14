import {
  connect,
  Field,
  FieldIntentCtx,
  StructuredTextCustomBlockStyle,
} from "datocms-plugin-sdk";
import { BlockNodeTypeWithCustomStyle } from "datocms-structured-text-utils";
import "datocms-react-ui/styles.css";
import ConfigScreen from "./entrypoints/ConfigScreen";
import { render } from "./utils/render";
import { GetColorName } from "hex-color-to-color-name";

connect({
  renderConfigScreen(ctx) {
    return render(<ConfigScreen ctx={ctx} />);
  },

  customMarksForStructuredTextField(field: Field, ctx: FieldIntentCtx) {
    return [
      {
        id: "colour-emphasis",
        label: "Text Colour",
        icon: "paint-brush",
        keyboardShortcut: "mod+shift+p",
        appliedStyle: {
          backgroundColor: "rgba(255, 0, 0, 0.3)",
        },
      },
    ];
  },

  customBlockStylesForStructuredTextField(field: Field, ctx: FieldIntentCtx) {
    const coloursReference = ctx.plugin.attributes.parameters.colours as string;
    const coloursArray = coloursReference.split(",");
    const renderColourOptions: StructuredTextCustomBlockStyle[] = [];
    const textNodesToCustomise: BlockNodeTypeWithCustomStyle[] = [
      "heading",
      "paragraph",
    ];

    //* Break and return if there are no colours in ctx params
    if (!coloursReference) {
      return [];
    }

    textNodesToCustomise.forEach((node: BlockNodeTypeWithCustomStyle) => {
      coloursArray.forEach((colour: string) => {
        const colourTrimmed = colour.trim();
        renderColourOptions.push({
          id: colourTrimmed,
          node: node,
          label: GetColorName(colourTrimmed),
          appliedStyle: {
            color: colourTrimmed,
          },
        });
      });
    });

    return renderColourOptions;
  },
});
