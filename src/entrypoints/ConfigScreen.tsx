import type { RenderConfigScreenCtx } from "datocms-plugin-sdk";
import { Button, Canvas, ContextInspector, TextField } from "datocms-react-ui";
import s from "./styles.module.css";
import { useState } from "react";
import { Spinner } from "datocms-react-ui";
import { rgb, parseToRgb } from "polished";

type Props = {
  ctx: RenderConfigScreenCtx;
};

export default function ConfigScreen({ ctx }: Props) {
  const parameters = ctx.plugin.attributes.parameters.colours as string;
  const [colours, setColours] = useState(parameters);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | undefined>(undefined);

  const updateColours = async () => {
    setIsLoading(true);
    setError("");

    //* Ensure hex codes are valid.
    try {
      if (colours) {
        colours.split(",").map((color) => rgb(parseToRgb(color.trim())));
        await ctx
          .updatePluginParameters({ colours: colours })
          .then(() => {
            ctx.notice("Colours updated successfully.");
            setIsLoading(false);
          })
          .catch(() => {
            ctx.alert("Error updating colours, please try again.");
            setIsLoading(false);
          });
      }
    } catch (e) {
      setError(
        "Invalid color string. Make sure to pass a comma seperated list of valid hex colors"
      );
      setIsLoading(false);
    }
  };

  return (
    <Canvas ctx={ctx}>
      <TextField
        name="colours"
        id="colours"
        error={error}
        label="Custom colours"
        hint="List colours that you would like to customise in Structured Text. Delimit colors with a comma."
        placeholder="#FF0000, #00FF00, #0000FF"
        value={colours}
        onChange={(changeValue) => {
          setColours(changeValue);
        }}
      />
      <Button
        style={{ marginTop: "16px" }}
        fullWidth
        type="submit"
        buttonType="primary"
        rightIcon={isLoading ? <Spinner size={20} /> : ""}
        onClick={async () => {
          await updateColours();
        }}>
        Save colours
      </Button>

      <div className={s.inspector}>
        <ContextInspector />
      </div>
    </Canvas>
  );
}
