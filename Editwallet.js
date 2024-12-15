import React, { useState, useEffect } from 'react';
import {
  SafeAreaView,
  View,
  TextInput,
  Text,
  Button,
  StyleSheet,
  FlatList,
  TouchableOpacity,
  Alert,
} from 'react-native';
import { FontAwesomeIcon } from '@fortawesome/react-native-fontawesome';
import { faPenToSquare, faWallet } from '@fortawesome/free-solid-svg-icons';

const Createwallet = () => {
  const jsonUrl = 'http://172.20.10.4:3000/wallet'; // Ganti URL sesuai dengan server Anda
  const [kategori, setKategori] = useState('');
  const [nominal, setNominal] = useState('');
  const [waktu, setWaktu] = useState('');
  const [tanggal, setTanggal] = useState('');
  const [jenis, setJenis] = useState('');
  const [selectedItem, setSelectedItem] = useState(null);
  const [isLoading, setLoading] = useState(true);
  const [dataWallet, setDataWallet] = useState([]);
  const [refresh, setRefresh] = useState(false);

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    setLoading(true);
    try {
      const response = await fetch(jsonUrl);
      const json = await response.json();
      setDataWallet(json);
    } catch (error) {
      console.error('Fetch Error:', error.message);
      Alert.alert('Error', `Gagal memuat data: ${error.message}`);
    } finally {
      setLoading(false);
    }
  };

  const selectItem = (item) => {
    setSelectedItem(item);
    setKategori(item.kategori);
    setNominal(item.nominal);
    setWaktu(item.waktu);
    setTanggal(item.tanggal);
    setJenis(item.jenis);
  };

  const submit = async () => {
    if (!kategori || !nominal || !waktu || !tanggal || !jenis) {
      Alert.alert('Error', 'Semua field harus diisi!');
      return;
    }

    const data = { kategori, nominal, waktu, tanggal, jenis };

    try {
      const response = await fetch(`${jsonUrl}/${selectedItem.id}`, {
        method: 'PUT',
        headers: {
          Accept: 'application/json',
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(data),
      });

      if (!response.ok) {
        throw new Error(`Error ${response.status}: ${await response.text()}`);
      }

      Alert.alert('Success', 'Data berhasil diupdate!');
      resetForm();
      fetchData();
    } catch (error) {
      console.error('PUT Error:', error.message);
      Alert.alert('Error', `Gagal mengupdate data: ${error.message}`);
    }
  };

  const resetForm = () => {
    setKategori('');
    setNominal('');
    setWaktu('');
    setTanggal('');
    setJenis('');
    setSelectedItem(null);
  };

  const renderEmptyList = () => (
    <Text style={{ textAlign: 'center', marginTop: 20 }}>Tidak ada data untuk ditampilkan.</Text>
  );

  return (
    <SafeAreaView style={{ flex: 1, padding: 10 }}>
      {isLoading ? (
        <View style={{ alignItems: 'center', marginTop: 20 }}>
          <Text style={styles.cardTitle}>Loading...</Text>
        </View>
      ) : (
        <View style={{ flex: 1 }}>
          <Text style={styles.title}>Edit Data Wallet</Text>
          <View style={styles.form}>
            <TextInput
              style={styles.input}
              placeholder="Kategori"
              value={kategori}
              onChangeText={setKategori}
            />
            <TextInput
              style={styles.input}
              placeholder="Nominal"
              value={nominal}
              keyboardType="numeric"
              onChangeText={setNominal}
            />
            <TextInput
              style={styles.input}
              placeholder="Waktu"
              value={waktu}
              onChangeText={setWaktu}
            />
            <TextInput
              style={styles.input}
              placeholder="Tanggal"
              value={tanggal}
              onChangeText={setTanggal}
            />
            <TextInput
              style={styles.input}
              placeholder="Jenis (income/expenses)"
              value={jenis}
              onChangeText={setJenis}
            />
            <Button
              title={selectedItem ? 'Update' : 'Submit'}
              onPress={submit}
              color="#FF5E78" // Tombol dengan warna tema pink
            />
          </View>
          <FlatList
            data={dataWallet}
            keyExtractor={(item) => item.id.toString()}
            refreshing={refresh}
            onRefresh={fetchData}
            ListEmptyComponent={renderEmptyList}
            renderItem={({ item }) => (
              <TouchableOpacity
                style={styles.card}
                onPress={() => selectItem(item)}
              >
                <View style={styles.avatar}>
                  <FontAwesomeIcon icon={faWallet} size={50} color="#FF5E78" />
                </View>
                <View style={{ flex: 1 }}>
                  <Text style={styles.cardTitle}>{item.kategori}</Text>
                  <Text>{`Nominal: Rp ${item.nominal}`}</Text>
                  <Text>{`Waktu: ${item.waktu}`}</Text>
                  <Text>{`Tanggal: ${item.tanggal}`}</Text>
                  <Text>{`Jenis: ${item.jenis}`}</Text>
                </View>
                <FontAwesomeIcon icon={faPenToSquare} size={20} color="#FF5E78" />
              </TouchableOpacity>
            )}
          />
        </View>
      )}
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  title: {
    paddingVertical: 12,
    backgroundColor: '#FF5E78', // Tema pink
    color: 'white',
    fontSize: 20,
    fontWeight: 'bold',
    textAlign: 'center',
    marginBottom: 10,
  },
  form: {
    marginBottom: 20,
  },
  input: {
    borderWidth: 1,
    borderColor: '#FF5E78', // Warna border input sesuai tema
    borderRadius: 8,
    padding: 8,
    marginBottom: 10,
    color: '#333',
  },
  card: {
    flexDirection: 'row',
    padding: 20,
    borderRadius: 10,
    backgroundColor: 'white',
    shadowColor: '#000',
    shadowOffset: { width: 1, height: 1 },
    shadowOpacity: 0.2,
    shadowRadius: 1.41,
    elevation: 2,
    marginVertical: 7,
    borderLeftWidth: 5,
    borderLeftColor: '#FF5E78', // Border kiri untuk kartu
  },
  cardTitle: {
    fontSize: 14,
    fontWeight: 'bold',
    color: '#FF5E78', // Warna teks sesuai tema
  },
  avatar: {
    marginRight: 10,
  },
});

export default Createwallet;