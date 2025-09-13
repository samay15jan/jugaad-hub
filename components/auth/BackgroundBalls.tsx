import { BlurView } from 'expo-blur';
import React, { useEffect, useRef } from 'react';
import { Animated, Dimensions, Text, View } from 'react-native';

const { width, height } = Dimensions.get('window');
const BALL_COUNT = 6;
const COLORS = ['#e1f7fb', '#cdfacf', '#ffd4d5', '#def8fb', '#f9e9b3', '#f3d4fc'];

const BackgroundBalls = () => {
  const balls = useRef(
    Array.from({ length: BALL_COUNT }).map((_, idx) => {
      const size = Math.random() * 30 + 10;
      return {
        x: new Animated.Value(Math.random() * (width - size)),
        y: new Animated.Value(Math.random() * (height - size)),
        vx: Math.random() * 0.3 + 0.05,
        vy: Math.random() * 0.3 + 0.05,
        size,
        color: COLORS[idx % COLORS.length],
      };
    })
  ).current;

  useEffect(() => {
    const interval = setInterval(() => {
      balls.forEach(ball => {
        let newX = ball.x._value + ball.vx;
        let newY = ball.y._value + ball.vy;

        if (newX < 0 || newX > width - ball.size) ball.vx *= -1;
        if (newY < 0 || newY > height - ball.size) ball.vy *= -1;

        newX = ball.x._value + ball.vx;
        newY = ball.y._value + ball.vy;

        ball.x.setValue(newX);
        ball.y.setValue(newY);
      });
    }, 16);

    return () => clearInterval(interval);
  }, []);

  return (
    <View className='flex-1 absolute'>
      <View className="p-4 items-center">
        <View className="flex-row justify-between w-full px-16">
          <View className="rounded-full w-36 h-36 bg-[#e1f7fb] mb-4" />
          <View className="rounded-full w-32 h-32 bg-[#ffd4d5]" />
        </View>
        <BlurView intensity={100} className='bg-white'>
          <Text className='text-white w-10'>Hola</Text>
        </BlurView>
        <View className="rounded-full w-28 h-28 bg-[#cdfacf] ml-10" />
      </View>
      {balls.map((ball, idx) => (
        <Animated.View
          key={idx}
          style={{
            width: ball.size,
            height: ball.size,
            borderRadius: ball.size / 2,
            backgroundColor: ball.color,
            transform: [{ translateX: ball.x }, { translateY: ball.y }],
          }}
        />
      ))}
    </View>
  );
};

export default BackgroundBalls;
