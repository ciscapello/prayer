import * as React from 'react';
import Svg, { SvgProps, Mask, Path, G } from 'react-native-svg';

const SvgUser = (props: SvgProps) => (
  <Svg
    width={15}
    height={20}
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
    role="img"
    {...props}>
    <Mask
      id="user_svg__a"
      style={{
        maskType: 'alpha',
      }}
      maskUnits="userSpaceOnUse"
      x={0}
      y={0}
      width={15}
      height={20}>
      <Path
        d="m13.374 14.296-3.115-1.592a.879.879 0 0 1-.476-.788v-1.127c.074-.093.153-.2.234-.317a7.693 7.693 0 0 0 .963-1.933c.46-.216.76-.68.76-1.206V6c0-.321-.118-.632-.327-.875V3.352c.018-.183.09-1.275-.682-2.175C10.06.396 8.974 0 7.5 0S4.939.396 4.27 1.177c-.773.9-.701 1.992-.683 2.175v1.773A1.346 1.346 0 0 0 3.261 6v1.333c0 .406.18.784.488 1.037a7.056 7.056 0 0 0 1.142 2.412v1.103a.884.884 0 0 1-.449.773L1.533 14.28A3.017 3.017 0 0 0 0 16.92V18c0 1.582 4.906 2 7.5 2 2.594 0 7.5-.418 7.5-2v-1.014a2.999 2.999 0 0 0-1.626-2.69Z"
        fill="#000"
      />
    </Mask>
    <G mask="url(#user_svg__a)">
      <Path fill="#A369EC" d="M-4-2h24v24H-4z" />
    </G>
  </Svg>
);

export default SvgUser;
