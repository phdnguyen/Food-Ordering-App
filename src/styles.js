import { StyleSheet, Platform } from 'react-native'

export const primaryColorGreen = "#5fa0ae";
export const primaryColorRed = "#b64041";
export const backgroundColor = "#f7f5ea";
export const primaryColorBrown = "#5a4946";

export const white = "#fff";

export const commonStyles = StyleSheet.create({
  container: {
    backgroundColor: backgroundColor,
    flex: 1,
    paddingTop: Platform.OS === 'ios' ? 15 : 0
  },
  button: {
    borderRadius: 30,
    height: 40,
    width: 100,
    justifyContent: 'center',
    alignItems: 'center',
    marginHorizontal: 10
  },
  fontTitleScreen: {
    fontSize: 20,
    color: primaryColorRed,
    fontWeight: 'bold',
    marginHorizontal: 7,
    marginVertical: 10
  }
})