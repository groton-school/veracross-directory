import * as Veracross from '@/src/lib/Veracross';
import { Preview } from './Preview';

export async function Detail({
  person,
  ...params
}: {
  person: Veracross.Directory.FacStaff;
} & Parameters<typeof Preview>[0]) {
  return <Preview person={person} {...params} />;
}
