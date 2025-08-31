import { useContext } from 'react';
import { ThemeContext } from 'styled-components';
import { Theme } from '../theme';

export default function useTheme(): Theme {
  const theme = useContext(ThemeContext);
  return theme;
}
