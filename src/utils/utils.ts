import 'react-native-get-random-values'
import { nanoid } from 'nanoid';

export const generateOrderSlug = () => {
  const randomString = nanoid(4);
  const timestamp = new Date().getTime();
  return `order-${randomString}-${timestamp}`;
};