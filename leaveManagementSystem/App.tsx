import React, { useState } from 'react';
import { SafeAreaView, StyleSheet, Button, View } from 'react-native';
import { WebView } from 'react-native-webview';
import LeaveForm from './components/leaveForm.mjs';

export default function App() {
  const [showAdmin, setShowAdmin] = useState(true); // toggle between dashboard & form

  return (
    <SafeAreaView style={{ flex: 1 }}>
      {showAdmin ? (
        <>
          {/* WebView showing AdminJS dashboard */}
          <WebView source={{ uri: 'http://192.168.5.157:3000/admin' }} style={{ flex: 1 }} />
          {/* Button to open leave form */}
          <Button title="Fill Leave Form" onPress={() => setShowAdmin(false)} />
        </>
      ) : (
        <>
          <LeaveForm onSubmit={() => setShowAdmin(true)} />
        </>
      )}
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
});

