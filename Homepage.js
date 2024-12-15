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
} from 'react-native';
import { FontAwesomeIcon } from '@fortawesome/react-native-fontawesome';
import { faPenToSquare, faGraduationCap } from '@fortawesome/free-solid-svg-icons';

const Createdata = () => {
  const jsonUrl = 'http://192.168.1.10:3000/mahasiswa';
  const [first_name, setFirstName] = useState('');
  const [last_name, setLastName] = useState('');
  const [kelas, setKelas] = useState('');
  const [gender, setGender] = useState('');
  const [email, setEmail] = useState('');
  const [selectedUser, setSelectedUser] = useState({});
  const [isLoading, setLoading] = useState(true);
  const [dataUser, setDataUser] = useState([]);
  const [refresh, setRefresh] = useState(false);

  useEffect(() => {
    fetchData();
  }, []);

  // Fungsi fetch data dengan error handling yang lebih baik
  const fetchData = async () => {
    setLoading(true);
    try {
      const response = await fetch(jsonUrl);

      // Cek jika respons bukan JSON valid
      const text = await response.text();
      console.log('Raw Response:', text);

      if (!response.ok) {
        throw new Error(`Error ${response.status}: ${text}`);
      }

      const json = JSON.parse(text);
      setDataUser(json);
    } catch (error) {
      console.error('Fetch Error:', error.message);
      alert(`Gagal memuat data: ${error.message}`);
    } finally {
      setLoading(false);
    }
  };

  // Fungsi untuk memilih item
  const selectItem = (item) => {
    setSelectedUser(item);
    setFirstName(item.first_name);
    setLastName(item.last_name);
    setKelas(item.kelas);
    setGender(item.gender);
    setEmail(item.email);
  };

  // Fungsi submit untuk PUT request
  const submit = async () => {
    if (!first_name || !last_name || !kelas || !gender || !email) {
      alert('Semua field harus diisi!');
      return;
    }

    const data = { first_name, last_name, email, kelas, gender };

    try {
      const response = await fetch(`${jsonUrl}/${selectedUser.id}`, {
        method: 'PUT',
        headers: {
          Accept: 'application/json',
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(data),
      });

      const text = await response.text();
      console.log('PUT Response:', text);

      if (!response.ok) {
        throw new Error(`Error ${response.status}: ${text}`);
      }

      alert('Data berhasil diupdate!');
      resetForm();
      fetchData();
    } catch (error) {
      console.error('PUT Error:', error.message);
      alert(`Gagal mengupdate data: ${error.message}`);
    }
  };

  // Reset form input
  const resetForm = () => {
    setFirstName('');
    setLastName('');
    setKelas('');
    setGender('');
    setEmail('');
  };

  return (
    <SafeAreaView style={{ flex: 1, padding: 10 }}>
      {isLoading ? (
        <View style={{ alignItems: 'center', marginTop: 20 }}>
          <Text style={styles.cardtitle}>Loading...</Text>
        </View>
      ) : (
        <View>
          <Text style={styles.title}>Edit Data Mahasiswa</Text>
          <View style={styles.form}>
            <TextInput
              style={styles.input}
              placeholder="Nama Depan"
              value={first_name}
              onChangeText={setFirstName}
            />
            <TextInput
              style={styles.input}
              placeholder="Nama Belakang"
              value={last_name}
              onChangeText={setLastName}
            />
            <TextInput
              style={styles.input}
              placeholder="Kelas"
              value={kelas}
              onChangeText={setKelas}
            />
            <TextInput
              style={styles.input}
              placeholder="Jenis Kelamin"
              value={gender}
              onChangeText={setGender}
            />
            <TextInput
              style={styles.input}
              placeholder="Email"
              value={email}
              onChangeText={setEmail}
            />
            <Button title="Edit" onPress={submit} />
          </View>
          <FlatList
            data={dataUser}
            onRefresh={fetchData}
            refreshing={refresh}
            keyExtractor={(item) => item.id.toString()}
            renderItem={({ item }) => (
              <TouchableOpacity style={styles.card} onPress={() => selectItem(item)}>
                <View style={styles.avatar}>
                  <FontAwesomeIcon icon={faGraduationCap} size={50} />
                </View>
                <View style={{ flex: 1 }}>
                  <Text style={styles.cardtitle}>{`${item.first_name} ${item.last_name}`}</Text>
                  <Text>{item.kelas}</Text>
                  <Text>{item.gender}</Text>
                </View>
                <FontAwesomeIcon icon={faPenToSquare} size={20} />
              </TouchableOpacity>
            )}
          />
        </View>
      )}
    </SafeAreaView>
  );
};

export default Createdata;

const styles = StyleSheet.create({
  title: {
    paddingVertical: 12,
    backgroundColor: '#333',
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
    borderColor: '#777',
    borderRadius: 8,
    padding: 8,
    marginBottom: 10,
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
  },
  cardtitle: {
    fontSize: 14,
    fontWeight: 'bold',
  },
  avatar: {
    marginRight: 10,
  },
});
