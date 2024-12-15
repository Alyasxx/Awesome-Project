import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, FlatList } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { FontAwesomeIcon } from '@fortawesome/react-native-fontawesome';
import { faWallet, faChevronRight, faEye, faEyeSlash, faArrowUp, faArrowDown } from '@fortawesome/free-solid-svg-icons';

const Listwallet = () => {
  const jsonUrl = 'http://192.168.1.10:3000/wallet'; // Ganti dengan URL JSON Anda
  const [isLoading, setLoading] = useState(true);
  const [dataWallet, setDataWallet] = useState([]);
  const [refresh, setRefresh] = useState(false);
  const [showBalance, setShowBalance] = useState(true); // State untuk hide/unhide saldo
  const [totalBalance, setTotalBalance] = useState(0); // State total saldo

  // Fungsi Fetch Data
  const fetchData = () => {
    setLoading(true);
    fetch(jsonUrl)
      .then((response) => response.json())
      .then((json) => {
        setDataWallet(json);
        calculateTotalBalance(json); // Hitung saldo setelah fetch data
      })
      .catch((error) => console.error(error))
      .finally(() => setLoading(false));
  };

  // Hitung Total Saldo
  const calculateTotalBalance = (data) => {
    const total = data.reduce((acc, item) => {
      const nominal = parseFloat(item.nominal); // Konversi nominal ke angka
      return item.jenis === 'income'
        ? acc + nominal // Tambahkan jika income
        : acc - nominal; // Kurangi jika Expenses
    }, 0);
    setTotalBalance(total); // Set total saldo ke state
  };

  // Refresh Data
  const refreshPage = () => {
    setRefresh(true);
    fetchData();
    setRefresh(false);
  };

  // Format Nominal Berdasarkan Jenis Transaksi
  const formatNominal = (item) => {
    return item.jenis === 'income'
      ? `+Rp ${item.nominal.toLocaleString()}`
      : `-Rp ${item.nominal.toLocaleString()}`;
  };

  useEffect(() => {
    fetchData();
  }, []);

  return (
    <SafeAreaView style={styles.container}>
      {/* Header */}
      <View style={styles.header}>
        <Text style={styles.headerText}>CASHLESS</Text>
        <Text style={styles.netAsset}>Informasi Saldo</Text>

        {/* Hide/Unhide Toggle */}
        <View style={styles.balanceContainer}>
          <Text style={styles.amount}>
            {showBalance ? `Rp ${totalBalance.toLocaleString()}` : '******'}
          </Text>
          <TouchableOpacity onPress={() => setShowBalance(!showBalance)}>
            <FontAwesomeIcon
              icon={showBalance ? faEyeSlash : faEye}
              size={20}
              color="#FFF"
              style={styles.eyeIcon}
            />
          </TouchableOpacity>
        </View>
      </View>

      {/* Loading Indicator */}
      {isLoading ? (
        <View style={styles.loadingContainer}>
          <Text style={styles.loadingText}>Loading...</Text>
        </View>
      ) : (
        <FlatList
          style={styles.flatList}
          data={dataWallet}
          onRefresh={refreshPage}
          refreshing={refresh}
          keyExtractor={(item) => item.id.toString()}
          renderItem={({ item }) => (
            <View style={styles.card}>
              {/* Kiri - Icon Berdasarkan Jenis */}
              <FontAwesomeIcon
                icon={item.jenis === 'income' ? faArrowUp : faArrowDown}
                size={40}
                color={item.jenis === 'income' ? '#4CAF50' : '#FF5E78'}
                style={styles.icon}
              />
              {/* Tengah - Konten */}
              <View style={styles.cardContent}>
                <Text style={styles.cardTitle}>{item.kategori || 'Default Account'}</Text>
                <Text
                  style={[
                    styles.cardNominal,
                    { color: item.jenis === 'income' ? '#4CAF50' : '#FF5E78' },
                  ]}
                >
                  {formatNominal(item)}
                </Text>
                <Text style={styles.cardDate}>{item.tanggal}</Text>
              </View>
              {/* Kanan - Chevron */}
              <FontAwesomeIcon
                icon={faChevronRight}
                size={20}
                color="#aaa"
              />
            </View>
          )}
        />
      )}
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F8F8F8',
  },
  header: {
    backgroundColor: '#FF5E78',
    padding: 20,
    paddingTop: 40,
    alignItems: 'center',
    borderBottomLeftRadius: 20,
    borderBottomRightRadius: 20,
  },
  headerText: {
    fontSize: 24,
    color: '#fff',
    fontWeight: 'bold',
  },
  netAsset: {
    color: '#FFF',
    marginTop: 5,
    fontSize: 14,
  },
  balanceContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: 10,
  },
  amount: {
    fontSize: 28,
    fontWeight: 'bold',
    color: '#FFF',
    marginRight: 10,
  },
  eyeIcon: {
    marginLeft: 5,
  },
  flatList: {
    marginTop: 10,
  },
  card: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#FFF',
    borderRadius: 12,
    marginHorizontal: 15,
    marginVertical: 8,
    padding: 15,
    elevation: 2,
  },
  icon: {
    marginRight: 15,
  },
  cardContent: {
    flex: 1,
  },
  cardTitle: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#333',
  },
  cardNominal: {
    fontSize: 16,
    marginVertical: 5,
  },
  cardDate: {
    color: '#888',
    fontSize: 12,
  },
  loadingContainer: {
    marginTop: 50,
    alignItems: 'center',
  },
  loadingText: {
    fontSize: 16,
    color: '#555',
  },
});

export default Listwallet;