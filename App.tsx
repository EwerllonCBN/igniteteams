import { StatusBar } from 'react-native'
import theme from './src/theme/index'
import { Groups } from '@screens/Groups'
import { ThemeProvider } from 'styled-components'
import {
  useFonts,
  Roboto_400Regular,
  Roboto_700Bold
} from '@expo-google-fonts/roboto'
import { ActivityIndicator } from 'react-native'
import { Loading } from '@components/Loading'
import { NewGroup } from '@screens/NewGroup'
import { Players } from '@screens/Players'
import { Routes } from './src/routes'

export default function App() {
  const [fontsLoaded] = useFonts({ Roboto_400Regular, Roboto_700Bold })

  return (
    <ThemeProvider theme={theme}>
      <StatusBar
        backgroundColor="transparent"
        barStyle="light-content"
        translucent
      />
      {fontsLoaded ? <Routes /> : <Loading />}
    </ThemeProvider>
  )
}
