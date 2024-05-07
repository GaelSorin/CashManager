/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable react-native/no-inline-styles */
import React, {useEffect} from 'react';
// import MCI from 'react-native-vector-icons/MaterialCommunityIcons';
import {Box, Icon, Text} from '@react-native-material/core';
import {
  Camera,
  useCodeScanner,
  useCameraDevice,
  useCameraPermission,
} from 'react-native-vision-camera';
import { Link } from 'react-router-native';

interface QRProps {
  finishPayement: (id: string) => void;
}
export const QRCode = ({
  finishPayement,
}: QRProps) => {
  const device = useCameraDevice('back');
  const {hasPermission, requestPermission} = useCameraPermission();
  const codeScanner = useCodeScanner({
    codeTypes: ['qr', 'ean-13'],
    onCodeScanned: codes => {
      console.log(`Scanned ${codes.length} codes ! | `, codes[0].value);
      finishPayement(codes[0].value ?? '');
    },
  });
  console.log('device');

  useEffect(() => {
    if (!hasPermission) {
      requestPermission();
    }
  }, [hasPermission]);

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
        {device && (
          <Camera
            style={{width: '100%', height: '100%'}}
            device={device}
            isActive={true}
            codeScanner={codeScanner}
            enableZoomGesture
          />
        )}
      </Box>
      <Link to="/" style={{ position: 'absolute', bottom: 20, left: 20 }}>
        <Text style={{ fontSize: 24, color: 'blue' }}>{"<"}</Text>
      </Link>
    </Box>
  );
};