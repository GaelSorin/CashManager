// NFCReaderPage.tsx
import React, { useEffect, useState } from 'react';
import { View, Text, Button, StyleSheet } from 'react-native';
import NfcManager, { NfcTech } from 'react-native-nfc-manager';
import { useNavigate } from 'react-router-native'; // Importer useNavigate
import { useTotalAmount } from '../context/totalAmountContext';
import { useSocket } from '../context/socketContext';

interface NFCProps {
  clientID: string;
}

export const NFCReaderPage = ({ clientID }: NFCProps) => {
  const [tagId, setTagId] = useState<string | null>(null);
  const { totalAmount, resetTotalAmount } = useTotalAmount();
  const socket = useSocket();
  const navigate = useNavigate(); // Utiliser useNavigate pour la navigation

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

  const sendPayment = (codeValue: string) => {
    if (socket) {
      console.log("paiement : " + codeValue + "; " + totalAmount + "; " + clientID);
      socket.emit('payement', { codeValue, totalAmount, clientID });
    }
  };

  const handleBack = () => {
    resetTotalAmount(); // Réinitialiser le montant total
    navigate('/'); // Naviguer vers la page d'accueil
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Lecture de Tag NFC</Text>
      {!tagId && (
        <Button title="Lire le tag NFC" onPress={readTag} />
      )}
      {tagId && (
        <View style={styles.tagContainer}>
          <Text style={styles.tagText}>ID: {tagId}</Text>
        </View>
      )}
      <Text onPress={handleBack} style={{ position: 'absolute', bottom: 20, left: 20, fontSize: 24, color: 'blue' }}>Retour</Text>
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