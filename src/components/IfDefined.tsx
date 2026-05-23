import { URLString } from '@battis/descriptive-types';

type Properties = {
  content?: string | React.ReactNode;
  href?: URLString;
} & (
  | { label?: string | React.ReactNode; inline?: false }
  | { label?: never; inline: true }
);

function isDefined(content?: string | React.ReactNode) {
  return (
    content &&
    ((typeof content === 'string' && content.length) ||
      (typeof content === 'object' && content !== null))
  );
}

export function Node({
  label = null,
  content,
  href,
  inline = false
}: Properties) {
  let result: React.ReactNode | null = null;
  if (href && href.length) {
    const url = `${href.match(/[^:/]+@.+/) ? 'mailto:' : ''}${href}`;
    if (isDefined(content)) {
      result = <a href={url}>{content}</a>;
    } else {
      result = <a href={url}>{href}</a>;
    }
  }
  if (isDefined(content)) {
    result = content;
  }
  if (result) {
    if (inline) {
      return <>{result} </>;
    } else {
      return (
        <div>
          {isDefined(label) ? <label className="me-1">{label}</label> : null}
          {result}
        </div>
      );
    }
  }
  return null;
}

export default Node;
