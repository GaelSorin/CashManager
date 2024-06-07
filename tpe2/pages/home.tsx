import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { Link } from 'react-router-native';
import { useTotalAmount } from '../context/totalAmountContext';

export const Home = () => {
  const { totalAmount } = useTotalAmount();

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Menu Principal</Text>
      {totalAmount === 0 ? (
        <Text style={styles.waitingText}>En attente de transaction</Text>
      ) : (
        <>
          <Text style={styles.amountText}>Montant de la transaction : {totalAmount}€</Text>
          <Link to="/QRCode" style={styles.button}>
            <Text style={styles.buttonText}>QR Code</Text>
          </Link>
          <Link to="/NFC" style={styles.button}>
            <Text style={styles.buttonText}>NFC</Text>
          </Link>
        </>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#f0f0f0',
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 20,
  },
  waitingText: {
    fontSize: 18,
    color: 'gray',
    marginBottom: 20,
  },
  amountText: {
    fontSize: 18,
    color: 'green',
    marginBottom: 20,
  },
  button: {
    backgroundColor: '#007bff',
    paddingVertical: 15,
    paddingHorizontal: 30,
    borderRadius: 10,
    marginBottom: 15,
  },
  buttonText: {
    color: '#fff',
    fontSize: 18,
    fontWeight: 'bold',
  },
});
