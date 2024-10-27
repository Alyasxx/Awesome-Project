/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 */

import React from 'react';
import type {PropsWithChildren} from 'react';
import {
  SafeAreaView,
  ScrollView,
  StatusBar,
  StyleSheet,
  Text,
  useColorScheme,
  View,
  Image,
} from 'react-native';

import {
  Colors,
  DebugInstructions,
  Header,
  LearnMoreLinks,
  ReloadInstructions,
} from 'react-native/Libraries/NewAppScreen';

type SectionProps = PropsWithChildren<{
  title: string;
}>;

function Section({children, title}: SectionProps): React.JSX.Element {
  const isDarkMode = useColorScheme() === 'dark';
  return (
    <View style={styles.sectionContainer}>
      <Text
        style={[
          styles.sectionTitle,
          {
            color: 'black',
          },
        ]}>
        {title}
      </Text>
      <Text
        style={{color: 'chocolate'}}>
        {children}
      </Text>
    </View>
  );
}

function App(): React.JSX.Element {
  const isDarkMode = useColorScheme() === 'dark';

  const backgroundStyle = {
    backgroundColor: isDarkMode ? Colors.darker : Colors.lighter,
  };

  return (
    <SafeAreaView style={backgroundStyle}>
      <StatusBar
        barStyle={isDarkMode ? 'light-content' : 'dark-content'}
        backgroundColor={backgroundStyle.backgroundColor}
      />
      <ScrollView
        contentInsetAdjustmentBehavior="automatic"
        style={backgroundStyle}>
        <Header />
        <View
          style={{
            backgroundColor: isDarkMode ? Colors.black : Colors.white,
          }}>
          <Section title="Nama">
            Alya Syahidha
          </Section>
          <Section title="NIM">
            22/505809/SV/21946
          </Section>
          <Section title="Kelas">
            PGPBL-B
          </Section>

           {/* Link Sections with Icons
           <View style={styles.linkContainer}>
            <Image
              source={{ uri: 'https://upload.wikimedia.org/wikipedia/commons/thumb/9/95/Instagram_logo_2022.svg/150px-Instagram_logo_2022.svg.png' }}
              style={{ width: 24, height: 24 }}
            />
            <Text style={styles.sectionDescription}>
              Connect my profile in LinkedIn
            </Text>
          </View>
          <View style={styles.linkContainer}>
            <Image
              source={{ uri: 'https://blog.waalaxy.com/wp-content/uploads/2021/01/3-1.png.webp' }}
              style={{ width: 24, height: 24 }}
            />
            <Text style={styles.sectionDescription}>
              mailto:khosyinuraliya@mail.ugm.ac.id
            </Text>
          </View>
          <View style={styles.linkContainer}>
            <Image
              source={{ uri: 'https://blog.waalaxy.com/wp-content/uploads/2021/01/3-1.png.webp' }}
              style={{ width: 24, height: 24 }}
            />
            <Text style={styles.sectionDescription}>
              Click this sentence to follow my Instagram
            </Text>
          </View> */}


          <LearnMoreLinks />
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  sectionContainer: {
    marginTop: 32,
    paddingHorizontal: 24,
  },
  sectionTitle: {
    fontSize: 24,
    fontWeight: '600',
  },
  sectionDescription: {
    marginTop: 8,
    fontSize: 18,
    fontWeight: '400',
    color: 'blue',
  },
  highlight: {
    fontWeight: '700',
  },
  headerContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 16,
  },
  headerTitle: {
    fontSize: 24,
    fontWeight: '700',
    color: 'black',
    marginLeft: 8,
  },
  linkContainer: { // Tambahkan ini untuk gaya link dengan ikon
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: 16,
    paddingHorizontal: 24,
  },
  icon: { // Gaya untuk ikon
    width: 24,
    height: 24,
    marginRight: 8,
  },
});

export default App;