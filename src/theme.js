import {
  createSystem,
  defaultConfig,
  defineConfig,
  defineRecipe,
} from '@chakra-ui/react'
import '@fontsource-variable/inter'

// Heading sizes as they were in Chakra UI v2, so that existing `size` props
// keep rendering at the same scale after the v3 migration.
const headingSize = (fontSize, lineHeight) => ({
  textStyle: 'none',
  fontSize,
  lineHeight,
})

const headingRecipe = defineRecipe({
  base: {
    fontWeight: 'bold',
  },
  variants: {
    size: {
      '4xl': headingSize({ base: '6xl', md: '7xl' }, 1),
      '3xl': headingSize({ base: '5xl', md: '6xl' }, 1),
      '2xl': headingSize({ base: '4xl', md: '5xl' }, { base: 1.2, md: 1 }),
      xl: headingSize({ base: '3xl', md: '4xl' }, { base: 1.33, md: 1.2 }),
      lg: headingSize({ base: '2xl', md: '3xl' }, { base: 1.33, md: 1.2 }),
      md: headingSize('xl', 1.2),
      sm: headingSize('md', 1.2),
      xs: headingSize('sm', 1.2),
    },
  },
})

const containerRecipe = defineRecipe({
  base: {
    // Chakra UI v2 container padding
    px: '4',
  },
})

const config = defineConfig({
  globalCss: {
    html: { scrollBehavior: 'smooth' },
    // Chakra UI v2 default body text colour
    body: { color: 'gray.800' },
  },
  theme: {
    tokens: {
      fonts: {
        body: {
          value:
            "'Open Sans', -apple-system, BlinkMacSystemFont, 'Segoe UI', Helvetica, Arial, sans-serif, 'Apple Color Emoji', 'Segoe UI Emoji', 'Segoe UI Symbol'",
        },
        heading: {
          value: "'Open Sans', 'Work Sans', system-ui, sans-serif",
        },
      },
      sizes: {
        // Chakra UI v2 `container.*` sizes, used as `maxW='container.lg'`
        container: {
          sm: { value: '640px' },
          md: { value: '768px' },
          lg: { value: '1024px' },
          xl: { value: '1280px' },
        },
      },
    },
    recipes: {
      heading: headingRecipe,
      container: containerRecipe,
    },
  },
})

export const system = createSystem(defaultConfig, config)
