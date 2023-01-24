import PrimaryButton from "components/Button/Button";
import * as React from "react";
import { ButtonProps } from "react-html-props";
import { twMerge } from "tailwind-merge";

interface IRadioButtonProps extends ButtonProps {
  options: any;
  selected: any;
  setSelected: any;
}

const RadioButton: React.FunctionComponent<IRadioButtonProps> = (props) => {
  const { options, selected, setSelected } = props;

  const renderOptions = options.map((option: any, index: any) => {
    return (
      <PrimaryButton
        className={
          selected == option
            ? "rounded-3xl"
            : "rounded-3xl bg-foreground-primary text-black border-1 border-black"
        }
        onClick={() => {
          setSelected(option);
        }}
      >
        {option}
      </PrimaryButton>
    );
  });

  return <div className="flex gap-3">{renderOptions}</div>;
};

export default RadioButton;
