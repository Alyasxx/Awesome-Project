import React, { useState } from 'react';
import { SafeAreaView, View, ScrollView, TextInput, Text, Button, StyleSheet } from 'react-native';

const Createwallet = () => {
  const jsonUrl = 'http://172.20.10.4:3000/wallet';
  const [kategori, setKategori] = useState('');
  const [nominal, setNominal] = useState('');
  const [waktu, setWaktu] = useState('');
  const [tanggal, setTanggal] = useState('');
  const [jenis, setJenis] = useState('');

  const submit = () => {
    const data = {
      kategori: kategori,
      nominal: nominal,
      waktu: waktu,
      tanggal: tanggal,
      jenis: jenis,
    };

    fetch(jsonUrl, {
      method: 'POST',
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(data),
    })
      .then((response) => response.json())
      .then((json) => {
        console.log(json);
        alert('Data wallet berhasil disimpan!');
        resetForm();
      })
      .catch((error) => {
        console.error('Error:', error);
        alert('Gagal menyimpan data.');
      });
  };

  const resetForm = () => {
    setKategori('');
    setNominal('');
    setWaktu('');
    setTanggal('');
    setJenis('');
  };

  return (
    <SafeAreaView>
      <View>
        <Text style={styles.title}>Tambah Data Wallet</Text>
        <ScrollView style={styles.form}>
          <TextInput
            style={styles.input}
            placeholder="Kategori"
            value={kategori}
            onChangeText={(value) => setKategori(value)}
          />
          <TextInput
            style={styles.input}
            placeholder="Nominal"
            value={nominal}
            keyboardType="numeric"
            onChangeText={(value) => setNominal(value)}
          />
          <TextInput
            style={styles.input}
            placeholder="Waktu"
            value={waktu}
            onChangeText={(value) => setWaktu(value)}
          />
          <TextInput
            style={styles.input}
            placeholder="Tanggal"
            value={tanggal}
            onChangeText={(value) => setTanggal(value)}
          />
          <TextInput
            style={styles.input}
            placeholder="Jenis (income/expenses)"
            value={jenis}
            onChangeText={(value) => setJenis(value)}
          />
          <Button title="Simpan" style={styles.button} onPress={submit} />
        </ScrollView>
      </View>
    </SafeAreaView>
  );
};

export default Createwallet;

const styles = StyleSheet.create({
  title: {
    paddingVertical: 12,
    backgroundColor: '#FF5E78', // Pink Background for title
    color: 'white',
    fontSize: 20,
    fontWeight: 'bold',
    textAlign: 'center',
  },
  form: {
    padding: 10,
    marginBottom: 100,
  },
  input: {
    borderWidth: 1,
    borderColor: '#FF5E78', // Pink border for inputs
    borderRadius: 8,
    padding: 8,
    width: '100%',
    marginVertical: 5,
  },
  button: {
    marginVertical: 10,
    backgroundColor: '#FF5E78', // Pink button background
    color: 'white',
  },
});