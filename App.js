import '@azure/core-asynciterator-polyfill'
import { StatusBar } from "expo-status-bar";
import { StyleSheet, View } from "react-native";
import Navigator from "./src/navigation";
import { Amplify, Auth } from "aws-amplify";
import awsconfig from "./src/aws-exports";
import { withAuthenticator } from "aws-amplify-react-native";

Amplify.configure({ ...awsconfig, Analytics: { disabled: true } });

function App() {

  return (
    <View style={styles.container}>
      <Navigator />
      <StatusBar style="auto" />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
});

export default withAuthenticator(App);
