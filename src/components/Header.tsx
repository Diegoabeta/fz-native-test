import { Text, TextProps } from "react-native";

interface IProps extends TextProps {
  text: string;
}

export const Header: React.FC<IProps> = ({ text, ...rest }) => {
  return (
    <Text
      {...rest}
      className="text-dark text-left font-black text-4xl w-10/12 mb-3 pt-6"
    >
      {text}
    </Text>
  );
};
