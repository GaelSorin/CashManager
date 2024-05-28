// NFCReaderPage.tsx
import React, { useEffect, useState } from 'react';
import { View, Text, Button, StyleSheet } from 'react-native';
import NfcManager, { NfcTech } from 'react-native-nfc-manager';
import { Link } from 'react-router-native';
import { useTotalAmount } from '../context/totalAmountContext';
import { useSocket } from '../context/socketContext';

export const NFCReaderPage = () => {
  const [tagId, setTagId] = useState<string | null>(null);
  const { totalAmount } = useTotalAmount();
  const socket = useSocket();

  useEffect(() => {
    NfcManager.start();
    return () => {
      NfcManager.unregisterTagEvent();
    };
  }, []);

  const readTag = async () => {
    try {
      await NfcManager.requestTechnology(NfcTech.Ndef);
      const tag = await NfcManager.getTag();
      if (tag && tag.id) {
        console.log(tag);
        setTagId(tag.id);
        sendPayment(tag.id);
      } else {
        setTagId(null);
        console.log("No tag found or tag ID is undefined");
      }
    } catch (error) {
      console.warn("Error reading tag:", error);
    } finally {
      NfcManager.cancelTechnologyRequest();
    }
  };

  const sendPayment = (tagId: string) => {
    if (socket) {
      socket.emit('payement', { tagId, totalAmount });
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Lecture de Tag NFC</Text>
      <Button title="Lire le tag NFC" onPress={readTag} />
      {tagId && (
        <View style={styles.tagContainer}>
          <Text style={styles.tagText}>ID: {tagId}</Text>
        </View>
      )}
      <Link to="/" style={{ position: 'absolute', bottom: 20, left: 20 }}>
        <Text style={{ fontSize: 24, color: 'blue' }}>{"Retour"}</Text>
      </Link>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#fff',
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 20,
  },
  tagContainer: {
    marginTop: 20,
    padding: 10,
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 5,
  },
  tagText: {
    fontSize: 18,
  },
});
