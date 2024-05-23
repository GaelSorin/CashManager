/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable react-native/no-inline-styles */
import React, { useEffect, useState } from 'react';
import { Box, Text } from '@react-native-material/core';
import {
  Camera,
  useCodeScanner,
  useCameraDevice,
  useCameraPermission,
} from 'react-native-vision-camera';
import { Link } from 'react-router-native';
import io from 'socket.io-client';

const socket = io("http://localhost:8001");

interface QRProps {
  finishPayement: (id: string) => void;
}

export const QRCode = ({ finishPayement }: QRProps) => {
  const [scanned, setScanned] = useState(false);
  const device = useCameraDevice('back');
  const { hasPermission, requestPermission } = useCameraPermission();

  const codeScanner = useCodeScanner({
    codeTypes: ['qr', 'ean-13'],
    onCodeScanned: codes => {
      const codeValue = codes[0]?.value ?? '';
      console.log(`Scanned ${codes.length} codes ! | `, codeValue);
      finishPayement(codeValue);
      console.log("sendpayment : " + codeValue);
      sendPayment(codeValue); // Envoyer le paiement via le socket
      setScanned(true); // Mettre à jour l'état pour indiquer qu'un code a été scanné
    },
  });

  useEffect(() => {
    if (!hasPermission) {
      requestPermission();
    }
  }, [hasPermission]);

  const sendPayment = (codeValue: string) => {

    const data = {
      tpeId: 'tpe123',
      id: codeValue,
      amount: 50.0
    }
    socket.emit('payement', { codeValue });
  };

  return (
    <Box
      style={{
        height: '100%',
        width: '100%',
      }}>
      <Box
        style={{
          height: '90%',
          width: '100%',
          backgroundColor: 'white',
          justifyContent: 'center',
          alignItems: 'center',
        }}>
        {device && !scanned && (
          <Camera
            style={{width: '100%', height: '100%'}}
            device={device}
            isActive={true}
            codeScanner={codeScanner}
            enableZoomGesture
          />
        )}
        {scanned && (
          <Text style={{ fontSize: 24, color: 'green' }}>QR code scanné</Text>
        )}
      </Box>
      <Link to="/" style={{ position: 'absolute', bottom: 20, left: 20 }}>
        <Text style={{ fontSize: 24, color: 'blue' }}>Retour</Text>
      </Link>
    </Box>
  );
};
