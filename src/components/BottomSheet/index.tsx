import React, { FC, useCallback, useEffect } from 'react';
import {
  KeyboardAvoidingView,
  Pressable,
  StyleSheet,
  View,
} from 'react-native';
import { Gesture, GestureDetector } from 'react-native-gesture-handler';
import Animated, {
  runOnJS,
  useAnimatedStyle,
  useSharedValue,
  withTiming,
} from 'react-native-reanimated';

type Props = {
  children?: React.ReactNode;
  isVisible: boolean;
  onClose: () => void;
  onOutsideClick?: () => void;
  height?: number;
  duration?: number;
};

const BottomSheet: FC<Props> = ({
  children,
  isVisible,
  onClose,
  onOutsideClick,
  height = 350,
  duration = 300,
}) => {
  const translateYForHide = height + 150;
  const translateY = useSharedValue(translateYForHide);
  const opacity = useSharedValue(0);
  const context = useSharedValue({ y: translateYForHide });

  const controlSheet = useCallback(
    (isOpening: boolean) => {
      translateY.value = withTiming(isOpening ? 0 : translateYForHide, {
        duration,
      });
      opacity.value = withTiming(isOpening ? 1 : 0, {
        duration,
      });
    },
    [duration, opacity, translateY, translateYForHide],
  );

  const closeAfterTimeout = () => {
    setTimeout(() => {
      onClose();
    }, duration);
  };

  useEffect(() => {
    controlSheet(isVisible);
  }, [controlSheet, isVisible, translateY]);

  const gesture = Gesture.Pan()
    .onStart(() => {
      context.value = { y: translateY.value };
    })
    .onUpdate(event => {
      translateY.value = context.value.y + event.translationY;
      translateY.value = Math.max(0, translateY.value);
    })
    .onEnd(() => {
      runOnJS(controlSheet)(translateY.value < height / 3);

      if (translateY.value >= height / 3) {
        runOnJS(closeAfterTimeout)();
      }
    });

  const reanimatedContainerStyle = useAnimatedStyle(() => ({
    transform: [
      {
        translateY: translateY.value,
      },
    ],
  }));

  const reanimatedOverlayStyle = useAnimatedStyle(() => ({
    opacity: opacity.value,
    display: opacity.value > 0 ? 'flex' : 'none',
  }));

  return (
    <>
      <KeyboardAvoidingView behavior="height" style={{ zIndex: 2 }}>
        <Animated.View
          style={[styles.container, reanimatedContainerStyle, { height }]}
        >
          <GestureDetector gesture={gesture}>
            <View style={styles.lineContainer}>
              <View style={styles.line} />
            </View>
          </GestureDetector>
          <View style={{ flex: 1 }}>{children}</View>
        </Animated.View>
      </KeyboardAvoidingView>
      <Animated.View style={[styles.overlay, reanimatedOverlayStyle]}>
        <Pressable style={{ flex: 1 }} onPress={onOutsideClick} />
      </Animated.View>
    </>
  );
};

const styles = StyleSheet.create({
  overlay: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    backgroundColor: 'rgba(0, 0, 0, 0.2)',
    zIndex: 1,
  },
  container: {
    position: 'absolute',
    width: '100%',
    backgroundColor: 'white',
    bottom: 0,
    borderTopLeftRadius: 20,
    borderTopRightRadius: 20,
    zIndex: 3,
  },
  lineContainer: {
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: 15,
    borderTopLeftRadius: 20,
    borderTopRightRadius: 20,
  },
  line: {
    width: 100,
    height: 4,
    borderRadius: 2,
    backgroundColor: '#888',
  },
});

export default BottomSheet;
