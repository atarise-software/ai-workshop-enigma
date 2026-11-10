import { useEffect, useRef } from 'react';
import { StyleSheet, Text, View } from 'react-native';
import MapView, { Marker, type Region } from 'react-native-maps';

import type { Location } from '@/data/games';
import { colors, fonts, radius, space } from '@/theme';

const DELTA = 0.005;

function regionAround({ latitude, longitude }: Location): Region {
  return { latitude, longitude, latitudeDelta: DELTA, longitudeDelta: DELTA };
}

type Props = { location: Location };

/** Approximate target of the current step. Never shows or reads the player's position. */
export function TargetMap({ location }: Props) {
  const mapRef = useRef<MapView>(null);
  const isFirstRender = useRef(true);

  useEffect(() => {
    if (isFirstRender.current) {
      isFirstRender.current = false;
      return;
    }
    mapRef.current?.animateToRegion(regionAround(location), 600);
  }, [location]);

  return (
    <View style={styles.wrap}>
      <View style={styles.frame}>
        <MapView
          ref={mapRef}
          style={styles.map}
          initialRegion={regionAround(location)}
          showsUserLocation={false}
          showsMyLocationButton={false}
          pitchEnabled={false}
          rotateEnabled={false}
          toolbarEnabled={false}
          userInterfaceStyle="light"
          accessibilityLabel={`Mapa: ${location.label}`}>
          <Marker coordinate={location} title={location.label} />
        </MapView>
      </View>
      <Text style={styles.caption}>Przybliżona lokalizacja celu</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  wrap: { gap: space.sm },
  frame: {
    height: 333,
    borderWidth: 1,
    borderColor: colors.border,
    borderRadius: radius.lg,
    overflow: 'hidden',
    backgroundColor: colors.surface,
  },
  map: { flex: 1 },
  caption: { color: colors.textMuted, fontFamily: fonts.regular, fontSize: 10, lineHeight: 15, textAlign: 'center' },
});
