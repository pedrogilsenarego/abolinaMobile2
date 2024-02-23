import LottieView from "lottie-react-native";
import React, { useState } from "react";
import { TouchableOpacity, View } from "react-native";

type Props = {
  file: string;
};

const Lottie = ({ file }: Props) => {
  const [isPlaying, setIsPlaying] = useState(false);

  const handlePress = () => {
    setIsPlaying(!isPlaying);
  };

  return (
    <View style={{ alignItems: "center" }}>
      <TouchableOpacity onPress={handlePress}>
        <LottieView
          onAnimationFinish={() => setIsPlaying(false)}
          source={file}
          autoPlay={isPlaying}
          loop={!isPlaying}
          style={{
            width: "70%",
            aspectRatio: 1,
          }}
        />
      </TouchableOpacity>
    </View>
  );
};

export default Lottie;
