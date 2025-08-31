import { Colors } from "@/src/constants/colors";
import { Feather } from "@expo/vector-icons";
import { TextInput, TextInputProps } from "react-native-paper";

interface IProps extends TextInputProps {
  error?: boolean;
}

export const TextField: React.FC<IProps> = ({
  label,
  error,
  value,
  ...rest
}) => {
  const rightIcon = () =>
    error ? (
      <Feather name="x" size={20} color={Colors.red} />
    ) : value ? (
      <Feather name="check" size={20} color={Colors.lightGreen} />
    ) : null;

  return (
    <TextInput
      {...rest}
      value={value}
      label={label}
      style={{ fontSize: 14 }}
      textColor={Colors.dark}
      mode="outlined"
      cursorColor="grey"
      theme={{
        roundness: 12,
        colors: {
          background: Colors.white,
          primary: Colors.primary,
          outline: error ? Colors.red : Colors.primary,
        },
      }}
      right={<TextInput.Icon icon={rightIcon} />}
    />
  );
};
