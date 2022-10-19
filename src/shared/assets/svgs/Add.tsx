import * as React from 'react';
import Svg, { SvgProps, Mask, Path, G } from 'react-native-svg';

const SvgAdd = (props: SvgProps) => (
  <Svg
    viewBox="0 0 22 22"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
    {...props}>
    <Mask
      id="add_svg__a"
      // eslint-disable-next-line react-native/no-inline-styles
      style={{
        maskType: 'alpha',
      }}
      maskUnits="userSpaceOnUse"
      x={0}
      y={0}
      width={22}
      height={22}>
      <Path
        d="M10 21a1 1 0 1 0 2 0v-9h9a1 1 0 1 0 0-2h-9V1a1 1 0 1 0-2 0v9H1a1 1 0 1 0 0 2h9v9Z"
        fill="#000"
      />
    </Mask>
    <G mask="url(#add_svg__a)">
      <Path fill="#3a87a3" d="M-1-1h24v24H-1z" />
    </G>
  </Svg>
);

export default SvgAdd;
