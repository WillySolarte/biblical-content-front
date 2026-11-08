import { createTheme, type MantineColorsTuple } from '@mantine/core';

const forest: MantineColorsTuple = [
  '#edf4f1',
  '#dbe7e2',
  '#b7cdc4',
  '#8eb2a4',
  '#4a7b6c',
  '#355b4f',
  '#263B35', // Primary Forest Green
  '#1d2f2a',
  '#16231f',
  '#0d1613'
];

const gold: MantineColorsTuple = [
  '#faf6ee',
  '#f5ebda',
  '#ebd6b2',
  '#e0c086',
  '#D6B77A', // Accent Soft Gold
  '#be9c57',
  '#9c7c3d',
  '#785d2c',
  '#56411d',
  '#382a10'
];

export const theme = createTheme({
  primaryColor: 'forest',
  primaryShade: 6,
  colors: {
    forest,
    gold,
  },
  fontFamily: 'Inter, -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif',
  headings: {
    fontFamily: 'Lora, Georgia, serif',
    fontWeight: '600',
  },
  defaultRadius: 'md',
  cursorType: 'pointer',
  components: {
    Button: {
      defaultProps: {
        radius: 'md',
      },
    },
    Card: {
      defaultProps: {
        radius: 'lg',
        withBorder: true,
      },
    },
    TextInput: {
      defaultProps: {
        radius: 'md',
      },
    },
    Select: {
      defaultProps: {
        radius: 'md',
      },
    },
    Modal: {
      defaultProps: {
        radius: 'lg',
        overlayProps: {
          backgroundOpacity: 0.55,
          blur: 3,
        },
      },
    },
  },
});

