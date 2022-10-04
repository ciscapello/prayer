import React from 'react';
import { Text } from 'react-native';

interface SubscribedProps {
  id: number;
}

export default function Subscribed({ id }: SubscribedProps) {
  return <Text>{id}</Text>;
}
