import { ReactNode } from "react";
import {
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "../../ui/form";

type Props = {
  control: any;
  name: string;
  label?: string;
  description?: string;
  render: (props: {
    field: any;
  }) => ReactNode;
};

const FieldWrapper = (props: Props) => {
  return (
    <FormField
      control={props.control}
      name={props.name}
      render={({ field }) => (
        <FormItem>
          <FormLabel>{props.label}</FormLabel>
          <FormControl>{props.render({field})}</FormControl>
          {props.description && (
            <FormDescription>{props.description}</FormDescription>
          )}
          <FormMessage />
        </FormItem>
      )}
    />
  );
};

export default FieldWrapper;
