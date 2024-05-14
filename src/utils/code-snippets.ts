export const structuredTextExample = `
import { isHeading, isParagraph } from 'datocms-structured-text-utils';
import { StructuredText, renderNodeRule } from 'react-datocms';

<StructuredText
  customNodeRules={[
    renderNodeRule(isHeading, ({ node, children, key }: any) => {
      const HeadingTag: h{node.level};
      return (
        <HeadingTag style={{ color: node.style }} key={key}>
          {children}
        </HeadingTag>
      );
    }),
    renderNodeRule(isParagraph, ({ node, children, key }: any) => {
      return (
        <p style={{ color: node.style }} key={key}>
          {children}
        </p>
      );
    }),
  ]}
/>
`

export const noteForASF = `
Note: The custom mark rules are consumed directly using page config on the ASF backend,
see PageContent.tsx#46 && PageContent.tsx#97
`


export const howToExplanation = `
To consume these colours, custom node and mark rules need to be set.

Below is an example of how to apply the node and mark rules in
StructuredText components using the React SDK, there are similar
examples in Vue & Svelte.


`
