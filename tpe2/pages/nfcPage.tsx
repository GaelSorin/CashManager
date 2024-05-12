import React, { useEffect, useState } from 'react';
import { View, Text, Button, StyleSheet } from 'react-native';
import NfcManager, { NfcTech } from 'react-native-nfc-manager';
import { Link } from 'react-router-native';

export const NFCReaderPage = () => {
  const [tagId, setTagId] = useState<string | null>(null); // Utilisation d'une chaîne de caractères pour stocker l'ID du tag

  useEffect(() => {
    NfcManager.start();
    return () => {
      NfcManager.unregisterTagEvent(); // Arrête la détection NFC
    };
  }, []);

  const readTag = async () => {
    try {
      await NfcManager.requestTechnology(NfcTech.Ndef);
      const tag = await NfcManager.getTag();
      if (tag) {
        console.log(tag);
      } else {
        setTagId(null); // Réinitialisation de l'ID du tag s'il n'est pas trouvé
        console.log("No tag found");
      }
    } catch (error) {
      console.warn("Error reading tag:", error);
    } finally {
      NfcManager.cancelTechnologyRequest();
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Lecture de Tag NFC</Text>
      <Button title="Lire le tag NFC" onPress={readTag} />
      {tagId && (
        <View style={styles.tagContainer}>
          <Text style={styles.tagText}>ID: {tagId}</Text>
          {/* Insérez ici d'autres informations que vous souhaitez afficher sur le tag */}
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
