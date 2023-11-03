import BaseForm from "./BaseForm";

const ConfirmForm = (props) => {
  return <BaseForm {...props}>{props.children}</BaseForm>;
};
export default ConfirmForm;
