import nextCoreWebVitals from 'eslint-config-next/core-web-vitals'

const config = [
  ...nextCoreWebVitals,
  {
    rules: {
      // New in eslint-plugin-react-hooks 7; existing effects not yet reworked
      'react-hooks/set-state-in-effect': 'off',
    },
  },
]

export default config
