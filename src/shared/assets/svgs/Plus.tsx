import * as React from 'react';
import Svg, {SvgProps, Path} from 'react-native-svg';

const SvgPlus = (props: SvgProps) => (
  <Svg
    viewBox="0 0 22 22"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
    // role="img"
    {...props}>
    <Path fill="#72A8BC" d="M-1-1h24v24H-1z" />
  </Svg>
);

export default SvgPlus;
