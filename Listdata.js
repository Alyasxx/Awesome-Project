import React, { useState, useEffect } from 'react';
import { View,Text, StyleSheet, TouchableOpacity, FlatList, Button, Alert } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { FontAwesomeIcon } from '@fortawesome/react-native-fontawesome';
import { faGraduationCap, faChevronRight } from '@fortawesome/free-solid-svg-icons';

const Listdata = () => {
  const jsonUrl = 'http://192.168.1.10:3000/mahasiswa';
  const [isLoading, setLoading] = useState(true);
  const [dataUser, setDataUser] = useState([]);
  const [refresh, setRefresh] = useState(false);

  // Fetch data from the server
  const fetchData = () => {
    setLoading(true);
    fetch(jsonUrl)
      .then((response) => response.json())
      .then((json) => setDataUser(json))
      .catch((error) => console.error(error))
      .finally(() => setLoading(false));
  };

  // Run fetchData on component mount
  useEffect(() => {
    fetchData();
  }, []);

  // Refresh the list
  const refreshPage = () => {
    setRefresh(true);
    fetchData();
    setRefresh(false);
  };

  // Delete specific data
  const deleteData = (id) => {
    fetch(`${jsonUrl}/${id}`, {
      method: 'DELETE',
    })
      .then((response) => {
        if (!response.ok) {
          throw new Error(`Gagal menghapus data: ${response.status}`);
        }
        // Tidak memanggil .json() karena respons DELETE mungkin kosong
        alert('Data berhasil dihapus');
        refreshPage();
      })
      .catch((error) => {
        console.error('DELETE Error:', error.message);
        alert(`Error: ${error.message}`);
      });
  };

  return (
    <SafeAreaView style={styles.container}>
      {isLoading ? (
        <View style={styles.loadingContainer}>
          <Text style={styles.cardTitle}>Loading...</Text>
        </View>
      ) : (
        <FlatList
          style={styles.flatList}
          data={dataUser}
          onRefresh={refreshPage}
          refreshing={refresh}
          keyExtractor={(item) => item.id.toString()}
          renderItem={({ item }) => (
            <TouchableOpacity>
              <View style={styles.card}>
                {/* Avatar Icon */}
                <View style={styles.avatar}>
                  <FontAwesomeIcon
                    icon={faGraduationCap}
                    size={50}
                    color={item.color || '#000'}
                  />
                </View>
                {/* User Info */}
                <View style={styles.cardContent}>
                  <Text style={styles.cardTitle}>
                    {item.first_name} {item.last_name}
                  </Text>
                  <Text>{item.kelas}</Text>
                  <Text>{item.gender}</Text>
                </View>
                {/* Chevron Icon */}
                <View style={styles.chevron}>
                  <FontAwesomeIcon icon={faChevronRight} size={20} />
                </View>
              </View>
              {/* Delete Button */}
              <View style={styles.form}>
                <Button
                  title="Hapus"
                  onPress={() =>
                    Alert.alert(
                      'Hapus Data',
                      'Yakin ingin menghapus data ini?',
                      [
                        { text: 'Tidak', onPress: () => console.log('Batal') },
                        { text: 'Ya', onPress: () => deleteData(item.id) },
                      ]
                    )
                  }
                  color="red"
                />
              </View>
            </TouchableOpacity>
          )}
        />
      )}
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
  loadingContainer: {
    alignItems: 'center',
    marginTop: 20,
  },
  flatList: {
    marginBottom: 0,
  },
  card: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 15,
    marginVertical: 5,
    marginHorizontal: 10,
    backgroundColor: '#f9f9f9',
    borderRadius: 8,
    elevation: 2,
  },
  avatar: {
    marginRight: 15,
  },
  cardContent: {
    flex: 1,
  },
  chevron: {
    justifyContent: 'center',
    alignItems: 'flex-end',
  },
  form: {
    padding: 10,
  },
  cardTitle: {
    fontSize: 16,
    fontWeight: 'bold',
  },
});

export default Listdata;
