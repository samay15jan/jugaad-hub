import { BlurView } from 'expo-blur';
import { Image } from 'expo-image';
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
    <View className="flex-1 absolute bg-black mt-20">
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
      <View className="absolute top-10 w-screen p-4 items-center">
        <View className="flex-row justify-between w-full px-16">
          <View
            style={{
              backgroundColor: "#e1f7fb",
              borderRadius: 100,
              alignSelf: "center",
              overflow: "hidden",
            }}
          >
            <Image
              source={require('@/assets/images/icons/person_1.jpg')}
              style={{ width: 120, height: 120, transform: [{ rotate: '350deg' }] }}
              contentFit="cover"
            />
          </View>

          <View
            style={{
              backgroundColor: "#ffd4d5",
              borderRadius: 100,
              alignSelf: "center",
              overflow: "hidden",
            }}
          >
            <Image
              source={require('@/assets/images/icons/person_4.jpg')}
              style={{
                width: 100, height: 100, transform: [{ rotate: '10deg' }],
              }}
              contentFit="cover"
            />
          </View>
        </View>
        <View className='absolute top-28 z-10'>
          <BlurView intensity={100} className="px-14 py-6 bg-white"
            style={{
              borderRadius: 100,
              transform: [{ rotate: '340deg' }]
            }}>
            <Text className="text-white font-extrabold text-3xl mt-1 ml-6 absolute" style={{ transform: [{ rotate: '360deg' }] }}>Hola</Text>
          </BlurView>
        </View>

        <View
          style={{
            backgroundColor: "#cdfacf",
            borderRadius: 100,
            alignSelf: "center",
            overflow: "hidden",
          }}
        >
          <Image
            source={require('@/assets/images/icons/person_2.jpg')}
            style={{ width: 100, height: 100, transform: [{ rotate: '350deg' }] }}
            contentFit="cover"
          />
        </View>
      </View>
    </View>
  );
};

export default BackgroundBalls;
