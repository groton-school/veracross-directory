import * as IfDefined from './Base';

export type Properties = {
  label: string;
  address_line_1: string;
  address_line_2: string;
  address_line_3: string;
  city: string;
  state_or_province: string;
  zip: string;
} & IfDefined.Properties;

export function Node({
  address_line_1,
  address_line_2,
  address_line_3,
  city,
  state_or_province,
  zip,
  ...props
}: Properties) {
  return (
    <IfDefined.Node
      {...props}
      content={
        IfDefined.isDefined(address_line_1) ||
        IfDefined.isDefined(address_line_2) ||
        IfDefined.isDefined(address_line_3) ||
        IfDefined.isDefined(city) ||
        IfDefined.isDefined(state_or_province) ||
        IfDefined.isDefined(zip) ? (
          <>
            <IfDefined.Node content={address_line_1} selectAll={false} />
            <IfDefined.Node content={address_line_2} selectAll={false} />
            <IfDefined.Node content={address_line_3} selectAll={false} />
            <IfDefined.Node
              selectAll={false}
              content={
                <>
                  <IfDefined.Node content={city} inline selectAll={false} />
                  {city &&
                  state_or_province &&
                  city.trim().length &&
                  state_or_province.trim().length
                    ? ', '
                    : ''}
                  <IfDefined.Node
                    content={state_or_province}
                    inline
                    selectAll={false}
                  />
                  <IfDefined.Node content={zip} inline selectAll={false} />
                </>
              }
            />
          </>
        ) : null
      }
    />
  );
}

export default Node;
