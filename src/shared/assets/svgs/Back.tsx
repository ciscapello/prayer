import * as React from 'react';
import Svg, { SvgProps, Path } from 'react-native-svg';

const SvgBack = (props: SvgProps) => (
  <Svg
    xmlns="http://www.w3.org/2000/svg"
    width={30}
    height={30}
    role="img"
    {...props}>
    <Path d="M0 0h48v48H0z" fill="none" />
    <Path d="M40 22H15.66l11.17-11.17L24 8 8 24l16 16 2.83-2.83L15.66 26H40v-4z" />
  </Svg>
);

export default SvgBack;
