import { Colors } from "@/constants/Colors";
import { globalStyles } from "@/styles/globalStyles";
import { Text, Pressable } from "react-native";
import * as Haptics from "expo-haptics";

interface CalculatorButtonProps {
  //Properties
  label: string;
  color?: string;
  blackText?: boolean;
  doubleSize?: boolean;

  //Methods - Actions
  onPress: () => void;
}

const CalculatorButton = ({
  label,
  color = Colors.darkGray,
  onPress,
  blackText = false,
  doubleSize = false,
}: CalculatorButtonProps) => {
  return (
    <Pressable
      style={({ pressed }) => ({
        ...globalStyles.button,
        backgroundColor: color,
        width: doubleSize ? 180 : 80,
        opacity: pressed ? 0.6 : 1,
      })}
      onPress={() => {
        Haptics.selectionAsync();
        onPress();
      }}
    >
      <Text
        style={{
          ...globalStyles.buttonText,
          color: blackText ? "black" : "white",
        }}
      >
        {label}
      </Text>
    </Pressable>
  );
};

export default CalculatorButton;
