import React, { FC, useContext, useRef } from 'react';
import { Animated, StyleSheet, Text, View } from 'react-native';
import { RectButton, Swipeable } from 'react-native-gesture-handler';
import { Todo, TodoContext } from '../../context/todoContext';

const RenderRightActions = (
  progress: Animated.AnimatedInterpolation,
  _dragAnimatedVal: Animated.AnimatedInterpolation,
  closeSwipable: () => void,
  isCompleted: boolean,
) => {
  const translateX = progress.interpolate({
    inputRange: [0, 1],
    outputRange: [55, 0],
  });

  return (
    <View style={{ width: 110 }}>
      <Animated.View style={{ flex: 1, transform: [{ translateX }] }}>
        <RectButton style={styles.rightActionContainer} onPress={closeSwipable}>
          <Text style={styles.smallText}>Mark as</Text>
          <Text style={styles.smallBoldText}>
            {isCompleted ? 'Uncompleted' : 'Completed'}
          </Text>
        </RectButton>
      </Animated.View>
    </View>
  );
};

const RenderLeftActions = (
  progress: Animated.AnimatedInterpolation,
  _dragAnimatedVal: Animated.AnimatedInterpolation,
  onPress: () => void,
) => {
  const translateX = progress.interpolate({
    inputRange: [0, 1],
    outputRange: [-40, 0],
  });

  return (
    <View style={{ width: 80 }}>
      <Animated.View style={{ flex: 1, transform: [{ translateX }] }}>
        <RectButton style={styles.leftActionContainer} onPress={onPress}>
          <Text style={styles.smallBoldText}>Remove</Text>
        </RectButton>
      </Animated.View>
    </View>
  );
};

interface Props {
  todo: Todo;
}

const TodoItem: FC<Props> = ({ todo }) => {
  const ref = useRef<Swipeable>(null);
  const { toggleTodo, removeTodo } = useContext(TodoContext);

  const closeSwipable = async () => {
    ref.current?.close();
    return new Promise(resolve => {
      setTimeout(resolve, 400);
    });
  };

  const rightPress = async () => {
    await closeSwipable();
    toggleTodo(todo.id);
  };

  const leftPress = async () => {
    await closeSwipable();
    removeTodo(todo.id);
  };

  return (
    <Swipeable
      ref={ref}
      enabled
      overshootLeft={false}
      overshootRight={false}
      rightThreshold={30}
      leftThreshold={30}
      renderLeftActions={(...props) => RenderLeftActions(...props, leftPress)}
      renderRightActions={(...props) =>
        RenderRightActions(...props, rightPress, todo.completed)
      }
      containerStyle={styles.container}
    >
      <View style={styles.contentContainer}>
        <Text
          style={{
            textDecorationLine: todo.completed ? 'line-through' : 'none',
          }}
        >
          {todo.content}
        </Text>
      </View>
    </Swipeable>
  );
};

const styles = StyleSheet.create({
  container: {
    backgroundColor: 'white',
    borderBottomWidth: 1,
    borderColor: '#cecece',
  },
  contentWrapper: {
    flex: 1,
    backgroundColor: 'white',
  },
  contentContainer: {
    flex: 1,
    padding: 20,
    backgroundColor: 'white',
  },
  rightActionContainer: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#343434',
  },
  leftActionContainer: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#e11414',
  },
  smallText: {
    width: '100%',
    fontSize: 12,
    textAlign: 'center',
    color: 'white',
  },
  smallBoldText: {
    color: 'white',
    fontWeight: 'bold',
    marginTop: 2,
  },
});

export default TodoItem;
