import IfDefined from './IfDefined';

export type Properties = {
  label: string;
  address_line_1: string;
  address_line_2: string;
  address_line_3: string;
  city: string;
  state_or_province: string;
  zip: string;
};

export function Node({
  label,
  address_line_1,
  address_line_2,
  address_line_3,
  city,
  state_or_province,
  zip
}: Properties) {
  return (
    <IfDefined
      label={label}
      content={
        <>
          <IfDefined content={address_line_1} />
          <IfDefined content={address_line_2} />
          <IfDefined content={address_line_3} />
          <IfDefined
            content={
              <>
                <IfDefined content={city} inline />
                <IfDefined content={state_or_province} inline />
                <IfDefined content={zip} inline />
              </>
            }
          />
        </>
      }
    />
  );
}

export default Node;
