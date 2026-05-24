import { URLString } from '@battis/descriptive-types';
import './styles.scss';

export type Properties = {
  content?: string | React.ReactNode;
  href?: URLString;
  selectAll?: boolean;
  tableRow?: boolean;
} & (
  | { label?: string | React.ReactNode; inline?: false }
  | { label?: never; inline: true }
);

export function isDefined(
  content?: string | React.ReactNode
): content is NonNullable<typeof content> {
  return (
    !!content &&
    content !== null &&
    ((typeof content === 'string' && !!content.trim().length) ||
      typeof content === 'object')
  );
}

export function Node({
  label = null,
  content,
  href,
  selectAll = true,
  tableRow = false,
  inline = false
}: Properties) {
  if (isDefined(href)) {
    const url = `${href.match(/[^:/]+@.+/) ? 'mailto:' : ''}${href}`;
    if (isDefined(content)) {
      content = <a href={url}>{content}</a>;
    }
  }
  if (isDefined(content)) {
    const className = `data${selectAll ? ' user-select-all' : ''}`;
    if (inline) {
      return (
        <span className="data-field inline">
          <span className="data">{content}</span>{' '}
        </span>
      );
    } else if (tableRow) {
      return (
        <tr className="data-field align-top">
          <th className="label text-body-secondary" scope="row">
            {label}
          </th>
          <td className={className}>{content}</td>
        </tr>
      );
    } else {
      return (
        <div className="data-field">
          {isDefined(label) ? (
            <span className="label text-body-secondary me-1">{label}</span>
          ) : null}
          <span className={className}>{content}</span>
        </div>
      );
    }
  }
  return null;
}

export default Node;
