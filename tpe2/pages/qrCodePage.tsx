// qrCodePage.tsx
import React, { useEffect, useState } from 'react';
import { Box, Text } from '@react-native-material/core';
import {
  Camera,
  useCodeScanner,
  useCameraDevice,
  useCameraPermission,
} from 'react-native-vision-camera';
import { Link } from 'react-router-native';
import { useSocket } from '../context/socketContext';
import { useTotalAmount } from '../context/totalAmountContext';

interface QRProps {
  finishPayement: (id: string) => void;
}

export const QRCode = ({ finishPayement }: QRProps) => {
  const [scanned, setScanned] = useState(false);
  const device = useCameraDevice('back');
  const { hasPermission, requestPermission } = useCameraPermission();
  const socket = useSocket();
  const { totalAmount } = useTotalAmount();

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
    if (socket) {
      socket.emit('payement', { codeValue, totalAmount });
    }
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
