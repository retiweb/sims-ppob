import { ReactNode } from "react";
import { UseFormReturn } from "react-hook-form";
import { Form } from "../../ui/form";

type Props = {
  form: UseFormReturn<any>;
  onSubmit: (values: any) => void;
  children: ReactNode;
  className: string;
};

const FormWrapper = (props: Props) => {
  return (
    <Form {...props.form}>
      <form
        onSubmit={props.form.handleSubmit(props.onSubmit)}
        className={props.className}
      >
        {props.children}
      </form>
    </Form>
  );
};

export default FormWrapper;