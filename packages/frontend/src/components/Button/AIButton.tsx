import { useState, FC, ButtonHTMLAttributes } from 'react';
import { motion } from 'framer-motion';
import {
  buttonAnim,
  highlightContainerAnim,
  highlightAnim,
  labelAnim,
} from './AIButton.anim';
import Sparkles from './components/Sparkles';
import S from './AIButton.module.css';
import { MotionProps } from 'framer-motion';
import CameraEnhanceIcon from '@mui/icons-material/CameraEnhance';

export type AIButtonProps = {
  children?: string;
  hueValue?: number;
} & MotionProps &
  ButtonHTMLAttributes<HTMLButtonElement>;

const AIButton: FC<AIButtonProps> = ({
  children,
  hueValue = 0,
  ...rest
}: AIButtonProps) => {
  const [hover, setHover] = useState<boolean>(false);
  const [sparkles] = useState<number[]>(Array(30).fill(0));

  return (
    <div>
      <Sparkles sparkles={sparkles} hover={hover} />
      <motion.button
        {...rest}
        variants={buttonAnim}
        initial='init'
        animate={hover ? 'anim' : 'init'}
        whileTap='tap'
        onHoverStart={() => setHover(true)}
        onHoverEnd={() => setHover(false)}
        className={S.btn}
        type='button'
        style={{
          filter: `hue-rotate(${hueValue}deg)`,
          margin: '50px',
        }}
      >
        <motion.div
          data-testid='highlight'
          variants={highlightContainerAnim}
          className={S.highlightContainer}
          animate={hover ? 'anim' : 'init'}
        >
          <motion.div
            variants={highlightAnim}
            className={S.highlight}
          ></motion.div>
        </motion.div>
        {/*   <Stars hover={hover} /> */}
        <CameraEnhanceIcon fontSize='large' sx={{ color: 'white' }} />
        {children && <motion.span variants={labelAnim}>{children}</motion.span>}
      </motion.button>
    </div>
  );
};

export default AIButton;
